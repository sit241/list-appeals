import axios from '../plugins/axios';

const state = {
  appeals: [], // Список заявок
  premises: [], // Список домов для фильтрации и автокомплита
  apartments: [], // Список квартир для автокомплита
  appealDetails: null, // Детали текущей заявки (для редактирования)
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
  filters: {
    search: '',
    premiseId: null,
  },
  isLoading: false,
};

const getters = {
  appeals: state => state.appeals,
  premises: state => state.premises,
  apartments: state => state.apartments,
  appealDetails: state => state.appealDetails,
  pagination: state => state.pagination,
  filters: state => state.filters,
  isLoading: state => state.isLoading,
};

const actions = {
  // Получить список заявок
  async fetchAppeals({ commit, state }) {
    commit('setLoading', true);
    try {
      const { page, pageSize } = state.pagination;
      const { search, premiseId } = state.filters;
      const response = await axios.get('/appeals/v1.0/appeals/', {
        params: {
          page,
          page_size: pageSize,
          search: search || '',
          premise_id: premiseId || '',
        },
      });

      commit('setAppeals', response.data.results);
      commit('setPagination', {
        ...state.pagination,
        total: response.data.count,
      });
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
    } finally {
      commit('setLoading', false);
    }
  },

  // Получить список домов
  async fetchPremises({ commit }, search = '') {
    try {
      const response = await axios.get('/geo/v2.0/user-premises/', {
        params: { search },
      });
      commit('setPremises', response.data.results);
    } catch (error) {
      console.error('Ошибка загрузки домов:', error);
    }
  },

  // Получить список квартир
  async fetchApartments({ commit }, premiseId) {
    try {
      const response = await axios.get(`/geo/v1.0/apartments/`, {
        params: { premise_id: premiseId },
      });
      commit('setApartments', response.data);
    } catch (error) {
      console.error('Ошибка загрузки квартир:', error);
    }
  },

  // Создать заявку
  async createAppeal({ dispatch }, appealData) {
    try {
      await axios.post('/appeals/v1.0/appeals/', appealData);
      dispatch('fetchAppeals'); // Обновить список заявок
    } catch (error) {
      console.error('Ошибка создания заявки:', error);
      throw error;
    }
  },

  // Редактировать заявку
  async updateAppeal({ dispatch }, { appealId, appealData }) {
    try {
      await axios.patch(`/appeals/v1.0/appeals/${appealId}/`, appealData);
      dispatch('fetchAppeals'); // Обновить список заявок
    } catch (error) {
      console.error('Ошибка редактирования заявки:', error);
      throw error;
    }
  },

  // Установить детали заявки
  setAppealDetails({ commit }, appealDetails) {
    commit('setAppealDetails', appealDetails);
  },

  // Установить фильтры
  setFilters({ commit }, filters) {
    commit('setFilters', filters);
  },

  // Установить пагинацию
  setPagination({ commit }, pagination) {
    commit('setPagination', pagination);
  },

  // Включить статус загрузки
  setLoadingOn({ commit }) {
    commit('setLoading', true);
  },

  // Выключить статус загрузки
  setLoadingOff({ commit }) {
    commit('setLoading', false);
  },
};

const mutations = {
  setAppeals(state, appeals) {
    state.appeals = appeals;
  },
  setPremises(state, premises) {
    state.premises = premises;
  },
  setApartments(state, apartments) {
    state.apartments = apartments;
  },
  setAppealDetails(state, appealDetails) {
    state.appealDetails = appealDetails;
  },
  setFilters(state, filters) {
    state.filters = { ...state.filters, ...filters };
  },
  setPagination(state, pagination) {
    state.pagination = { ...state.pagination, ...pagination };
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
