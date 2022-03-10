<script>
import Ruler from '@/components/Ruler/index'
export default {
  render() {
    return (
      <div class="canvas-area">
        <Ruler>
          <div class="content"></div>
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
    width: 1600px;
    height: 800px;
    background-color: #a4d3e1;
  }
}
</style>
