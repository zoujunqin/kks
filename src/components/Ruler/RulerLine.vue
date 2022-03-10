<script>
import { state } from './observer'
import { noop } from './utils'
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
    mlIndicatorColor: String
  },

  data() {
    return {
      handledLine: null
    }
  },

  computed: {
    start() {
      return this.vertical ? this.startX : this.startY
    },

    lineStyle() {
      const startValue = this.start / this.scale
      const distance = (this.value - startValue) * this.scale + this.thick

      const style = {
        background: this.lineColor
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
    movableLineStyle() {
      const { left, top } = this.line
      const style = {
        left: `${left}px`,
        top: `${top}px`,
        background: this.movableLineColor
      }
      if (this.vertical) {
        style.width = `${this.movableLineThick}px`
      } else style.height = `${this.movableLineThick}px`

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
    moveListener(e) {
      e.preventDefault()
      e.stopPropagation()

      let line = this.line
      if (this.vertical) {
        line.left = e.pageX - state.rulerOffsetX
        line.canRemoved = line.left < this.thick
      } else {
        line.top = e.pageY - state.rulerOffsetY
        line.canRemoved = line.top < this.thick
      }

      this.$emit('move', (this.handledLine = line))
    },
    upListener() {
      window.removeEventListener('mousemove', this.moveListener)
      window.removeEventListener('mouseup', this.upListener)
      if (this.handledLine) this.$emit('up', this.handledLine, this.id)
    },
    handleMousedown(e) {
      window.addEventListener('mousemove', this.moveListener)
      window.addEventListener('mouseup', this.upListener)
      let line = this.line
      if (this.vertical) {
        line.start = this.startX
        line.left = e.pageX - state.rulerOffsetX
      } else {
        line.start = this.startY
        line.top = e.pageY - state.rulerOffsetY
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
  }
}
.vertical-ruler-line {
  height: 100%;
}
.vertical-ruler-line:hover {
  cursor: col-resize;
}
.horizontal-ruler-line {
  width: 100%;
}
.horizontal-ruler-line:hover {
  cursor: row-resize;
}
.movable-line {
  top: -1px;
  left: -1px;
}
</style>
