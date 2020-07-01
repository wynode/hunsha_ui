// const runtimeEnv = process.env.NODE_ENV
const buildEnv = process.env.VUE_APP_BUILD

const serverURL = new Map([
  ['development', 'http://hunsha.php20.cn/'],
  ['testbuild', 'http://hunsha.php20.cn/'],
  ['production', 'http://hunsha.php20.cn/'],
])

export const SERVER_API = serverURL.get(buildEnv)

export const AUTH_TOKEN = 'admin_session'
export const USER_INFO = 'adminUser'

// upload
export const UPLOAD_URL = `http://hunsha.php20.cn/Api/Admin/common/upload`
// export const NOREMAL_UPLOAD_URL = `${serverURL.get(buildEnv)}/misc/file/`
