export const adminMenusConfig = () => {
  return [
    {
      title: '店铺管理',
      icon: 'el-icon-s-shop',
      router: { name: 'shopList' },
    },
    {
      title: '商品订单管理',
      icon: 'el-icon-s-order',
      router: { name: 'adminOrderList' },
    },
    {
      title: 'Sku管理',
      icon: 'el-icon-s-goods',
      router: { name: 'skuList' },
    },
    {
      title: 'Sku分类管理',
      icon: 'el-icon-info',
      router: { name: 'skuCategory' },
    },
  ]
}

export const userMenusConfig = () => {
  return [
    {
      title: '店铺订单管理',
      icon: 'el-icon-s-order',
      router: { name: 'orderList' },
    },
    {
      title: '店铺Sku管理',
      icon: 'el-icon-s-goods',
      router: { name: 'shopSkuList' },
    },
    // {
    //   title: '店铺人员管理',
    //   icon: 'el-icon-user-solid',
    //   router: { name: 'shopUserList' },
    // },
  ]
}
