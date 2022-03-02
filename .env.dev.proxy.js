/**
 * 新添加路径之后需要重启服务
 * 会被 webpack 下 devServer.proxy 使用
 * 主要是配置多个代理，本地开发切换 HTTP_BASE_URL 之后不需要重启服务
 */

module.exports = ['/API_AGENT-http://localhost:5000']
