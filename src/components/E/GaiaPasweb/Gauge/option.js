export default {
  tooltip: {
    show: false
  },
  series: [
    {
      name: '内部进度条',
      type: 'gauge',
      radius: '100%',
      splitNumber: 1,
      startAngle: 180,
      endAngle: 0,
      axisLine: {
        lineStyle: {
          color: [
            [0, '#18C1FE'],
            [0.5, '#8368FF'],
            [1, '#A64FF7']
          ],
          width: 4
        }
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      itemStyle: {
        show: false
      },
      markPoint: {
        //指针中心加一个小白点
        symbol: 'circle',
        symbolSize: 4,
        data: [
          //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
          {
            x: 'center',
            y: 'center',
            itemStyle: {
              color: '#062358'
            }
          }
        ]
      },
      title: {
        //标题
        show: false,
        offsetCenter: [0, 46], // x, y，单位px
        textStyle: {
          color: '#fff',
          fontSize: 14, //表盘上的标题文字大小
          fontWeight: 400,
          fontFamily: 'PingFangSC'
        }
      },
      data: [
        {
          show: false,
          value: 50
        }
      ],
      detail: {
        show: false
      },
      pointer: {
        show: true,
        length: '40%',
        radius: '20%',
        width: 5 //指针粗细
      },
      animationDuration: 4000
    },
    {
      name: '外部刻度',
      type: 'gauge',
      // 大小
      radius: '75%',
      min: 0, //最小刻度
      max: 100, //最大刻度
      splitNumber: 5, //刻度数量
      startAngle: 180,
      endAngle: 0,
      axisLine: {
        show: false,
        lineStyle: {
          width: 1,
          color: [[1, 'rgba(0,0,0,0)']]
        }
      },
      // 数字
      axisLabel: {
        show: true,
        color: '#87a7ff',
        // 轴线出来的位置
        distance: 5,
        formatter: function (v) {
          switch (v + '') {
            case '0':
              return '0'
            case '20':
              return '20'
            case '40':
              return '40'
            case '60':
              return '60'
            case '80':
              return '80'
            case '100':
              return '100'
          }
        }
      },
      // 每一条细小的刻度标签。
      axisTick: {
        show: true,
        splitNumber: 10,
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#18C1FE' // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: '#8368FF' // 50% 处的颜色
              },
              {
                offset: 1,
                color: '#A64FF7' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          },
          width: 1
        },
        length: -5
      },
      // 里面间隔长出来的刻度样式
      splitLine: {
        show: true,
        length: 5,
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#18C1FE' // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: '#8368FF' // 50% 处的颜色
              },
              {
                offset: 1,
                color: '#A64FF7' // 100% 处的颜色
              }
            ],
            global: false // 缺省为 false
          }
        }
      }, //分隔线样式
      detail: {
        show: false
      },
      pointer: {
        show: false
      }
    },
    // 进度圈
    {
      type: 'pie',
      clockWise: true,
      radius: ['95%', '90%'],
      hoverAnimation: false, //关闭 hover 在扇区上的放大动画效果
      startAngle: 180, //起始角度
      labelLine: {
        show: false
      },
      data: [
        {
          value: 50,
          itemStyle: {
            normal: {
              borderWidth: 10,
              borderColor: {
                colorStops: [
                  {
                    offset: 0,
                    color: '#18C1FE' // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: '#8368FF' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#A64FF7' // 100% 处的颜色
                  }
                ]
              },
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          }
        },
        {
          name: 'gap',
          value: 50,
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              color: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)',
              borderWidth: 0
            }
          }
        }
      ]
    }
  ]
}
