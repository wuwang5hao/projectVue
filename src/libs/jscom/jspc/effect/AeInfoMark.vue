<template>
  <div>
    <div
      :style="{
        position: 'absolute',
        left: axisToPx(pMarkSpec.left),
        top: axisToPx(pMarkSpec.top),
        width: axisToPx(pMarkSpec.width),
        height: axisToPx(pMarkSpec.height),
        'background-image': `url('${pMarkSpec.bgImg}')`,
        opacity: 0,
      }"
      ref="mark"
    >
    </div>
    <div
      v-for="(line, index) in pLineSpec.lines"
      :key="index"
      :ref="`lines`"
      :style="{
        position: 'absolute',
        width: debugInitWidth(line),
        height: axisToPx(line.width),
        'background-color': line.color,
        left: axisToPx(line.x0),
        top: axisToPx(line.y0),
        'transform-origin': 'top left',
        'transform': `rotate(${calcLineDeg(line)}deg)`,
    }">

    </div>
    <div
      :style="{
        position: 'absolute',
        top: axisToPx(pInfoSpec.top),
        left: axisToPx(pInfoSpec.left),
        width: axisToPx(pInfoSpec.width),
        height: axisToPx(pInfoSpec.height),
        display: 'flex',
      }"
    >
      <canvas
        :style="{
          width: axisToPx(pInfoSpec.width),
          height: '0px',
          margin: 'auto 0',
          'background-image': `url('${pInfoSpec.bgImg}')`,
          'background-size': '100% 100%',
          overflow: 'hidden',
          display: 'flex',
          'flex-direction': 'column',
          'justify-content': 'space-around',
        }"
        ref="infoWrap"
      >
        <slot name="info"></slot>
      </canvas>
    </div>
  </div>
</template>
<script>
import { TimelineLite, TweenLite } from 'gsap'
import { AeTimeline } from './AeTimeline'

export default {
  name: 'AeInfoMark',
  props: {
    pDisableTimeline: {type: Boolean, default: false},
    pMarkSpec: {
      type: Object,
      default() {
        return {
          top: 30,
          left: 30,
          width: 50,
          height: 50,
          bgImg: this.$mock.image('50x50'),
          opacity: 0,
          setupTimeline: (timeline, mark) => {
            timeline.addLabel('mark0', 0)
              .to(mark, 0.13, {opacity: 1})
              .to(mark, 0.9, {opacity: 0})
              .to(mark, 0.16, {opacity: 1})
          }
        }
      }
    },
    pLineSpec: {
      type: Object,
      default() {
        return {
          lines: [
            {
              x0: 55, y0: 80, x1: 55, y1: 300, color: 'red', width: 1, showLength: 0,
              setupTimeline: (timeline, line, length) => {
                timeline.to(line, 0.05, {showLength: length}, 'mark0+1.19')
              }
            },
            {
              x0: 55, y0: 300, x1: 200, y1: 300, color: '#4ed1f0', width: 1, showLength: 0,
              setupTimeline: (timeline, line, length) => {
                timeline.to(line, 0.83, {showLength: length})
              }
            },
          ],
        }
      }
    },
    pInfoSpec: {
      default() {
        return {
          left: 200,
          top: 200,
          width: 328,
          height: 216,
          bgImg: this.$mock.image('328x216'),
          actions: [
            {
              height: 0,
              setupTimeline: (timeline, action, infoSpec) => {
                timeline.to(action, 0.17, {height: infoSpec.height}, 'mark0+2.10')
              },
              draw: (ctx, action, canvas) => {
                canvas.style.height = parseInt(action.height) + 'px'
              }
            },
            {
              number: 0,
              numberTo: 5,
              setupTimeline: (timeline, action) => {
                timeline.to(action, 2, {number: action.numberTo})
              },
              draw: (ctx, action, canvas) => {
                ctx.fontSize = '18px'
                ctx.fontFamily = 'PingFangSC-Regular,PingFang SC'
                ctx.fontWeight = '400'
                // ctx.fillStyle = 'rgba(222,226,238,1)'
                ctx.fillText(`标题${action.number.toFixed(2)}`, 160, 20)
              },
            }
          ]
        }
      }
    },
  },
  watch: {
    pMarkSpec: {
      handler(val) {
        this.flushMark()
      },
      deep: true
    },
    pLineSpec: {
      handler (val) {
        this.flushLine()
      },
      deep: true
    },
    pInfoSpec: {
      handler (val) {
        this.flushCanvas()
      },
      deep: true
    },
  },
  data() {
    return {
      debug: false,
    }
  },
  created() {
  },
  mounted() {
    if (!this.pDisableTimeline) {
      this.timeline = new AeTimeline()
      this.timeline.addInfoMark({
        markSpec: this.pMarkSpec,
        lineSpec: this.pLineSpec,
        infoSpec: this.pInfoSpec,
      })
      // 可以与 MP4 播放时间轴同步
      this.timeline.play()
    }
  },
  methods: {
    flushMark() {
      // console.log('flushMark')
      this.$refs.mark.style.opacity = this.pMarkSpec.opacity
    },
    flushLine() {
      // console.log('flushLine')
      for (let [index, line] of this.pLineSpec.lines.entries()) {
        // console.log(`flushLineItem showLength ${line.showLength}`)
        this.$refs.lines[index].style['width'] = line.showLength + 'px'
        // this.$refs.lines[index].style['transition'] = `all ${line.duration/1000}s 0s`
      }
    },
    flushCanvas() {
      // console.log('flushCanvas')
      let canvas = this.$refs.infoWrap

      let ctx = canvas.getContext('2d')
      // NOTE: 下方设置 width height 解决绘制时的锯齿和模糊问题
      canvas.width = this.pInfoSpec.width
      canvas.height = this.pInfoSpec.height

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let action of this.pInfoSpec.actions) {
        action.draw(ctx, action, canvas)
      }
    },
    debugInitWidth(line) {
      if (!this.debug) {
        return '0px'
      } else {
        let result = this.calcLineLength(line)
        result = parseInt(result)+'px'
        return result
      }
    },
    calcLineDeg(line) {
      return 90 - Math.atan2(line.x1 - line.x0, line.y1 - line.y0) * 180 / (Math.PI)
    },
    calcLineLength(line) {
      return Math.sqrt(Math.pow(line.x0 - line.x1, 2) + Math.pow(line.y0 - line.y1, 2))
    },
    axisToPx(axis) {
      axis += ''
      if (!axis.endsWith('px')) {
        axis += 'px'
      }
      return axis
    }
  }

}
</script>
