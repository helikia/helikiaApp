/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import vuetify from './plugins/vuetify';
import * as VeeValidate from 'vee-validate';

import { createProvider } from '../../../apollo.config';
import router from './router';

import App from './App.vue';
import store from './store';

import '@babel/polyfill';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import translation from './translation/trad.json';

Vue.use(Vuetify, VeeValidate);

Vue.config.productionTip = false;

const apolloProvider = createProvider({}, { router });

new Vue({
  router,
  store,
  apolloProvider,
  vuetify,
  render: h => h(App),
}).$mount('#app');
