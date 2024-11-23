import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/pages/Main';
import Auth from '@/components/pages/Auth';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path: '/login',
      name: 'Auth',
      component: Auth,
    },
  ],
});
