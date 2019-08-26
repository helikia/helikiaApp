import Vue from 'vue';
import { createProvider } from '../apollo.config';
import router from './router';

import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

const apolloProvider = createProvider({}, { router });

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
