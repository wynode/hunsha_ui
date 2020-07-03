import Axios from 'axios'
import store from 'store2'
import { SERVER_API } from '@/config'
import { Notification } from 'element-ui'

function requestFactory(httpClient) {
  httpClient.interceptors.request.use(
    (opts) => {
      let token = ''
      let tokenName = ''
      if (window.location.href.includes('/admin')) {
        tokenName = 'admin_session'
        token = store.get(tokenName)
      } else {
        tokenName = 'user_session'
        token = store.get(tokenName)
      }
      if (token) {
        /* eslint-disable no-param-reassign */
        if (opts.params) {
          opts.params[tokenName] = token
        } else {
          opts.data[tokenName] = token
        }
      }
      if (opts.data) {
        const formData = new FormData()
        Object.keys(opts.data).forEach((key) => {
          formData.append(key, opts.data[key])
        })
        opts.data = formData
      }
      opts.headers = {
        ...opts.headers,
        'Content-Type': 'multipart/form-data',
      }
      return opts
    },
    (error) => Promise.reject(error)
  )
}

function responseFactory(httpClient) {
  httpClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response.status === 401) {
        if (window.location.href.includes('/admin')) {
          window.location.replace('/admin/login')
          // store.remove('admin_session')
        } else {
          window.location.replace('/user/login')
          // store.remove('user_session')
        }

        return Promise.reject(new Error({ code: 401, message: '登录超时' }))
      } else if (error.response.status === 500) {
        Notification.error('服务器处理出错')
      } else {
        Notification.error(error.response.data.msg || '请求出错')
      }

      return Promise.reject(error.response)
    }
  )
}

function clientFactory(options = {}) {
  const client = Axios.create(options)
  requestFactory(client)
  responseFactory(client)
  return client
}

const request = clientFactory({
  baseURL: SERVER_API,
  timeout: 1000 * 180, // 20sec
})

export default request
