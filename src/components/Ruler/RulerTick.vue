<script>
import { drawVerticalRuler, drawHorizontalRuler } from './utils'
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
    classes() {
      return [this.vertical ? 'vertical-ruler-tick' : 'horizontal-ruler-tick']
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

    moveListener(e) {
      e.preventDefault()
      e.stopPropagation()
      if (this.vertical) {
        this.line = {
          canAdded: e.pageX - state.rulerOffsetX >= this.thick,
          left: e.pageX - state.rulerOffsetX,
          top: 0,
          vertical: true,
          start: this.startX
        }
      } else {
        this.line = {
          canAdded: e.pageY - state.rulerOffsetY >= this.thick,
          top: e.pageY - state.rulerOffsetY,
          left: 0,
          vertical: false,
          start: this.startY
        }
      }
      this.$emit('move', this.line)
    },
    upListener() {
      window.removeEventListener('mousemove', this.moveListener)
      window.removeEventListener('mouseup', this.upListener)
      if (this.line) {
        this.$emit('up', this.line)
        this.line = null
      }
    },
    handleMousedown(e) {
      window.addEventListener('mousemove', this.moveListener)
      window.addEventListener('mouseup', this.upListener)
      if (!state.rulerOffsetX || !state.rulerOffsetY) {
        if (this.vertical) mutations.setRulerOffsetX(e.pageX - e.offsetX)
        else mutations.setRulerOffsetY(e.pageY - e.offsetY)
      }
      this.$emit('down')
    }
  },

  mounted() {
    this.init()
    this.draw()
  },

  render() {
    return (
      <canvas
        width={this.width}
        height={this.height}
        class={this.classes}
        style={this.styles}
        on-mousedown={this.handleMousedown}
      />
    )
  }
}
</script>

<style scoped lang="scss">
.vertical-ruler-tick:hover {
  cursor: col-resize;
}
.horizontal-ruler-tick:hover {
  cursor: row-resize;
}
</style>
