export default {
  colors: ['#39ffdc', '#009cff', '#7942f2'],
  title: {
    text: '人员构成',
    left: 'center',
    top: '45%',
    textStyle: {
      color: '#ffffff',
      fontSize: 18
    }
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    show: false
    // top: '5%',
    // left: 'center',
    // formatter: function(name) {
    //   return `<span style="color: red">${name}</span>`
    // }
  },
  series: [
    {
      name: '人员构成',
      type: 'pie',
      radius: ['60%', '90%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: false
          // fontSize: '40',
          // fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        {
          name: '一级建造师',
          value: 25227,
          percent: '22.40%'
        },
        {
          name: '二级建造师',
          value: 75473,
          percent: '67.00%'
        },
        {
          name: '其他师种注册人员',
          value: 11873,
          percent: '10.50%'
        }
      ]
    }
  ]
}
