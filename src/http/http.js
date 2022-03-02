/*
 * @Desc:
 * @Date: 2021-04-12 16:51:13
 * @LastEditTime: 2021-04-15 14:36:55
 * @LastEditors: zoujunqin
 */

import axios from 'axios'
import defaults from './defaults'
import Interceptor from './interceptor'

class Http {
  axios = null
  instance = null
  interceptor = null
  config = {}

  constructor(axios_, config) {
    this.axios_ = axios_
    this.config = config

    this.create()
    this.createInterceptor()
  }

  create() {
    this.instance = this.axios_.create(this.config)
  }

  createInterceptor() {
    this.interceptor = new Interceptor(this.axios_, this.instance)
  }
}

const http = new Http(axios, defaults.config)

http.interceptor.responseInterceptorUse(
  (response) => {
    console.log(response)
    return response.data
  },
  (error) => {
    console.log(error)
  }
)

export default http
