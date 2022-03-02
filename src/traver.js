import handleAfterRequireContext from './utils/traver'
import Layer from '@/core/layer/layer.js'

const baseComponentsFiles = require.context(
  './components/B',
  true,
  /index\.vue$/
)
const baseComponents = handleAfterRequireContext(baseComponentsFiles)
const baseOptionsFiles = require.context('./components/B', true, /option\.js$/)
const baseOptions = handleAfterRequireContext(baseOptionsFiles)

export const handledBaseOptions = Object.keys(baseComponents).map((key) => {
  const baseOption =
    baseOptions[key.replace(/\/([a-z]|[A-Z]|[0-9])*/g, '/option')]

  return new Layer(
    baseComponents[key].name,
    baseOption.option,
    baseOption.data,
    baseOption.style,
    baseOption.dataSource
  )
})

const echartOptionsFiles = require.context(
  './components/E',
  true,
  /option\.js$/
)
const echartOptions = handleAfterRequireContext(echartOptionsFiles)

export const handledEchartOptions = Object.values(echartOptions).map(
  (echartOption) => {
    return new Layer(
      'Echart',
      echartOption.option,
      echartOption.data,
      echartOption.style,
      echartOption.dataSource
    )
  }
)

export const handledOptions = [...handledBaseOptions, ...handledEchartOptions]
