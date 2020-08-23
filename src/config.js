// const runtimeEnv = process.env.NODE_ENV
const buildEnv = process.env.VUE_APP_BUILD

const serverURL = new Map([
  ['development', 'http://othings.fosuss.com/'],
  ['testbuild', 'http://othings.fosuss.com/'],
  ['production', 'http://othings.fosuss.com/'],
])

const imgURL = new Map([
  ['development', 'http://othings.fosuss.com'],
  ['testbuild', 'http://othings.fosuss.com'],
  ['production', 'http://othings.fosuss.com'],
])

export const SERVER_API = serverURL.get(buildEnv)
export const IMG_URL = imgURL.get(buildEnv)

export const AUTH_TOKEN = window.location.href.includes('admin')
  ? 'admin_session'
  : 'user_session'

export const USER_INFO = window.location.href.includes('admin')
  ? 'admin_info'
  : 'user_info'

// upload
export const UPLOAD_URL = `http://othings.fosuss.com/Api/Admin/common/upload`
// export const NOREMAL_UPLOAD_URL = `${serverURL.get(buildEnv)}/misc/file/`
