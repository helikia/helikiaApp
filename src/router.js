import Vue from 'vue';
import Router from 'vue-router';
import HelloView from './components/HelloWorld.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloView,
    },
  ],
});
