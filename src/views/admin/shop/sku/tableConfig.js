import {
  AddYuan,
  AddJian,
  AddCi,
  OneLineText,
} from '@/components/CellTools.jsx'
import { IMG_URL } from '@/config'

export function tableListCols(vm) {
  const cols = [
    {
      label: '分类名称',
      prop: 'categoryName',
      width: 100,
      // component: {
      //   props: { row: Object },
      //   render() {
      //     return (
      //       <div>
      //         <router-link
      //           to={{
      //             name: 'shopProfile',
      //             query: { categoryId: this.row.categoryId },
      //           }}>
      //           <el-link type="primary">{this.row.categoryName}</el-link>
      //         </router-link>
      //       </div>
      //     )
      //   },
      // },
    },
    {
      label: 'sku名称',
      prop: 'skuName',
      width: 160,
      component: {
        props: { row: Object },
        render() {
          const nannv = this.row.gender == 1 ? '（男装）' : '（女装）'
          return (
            <div>
              {this.row.skuName}
              {nannv}
            </div>
          )
        },
      },
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
                style="max-width: 400px; max-height: 600px"
                src={`${IMG_URL}${this.row.thumb}`}
                alt=""
              />
              <p slot="reference">
                <img
                  style="max-width: 100px; max-height: 100px"
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

// import { PriceFormat } from '@/components/CellTools.jsx'
// import { IMG_URL } from '@/config'

export function showTableListCols(vm) {
  return [
    {
      label: '分类名称',
      prop: 'categoryInfo.categoryName',
      width: 100,
    },
    {
      label: 'sku名称',
      prop: 'skuName',
      width: 160,
    },
    {
      label: 'sku编码',
      prop: 'skuCode',
      width: 120,
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
                style="max-width: 400px; max-height: 600px"
                src={`${IMG_URL}${this.row.thumb}`}
                alt=""
              />
              <p slot="reference">
                <img
                  style="max-width: 100px; max-height: 100px"
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
      component: OneLineText,
    },
    {
      label: '预览',
      width: 150,
      component: {
        props: { row: Object },
        render() {
          return (
            <span>
              <el-button
                type="text"
                size="small"
                onClick={() => vm.showItem(this.row)}>
                预览
              </el-button>
            </span>
          )
        },
      },
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
                onClick={() => vm.xuanzhong(this.row)}>
                选中
              </el-button>
            </span>
          )
        },
      },
    }, // 操作
  ]
}
