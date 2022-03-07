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
      contentHeight: 0,
      contentWidth: 0
    }
  },

  computed: {
    slotWrapStyle() {
      return {
        width: this.contentWidth * 1.5 + 'px',
        height: this.contentHeight * 1.5 + 'px'
      }
    }
  },

  methods: {
    initScroll() {
      // await this.$nextTick()
      const rulerContent = this.$refs.rulerContent
      rulerContent.scrollLeft = 400
      rulerContent.scrollTop = (this.contentHeight * 0.5) / 2
    },
    async getContentHW() {
      await this.$nextTick()
      this.contentHeight = this.$refs.subRulerContent.querySelector(
        'div'
      ).clientHeight
      this.contentWidth = this.$refs.subRulerContent.querySelector(
        'div'
      ).clientWidth
    },
    async getParentHW() {
      await this.$nextTick()
      this.horizonConfig.width = this.$parent.$el.clientWidth - 20
      this.verticalConfig.height = this.$parent.$el.clientHeight - 20
    },
    handleScroll(e) {
      const scrollTop = e.srcElement.scrollTop
      const scrollLeft = e.srcElement.scrollLeft

      this.$set(this.horizonConfig, 'start', scrollLeft)
      this.$set(this.verticalConfig, 'start', scrollTop)
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
        this.handleScroll(e)
      }
    }
  },

  mounted() {
    this.getParentHW()
    this.initScroll()
    this.getContentHW()
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
          <div ref="subRulerContent" style={this.slotWrapStyle}>
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
    overflow: auto;
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
