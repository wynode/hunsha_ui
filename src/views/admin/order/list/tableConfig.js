import { OneLineText, FormatTime } from '@/components/CellTools.jsx'

export function tableListCols() {
  return [
    // {
    //   label: '订单Id',
    //   prop: 'orderId',
    //   width: 150,

    // },
    {
      label: '订单号',
      width: 200,
      prop: 'orderNumber',
      component: {
        props: { row: Object },
        render() {
          return (
            <router-link
              to={{
                name: 'adminOrderProfile',
                params: { id: this.row.orderId },
              }}>
              <el-link type="primary">{this.row.orderNumber}</el-link>
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
      label: '店铺名称',
      prop: 'shopInfo',
      component: {
        props: { row: Object },
        render() {
          return (
            <router-link
              to={{
                name: 'adminOrderList',
                query: {
                  shopId: this.row.shopInfo.shopId,
                  shopName: this.row.shopInfo.shopName,
                  shopUserId: this.$route.query.shopUserId,
                  shopUserName: this.$route.query.shopUserName,
                },
              }}>
              <el-link type="primary">{this.row.shopInfo.shopName}</el-link>
            </router-link>
          )
        },
      },
    },
    {
      label: '客户资料备注',
      prop: 'customerNote',
      component: OneLineText,
    },
    {
      label: '店员名称',
      prop: 'shopUserInfo',
      component: {
        props: { row: Object },
        render() {
          return (
            <router-link
              to={{
                name: 'adminOrderList',
                query: {
                  shopUserId: this.row.shopUserInfo.shopUserId,
                  shopUserName: this.row.shopUserInfo.name,
                  shopId: this.$route.query.shopId,
                  shopName: this.$route.query.shopName,
                },
              }}>
              <el-link type="primary">{this.row.shopUserInfo.name}</el-link>
            </router-link>
          )
        },
      },
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
      label: '备注',
      prop: 'note',
      component: OneLineText,
    },
    // {
    //   label: '操作',
    //   width: 150,
    //   component: {
    //     props: { row: Object },
    //     render() {
    //       return (
    //         <span>
    //           <el-button
    //             type="text"
    //             size="small"
    //             onClick={() => vm.modifyItem(this.row)}>
    //             编辑
    //           </el-button>

    //           {/* <el-button
    //             type="text"
    //             class="Ml8"
    //             size="small"
    //             style="color:#f56c6c;"
    //             onClick={() => vm.deleteItem(this.row)}>
    //             删除
    //           </el-button> */}
    //         </span>
    //       )
    //     },
    //   },
    // }, // 操作
  ]
}
