<script>
import Ruler from '@/components/Ruler/index'
import Draggable from '@/components/Draggable/index'
export default {
  data() {
    return {
      width: 0,
      height: 0,
      offsetX: 0,
      offsetY: 0,
      scale: 1,
      contentWidth: 1600,
      contentHeight: 800
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

    // 标尺滚动和缩放执行
    handleTransform({ sx, sy, scale }) {
      this.offsetX = -sx + 220
      this.offsetY = -sy + 80
      console.log('sx', this.offsetX)
      console.log('sy', this.offsetY)
      this.scale = scale
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
          width={this.width}
          height={this.height}
          slotWidth={2000}
          slotHeight={1000}
          contentWidth={this.contentWidth}
          contentHeight={this.contentHeight}
          onTransform={this.handleTransform}
        >
          <div class="content" style={this.contentStyles}>
            <Draggable
              offsetX={this.offsetX}
              offsetY={this.offsetY}
              scale={this.scale}
              parentWidth={this.contentWidth}
              parentHeight={this.contentHeight}
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
