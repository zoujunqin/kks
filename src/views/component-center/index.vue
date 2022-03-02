<script>
import { handledOptions } from '../../traver'
export default {
  data() {
    return {
      handledOptions
      // components: [
      //   {
      //     tag: 'Echart',
      //     option: {},
      //     data: [],
      //     style: {},
      //     source: [],
      //     children: []
      //   }
      // ]
    }
  },

  render() {
    return (
      <div class="list">
        {handledOptions.map((option) => {
          return (
            <div class="item">
              <option.tag option={option.option}></option.tag>
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
