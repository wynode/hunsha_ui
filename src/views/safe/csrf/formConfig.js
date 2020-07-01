export const FormFields = () => {
  return [
    {
      title: '类型',
      name: 'type',
      widget: 'select',
      xProps: {
        filterable: true,
        options: [
          { label: '全部', value: '' },
          { label: '全匹配', value: 1 },
          { label: '正则匹配', value: 2 },
        ],
      },
    },
    // {
    //   title: 'name',
    //   name: 'name',
    //   widget: 'text',
    // },
  ]
}

export const SQLFieldCols = () => {
  return [
    {
      title: '路径规则',
      name: 'pathRule',
      widget: 'text',
    },
    {
      title: '规则名',
      name: 'name',
      widget: 'text',
    },
    {
      title: '类型',
      name: 'type',
      widget: 'select',
      xProps: {
        filterable: true,
        options: [
          { label: '全匹配', value: 1 },
          { label: '正则匹配', value: 2 },
        ],
      },
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
