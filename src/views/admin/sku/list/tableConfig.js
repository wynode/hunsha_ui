// import { FormatTime } from '@/components/CellTools.jsx'
import { IMG_URL } from '@/config'

export function tableListCols(vm) {
  return [
    {
      label: '分类Id',
      prop: 'categoryId',
      width: 80,
    },
    {
      label: 'sku名称',
      prop: 'skuName',
      width: 120,
    },
    {
      label: 'sku编码',
      prop: 'skuCode',
      width: 90,
    },
    {
      label: 'sku图',
      prop: 'thumb',
      component: {
        props: { row: Object },
        render() {
          const renderNode = (
            <el-popover trigger="hover" placement="right">
              <img
                style="max-width: 400px"
                src={`${IMG_URL}${this.row.thumb}`}
                alt=""
              />
              <p slot="reference">
                <img
                  style="max-width: 100px"
                  src={`${IMG_URL}${this.row.thumb}`}
                  alt=""
                />
              </p>
            </el-popover>
          )
          return this.row.thumb ? renderNode : ''
        },
      },
    },
    {
      label: '简介',
      prop: 'brief',
    },
    {
      label: '进货成本价',
      prop: 'costPrice',
      width: 84,
    },
    {
      label: '建议售出价',
      prop: 'recommendSalePrice',
      width: 84,
    },
    {
      label: '租赁成本价',
      prop: 'rentCostPrice',
      width: 84,
    },
    {
      label: '建议租赁价',
      prop: 'recommendRentPrice',
      width: 84,
    },
    {
      label: '定制成本价',
      prop: 'customizeCostPrice',
      width: 84,
    },
    {
      label: '建议定制价',
      prop: 'recommendCustomizePrice',
      width: 84,
    },
    {
      label: '销售总次数',
      prop: 'saleTimes',
      width: 84,
    },
    {
      label: '租赁总次数',
      prop: 'rentTimes',
      width: 84,
    },
    {
      label: '定制总次数',
      prop: 'customizeTimes',
      width: 84,
    },
    // {
    //   label: '详细介绍',
    //   prop: 'description',
    //   component: {
    //     props: { row: Object },
    //     render() {
    //       return <div domPropsInnerHTML={this.row.description}></div>
    //     },
    //   },
    // },

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
