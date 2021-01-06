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
    path: '/manager/:organization?/:repo?/:adr?',
    name: 'Editor',
    alias: ['/editor/:organization?/:repo?/:adr?'],
    component: EditorView,
    meta: { requiresAuth: true },
    /** Pass the route as props to EditorView. */
    props: route => ({ ...route.query, ...route.params, 
      repoFullName : route.params.organization  + '/' +  route.params.repo,
      branch : '',
      adr : route.params.adr
    })
  },
  /** Route to the Editor with branch. */
  {
    path: '/manager/:organization?/:repo?/:branch?/:adr?',
    name: 'Editor',
    alias: ['/editor/:organization?/:repo?/:branch?/:adr?'],
    component: EditorView,
    meta: { requiresAuth: true },
    /** Pass the route as props to EditorView. */
    props: route => ({ ...route.query, ...route.params, 
      repoFullName : route.params.organization  + '/' +  route.params.repo,
      branch : route.params.branch, 
      adr : route.params.adr
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
