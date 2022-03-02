const { resolve } = require('../utils/path')

const dllPath = '../../public/vendor'
const entry = {
  // The library to be extracted (需要提取的库)
  _vendor: ['vue', 'vuex', 'vue-router', 'axios']
}
const output = {
  path: resolve(dllPath),
  filename: '[name].dll.js',
  // _vendor.dll.js中暴露出的全局变量名
  // 保持与 webpack.DllPlugin 中名称一致
  library: '[name]_[hash]'
}

module.exports = { dllPath, entry, output }
