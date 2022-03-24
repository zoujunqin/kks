const glob = require('glob')
const webpack = require('webpack')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin')

const AGENT_PATHS = require('./.env.dev.proxy.js')
const { envIsProd } = require('./build/utils/env')
const { resolve } = require('./build/utils/path')
const { entry } = require('./build/defaults/dll')

const {
  createWebpackBundleAnalyzer,
  smp,
  isAnalyze
} = require('./vue.config.analyze.utils')

const AGENT_PATH_BEGINS = 'API_AGENT'

const configureWebpackConfig = {
  module: {
    unknownContextCritical: true
  }
}

module.exports = {
  runtimeCompiler: true,
  ...createDevServer(AGENT_PATHS),

  configureWebpack: isAnalyze
    ? smp.wrap(configureWebpackConfig)
    : configureWebpackConfig,

  chainWebpack(config) {
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')

    config.when(envIsProd, (config) => {
      config.plugin('dll-reference-plugin').use(webpack.DllReferencePlugin, [
        {
          context: process.cwd(),
          manifest: require(`./public/vendor/${
            Object.keys(entry)[0]
          }-manifest.json`)
        }
      ])

      config
        .plugin('add-asset-html-webpack-plugin')
        .use(AddAssetHtmlWebpackPlugin, [
          {
            // dll文件位置
            filepath: resolve('public/vendor/*.js'),
            // dll 引用路径
            publicPath: './vendor',
            // dll最终输出的目录
            outputPath: './vendor'
          }
        ])
        .after('dll-reference-plugin')

      config
        .plugin('hard-source-webpack-plugin')
        .use(HardSourceWebpackPlugin)
        .after('dll-reference-plugin')

      // 分析相关
      createWebpackBundleAnalyzer(config)
    })

    config.plugin('purgecss-webpack-plugin').use(PurgecssWebpackPlugin, [
      {
        paths: glob.sync('./src/**/*', { nodir: true })
      }
    ])

    createSvgSpriteLoader(config)
  }
}

/**
 * @desc: 处理 svg
 * @param {*} config
 * @return {*}
 */
const createSvgSpriteLoader = (config) => {
  const svgRule = config.module.rule('svg')
  // 清除已有的所有 loader。
  // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
  svgRule.uses.clear()
  svgRule.use('svg-sprite-loader').loader('svg-sprite-loader').options({
    symbolId: 'icon-[name]'
  })
}

/**
 * @desc: 生成 devServer
 * @param {Array} agentPaths 代理路径
 * @return {Object}
 */
function createDevServer(agentPaths = []) {
  const devServer = { proxy: {} }

  devServer.hotOnly = true

  // Want the server to be externally accessible (希望服务器可以从外部访问)
  devServer.host = '0.0.0.0'

  // The browser application name depends on the platform, and the name may vary depending on the platform(浏览器应用名称取决于平台，平台不同，名称可能不同)
  devServer.open = 'Chrome'

  // When compiling errors or warnings, the browser page will display (编译错误或警告时，浏览器页面会显示)
  devServer.overlay = {
    warnings: true,
    errors: true
  }

  devServer.stats = 'errors-only'

  devServer.watchOptions = {
    ignored: /node_modules/
  }

  agentPaths.forEach((agentPath) => {
    if (!agentPath.startsWith(`/${AGENT_PATH_BEGINS}`)) return
    devServer.proxy[agentPath] = {
      target: agentPath.split('-')[1],
      changeOrigin: true,
      ws: true,
      pathRewrite: {
        // 通过pathRewrite重写地址，将前缀/api转为
        ['^' + agentPath]: ''
      }
    }
  })
  return { devServer }
}
