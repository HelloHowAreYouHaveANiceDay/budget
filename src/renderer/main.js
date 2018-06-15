import Vue from 'vue';
import axios from 'axios';

import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';

import App from './App';
import router from './router';
import store from './store';
/* eslint-disable */
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));

if (process.env.NODE_ENV === 'development') {
  Vue.prototype.$log = console.log;
  Vue.config.devtools = true;
  require('devtron').install();
} else {
  Vue.prototype.$log = () => {};
}
/* eslint-enable */

require('./assets/sass/main.scss');

Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

fontawesome.library.add(solid);
// Use any icon from the Solid style

Vue.component('font-awesome-icon', FontAwesomeIcon);
// Use the icon component anywhere in the app


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
