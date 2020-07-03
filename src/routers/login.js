import store from 'store2'

export default [
  {
    path: '/admin/login',
    name: 'adminLogin',
    meta: {
      type: 'admin',
    },
    component: () => import('@/components/login/Login.vue'),
  },
  {
    path: '/admin/logout',
    name: 'adminSsoLogout',
    meta: {
      type: 'admin',
    },
    beforeEnter() {
      store.remove('admin_session')
      store.remove('admin_info')
      window.location.replace('/admin/login')
    },
  },
  {
    path: '/user/login',
    name: 'userLogin',
    meta: {
      type: 'user',
    },
    component: () => import('@/components/login/Login.vue'),
  },
  {
    path: '/user/logout',
    name: 'userSsoLogout',
    meta: {
      type: 'user',
    },
    beforeEnter() {
      store.remove('user_session')
      store.remove('user_info')
      window.location.replace('/user/login')
    },
  },
  // {
  //   path: '/changepwd',
  //   name: 'ChangePwd',
  //   component: () => import('@/views/system/ChangePwd.vue'),
  // },
]
