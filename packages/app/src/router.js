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

const router = new Router({
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
          meta: { requiresAuth: true },
        },
        {
          title: 'establishement',
          path: '/kyrios/etablissements',
          component: EstablishementList,
          meta: { requiresAuth: true },
        },
        {
          title: 'accountUsers',
          path: '/kyrios/account-users',
          component: AccountUsersList,
          meta: { requiresAuth: true },
        },
        {
          title: 'SingleEstablishement',
          path: '/kyrios/etablissements/:id',
          component: EstablishementSingle,
          meta: { requiresAuth: true },
        },
        {
          title: 'settings',
          path: '/kyrios/settings/:userId',
          component: UserSettings,
          meta: { requiresAuth: true },
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

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth === true) {
    // eslint-disable-next-line no-unused-expressions
    localStorage.getItem('HelikiaToken') ? next() : router.push('/');
  } else {
    next();
  }
});

export default router;
