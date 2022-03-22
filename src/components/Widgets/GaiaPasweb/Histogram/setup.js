const option = {
  name: 'EchartHistogram',
  component: () => import('./index.vue'),
  type: 'echart',
  setup: [
    {
      type: 'el-input',
      label: '字体大小',
      mapping: 'inputValue',
      props: {},
      value: '',
      children: null,
      required: false
    }
  ],

  setupSeinor: {},
  setupData: {},
  setupPosition: {}
}

export default option
