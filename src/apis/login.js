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

export const postShopUserLogin = (params = {}) => {
  return requests.get('/Api/ShopUser/Auth/login', { params })
}

export const postShopUserLogout = (payload) => {
  return requests.post('/Api/ShopUser/Auth/logout', payload)
}

export const getShopUserUserInfo = (params = {}) => {
  return requests.get('/Api/ShopUser/Auth/getInfo', { params })
}
