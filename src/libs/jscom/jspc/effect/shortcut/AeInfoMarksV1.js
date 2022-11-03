export class AeInfoMarksV1 {
  /*
  step0: mark 闪烁
  step1: 然后 lines 按顺序出现中间没有帧空隙
  step2: 最后 info window 弹出
  step4: 弹出后文字在 window 上渲染

  label: '',  // label 必须唯一
  start: 0, // 开始时间，绝对时间
  mark: {
    top, left, width, height, bgImg, duration
  },
  line: {
    color, width, duration,
    lines: [[x, y], [x, y], ...]
  },
  info: {
    top, left, width, height, bgImg, duration, numberDuration,
    texts: [
      {
        size, family, weight, color, align: 'left',
        axis: [{x, y, text}, ...]
      }, ...
    ],
    numbers: [
      {
        size, family, weight, color, align: 'right',
        axis: [{x, y, num, fixed}, ...]
      }, ...
    ],
  }
   */
  constructor() {
    this.data = []
  }

  calcLineLength(line) {
    return Math.sqrt(Math.pow(line.x0 - line.x1, 2) + Math.pow(line.y0 - line.y1, 2))
  }

  pushInfoMark({label, start, mark, line, info}) {
    let markSubDuration = mark.duration / 3
    let lineLength = 0
    let lines = []
    let preLine = null
    for (let idx=0; idx < line.lines.length - 1; idx++) {
      let curPoint = line.lines[idx]
      let nextPoint = line.lines[idx+1]
      let subLine = {x0: curPoint[0], y0: curPoint[1], x1: nextPoint[0], y1: nextPoint[1]}
      if (preLine) {
        // 竖线然后向左 corner 找平
        if (preLine.x0 === preLine.x1) {  // preLine 竖线
          if (preLine.y0 > preLine.y1) {  // preLine 向上
            if (subLine.x0 > subLine.x1) {  // 向左
              subLine.x0 += 2
            }
          } else {  // preLine 向下
            if (subLine.x0 < subLine.x1) { // 向左
              subLine.x0 -= 2
            }
          }
        }
        // 横线然后向左 corner 找平
        if (preLine.y0 === preLine.y1) {  // preLine 横线
          if (preLine.x0 > preLine.x1) {  // preLine 向左
            if (subLine.y0 < subLine.y1) {  // 向左 （下）
              subLine.y0 -= 2
            }
          } else {  // preLine 向右
            if (subLine.y0 > subLine.y1) { // 向左 （上）
              subLine.y0 += 2
            }
          }
        }
      }
      preLine = subLine
      lineLength += this.calcLineLength(subLine)
      lines.push(subLine)
    }

    let lineUnit = line.duration / lineLength

    let infoActions = [
      {
        height: 0,
        setupTimeline: (timeline, action, infoSpec) => {
          timeline.to(action, info.duration, {height: infoSpec.height}).addLabel(`${label}-info`)
        },
        draw: (ctx, action, canvas) => {
          canvas.style.height = parseInt(action.height) + 'px'
        }
      },
    ]

    // fill info texts
    for (let textSpec of info.texts) {
      for (let item of textSpec.axis) {
        infoActions.push(
          {
            draw: (ctx, action, canvas) => {
              // console.log(`draw text ${item.text} ${textSpec.size}px ${textSpec.family} ${textSpec.weight}`)
              ctx.font = `${textSpec.size}px ${textSpec.family} ${textSpec.weight}`
              ctx.textAlign = textSpec.align || 'start'
              ctx.textBaseline = 'top'
              ctx.fillStyle = textSpec.color
              ctx.fillText(item.text, item.x, item.y)
            }
          }
        )
      }
    }

    // fill info numbers
    for (let numberSpec of info.numbers) {
      let numberStyle = numberSpec.numberStyle
      let unitStyle = numberSpec.unitStyle
      for (let item of numberSpec.axis) {
        infoActions.push(
          {
            number: item.fromNum || 0,
            numberTo: item.num,
            setupTimeline: (timeline, action) => {
              if (typeof item.num !== 'string') {
                timeline.to(action, info.numberDuration || 1, {number: action.numberTo}, `${label}-info`)
              }
            },
            draw: (ctx, action, canvas) => {
              ctx.font = `${numberStyle.size}px ${numberStyle.family} ${numberStyle.weight}`
              ctx.textAlign = numberStyle.align || 'start'
              ctx.textBaseline = 'top'
              ctx.fillStyle = numberStyle.color
              // console.log(`draw number ${action.number} ${item.x} ${item.y}`)
              let numStr = ''
              if (typeof item.num !== 'string') {
                numStr = action.number.toFixed(item.fixed === undefined ? 2 : item.fixed)
              } else {
                numStr = item.num
              }
              ctx.fillText(numStr, item.x, item.y)

              // calc unit top left
              let finalNumStr = ''
              if (typeof item.num !== 'string') {
                finalNumStr = item.num.toFixed(item.fixed === undefined ? 2: item.fixed)
              } else {
                finalNumStr = item.num
              }

              let numRect = ctx.measureText(finalNumStr)
              let unitTop = item.y + numberStyle.size - unitStyle.size - 2
              let unitLeft = item.x + numRect.width + (unitStyle.marginLeft || 4)

              // draw unit
              ctx.font = `${unitStyle.size}px ${unitStyle.family} ${unitStyle.weight}`
              ctx.textAlign = unitStyle.align || 'start'
              ctx.textBaseline = 'top'
              ctx.fillStyle = unitStyle.color

              if (item.unit) {
                // console.log(`draw unit ${unitLeft} ${unitTop}`)
                ctx.fillText(item.unit, unitLeft, unitTop)
              }
            },
          }
        )
      }
    }

    let aeInfoMark = {
      markSpec: {
        top: mark.top,
        left: mark.left,
        width: mark.width,
        height: mark.height,
        bgImg: mark.bgImg,
        opacity: 0,
        setupTimeline: (timeline, mark) => {
          timeline.addLabel(label, start)
            .to(mark, markSubDuration, {opacity: 1}, label)
            .to(mark, markSubDuration, {opacity: 0})
            .to(mark, markSubDuration, {opacity: 1})
        }
      },
      lineSpec: {
        lines: Array.from(lines, (item, index) => {
          let lineLen = this.calcLineLength(item)
          let lineSubDuration = lineLen * lineUnit

          return {
            x0: item.x0,
            y0: item.y0,
            x1: item.x1,
            y1: item.y1,
            color: line.color || '#4ed1f0',
            width: line.width || 2,
            showLength: 0,
            setupTimeline: (timeline, line, length) => {
              timeline.to(line, lineSubDuration, {showLength: length})
            }
          }
        }),
      },
      infoSpec: {
        left: info.left,
        top: info.top,
        width: info.width,
        height: info.height,
        bgImg: info.bgImg,
        actions: infoActions,
      }
    }
    this.data.push(aeInfoMark)
  }
}
