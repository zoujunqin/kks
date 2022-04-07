<script>
import { drawVerticalRuler, drawHorizontalRuler, setBodyCursor } from './utils'
export default {
    props: {
        vertical: Boolean,
        width: Number,
        height: Number,
        startX: Number,
        startY: Number,
        scale: Number,
        thick: Number,
        tickBackground: String,
        tickLineColor: String,
        tickLine: Number,
        tickColor: String
    },

    inject: ['rulerRectInfo'],

    data() {
        return {
            ctx: null,
            line: null
        }
    },

    computed: {
        widthCombineHeight() {
            return this.width + this.height
        },
        startCombine() {
            return this.startX + this.startY
        },
        styles() {
            const style = {}
            if (this.vertical) {
                style.top = `${this.thick}px`
                style.left = 0
            } else {
                style.left = `${this.thick}px`
                style.top = 0
            }
            return style
        }
    },

    watch: {
        widthCombineHeight: {
            handler() {
                this.$nextTick(this.draw)
            },
            immediate: true
        },
        startCombine() {
            this.draw()
        }
    },

    methods: {
        init() {
            const canvas = this.$el
            this.ctx = canvas && canvas.getContext('2d')
        },

        draw() {
            const config = {
                width: this.width,
                height: this.height,
                scale: this.scale,
                tickBackground: this.tickBackground,
                tickLineColor: this.tickLineColor,
                tickLine: this.tickLine,
                tickColor: this.tickColor
            }
            if (this.vertical) {
                drawVerticalRuler(this.ctx, this.startY, config)
            } else {
                drawHorizontalRuler(this.ctx, this.startX, config)
            }
        },

        createMouseEvent() {
            document.onmousemove = (e) => {
                e.preventDefault(); e.stopPropagation()

                const { left: rulerRectLeft, top: rulerRectTop } = this.rulerRectInfo()

                this.vertical &&
                    (this.line = {
                        canAdded: e.clientX - rulerRectLeft >= this.thick,
                        left: e.clientX - rulerRectLeft,
                        top: 0,
                        vertical: true,
                        start: this.startX
                    })

                !this.vertical &&
                    (this.line = {
                        canAdded: e.clientY - rulerRectTop >= this.thick,
                        top: e.clientY - rulerRectTop,
                        left: 0,
                        vertical: false,
                        start: this.startY
                    })

                this.$emit('move', this.line)
            }

            document.onmouseup = () => {
                document.onmouseup = null
                document.onmousemove = null

                this.line && this.$emit('up', this.line)
                this.line = null
                setBodyCursor('auto')
            }
        },
        handleMousedown() {
            setBodyCursor(this.vertical ? 'col-resize' : 'row-resize')
            this.createMouseEvent()

            this.$emit('down')
        }
    },

    mounted() {
        this.init()
    },

    render() {
        return (
            <canvas
                width={this.width}
                height={this.height}
                style={this.styles}
                vOn:mousedown={this.handleMousedown}
            />
        )
    }
}
</script>
