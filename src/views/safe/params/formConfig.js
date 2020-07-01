export const ChangeFields = () => {
  return [
    {
      title: '路径',
      name: 'path',
      widget: 'text',
    },
    {
      title: '名称',
      name: 'name',
      widget: 'text',
    },
    {
      title: '规则',
      name: 'rule',
      widget: 'text',
    },
    {
      title: '类型',
      name: 'type',
      widget: 'select',
      xProps: {
        filterable: true,
        options: [
          { label: '全局规则', value: 1 },
          { label: '路径匹配规则', value: 2 },
          { label: '正则匹配规则', value: 3 },
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
