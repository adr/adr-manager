<<<<<<< HEAD
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import VueRouter from 'vue-router'
Vue.use(VueRouter);
import router from './router'
=======
import Vue from "vue";
import App from "./App.vue";
>>>>>>> main

Vue.config.productionTip = false;

new Vue({
<<<<<<< HEAD
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
=======
  render: h => h(App)
}).$mount("#app");
>>>>>>> main
