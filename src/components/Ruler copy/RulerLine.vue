<script>
export default {
  props: {
    line: Object,
    scale: Number,
    start: Number,
    move: Boolean
  },

  data() {
    return {
      offset: 0,
      value: 0
    }
  },

  computed: {
    lineStyle() {
      const { value, vertical } = this.line
      const startValue = this.start / this.scale
      const distance = (value - startValue) * this.scale + 20

      // if (this.move) return { left: left + 'px', top: top + 'px' }
      if (vertical) {
        return { left: distance + 'px', top: 0 }
      } else {
        return { top: distance + 'px', left: 0 }
      }
    }
  },

  methods: {
    // updateValue() {
    //   const { left, top, vertical } = this.line
    //   const startValue = this.start / this.scale

    //   this.value = ((vertical ? left : top) - 20) * this.scale + startValue
    // },
    handleMousedown() {
      this.$emit('lineMouseDown')
    }
  },

  created() {
    // this.updateValue()
  },

  render() {
    return (
      <div
        class={[
          this.line.vertical ? 'vertical-ruler-line' : 'horizon-ruler-line'
        ]}
        style={this.lineStyle}
        on-mousedown={this.handleMousedown}
      />
    )
  }
}
</script>

<style lang="scss" scoped>
.vertical-ruler-line,
.horizon-ruler-line {
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
.horizon-ruler-line {
  width: 100%;
  height: 1px;
}
.horizon-ruler-line:hover {
  cursor: row-resize;
}
</style>
