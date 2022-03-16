<script>
import AddedLayers from '@/views/draw-center/AddedLayers'
import CanvasArea from '@/views/draw-center/CanvasArea'
import ConfigPanel from '@/views/draw-center/ConfigPanel'
import CommonUse from '@/views/draw-center/CommonUse'
import Layers from '@/views/draw-center/Layers'

import { option } from '@/components/Widgets/Line/setup'

export default {
  data() {
    return {
      option
    }
  },

  methods: {
    handleChange(v) {
      for (const key of Object.keys(v)) {
        for (const item of this.option.setup) {
          if (item.mapping === key) item.value = v[key]
        }
      }
    },
    // 窗口改变触发各组件resize方法
    resize() {
      const {
        Layers,
        CommonUse,
        AddedLayers,
        CanvasArea,
        ConfigPanel
      } = this.$refs
      Layers.resize && Layers.resize()
      CommonUse.resize && CommonUse.resize()
      AddedLayers.resize && AddedLayers.resize()
      CanvasArea.resize && CanvasArea.resize()
      ConfigPanel.resize && ConfigPanel.resize()
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
          <Layers ref="Layers" option={this.option}></Layers>
          <CommonUse ref="CommonUse"></CommonUse>
        </div>
        <div class="bottom">
          <AddedLayers ref="AddedLayers"></AddedLayers>
          <CanvasArea ref="CanvasArea"></CanvasArea>
          <ConfigPanel
            ref="ConfigPanel"
            option={this.option}
            onChange={this.handleChange}
          ></ConfigPanel>
        </div>
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
}
</style>
