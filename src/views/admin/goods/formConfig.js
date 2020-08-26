export const filterFields = () => {
  return [
    {
      name: 'keyword',
      widget: 'text',
      xProps: {
        placeholder: '客户名称，电话或微信',
      },
    },
  ]
}
export const dialogFormFields = (type) => {
  const totalArray = [
    {
      title: '客户名称',
      name: 'customerName',
      widget: 'text',
      rules: [{ required: true, message: '请填写客户名称', trigger: 'blur' }],
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
  if (type === 'add') {
    const addArray = ['customerName', 'note']
    return totalArray.filter((item) => {
      return addArray.includes(item.name)
    })
  } else if (type === 'edit') {
    const editArray = ['customerName', 'note']
    return totalArray.filter((item) => {
      return editArray.includes(item.name)
    })
  }
}
