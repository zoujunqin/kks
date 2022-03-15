/**
 * 数组根据某个字段扁平化
 * @param {Array} arr
 * @param {String} field
 * @returns
 */
export function flatArray(arr, field) {
  return arr.reduce((res, item) => {
    item[field]
      ? res.push(item, ...flatArray(item[field], field))
      : res.push(item)
    return res
  }, [])
}
