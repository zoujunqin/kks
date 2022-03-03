<script>
import { handledConfigs } from '../../traver'
export default {
  data() {
    return {}
  },

  render() {
    return (
      <div class="list">
        {handledConfigs.map((config) => {
          return (
            <div class="item">
              <config.tag option={config.option.option}></config.tag>
            </div>
          )
        })}
      </div>
    )
  }
}
</script>

<style scoped lang="scss">
.list {
  display: flex;
}
.item {
  width: 300px;
  height: 300px;
}
</style>
