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

    option: {
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
    option: {
      handler(option) {
        this.setOption(option)
      },
      deep: true
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      console.log(this.$el)
      // 初始化echart
      this.chart = echarts.init(this.$refs.chart)

      this.setOption(this.option)
    },
    async setOption(option) {
      await this.$nextTick()
      this.chart.setOption(option || {})
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
