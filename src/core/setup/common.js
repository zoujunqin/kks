// 字体大小
export const fontSize = {
  type: 'el-input',
  label: '字体大小',
  mapping: 'style.fontSize',
  props: {
    value: '12'
  },
  unit: 'px',
  required: false,
  configurable: true
}

// 字体颜色
export const fontColor = {
  type: 'SetupColor',
  label: '字体颜色',
  mapping: 'style.color',
  props: {
    value: '#fff'
  },
  unit: '',
  required: false,
  configurable: true
}

// 字体粗细
export const fontWeight = {
  type: 'SetupSelect',
  label: '粗细',
  mapping: 'style.fontWeight',
  props: {
    value: '',
    options: [
      { label: '好粗', value: '1' },
      { label: '中等', value: '2' },
      { label: '好细', value: '3' }
    ]
  },
  unit: '',
  required: false,
  configurable: true
}

// 背景颜色
export const backgroundColor = {
  type: 'SetupColor',
  label: '背景颜色',
  mapping: 'style.backgroundColor',
  props: {
    value: '#fff'
  },
  unit: '',
  required: false,
  configurable: true
}
