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
              <config.tag
                option={config.option.option}
                width="100%"
                height="100%"
              ></config.tag>
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
  flex-wrap: wrap;
}
.item {
  box-shadow: 0 0 6px -4px grey;
  width: 200px;
  height: 200px;
  margin-right: 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in;
}
.item:hover {
  box-shadow: 0 0 9px -4px grey;
}
</style>
