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
    scale: Number
  },

  data() {
    return {
      ctx: null,
      canvasEl: null,
      line: null
    }
  },

  computed: {
    widthCombineHeight() {
      return this.width + this.height
    },
    startCombine() {
      return this.startX + this.startY
    }
  },

  watch: {
    widthCombineHeight() {
      this.updateCanvas()
      this.draw()
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
    updateCanvas() {
      if (this.vertical) {
        this.$el.width = 20
        this.$el.height = this.height
      } else {
        this.$el.width = this.width
        this.$el.height = 20
      }
    },
    draw() {
      if (this.vertical) {
        const config = {
          width: 20,
          height: this.height,
          scale: this.scale
        }
        drawVerticalRuler(this.ctx, this.startY, config)
      } else {
        const config = {
          width: this.width,
          height: 20,
          scale: this.scale
        }
        drawHorizontalRuler(this.ctx, this.startX, config)
      }
    },

    moveListener(e) {
      e.preventDefault()
      e.stopPropagation()
      if (this.vertical) {
        this.line = {
          canAdded: e.pageX - state.rulerOffsetX >= 20,
          left: e.pageX - state.rulerOffsetX,
          top: 0,
          vertical: true,
          start: this.startX
        }
      } else {
        this.line = {
          canAdded: e.pageY - state.rulerOffsetY >= 20,
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
      if (this.line) this.$emit('up', this.line)
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
        ref="canvas"
        class={[
          this.vertical ? 'vertical-ruler-tick' : 'horizontal-ruler-tick'
        ]}
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
