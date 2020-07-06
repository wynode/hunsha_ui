export default [
  // admin
  {
    path: '/admin/shop-list',
    name: 'shopList',
    meta: {
      title: '店铺管理',
      breadcrumb: ['店铺管理', '店铺列表'],
      type: 'admin',
    },
    component: () => import('@/views/admin/shop/list/TableList.vue'),
  },
  {
    path: '/admin/shop-sku',
    name: 'shopSkuList',
    meta: {
      title: '店铺管理',
      breadcrumb: ['店铺管理', '店铺服装列表'],
      type: 'admin',
    },
    component: () => import('@/views/admin/shop/sku/TableList.vue'),
  },
  {
    path: '/admin/shop-user',
    name: 'shopUserList',
    meta: {
      title: '店铺管理',
      breadcrumb: ['店铺管理', '店铺员工列表'],
      type: 'admin',
    },
    component: () => import('@/views/admin/shop/user/TableList.vue'),
  },
  {
    path: '/admin/shop/:id',
    name: 'shopProfile',
    meta: {
      title: '店铺详情',
      breadcrumb: ['店铺管理', '店铺详情'],
      type: 'admin',
    },
    component: () => import('@/views/admin/shop/list/ItemProfile.vue'),
  },
  {
    path: '/admin/order-list',
    name: 'adminOrderList',
    meta: {
      title: '订单列表',
      breadcrumb: ['订单管理', '订单列表'],
      type: 'admin',
    },
    component: () => import('@/views/admin/order/list/TableList.vue'),
  },
  {
    path: '/admin/order/:id',
    name: 'adminOrderProfile',
    meta: {
      title: '订单详情',
      breadcrumb: ['订单管理', '订单详情'],
      type: 'admin',
    },
    component: () => import('@/views/admin/order/list/ItemProfile.vue'),
  },
  {
    path: '/admin/order-sku',
    name: 'adminOrderSku',
    meta: {
      title: '订单服装列表',
      breadcrumb: ['订单管理', '订单服装列表'],
      type: 'admin',
    },
    component: () => import('@/views/admin/order/order_sku/TableList.vue'),
  },
  {
    path: '/admin/sku-list',
    name: 'skuList',
    meta: {
      title: '服装管理',
      breadcrumb: ['服装管理'],
      type: 'admin',
    },
    component: () => import('@/views/admin/sku/list/TableList.vue'),
  },
  {
    path: '/admin/sku-category',
    name: 'skuCategory',
    meta: {
      title: '服装分类管理',
      breadcrumb: ['服装分类管理'],
      type: 'admin',
    },
    component: () => import('@/views/admin/sku/category/TableList.vue'),
  },
  // user
  {
    path: '/user/order-list',
    name: 'orderList',
    meta: {
      title: '订单列表',
      breadcrumb: ['订单管理', '订单列表'],
      type: 'user',
    },
    component: () => import('@/views/user/order/list/TableList.vue'),
  },
  {
    path: '/user/order/:id',
    name: 'orderProfile',
    meta: {
      title: '订单详情',
      breadcrumb: ['店铺订单管理', '订单详情'],
      type: 'user',
    },
    component: () => import('@/views/user/order/list/ItemProfile.vue'),
  },
  {
    path: '/user/shop-sku',
    name: 'userShopSkuList',
    meta: {
      title: '店铺服装管理',
      breadcrumb: ['店铺服装管理'],
      type: 'user',
    },
    component: () => import('@/views/user/shop_sku/TableList.vue'),
  },
  {
    path: '/user/shop-user',
    name: 'ShopUserList',
    meta: {
      title: '店铺人员管理',
      breadcrumb: ['店铺人员管理'],
      type: 'user',
    },
    component: () => import('@/views/user/shop_user/TableList.vue'),
  },
]
