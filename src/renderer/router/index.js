import Vue from 'vue';
import Router from 'vue-router';

import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import Center from '../components/Center';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      components: {
        default: Nav,
        sidebar: Sidebar,
        center: Center,
      },
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
