import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import router from './router'

/* Needed to refresh the code mirror, when it becomes visible. */
import { ObserveVisibility } from 'vue-observe-visibility'
Vue.directive('observe-visibility', ObserveVisibility)

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
