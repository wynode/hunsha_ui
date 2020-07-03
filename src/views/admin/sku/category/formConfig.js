export const addFields = () => {
  return [
    {
      title: '性别',
      name: 'gender',
      widget: 'select',
      xProps: {
        filterable: true,
        options: [
          { label: '男', value: 1 },
          { label: '女', value: 2 },
        ],
      },
      rules: [{ required: true, message: '请填写性别', trigger: 'blur' }],
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
      title: '性别',
      name: 'gender',
      widget: 'select',
      xProps: {
        filterable: true,
        options: [
          { label: '男', value: 1 },
          { label: '女', value: 2 },
        ],
      },
      rules: [{ required: true, message: '请填写性别', trigger: 'blur' }],
    },
    {
      title: '分类名称',
      name: 'categoryName',
      widget: 'text',
      rules: [{ required: true, message: '请填写分类名称', trigger: 'blur' }],
    },
  ]
}
