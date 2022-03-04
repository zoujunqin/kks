<script>
const chartOption = {
  title: {
    // text: '',
    textStyle: {
      color: '#fff',
      fontSize: 26
    },
    left: 'center',
    top: '40%'
  },
  angleAxis: {
    max: 100,
    clockwise: true, // 逆时针
    // 隐藏刻度线
    show: false
  },
  radiusAxis: {
    type: 'category',
    show: true,
    axisLabel: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  },
  polar: {
    radius: '120%' //图形大小
  },
  series: [
    {
      stack: '测试',
      type: 'bar',
      // data: [],
      coordinateSystem: 'polar',
      roundCap: true,
      barWidth: 6,
      silent: true,
      itemStyle: {
        normal: {
          opacity: 1,
          color: '#39ffdc',
          borderWidth: 3
        }
      },
      data: [50]
    },
    {
      stack: '测试',
      type: 'bar',
      data: [0.01],
      showBackground: true,
      backgroundStyle: {
        color: '#124d6a'
      },
      coordinateSystem: 'polar',
      roundCap: true,
      barWidth: 6,
      itemStyle: {
        color: '#fff',
        borderWidth: 6,
        borderColor: '#fff',
        shadowColor: '#39ffdc',
        shadowBlur: 8
      }
    }
  ]
}

export default {
  name: 'RingPercent',

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
