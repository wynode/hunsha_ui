export const filterFields = () => {
  return [
    {
      title: '店铺编码或者店铺名称',
      name: 'keyword',
      widget: 'text',
    },
  ]
}

export const addFields = () => {
  return [
    {
      title: '店铺编码',
      name: 'shopCode',
      widget: 'text',
      rules: [{ required: true, message: '请填写店铺名称', trigger: 'blur' }],
    },
    {
      title: '店铺名称',
      name: 'shopName',
      widget: 'text',
      rules: [{ required: true, message: '请填写店铺名称', trigger: 'blur' }],
    },
    {
      title: '联系人名称',
      name: 'contact',
      widget: 'text',
      rules: [{ required: true, message: '请填写联系人名称', trigger: 'blur' }],
    },
    {
      title: '联系电话',
      name: 'phone',
      widget: 'text',
      rules: [{ required: true, message: '请填写联系电话', trigger: 'blur' }],
    },
    {
      title: '店铺地址',
      name: 'address',
      widget: 'text',
      rules: [{ required: true, message: '请填写店铺地址', trigger: 'blur' }],
    },
    {
      title: '备注',
      name: 'note',
      widget: 'text',
      xProps: {
        type: 'textarea',
        autosize: { minRows: 2 },
      },
    },
  ]
}

export const editFields = () => {
  return [
    {
      title: '联系人名称',
      name: 'contact',
      widget: 'text',
      rules: [{ required: true, message: '请填写联系人名称', trigger: 'blur' }],
    },
    {
      title: '联系电话',
      name: 'phone',
      widget: 'text',
      rules: [{ required: true, message: '请填写联系电话', trigger: 'blur' }],
    },
    {
      title: '店铺地址',
      name: 'address',
      widget: 'text',
      rules: [{ required: true, message: '请填写店铺地址', trigger: 'blur' }],
    },
    {
      title: '备注',
      name: 'note',
      widget: 'text',
      xProps: {
        type: 'textarea',
        autosize: { minRows: 2 },
      },
    },
  ]
}
