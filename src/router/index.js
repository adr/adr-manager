import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import EditorView from '../views/EditorView.vue'
import ErrorPage from '../views/ErrorPage.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Register',
    alias: ['/register', '/'],
    component: Register
  },
  /** Route to the Editor without branch. */
  {
    path: '/manager/:organization?/:repo?/:adr?',
    name: 'Editor',
    alias: ['/editor/:organization?/:repo?/:adr?'],
    component: EditorView,
    /** Pass the route as props to EditorView. */
    props: route => ({ ...route.query, ...route.params, 
      repoFullName : route.params.organization  + '/' +  route.params.repo,
      branch : '',
      adr : route.params.adr
    }),
  },
  /** Route to the Editor with branch. */
  {
    path: '/manager/:organization?/:repo?/:branch?/:adr?',
    name: 'Editor',
    alias: ['/editor/:organization?/:repo?/:branch?/:adr?'],
    component: EditorView,
    /** Pass the route as props to EditorView. */
    props: route => ({ ...route.query, ...route.params, 
      repoFullName : route.params.organization  + '/' +  route.params.repo,
      branch : route.params.branch, 
      adr : route.params.adr
    }),
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

export default router
