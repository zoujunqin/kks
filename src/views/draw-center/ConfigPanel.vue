<script>
import Generator from '@/components/Setup/Generator'
export default {
  props: {
    option: Object
  },

  methods: {
    handleChange(v) {
      this.$emit('change', v)
    }
  },

  render() {
    return (
      <div class="config-panel">
        <Generator setup={this.option.setup} onChange={this.handleChange} />
      </div>
    )
  }
}
</script>

<style scoped lang="scss">
.config-panel {
  width: 400px;
  height: 100%;
  background-color: #3e3d3d;
}
</style>
