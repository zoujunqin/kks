import Widget from '@/core/widget/widget'
import Wrap from './index.vue'

export const option = {
  setup: [
    {
      type: 'el-input',
      label: '字体大小',
      mapping: 'options.inputValue',
      props: {},
      value: '',
      children: null,
      required: false
    },
    {
      label: '字体大小',
      children: [
        {
          type: 'el-input',
          label: '字体大小123',
          mapping: 'inputValue',
          props: {},
          value: '',
          children: [
            {
              type: 'el-input',
              label: '字体大小123fff',
              mapping: 'inputValue',
              props: {},
              value: '',
              children: null,
              required: false
            },
            {
              type: 'el-input',
              label: '字体大小3456aaaa',
              mapping: 'inputValue',
              props: {},
              value: '',
              children: null,
              required: false
            }
          ],
          required: false
        },
        {
          type: 'el-input',
          label: '字体大小3456',
          mapping: 'inputValue',
          props: {},
          value: '',
          children: null,
          required: false
        }
      ]
    }
  ],

  setupSeinor: {},
  setupData: {},
  setupPosition: {}
}

export default new Widget(Wrap.name, option, true)
