<script>
import SetupInput from '../Input/index'
export default {
  global: true,
  name: 'SetupColor',
  model: {
    prop: 'value',
    event: 'input'
  },
  render() {
    return (
      <div class="color-wrap">
        <SetupInput size="mini" attrs={this.$attrs} on={this.$listeners}>
          <template slot="append">
            <el-color-picker
              size="mini"
              attrs={this.$attrs}
              on={this.$listeners}
              show-alpha
            ></el-color-picker>
          </template>
        </SetupInput>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.color-wrap {
  display: flex;
  align-items: center;
  .el-input {
    flex: 1;
  }

  /deep/.el-color-picker__trigger {
    width: 23px;
    height: 23px;
  }
}
</style>
