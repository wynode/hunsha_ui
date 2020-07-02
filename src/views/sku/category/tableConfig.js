export function tableListCols(vm) {
  return [
    {
      label: '分类Id',
      width: 120,
      prop: 'categoryId',
    },
    {
      label: '性别',
      prop: 'gender',
      component: {
        props: { row: Object },
        render() {
          let showNode = ''
          if (this.row.gender === 1) {
            showNode = '男'
          } else if (this.row.gender === 2) {
            showNode = '女'
          }
          return <p>{showNode}</p>
        },
      },
    },
    {
      label: '分类名称',
      prop: 'categoryName',
    },

    {
      label: '操作',
      width: 150,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button
                type="text"
                size="small"
                onClick={() => vm.modifyItem(this.row)}>
                编辑
              </el-button>

              <el-button
                type="text"
                class="Ml8"
                size="small"
                style="color:#f56c6c;"
                onClick={() => vm.deleteItem(this.row)}>
                删除
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}
