export default class Layer {
  tag // component name
  flag
  option
  children // reserved

  styles // style alias
  uid
  position
  isCloned
  useInternalWidgets

  constructor(tag, flag, option, children) {
    this.tag = tag
    this.flag = flag
    this.option = option
    this.children = children

    this.styles = {}
    this.uid = new Date().getTime()
    this.position = { x: 0, y: 0 }
    this.isCloned = false
    this.z = 0
    this.useInternalWidgets = true
  }
}

export function cloneLayer(layer) {
  const cloned = new Layer(
    layer.tag,
    layer.option,
    layer.flag,
    layer.children && layer.children.slice(0)
  )

  cloned.uid = new Date().getTime()
  cloned.position = { x: 0, y: 0 }
  cloned.z = 0
  cloned.isCloned = true
  cloned.styles = layer.styles
  cloned.useInternalWidgets = layer.useInternalWidgets

  return cloned
}
