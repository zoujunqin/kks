<script>
// import testSetup from '@/components/Widgets/Line/setup'
import { mutations } from './observer'
export default {
  props: {
    option: Object
  },

  data() {
    return {
      canvasContentEl: null
    }
  },

  methods: {
    handleMousedown(e) {
      const innerHTML = e.target.outerHTML
      mutations.setWidgetSelected(true)
      document.onmousemove = (e) => {
        this.$emit('move', e, innerHTML)
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onMouseup = null
        this.$emit('up')
        mutations.setWidgetSelected(false)
      }
    }
  },

  render() {
    return <div class="test-widget" onMousedown={this.handleMousedown}></div>
  }
}
</script>

<style lang="scss" scoped>
.test-widget {
  width: 50px;
  height: 50px;
  background-color: green;
}
</style>
