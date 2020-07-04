import { OneLineText } from '@/components/CellTools.jsx'

export function tableListCols(vm) {
  return [
    // {
    //   label: '上游Id',
    //   prop: 'upId',
    //   width: 120,
    // },
    {
      label: '店铺编码',
      width: 120,
      prop: 'shopCode',
    },
    {
      label: '店铺名称',
      width: 200,
      prop: 'shopName',
      component: {
        props: { row: Object },
        render() {
          return (
            <router-link
              to={{ name: 'shopProfile', params: { id: this.row.shopId } }}>
              <el-link type="primary">{this.row.shopName}</el-link>
            </router-link>
          )
        },
      },
    },
    {
      label: '联系人名称',
      width: 120,
      prop: 'contact',
    },
    {
      label: '联系电话',
      width: 180,
      prop: 'phone',
    },
    {
      label: '店铺地址',
      prop: 'address',
      component: OneLineText,
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
