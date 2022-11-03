<template>
  <BmOverlay
    @draw="onDraw"
    class="bm-overlay"
    pane="labelPane"
    ref="customOverlay"
    v-show="pInfoWin.show"
  >
  <div class="iw-info-window">
    <a-form labelAlign="left" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="项目名称">
        <p class="iw-info-window-value">{{ pInfoWin.name }}</p>
      </a-form-item>
      <a-form-item label="项目地址">
        <p class="iw-info-window-value">{{ pInfoWin.address }}</p>
      </a-form-item>
      <a-form-item label="项目类别">
        <p class="iw-info-window-value">{{ pInfoWin.type }}</p>
      </a-form-item>
      <a-form-item label="建筑面积">
        <p class="iw-info-window-value">{{ pInfoWin.area }}</p>
      </a-form-item>
      <a-form-item label="负责人">
        <p class="iw-info-window-value">{{ pInfoWin.user }}</p>
      </a-form-item>
    </a-form>
  </div>
  </BmOverlay>
</template>
<script>

import BmOverlay from 'vue-baidu-map/components/overlays/Overlay'

export default {
  name: 'InfoWindow',
  components: {BmOverlay},
  props: {
    // NOTE: 仅在 map 封装时使用复杂结构体传参，便于监听所有参数，普通控件封装还是将参数展开好
    pInfoWin: {
      type: Object,
      default() {
        return {
          name: '标题',
          address: '内容文字',
          type: '',
          area: '',
          user: '',
          show: false,
          pos: {
            align: 'right',  // top, bottom, right
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
      winHeight: 0,
      winWidth: 0,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      }
    }
  },
  mounted() {
    this.updateWinRect()
  },
  methods: {
    updateWinRect() {
      const win = {...this.$refs.win}
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
    onDraw({el, BMap, map}) {
      let pos = {...this.pInfoWin.pos}
      const pixel = map.pointToOverlayPixel(new BMap.Point(pos.lng, pos.lat))
      this.updateWinRect()

      switch(pos.align) {
        case 'top':
          el.style.top = `${pixel.y + pos.yoffset - this.winHeight}px`;
          el.style.left = `${pixel.x - this.winWidth/2 + pos.xoffset}px`
          break;
        case 'bottom':
          el.style.top = `${pixel.y + pos.yoffset}px`;
          el.style.left = `${pixel.x - this.winWidth/2 + pos.xoffset}px`
          break;
        case 'right':
          el.style.left = `${pixel.x + this.winWidth/2 + pos.xoffset}px`
          el.style.top = `${pixel.y + pos.yoffset}px`
          break;
        case 'left':
          el.style.left = `${pixel.x - this.winWidth/2 - pos.xoffset}px`
          el.style.top = `${pixel.y + pos.yoffset}px`
          break;
        default:
          break;
      }
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
.iw-info-window {
  display: flex;
  flex-direction: column;
  width: 367px;
  height: 316px;
  padding: 35px 45px;
  color: #9EAAB7;
  background-color: @white;
  .ant-form-item {
    margin-bottom: 0px;
  }
  .ant-form-item-label > label {
    color: #9EAAB7;
  }
  &-value {
    font-size: @font-size-large;
    color: #24407D;
    width: 181px;
    text-align: left;
    line-height: 1.2;
    display: inline-block;
  }
  &-address {

  }
}
.iw-info-window::after {
  content: '';
  position: absolute;
  top: 20px;
  left: -18px;
  width: 0;
  height: 0;
  border-width: 8px;
  border-style: solid;
  border-color: transparent;
  border-right-width: 10px;
  border-right-color: currentColor;
  color: @white;
}
</style>
