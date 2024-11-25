<script>
  import AppealsList from '@/components/table/AppealsList.vue';
  import LogoutButton from '@/components/other/LogoutButton.vue';
  import RequestForm from '@/components/popup/RequestForm.vue';

  export default {
    components: {
      AppealsList,
      LogoutButton,
      RequestForm,
    },
  };
</script>

<template>
  <div class="wrapper">
    <RequestForm />

    <AppealsList />
  </div>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: flex-end;

    width: 100%;
  }
</style>
