export const dealType = new Map([
  [1, '出售'],
  [2, '租赁'],
  [3, '定制'],
])

export const totalNum = new Map([
  ['totalNum', '定制总单数'],
  ['rentTotalNum', '出售总单数'],
  ['saleTotalNum', '租赁总单数'],
  ['customizeTotalNum', '定制总单数'],
])

export const totalOrderNum = new Map([
  ['totalOrderNum', '定制异常总单数'],
  ['rentTotalOrderNum', '异常总单数'],
  ['saleTotalOrderNum', '出售异常总单数'],
  ['customizeTotalOrderNum', '租赁异常总单数'],
])

export const totalPrice = new Map([
  ['totalPrice', '定制交易额'],
  ['totalPrice', '交易额'],
  ['rentTotalPrice', '出售交易额'],
  ['saleTotalPrice', '租赁交易额'],
])

export const totalAbnormalNum = new Map([
  ['rentTotalNum', '异常总单数'],
  ['saleTotalNum', '出售异常总单数'],
  ['customizeTotalNum', '租赁异常总单数'],
  ['totalNum', '定制异常总单数'],
])
