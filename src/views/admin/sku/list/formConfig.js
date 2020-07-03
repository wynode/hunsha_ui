export const filterFields = () => {
  return [
    {
      title: 'sku名称',
      name: 'keyword',
      widget: 'text',
    },
  ]
}

export const addFields = (vm) => {
  return [
    {
      title: '分类名称',
      name: 'categoryId',
      widget: 'select',
      xProps: {
        filterable: true,
        options: vm.skuCategory.map((item) => {
          return {
            label: item.categoryName,
            value: item.categoryId,
          }
        }),
      },
      rules: [{ required: true, message: '请填写分类名称', trigger: 'blur' }],
    },
    {
      title: 'sku名称',
      name: 'skuName',
      widget: 'text',
      rules: [{ required: true, message: '请填写sku名称', trigger: 'blur' }],
    },
    {
      title: 'sku编码',
      name: 'skuCode',
      widget: 'text',
      rules: [{ required: true, message: '请填写sku编码', trigger: 'blur' }],
    },
    {
      title: 'sku图',
      name: 'thumb',
      widget: 'upload',
      rules: [{ required: true, message: '请上传sku图', trigger: 'blur' }],
      xProps: {
        type: 'img',
        disabled: false,
      },
    },
    {
      title: '简介',
      name: 'brief',
      widget: 'text',
      xProps: {
        type: 'textarea',
        autosize: { minRows: 2 },
      },
      rules: [{ required: true, message: '请填写brief', trigger: 'blur' }],
    },
    {
      title: '进货成本价',
      name: 'costPrice',
      widget: 'text',
      rules: [{ required: true, message: '请填写进货成本价', trigger: 'blur' }],
    },
    {
      title: '建议售出价',
      name: 'recommendSalePrice',
      widget: 'text',
      rules: [{ required: true, message: '请填写建议售出价', trigger: 'blur' }],
    },
    {
      title: '租赁成本价',
      name: 'rentCostPrice',
      widget: 'text',
      rules: [{ required: true, message: '请填写租赁成本价', trigger: 'blur' }],
    },
    {
      title: '建议租赁价',
      name: 'recommendRentPrice',
      widget: 'text',
      rules: [{ required: true, message: '请填写建议租赁价', trigger: 'blur' }],
    },
    {
      title: '定制成本价',
      name: 'customizeCostPrice',
      widget: 'text',
      rules: [{ required: true, message: '请填写定制成本价', trigger: 'blur' }],
    },
    {
      title: '建议定制价',
      name: 'recommendCustomizePrice',
      widget: 'text',
      rules: [{ required: true, message: '请填写建议定制价', trigger: 'blur' }],
    },
    {
      title: '销售总次数',
      name: 'saleTimes',
      widget: 'text',
      rules: [{ required: true, message: '请填写销售总次数', trigger: 'blur' }],
    },
    {
      title: '租赁总次数',
      name: 'rentTimes',
      widget: 'text',
      rules: [{ required: true, message: '请填写租赁总次数', trigger: 'blur' }],
    },
    {
      title: '定制总次数',
      name: 'customizeTimes',
      widget: 'text',
      rules: [{ required: true, message: '请填写定制总次数', trigger: 'blur' }],
    },
    {
      title: '详细介绍',
      name: 'description',
      widget: 'UEditor',
      xProps: {},
      rules: [{ required: true, message: '请填写详细介绍', trigger: 'blur' }],
    },
  ]
}

export const editFields = () => {
  return [
    {
      title: 'sku名称',
      name: 'skuName',
      widget: 'text',
      rules: [{ required: true, message: '请填写sku名称', trigger: 'blur' }],
    },
    {
      title: 'sku图',
      name: 'thumb',
      widget: 'upload',
      rules: [{ required: true, message: '请上传sku图', trigger: 'blur' }],
      xProps: {
        type: 'img',
        disabled: false,
      },
    },
    {
      title: '简介',
      name: 'brief',
      widget: 'text',
      xProps: {
        type: 'textarea',
        autosize: { minRows: 2 },
      },
      rules: [{ required: true, message: '请填写brief', trigger: 'blur' }],
    },
    {
      title: '进货成本价',
      name: 'costPrice',
      widget: 'text',
      rules: [{ required: true, message: '请填写进货成本价', trigger: 'blur' }],
    },
    {
      title: '建议售出价',
      name: 'recommendSalePrice',
      widget: 'text',
      rules: [{ required: true, message: '请填写建议售出价', trigger: 'blur' }],
    },
    {
      title: '租赁成本价',
      name: 'rentCostPrice',
      widget: 'text',
      rules: [{ required: true, message: '请填写租赁成本价', trigger: 'blur' }],
    },
    {
      title: '建议租赁价',
      name: 'recommendRentPrice',
      widget: 'text',
      rules: [{ required: true, message: '请填写建议租赁价', trigger: 'blur' }],
    },
    {
      title: '定制成本价',
      name: 'customizeCostPrice',
      widget: 'text',
      rules: [{ required: true, message: '请填写定制成本价', trigger: 'blur' }],
    },
    {
      title: '建议定制价',
      name: 'recommendCustomizePrice',
      widget: 'text',
      rules: [{ required: true, message: '请填写建议定制价', trigger: 'blur' }],
    },
    {
      title: '销售总次数',
      name: 'saleTimes',
      widget: 'text',
      rules: [{ required: true, message: '请填写销售总次数', trigger: 'blur' }],
    },
    {
      title: '租赁总次数',
      name: 'rentTimes',
      widget: 'text',
      rules: [{ required: true, message: '请填写租赁总次数', trigger: 'blur' }],
    },
    {
      title: '定制总次数',
      name: 'customizeTimes',
      widget: 'text',
      rules: [{ required: true, message: '请填写定制总次数', trigger: 'blur' }],
    },
    {
      title: '详细介绍',
      name: 'description',
      widget: 'UEditor',
      xProps: {},
      rules: [{ required: true, message: '请填写详细介绍', trigger: 'blur' }],
    },
  ]
}
