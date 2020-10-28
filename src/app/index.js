import Vue from 'vue';
import App from './components/app.vue';

export const app = new Vue(
  Vue.util.extend({}, App)
);
