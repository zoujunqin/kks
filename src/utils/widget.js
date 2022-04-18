import { flatArray } from './array'
import { rootGroupId } from './group'

const styleRegExp = /^style\./
const propsRegExp = /^props\./
// const echartOptionRegExp = /^echartOption\./
let index = 1500
const defaultWidgetStyle = { left: 0, top: 0, bottom: 0, right: 0, rotate: 0 }

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

export function genWidgetId() {
    return 'widget-' + new Date().getTime()
}


export function initWidget(widget) {

    widget = {
        ...widget,
        gid: null,
        gids: [rootGroupId],
        wid: genWidgetId(),
        style: { ...defaultWidgetStyle, 'z-index': index += 1, ...(widget.style || {}) }
    }
    return widget
}

export function cloneWidget(widget) {
    widget.wid = genWidgetId()
    return widget
}

/**
 * 扁平化 widgets
 * @param {Array} widgets 
 * @returns {Array}
 */
export function flatWidgets(widgets) {
    return widgets.reduce((result, item) => {
        result.push(...(item.isGroup ? flatWidgets(item.children) : [item]))
        return result
    }, [])
}


export function execEveryWidgets(widgets, exec = (item) => item) {
    return widgets.forEach(item => {
        exec(item)
        item.isGroup ? flatWidgets(item.children, exec) : [item]
    })
}

export function widgetIsEqual(widget1, widget2) {
    return widget1.isGroup ? widget1.id === widget2.id : widget1.wid === widget2.wid
}

/**
 * 数组中符合查找元素的所有 index
 * @param {Array} arr 
 * @param {Function} exec 
 * @returns {Array} 
 */
export function findIndex(arr, exec = () => false) {
    const indexs = []
    arr.forEach((_, index) => { exec(arr[index]) && indexs.push(index) })
    return indexs
}