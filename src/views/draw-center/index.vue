<script>
import AddedWidgets from '@/views/draw-center/AddedWidgets'
import DrawArea from '@/views/draw-center/draw-area/index'
import Config from '@/views/draw-center/Config'
import CommonUse from '@/views/draw-center/CommonUse'
import Widgets from '@/views/draw-center/Widgets'

import { option } from '@/components/Widgets/Line/setup'

import { eventBus, eventName } from './bus/event'
import { styleToCss } from '@/utils/style'

export default {
    data() {
        return {
            option,
            styleForPlace: {},
            innerHTMLForPlace: null,
        }
    },

    methods: {

        dragWidget(option, html) {

            const move = e => {
                this.innerHTMLForPlace = html
                this.styleForPlace = { left: e.clientX, top: e.clientY, opacity: 1 }
            }

            const up = (e) => {
                this.styleForPlace.opacity = 0
                const { left, top } = this.styleForPlace
                const width = 200
                const height = 200

                if (e.path.includes(this.$refs.DrawArea.$el)) {
                    eventBus.$emit(eventName.addWidget, { ...option, style: { top, left, width, height } })
                }


                window.removeEventListener('mousemove', move)
                window.removeEventListener('mouseup', up)
            }

            window.addEventListener('mousemove', move)
            window.addEventListener('mouseup', up)
        },

        // 窗口改变触发各组件resize方法
        resize() {
            const { Widgets, CommonUse, AddedWidgets, DrawArea, Config } = this.$refs
            Widgets?.resize && Widgets.resize()
            CommonUse?.resize && CommonUse.resize()
            AddedWidgets?.resize && AddedWidgets.resize()
            DrawArea?.resize && DrawArea.resize()
            Config?.resize && Config.resize()
        }
    },

    mounted() {
        eventBus.$on(eventName.dragWidget, this.dragWidget)
        window.addEventListener('resize', this.resize)
    },

    beforeDestroy() {
        eventBus.$off(eventName.dragWidget)
        window.addEventListener('resize', this.resize)
    },

    render() {
        return (
            <div class="draw-center">
                <div class="top">
                    <Widgets ref="Widgets" />
                    <CommonUse ref="CommonUse" />
                </div>
                <div class="bottom">
                    <AddedWidgets ref="AddedWidgets" />
                    <DrawArea ref="DrawArea" />
                    <Config ref="Config" option={this.option} />
                </div>

                {/* 拖拽占位, 模拟拖拽组件的视觉效果 */}
                <div class="placeholer" style={styleToCss(this.styleForPlace)} domPropsInnerHTML={this.innerHTMLForPlace} />
            </div>
        )
    }
}
</script>

<style scoped lang="scss">
.draw-center {
    .top {
        height: 60px;
    }
    .bottom {
        display: flex;
        height: calc(100vh - 60px);
    }
    .placeholer {
        opacity: 0;
        position: fixed;
        width: 20px;
        height: 20px;
        z-index: 3024;
        pointer-events: none;
        transition: width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
    }
}
</style>
