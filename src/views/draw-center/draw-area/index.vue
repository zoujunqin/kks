<script>
import ClipboardJs from 'clipboard'

import Ruler from './Ruler/index'
import Draggable from './Draggable/index'
import MarkLine from './MarkLine/index'

import { noop } from '@/utils'
import { limitPosition } from '@/utils/position'

import { state, mutations } from '../bus/store'
import { eventBus, eventName } from '../bus/event'

export default {

    // provide() {
    //     return {
    //         rulerRectInfo: () => this.rulerRectInfo
    //     }
    // },

    data() {
        return {
            // ruler
            rulerRectInfo: {},
            rulerThick: 20,
            rootWidth: 0,
            rootHeight: 0,

            scale: 1,
            rulerStartx: 0, // 横向标尺开始的刻度
            rulerStarty: 0, // 竖向标尺开始的刻度

            contentWidth: 1600,
            contentHeight: 800,

            draggableGap: 5,
            adsorptionDistance: 5,

            adsorpLefts: [], // 左吸附位置，根据标尺参考线生成
            adsorpTops: [], // 上吸附位置，根据标尺参考线生成

            widgets: [], // 存放添加到拖拽区域的部件

            // 右键菜单
            showContextmenu: false,
            contextmenuStyles: {},

            clipboard: null,
            clipText: 'text',

            // 标尺的线是否可操作
            rulerLineOpera: true,

            gapL: 0,
            gapR: 0,
            gapT: 0,
            gapB: 0
        }
    },

    computed: {
        contentStyles() {
            return {
                width: this.contentWidth + 'px',
                height: this.contentHeight + 'px'
            }
        },

        isWidgetSelected() {
            return state.isWidgetSelected
        }
    },

    methods: {
        handleCopy() {
            this.clipText = state.activedWidget || ''
        },
        handlePaste() {
            // TODO:
            navigator.clipboard
                .readText()
                .then((clipText) => {
                    this.widgets.push(clipText)
                })
                .catch(() => { })
        },
        createClipboard() {
            this.clipboard = new ClipboardJs('.copy', {
                text: () => {
                    return this.clipText
                }
            })
        },

        // 标尺参考线更新触发
        getHeightWidth() {
            this.rootWidth = this.$el.clientWidth
            this.rootHeight = this.$el.clientHeight
        },

        // 标尺滚动和缩放触发
        handleTransform({ gapL, gapR, gapT, gapB, startx, starty, scale }) {
            this.rulerStartx = startx
            this.rulerStarty = starty
            this.scale = scale
            this.gapL = gapL
            this.gapR = gapR
            this.gapT = gapT
            this.gapB = gapB
        },
        handleRulerLineUpdate(lines) {
            this.adsorpLefts = []
            this.adsorpTops = []
            for (const line of lines) {
                if (line.vertical) {
                    this.adsorpLefts.push(line.value)
                } else this.adsorpTops.push(line.value)
            }
        },

        handleContentMousedown() {
            this.widgets.forEach(w => w.active = false)
        },

        // 拖拽组件右键菜单
        handleDraggableContextmenu(e) {
            e.preventDefault()
            this.contextmenuStyles = {
                left: e.pageX + 'px',
                top: e.pageY + 'px'
            }
            this.showContextmenu = true
        },
        draggableMousedown(widget) {
            mutations.setActivatedWidget(widget)
            this.widgets.forEach(w => w.active = false)
            widget.active = true
        },
        handleDraggableTransform(index, style) {
            const orStyle = this.widgets[index].style
            // 限制拖拽
            const limitStyle = limitPosition({
                ...orStyle,
                ...style,
                limit: 5,
                scale: this.scale,
                gl: this.gapL,
                gr: this.gapR,
                gt: this.gapT,
                gb: this.gapB,
                pw: this.contentWidth,
                ph: this.contentHeight
            })
            this.widgets[index].style = {
                ...orStyle,
                ...style,
                ...limitStyle
            }
        },

        getRulerRectInfo() {
            this.rulerRectInfo = document.querySelector('#ruler').getBoundingClientRect()
        },

        addWidgetToCanvas() {
            const rulerRectInfo = this.rulerRectInfo
            const { style: { left, top } } = state.curWidget
            state.curWidget.style.left = left + this.rulerStartx - (rulerRectInfo.left + this.rulerThick)
            state.curWidget.style.top = top + this.rulerStarty - (rulerRectInfo.top + this.rulerThick)
            this.widgets.push(state.curWidget)
        },

        resize() {
            this.getHeightWidth()
        }
    },

    mounted() {
        eventBus.$on(eventName.addWidgetToCanvas, this.addWidgetToCanvas)
        this.resize()
        this.getRulerRectInfo()
        this.createClipboard()
    },

    beforeDestroy() {
        eventBus.$off(eventName.addWidgetToCanvas)
        this.clipboard.destroy()
    },

    render() {
        return (
            <div class="canvas-area" vOn:contextmenu_prevent={noop}>
                <Ruler
                    id='ruler'
                    cid="canvas-content"
                    opera={this.rulerLineOpera}
                    thick={this.rulerThick}
                    width={this.rootWidth}
                    height={this.rootHeight}
                    contentWidth={this.contentWidth}
                    contentHeight={this.contentHeight}
                    vOn:transform={this.handleTransform}
                    vOn:lineUpdate={this.handleRulerLineUpdate}
                    vOn:mousedown_capture={this.handleContentMousedown}
                >


                    <div id="canvas-content" class="content" style={this.contentStyles}>

                        <MarkLine />

                        {
                            this.widgets.map((widget, index) => (
                                <Draggable
                                    style={{
                                        left: widget.style.left + 'px',
                                        top: widget.style.top + 'px',
                                        width: widget.style.width + 'px',
                                        height: widget.style.height + 'px',
                                        transform: `rotate(${widget.style.rotate}deg)`,
                                        'transform-origin': widget.style['transform-origin']
                                    }}
                                    active={widget.active}
                                    styles={widget.style}
                                    gap={this.draggableGap}
                                    scale={this.scale}
                                    rulerStartx={this.rulerStartx}
                                    rulerStarty={this.rulerStarty}
                                    adsorptionDistance={this.adsorptionDistance}
                                    parentWidth={this.contentWidth}
                                    parentHeight={this.contentHeight}
                                    adsorpLefts={this.adsorpLefts}
                                    adsorpTops={this.adsorpTops}
                                    vOn:contextmenu_native={this.handleDraggableContextmenu}
                                    vOn:transform={this.handleDraggableTransform.bind(this, index)}
                                    vOn:mousedown={this.draggableMousedown.bind(this, widget, index)}
                                >
                                    <widget.component></widget.component>
                                </Draggable>
                            ))
                        }

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
    // .content-wrap {
    //     width: 100%;
    //     height: 100%;
    //     position: relative;
    //     overflow: hidden;
    //     .content {
    //         background-color: #a4d3e1;
    //         position: absolute;
    //         left: 0;
    //         right: 0;
    //         top: 0;
    //         bottom: 0;
    //         margin: auto;
    //     }
    // }
    .content {
        background-color: #a4d3e1;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
}
</style>
