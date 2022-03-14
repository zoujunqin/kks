<script>
import Generator from '@/components/Setup/Generator'
import { option } from '@/components/Widgets/Line/setup'
export default {
  // props: {
  //   setup: Object
  // },

  render() {
    return (
      <div class="config-panel">
        <Generator setup={option.setup} />
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
