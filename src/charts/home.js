import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/graphic'
import 'echarts/lib/component/tooltip'
import echarts from 'echarts/lib/echarts'

/**
 * @desc 返回入住企业 chart 配置
 * @returns {{}}
 */
export function getCompanyOption(title, value, total, colorIdx) {
  let colorArr = [
    [['#526FE5', '#5F9AE7'], '#F6F7FA'],
    [['#23C9D4', '#7EDAE6'], '#F6F7FA'],
    [['#F3B853', '#FCC972'], '#F6F7FA'],

    [['#70CC80', '#95DB6B'], '#F6F7FA'],
    [['#6B53E5', '#A290FB'], '#F6F7FA'],
    [['#C2C9CD', '#E4E4E4'], '#F6F7FA'],
  ]
  let color = colorArr[colorIdx]
  let color0 = new echarts.graphic.LinearGradient(
    0, 0, 0, 1,
    [
      {offset: 0, color: color[0][0]},
      {offset: 1, color: color[0][1]}
    ]
  )
  let color1 = new echarts.graphic.LinearGradient(
    0, 0, 0, 1,
    [
      { offset: 0, color: color[1] },
      { offset: 1, color: color[1] }
    ]
  )
  return {
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '30px',
        style: {
          text: `${value}`,
          fill: '#1E222B',
          fontSize: 18,
          fontWeight: 'bold',
          fontFamily: 'DINAlternate-Bold,DINAlternate',
        }
      },
      {
        type: 'text',
        left: 'center',
        top: '48px',
        style: {
          text: '家',
          fill: '#92A2B6',
          fontSize: 10,
          fontFamily: 'SourceHanSansCN-Regular,SourceHanSansCN',
        }
      }
    ],
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false, //改为 true 即可解决重叠问题
        hoverAnimation: false,  // false去掉鼠标悬停动画
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: value, name: title,
            itemStyle: {
              color: color0,
            }
          },
          {
            value: total - value, name: '其他',
            itemStyle: {
              color: color1
            }
          },
        ]
      }
    ]
  }
}

function createPieData(name, value, colorIndex) {
  let colorArr = [
    [{offset: 0, color: '#23C9D4'}, {offset: 1, color: '#6DCDDA'}],
    [{offset: 0, color: '#526FE5'}, {offset: 1, color: '#5F9AE7'}],
    [{offset: 0, color: '#6B53E5'}, {offset: 1, color: '#A593FC'}],
    [{offset: 0, color: '#70CC80'}, {offset: 1, color: '#95DB6B'}],
    [{offset: 0, color: '#F3B853'}, {offset: 1, color: '#FCC972'}],
    [{offset: 0, color: '#C2C9CD'}, {offset: 0.5, color: '#DEE2E5'}, {offset: 1, color: '#E4E4E4'}],
  ]

  return {
    value: value,
    name: name,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(
        0, 0, 0, 1,  // 渐变起止位置 右，下，左，上
        colorArr[colorIndex % colorArr.length]
      )
    }
  }
}

/**
 * @desc 返回软件销售 chart 配置
 * @param values [{name, value}]
 * @returns Object
 */
export function getSwSaleOption(values, total) {
  // values.sort((a, b) => { return a.value - b.value })
  let firstValue = total || values[0].value
  let data = Array.from(values, (item, index) => {
    return createPieData(item.name, item.value, index)
  })
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: '#FFFFFF',
      // borderColor: '#FFFFFF',
      borderWidth: 0,
      borderRadius: 2,
      padding: [0, 0, 0, 0],
      position: (pos, params, dom, rect, size) => {
        let dotColor = params.color.colorStops ? params.color.colorStops[0].color : params.color
        if (params.componentType === 'series') {
          let html = `
<div style="
width:120px;
background-color: #FFFFFF;
border-radius:2px;
opacity:1;
box-shadow:0px 2px 4px 0px rgba(0,0,0,0.15);
border:0.2px solid #F1F1F1;
color: red;
padding-top: 12px;
padding-left: 12px;
padding-bottom: 12px;
z-index: 101;

">
<div style="display: flex; align-items: flex-start;">
    <div style="
margin-top: 4px;
width:6px;
height:6px;
border-radius:50%;
margin-right:4px;
background: linear-gradient(45deg,${dotColor} 0%,${dotColor} 100%);
box-shadow:0px 6px 36px -8px rgba(97,159,230,0.5);
">
    </div>
    <span style="
    white-space: normal;
    width:120px;
font-size:12px;
font-family:SourceHanSansCN-Regular,SourceHanSansCN;
font-weight:400;
color:rgba(101,115,134,1);
line-height: 17px;
">${params.data.name}
    </span>
</div>
    <div>
        <span style="
font-size:20px;
font-family:DINAlternate-Bold,DINAlternate;
font-weight:bold;
color:rgba(30,34,43,1);
line-height:20px;
padding-left:10px;
        ">${params.data.value}</span>
        <span style="
font-size:12px;
font-family:SourceHanSansCN-Regular,SourceHanSansCN;
font-weight:400;
color:rgba(146,162,182,1);
line-height:22px;
">
        项</span>
    </div>
</div>`
          dom.innerHTML = html
          return pos;
        } else {
          return pos
        }
      },
    },
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '45%',
        style: {
          text: `${firstValue}`,
          fill: '#1E222B',
          fontSize: 26,
          fontWeight: 'bold',
          fontFamily: 'DINAlternate-Bold,DINAlternate',
        }
      },
      {
        type: 'text',
        left: 'center',
        top: '55%',
        style: {
          text: '项',
          fill: '#92A2B6',
          fontSize: 12,
          fontFamily: 'SourceHanSansCN-Regular,SourceHanSansCN',
        }
      }
    ],
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['50%', '70%'],
        // roseType: 'area',
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          },
          align: 'left',
          formatter: '{num|{c}}{unit|项}\n{label|● {b}}',
          backgroundColor: 'transparent',
          borderColor: '#F1F1F1',
          borderWidth: 0.2,
          borderRadius: 2,
          position: 'outer',
          alignTo: 'labelLine',
          distanceToLabelLine: 5,
          rich: {
            label: {
              fontSize: 12,
              // lineHeight: 50,
              align: 'left',
              padding: [0, 0, 10, 0],
            },
            num: {
              fontSize: 20,
              color: '#1E222B',
              fontWeight: 'bold',
              padding: [0, 5, 0, 0],
              align: 'left',
            },
            unit: {
              fontSize: 12,
              color: '#92A2B6',
              align: 'left',
            },
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ],
    onMouseOver: (params, options) => {
      if (!params.data) return
      options.graphic[0].style.text = `${params.data.value}`
    }
  }
}


/**
 * @desc 返回待办事项 chart 配置
 * @returns {}
 */
export function getTodoOption(value, total) {
  let color0 = {
    type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
    colorStops: [{
      offset: 0, color: '#23C9D4'
    }, {
      offset: 1, color: '#7EDAE6'
    }],
  }
  let color1 = {
    type: 'linear',
    x: 0, y: 0, x2: 0, y2: 1,
    colorStops: [{
      offset: 0, color: '#F3B853'
    }, {
      offset: 1, color: '#FCC972'
    }],
  }
  // 保留四位有效小数
  let percent = total !== 0 ? Math.round(value / total * 10000)/10000 : 0
  let colorTemplate1 = [[percent, color0], [1, color1]]
  let option = {
    tooltip: {              // 本系列特定的 tooltip 设定。
      show: false,
    },

    series: [
      {
        name: "单仪表盘示例",     // 系列名称,用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
        type: "gauge",          // 系列类型
        radius: "80%",          // 参数:number, string。 仪表盘半径,默认 75% ，可以是相对于容器高宽中较小的一项的一半的百分比，也可以是绝对的数值。
        center: ["40%", "44%"], // 仪表盘位置(圆心坐标)
        startAngle: 180,        // 仪表盘起始角度,默认 225。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
        endAngle: 0,          // 仪表盘结束角度,默认 -45
        clockwise: true,        // 仪表盘刻度是否是顺时针增长,默认 true。
        min: 0,                 // 最小的数据值,默认 0 。映射到 minAngle。
        max: 100,               // 最大的数据值,默认 100 。映射到 maxAngle。
        splitNumber: 10,        // 仪表盘刻度的分割段数,默认 10。

        axisLine: {             // 仪表盘轴线(轮廓线)相关配置。
          show: true,             // 是否显示仪表盘轴线(轮廓线),默认 true。
          lineStyle: {            // 仪表盘轴线样式。
            color: colorTemplate1,  //仪表盘的轴线可以被分成不同颜色的多段。
            width: 10,                  //轴线宽度,默认 30。
          }
        },

        grid: {
          left: 30,
          right: 0
        },

        splitLine: {            // 分隔线样式。
          show: false,             // 是否显示分隔线,默认 true。
        },

        axisTick: {             // 刻度(线)样式。
          show: false,             // 是否显示刻度(线),默认 true。
        },

        axisLabel: {            // 刻度标签。
          show: false,             // 是否显示标签,默认 true。
        },

        pointer: {              // 仪表盘指针。
          show: true,             // 是否显示指针,默认 true。
          length: "60%",          // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
          width: 4,               // 指针宽度,默认 8。
        },

        itemStyle: {            // 仪表盘指针样式。
          color: "#1E222B",          // 指针颜色，默认(auto)取数值所在的区间的颜色
        },

        title: {                // 仪表盘标题。
          show: false,             // 是否显示标题,默认 true。
        },

        detail: {               // 仪表盘详情，用于显示数据。(仪表盘的数值字体样式和显示位置)
          show: false,             // 是否显示详情,默认 true。
        },

        data: [{
          name: "安全度",
          value: percent*100,
        }]
      }
    ]
  }
  return option
}

/**
 * @desc 返回状态 chart 配置
 * @param {Array} values - 饼图的数据列表
 * @param {Number} colorIndex - 饼图的配色方案
 * @returns {{}}
 */
export function getStatusOptions(values, colorIdx, fontSize=18) {
  let colorArr = [
    [['#526FE5', '#5F9AE7'], '#F6F7FA'],
    [['#23C9D4', '#7EDAE6'], '#F6F7FA']
  ]
  let color = colorArr[colorIdx]
  let color0 = new echarts.graphic.LinearGradient(
    0, 0, 0, 1,
    [
      {offset: 0, color: color[0][0]},
      {offset: 1, color: color[0][1]}
    ]
  )
  return {
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '80px',
        style: {
          text: `${values[0]}`,
          fill: '#1E222B',
          fontSize: fontSize,
          fontWeight: 'bold',
          fontFamily: 'DINAlternate-Bold,DINAlternate',
        }
      },
      {
        type: 'text',
        left: 'center',
        top: '100px',
        style: {
          text: '个',
          fill: '#92A2B6',
          fontSize: 10,
          fontFamily: 'SourceHanSansCN-Regular,SourceHanSansCN',
        }
      }
    ],
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        hoverAnimation: false,  // 去掉鼠标悬停动画
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        label: {
          normal: {
            show: false,
          },
          emphasis: {
            show: false,
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          {
            value: values[0],
            name: '',
            itemStyle: {
              color: color0,
            }
          },
          {
            value: values[1],
            name: '',
            itemStyle: {
              color: color[1]
            }
          },
        ]
      }
    ]
  }
}


/**
 * @desc 返回客户活跃度 chart 配置
 * @param {String} title - 图表标题
 * @param {Array} datas - 折线图的数据列表
 * @returns {{}}
 */
export function getCustomOptions(title, data) {
  return {
    title: {
      text: title,
      textStyle: {
        color: '#DEE2EE',
        fontSize: 18,
        fontWeight: 'normal'
      }
    },
    grid: {
      left: 30,
      right: 0
    },
    textStyle: {
      color: '#6776A1',
      fontSize: '12px'
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#DEE2EE',
          opacity: '0.2'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: '#DEE2EE',
          opacity: '0.2'
        }
      },
      axisTick: {
        show: false
      }
    },
    series: [{
      data: data,
      type: 'line',
      smooth: true,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,  // 渐变起止位置 右，下，左，上
          [
            {offset: 0, color: '#9BEBF0'},
            {offset: 1, color: '#18A2B3'}
          ]
        )
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [
            {offset: 1, color: '#36D0DB00'},
            {offset: 0, color: '#19A3B433'}
          ]
        )
      },
    }]
  }
}
