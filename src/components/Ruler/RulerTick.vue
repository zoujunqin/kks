<script>
import { drawVerticalRuler, drawHorizonRuler } from './utils'
export default {
  props: {
    vertical: Boolean,
    config: Object
  },

  data() {
    return {
      ctx: null,
      canvasEl: null
    }
  },

  watch: {
    config: {
      async handler(newVal) {
        await this.$nextTick()
        this.$el.width = newVal.width
        this.$el.height = newVal.height
        this.draw(this.ctx, this.config)
      },
      deep: true
    }
  },

  methods: {
    init() {
      const canvas = this.$el
      this.ctx = canvas && canvas.getContext('2d')
      this.draw(this.ctx, this.config)
    },
    draw(ctx, config) {
      if (this.vertical) drawVerticalRuler(ctx, config)
      else drawHorizonRuler(ctx, config)
    }
  },

  mounted() {
    this.init()
  },

  render() {
    return <canvas ref="canvas" class="canvas"></canvas>
  }
}
</script>

<style scoped lang="scss"></style>
