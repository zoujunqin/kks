import echarts from 'echarts'
export default {
  grid: {
    bottom: '15%',
    top: '35%'
  },
  xAxis: {
    show: false,
    data: [''],
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#fff',
        fontSize: 16
      },
      margin: 30 //刻度标签与轴线之间的距离。
    }
  },
  yAxis: {
    show: false,
    splitLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel: {
      show: false
    }
  },
  series: [
    // 下部分 bar
    {
      name: 'part',
      type: 'bar',
      stack: 'bar',
      label: {
        show: true,
        position: 'inside', //top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
        color: '#FFF',
        fontSize: 20
        // formatter: '{c}' + '%'
      },
      silent: true,
      barWidth: 60,
      data: [50],
      itemStyle: {
        normal: {
          color: function () {
            return new echarts.graphic.LinearGradient(
              1,
              0,
              0,
              0,
              [
                {
                  offset: 0,
                  color: '#2f9f96'
                },
                {
                  offset: 0.15,
                  color: '#2d928a'
                },
                {
                  offset: 0.42,
                  color: '#31a49b'
                },
                {
                  offset: 1,
                  color: '#34b6ac'
                }
              ],
              false
            )
          }
        }
      }
    },
    // 上部分 bar
    {
      name: 'total',
      type: 'bar',
      stack: 'bar',
      silent: true,
      barWidth: 60,
      // barGap: '-100%', // Make series be overlap
      data: [50],
      itemStyle: {
        normal: {
          color: 'rgba(52,182,172,.7)'
        }
      }
    },

    // 上圆片
    {
      type: 'pictorialBar',
      symbolSize: [60, 20],
      symbolOffset: [0, -10],
      itemStyle: {
        normal: {
          color: '#2f9f96'
        }
      },
      z: 2022,
      data: [
        {
          value: 100,
          symbolPosition: 'end'
        }
      ]
    },
    // 中间圆片
    {
      type: 'pictorialBar',
      symbolSize: [60, 20],
      symbolOffset: [0, -10],
      itemStyle: {
        normal: {
          color: '#39c9be'
        }
      },
      z: 2022,
      data: [
        {
          value: 50,
          symbolPosition: 'end'
        }
      ]
    },
    // 底部圆片
    {
      type: 'pictorialBar',
      symbolSize: [60, 20],
      symbolOffset: [0, 10],
      itemStyle: {
        normal: {
          color: function () {
            return new echarts.graphic.LinearGradient(
              1,
              0,
              0,
              0,
              [
                {
                  offset: 0,
                  color: '#2f9f96'
                },
                {
                  offset: 0.15,
                  color: '#2d928a'
                },
                {
                  offset: 0.42,
                  color: '#31a49b'
                },
                {
                  offset: 1,
                  color: '#34b6ac'
                }
              ],
              false
            )
          }
        }
      },
      z: 2022,
      data: [
        {
          value: 1,
          symbolPosition: 'start'
        }
      ]
    }
  ]
}
