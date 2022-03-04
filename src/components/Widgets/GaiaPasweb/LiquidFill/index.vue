<script>
const chartOption = {
  series: [
    {
      type: 'liquidFill',
      radius: '50%',
      // 水球颜色
      color: ['#28b2b6'],
      label: {
        normal: {
          textStyle: {
            color: '#fff',
            insideColor: '#fff',
            fontSize: 26
          }
        }
      },
      itemStyle: {
        opacity: 0.5, //波浪的透明度
        shadowBlur: 10, //波浪的阴影范围
        shadowColor: '#072F3A' //阴影颜色
      },
      outline: {
        show: true, //是否显示轮廓 布尔值
        borderDistance: 0, //外部轮廓与图表的距离 数字
        itemStyle: {
          borderColor: '#28b2b6', //边框的颜色
          borderWidth: 1 //边框的宽度
          //shadowBlur: 5 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
          //shadowColor: '#000' //外部轮廓的阴影颜色
        }
      },
      emphasis: {
        itemStyle: {
          opacity: 1 //鼠标经过波浪颜色的透明度
        }
      },

      data: [0.6, 0.6244, 0.5804, 0.5604, 0.5514],
      amplitude: 4, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
      waveLength: '50%', //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
      backgroundStyle: {
        borderWidth: 2,
        borderColor: '#28b2b6',
        color: 'transparent'
      },
      direction: 'left', //波移动的速度 两个参数  left 从右往左 right 从左往右
      waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
      animationEasing: 'linear', //初始动画
      animationEasingUpdate: 'quarticInOut', //数据更新的动画效果
      animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
      animationDurationUpdate: 300 //数据更新动画的时长
    }
  ]
}

export default {
  name: 'LiquidFill',

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
