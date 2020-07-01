import requests from './requests'

export const fetchAccessLogList = (params = {}) => {
  return requests.get('/System/Log/accessLogList', { params })
}

export const fetchIpAccessLogList = (params = {}) => {
  return requests.get('/System/IpAccess/ipAccessLog', { params })
}

export const fetchAttackLogList = (params = {}) => {
  return requests.get('/System/Log/attackLogList', { params })
}

export const fetchLogConfig = (params = {}) => {
  return requests.get('/System/Log/getLogConfig', { params })
}

export const patchLogConfig = (payload) => {
  return requests.post('/System/Log/updateLogConfig', payload)
}

export const fetchIPList = (params = {}) => {
  return requests.get('/System/IpList/list', { params })
}

export const postIP = (payload) => {
  return requests.post('/System/IpList/addIp', payload)
}

export const patchIP = (payload) => {
  return requests.post('/System/IpList/updateIp', payload)
}

export const delIP = (payload) => {
  return requests.post('/System/IpList/delIp', payload)
}

export const fetchParamsFilter = (params = {}) => {
  return requests.get('/System/ParamFilter/list', { params })
}

export const postParamsFilter = (payload) => {
  return requests.post('/System/ParamFilter/addParamFilter', payload)
}

export const patchParamsFilter = (payload) => {
  return requests.post('/System/ParamFilter/updateParamFilter', payload)
}

export const delParamsFilter = (payload) => {
  return requests.post('/System/ParamFilter/delParamFilter', payload)
}

export const fetchUA = (params = {}) => {
  return requests.get('/System/ClientUaForbidden/list', { params })
}

export const postUA = (payload) => {
  return requests.post('/System/ClientUaForbidden/addUaForbidden', payload)
}

export const patchUA = (payload) => {
  return requests.post('/System/ClientUaForbidden/updateUaForbidden', payload)
}

export const delUA = (payload) => {
  return requests.post('/System/ClientUaForbidden/deleteUaForbidden', payload)
}

export const fetchBaseSetting = (params = {}) => {
  return requests.get('/System/BaseSetting/getBaseSetting', { params })
}

export const patchBaseSetting = (payload) => {
  return requests.post('/System/BaseSetting/updateSetting', payload)
}

export const fetchVerifyCode = (params = {}) => {
  return requests.get('/Common/VerifyCode/verifyCode', { params })
}
export const fetchDiskSplit = (params = {}) => {
  return requests.get('/System/Status/disk', { params })
}
export const fetchMemory = (params = {}) => {
  return requests.get('/System/Status/memory', { params })
}
export const fetchIOstatis = (params = {}) => {
  return requests.get('/System/Status/ioStats', { params })
}

export const fetchCpuInfo = (params = {}) => {
  return requests.get('/System/Status/cpuInfo', { params })
}
export const fetchGeneralInfo = (params = {}) => {
  return requests.get('/System/Status/generalInfo', { params })
}

export const fetchIPForbidden = (params = {}) => {
  return requests.get('/System/IpCityForbidden/list', { params })
}

export const fetchProvince = (params = {}) => {
  return requests.get('/System/IpCityForbidden/provinceList', { params })
}

export const patchIPForbidden = (payload) => {
  return requests.post('/System/IpCityForbidden/updateForbidden', payload)
}

export const fetchCountryIPForbidden = (params = {}) => {
  return requests.get('/System/IpCountryForbidden/list', { params })
}

export const postCountryIPForbidden = (payload) => {
  return requests.post('/System/IpCountryForbidden/addIpCountry', payload)
}

export const patchCountryIPForbidden = (payload) => {
  return requests.post('/System/IpCountryForbidden/updateIpCountry', payload)
}

export const delCountryIPForbidden = (payload) => {
  return requests.post('/System/IpCountryForbidden/deleteIpCountry', payload)
}

export const fetchMap = (params = {}) => {
  return requests.get('/System/IpAccess/getProvinceSumData', { params })
}

// sql注入列表
export const fetchSQL = (params = {}) => {
  return requests.get('/System/InjectWhitePath/list', { params })
}

export const postSQL = (payload) => {
  return requests.post('/System/InjectWhitePath/addInjectWhitePath', payload)
}

export const patchSQL = (payload) => {
  return requests.post('/System/InjectWhitePath/updateInjectWhitePath', payload)
}

export const deleteSQL = (payload) => {
  return requests.post('/System/InjectWhitePath/delInjectWhitePath', payload)
}

// urlblackwhite列表
export const fetchURLBW = (params = {}) => {
  return requests.get('/System/PathBlackWhite/list', { params })
}

export const postURLBW = (payload) => {
  return requests.post('/System/PathBlackWhite/addPathBlackWhite', payload)
}

export const patchURLBW = (payload) => {
  return requests.post('/System/PathBlackWhite/updatePathBlackWhite', payload)
}

export const deleteURLBW = (payload) => {
  return requests.post('/System/PathBlackWhite/delPathBlackWhite', payload)
}
