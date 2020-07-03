import { AddYuan, AddJian } from '@/components/CellTools.jsx'
// import { IMG_URL } from '@/config'

export function tableListCols(vm) {
  return [
    {
      label: 'sku名称',
      prop: 'skuInfo.skuName',
    },
    {
      label: '店铺售出价',
      prop: 'shopSalePrice',
      component: AddYuan,
    },
    {
      label: '店铺租赁价',
      prop: 'shopRentPrice',
      component: AddYuan,
    },
    {
      label: '店铺定制价',
      prop: 'shopCustomizePrice',
      component: AddYuan,
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
