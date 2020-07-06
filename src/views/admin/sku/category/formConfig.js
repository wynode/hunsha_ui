export const addFields = () => {
  return [
    {
      title: '男装/女装',
      name: 'gender',
      widget: 'radio',
      xProps: {
        filterable: true,
        options: [
          { label: '男装', value: 1 },
          { label: '女装', value: 2 },
        ],
      },
      rules: [{ required: true, message: '请选择男装/女装', trigger: 'blur' }],
    },
    {
      title: '分类名称',
      name: 'categoryName',
      widget: 'text',
      rules: [{ required: true, message: '请填写分类名称', trigger: 'blur' }],
    },
  ]
}

export const editFields = () => {
  return [
    {
      title: '男装/女装',
      name: 'gender',
      widget: 'radio',
      xProps: {
        filterable: true,
        options: [
          { label: '男装', value: 1 },
          { label: '女装', value: 2 },
        ],
      },
      rules: [{ required: true, message: '请选择男装/女装', trigger: 'blur' }],
    },
    {
      title: '分类名称',
      name: 'categoryName',
      widget: 'text',
      rules: [{ required: true, message: '请填写分类名称', trigger: 'blur' }],
    },
  ]
}
