import Vue from 'vue';
import Router from 'vue-router';

import HelloView from './components/HelloWorld.vue';

import LoginPage from '../../kyrios/src/modules/login/pages/loginPage.vue';
import Kyrios from '../../kyrios/src/containers/kyrios.container.vue';
import Dashboard from '../../kyrios/src/modules/dashboard/pages/dashboardPage.vue';

import AccountUsersList from '../../kyrios/src/modules/accountUser/pages/accountUserPage.vue';

import EstablishementList from '../../kyrios/src/modules/establishement/pages/establishementPageList.vue';
import EstablishementSingle from '../../kyrios/src/modules/establishement/pages/establishementPage.vue';

import UserSettings from '../../kyrios/src/modules/userSettings/pages/userSettingsPage.vue';

import PageNotFound from '../../app/src/components/notFoundComponent.vue'; 

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
    {
      path: '/logout',
      name: 'Logout',
    },
    {
      path: '/kyrios',
      component: Kyrios,
      children: [
        {
          path: '/kyrios/dashboard',
          component: Dashboard,
        },
        {
          title: 'establishement',
          path: '/kyrios/etablissements',
          component: EstablishementList,
        },
        {
          title: 'accountUsers',
          path: '/kyrios/account-users',
          component: AccountUsersList,
        },
        {
          title: 'SingleEstablishement',
          path: '/kyrios/etablissements/:id',
          component: EstablishementSingle,
        },
        {
          title: 'settings',
          path: '/kyrios/settings/:userId',
          component: UserSettings,
        },
      ],
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound,
    },
  ],
});
