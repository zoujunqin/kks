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
