<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'Auth',
    data() {
      return {
        username: process.env.NODE_ENV === 'development' ? '79122333444' : '', // Подставляем в dev-режиме
        password: process.env.NODE_ENV === 'development' ? '123456' : '', // Подставляем в dev-режиме
        error: null,
      };
    },
    methods: {
      ...mapActions('auth', ['login']),
      async handleLogin() {
        try {
          await this.login({
            username: this.username,
            password: this.password,
          });
          alert('Успешный вход!');
        } catch (err) {
          this.error = 'Ошибка входа. Проверьте логин и пароль.';
        }
      },
    },
  };
</script>

<template>
  <div>
    <h1>Авторизация</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Логин" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
    <div v-if="error">{{ error }}</div>
  </div>
</template>
