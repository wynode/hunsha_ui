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
      label: '店铺名称',
      prop: 'shopInfo',
      component: {
        props: { row: Object },
        render() {
          const { shopUserId, shopUserName } = this.$route.query || {}
          const { shopId, shopName } = this.row.shopInfo || {}
          return (
            <router-link
              to={{
                name: 'adminOrderList',
                query: {
                  shopId: shopId,
                  shopName: shopName,
                  shopUserId: shopUserId,
                  shopUserName: shopUserName,
                },
              }}>
              <el-link type="primary">{shopName}</el-link>
            </router-link>
          )
        },
      },
    },
    {
      label: '录单店员',
      prop: 'shopUserInfo',
      component: {
        props: { row: Object },
        render() {
          const { shopId, shopName } = this.$route.query || {}
          const { shopUserId, name } = this.row.shopUserInfo || {}
          return (
            <router-link
              to={{
                name: 'adminOrderList',
                query: {
                  shopUserId: shopUserId,
                  shopUserName: name,
                  shopId: shopId,
                  shopName: shopName,
                },
              }}>
              <el-link type="primary">{name}</el-link>
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
