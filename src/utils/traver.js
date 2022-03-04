export function genKeyValueARC(files) {
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

export function genArrayARC(files) {
  const modules = files.keys().reduce((needed, key) => {
    const file = files(key)
    // needed[name] = file.default || file
    const tmp = { ...file.default, ...file }
    delete tmp.default
    needed.push(tmp)
    return needed
  }, [])

  return modules
}
