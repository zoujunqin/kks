import Vue from 'vue'

// 自动化遍历
const files = require.context('../components', true, /\.vue$/)
const modules = files.keys().reduce((needed, key) => {
  const name = key.replace(/^\.\/(.*)\.\w+$/, '$1')
  const file = files(key)
  // needed[name] = file.default || file
  needed[name] = { ...file.default, ...file }
  delete needed[name].default
  return needed
}, {})

for (const comp of Object.values(modules)) {
  // 组件 global: true 即注册为全局组件
  if (comp.global) Vue.component(comp.name, comp)
}
