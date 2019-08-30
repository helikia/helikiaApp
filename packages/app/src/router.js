import Vue from 'vue';
import Router from 'vue-router';
import HelloView from './components/HelloWorld.vue';
import LoginPage from '../../kyrios/src/modules/login/pages/loginPage.vue'; 

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
  ],
});
