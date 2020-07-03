import requests from './requests'

export const postAdminLogin = (params = {}) => {
  return requests.get('/api/admin/auth/login', { params })
}

export const postAdminLogout = (payload) => {
  return requests.post('/api/admin/auth/logout', payload)
}

export const getAdminUserInfo = (params = {}) => {
  return requests.get('/api/admin/auth/getInfo', { params })
}

export const postUserLogin = (params = {}) => {
  return requests.get('/Api/User/Auth/login', { params })
}

export const postUserLogout = (payload) => {
  return requests.post('/Api/User/Auth/logout', payload)
}

export const getUserUserInfo = (params = {}) => {
  return requests.get('/Api/User/Auth/getInfo', { params })
}
