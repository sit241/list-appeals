import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// Создаем хранилище Vuex
export default new Vuex.Store({
  state: {
    // Глобальное состояние
    count: 0,
  },
  mutations: {
    // Мутации для изменения состояния
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
  },
  actions: {
    // Асинхронные действия
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },
  },
  getters: {
    // Получение данных из состояния
    doubleCount: (state) => state.count * 2,
  },
});
