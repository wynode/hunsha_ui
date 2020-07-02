import requests from './requests'

// Shop
export const fetchShopList = (params = {}) => {
  return requests.get('/Api/Admin/Shop/getList', { params })
}

export const fetchShop = (params = {}) => {
  return requests.get('/Api/Admin/Shop/getOne', { params })
}

export const postShop = (payload) => {
  return requests.post('/Api/Admin/Shop/add', payload)
}

export const patchShop = (payload) => {
  return requests.post('/Api/Admin/Shop/update', payload)
}

export const deleteShop = (payload) => {
  return requests.post('/Api/Admin/Shop/delete', payload)
}

// ShopSku
export const fetchShopSkuList = (params = {}) => {
  return requests.get('/Api/Admin/ShopSku/getList', { params })
}

export const fetchShopSku = (params = {}) => {
  return requests.get('/Api/Admin/ShopSku/getOne', { params })
}

export const postShopSku = (payload) => {
  return requests.post('/Api/Admin/ShopSku/add', payload)
}

export const patchShopSku = (payload) => {
  return requests.post('/Api/Admin/ShopSku/update', payload)
}

export const deleteShopSku = (payload) => {
  return requests.post('/Api/Admin/ShopSku/delete', payload)
}

// ShopUser
export const fetchShopUserList = (params = {}) => {
  return requests.get('/Api/Admin/ShopUser/getList', { params })
}

export const fetchShopUser = (params = {}) => {
  return requests.get('/Api/Admin/ShopUser/getOne', { params })
}

export const postShopUser = (payload) => {
  return requests.post('/Api/Admin/ShopUser/add', payload)
}

export const patchShopUser = (payload) => {
  return requests.post('/Api/Admin/ShopUser/update', payload)
}

export const deleteShopUser = (payload) => {
  return requests.post('/Api/Admin/ShopUser/delete', payload)
}

// Sku
export const fetchSkuList = (params = {}) => {
  return requests.get('/Api/Admin/Sku/getList', { params })
}

export const fetchSku = (params = {}) => {
  return requests.get('/Api/Admin/Sku/getOne', { params })
}

export const postSku = (payload) => {
  return requests.post('/Api/Admin/Sku/add', payload)
}

export const patchSku = (payload) => {
  return requests.post('/Api/Admin/Sku/update', payload)
}

export const deleteSku = (payload) => {
  return requests.post('/Api/Admin/Sku/delete', payload)
}

// SkuCategory
export const fetchSkuCategoryList = (params = {}) => {
  return requests.get('/Api/Admin/SkuCategory/getList', { params })
}

export const fetchSkuCategory = (params = {}) => {
  return requests.get('/Api/Admin/SkuCategory/getOne', { params })
}

export const postSkuCategory = (payload) => {
  return requests.post('/Api/Admin/SkuCategory/add', payload)
}

export const patchSkuCategory = (payload) => {
  return requests.post('/Api/Admin/SkuCategory/update', payload)
}

export const deleteSkuCategory = (payload) => {
  return requests.post('/Api/Admin/SkuCategory/delete', payload)
}
