export function tableListCols(vm) {
  return [
    // {
    //   label: '分类Id',
    //   width: 200,
    //   prop: 'categoryId',
    // },
    {
      label: '男装/女装',
      prop: 'gender',
      width: 200,
      component: {
        props: { row: Object },
        render() {
          let showNode = ''
          if (this.row.gender === 1) {
            showNode = '男装'
          } else if (this.row.gender === 2) {
            showNode = '女装'
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
      label: '服装列表',
      component: {
        props: { row: Object },
        render() {
          return (
            <router-link
              to={{
                name: 'skuList',
                query: { categoryId: this.row.categoryId },
              }}>
              <el-button type="text">服装列表</el-button>
            </router-link>
          )
        },
      },
    },

    {
      label: '操作',
      width: 200,
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
