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
      label: '客户名称',
      width: 120,
      prop: 'customerName',
    },
    {
      label: '客户手机号码',
      width: 120,
      prop: 'customerPhone',
    },
    {
      label: '客户微信',
      width: 120,
      prop: 'customerWeiXin',
    },
    {
      label: '客户资料备注',
      prop: 'customerNote',
      component: OneLineText,
    },
    {
      label: '收货地址',
      prop: 'address',
      component: OneLineText,
    },
    {
      label: '预期收货时间',
      width: 160,
      prop: 'receiveGoodsTime',
      component: FormatTime,
    },
    {
      label: '收货方式',
      width: 120,
      prop: 'receiveGoodsType',
      component: OneLineText,
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

              {/* <el-button
                type="text"
                class="Ml8"
                size="small"
                style="color:#f56c6c;"
                onClick={() => vm.deleteItem(this.row)}>
                删除
              </el-button> */}
            </span>
          )
        },
      },
    }, // 操作
  ]
}
