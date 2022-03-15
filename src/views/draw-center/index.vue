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
    }
  },

  render() {
    return (
      <div class="draw-center">
        <div class="top">
          <Layers option={this.option}></Layers>
          <CommonUse></CommonUse>
        </div>
        <div class="bottom">
          <AddedLayers></AddedLayers>
          <CanvasArea></CanvasArea>
          <ConfigPanel
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
