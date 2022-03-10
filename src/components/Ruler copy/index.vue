<script>
import RulerTick from './RulerTick.vue'
import RulerLine from './RulerLine'
export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      horizonConfig: {
        width: 0,
        height: 20,
        start: 0,
        scale: 1
      },
      verticalConfig: {
        width: 20,
        height: 0,
        start: 0,
        scale: 1
      },
      scale: 1,
      slotWrapWidth: 6000,
      slotWrapHeight: 3000,
      contentWidth: 0,
      contentHeight: 0,

      lines: [],
      movableLine: {},
      showMovableLine: false,
      movableLineIsVertical: false
    }
  },

  methods: {
    async getContentHW() {
      await this.$nextTick()
      const content = this.$refs.slotWrap?.children[0]
      this.contentHeight = content.clientHeight
      this.contentWidth = content.clientWidth

      const rulerContent = this.$refs.rulerContent
      // 滚动使内容左上角跟容器左上角对齐
      rulerContent.scrollTop = (this.slotWrapHeight - this.contentHeight) / 2
      rulerContent.scrollLeft = (this.slotWrapWidth - this.contentWidth) / 2
    },
    async getParentHW() {
      await this.$nextTick()
      this.horizonConfig.width = this.$parent.$el.clientWidth - 20
      this.verticalConfig.height = this.$parent.$el.clientHeight - 20
    },
    handleScroll() {
      const rulerContent = this.$refs.rulerContent
      const scrollTop = rulerContent.scrollTop
      const scrollLeft = rulerContent.scrollLeft

      this.horizonConfig.start =
        scrollLeft - (this.slotWrapWidth - this.contentWidth * this.scale) / 2
      this.verticalConfig.start =
        scrollTop - (this.slotWrapHeight - this.contentHeight * this.scale) / 2
    },
    handleWheel(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        if (
          (this.scale <= 0.2 && e.wheelDelta < 0) ||
          (this.scale >= 2 && e.wheelDelta > 0)
        )
          return
        if (e.wheelDelta > 0) {
          this.scale += 0.01
        } else {
          this.scale -= 0.01
        }

        this.scale = +this.scale.toFixed(2)
        this.horizonConfig.scale = this.scale
        this.verticalConfig.scale = this.scale

        this.$slots.default[0].elm.style.transform = `scale(${this.scale})`
        this.handleScroll()
      }
    },

    handleDown() {
      this.showMovableLine = true
    },
    handleMove(line) {
      this.movableLine = {
        ...line
        // value: line.value + this.start / this.scale
      }
      // this.$refs.movableLine.updateValue()
    },
    handleUp() {
      this.showMovableLine = false
      this.lines.push(this.movableLine)
    }
  },

  mounted() {
    this.getContentHW()
    this.getParentHW()
  },

  render() {
    return (
      <div class="ruler">
        <div class="corner" />

        <RulerTick
          class="horizon-ruler-tick"
          config={this.horizonConfig}
          scale={this.scale}
          on-down={this.handleDown}
          on-move={this.handleMove}
          on-up={this.handleUp}
        />
        <RulerTick
          class="vertical-ruler-tick"
          vertical
          config={this.verticalConfig}
          scale={this.scale}
          on-down={this.handleDown}
          on-move={this.handleMove}
          on-up={this.handleUp}
        />

        {this.lines.map((line, index) => (
          <RulerLine
            key={'rulerLine' + index}
            scale={this.scale}
            line={line}
            start={
              line.vertical
                ? this.horizonConfig.start
                : this.verticalConfig.start
            }
          />
        ))}
        <RulerLine
          move
          ref="movableLine"
          vShow={this.showMovableLine}
          scale={this.scale}
          line={this.movableLine}
          start={
            this.movableLine.vertical
              ? this.horizonConfig.start
              : this.verticalConfig.start
          }
        />
        {/* <div class="movable-line" /> */}

        <div
          ref="rulerContent"
          class="ruler-content"
          on-wheel={this.handleWheel}
          on-scroll={this.handleScroll}
        >
          <div
            ref="slotWrap"
            class="slot-wrap"
            style={{
              width: this.slotWrapWidth + 'px',
              height: this.slotWrapHeight + 'px'
            }}
          >
            {this.$slots.default}
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style scoped lang="scss">
.ruler {
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 20px;
  padding-left: 20px;
  box-sizing: border-box;
  overflow: hidden;
  .corner {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background-color: red;
  }
  .horizon-ruler-tick {
    position: absolute;
    top: 0;
    left: 20px;
    z-index: 2023;
  }
  .vertical-ruler-tick {
    position: absolute;
    left: 0;
    top: 20px;
    z-index: 2023;
  }

  .ruler-content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: scroll;
    & > div {
      position: relative;
      background-color: #f3f3f3;
      & > div {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
}
</style>
