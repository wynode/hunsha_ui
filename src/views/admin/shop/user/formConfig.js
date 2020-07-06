export const filterFields = () => {
  return [
    {
      // title: '店铺Id',
      name: 'keyword',
      widget: 'text',
      xProps: {
        placeholder: '店铺Id',
      },
    },
  ]
}

export const addFields = (vm) => {
  const cols = [
    {
      title: '店铺名称',
      name: 'shopId',
      widget: 'select',
      xProps: {
        filterable: true,
        options: vm.shopList.map((item) => {
          return {
            label: item.shopName,
            value: item.shopId,
          }
        }),
      },
      rules: [{ required: true, message: '请填写店铺名称', trigger: 'blur' }],
    },
    {
      title: '店员账号',
      name: 'account',
      widget: 'text',
      rules: [{ required: true, message: '请填写店员账号', trigger: 'blur' }],
    },
    {
      title: '密码',
      name: 'password',
      widget: 'text',
      rules: [{ required: true, message: '请填写密码', trigger: 'blur' }],
      xProps: {
        'show-password': true,
      },
    },
    {
      title: '录单店员',
      name: 'name',
      widget: 'text',
      rules: [{ required: true, message: '请填写录单店员', trigger: 'blur' }],
    },
    {
      title: '身份证号码',
      name: 'idNum',
      widget: 'text',
      rules: [{ required: true, message: '请填写身份证号码', trigger: 'blur' }],
    },
    {
      title: '联系电话',
      name: 'phone',
      widget: 'text',
      rules: [{ required: true, message: '请填写联系电话', trigger: 'blur' }],
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
      title: '店员账号',
      name: 'account',
      widget: 'text',
      rules: [{ required: true, message: '请填写店员账号', trigger: 'blur' }],
    },
    {
      title: '密码',
      name: 'password',
      widget: 'text',
      rules: [{ required: true, message: '请填写密码', trigger: 'blur' }],
      xProps: {
        'show-password': true,
      },
    },
    {
      title: '录单店员',
      name: 'name',
      widget: 'text',
      rules: [{ required: true, message: '请填写录单店员', trigger: 'blur' }],
    },
    {
      title: '身份证号码',
      name: 'idNum',
      widget: 'text',
      rules: [{ required: true, message: '请填写身份证号码', trigger: 'blur' }],
    },
    {
      title: '联系电话',
      name: 'phone',
      widget: 'text',
      rules: [{ required: true, message: '请填写联系电话', trigger: 'blur' }],
    },
  ]
}
