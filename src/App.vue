<script>
  export default {
    name: 'App',
  };
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
  @import '@/assets/scss/variables.scss';

  body {
    margin: 0;
    background-color: #eeeeee;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }

  /* Стилизация полосы прокрутки */
  ::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: $input-border;
    border-radius: 6px;
    border: 3px solid $background-color;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: $primary-color;
  }

  ::-webkit-scrollbar-track {
    background-color: $background-color-main;
    border-radius: 6px;
    // box-shadow: inset $box-shadow-light;
  }

  ::-webkit-scrollbar-corner {
    background-color: $background-color-main;
  }
</style>
