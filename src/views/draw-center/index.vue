<script>
import AddedLayers from '@/views/draw-center/AddedLayers'
import CanvasArea from '@/views/draw-center/CanvasArea'
import ConfigPanel from '@/views/draw-center/ConfigPanel'
import CommonUse from '@/views/draw-center/CommonUse'
import Layers from '@/views/draw-center/Layers'

export default {
  render() {
    return (
      <div class="draw-center">
        <div class="top">
          <Layers></Layers>
          <CommonUse></CommonUse>
        </div>
        <div class="bottom">
          <AddedLayers></AddedLayers>
          <CanvasArea></CanvasArea>
          <ConfigPanel></ConfigPanel>
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
