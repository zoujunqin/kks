<script>
export default {
  props: {
    setup: Array
  },

  data() {
    return {
      form: {}
    }
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

  watch: {
    form: {
      handler(n) {
        console.log(n)
        this.$emit('change', n)
      },
      deep: true
    }
  },

  methods: {
    createNode(data) {
      return data.map((su) => {
        if (su.children) {
          const collapseItems = (
            <el-collapse-item title={su.label}>
              {this.createNode(su.children)}
            </el-collapse-item>
          )
          return collapseItems
        } else {
          const formItems = (
            <el-form-item label={su.label}>
              <su.type vModel={this.form[su.mapping]}></su.type>
            </el-form-item>
          )
          return formItems
        }
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

<style></style>
