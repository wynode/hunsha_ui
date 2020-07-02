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
