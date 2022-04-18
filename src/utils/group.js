import { styleToCss } from "./style"

export const rootGroupId = new Date().getTime()
// export function getBoundingRect(conforms) {
//     const left = Math.min(...conforms.map(c => c.left))
//     const top = Math.min(...conforms.map(c => c.top))
//     const right = Math.max(...conforms.map(c => (c.left + c.width)))
//     const bottom = Math.max(...conforms.map(c => (c.top + c.height)))
//     const width = right - left
//     const height = bottom - top
//     return { left, top, right, bottom, width, height }
// }

export function getBoundingRect(conforms) {
    const left = Math.min(...conforms.map(c => c.rotatedLeft))
    const top = Math.min(...conforms.map(c => c.rotatedTop))
    const right = Math.max(...conforms.map(c => (c.rotatedLeft + c.rotatedWidth)))
    const bottom = Math.max(...conforms.map(c => (c.rotatedTop + c.rotatedHeight)))
    const width = right - left
    const height = bottom - top
    return { left, top, right, bottom, width, height }
}

/**
 * 创建组
 * @param {Array} conforms 样式数组
 * @returns {Object} 包含组 id 和组 style
 */
export function createGroup(conforms) {
    const groupId = 'group' + new Date().getTime()
    const rect = getBoundingRect(conforms)
    const style = styleToCss(rect)

    return { groupId, groupStyle: style }
}

export function updateGroup(conforms, group) {
    const rect = getBoundingRect(conforms)
    const style = styleToCss(rect)
    group.groupStyle = style
    return group
}

export function genGroupId() {
    return 'group-' + new Date().getTime()
}
export function genRootGroupId() {
    return 'root' + new Date().getTime()
}

/**
 * 根据 id 查找到对应的 group
 * @param {Object} group 
 * @param {Number} id 
 * @returns 
 */
export function findGroup(group, id) {
    if (!group.isGroup) return
    if (group.id === id) return group

    for (const item of group.children) {
        if (item.isGroup) {
            group = findGroup(item, id)
            if (group) return group
        }
    }
}

// 查找所在的 group
export function findGroupInList(list, id) {
    for (const item of list) {
        const group = findGroup(item, id)
        if (group) return group
    }
}

// 查找最顶级的 group
export function findTopGroupInList(list, id) {
    for (const index in list) {
        const group = findGroup(list[index], id)
        if (group) return list[index]
    }
}

// 判断 list 下是否都是组
export function isALlInGroup(list) {
    return list.findIndex(item => item.isGroup) !== -1
}

// 获取多个数组的交集
export function getIntersectionOfArrs(...rest) {
    let arr = [].concat(...rest)

    let x = []
    for (let i = 0; i < arr.length - 1; i++) {
        let count = 0
        for (let j = 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                count++
            }
            if (count === [...rest].length && x.indexOf(arr[i]) < 0) {

                x.push(arr[i])
                break
            }
        }
    }
    return x
}

export function initGroup(group) {
    group = {
        ...group,
        isGroup: true
    }
    return group
}