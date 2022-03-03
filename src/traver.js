import handleAfterRequireContext from './utils/traver'
import Layer from '@/core/layer/layer.js'
import { COMPONENT_COMMON, COMPONENT_ECHART } from '@/core/layer/constants.js'

const baseComponentsFiles = require.context(
  './components/B',
  true,
  /index\.vue$/
)
const baseComponents = handleAfterRequireContext(baseComponentsFiles)
const baseConfigsFiles = require.context('./components/B', true, /config\.js$/)
const baseConfigs = handleAfterRequireContext(baseConfigsFiles)

export const handledBaseConfigs = Object.keys(baseComponents).map((key) => {
  const baseConfig =
    baseConfigs[key.replace(/\/([a-z]|[A-Z]|[0-9])*/g, '/config')]

  return new Layer(baseComponents[key].name, COMPONENT_COMMON, baseConfig)
})

const echartOptionsFiles = require.context(
  './components/E',
  true,
  /option\.js$/
)
const echartOptions = handleAfterRequireContext(echartOptionsFiles)
const echartConfigsFiles = require.context(
  './components/E',
  true,
  /config\.js$/
)
const echartConfigs = handleAfterRequireContext(echartConfigsFiles)

export const handledEchartConfigs = Object.keys(echartOptions).map((key) => {
  const echartConfig =
    echartConfigs[key.replace(/\/([a-z]|[A-Z]|[0-9])*/g, '/config')]

  echartConfig.option = echartOptions[key]
  return new Layer('Echart', COMPONENT_ECHART, echartConfig)
})

console.log(handledBaseConfigs)
console.log(handledEchartConfigs)

export const handledConfigs = [...handledBaseConfigs, ...handledEchartConfigs]
