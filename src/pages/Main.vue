<script>
  import AppealsList from '@/components/table/AppealsList.vue';
  import LogoutButton from '@/components/other/LogoutButton.vue';

  export default {
    components: {
      AppealsList,
      LogoutButton,
    },
  };
</script>

<template>
  <div class="wrapper">
    <!-- TODO: для быстрого тестирования логики выхода и входа -->
    <router-view />

    <AppealsList />
  </div>
</template>

<style lang="scss" scoped>
  .wrapper {
    padding: 15px;
    padding-bottom: 0;
  }
  .header {
    display: flex;
    justify-content: flex-end;

    width: 100%;
  }
</style>
