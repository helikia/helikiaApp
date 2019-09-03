import Vue from 'vue';
import Router from 'vue-router';

import HelloView from './components/HelloWorld.vue';

import LoginPage from '../../kyrios/src/modules/login/pages/loginPage.vue';
import Kyrios from '../../kyrios/src/containers/kyrios.container.vue';
import Dashboard from '../../kyrios/src/modules/dashboard/pages/dashboardPage.vue';

import EtablishementList from '../../kyrios/src/modules/etablishement/pages/etablishementPageList.vue';
import EtablishementSingle from '../../kyrios/src/modules/etablishement/pages/etablishementPage.vue';

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
      name: 'Kyrios',
      component: Kyrios,
      children: [
        {
          title: 'dashboard',
          path: '/kyrios/dashboard',
          component: Dashboard,
          exact: true,
        },
        {
          title: 'etablishements',
          path: '/kyrios/etablishements',
          component: EtablishementList,
          exact: true,
        },
        {
          title: 'etablishement',
          path: '/kyrios/etablishements/:etablishementSlug',
          component: EtablishementSingle,
          exact: true,
        },
        {
          title: 'settings',
          path: '/kyrios/settings/:userId',
          component: UserSettings,
          exact: true,
        },
        {
          path: '/kyrios',
          name: 'kyriosHome',
          redirect: {
            name: 'dashboard',
          },
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
