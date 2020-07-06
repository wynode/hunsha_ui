// import { FormatTime } from '@/components/CellTools.jsx'

export function tableListCols(vm) {
  const cols = [
    {
      label: '店铺名称',
      prop: 'shopInfo.shopName',
    },
    {
      label: '店员账号',
      prop: 'account',
    },
    {
      label: '录单店员',
      prop: 'name',
    },
    {
      label: '身份证号码',
      prop: 'idNum',
    },
    {
      label: '联系电话',
      prop: 'phone',
    },
    {
      label: '是否禁用',
      width: 150,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-switch
                value={vm.forbidden || Boolean(this.row.isForbid)}
                onChange={(value) => vm.modifyForbidden(this.row, value)}
                active-color="#F56C6C"
                inactive-color="#009688"
                active-text="禁用"
                inactive-text="正常"></el-switch>
            </span>
          )
        },
      },
    }, // 操作
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
  if (vm.routerId) {
    return cols.slice(1)
  } else {
    return cols
  }
}
