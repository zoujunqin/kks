import ENV_INFO from '/.env'

const NODE_ENV = process.env.NODE_ENV
const contentType = 'application/json;charset=UTF-8'
const timeout = 60000

const URL = {
  development: {
    baseURL: ENV_INFO.HTTP_BASE_URL
    // baseURL: '/API_AGENT'
    // baseURL: 'https://jcyb.jcgov.gov.cn/ltci'
  },
  production: {
    baseURL: ''
  }
}

const config = {
  timeout,
  baseURL: URL[NODE_ENV].baseURL,
  headers: {
    'Content-Type': contentType
  },
  withCredentials: true
}

export default {
  URL,
  config
}
