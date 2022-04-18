<script>
/**
 * @property {Number} styles
 * @property {Number} rulerStartX
 * @property {Number} rulerStartY
 * @property {Number} scale 缩放值
 * @property {Number} limit 当前组件移动时限制 gap px 在父级容器中
 * @property {Number} stretchPointThick 拉伸点的宽高
 * @property {String} stretchPointBackground 拉伸点背景色
 * @property {String} guardLineBackground 辅助线背景
 * @property {String} guardIndicatorColor 辅助线文字颜色
 * @property {Number} guardIndicatorFontSize 辅助线文字大小
 */

const props = {
    scale: Number,
    styles: { type: Object, default: () => { } },
    active: { type: Boolean, default: true },
    rotate: { type: Number, default: 0 },
    rulerStartX: { type: Number, default: 0 },
    rulerStartY: { type: Number, default: 0 },
    limit: { type: Number, default: 5 },
    stretchPointThick: { type: Number, default: 6 },
    stretchPointBackground: { type: String, default: '#09f' },
    guardLineBackground: { type: String, default: '#09f' },
    guardIndicatorColor: { type: String, default: '#09f' },
    guardIndicatorFontSize: { type: Number, default: 12 },
}

import { calcOnReverseScale, calcOnScale } from '@/utils/scale'
import calculateComponentPositonAndSize from '@/utils/calcPositionAndSize'
import { mod360, getRotatedPointCoordinate } from '@/utils/translate'
import { getRotatedStyle } from '@/utils/style'

export default {
    props,

    inject: ['getFlatedWidgets'],

    data() {
        return {
            // handleDownOnRoot 方法中存储的事件
            event: null,
            startPoint: {},
            shapeStyle: {},
            curWidgetsStyle: [],

            points: ['lt', 'tm', 'rt', 'rc', 'rb', 'bm', 'lb', 'lc'],
            initialAngle: { // 每个点对应的初始角度
                lt: 0,
                tm: 45,
                rt: 90,
                rc: 135,
                rb: 180,
                bm: 225,
                lb: 270,
                lc: 315,
            },
            angleToCursor: [ // 每个范围的角度对应的光标
                { start: 338, end: 23, cursor: 'nw' },
                { start: 23, end: 68, cursor: 'n' },
                { start: 68, end: 113, cursor: 'ne' },
                { start: 113, end: 158, cursor: 'e' },
                { start: 158, end: 203, cursor: 'se' },
                { start: 203, end: 248, cursor: 's' },
                { start: 248, end: 293, cursor: 'sw' },
                { start: 293, end: 338, cursor: 'w' },
            ],
            cursors: {},

        }
    },

    computed: {
        // 画布信息
        canvasRectInfo() {
            return {
                left: 220 - this.rulerStartX,
                top: 80 - this.rulerStartY
            }
        },

        flatedWidgets() { return this.getFlatedWidgets() }
    },

    watch: {
        canvasRectInfo() {
            this.event && this.handleStyleByScroll(this.event)
        }
    },

    methods: {

        calcOnScale(distance) { return calcOnScale(distance, this.scale) },

        calcOnReverseScale(distance) { return calcOnReverseScale(distance, this.scale) },

        getPointStyle(point) {
            let left = 0
            let top = 0
            const isT = /t/.test(point)
            const isL = /l/.test(point)
            const isR = /r/.test(point)
            const isB = /b/.test(point)
            const isC = /c/.test(point)
            const isM = /m/.test(point)

            const { width, height } = this.styles
            const halfPointThick = this.stretchPointThick / 2

            if (isL) left = 0
            if (isR) left = width
            if (isM) left = width / 2
            if (isT) top = 0
            if (isB) top = height
            if (isC) top = height / 2

            return {
                left: left + 'px',
                top: top + 'px',
                cursor: this.cursors[point],
                width: this.stretchPointThick + 'px',
                height: this.stretchPointThick + 'px',
                background: this.stretchPointBackground,
                'margin-left': -halfPointThick + 'px',
                'margin-top': -halfPointThick + 'px',
                'border-radius': halfPointThick + 'px'
            }
        },

        // 根据不同角度获取光标样式
        getCursor() {
            const { angleToCursor, initialAngle, points } = this
            // const rotate = mod360(curComponent.style.rotate) // 取余 360
            const rotate = mod360(this.styles.rotate)
            const result = {}
            let lastMatchIndex = -1 // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度

            points.forEach(point => {
                const angle = mod360(initialAngle[point] + rotate)
                const len = angleToCursor.length
                // eslint-disable-next-line
                while (true) {
                    lastMatchIndex = (lastMatchIndex + 1) % len
                    const angleLimit = angleToCursor[lastMatchIndex]
                    if (angle < 23 || angle >= 338) {
                        result[point] = 'nw-resize'

                        return
                    }

                    if (angleLimit.start <= angle && angle < angleLimit.end) {
                        result[point] = angleLimit.cursor + '-resize'

                        return
                    }
                }

            })

            this.cursors = result
        },

        // 缩放样式
        scaleStyle(style) {
            const scaleAttrs = ['top', 'left', 'width', 'height', 'rotatedTop', 'rotatedLeft', 'rotatedWidth', 'rotatedHeight']
            style = { ...style }

            for (const item of scaleAttrs) {
                style[item] && (style[item] = this.calcOnScale(style[item]))
            }
            return style
        },

        // 恢复样式
        backStyle(style) {
            const scaleAttrs = ['top', 'left', 'width', 'height', 'rotatedTop', 'rotatedLeft', 'rotatedWidth', 'rotatedHeight']
            style = { ...style }

            for (const item of scaleAttrs) {
                style[item] && (style[item] = this.calcOnReverseScale(style[item]))
            }
            return style
        },

        saveShapeStyleAndCurWidgetsStyle() {
            this.shapeStyle = this.styles
            this.curWidgetsStyle = this.flatedWidgets.map(w => ({ ...w.style }))
        },

        handleDownOnPoint(point, e) {
            e.stopPropagation(); e.preventDefault()

            this.saveShapeStyleAndCurWidgetsStyle()

            const needLockProportion = false

            const style = this.scaleStyle(this.styles)

            // 组件宽高比
            const proportion = style.width / style.height

            // 组件中心点
            const center = { x: style.left + style.width / 2, y: style.top + style.height / 2 }

            // 获取 point 与实际拖动基准点的差值 @justJokee
            // fix https://github.com/woai3c/visual-drag-demo/issues/26#issue-937686285
            const pointRect = e.target.getBoundingClientRect()
            // 当前点击圆点相对于画布的中心坐标
            const curPoint = {
                x: pointRect.left - this.canvasRectInfo.left + e.target.offsetWidth / 2,
                y: pointRect.top - this.canvasRectInfo.top + e.target.offsetHeight / 2,
            }

            // 获取对称点的坐标
            const symmetricPoint = { x: center.x - (curPoint.x - center.x), y: center.y - (curPoint.y - center.y) }

            const move = (moveEvent) => {
                const curPositon = { x: moveEvent.clientX - this.canvasRectInfo.left, y: moveEvent.clientY - this.canvasRectInfo.top }
                calculateComponentPositonAndSize(point, style, curPositon, proportion, needLockProportion, {
                    center,
                    curPoint,
                    symmetricPoint,
                })

                this.changeShapeStyle(style)

            }

            const up = () => {
                window.removeEventListener('mousemove', move)
                window.removeEventListener('mouseup', up)
            }

            window.addEventListener('mousemove', move)
            window.addEventListener('mouseup', up)
        },

        handleStyleByScroll(e) {
            const { left: originLeft, top: originTop } = this.scaleStyle(this.styles)
            const { x: prevStartX, y: prevStartY } = this.startPoint
            const startX = e.clientX - this.canvasRectInfo.left
            const startY = e.clientY - this.canvasRectInfo.top

            const left = originLeft - (prevStartX - startX)
            const top = originTop - (prevStartY - startY)

            this.changeShapeStyle({ left, top })
            this.startPoint = { x: startX, y: startY }
        },

        handleDownOnRoot(e) {
            this.event = e
            this.saveShapeStyleAndCurWidgetsStyle()

            const { left: originLeft, top: originTop } = this.scaleStyle(this.styles)

            const startX = e.clientX - this.canvasRectInfo.left
            const startY = e.clientY - this.canvasRectInfo.top

            this.startPoint = { x: startX, y: startY }

            const move = moveEvent => {
                const curX = moveEvent.clientX - this.canvasRectInfo.left
                const curY = moveEvent.clientY - this.canvasRectInfo.top

                const left = curX - startX + originLeft
                const top = curY - startY + originTop

                this.changeShapeStyle({ left, top })
                this.$emit('move', true)
            }

            const up = () => {
                this.event = this.startPoint = null
                window.removeEventListener('mousemove', move)
                window.removeEventListener('mouseup', up)
            }

            window.addEventListener('mousemove', move)
            window.addEventListener('mouseup', up)
        },

        // 旋转
        handleRotate(e) {
            e.preventDefault(); e.stopPropagation()
            this.saveShapeStyleAndCurWidgetsStyle()

            // 初始坐标和初始角度
            const startY = e.clientY
            const startX = e.clientX
            const startRotate = this.styles.rotate || 0

            // 获取元素中心点位置
            const rect = this.$el.getBoundingClientRect()
            const centerX = rect.left + rect.width / 2
            const centerY = rect.top + rect.height / 2

            // 旋转前的角度
            const rotateDegreeBefore =
                Math.atan2(startY - centerY, startX - centerX) / (Math.PI / 180)

            const move = moveEvent => {
                const curX = moveEvent.clientX
                const curY = moveEvent.clientY
                // 旋转后的角度
                const rotateDegreeAfter =
                    Math.atan2(curY - centerY, curX - centerX) / (Math.PI / 180)



                this.changeShapeStyle({ rotate: startRotate + Math.ceil(rotateDegreeAfter - rotateDegreeBefore) })
            }

            const up = () => {
                this.getCursor()
                document.removeEventListener('mousemove', move)
                document.removeEventListener('mouseup', up)
            }

            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', up)
        },

        changeShapeStyle(style) {
            const { left, top, width, height, rotate } = style
            const { left: oldLeft, top: oldTop, width: oldWidth, height: oldHeight } = this.scaleStyle(this.shapeStyle)
            const diffLeft = left !== void 0 ? left - oldLeft : 0
            const diffTop = top !== void 0 ? top - oldTop : 0
            const diffWidth = width !== void 0 ? width - oldWidth : 0
            const diffHeight = height !== void 0 ? height - oldHeight : 0

            this.flatedWidgets.forEach((w, index) => {

                const { left: wLeft, top: wTop, width: wWidth, height: wHeight, rotate: wRotate } = this.scaleStyle(this.curWidgetsStyle[index])
                const newStyle = {
                    left: this.calcOnReverseScale(wLeft + diffLeft),
                    top: this.calcOnReverseScale(wTop + diffTop),
                    width: this.calcOnReverseScale(wWidth + diffWidth),
                    height: this.calcOnReverseScale(wHeight + diffHeight),
                    rotate: rotate || wRotate
                }

                const rotatedStyle = getRotatedStyle(newStyle)
                const newRotatedStyle = {
                    rotatedLeft: rotatedStyle.left,
                    rotatedRight: rotatedStyle.right,
                    rotatedTop: rotatedStyle.top,
                    rotatedBottom: rotatedStyle.bottom,
                    rotatedWidth: rotatedStyle.width,
                    rotatedHeight: rotatedStyle.height,
                }

                const centerPoint = { x: newStyle.left + newStyle.width / 2, y: newStyle.top + newStyle.height / 2 }
                const rotatedCoordinate = {
                    lt: getRotatedPointCoordinate(newStyle, centerPoint, 'lt'),
                    rt: getRotatedPointCoordinate(newStyle, centerPoint, 'rt'),
                    lb: getRotatedPointCoordinate(newStyle, centerPoint, 'lb'),
                    rb: getRotatedPointCoordinate(newStyle, centerPoint, 'rb'),
                }

                w.style = {
                    ...this.curWidgetsStyle[index],
                    ...newStyle,
                    ...newRotatedStyle
                }

                w.rotatedCoordinate = rotatedCoordinate

            })
        }
    },

    render() {
        return (
            <div class="draggable-wrap" vOn:mousedown={this.handleDownOnRoot}>

                <div class="draggable-rotate" vOn:mousedown={this.handleRotate} >
                    <svg-icon icon-class="rotate" size="16" />
                </div>

                {
                    this.points.map(point =>
                        <i
                            class="stretch-point"
                            style={this.getPointStyle(point)}
                            vOn:mousedown_stop_prevent={this.handleDownOnPoint.bind(this, point)}
                        />
                    )
                }

                {/* <div class="tip">
                    <div>x: {this.styles.left}</div>
                    <div>y: {this.styles.top}</div>
                    <div>w: {this.styles.width}</div>
                    <div>h: {this.styles.height}</div>
                    <div>r: {this.styles.rotate}</div>
                </div> */}

                {/* <div class="draggable-mask" /> */}
            </div>
        )
    },

    mounted() {
        this.getCursor()
    }
}
</script>

<style lang="scss" scoped>
.draggable-wrap {
    position: absolute;
    // background: rgba(0, 0, 0, 0.4);
    cursor: move;
    min-width: 5px;
    min-height: 5px;
    z-index: 6000;
    border: unset !important;

    .tip {
        padding: 6px;
        position: absolute;
        right: -4px;
        bottom: 0;
        transform: translateX(100%);
        pointer-events: none;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 0 1px 0 gray;
    }

    .draggable-rotate {
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        cursor: pointer;
    }

    .draggable-mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        z-index: 2023;
        border: 1px dashed #09f;
    }

    .stretch-point {
        position: absolute;
        z-index: 2024;
    }
}
</style>
