import Vue from "vue"
import App from "./App.vue"
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css"
import "@mdi/font/css/materialdesignicons.css"
import VueSimpleAlert from "vue-simple-alert";

import router from "./plugins/router"

/* Needed to refresh the code mirror, when it becomes visible or is resized. */
import { ObserveVisibility } from "vue-observe-visibility"
Vue.directive("observe-visibility", ObserveVisibility)
import resize from "vue-element-resize-detector";
Vue.use(resize)

/* Import directive v-autowidth to resize an input field to fit its content. */
import VueInputAutowidth from "vue-input-autowidth"
Vue.use(VueInputAutowidth)

import VueTippy, { TippyComponent } from "vue-tippy";
Vue.use(VueTippy, {
  directive: "tippy", // => v-tippy
  flipDuration: 0,
  popperOptions: {
    modifiers: {
      preventOverflow: {
        enabled: false
      },
      hide: {
        enabled: false
      }
    }
  }
});

Vue.component("tippy", TippyComponent);

Vue.use(VueSimpleAlert);
Vue.config.productionTip = false;


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
