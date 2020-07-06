// import { dateFormat } from '@/utils/dateFormat'
import Mutation from '@what-a-faka/obj-mutation'
import { join } from '@/utils/common'
export const filtersMutation = new Mutation({
  status: { format: join },
})

export const filterFields = (vm) => {
  return [
    {
      // title: '订单Id',
      name: 'orderId',
      widget: 'text',
      xProps: {
        placeholder: '订单Id',
      },
    },
    {
      // title: 'skuId',
      name: 'skuId',
      widget: 'text',
      xProps: {
        placeholder: 'skuId',
      },
    },
    {
      // title: '订单类型',
      name: 'dealType',
      widget: 'select',
      xProps: {
        filterable: true,
        placeholder: '订单类型',
        options: [
          { label: '出售', value: 1 },
          { label: '租赁', value: 2 },
          { label: '定制', value: 3 },
        ],
      },
    },
    {
      // title: '销售状态',
      name: 'status',
      widget: 'select',
      xProps: {
        placeholder: '销售状态',
        multiple: true,
        filterable: true,
        options: vm.statusList,
      },
    },
    {
      // title: '录入时间',
      name: 'dateTimeRange',
      widget: 'datetimepicker',
      xProps: {
        startPlaceholder: '录入开始时间',
        endPlaceholder: '录入结束时间',
        type: 'datetimerange',
        'value-format': 'yyyy-MM-dd HH:mm:ss',
      },
    },
  ]
}

export const addFields = (vm) => {
  return [
    {
      title: '服装名称',
      name: 'skuId',
      widget: 'select',

      xProps: {
        filterable: true,
        options: vm.shopSkuList.map((item) => {
          return {
            label: item.skuInfo.skuName,
            value: item.skuInfo.skuId,
          }
        }),
      },
      rules: [{ required: true, message: '请选择sku', trigger: 'blur' }],
    },
    {
      title: '订单类型',
      name: 'dealType',
      widget: 'radio',

      xProps: {
        filterable: true,
        options: [
          { label: '出售', value: 1 },
          { label: '租赁', value: 2 },
          { label: '定制', value: 3 },
        ],
      },
      rules: [{ required: true, message: '请选择订单类型', trigger: 'blur' }],
    },
    {
      title: '客户身高',
      name: 'customerHeight',
      widget: 'text',

      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '客户体重',
      name: 'customerWeight',
      widget: 'text',

      xProps: {
        ext: 'kg',
      },
    },
    {
      title: '衣长',
      name: 'clothesLength',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '袖长',
      name: 'sleeveLength',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '肩宽',
      name: 'shoulderWidth',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '胸围',
      name: 'bust',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '中腰',
      name: 'middleWaisted',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '下摆',
      name: 'hem',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '马甲',
      name: 'vest',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '裤长',
      name: 'trousersLength',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '腰围',
      name: 'waistLine',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '臀围',
      name: 'hipLine',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '大腿',
      name: 'thighLength',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '小腿',
      name: 'shankLength',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '租赁周期',
      name: 'rentNum',
      widget: 'text',
      xProps: {
        ext: '天',
      },
      rules: [{ required: true, message: '请填写租赁周期', trigger: 'blur' }],
    },
    {
      title: '租赁押金',
      name: 'rentDepositNum',
      widget: 'text',
      xProps: {
        ext: '元',
      },
      rules: [{ required: true, message: '请填写租赁押金', trigger: 'blur' }],
    },
    {
      title: '购买数量',
      name: 'skuNum',
      widget: 'pureNumber',
      xProps: {
        ext: '件',
      },
      rules: [{ required: true, message: '请填写购买数量', trigger: 'blur' }],
    },
    {
      title: '其他备注',
      name: 'note',
      widget: 'text',

      xProps: {
        type: 'textarea',
        maxlength: '255',
        'show-word-limit': true,
      },
    },
  ]
}

export const editFields = (vm) => {
  return [
    {
      title: '服装名称',
      name: 'skuId',
      widget: 'select',

      xProps: {
        filterable: true,
        options: vm.shopSkuList.map((item) => {
          return {
            label: item.skuInfo.skuName,
            value: item.skuInfo.skuId,
          }
        }),
      },
      rules: [{ required: true, message: '请选择sku', trigger: 'blur' }],
    },
    {
      title: '订单类型',
      name: 'dealType',
      widget: 'radio',

      xProps: {
        filterable: true,
        options: [
          { label: '出售', value: 1 },
          { label: '租赁', value: 2 },
          { label: '定制', value: 3 },
        ],
      },
      rules: [{ required: true, message: '请选择订单类型', trigger: 'blur' }],
    },
    {
      title: '客户身高',
      name: 'customerHeight',
      widget: 'text',

      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '客户体重',
      name: 'customerWeight',
      widget: 'text',

      xProps: {
        ext: 'kg',
      },
    },
    {
      title: '衣长',
      name: 'clothesLength',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '袖长',
      name: 'sleeveLength',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '肩宽',
      name: 'shoulderWidth',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '胸围',
      name: 'bust',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '中腰',
      name: 'middleWaisted',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '下摆',
      name: 'hem',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '马甲',
      name: 'vest',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '裤长',
      name: 'trousersLength',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '腰围',
      name: 'waistLine',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '臀围',
      name: 'hipLine',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '大腿',
      name: 'thighLength',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '小腿',
      name: 'shankLength',
      widget: 'puretext',
      xProps: {
        ext: 'cm',
      },
    },
    {
      title: '租赁周期',
      name: 'rentNum',
      widget: 'text',
      xProps: {
        ext: '天',
      },
      rules: [{ required: true, message: '请填写租赁周期', trigger: 'blur' }],
    },
    {
      title: '租赁押金',
      name: 'rentDepositNum',
      widget: 'text',
      xProps: {
        ext: '元',
      },
      rules: [{ required: true, message: '请填写租赁押金', trigger: 'blur' }],
    },
    {
      title: '购买数量',
      name: 'skuNum',
      widget: 'pureNumber',
      xProps: {
        ext: '件',
      },
      rules: [{ required: true, message: '请填写购买数量', trigger: 'blur' }],
    },
    {
      title: '其他备注',
      name: 'note',
      widget: 'text',

      xProps: {
        type: 'textarea',
        maxlength: '255',
        'show-word-limit': true,
      },
    },
  ]
}
