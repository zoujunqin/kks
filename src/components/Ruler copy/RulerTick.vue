<script>
import { drawVerticalRuler, drawHorizonRuler } from './utils'
export default {
  props: {
    vertical: Boolean,
    config: Object
  },

  data() {
    return {
      ctx: null,
      canvasEl: null,

      offset: 0 // 标尺组件距离窗口上边或者左边的距离
    }
  },

  watch: {
    config: {
      async handler(newVal) {
        await this.$nextTick()
        this.$el.width = newVal.width
        this.$el.height = newVal.height
        this.draw(this.ctx, this.config)
      },
      deep: true
    }
  },

  methods: {
    init() {
      const canvas = this.$el
      this.ctx = canvas && canvas.getContext('2d')
      this.draw(this.ctx, this.config)
    },
    draw(ctx, config) {
      if (this.vertical) drawVerticalRuler(ctx, config)
      else drawHorizonRuler(ctx, config)
    },

    moveListener(e) {
      e.preventDefault()
      e.stopPropagation()
      const startValue = this.config.start / this.config.scale
      console.log(this.config.start)
      const line = this.vertical
        ? {
            value:
              (e.pageX - this.offset - 20) * this.config.scale + startValue,
            // top: 0,
            vertical: true,
            start: this.config.start
          }
        : {
            value:
              (e.pageY - this.offset - 20) * this.config.scale + startValue,
            // left: 0,
            vertical: false,
            start: this.config.start
          }
      this.$emit('move', line)
    },
    upListener() {
      this.$emit('up')
      window.removeEventListener('mousemove', this.moveListener)
      window.removeEventListener('mouseup', this.upListener)
    },
    handleMousedown(e) {
      this.offset = this.vertical ? e.pageX - e.offsetX : e.pageY - e.offsetY
      this.$emit('down')
      window.addEventListener('mousemove', this.moveListener)
      window.addEventListener('mouseup', this.upListener)
    }
  },

  mounted() {
    this.init()
  },

  render() {
    return (
      <canvas
        ref="canvas"
        class={[this.vertical ? 'vertical-ruler-tick' : 'horizon-ruler-tick']}
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
.horizon-ruler-tick:hover {
  cursor: row-resize;
}
</style>
