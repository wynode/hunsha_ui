export const addFields = (vm) => {
  return [
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
      title: '出售次数',
      name: 'saleTimes',
      widget: 'inputNumber',
      rules: [{ required: true, message: '请填写出售次数', trigger: 'blur' }],
    },
    {
      title: '租赁次数',
      name: 'rentTimes',
      widget: 'inputNumber',
      rules: [{ required: true, message: '请填写租赁次数', trigger: 'blur' }],
    },
    {
      title: '定制次数',
      name: 'customizeTimes',
      widget: 'inputNumber',
      rules: [{ required: true, message: '请填写定制次数', trigger: 'blur' }],
    },
    {
      title: '库存',
      name: 'skuNum',
      widget: 'inputNumber',
      rules: [{ required: true, message: '请填写库存', trigger: 'blur' }],
    },
  ]
}

export const editFields = () => {
  return [
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
      title: '出售次数',
      name: 'saleTimes',
      widget: 'inputNumber',
      rules: [{ required: true, message: '请填写出售次数', trigger: 'blur' }],
    },
    {
      title: '租赁次数',
      name: 'rentTimes',
      widget: 'inputNumber',
      rules: [{ required: true, message: '请填写租赁次数', trigger: 'blur' }],
    },
    {
      title: '定制次数',
      name: 'customizeTimes',
      widget: 'inputNumber',
      rules: [{ required: true, message: '请填写定制次数', trigger: 'blur' }],
    },
    {
      title: '库存',
      name: 'skuNum',
      widget: 'inputNumber',
      rules: [{ required: true, message: '请填写库存', trigger: 'blur' }],
    },
  ]
}
