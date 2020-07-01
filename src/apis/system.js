import requests from './requests'

export const postLogin = (params = {}) => {
  return requests.get('/api/admin/auth/login', { params })
}

export const postLogout = (payload) => {
  return requests.post('/api/admin/auth/logout', payload)
}

export const getUserInfo = (params = {}) => {
  return requests.get('/api/admin/auth/getInfo', { params })
}

// 通知手机列表
export const fetchPhoneList = (params = {}) => {
  return requests.get('/System/EventNotify/phoneList', { params })
}

export const postPhone = (payload) => {
  return requests.post('/System/EventNotify/addPhone', payload)
}

export const deletePhone = (payload) => {
  return requests.post('/System/EventNotify/delPhone', payload)
}

// 通知列表
export const fetchNotifyList = (params = {}) => {
  return requests.get('/System/EventNotify/list', { params })
}
