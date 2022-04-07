export function calcOnScale(d, scale, fix = 1) {
  return +Number(d * scale).toFixed(fix)
}

export function calcOnReverseScale(d, scale, fix = 1) {
  return +Number(d / scale).toFixed(fix)
}


// export function calcOnScale(d, scale) {
//   return Math.round(d * scale)
// }

// export function calcOnReverseScale(d, scale) {
//   return Math.round(d / scale)
// }
