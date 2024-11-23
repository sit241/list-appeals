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
    <div class="header">
      <LogoutButton />
    </div>

    <AppealsList />
  </div>
</template>

<style lang="scss" scoped>
  .wrapper {
    padding: 15px;
  }
  .header {
    display: flex;
    justify-content: flex-end;

    width: 100%;
  }
</style>
