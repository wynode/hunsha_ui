import { dateTimeRangeFormat } from './dateFormat'

export const toPercent = (num, decimals = 2) => {
  const n = Number(num)
  if (Number.isNaN(n)) {
    throw new Error('paramater must be num-like')
  }

  return `${(n * 100).toFixed(decimals)}%`
}

export const toThousands = (num) => {
  if (num == null) return num
  const numSplitStr = num.toString().split('.')

  if (numSplitStr.length > 1) {
    const [integer, reset] = numSplitStr
    const thousandsInt = integer.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    return `${thousandsInt}.${reset}`
  }

  return num.toLocaleString ? num.toLocaleString() : num.toString()
}

export const splite = (raw, mixSymbl = ' ') => {
  return typeof raw === 'string' ? raw.split(mixSymbl) : raw
}

export const join = (raw, mixSymbl = ',') => {
  return Array.isArray(raw) ? raw.join(mixSymbl) : raw
}

export const minuteJoin = (raw, mixSymbl = ',') => {
  if (!Array.isArray(raw) || !raw[1]) return
  return raw.map((item) => item * 60 || 0).join(mixSymbl)
}

export const dateTimeJoin = (raw, mixSymbl = ',') => {
  return join(dateTimeRangeFormat(raw), mixSymbl)
}

export const dateJoin = (raw, mixSymbl = ',') => {
  return join(dateTimeRangeFormat(raw, 'yyyy-MM-dd'), mixSymbl)
}

export const numberJoin = (raw, mixSymbl = ',') => {
  if (Array.isArray(raw) && raw.some((v) => v == null)) {
    return null
  }
  return join(raw, mixSymbl)
}

export const getStatusOptions = (delType) => {
  if (delType === 1) {
    return [
      { label: '订单异常', value: -2 },
      { label: '订单退款', value: -1 },
      { label: '订单创建', value: 0 },
      { label: '订单发货', value: 1 },
      { label: '订单收货', value: 10 },
    ]
  } else if (delType === 2) {
    return [
      { label: '订单异常', value: -2 },
      { label: '订单退款', value: -1 },
      { label: '订单创建', value: 0 },
      { label: '订单发货', value: 1 },
      { label: '订单收货', value: 2 },
      { label: '客户归还商品', value: 10 },
    ]
  } else if (delType === 3) {
    return [
      { label: '订单异常', value: -2 },
      { label: '订单退款', value: -1 },
      { label: '订单创建', value: 0 },
      { label: '定制完成', value: 1 },
      { label: '订单发货', value: 2 },
      { label: '订单收货', value: 10 },
    ]
  }
}

export const getStatus = (status, delType) => {
  let statusString = ''
  getStatusOptions(delType).forEach((item) => {
    if (item.value === status) {
      statusString = item.label
    }
  })
  return statusString
}

export const cascaderJoin = (raw, mixSymbl = ',') => {
  if (Array.isArray(raw)) {
    // NOTE 数组 v 可能为空，导致 dp 里最终数据可能会出现 undefined
    const dp = raw.map((v) => v[v.length - 1])
    return join(dp, mixSymbl)
  }
  return raw
}

export const textCutOff = (text, retain) => {
  return typeof text === 'string'
    ? text.length <= retain
      ? text
      : text.slice(0, retain) + '...'
    : text
}

export const byteToMGb = (byte) => {
  if (!byte) {
    return 0
  }
  const mb = byte / 1024 / 1024
  const kb = byte / 1024
  if (mb > 1024) {
    const gb = Math.round((mb / 1024) * 100) / 100
    return `${gb}GB`
  } else {
    if (kb > 1024) {
      return `${Math.round(mb * 100) / 100}MB`
    } else {
      return `${Math.round(kb * 100) / 100}KB`
    }
  }
}

export const amountToW = (amount) => {
  const amountPrice = Number(amount)
  if (!amountPrice || amountPrice < 10000) {
    return amount || 0
  }
  return `${(amountPrice / 10000).toFixed(2)}万`
}
