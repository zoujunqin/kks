<script>
export default {
  global: true,
  name: 'SetupSelect',

  model: {
    prop: 'value',
    event: 'input'
  },

  render() {
    return (
      <el-select
        size="mini"
        placeholder="请选择"
        attrs={{ ...this.$attrs, ...this.$props }}
        on={this.$listeners}
      >
        {this.$attrs.options?.map((item) => (
          <el-option
            key={item.value}
            label={item.label}
            value={item.value}
          ></el-option>
        ))}
      </el-select>
    )
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  width: 100%;
}
</style>
