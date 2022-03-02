export default class Layer {
  tag // component name
  flag
  option
  styles // style alias

  uid
  position
  isCloned
  children // reserved

  constructor(tag, flag, option, styles, children) {
    this.tag = tag
    this.flag = flag
    this.option = option
    this.styles = styles
    this.children = children

    this.uid = new Date().getTime()
    this.position = { x: 0, y: 0 }
    this.isCloned = false
    this.z = 0
  }
}

export function cloneLayer(layer) {
  const cloned = new Layer(
    layer.tag,
    layer.option,
    layer.flag,
    layer.styles,
    layer.children && layer.children.slice(0)
  )

  cloned.uid = new Date().getTime()
  cloned.position = { x: 0, y: 0 }
  cloned.z = 0
  cloned.isCloned = true

  return cloned
}
