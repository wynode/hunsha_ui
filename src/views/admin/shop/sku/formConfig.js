export const filterFields = () => {
  return [
    {
      // title: '店铺Id',
      name: 'shopId',
      widget: 'text',
      xProps: {
        placeholder: '店铺Id',
      },
    },
    {
      // title: 'skuId',
      name: 'skuId',
      widget: 'text',
      xProps: {
        placeholder: 'skuId',
      },
    },
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
      widget: 'inputNumber',
      rules: [
        { required: true, message: '请填写店铺销售价格', trigger: 'blur' },
      ],
    },
    {
      title: '店铺租赁价格',
      name: 'shopRentPrice',
      widget: 'inputNumber',
      rules: [
        { required: true, message: '请填写店铺租赁价格', trigger: 'blur' },
      ],
    },
    {
      title: '店铺定制价格',
      name: 'shopCustomizePrice',
      widget: 'inputNumber',
      rules: [
        { required: true, message: '请填写店铺定制价格', trigger: 'blur' },
      ],
    },
    {
      title: '库存',
      name: 'skuNum',
      widget: 'inputNumber',
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
      widget: 'text',
      rules: [{ required: true, message: '请填写库存', trigger: 'blur' }],
    },
  ]
}
