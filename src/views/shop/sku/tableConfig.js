// import { FormatTime } from '@/components/CellTools.jsx'

export function tableListCols(vm) {
  return [
    {
      label: 'skuId',
      prop: 'skuId',
      width: 100,
    },
    {
      label: '店铺销售价格',
      prop: 'shopSalePrice',
    },
    {
      label: '店铺租赁价格',
      prop: 'shopRentPrice',
    },
    {
      label: '店铺定制价格',
      prop: 'shopCustomizePrice',
    },
    {
      label: '出售次数',
      prop: 'saleTimes',
    },
    {
      label: '租赁次数',
      prop: 'rentTimes',
    },
    {
      label: '定制次数',
      prop: 'customizeTimes',
    },
    {
      label: '库存',
      prop: 'skuNum',
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
