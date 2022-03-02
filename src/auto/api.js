import Vue from 'vue'
import http from '@/http/http'

Vue.prototype.$api = {}

function isGET(method) {
  return method.toUpperCase() === 'GET'
}

function useDataOrParams(method) {
  return isGET(method) ? 'params' : 'data'
}

// Manually cancel
function cancel(config) {
  http.interceptor.cancelPending(config)
}

// 自动化遍历
const files = require.context('../api', true, /\.js$/)
const modules = files.keys().reduce((needed, key) => {
  const name = key.replace(/^\.\/(.*)\.\w+$/, '$1')
  const file = files(key)
  // needed[name] = file.default || file
  needed[name] = { ...file.default, ...file }
  delete needed[name].default
  return needed
}, {})

// 注册方法
Object.keys(modules).forEach((name) => {
  const module = Object.keys(modules[name]).reduce((needed, key) => {
    const api = modules[name][key]
    let config = {}

    config.string = function stringConfig() {
      const [method, url] = api.split(' ')
      const config = {
        method,
        url,
        [useDataOrParams(method)]: arguments[0]
      }
      stringConfig.cancel = cancel.bind(this, config)

      return http.instance.request(config)
    }

    config.object = function () {
      return http.instance.request({
        ...api,
        [useDataOrParams(api.method)]: arguments[0]
      })
    }

    config.function = function functionConfig() {
      return api(...arguments)
    }

    needed[key] = config[typeof api]
    return needed
  }, {})
  Vue.prototype.$api[name] = module
})
