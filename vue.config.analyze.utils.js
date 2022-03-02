const isAnalyze = process.env.analyze

// Analyze Package Contents (分析包内容)
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
function createWebpackBundleAnalyzer(config) {
  config.when(isAnalyze, (config) => {
    config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin)
  })
}

// Analyze packing time (分析打包时间)
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

module.exports = {
  smp,
  isAnalyze,
  createWebpackBundleAnalyzer
}
