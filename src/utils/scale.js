export function calcOnScale(d, scale, fix = 0) {
  return +Number(d * scale).toFixed(fix)
}

export function calcOnReverseScale(d, scale, fix = 0) {
  return +Number(d / scale).toFixed(fix)
}
