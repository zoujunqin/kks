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
    value: Number
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
      const distance = (this.value - startValue) * this.scale + 20

      if (this.vertical) return { left: distance + 'px', top: 0 }
      else return { top: distance + 'px', left: 0 }
    },
    movableLineStyle() {
      const { left, top } = this.line
      return { left: left + 'px', top: top + 'px' }
    },
    styles() {
      return this.movable ? this.movableLineStyle : this.lineStyle
    },
    classes() {
      return [
        this.vertical ? 'vertical-ruler-line' : 'horizontal-ruler-line',
        this.movable ? 'movable-line' : null
      ]
    }
  },

  methods: {
    moveListener(e) {
      e.preventDefault()
      e.stopPropagation()

      let line = this.line
      if (this.vertical) {
        line.left = e.pageX - state.rulerOffsetX
        line.canRemoved = line.left < 20
      } else {
        line.top = e.pageY - state.rulerOffsetY
        line.canRemoved = line.top < 20
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
      />
    )
  }
}
</script>

<style lang="scss" scoped>
.vertical-ruler-line,
.horizontal-ruler-line {
  position: absolute;
  z-index: 2022;
  background-color: green;
}
.vertical-ruler-line {
  height: 100%;
  width: 1px;
}
.vertical-ruler-line:hover {
  cursor: col-resize;
}
.horizontal-ruler-line {
  width: 100%;
  height: 1px;
}
.horizontal-ruler-line:hover {
  cursor: row-resize;
}
.movable-line {
  top: -1px;
  left: -1px;
}
</style>
