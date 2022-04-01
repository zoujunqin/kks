import { calcOnScale, calcOnReverseScale } from './scale'

/**
 * 限制 position 在容器内
 * @param {Object}  {
 *                    left          {Number}
 *                    top           {Number}
 *                    limit         {Number}          // 保留多少之后不能再超出
 *                    gl            {Number}          // 父与父父容器 gap left
 *                    gr            {Number}          // 父与父父容器 gap right
 *                    gt            {Number}          // 父与父父容器 gap top
 *                    gb            {Number}          // 父与父父容器 gap bottom
 *                    pw            {Number}          // parent width
 *                    ph            {Number}          // parent height
 *                    width         {Number}          // width
 *                    height        {Number}          // height
 *                    scale        {Number}           // scale
 *                  }
 */
export function limitPosition({
  left,
  top,
  limit,
  gl = 0,
  gr = 0,
  gt = 0,
  gb = 0,
  pw,
  ph,
  width,
  height,
  scale
}) {
  left = calcOnScale(left, scale)
  top = calcOnScale(top, scale)
  width = calcOnScale(width, scale)
  height = calcOnScale(height, scale)
  pw = calcOnScale(pw, scale)
  ph = calcOnScale(ph, scale)
  const ll = limit - width - gl
  const rl = pw + gr - limit
  const tl = limit - height - gt
  const bl = ph + gb - limit
  return {
    left: calcOnReverseScale(left <= ll ? ll : left >= rl ? rl : left, scale),
    top: calcOnReverseScale(top <= tl ? tl : top >= bl ? bl : top, scale)
  }
}

/**
 * 吸附
 * @param {Number} cur 当前位置
 * @param {Number} ad 吸附的距离
 * @param {Array} pos 吸附的参考位置
 * @returns
 */
export function adsorbent(cur, ad, pos) {
  for (const po of pos) {
    const diff = cur - ad
    if (diff <= po && diff >= po - ad) {
      cur = po
      break
    }
  }
  return cur
}
