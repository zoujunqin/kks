<script>
import Ruler from '@/components/Ruler/index'
import Draggable from '@/components/Draggable/index'
import { state } from './observer'
import { noop } from '@/utils'
import { calcWidgetPosition } from '@/utils/widgets'
import { mutations } from './observer'

import Line from '@/components/Widgets/Line/index'
export default {
  data() {
    return {
      rulerTick: 20,
      rootWidth: 0,
      rootHeight: 0,

      scale: 1,
      offsetX: 0, // content 距离视口 x
      offsetY: 0, // content 距离视口 y
      contentWidth: 1600,
      contentHeight: 800,

      draggableGap: 5,
      adsorptionDistance: 5,

      adsorpLefts: [], // 左吸附位置，根据标尺参考线生成
      adsorpTops: [], // 上吸附位置，根据标尺参考线生成

      widgets: [], // 存放添加到拖拽区域的部件

      seizeSeatStyles: {}
    }
  },

  computed: {
    contentStyles() {
      return {
        width: this.contentWidth + 'px',
        height: this.contentHeight + 'px'
      }
    },

    isWidgetSelected() {
      return state.isWidgetSelected
    }
  },

  methods: {
    // 标尺参考线更新触发
    getHeightWidth() {
      this.rootWidth = this.$el.clientWidth
      this.rootHeight = this.$el.clientHeight
    },

    // 标尺滚动和缩放触发
    handleTransform({ sx, sy, scale }) {
      this.offsetX = -sx + 220
      this.offsetY = -sy + 80
      this.scale = scale
    },
    handleRulerLineUpdate(lines) {
      this.adsorpLefts = []
      this.adsorpTops = []
      for (const line of lines) {
        if (line.vertical) {
          this.adsorpLefts.push(line.value)
        } else this.adsorpTops.push(line.value)
      }
    },
    handleContentMouseenter() {
      mutations.setInCanvasArea(true)
      const rawMousemove = document.onmousemove
      document.onmousemove = (e) => {
        rawMousemove && rawMousemove.call(document, e)
        if (!state.isInCanvasArea) return
        const { left, top } = calcWidgetPosition({
          e,
          width: 300,
          height: 200,
          parentWidth: this.contentWidth,
          parentHeight: this.contentHeight,
          gap: this.draggableGap,
          parentOffsetX: this.offsetX,
          parentOffsetY: this.offsetY,
          addis: this.adsorptionDistance,
          adsorpLefts: this.adsorpLefts,
          adsorpTops: this.adsorpTops,
          scale: this.scale,
          cursorOffsetX: 0,
          cursorOffsetY: 0
        })

        this.seizeSeatStyles = {
          left: left + 'px',
          top: top + 'px',
          // display: 'unset',
          opacity: 1
        }
      }
    },
    handleContentMouseleave() {
      mutations.setInCanvasArea(false)
      // this.seizeSeatStyles.display = 'none'
      this.seizeSeatStyles.opacity = 0
    },
    handleContentMouseup() {
      // this.seizeSeatStyles.display = 'none'
      this.seizeSeatStyles.opacity = 0
      this.widgets.push({
        left: parseFloat(this.seizeSeatStyles.left),
        top: parseFloat(this.seizeSeatStyles.top)
      })
    },

    resize() {
      this.getHeightWidth()
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
          width={this.rootWidth}
          height={this.rootHeight}
          slotWidth={1610}
          slotHeight={1000}
          contentWidth={this.contentWidth}
          contentHeight={this.contentHeight}
          onTransform={this.handleTransform}
          onLineUpdate={this.handleRulerLineUpdate}
        >
          <div
            class="content"
            style={this.contentStyles}
            onMouseenter={
              this.isWidgetSelected ? this.handleContentMouseenter : noop
            }
            onMouseup={this.isWidgetSelected ? this.handleContentMouseup : noop}
            onMouseleave={
              this.isWidgetSelected ? this.handleContentMouseleave : noop
            }
          >
            {this.widgets.map((widget) => (
              <Draggable
                left={widget.left}
                top={widget.top}
                width={200}
                height={200}
                gap={this.draggableGap}
                offsetX={this.offsetX}
                offsetY={this.offsetY}
                scale={this.scale}
                adsorptionDistance={this.adsorptionDistance}
                parentWidth={this.contentWidth}
                parentHeight={this.contentHeight}
                adsorpLefts={this.adsorpLefts}
                adsorpTops={this.adsorpTops}
              >
                <Line></Line>
              </Draggable>
            ))}

            {/* 占位 */}
            <div class="seize-seat" style={this.seizeSeatStyles}></div>
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

    .seize-seat {
      // display: none;
      opacity: 0;
      position: absolute;
      width: 300px;
      height: 200px;
      pointer-events: none;
      background: #e3e6e8;
      box-shadow: 0px 0px 4px -2px grey;
      transition: opacity 0.5s ease;
    }
  }
}
</style>
