import Widget from '@/core/widget/widget'
import Wrap from './index.vue'

const option = {
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

export default new Widget(Wrap.name, option, true)
