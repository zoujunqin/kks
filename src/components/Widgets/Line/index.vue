<script>
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
    options: Object,
    inputValue: String
  },

  // watch: {
  //   inputValue() {
  //     console.log('inputValue')
  //   }
  // },

  data() {
    return {
      chartOption
    }
  },

  render() {
    return (
      <Echart options={this.chartOption} width="200px" height="200px"></Echart>
    )
  }
}
</script>

<style></style>
