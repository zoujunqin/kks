<script>
export default {
  props: {
    setup: Array
  },

  data() {
    return {}
  },

  computed: {
    // 有子集的放在一起，没有子集的放在一起
    fsetup() {
      const hasChilds = []
      const notHasChilds = []
      for (const item of this.setup) {
        if (item.children) hasChilds.push(item)
        else notHasChilds.push(item)
      }
      return notHasChilds.concat(hasChilds)
    }
  },

  methods: {
    createNode(data) {
      return data.map((su) => {
        // if (su.children) {
        //   const collapseItems = (
        //     <el-collapse-item title={su.label}>
        //       {this.createNode(su.children)}
        //     </el-collapse-item>
        //   )
        //   return collapseItems
        // } else {
        //   const formItems = (
        //     <el-form-item label={su.label}>
        //       <su.type
        //         vModel={this.form[su.mapping]}
        //         props={su.props}
        //       ></su.type>
        //     </el-form-item>
        //   )
        //   return formItems
        // }
        const formItems = (
          <el-form-item label={su.label}>
            <su.type
              attrs={su.props}
              onInput={(v) => this.$set(su.props, 'value', v)}
            ></su.type>
          </el-form-item>
        )
        return formItems
      })
    }
  },

  render() {
    return (
      <el-form>
        <el-collapse>{this.createNode(this.fsetup)}</el-collapse>
      </el-form>
    )
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  padding: 0 10px;
}
.el-form-item {
  display: flex;
  /deep/ .el-form-item__label {
    color: #fff;
  }
  /deep/ .el-form-item__content {
    flex: 1;
  }
}
</style>
