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
    // {
    //   // title: '店员Id',
    //   name: 'shopUserId',
    //   widget: 'text',
    //   xProps: {
    //     placeholder: '店员Id',
    //   },
    // },
    {
      // title: '订单号',
      name: 'orderNumber',
      widget: 'text',
      xProps: {
        placeholder: '店铺Id',
      },
    },
    {
      // title: '录入时间',
      name: 'dateTimeRange',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
        startPlaceholder: '录入开始时间',
        endPlaceholder: '录入结束时间',
        'value-format': 'yyyy-MM-dd HH:mm:ss',
      },
    },
    {
      // title: '预期收货时间',
      name: 'receiveDateTimeRange',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetimerange',
        startPlaceholder: '预期收货开始时间',
        endPlaceholder: '预期收货时间结束时间',
        'value-format': 'yyyy-MM-dd HH:mm:ss',
      },
    },
  ]
}

export const addFields = () => {
  return [
    {
      title: '客户名称',
      name: 'customerName',
      widget: 'text',
      rules: [{ required: true, message: '请填写客户名称', trigger: 'blur' }],
    },
    {
      title: '客户手机号码',
      name: 'customerPhone',
      widget: 'text',
      rules: [
        { required: true, message: '请填写客户手机号码', trigger: 'blur' },
      ],
    },
    {
      title: '客户微信',
      name: 'customerWeiXin',
      widget: 'text',
      rules: [{ required: true, message: '请填写客户微信', trigger: 'blur' }],
    },
    {
      title: '客户资料备注',
      name: 'customerNote',
      widget: 'text',
      xProps: {
        type: 'textarea',
        maxlength: '255',
        'show-word-limit': true,
      },
      rules: [
        { required: true, message: '请填写客户资料备注', trigger: 'blur' },
      ],
    },
    {
      title: '收货地址',
      name: 'address',
      widget: 'text',
      xProps: {
        type: 'textarea',
        maxlength: '255',
        'show-word-limit': true,
      },
      rules: [{ required: true, message: '请填写收货地址', trigger: 'blur' }],
    },
    {
      title: '预期收货时间',
      name: 'receiveGoodsTime',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetime',
        placeholder: '请选择预期收货时间',
      },
      rules: [{ required: true, message: '请填写收货地址', trigger: 'blur' }],
    },
    {
      title: '收货方式',
      name: 'receiveGoodsType',
      widget: 'text',
      defaultValue: '自提',
      rules: [{ required: true, message: '请填写收货地址', trigger: 'blur' }],
    },
    {
      title: '备注',
      name: 'note',
      widget: 'text',
      xProps: {
        type: 'textarea',
        maxlength: '255',
        'show-word-limit': true,
      },
    },
  ]
}

export const editFields = () => {
  return [
    {
      title: '客户名称',
      name: 'customerName',
      widget: 'text',
      rules: [{ required: true, message: '请填写客户名称', trigger: 'blur' }],
    },
    {
      title: '客户手机号码',
      name: 'customerPhone',
      widget: 'text',
      rules: [
        { required: true, message: '请填写客户手机号码', trigger: 'blur' },
      ],
    },
    {
      title: '客户微信',
      name: 'customerWeiXin',
      widget: 'text',
      rules: [{ required: true, message: '请填写客户微信', trigger: 'blur' }],
    },
    {
      title: '客户资料备注',
      name: 'customerNote',
      widget: 'text',
      xProps: {
        type: 'textarea',
        maxlength: '255',
        'show-word-limit': true,
      },
      rules: [
        { required: true, message: '请填写客户资料备注', trigger: 'blur' },
      ],
    },
    {
      title: '收货地址',
      name: 'address',
      widget: 'text',
      xProps: {
        type: 'textarea',
        maxlength: '255',
        'show-word-limit': true,
      },
      rules: [{ required: true, message: '请填写收货地址', trigger: 'blur' }],
    },
    {
      title: '预期收货时间',
      name: 'receiveGoodsTime',
      widget: 'datetimepicker',
      xProps: {
        type: 'datetime',
        placeholder: '请选择预期收货时间',
      },
      rules: [{ required: true, message: '请填写收货地址', trigger: 'blur' }],
    },
    {
      title: '收货方式',
      name: 'receiveGoodsType',
      widget: 'text',
      rules: [{ required: true, message: '请填写收货地址', trigger: 'blur' }],
    },
    {
      title: '备注',
      name: 'note',
      widget: 'text',
      xProps: {
        type: 'textarea',
        maxlength: '255',
        'show-word-limit': true,
      },
    },
  ]
}
