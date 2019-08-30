/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import * as VeeValidate from 'vee-validate';
import { createProvider } from '../../../apollo.config';
import router from './router';

import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';

import '@babel/polyfill';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css'; // Ensure you are using css-loader

import translation from './translation/trad.json';

let siteLocale;
const localeEl = document.getElementById('siteLocale');
if (localeEl) {
  siteLocale = localeEl.getAttribute('value');
}
siteLocale = siteLocale && siteLocale !== '' ? siteLocale : 'fr';

Vue.use(VeeValidate, Vuetify);

Vue.config.productionTip = false;

const apolloProvider = createProvider({}, { router });

new Vue({
  router,
  store,
  apolloProvider,
  vuetify,
  render: h => h(App),
}).$mount('#app');
