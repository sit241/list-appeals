<template>
    <div>
      <p>Count: {{ count }}</p>
      <p>Double Count: {{ doubleCount }}</p>
      <button @click="increment">Increment</button>
      <button @click="decrement">Decrement</button>
      <button @click="incrementAsync">Increment Async</button>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      // Доступ к состоянию через геттеры
      count() {
        return this.$store.state.count
      },
      doubleCount() {
        return this.$store.getters.doubleCount
      }
    },
    methods: {
      // Вызов мутаций и действий
      increment() {
        this.$store.commit('increment')
      },
      decrement() {
        this.$store.commit('decrement')
      },
      incrementAsync() {
        this.$store.dispatch('incrementAsync')
      }
    }
  }
  </script>
  