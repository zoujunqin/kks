<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },

  props: {
    value: Boolean
  },

  computed: {
    usedValue: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },

  methods: {},

  watch: {
    usedValue(uv) {
      // 模拟失焦
      if (uv)
        document.onmousedown = (e) => {
          e.preventDefault()
          e.stopPropagation()
          if (!e.path.includes(this.$el)) this.usedValue = false
        }
      else document.onmousedown = null
    }
  },

  render() {
    return (
      <div vShow={this.usedValue} class="context-menu">
        {this.$slots.default}
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 150px;
  height: 200px;
  background: yellow;
  z-index: 2026;
}
</style>
