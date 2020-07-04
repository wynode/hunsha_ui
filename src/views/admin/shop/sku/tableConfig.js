import { AddYuan, AddJian, AddCi } from '@/components/CellTools.jsx'

export function tableListCols(vm) {
  const cols = [
    {
      label: '店铺Id',
      prop: 'shopId',
      width: 100,
    },
    {
      label: 'skuId',
      prop: 'skuId',
      width: 100,
    },
    {
      label: '店铺销售价格',
      prop: 'shopSalePrice',
      component: AddYuan,
    },
    {
      label: '店铺租赁价格',
      prop: 'shopRentPrice',
      component: AddYuan,
    },
    {
      label: '店铺定制价格',
      prop: 'shopCustomizePrice',
      component: AddYuan,
    },
    {
      label: '出售次数',
      prop: 'saleTimes',
      component: AddCi,
    },
    {
      label: '租赁次数',
      prop: 'rentTimes',
      component: AddCi,
    },
    {
      label: '定制次数',
      prop: 'customizeTimes',
      component: AddCi,
    },
    {
      label: '库存',
      prop: 'skuNum',
      component: AddJian,
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
  if (cols.routerId) {
    return cols.slice(1)
  } else {
    return cols
  }
}
