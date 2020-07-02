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
      redirect: '/shop-list',
      component: BasicWrapper,
      children: [...all],
    },
  ],
})

export default router
