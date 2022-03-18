<script>
import { setupTransform } from '@/utils/widgets'
const chartOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}

export default {
  name: 'ChartLine',

  props: {
    value: Object
  },

  watch: {
    value: {
      handler() {
        // console.log(this.value)
        const { setupStyle, setupDataSource } = setupTransform(
          this.value,
          'children'
        )
        console.log(setupStyle)
        // console.log(setupDataSource)
        this.styles = setupStyle
        this.dataSource = setupDataSource
      },
      deep: true
    }
  },

  data() {
    return {
      chartOption,
      styles: {},
      dataSource: {}
    }
  },

  render() {
    return (
      <Echart
        draggable
        options={this.chartOption}
        style={this.styles}
        width="200px"
        height="200px"
      ></Echart>
    )
  }
}
</script>

<style></style>
