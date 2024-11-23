import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import axiosInstance from './plugins/axios';
import '@mdi/font/css/materialdesignicons.min.css';

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
