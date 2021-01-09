import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import EditorView from '../views/EditorView.vue'
import ErrorPage from '../views/ErrorPage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Register',
    alias: ['/register', '/login'],
    component: LandingPage
  },
  /** Route to the Editor without branch. */
  {
    path: '/manager',
    alias: ['/editor'],
    name: 'Editor',
    component: EditorView,
    meta: { requiresAuth: true },
    redirect: to => {
      if (to.params.organization && to.params.repo && to.params.branch && to.params.adr) {
        return { name: 'EditorWithSpecifiedAdr' };
      } else if (to.params.organization && to.params.repo && to.params.branch) {
        console.log("Route to spec repo");
        return { name: 'EditorWithSpecifiedRepo' };
      } else {
        return { name: 'EditorUnspecified' };
      }
    },
  },
  {
    // FileExplorer will be rendered inside EditorView's <router-view>
    path: '/manager',
    name: 'EditorUnspecified',
    component: EditorView,
    meta: { requiresAuth: true },
    props: route => ({ ...route.query, ...route.params })
  },
  {
    // FileExplorer will be rendered inside EditorView's <router-view>
    path: '/manager/:organization/:repo/:branch',
    name: 'EditorWithSpecifiedRepo',
    component: EditorView,
    meta: { requiresAuth: true },
    props: route => ({
      ...route.query, ...route.params,
      repoFullName: route.params.organization + '/' + route.params.repo,
      branch: route.params.branch,
    })
  },
  {
    // FileExplorer will be rendered inside EditorView's <router-view>
    path: '/manager/:organization/:repo/:branch/file/:adr/',
    name: 'EditorWithSpecifiedAdr',
    component: EditorView,
    /** Pass the route as props to the FileExplorer. */
    props: route => ({
      ...route.query, ...route.params,
      repoFullName: route.params.organization + '/' + route.params.repo,
      branch: route.params.branch,
      adr: route.params.adr
    })
  },
  {
    path: '/*',
    name: 'Error 404',
    component: ErrorPage
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('authId')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
