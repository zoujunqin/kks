export const option = {
  name: 'EchartLine',
  type: 'echart',
  component: () => import('./index.vue'),
  setup: [
    {
      type: 'SetupInput',
      label: '高度',
      mapping: 'style.height',
      props: {
        value: ''
      },
      unit: 'px',
      required: false,
      configurable: true
    },
    {
      type: 'SetupColor',
      label: '颜色',
      mapping: 'style.color',
      props: {
        value: ''
      },
      unit: 'px',
      required: false,
      configurable: true
    },
    {
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
    },
    {
      type: 'SetupImage',
      label: '背景图片',
      mapping: 'style.backgroundColor',
      props: {
        value: '#fff'
      },
      unit: '',
      required: false,
      configurable: true
    }
  ],

  setupSeinor: [],
  setupData: [],
  setupPosition: []
}

export default option
