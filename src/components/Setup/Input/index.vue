<script>
export default {
  global: true,
  name: 'SetupInput',
  model: {
    prop: 'value',
    event: 'input'
  },
  render() {
    return (
      <el-input size="mini" attrs={this.$attrs} on={this.$listeners}>
        {Object.keys(this.$slots).map((key) => (
          <template slot={key}>{this.$slots[key]}</template>
        ))}
      </el-input>
    )
  }
}
</script>

<style lang="scss" scoped>
.el-input {
  /deep/ .el-input-group__append {
    background: #5e6b82;
  }
}
</style>
