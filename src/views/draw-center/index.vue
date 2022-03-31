<script>
import AddedWidgets from '@/views/draw-center/AddedWidgets'
import Area from '@/views/draw-center/area/index'
import ConfigPanel from '@/views/draw-center/ConfigPanel'
import CommonUse from '@/views/draw-center/CommonUse'
import Widgets from '@/views/draw-center/Widgets'

import { option } from '@/components/Widgets/Line/setup'

import { state } from './observer'

export default {
  data() {
    return {
      option,
      innerHTML: null,
      seizeSeatStyles: {}
    }
  },

  methods: {
    handleMove(e, innerHTML) {
      const { pageX, pageY } = e
      this.innerHTML = innerHTML
      this.seizeSeatStyles = {
        left: pageX + 'px',
        top: pageY + 'px',
        opacity: state.isInCanvasArea ? 0 : 1
      }
    },
    handleUp() {
      this.seizeSeatStyles.opacity = 0
    },

    // 窗口改变触发各组件resize方法
    resize() {
      const { Widgets, CommonUse, AddedWidgets, Area, ConfigPanel } = this.$refs
      Widgets?.resize && Widgets.resize()
      CommonUse?.resize && CommonUse.resize()
      AddedWidgets?.resize && AddedWidgets.resize()
      Area?.resize && Area.resize()
      ConfigPanel?.resize && ConfigPanel.resize()
    }
  },

  mounted() {
    window.addEventListener('resize', this.resize)
  },

  beforeDestroy() {
    window.addEventListener('resize', this.resize)
  },

  render() {
    return (
      <div class="draw-center">
        <div class="top">
          <Widgets
            ref="Widgets"
            option={this.option}
            onMove={this.handleMove}
            onUp={this.handleUp}
          ></Widgets>
          <CommonUse ref="CommonUse"></CommonUse>
        </div>
        <div class="bottom">
          <AddedWidgets ref="AddedWidgets"></AddedWidgets>
          <Area ref="Area"></Area>
          <ConfigPanel ref="ConfigPanel" option={this.option}></ConfigPanel>
        </div>

        {/* 拖拽占位, 模拟拖拽组件的视觉效果 */}
        <div
          class="seize-seat"
          style={this.seizeSeatStyles}
          domPropsInnerHTML={this.innerHTML}
        ></div>
      </div>
    )
  }
}
</script>

<style scoped lang="scss">
.draw-center {
  .top {
    height: 60px;
  }
  .bottom {
    display: flex;
    height: calc(100vh - 60px);
  }
  .seize-seat {
    opacity: 0;
    position: fixed;
    width: 20px;
    height: 20px;
    background: #000;
    pointer-events: none;
    z-index: 3024;
    transition: width 0.2s ease, height 0.2s ease, opacity 0.2s ease;
  }
}
</style>
