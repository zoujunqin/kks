const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const { resolve } = require('./utils/path')
const { dllPath, entry, output } = require('./defaults/dll')

module.exports = {
  entry,
  output,
  plugins: [
    // 清除之前的dll文件
    new CleanWebpackPlugin({ root: resolve(dllPath) }),
    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      path: resolve(dllPath, '[name]-manifest.json'),
      // 保持与 output.library 中名称一致
      name: '[name]_[hash]',
      context: process.cwd()
    })
  ]
}
