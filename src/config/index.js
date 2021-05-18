// 根据当前mode获取Base Url 类型
const env = process.env.VUE_APP_BASE_URL_TYPE
const url = 'http://10.10.11.167:8080'

// 根据VUE_APP_BASE_URL_TYPE获取BASE_URL
const getBaseUrl = (env) => {
  switch (env) {
    case 'dev':
      return {
        baseUrl: url,
        uploadUrl: ''
      }
    case 'prod':
      return {
        baseUrl: url,
        uploadUrl: ''
      }
    case 'qa':
      return {
        baseUrl: url,
        uploadUrl: ''
      }
    default:
      return {
        baseUrl: url,
        uploadUrl: ''
      }
  }
}

const appConfig = {
  baseUrl: getBaseUrl(env).baseUrl,
  uploadUrl: getBaseUrl(env).uploadUrl,
  appToken: process.env.VUE_APP_TOKEN_KEY // token key
}

export default appConfig
