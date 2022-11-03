<template>
  <BmOverlay
    @draw="onDraw"
    class="bm-overlay"
    pane="labelPane"
    ref="customOverlay"
    v-show="pInfoWin.show"
  >
    <div ref="win" class="bm-info-window" :style="{background: 'url('+ pInfoWin.bgImg +')'}">
      <p class="bm-info-window-title"> {{ pInfoWin.title }}</p>
      <div class="bm-info-window-content">
        <img v-if="pInfoWin.img" class="bm-info-window-img" :src="pInfoWin.img" />
        <div :style="{width: '100%'}">
          <ellipsis
            class="bm-info-window-text"
            :text="pInfoWin.text"
            :line-num="5"
            tagName="p"
            fontWeight="normal"
            fontSize="14px"
            :left="left"
            :leftRender="leftRender"
            :isImmediate="false"
          />
        </div>
      </div>
    </div>
  </BmOverlay>
</template>
<script>

import BmOverlay from 'vue-baidu-map/components/overlays/Overlay'
import Ellipsis from "jscom/widgets/ellipsis/index"

export default {
  name: 'InfoWinOverlay',
  components: {BmOverlay, Ellipsis},
  props: {
    // NOTE: 仅在 map 封装时使用复杂结构体传参，便于监听所有参数，普通控件封装还是将参数展开好
    pInfoWin: {
      type: Object,
      default() {
        return {
          title: '标题',
          img: '',
          text: '内容文字',
          show: false,
          pos: {
            align: 'top',  // top, bottom
            lng: 0,
            lat: 0,
            xoffset: 0,
            yoffset: 0,
          }
        }
      }
    }
  },
  watch: {
    pInfoWin: {
      handler () {
        this.reload()
      },
      deep: true
    },
  },
  data() {
    return {
      left: '<span class="bm-info-window-btn">...' + this.$t('more') + '</span>',
      winHeight: 0,
      winWidth: 0,
    }
  },
  mounted() {
    this.updateWinRect()
  },
  methods: {
    updateWinRect() {
      let win = this.$refs.win
      if (win.offsetHeight) {
        this.winHeight = win.offsetHeight
      }
      if (win.offsetWidth) {
        this.winWidth = win.offsetWidth
      }
    },
    reload() {
      this.$refs.customOverlay.reload()
    },
    leftRender(h, params) {
      return h('span', {
        props: {
          'class': 'bm-info-window-btn'
        },
        on: {
          'click': () => { this.$emit('moreClick') }
        }
      }, '...' + this.$t('more'))
    },
    onDraw({el, BMap, map}) {
      let pos = this.pInfoWin.pos
      const pixel = map.pointToOverlayPixel(new BMap.Point(pos.lng, pos.lat))
      this.updateWinRect()

      switch(pos.align) {
        case 'top':
          el.style.top = pixel.y + pos.yoffset - this.winHeight + "px";
          break;
        case 'bottom':
          el.style.top = pixel.y + pos.yoffset + "px";
          break;
      }

      el.style.left = pixel.x - this.winWidth/2 + pos.xoffset + 'px'
      // console.log(`${pos.lng}, ${pos.lat}`)
      // console.log(`${this.winWidth} ${this.winHeight}`)
      // console.log(`--> top ${el.style.top} left ${el.style.left}`)
    },
  }
}

</script>
<style lang="less">
  @import 'variables.less';
  .bm-overlay {
    text-align: center;
    position: absolute;
    cursor: pointer;
  }

  .bm-info-window {
    display: flex;
    flex-direction: column;
    width: 505px;
    height: 295px;
    padding: 26px;
    color: @text-color;
    &-title {
      font-size: @larger-font-size;
      width: 100%;
      text-align: center;
      line-height: 50px;
    }
    &-content {
      text-align: left;
      display: flex;
      padding: 20px 20px 30px 20px;
    }
    &-img {
      position: relative;
      width: 133px;
      height: 133px;
      margin-right: 16px;
    }
    &-text {
      font-size: @base-font-size;
      line-height: 20px;
      height: 100px;
    }
    &-btn {
      color: @text-color-light;
    }
  }
</style>
