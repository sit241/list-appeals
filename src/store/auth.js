import axios from '../plugins/axios';

const state = {
  token: localStorage.getItem('authToken') || null, // Загружаем токен из localStorage при старте
};

const getters = {
  isAuthenticated: state => !!state.token, // Проверка аутентификации
  authToken: state => state.token, // Получение токена
};

const actions = {
  async login({ commit }, credentials) {
    try {
      const response = await axios.post('/auth/login/', credentials);
      const token = response.data.key;
      commit('setToken', token);
      return token;
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      throw error;
    }
  },

  logout({ commit }) {
    commit('clearToken');
  },
};

const mutations = {
  setToken(state, token) {
    state.token = token;
    localStorage.setItem('authToken', token);
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  },

  clearToken(state) {
    state.token = null;
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
