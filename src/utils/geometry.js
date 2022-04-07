/**
 * 计算两个点组成直线的斜率
 *
 * @param p1 - 线起点的坐标
 * @param p2 - 线终点的坐标
 * @returns 斜率数值
 */
export const lineSlope = (p1, p2) => {
  return Math.abs(p2.x - p1.x) === 0 ? Infinity : (p2.y - p1.y) / (p2.x - p1.x)
}

/**
 * 计算两点组成的方程 y = kx + b
 *
 * @param p1 - 线上一点的坐标
 * @param p2 - 线上另一点的坐标
 * @returns 方程的参数 k 和 b
 */
export const lineEquation = (p1, p2) => {
  const k = lineSlope(p1, p2)
  return {
    k,
    b: p1.y - k * p1.x,
    x: k === Infinity ? p1.x : NaN
  }
}
