// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import appealsModule from './appeals';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    appealsModule,
  },
});
