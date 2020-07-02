import store from 'store2'

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/login/Login.vue'),
  },
  {
    path: '/logout',
    name: 'ssoLogout',
    beforeEnter() {
      store.clearAll()
      window.location.replace('/login')
    },
  },
  // {
  //   path: '/changepwd',
  //   name: 'ChangePwd',
  //   component: () => import('@/views/system/ChangePwd.vue'),
  // },
]
