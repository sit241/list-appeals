// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Main from '@/pages/Main';
import Auth from '@/pages/Auth';
import AppealsList from '@/components/table/AppealsList.vue';
import LogoutButton from '@/components/other/LogoutButton.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'MainHome',
        },
        {
          path: 'LogoutButton',
          name: 'LogoutButton',
          component: LogoutButton,
        },
      ],
    },
    {
      path: '/login',
      name: 'Auth',
      component: Auth,
    },
    // Можно добавить 404 страницу или другие маршруты
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']; // Получаем состояние аутентификации

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.path === '/login' && isAuthenticated) {
    // Если пользователь уже авторизован и пытается зайти на /login, перенаправляем на главную
    next({ path: '/' });
  } else {
    next();
  }
});

export default router;
