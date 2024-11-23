<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'LogoutButton',
    methods: {
      ...mapActions('auth', ['logout']),

      async handleLogout() {
        try {
          await this.logout();

          this.$router.push('/login');
        } catch (error) {
          console.error('Ошибка при выходе:', error);
        }
      },
    },
  };
</script>

<template>
  <button @click="handleLogout" class="logout-button">
    Выйти
  </button>
</template>

<style scoped>
  .logout-button {
    padding: 10px 20px;
    background-color: #ff4d4f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .logout-button:hover {
    background-color: #ff7875;
  }
</style>
