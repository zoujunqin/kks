<script>
export default {
  global: true,
  name: 'SetupNumber',

  model: {
    prop: 'value',
    event: 'input'
  },

  render() {
    return (
      <el-input-number
        controls-position="right"
        attrs={this.$attrs}
        on={this.$listeners}
      ></el-input-number>
    )
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
