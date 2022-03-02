import Mock from 'mockjs'

// 自动化遍历
const files = require.context('../mock', true, /\.js$/)
const modules = files.keys().reduce((needed, key) => {
  // const name = key.replace(/^\.\/(.*)\.\w+$/, '$1')
  const file = files(key)
  // needed[name] = file.default || file
  const tmp = { ...file.default, ...file }
  delete tmp.default
  needed.push(tmp)
  return needed
}, [])

// mock

Mock.setup({
  timeout: 600
})

modules.forEach((module) => {
  Object.keys(module).forEach((key) => {
    // 这里的 key 代表配置的字符串 eg:'POST /url'
    const { method, url } = getMethodAndUrl(key)
    Mock.mock(url, method, module[key])
  })
})

function getMethodAndUrl(str) {
  const [method, url] = str.split(' ')
  return {
    method: method.toLowerCase(),
    url
  }
}
