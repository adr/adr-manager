import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import EditorView from '../views/EditorView.vue'
import Authorization from '../views/Authorization.vue'
import ErrorPage from '../views/ErrorPage.vue'
import DataView from '../views/DataView.vue' 
Vue.use(VueRouter)

const routes = [
  { // Text Component of Daniel
    path: '/data',
    alias: ['/'],
    name: 'DataView',
    component: DataView
  },
  {
    path: '/login',
    alias: ['/register', '/'],
    name: 'Register',
    component: Register
  },
  {
    path: '/manager',
    alias: ['/editor'],
    name: 'Editor',
    component: EditorView
  },
  {
    path: '/authorize',
    name: 'Authorization',
    component: Authorization
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
