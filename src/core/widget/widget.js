export default class Widget {
  name // component name
  option
  children // reserved

  wid
  isCloned
  local

  constructor(name, option, local, children) {
    this.name = name
    this.option = option
    this.local = local
    this.children = children

    this.wid = new Date().getTime()
    this.isCloned = false
    this.z = 0
  }
}

export function cloneWidget(widget) {
  const cloned = new Widget(
    widget.name,
    widget.option,
    widget.local,
    widget.children && widget.children.slice(0)
  )

  cloned.wid = new Date().getTime()
  cloned.z = 0
  cloned.isCloned = true

  return cloned
}
