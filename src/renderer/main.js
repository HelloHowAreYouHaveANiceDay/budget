import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';

/* eslint-disable */
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true;
  require('devtron').install();
}
/* eslint-enable */

require('./assets/sass/main.scss');

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
