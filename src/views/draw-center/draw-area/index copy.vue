<script>
import Ruler from './Ruler/index'
import Draggable from './Draggable'
import HighlightBox from './HighlightBox'
// import MarkLine from './MarkLine'
import Group from './Group'

import { calcOnReverseScale, calcOnScale } from '@/utils/scale'
import { noop } from '@/utils'
import { styleToCss } from '@/utils/style'
import { getBoundingRect } from '@/utils/group'
import { initWidget } from '@/utils/widget'
import { isPointInMatrix } from '@/utils/geometry'
import { getRotatedPointCoordinate } from '@/utils/translate'

import { state, mutations } from '../bus/store'
import { eventBus, eventName } from '../bus/event'


export default {

    data() {
        return {
            // ruler
            rulerRectInfo: {},
            rulerThick: 20,
            rulerWidth: 0,
            rulerHeight: 0,
            rulerLineOpera: true,// 标尺的线是否可操作
            rulerTransformInfo: {},

            contentWidth: 1600,
            contentHeight: 800,

            highlightWidgets: [],

        }
    },

    computed: {
        curShape() {
            if (this.flatWidgets.length === 0) return null
            else if (this.flatWidgets.length === 1) return this.flatWidgets[0]
            else return {
                style: { ...getBoundingRect(this.flatWidgets.map(w => w.style)), rotate: 0 }
            }
        },

        flatWidgets() { return state.flatWidgets },

        allWidgets() { return state.allWidgets },

        canvasRectInfo() {
            return {
                left: this.rulerRectInfo.left + this.rulerThick - this.rulerTransformInfo.startX,
                top: this.rulerRectInfo.top + this.rulerThick - this.rulerTransformInfo.startY
            }
        },

    },

    methods: {

        calcOnScale(distance) { return calcOnScale(distance, this.rulerTransformInfo.scale) },

        calcOnReverseScale(distance) { return calcOnReverseScale(distance, this.rulerTransformInfo.scale) },

        /************************  ruler 🇨🇳  ***************************/
        // 标尺滚动和缩放触发
        handleRulerTransform(transformInfo) {
            this.rulerTransformInfo = transformInfo
        },
        /************************  ruler 🇨🇳🇨🇳🇨🇳  ***************************/


        /************************  widget 🇨🇳  ***************************/

        // 选中画布
        selectCanvas() {
        },

        highlightWidget(e) {
            const point = { x: e.clientX - this.canvasRectInfo.left, y: e.clientY - this.canvasRectInfo.top }

            const hs = this.allWidgets.filter(item => {
                const { lt, rt, lb, rb } = item.rotatedCoordinate
                return isPointInMatrix(lt, rt, rb, lb, point)
            })
            // TODO: hs还要做层级的过滤，只用 hs 中层级最高的一个
            let widget = hs[0]
            if (!widget) return this.highlightWidgets = []

            // TODO: 这边 filter 现在用的是最顶层的 group，后面要进行 group 的剥离
            widget = widget.groupIds.length !== 0 ? this.allWidgets.filter(item => item.groupIds.includes(widget.groupIds[widget.groupIds.length - 1])) : [widget]

            for (const item of widget) {
                if (!this.flatWidgets.find(cur => cur.wid == item.wid)) this.highlightWidgets.push(item)
            }
        },

        // 选中 widget, 可能选中的是组
        selectWidget(widget, e) {
            this.highlightWidget(e)

            const length = widget.groupIds.length
            const index = widget.groupIds.findIndex(id => id === state.curGroupId)

            // 按住键盘 metaKey + 鼠标单击
            if (e.metaKey) {

                // if (widget.wid === this.prevSelectedWidget.wid) {

                // }
                // 当前组所在的下标
                const index = widget.groupIds.findIndex(id => id === state.curGroupId)

                // 没找到，说明点击的 widget 不在已有的组里
                if (index === -1) {
                    // 获取当前 widget 最大的组的所有 widget, 没有组就是自身
                    const curGroup = length === 0 ? [widget] : this.allWidgets.map(item => item.groupIds.includes(widget.groupIds[length - 1]))
                    mutations.setWidgets(curGroup, true)
                } else {

                }


                return
            }

            // 鼠标单击
            if (length === 0) {
                mutations.setParentGroupId(null)
                mutations.setCurGroupId(null)
                widget = [widget]
            } else if (index === 0) {
                // 选中的是最小的组，最靠近 widget 的组
                mutations.setParentGroupId(widget.groupIds[index])
                mutations.setCurGroupId(null)
                widget = [widget]
            } else if (index === length - 1) {
                // 表示选中的是最大的组
                mutations.setCurGroupId(widget.groupIds[index - 1])
                mutations.setParentGroupId(null)
                widget = this.allWidgets.filter(item => item.groupIds.includes(widget.groupIds[index - 1]))
            } else {
                mutations.setParentGroupId(widget.groupIds[index])
                mutations.setCurGroupId(widget.groupIds[index - 1])
                widget = this.allWidgets.filter(item => item.groupIds.includes(widget.groupIds[index - 1]))
            }

            mutations.setFlatWidgets(widget)
            this.$nextTick(() => {
                this.$refs.shape.handleDownOnRoot(e)
            })

        },


        addWidget(option) {
            const rulerRectInfo = this.rulerRectInfo
            const curWidget = initWidget(option)
            const { style: { left, top } } = curWidget
            curWidget.style.left = this.calcOnReverseScale(left + this.rulerTransformInfo.startX - (rulerRectInfo.left + this.rulerThick))
            curWidget.style.top = this.calcOnReverseScale(top + this.rulerTransformInfo.startY - (rulerRectInfo.top + this.rulerThick))
            curWidget.style.rotatedLeft = curWidget.style.left
            curWidget.style.rotatedTop = curWidget.style.top
            curWidget.style.rotatedWidth = curWidget.style.width
            curWidget.style.rotatedHeight = curWidget.style.height

            const centerPoint = { x: curWidget.style.left + curWidget.style.width / 2, y: curWidget.style.top + curWidget.style.height / 2 }

            const rotatedCoordinate = {
                lt: getRotatedPointCoordinate(curWidget.style, centerPoint, 'lt'),
                rt: getRotatedPointCoordinate(curWidget.style, centerPoint, 'rt'),
                lb: getRotatedPointCoordinate(curWidget.style, centerPoint, 'lb'),
                rb: getRotatedPointCoordinate(curWidget.style, centerPoint, 'rb'),
            }
            curWidget.rotatedCoordinate = rotatedCoordinate

            mutations.setFlatWidgets([curWidget])
            mutations.setAllWidgets(curWidget)
        },
        /************************  widget 🇨🇳🇨🇳🇨🇳  ***************************/

        changeShapeStyle() { },

        getRulerRectInfo() {
            this.rulerRectInfo = document.querySelector('#ruler').getBoundingClientRect()
        },

        resize() {
            this.rulerWidth = this.$el.clientWidth
            this.rulerHeight = this.$el.clientHeight
        }
    },

    mounted() {
        eventBus.$on(eventName.addWidget, this.addWidget)
        this.resize()
        this.getRulerRectInfo()
    },

    beforeDestroy() {
        eventBus.$off(eventName.addWidget)
    },

    render() {
        return (
            <div class="canvas-area" vOn:contextmenu_prevent={noop}>
                <Ruler
                    id='ruler'
                    cid="canvas-content"
                    opera={this.rulerLineOpera}
                    thick={this.rulerThick}
                    width={this.rulerWidth}
                    height={this.rulerHeight}
                    contentWidth={this.contentWidth}
                    contentHeight={this.contentHeight}
                    vOn:transform={this.handleRulerTransform}
                >

                    <div class='content-wrap' vOn:mousedown={this.selectCanvas} vOn:mousemove={this.highlightWidget}>

                        <div id="canvas-content" class="content" style={styleToCss({ width: this.contentWidth, height: this.contentHeight })}>

                            <Group />

                            <HighlightBox widgets={this.highlightWidgets} />
                            <HighlightBox active widgets={this.flatWidgets} />

                            {/* <MarkLine conforms={this.allWidgets.map(item => item.style)} /> */}

                            {
                                this.curShape &&
                                <Draggable
                                    ref='shape'
                                    style={styleToCss(this.curShape.style)}
                                    styles={this.curShape.style}
                                    scale={this.rulerTransformInfo.scale}
                                    rulerStartX={this.rulerTransformInfo.startX}
                                    rulerStartY={this.rulerTransformInfo.startY}
                                    vOn:transform={this.changeShapeStyle}
                                />
                            }

                            {
                                this.allWidgets.map(
                                    (widget, index) =>
                                        <div class='component-wrap' data-widget-index={index} style={styleToCss(widget.style)} vOn:mousedown={this.selectWidget.bind(this, widget)} >
                                            <widget.component />
                                        </div>
                                )
                            }

                        </div>

                    </div>

                </Ruler>

            </div>
        )
    }
}
</script>

<style scoped lang="scss">
.canvas-area {
    position: relative;
    width: calc(100vw - 600px);
    .content-wrap {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        .content {
            background-color: #a4d3e1;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
        }
        .content > div {
            position: absolute;
        }
    }
}
</style>
