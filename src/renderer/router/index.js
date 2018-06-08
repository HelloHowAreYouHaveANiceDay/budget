import Vue from 'vue';
import Router from 'vue-router';

import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      components: {
        default: Nav,
        sidebar: Sidebar,
        main: Main,
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
