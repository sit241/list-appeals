// store/appealForm.js
import axios from '../plugins/axios';

const state = {
  appealId: '',

  appealData: {
    dateTime: '',
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    description: '',
  },

  premises: [],
  premiseId: null,
  apartments: [],
  apartmentId: null,

  loading: false,
  error: null,

  popUp: false,
};

const getters = {
  appealId: state => state.appealId,
  popUp: state => state.popUp,
  appealData: state => state.appealData,
  premises: state => state.premises,
  premiseId: state => state.premiseId,
  apartments: state => state.apartments,
  apartmentId: state => state.apartmentId,
  isLoading: state => state.loading,
  error: state => state.error,
};

const actions = {
  // Создание нового обращения
  async createAppeal({ commit }) {
    commit('SET_LOADING', true);
    try {
      const payload = {
        premise_id: state.premiseId,
        apartment_id: state.apartmentId,
        applicant: {
          first_name: state.appealData.firstName,
          last_name: state.appealData.lastName,
          patronymic_name: state.appealData.middleName,
          username: state.appealData.phone,
        },
        description: state.appealData.description,
        due_date: state.appealData.dateTime,

        // TODO: честно говоря хз что это за поле, в документации про него не слова, но без него заявка не создается, повидимому у вас там коды статуса от 1 до 10. и код "1" соответсвует статусу "Новая"
        status_id: 1,
      };

      const response = await axios.post('/appeals/v1.0/appeals/', payload);
      commit('SET_ERROR', null);
      return response.data;
    } catch (error) {
      commit('SET_ERROR', 'Ошибка при создании обращения');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  // Редактирование существующего обращения
  async updateAppeal({ commit }) {
    commit('SET_LOADING', true);
    try {
      const payload = {
        premise_id: state.premiseId,
        apartment_id: state.apartmentId,
        applicant: {
          first_name: state.appealData.firstName,
          last_name: state.appealData.lastName,
          patronymic_name: state.appealData.middleName,
          username: state.appealData.phone,
        },
        description: state.appealData.description,
        due_date: state.appealData.dateTime,

        // TODO: в документации написано что и при редактировании нужно отправлять статус, но если это делать тогда не возможно оставить статус "Новая", а в ТЗ нет указаний, менять статус после редактирования, так что я предположил что там опечатка, и при редактировании статус отправлять не нужно.
        // status_id: 1,
      };

      const response = await axios.patch(
        `/appeals/v1.0/appeals/${state.appealId}/`,
        payload
      );
      commit('SET_ERROR', null);
      return response.data;
    } catch (error) {
      commit('SET_ERROR', 'Ошибка при обновлении обращения');
      throw error;
    } finally {
      commit('SET_LOADING', false);
    }
  },

  // Получение домов с автокомплитом
  async fetchPremises({ commit }, searchTerm) {
    commit('SET_LOADING', true);
    try {
      const response = await axios.get('/geo/v2.0/user-premises/');

      console.log(response.data);

      commit('SET_PREMISES', response.data);
      commit('SET_ERROR', null);
    } catch (error) {
      commit('SET_ERROR', 'Ошибка при загрузке домов');
    } finally {
      commit('SET_LOADING', false);
    }
  },

  // Получение квартир с автокомплитом на основе premise_id
  async fetchApartments({ commit }) {
    commit('SET_LOADING', true);

    console.log(state.premiseId);

    try {
      const response = await axios.get('/geo/v1.0/apartments/', {
        params: {
          premise_id: state.premiseId,
        },
      });

      console.log(response.data);

      commit('SET_APARTMENTS', response.data);
      commit('SET_ERROR', null);
    } catch (error) {
      commit('SET_ERROR', 'Ошибка при загрузке квартир');
    } finally {
      commit('SET_LOADING', false);
    }
  },

  // Изменить параметр
  setPremiseId({ commit }, premiseId) {
    commit('SET_PREMISE_ID', premiseId);
  },
  setApartmentId({ commit }, apartmentId) {
    commit('SET_APARTMENT_ID', apartmentId);
  },
  setAppealData({ commit }, appealData) {
    commit('SET_APPEALD_DATA', appealData);
  },
  setPopUp({ commit }, popUp) {
    commit('SET_POP_UP', popUp);
  },

  // Для заполнения данных обращения
  setAppeal({ commit }, { appealId, premiseId, apartmentId, appealData }) {
    commit('SET_APPEAL_ID', appealId);
    commit('SET_PREMISE_ID', premiseId);
    commit('SET_APARTMENT_ID', apartmentId);

    commit('SET_APPEAL_DATA', appealData);
  },

  // Очистка домов и квартир
  clearPremises({ commit }) {
    commit('CLEAR_PREMISES');
  },
  clearApartments({ commit }) {
    commit('CLEAR_APARTMENTS');
  },
};

const mutations = {
  SET_POP_UP(state, popUp) {
    state.popUp = popUp;
  },
  SET_APPEAL_ID(state, appealId) {
    state.appealId = appealId;
  },
  SET_APPEAL_DATA(state, appealData) {
    state.appealData = appealData;
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  },
  SET_PREMISE_ID(state, payload) {
    state.premiseId = payload;
  },
  SET_APARTMENT_ID(state, payload) {
    state.apartmentId = payload;
  },
  SET_APPEALD_DATA(state, payload) {
    state.appealData = payload;
  },
  SET_ERROR(state, payload) {
    state.error = payload;
  },
  SET_PREMISES(state, payload) {
    state.premises = payload.results;
  },
  SET_APARTMENTS(state, payload) {
    state.apartments = payload.results;
  },
  CLEAR_PREMISES(state) {
    state.premises = [];
  },
  CLEAR_APARTMENTS(state) {
    state.apartments = [];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
