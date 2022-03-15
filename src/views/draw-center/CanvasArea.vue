<script>
import Ruler from '@/components/Ruler/index'
export default {
  data() {
    return {
      width: 0,
      height: 0
    }
  },

  methods: {
    getHW() {
      this.width = this.$el.clientWidth
      this.height = this.$el.clientHeight
    }
  },

  mounted() {
    this.getHW()
    window.addEventListener('resize', this.getHW)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getHW)
  },

  render() {
    return (
      <div class="canvas-area">
        <Ruler width={this.width} height={this.height}>
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
