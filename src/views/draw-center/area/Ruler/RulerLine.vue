<script>
import { noop } from '@/utils'
import { setBodyCursor } from './utils'
export default {
    props: {
        id: Number,
        vertical: Boolean,
        line: Object,
        scale: Number,
        startX: Number,
        startY: Number,
        movable: Boolean,
        value: Number,
        thick: Number,
        indicatorBackground: String,
        indicatorColor: String,
        lineColor: String,
        lineThick: Number,
        movableLineColor: String,
        movableLineThick: Number,
        mlIndicatorBackground: String,
        mlIndicatorColor: String,
        pointerEvents: String
    },

    inject: ['rulerRectInfo'],

    data() {
        return {
            handledLine: null
        }
    },

    computed: {
        start() {
            return this.vertical ? this.startX : this.startY
        },

        // 参考线样式
        lineStyle() {
            const startValue = this.start / this.scale
            const distance = (this.value - startValue) * this.scale + this.thick

            const style = {
                background: this.lineColor,
                'pointer-events': this.pointerEvents
            }
            if (this.vertical) {
                style.left = `${distance}px`
                style.top = 0
                style.width = `${this.lineThick}px`
            } else {
                style.left = 0
                style.top = `${distance}px`
                style.height = `${this.lineThick}px`
            }
            return style
        },
        // 移动参考线样式
        movableLineStyle() {
            const style = {
                left: `${this.line.left}px`,
                top: `${this.line.top}px`,
                background: this.movableLineColor
            }

            style[this.vertical ? 'width' : 'height'] = `${this.movableLineThick}px`

            return style
        },
        styles() {
            return this.movable ? this.movableLineStyle : this.lineStyle
        },
        classes() {
            return [
                this.vertical ? 'vertical-ruler-line' : 'horizontal-ruler-line',
                this.movable ? 'movable-line' : null
            ]
        },

        indicatorStyles() {
            const style = {}
            if (this.movable) {
                style.color = this.mlIndicatorColor
                style.background = this.mlIndicatorBackground
                style.opacity =
                    this.line[this.vertical ? 'left' : 'top'] < this.thick ? 0 : 1
            } else {
                style.color = this.indicatorColor
                style.background = this.indicatorBackground
            }
            if (this.vertical) {
                style.left = '2px'
                style.top = `${this.thick + 2}px`
            } else {
                style.top = '-2px'
                style.left = `${this.thick + 2}px`
                style.transform = 'translateY(-100%)'
            }

            return style
        }
    },

    methods: {
        createMouseEvent() {
            document.onmousemove = (e) => {
                e.preventDefault(); e.stopPropagation()

                const { left: rulerRectLeft, top: rulerRectTop } = this.rulerRectInfo()

                let line = this.line
                if (this.vertical) {
                    line.left = e.clientX - rulerRectLeft
                    line.canRemoved = line.left < this.thick
                } else {
                    line.top = e.clientY - rulerRectTop
                    line.canRemoved = line.top < this.thick
                }

                this.$emit('move', (this.handledLine = line))
            }

            document.onmouseup = () => {
                document.onmouseup = null
                document.onmousemove = null
                this.handledLine && this.$emit('up', this.handledLine, this.id)
                setBodyCursor('auto')
            }
        },
        handleMousedown(e) {
            const { left: rulerRectLeft, top: rulerRectTop } = this.rulerRectInfo()

            setBodyCursor(this.vertical ? 'col-resize' : 'row-resize')
            this.createMouseEvent()

            let line = this.line
            if (this.vertical) {
                line.start = this.startX
                line.left = e.clientX - rulerRectLeft
            } else {
                line.start = this.startY
                line.top = e.clientY - rulerRectTop
            }
            this.$emit('down', (this.handledLine = line))
        }
    },

    render() {
        return (
            <div
                class={this.classes}
                style={this.styles}
                on-mousedown={!this.movable ? this.handleMousedown : noop}
            >
                <span class="indicator" style={this.indicatorStyles}>
                    {this.value}
                </span>
            </div>
        )
    }
}
</script>

<style lang="scss" scoped>
.vertical-ruler-line,
.horizontal-ruler-line {
    position: absolute;
    z-index: 2022;
    .indicator {
        position: absolute;
        padding: 2px;
        border-radius: 2px;
        font-size: 12px;
        opacity: 0;
        pointer-events: none;
        transition: all 0.5s ease;
    }
}
.vertical-ruler-line {
    height: 100%;
}
.horizontal-ruler-line {
    width: 100%;
}
.vertical-ruler-line:hover {
    cursor: col-resize;
    .indicator {
        opacity: 1;
    }
}
.horizontal-ruler-line:hover {
    cursor: row-resize;
    .indicator {
        opacity: 1;
    }
}
.movable-line {
    top: -1px;
    left: -1px;
}
</style>
