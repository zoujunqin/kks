import { flatArray } from './array'

const styleRegExp = /^style\./
const propsRegExp = /^props\./
// const echartOptionRegExp = /^echartOption\./

export function setupMapToSD(setup, field) {
  const setupStyle = {}
  const setupDataSource = {}
  const stylesAndProps = flatArray(
    setup.setup.concat(setup.setupPosition),
    field
  )
  for (const item of stylesAndProps) {
    if (styleRegExp.test(item.mapping)) {
      setupStyle[item.mapping.replace(styleRegExp, '')] = item.value + item.unit
    } else if (propsRegExp.test(item.mapping)) {
      setupDataSource[item.mapping.replace(propsRegExp, '')] =
        item.value + item.unit
    }
  }
  return { setupStyle, setupDataSource }
}
