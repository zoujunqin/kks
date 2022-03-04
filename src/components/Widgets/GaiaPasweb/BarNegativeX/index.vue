<script>
const chartOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  // legend: {
  //   show: true,
  //   selectedMode: false,
  //   top: 5,
  //   right: 0,
  //   itemWidth: 7,
  //   itemHeight: 7,
  //   textStyle: {
  //     padding: [5, 0, 0, 0]
  //   },
  //   borderRadius: 0,
  //   data: ['上年度', '本年度']
  // },
  grid: [
    { top: 0, bottom: 0, left: '20%', width: '35%', containLabel: true },
    { top: 0, bottom: 18, left: 10, width: 0, containLabel: true },
    { top: 0, bottom: 0, right: '10%', width: '35%', containLabel: true }
  ],
  xAxis: [
    {
      position: 'bottom',
      type: 'value',
      inverse: true,
      axisLabel: { show: true, color: '#fff', margin: 8 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      splitNumber: 2
    },
    {
      gridIndex: 1,
      show: false
    },
    {
      position: 'bottom',
      gridIndex: 2,
      type: 'value',
      axisLabel: { show: true, color: '#fff', margin: 8 },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      splitNumber: 2
    }
  ],
  yAxis: [
    {
      position: 'right',
      axisLabel: { show: false },
      axisLine: { show: false },
      type: 'category',
      inverse: true,
      axisTick: { show: false },
      splitLine: {
        show: false
      },
      data: ['福建', '厦门', '莆田']
    },
    {
      gridIndex: 1,
      type: 'category',
      axisLabel: { show: true, color: '#000', fontSize: 12 },
      axisTick: { show: false },
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      data: ['福建', '厦门', '莆田'],
      inverse: true
    },
    {
      gridIndex: 2,
      position: 'left',
      axisLabel: { show: false },
      axisLine: { show: false },
      type: 'category',
      inverse: true,
      axisTick: { show: false },
      splitLine: {
        show: false
      },
      data: ['福建', '厦门', '莆田']
    }
  ],
  series: [
    {
      type: 'bar',
      name: '上年度',
      label: {
        fontSize: 10,
        color: '#fff',
        lineHeight: 20,
        show: true,
        fontFamily: 'Rubik-Medium',
        distance: 10
      },
      itemStyle: {
        color: '#78b5ff',
        barBorderRadius: [8, 0, 0, 8]
      },
      data: [23, 62, 87],
      barWidth: 20
    },
    {
      type: 'bar',
      name: '本年度',
      label: {
        fontSize: 10,
        color: '#fff',
        lineHeight: 20,
        show: true,
        fontFamily: 'Rubik-Medium',
        distance: 10
      },
      itemStyle: {
        color: '#386ced',
        barBorderRadius: [0, 8, 8, 0]
      },
      data: [84, 17, 90],
      barWidth: 20,
      xAxisIndex: 2,
      yAxisIndex: 2
    }
  ]
}

export default {
  name: 'BarNegativeX',

  props: {
    options: Object
  },

  data() {
    return {
      chartOption
    }
  },

  render() {
    return <Echart options={this.chartOption}></Echart>
  }
}
</script>

<style></style>
