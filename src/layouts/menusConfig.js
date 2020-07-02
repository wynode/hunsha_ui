export default (/* vm */) => {
  return [
    {
      title: '店铺管理',
      icon: 'el-icon-s-shop',
      router: { name: 'shopList' },
    },
    {
      title: 'Sku管理',
      icon: 'el-icon-s-goods',
      router: { name: 'skuList' },
    },
    {
      title: 'Sku分类管理',
      icon: 'el-icon-s-order',
      router: { name: 'skuCategory' },
    },
  ]
}
