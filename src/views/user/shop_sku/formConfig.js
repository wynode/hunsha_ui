export const filterFields = (vm) => {
  return [
    {
      // title: '服装名称',
      name: 'keyword',
      widget: 'text',
      xProps: {
        placeholder: '服装名称,编码',
      },
    },
    {
      // title: '服装分类',
      name: 'categoryId',
      widget: 'select',
      xProps: {
        filterable: true,
        placeholder: '服装分类',
        options: vm.skuCategory.map((item) => {
          return {
            label: item.categoryName,
            value: item.categoryId,
          }
        }),
      },
    },
  ]
}

export const addFields = () => {
  return [
    {
      title: '店铺售出价',
      name: 'shopSalePrice',
      widget: 'text',
      xProps: {
        ext: '元',
      },
    },
    {
      title: '店铺租赁价',
      name: 'shopRentPrice',
      widget: 'text',
      xProps: {
        ext: '元',
      },
    },
    {
      title: '店铺定制价',
      name: 'shopCustomizePrice',
      widget: 'text',
      xProps: {
        ext: '元',
      },
    },
    {
      title: '库存',
      name: 'skuNum',
      widget: 'pureNumber',
      xProps: {
        ext: '件',
      },
    },
  ]
}

export const editFields = () => {
  return [
    {
      title: '店铺售出价',
      name: 'shopSalePrice',
      widget: 'text',
      xProps: {
        ext: '元',
      },
    },
    {
      title: '店铺租赁价',
      name: 'shopRentPrice',
      widget: 'text',
      xProps: {
        ext: '元',
      },
    },
    {
      title: '店铺定制价',
      name: 'shopCustomizePrice',
      widget: 'text',
      xProps: {
        ext: '元',
      },
    },
    {
      title: '库存',
      name: 'skuNum',
      widget: 'pureNumber',
      xProps: {
        ext: '件',
      },
    },
  ]
}
