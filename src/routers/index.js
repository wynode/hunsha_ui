import Vue from 'vue'
import Router from 'vue-router'
import BasicWrapper from '@/layouts/BasicWrapper.vue'

import all from './all'
import login from './login'

Vue.use(Router)
/* eslint-disable */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...login,
    {
      path: '/',
      redirect: '/admin/shop-list',
      component: BasicWrapper,
      children: [...all],
    },
    {
      path: '/admin/*',
      redirect: '/admin/shop-list',
    },
    {
      path: '/user/*',
      redirect: '/user/order-list',
    },
    {
      path: '*',
      redirect: '/admin/shop-list',
    },
  ],
})

export default router
