import { OneLineText, FormatTime } from '@/components/CellTools.jsx'

export function tableListCols(vm) {
  return [
    {
      label: '订单号',
      prop: 'orderNumber',
      width: 200,
      component: {
        props: { row: Object },
        render() {
          return (
            <router-link
              to={{ name: 'orderProfile', params: { id: this.row.orderId } }}>
              <el-button type="text">{this.row.orderNumber}</el-button>
            </router-link>
          )
        },
      },
    },
    {
      label: '录入时间',
      width: 160,
      prop: 'addTime',
      component: FormatTime,
    },
    {
      label: '备注',
      prop: 'note',
      component: OneLineText,
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
    },
  ]
}
