<script>
import { genArrayARC } from '@/utils/traver.js'

const baseComponentsFiles = require.context(
  '@/components/Widgets',
  true,
  /index\.vue$/
)
const baseComponents = genArrayARC(baseComponentsFiles)
console.log(baseComponents)
const components = baseComponents.reduce((r, c) => {
  r[c.name] = c
  return r
}, {})

const baseSetupsFiles = require.context(
  '@/components/Widgets',
  true,
  /setup\.js$/
)
const baseSetups = genArrayARC(baseSetupsFiles)

export default {
  components,

  data() {
    return {}
  },

  render() {
    return (
      <div class="list">
        {baseSetups.map((setup) => {
          return (
            <div class="item">
              <setup.name width="100%" height="100%"></setup.name>
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
