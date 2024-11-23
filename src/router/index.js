// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Main from '@/components/pages/Main';
import Auth from '@/components/pages/Auth';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Auth',
      component: Auth,
    },
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
