<script>
import echarts from 'echarts'
// import mixin from '@/core/mixin.js'
export default {
  name: 'Echart',

  global: true,

  // mixins: [mixin],

  props: {
    autoUpdate: Boolean,

    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    },

    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null
    }
  },

  computed: {
    styles() {
      return { width: this.width, height: this.height }
    }
  },

  watch: {
    options: {
      handler(options) {
        this.setOption(options)
      },
      deep: true
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      // 初始化echart
      this.chart = echarts.init(this.$refs.chart)

      this.setOption(this.options)
    },
    async setOption(options) {
      await this.$nextTick()
      this.chart.setOption(options || {})
    }
  },

  render() {
    return <div ref="chart" style={this.styles}></div>
  }
}
</script>

<style scoped>
/* #chart {
  width: 200px;
  height: 200px;
} */
</style>
