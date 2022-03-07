<script>
import RulerTick from './RulerTick.vue'
export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      horizonConfig: {
        width: 0,
        height: 20,

        beginX: 0, // 刻度开始的 beginX 位置
        beginY: 20, // 刻度beginY y 位置
        gap: 10, // 一个刻度的值
        tickLine: 10, // 刻度线的长度
        scale: 1
      },
      verticalConfig: {
        width: 20,
        height: 0,

        beginX: 20, // 刻度开始的 x 位置
        beginY: 0, // 刻度的 y 位置
        gap: 10, // 一个刻度的值
        tickLine: 10, // 刻度线的长度
        scale: 1
      },
      scale: 1,
      slotWrapWidth: 6000,
      slotWrapHeight: 3000,
      contentWidth: 0,
      contentHeight: 0,

      rulerContent: null
    }
  },

  methods: {
    async getContentHW() {
      await this.$nextTick()
      const content = this.$refs.slotWrap?.children[0]
      this.contentHeight = content.clientHeight
      this.contentWidth = content.clientWidth

      const rulerContent = this.$refs.rulerContent
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
      this.$set(
        this.horizonConfig,
        'start',
        (this.slotWrapWidth - this.contentWidth * this.scale) / 2 - scrollLeft
      )
      this.$set(
        this.verticalConfig,
        'start',
        (this.slotWrapHeight - this.contentHeight * this.scale) / 2 - scrollTop
      )
    },
    handleWheel(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        if (e.wheelDelta > 0) {
          this.scale += 0.01
          this.scale = Math.min(2, this.scale)
        } else {
          this.scale -= 0.01
          this.scale = Math.max(0.2, this.scale)
        }

        this.horizonConfig.scale = this.scale
        this.verticalConfig.scale = this.scale

        this.$slots.default[0].elm.style.transform = `scale(${this.scale})`
        this.handleScroll()
      }
    }
  },

  mounted() {
    this.getContentHW()
    this.getParentHW()
  },

  render() {
    return (
      <div class="ruler">
        <div class="corner"></div>
        <RulerTick
          class="horizon-ruler-tick"
          config={this.horizonConfig}
          scale={this.scale}
        ></RulerTick>
        <RulerTick
          class="vertical-ruler-tick"
          vertical
          config={this.verticalConfig}
          scale={this.scale}
        ></RulerTick>
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
  }
  .vertical-ruler-tick {
    position: absolute;
    left: 0;
    top: 20px;
  }
  .ruler-content {
    width: 100%;
    height: 100%;
    overflow: scroll;
    & > div {
      position: relative;
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
