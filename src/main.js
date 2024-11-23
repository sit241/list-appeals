import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import axiosInstance from './plugins/axios';

Vue.prototype.$axios = axiosInstance;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
