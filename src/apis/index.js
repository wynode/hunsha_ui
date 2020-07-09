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

// AdminShopOrder
export const fetchAdminShopOrderList = (params = {}) => {
  return requests.get('/Api/Admin/ShopOrder/getList', { params })
}

export const fetchAdminShopOrder = (params = {}) => {
  return requests.get('/Api/Admin/ShopOrder/getOne', { params })
}

export const postAdminShopOrder = (payload) => {
  return requests.post('/Api/Admin/ShopOrder/add', payload)
}

export const patchAdminShopOrder = (payload) => {
  return requests.post('/Api/Admin/ShopOrder/update', payload)
}

export const deleteAdminShopOrder = (payload) => {
  return requests.post('/Api/Admin/ShopOrder/delete', payload)
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

// Shop
export const fetchShopInfo = (params = {}) => {
  return requests.get('/Api/ShopUser/Shop/getShopInfo', { params })
}

// ShopOrder
export const fetchShopOrderList = (params = {}) => {
  return requests.get('/Api/ShopUser/ShopOrder/getList', { params })
}

export const fetchShopOrder = (params = {}) => {
  return requests.get('/Api/ShopUser/ShopOrder/getOne', { params })
}

export const postShopOrder = (payload) => {
  return requests.post('/Api/ShopUser/ShopOrder/add', payload)
}

export const patchShopOrder = (payload) => {
  return requests.post('/Api/ShopUser/ShopOrder/update', payload)
}

export const deleteShopOrder = (payload) => {
  return requests.post('/Api/ShopUser/ShopOrder/delete', payload)
}

// ShopOrderSku
export const fetchShopOrderSkuList = (params = {}) => {
  return requests.get('/Api/ShopUser/ShopOrderSku/getList', { params })
}

export const fetchShopOrderSku = (params = {}) => {
  return requests.get('/Api/ShopUser/ShopOrderSku/getOne', { params })
}

export const postShopOrderSku = (payload) => {
  return requests.post('/Api/ShopUser/ShopOrderSku/add', payload)
}

export const patchShopOrderSku = (payload) => {
  return requests.post('/Api/ShopUser/ShopOrderSku/update', payload)
}

export const deleteShopOrderSku = (payload) => {
  return requests.post('/Api/ShopUser/ShopOrderSku/delete', payload)
}

// AdminShopOrderSku
export const fetchAdminShopOrderSkuList = (params = {}) => {
  return requests.get('/Api/Admin/ShopOrderSku/getList', { params })
}

export const fetchAdminShopOrderSku = (params = {}) => {
  return requests.get('/Api/Admin/ShopOrderSku/getOne', { params })
}

export const postAdminShopOrderSku = (payload) => {
  return requests.post('/Api/Admin/ShopOrderSku/add', payload)
}

export const patchAdminShopOrderSku = (payload) => {
  return requests.post('/Api/Admin/ShopOrderSku/update', payload)
}

export const deleteAdminShopOrderSku = (payload) => {
  return requests.post('/Api/Admin/ShopOrderSku/delete', payload)
}

// ShopUserSku
export const fetchStatistic = (params = {}) => {
  return requests.get('/Api/Admin/Statistics/countOrderGroupByDate', { params })
}

export const fetchRanking = (params = {}) => {
  return requests.get('/Api/Admin/Statistics/countOrderGroupList', { params })
}

export const fetchUserStatistic = (params = {}) => {
  return requests.get('/Api/ShopUser/Statistics/countOrderGroupByDate', {
    params,
  })
}

export const fetchUserRanking = (params = {}) => {
  return requests.get('/Api/ShopUser/Statistics/countOrderGroupList', {
    params,
  })
}

export const fetchShopUserSkuList = (params = {}) => {
  return requests.get('/Api/ShopUser/ShopSku/getList', { params })
}

export const fetchShopUserSku = (params = {}) => {
  return requests.get('/Api/ShopUser/ShopSku/getOne', { params })
}

export const fetchShopUserSkuCategory = (params = {}) => {
  return requests.get('/Api/ShopUser/ShopSku/getCategoryList', { params })
}

export const getSkuProfile = (params = {}) => {
  return requests.get('/Api/ShopUser/ShopSku/getOneBySkuId', { params })
}

export const postShopUserSku = (payload) => {
  return requests.post('/Api/ShopUser/ShopSku/add', payload)
}

export const patchShopUserSku = (payload) => {
  return requests.post('/Api/ShopUser/ShopSku/update', payload)
}

export const updateRentStatus = (payload) => {
  return requests.post('/Api/ShopUser/ShopOrderSku/updateRentStatus', payload)
}
export const updateSaleStatus = (payload) => {
  return requests.post('/Api/ShopUser/ShopOrderSku/updateSaleStatus', payload)
}
export const updateCustomerStatus = (payload) => {
  return requests.post(
    '/Api/ShopUser/ShopOrderSku/updateCustomerStatus',
    payload
  )
}
export const postAbnormal = (payload) => {
  return requests.post('/Api/ShopUser/ShopOrderSku/orderSkuAbnormal', payload)
}

export const deleteShopUserSku = (payload) => {
  return requests.post('/Api/ShopUser/ShopSku/delete', payload)
}

// ShopUserPassword
export const patchShopUserPassword = (payload) => {
  return requests.post('/Api/ShopUser/ShopUser/updatePassword', payload)
}

export const getVerify = (params = {}) => {
  return requests.get('/Api/Common/VerifyCode/verifyCode', { params })
}

export const postVerify = (params = {}) => {
  return requests.post('/Api/Common/Order/checkVerify', { params })
}

export const getOrderList = (params = {}) => {
  return requests.get('/Api/Common/Order/getOrderList', { params })
}
