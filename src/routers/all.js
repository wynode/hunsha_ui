export default [
  {
    path: '/shop',
    name: 'shopList',
    meta: {
      title: '店铺管理',
      breadcrumb: ['店铺管理', '店铺列表'],
    },
    component: () => import('@/views/shop/list/TableList.vue'),
  },
  {
    path: '/shop/:id',
    name: 'shopProfile',
    meta: {
      title: '店铺详情',
      breadcrumb: ['店铺管理', '店铺详情'],
    },
    component: () => import('@/views/shop/list/ItemProfile.vue'),
  },
  {
    path: '/sku',
    name: 'skuList',
    meta: {
      title: 'sku管理',
      breadcrumb: ['sku管理'],
    },
    component: () => import('@/views/sku/list/TableList.vue'),
  },
  {
    path: '/sku-category',
    name: 'skuCategory',
    meta: {
      title: 'sku分类管理',
      breadcrumb: ['sku分类管理'],
    },
    component: () => import('@/views/sku/category/TableList.vue'),
  },
]
