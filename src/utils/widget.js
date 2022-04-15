import { flatArray } from './array'

const styleRegExp = /^style\./
const propsRegExp = /^props\./
// const echartOptionRegExp = /^echartOption\./

const defaultWidgetStyle = { left: 0, top: 0, bottom: 0, right: 0, rotate: 0, 'z-index': 500 }

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
        groupIds: [],
        wid: genWidgetId(),
        style: { ...defaultWidgetStyle, ...(widget.style || {}) }
    }
    return widget
}

export function cloneWidget(widget) {
    widget.wid = genWidgetId()
    return widget
}

