import http from '../http/http'

export default {
  test: 'post /web/sys/login/dologinNoPass'
  // test: {
  //   method: 'post',
  //   url: '/web/sys/login/dologinNoPass'
  // }，
}
export function test1(data) {
  const config = {
    method: 'post',
    url: '/api/users/add',
    data
  }

  return http.instance.request(config)
}
