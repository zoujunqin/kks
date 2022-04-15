import { styleToCss } from "./style"

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