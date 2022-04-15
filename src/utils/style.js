import { cos, sin } from './translate'

/**
 * 获取旋转后的样式
 * @param {Object} style 
 */
export function getRotatedStyle(style) {
    style = { ...style }
    if (style.rotate != 0) {
        const newWidth =
            style.width * cos(style.rotate) + style.height * sin(style.rotate)
        const diffX = (style.width - newWidth) / 2 // 旋转后范围变小是正值，变大是负值
        style.left += diffX
        style.right = style.left + newWidth

        const newHeight =
            style.height * cos(style.rotate) + style.width * sin(style.rotate)
        const diffY = (newHeight - style.height) / 2 // 始终是正
        style.top -= diffY
        style.bottom = style.top + newHeight

        style.width = newWidth
        style.height = newHeight
    } else {
        style.bottom = style.top + style.height
        style.right = style.left + style.width
    }

    return style
}

/**
 * 将 style 中需要转化的值带上单位 
 * @param {Object} style 
 */
const toCssAttrs = ['top', 'left', 'right', 'bottom', 'width', 'height', 'margin', 'margin-left', 'margin-right', 'margin-top', 'margin-bottom']
export function styleToCss(style, attrs = toCssAttrs) {

    style = { ...style }

    for (const item of attrs) {
        style[item] && (style[item] = style[item] + 'px')
    }

    style.rotate && (style.transform = `rotate(${style.rotate}deg)`)

    return style
}

/**
 * 获取形状位置相关的样式
 * @param {Object} style 
 */
const shapeStyleAttrs = ['left', 'top', 'width', 'height', 'rotate', 'rotatedLeft', 'rotatedRight', 'rotatedTop', 'rotatedBottom', 'rotatedWidth', 'rotatedHeight']
export function getShapeStyle(style, attrs = shapeStyleAttrs) {

    const newStyle = {}
    for (const item of attrs) {
        style[item] && (newStyle[item] = style[item])
    }

    return newStyle
}

