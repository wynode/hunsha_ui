import {
  AddCm,
  AddTian,
  AddJian,
  AddKg,
  FormatTime,
  AddYuan,
} from '@/components/CellTools.jsx'

export function tableListCols(vm) {
  return [
    {
      label: '服装名称',
      width: 120,
      prop: 'skuName',
    },
    {
      label: '订单类型',
      width: 80,
      prop: 'dealType',
      component: {
        props: { row: Object },
        render() {
          let node = ''
          if (this.row.dealType === 1) {
            node = '出售'
          } else if (this.row.dealType === 2) {
            node = '租赁'
          } else if (this.row.dealType === 3) {
            node = '定制'
          }
          return <div>{node}</div>
        },
      },
    },
    {
      label: '客户身高',
      width: 80,
      prop: 'customerHeight',
      component: AddCm,
    },
    {
      label: '客户体重',
      width: 80,
      prop: 'customerWeight',
      component: AddKg,
    },
    {
      label: '衣长',
      width: 60,
      prop: 'clothesLength',
      component: AddCm,
    },
    {
      label: '袖长',
      width: 60,
      prop: 'sleeveLength',
      component: AddCm,
    },
    {
      label: '肩宽',
      width: 60,
      prop: 'shoulderWidth',
      component: AddCm,
    },
    {
      label: '胸围',
      width: 60,
      prop: 'bust',
      component: AddCm,
    },
    {
      label: '中腰',
      width: 60,
      prop: 'middleWaisted',
      component: AddCm,
    },
    {
      label: '下摆',
      width: 60,
      prop: 'hem',
      component: AddCm,
    },
    {
      label: '马甲',
      width: 60,
      prop: 'vest',
      component: AddCm,
    },
    {
      label: '裤长',
      width: 60,
      prop: 'trousersLength',
      component: AddCm,
    },
    {
      label: '腰围',
      width: 60,
      prop: 'waistLine',
      component: AddCm,
    },
    {
      label: '臀围',
      width: 60,
      prop: 'hipLine',
      component: AddCm,
    },
    {
      label: '大腿',
      width: 60,
      prop: 'thighLength',
      component: AddCm,
    },
    {
      label: '小腿',
      width: 60,
      prop: 'shankLength',
      component: AddCm,
    },
    {
      label: '租赁周期',
      width: 80,
      prop: 'rentNum',
      component: AddTian,
    },
    {
      label: '租赁押金',
      width: 80,
      prop: 'rentDepositNum',
      component: AddYuan,
    },
    {
      label: '购买数量',
      width: 80,
      prop: 'skuNum',
      component: AddJian,
    },
    {
      label: '其他备注',
      prop: 'note',
    },
    {
      label: '录入时间',
      prop: 'addTime',
      component: FormatTime,
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
