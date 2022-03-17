<script>
import Ruler from '@/components/Ruler/index'
import Draggable from '@/components/Draggable/index'
export default {
  data() {
    return {
      rulerTick: 20,
      width: 0,
      height: 0,
      // content 距离视口 x
      offsetX: 0,
      // content 距离视口 y
      offsetY: 0,
      scale: 1,
      contentWidth: 1600,
      contentHeight: 800,

      // 吸附位置，根据标尺参考线生成
      adsorpLefts: [],
      adsorpTops: []
    }
  },

  computed: {
    contentStyles() {
      return {
        width: this.contentWidth + 'px',
        height: this.contentHeight + 'px'
      }
    }
  },

  methods: {
    getHW() {
      this.width = this.$el.clientWidth
      this.height = this.$el.clientHeight
    },

    // 标尺滚动和缩放触发
    handleTransform({ sx, sy, scale }) {
      this.offsetX = -sx + 220
      this.offsetY = -sy + 80
      this.scale = scale
    },
    // 标尺参考线更新触发
    handleRulerLineUpdate(lines) {
      this.adsorpLefts = []
      this.adsorpTops = []
      for (const line of lines) {
        if (line.vertical) {
          this.adsorpLefts.push(line.value)
        } else this.adsorpTops.push(line.value)
      }
    },

    resize() {
      this.getHW()
    }
  },

  mounted() {
    this.resize()
  },

  render() {
    return (
      <div class="canvas-area">
        <Ruler
          thick={this.rulerThick}
          width={this.width}
          height={this.height}
          slotWidth={1610}
          slotHeight={1000}
          contentWidth={this.contentWidth}
          contentHeight={this.contentHeight}
          onTransform={this.handleTransform}
          onLineUpdate={this.handleRulerLineUpdate}
        >
          <div class="content" style={this.contentStyles}>
            <Draggable
              left={0}
              top={0}
              width={200}
              height={200}
              offsetX={this.offsetX}
              offsetY={this.offsetY}
              scale={this.scale}
              parentWidth={this.contentWidth}
              parentHeight={this.contentHeight}
              adsorpLefts={this.adsorpLefts}
              adsorpTops={this.adsorpTops}
            ></Draggable>
          </div>
        </Ruler>
      </div>
    )
  }
}
</script>

<style scoped lang="scss">
.canvas-area {
  position: relative;
  width: calc(100vw - 600px);
  .content {
    overflow: hidden;
    background-color: #a4d3e1;
  }
}
</style>
