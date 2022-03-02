/**
 * 需要代理：同时满足 API_AGENT 开头和 .env.dev.proxy.js 文件下配置
 * 不需要代理：正常路径，不以 API_AGENT 开头
 *
 * 需要代理的会被 devServer.proxy 代理到 - 后面的路径
 * eg: /API_AGENT-https://jcyb.jcgov.gov.cn/ltci     =>    https://jcyb.jcgov.gov.cn/ltci
 */

// eg: 不需要代理的路径
// const HTTP_BASE_URL = 'https://jcyb.jcgov.gov.cn/ltci'

const HTTP_BASE_URL = '/API_AGENT-http://localhost:5000'

module.exports = {
  HTTP_BASE_URL
}
