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
  <div>
    <div class="header">
      <LogoutButton />
    </div>

    <AppealsList />
  </div>
</template>

<style lang="scss">
  .header {
    display: flex;
    justify-content: flex-end;

    width: 100%;
  }
</style>
