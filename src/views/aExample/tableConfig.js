// import { FormatTime } from '@/components/CellTools.jsx'

export function tableListCols(vm) {
  return [
    // {
    //   label: '上游Id',
    //   prop: 'upId',
    //   width: 120,
    // },
    {
      label: '店铺编码',
      prop: 'shopCode',
    },
    {
      label: '店铺名称',
      prop: 'shopName',
    },
    {
      label: '联系人名称',
      prop: 'contact',
    },
    {
      label: '联系电话',
      prop: 'phone',
    },
    {
      label: '店铺地址',
      prop: 'address',
    },
    {
      label: '备注',
      prop: 'note',
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
