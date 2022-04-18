<script>
import Ruler from './Ruler/index'
import Draggable from './Draggable'
import HighlightBox from './HighlightBox'
// import MarkLine from './MarkLine'
import Group from './Group'
import Area from './Area'

import { calcOnReverseScale, calcOnScale } from '@/utils/scale'
import { noop } from '@/utils'
import { styleToCss, getShapeStyle } from '@/utils/style'
import { getBoundingRect, findGroupInList, findTopGroupInList, getIntersectionOfArrs, rootGroupId, findGroup } from '@/utils/group'
import { initWidget, flatWidgets, findIndex, widgetIsEqual } from '@/utils/widget'
import { isPointInMatrix } from '@/utils/geometry'
import { getRotatedPointCoordinate } from '@/utils/translate'

import { state, mutations } from '../bus/store'
import { eventBus, eventName } from '../bus/event'


export default {

    provide() {
        return {
            getFlatedWidgets: () => this.flatedWidgets
        }
    },

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

            oldWidgets: [],

            shapeMoving: false

        }
    },

    computed: {
        curShape() {
            if (this.flatedWidgets.length === 0) return null
            else if (this.flatedWidgets.length === 1) return this.flatedWidgets[0]
            else return {
                style: { ...getBoundingRect(this.flatedWidgets.map(w => w.style)), rotate: 0 }
            }
        },

        widgets() { return state.widgets },
        flatedWidgets() { return flatWidgets(state.widgets) },

        allWidgets() { return state.allWidgets },
        allFlatedWidgets() { return flatWidgets(state.allWidgets) },

        prevWidgets() {
            const group = findGroup(state.allWidgets, state.prevGroupId)
            return group ? [group] : []
        },

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

        // 获取符合鼠标位置的层级最高的 widget
        getWidgetUnderCursor(e) {
            const point = { x: e.clientX - this.canvasRectInfo.left, y: e.clientY - this.canvasRectInfo.top }

            const widgets = this.allFlatedWidgets.filter(item => {
                const { lt, rt, lb, rb } = item.rotatedCoordinate
                return isPointInMatrix(lt, rt, rb, lb, point)
            })
            const widget = widgets.reduce((result, item) => {
                result = result ? (item.style['z-index'] > result.style['z-index'] ? item : result) : item
                return result
            }, null)
            return widget
        },


        handleMoveOnContentWrap() {
            // const point = { x: e.clientX - this.canvasRectInfo.left, y: e.clientY - this.canvasRectInfo.top }

            // const hs = this.flatedWidgets.filter(item => {
            //     const { lt, rt, lb, rb } = item.rotatedCoordinate
            //     return isPointInMatrix(lt, rt, rb, lb, point)
            // })
            // // TODO: hs还要做层级的过滤，只用 hs 中层级最高的一个
            // let widget = hs[0]
            // if (!widget) return this.highlightWidgets = []

            // // TODO: 这边 filter 现在用的是最顶层的 group，后面要进行 group 的剥离
            // widget = widget.groupIds.length !== 0 ? this.flatedWidgets.filter(item => item.groupIds.includes(widget.groupIds[widget.groupIds.length - 1])) : [widget]

            // for (const item of widget) {
            //     if (!this.flatedWidgets.find(cur => cur.wid == item.wid)) this.highlightWidgets.push(item)
            // }
        },

        handleDownOnContentWrap(e) {
            this.shapeMoving = false

            // 获取符合鼠标位置的元素
            let widget = this.getWidgetUnderCursor(e)
            if (widget && e.metaKey) {
                const ids = getIntersectionOfArrs(...this.widgets.map(item => item.gids))
                if (ids.length === 0) {
                    widget = findTopGroupInList(this.allWidgets, widget.gid) || widget
                    mutations.setPrevGroupId(rootGroupId)
                    mutations.setCurGroupId(rootGroupId)
                }
                else if (widget.gids.length !== 0) {
                    const id = ids[0]
                    widget = findGroupInList(this.allWidgets, widget.gids[widget.gids.findIndex(item => item === id) - 1]) || widget
                    mutations.setPrevGroupId(id)
                    mutations.setCurGroupId(id)
                }
                // 如果点击了两次，则 state.widgets 里会有两个一样的元素
                mutations.setWidgets(widget, false)
                return this.$nextTick(() => { this.$refs?.shape?.handleDownOnRoot(e) })
            }
            if (widget && !e.metaKey) {
                widget = (state.curGroupId === rootGroupId ? findTopGroupInList(this.allWidgets, widget.gid) : findGroupInList(this.allWidgets, widget.gids[widget.gids.findIndex(item => item === state.prevGroupId) - 1])) || widget

                mutations.setPrevGroupId(widget.gid)
                mutations.setCurGroupId(widget.group ? widget.id : widget.gid)

                !this.widgets.includes(widget) && mutations.setWidgets([widget])
                return this.$nextTick(() => { this.$refs?.shape?.handleDownOnRoot(e) })
            }

            // 点击



        },

        handleUpOnContentWrap(e) {

            let widget = this.getWidgetUnderCursor(e)
            if (widget && e.metaKey) {
                widget = findGroupInList(this.allWidgets, widget.gid) || widget
                const indexs = findIndex(this.widgets, item => widgetIsEqual(widget, item))
                if (indexs.length < 2) return
                const newWidgets = this.widgets.filter((_, index) => !(this.shapeMoving ? [indexs[0]] : indexs).includes(index))
                mutations.setWidgets(newWidgets)
            }
            else if (widget && !e.metaKey) {
                // 判断有没有移动
                if (this.shapeMoving) return

                widget = (state.curGroupId === rootGroupId ? findTopGroupInList(this.allWidgets, widget.gid) : findGroupInList(this.allWidgets, widget.gids[widget.gids.findIndex(item => item === state.prevGroupId) - 1])) || widget

                mutations.setPrevGroupId(widget.gid)
                mutations.setCurGroupId(widget.group ? widget.id : widget.gid)

                mutations.setWidgets([widget])
            }

        },

        handleClickOnContentWrap() {
            // let widget = this.getWidgetUnderCursor(e)
            // if (widget) {
            //     if (e.metaKey && widget.active) {
            //         widget = widget.gid ? findGroupInList(this.allWidgets, widget.gid) : widget
            //         if (widget.active && state.widgets.includes(widget)) state.widgets.splice(widget, 1)
            //         widget.active = false
            //     }
            // }
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

            console.log(curWidget)

            mutations.setCurGroupId(rootGroupId)
            mutations.setPrevGroupId(rootGroupId)
            mutations.setWidgets([curWidget])
            mutations.setAllWidgets(curWidget)
        },
        /************************  widget 🇨🇳🇨🇳🇨🇳  ***************************/

        changeShapeStyle() { },
        handleShapeMove(moving) { this.shapeMoving = moving },

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

                    <div class='content-wrap' vOn:mousedown={this.handleDownOnContentWrap} vOn:mousemove={this.handleMoveOnContentWrap} vOn:mouseup={this.handleUpOnContentWrap} vOn:click={this.handleClickOnContentWrap}>

                        <div id="canvas-content" class="content" style={styleToCss({ width: this.contentWidth, height: this.contentHeight })}>

                            <Area />

                            <Group widgets={this.widgets} />
                            <Group prev widgets={this.prevWidgets} />

                            <HighlightBox widgets={this.highlightWidgets} />
                            <HighlightBox active widgets={this.flatedWidgets} />

                            {/* <MarkLine conforms={this.flatedWidgets.map(item => item.style)} /> */}

                            {
                                this.curShape &&
                                <Draggable
                                    ref='shape'
                                    style={styleToCss(getShapeStyle(this.curShape.style))}
                                    styles={(this.curShape.style)}
                                    scale={this.rulerTransformInfo.scale}
                                    rulerStartX={this.rulerTransformInfo.startX}
                                    rulerStartY={this.rulerTransformInfo.startY}
                                    vOn:transform={this.changeShapeStyle}
                                    vOn:move={this.handleShapeMove}
                                />
                            }

                            {
                                this.allFlatedWidgets.map(
                                    widget =>
                                        <div class='component-wrap' style={styleToCss(widget.style)} >
                                            <widget.component />
                                        </div>
                                )
                            }

                            {
                                this.nodes
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
