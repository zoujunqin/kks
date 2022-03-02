export default class Interceptor {
  axios
  instance = null
  // Api still requested
  pendingRequests = []

  constructor(axios, instance) {
    this.axios = axios
    this.instance = instance

    this.init()
  }

  init() {
    this.requestInterceptorUse(this.requestResolve, this.requestReject)
    this.responseInterceptorUse(this.responseResolve, this.responseReject)
  }

  requestInterceptorUse() {
    this.instance.interceptors.request.use(...arguments)
    return this.instance.interceptors.request
  }

  responseInterceptorUse() {
    this.instance.interceptors.response.use(...arguments)
    return this.instance.interceptors.response
  }

  requestResolve = (config) => {
    this.add2Pending(config)
    return config
  }
  requestReject = (error) => {
    return error
  }

  responseResolve = (response) => {
    // this.cancelPending(response.config)
    return response
  }
  responseReject = (error) => {
    return error
  }

  add2Pending = (config) => {
    config.cancelToken = new this.axios.CancelToken((c) => {
      this.pendingRequests.push({
        id: this.getPendingId(config),
        cancel: c
      })
    })
  }
  cancelPending = (config) => {
    this.pendingRequest = this.pendingRequests.filter((request) => {
      return request.id === this.getPendingId(config)
        ? (request.cancel(), false)
        : true
    })
  }

  getPendingId = (config) => {
    const { url, method, data, params } = config
    const payload = data || params
    return (
      '_' +
      url +
      method +
      ((typeof payload === 'object' ? JSON.stringify(payload) : payload) || '')
    )
  }
}
