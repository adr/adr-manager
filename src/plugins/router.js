import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import EditorView from "../views/EditorView.vue";
import ErrorPage from "../views/ErrorPage.vue";
Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Register",
        alias: ["/register", "/login"],
        component: LandingPage,
        meta: {
            title: () => {
                return "ADR Manager - Connect";
            }
        }
    },
    /** Route to the Editor (selects fitting sub-route) */
    {
        path: "/manager",
        alias: ["/editor"],
        name: "Editor",
        component: EditorView,
        meta: { requiresAuth: true },
        redirect: (to) => {
            if (to.params.organization && to.params.repo && to.params.branch && to.params.adr) {
                return { name: "EditorWithSpecifiedAdr" };
            } else if (to.params.organization && to.params.repo && to.params.branch) {
                console.log("Route to spec repo");
                return { name: "EditorWithSpecifiedRepo" };
            } else {
                return { name: "EditorUnspecified" };
            }
        }
    },
    // Sub-route 1: If the route does not specify a repo
    {
        path: "/manager",
        name: "EditorUnspecified",
        component: EditorView,
        meta: { requiresAuth: true },
        props: (route) => ({ ...route.query, ...route.params })
    },
    // Sub-route 2: If the route does not specify ADR but specifies a repo
    {
        path: "/manager/:organization/:repo/:branch",
        name: "EditorWithSpecifiedRepo",
        component: EditorView,
        meta: { requiresAuth: true },
        props: (route) => ({
            ...route.query,
            ...route.params,
            repoFullName: route.params.organization + "/" + route.params.repo,
            branch: route.params.branch
        })
    },
    // Sub-route 2: If the route does specify repo and ADR
    {
        path: "/manager/:organization/:repo/:branch/:adr",
        name: "EditorWithSpecifiedAdr",
        component: EditorView,
        meta: {
            requiresAuth: true,
            title: (route) => {
                return route.params.adr;
            }
        },
        props: (route) => ({
            ...route.query,
            ...route.params,
            repoFullName: route.params.organization + "/" + route.params.repo,
            branch: route.params.branch,
            adr: route.params.adr
        })
    },
    {
        path: "/*",
        name: "Error 404",
        component: ErrorPage
    }
];

const router = new VueRouter({
    routes: routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!localStorage.getItem("authId")) {
            next({
                path: "/login",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});

const DEFAULT_TITLE = "ADR Manager";
router.afterEach((to) => {
    Vue.nextTick(() => {
        document.title = to.meta.title ? to.meta.title(to) : DEFAULT_TITLE;
    });
});

export default router;
