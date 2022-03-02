/**
 * svg优化, 运行 yarn svgo 命令
 */
module.exports = {
  plugins: [
    {
      name: 'removeAttrs',
      params: {
        attrs: ['fill', 'fill-rule']
      }
    }
  ]
}
