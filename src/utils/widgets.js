import { flatArray } from './array'
import { adsorbent } from './adsorbent'

const styleRegExp = /^style\./
const propsRegExp = /^props\./
// const echartOptionRegExp = /^echartOption\./

// 配置项转 style props echartOption 等等
export function setupTransform(setup, field) {
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

/**
 * 拖拽区域计算 widget 的位置
 * @param {Object}  {
 *                    e                         // 鼠标移动事件信息
 *                    width           {Number}  // 可移动元素宽度
 *                    height          {Number}  // 可移动元素高度
 *                    parentWidth     {Number}  // 可移动元素的父元素宽度
 *                    parentHeight    {Number}  // 可移动元素的父元素高度
 *                    gap             {Number}  // 可移动元素在父元素内移动至少有 gap px 留在父容器中
 *                    parentOffsetX   {Number}  // 可移动元素的父元素到视口左边的距离 x
 *                    parentOffsetY   {Number}  // 可移动元素的父元素到视口上边的距离 y
 *                    addis           {Number}  // 有效的吸附距离，比如：需要吸附的位置是200，有效吸附距离是 5，那么元素移动到 205 时会被自动吸附
 *                    adsorpLefts     {Array}   // 左吸附位置
 *                    adsorpTops      {Array}   // 上吸附位置
 *                    scale           {Number}  // 缩放比例
 *                    cursorOffsetX   {Number}  // 鼠标点击在元素上的位置 x
 *                    cursorOffsetY   {Number}  // 鼠标点击在元素上的位置 y
 *                  }
 */
export function calcWidgetPosition({
  e,
  width,
  height,
  parentWidth,
  parentHeight,
  gap,
  parentOffsetX,
  parentOffsetY,
  addis,
  adsorpLefts,
  adsorpTops,
  scale,
  cursorOffsetX,
  cursorOffsetY
}) {
  const { pageX, pageY } = e
  const ll = gap - width
  const rl = parentWidth - gap
  const tl = gap - height
  const bl = parentHeight - gap
  // 在缩放下，offset表示的是真实的 px，处理后再计算 。然后转成真实的 px
  let left = calcPosAtScale(
    pageX - cursorOffsetX * scale - parentOffsetX,
    scale,
    1
  )
  left = adsorbent(left <= ll ? ll : left >= rl ? rl : left, addis, adsorpLefts)

  let top = calcPosAtScale(
    pageY - cursorOffsetY * scale - parentOffsetY,
    scale,
    1
  )
  top = adsorbent(top <= tl ? tl : top >= bl ? bl : top, addis, adsorpTops)

  return { left, top }
}

export function calcPosAtScale(pos, scale, fixed = 1) {
  return +(pos / scale).toFixed(fixed)
}

export function calcWidgetRotate({ centerPoint, cursorPoint }) {
  const { x: centerPointX, y: centerPointY } = centerPoint
  const { x: cursorPointX, y: cursorPointY } = cursorPoint

  const distance = cursorPointX - centerPointX
  const tc = Math.sqrt(
    Math.pow(centerPointX - cursorPointX, 2) +
      Math.pow(centerPointY - cursorPointY, 2)
  )
  let angle = (Math.asin(distance / tc) * 180) / Math.PI
  console.log(angle)

  if (cursorPointX >= centerPointX && cursorPointY <= centerPointY) {
    // console.log(1)
    return angle
  }
  if (cursorPointX >= centerPointX && cursorPointY >= centerPointY) {
    // console.log(2)
    return angle + Math.PI / 2
  }
  if (cursorPointX <= centerPointX && cursorPointY >= centerPointY) {
    // console.log(3)
    return angle + Math.PI
  }
  if (cursorPointX <= centerPointX && cursorPointY <= centerPointY) {
    // console.log(4)
    return angle + (Math.PI * 3) / 2
  }
}
