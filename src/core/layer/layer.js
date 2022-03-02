let lid = 0
let z = 199
export default class Layer {
  tag // component name
  flag
  styles // style alias
  lid
  position
  children // reserved

  constructor(tag, option, data, styles, dataSource, children) {
    this.tag = tag
    this.option = option
    this.data = data
    this.styles = styles
    this.dataSource = dataSource
    this.children = children
    this.lid = lid++
    this.z = z++
  }
}

export function cloneLayer(layer) {
  const cloned = new Layer(
    layer.tag,
    layer.option,
    layer.data,
    layer.styles,
    layer.dataSource,
    layer.children && layer.children.slice(0)
  )

  return cloned
}
