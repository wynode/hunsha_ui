export const filterFields = (vm) => {
  return [
    // {
    //   // title: '店铺Id',
    //   name: 'shopId',
    //   widget: 'text',
    //   xProps: {
    //     placeholder: '店铺Id',
    //   },
    // },
    // {
    //   // title: 'skuId',
    //   name: 'skuId',
    //   widget: 'text',
    //   xProps: {
    //     placeholder: 'skuId',
    //   },
    // },
    {
      // title: 'skuId',
      name: 'keyword',
      widget: 'text',
      xProps: {
        placeholder: '服装名称或服装编码',
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
    // {
    //   // title: 'skuId',
    //   name: 'categoryName',
    //   widget: 'text',
    //   xProps: {
    //     placeholder: '服装分类',
    //   },
    // },
  ]
}
export const addFields = (vm) => {
  const cols = [
    {
      title: '店铺Id',
      name: 'shopId',
      widget: 'text',
      rules: [{ required: true, message: '请填写店铺Id', trigger: 'blur' }],
    },
    {
      title: 'skuName',
      name: 'skuId',
      widget: 'select',
      xProps: {
        filterable: true,
        options: vm.skuList.map((item) => {
          return {
            label: item.skuName,
            value: item.skuId,
          }
        }),
      },
      rules: [{ required: true, message: '请填写分类Id', trigger: 'blur' }],
    },
    {
      title: '店铺销售价格',
      name: 'shopSalePrice',
      widget: 'text',
      rules: [
        { required: true, message: '请填写店铺销售价格', trigger: 'blur' },
      ],
    },
    {
      title: '店铺租赁价格',
      name: 'shopRentPrice',
      widget: 'text',
      rules: [
        { required: true, message: '请填写店铺租赁价格', trigger: 'blur' },
      ],
    },
    {
      title: '店铺定制价格',
      name: 'shopCustomizePrice',
      widget: 'text',
      rules: [
        { required: true, message: '请填写店铺定制价格', trigger: 'blur' },
      ],
    },
    {
      title: '库存',
      name: 'skuNum',
      widget: 'pureNumber',
      rules: [{ required: true, message: '请填写库存', trigger: 'blur' }],
    },
  ]
  if (vm.routerId) {
    return cols.slice(1)
  } else {
    return cols
  }
}

export const editFields = () => {
  return [
    {
      title: '店铺销售价格',
      name: 'shopSalePrice',
      widget: 'text',
      xProps: {
        ext: '元',
      },
      rules: [
        { required: true, message: '请填写店铺销售价格', trigger: 'blur' },
      ],
    },
    {
      title: '店铺租赁价格',
      name: 'shopRentPrice',
      widget: 'text',
      xProps: {
        ext: '元',
      },
      rules: [
        { required: true, message: '请填写店铺租赁价格', trigger: 'blur' },
      ],
    },
    {
      title: '店铺定制价格',
      name: 'shopCustomizePrice',
      widget: 'text',
      xProps: {
        ext: '元',
      },
      rules: [
        { required: true, message: '请填写店铺定制价格', trigger: 'blur' },
      ],
    },
    {
      title: '库存',
      name: 'skuNum',
      xProps: {
        ext: '件',
      },
      widget: 'pureNumber',
      rules: [{ required: true, message: '请填写库存', trigger: 'blur' }],
    },
  ]
}
