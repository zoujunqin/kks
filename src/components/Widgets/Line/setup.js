import Widget from '@/core/widget/widget'
import Wrap from './index.vue'

export const option = {
  setup: [
    {
      type: 'el-input',
      label: '高度',
      mapping: 'style.height',
      props: {},
      value: '',
      unit: 'px',
      required: false,
      configurable: true
    }
  ],

  setupSeinor: [],
  setupData: [],
  setupPosition: []
}

export default new Widget(Wrap.name, option, true)
