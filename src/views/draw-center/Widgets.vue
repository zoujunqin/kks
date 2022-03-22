<script>
import { mutations } from './observer'
import { genArrayARC } from '@/utils/traver.js'

// TODO: 后期要做局部组件自动引入
const optionFiles = require.context('@/components/Widgets', true, /setup\.js$/)
const options = genArrayARC(optionFiles)

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
    // 加载有权限的部件（包括本地和线上）
    fetchWidgets() {
      this.fetchLocalWidgets()
      this.fetchOnlineWidgets()
    },
    // 加载本地部件
    fetchLocalWidgets() {},
    // 加载在线部件
    fetchOnlineWidgets() {},

    handleMousedown(option, e) {
      const innerHTML = e.target.outerHTML
      mutations.setWidgetSelected(true)
      mutations.setWidgetOption(option)
      document.onmousemove = (e) => {
        this.$emit('move', e, innerHTML)
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onMouseup = null
        this.$emit('up')
        mutations.setWidgetSelected(false)
        mutations.setWidgetOption(null)
      }
    }
  },

  render() {
    return (
      <div class="widgets-wrap">
        {options.map((op) => (
          <div
            class="test-widget"
            onMousedown={this.handleMousedown.bind(this, op)}
          >
            {op.name}
          </div>
        ))}
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.widgets-wrap {
  display: flex;
  justify-content: space-between;
}
.test-widget {
  width: 50px;
  height: 50px;
  background-color: green;
}
</style>
