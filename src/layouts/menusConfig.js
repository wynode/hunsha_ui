export const adminMenusConfig = () => {
  return [
    {
      title: '店铺管理',
      icon: 'el-icon-s-shop',
      children: [
        {
          title: '店铺管理',
          router: { name: 'shopList' },
        },
        // {
        //   title: '店铺sku管理',
        //   router: { name: 'shopSkuList' },
        // },
        {
          title: '店铺员工管理',
          router: { name: 'shopUserList' },
        },
      ],
    },
    {
      title: '订单管理',
      icon: 'el-icon-s-order',
      children: [
        {
          title: '订单管理',
          router: { name: 'adminOrderList' },
        },
        {
          title: '订单sku管理',
          router: { name: 'adminOrderSku' },
        },
      ],
    },
    {
      title: 'Sku管理',
      icon: 'el-icon-s-goods',
      children: [
        {
          title: 'Sku列表',
          router: { name: 'skuList' },
        },
        {
          title: 'Sku分类管理',
          router: { name: 'skuCategory' },
        },
      ],
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
      router: { name: 'userShopSkuList' },
    },
    // {
    //   title: '店铺人员管理',
    //   icon: 'el-icon-user-solid',
    //   router: { name: 'shopUserList' },
    // },
  ]
}
