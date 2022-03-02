export default function handleAfterRequireContext(files) {
  const modules = files.keys().reduce((needed, key) => {
    const name = key.replace(/^\.\/(.*)\.\w+$/, '$1')
    const file = files(key)
    // needed[name] = file.default || file
    needed[name] = { ...file.default, ...file }
    delete needed[name].default
    return needed
  }, {})

  return modules
}
