<script>
import { drawVerticalRuler, drawHorizontalRuler, setBodyCursor } from './utils'
import { state, mutations } from './observer'
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
        e.preventDefault()
        e.stopPropagation()

        this.vertical &&
          (this.line = {
            canAdded: e.pageX - state.rulerOffsetX >= this.thick,
            left: e.pageX - state.rulerOffsetX,
            top: 0,
            vertical: true,
            start: this.startX
          })

        !this.vertical &&
          (this.line = {
            canAdded: e.pageY - state.rulerOffsetY >= this.thick,
            top: e.pageY - state.rulerOffsetY,
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
    handleMousedown(e) {
      setBodyCursor(this.vertical ? 'col-resize' : 'row-resize')
      this.createMouseEvent()

      if (!state.rulerOffsetX && this.vertical) {
        mutations.setRulerOffsetX(e.pageX - e.offsetX)
      } else if (!state.rulerOffsetY && !this.vertical) {
        mutations.setRulerOffsetY(e.pageY - e.offsetY)
      }
      this.$emit('down')
    }
  },

  mounted() {
    this.init()
    // this.draw()
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
