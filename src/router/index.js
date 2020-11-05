import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import MockUp from '../views/MockUp.vue'
import Authorization from '../views/Authorization.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Register',
    component: Register
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/mockup',
    name: 'MockUp',
    component: MockUp
  },
  {
    path: '/authorize',
    name: 'Authorization',
    component: Authorization
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
