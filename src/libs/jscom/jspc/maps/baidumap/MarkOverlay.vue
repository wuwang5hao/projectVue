<template>
  <BmOverlay
    ref="customMark"
    :class="{'bm-overlay': true, active: pMark.active}"
    pane="floatPane"
    @draw="draw"
  >
    <div
      @click.prevent.stop="OnClicked"
      class='hp-mark'
      :style="{
        'background-image': `url(${bgImg.img})`,
        'width': bgImg.width+'px',
        'height': bgImg.height+'px'
      }"
    >
      <slot></slot>
    </div>
  </BmOverlay>
</template>

<script>
import BmOverlay from 'vue-baidu-map/components/overlays/Overlay'

export default {
  props: {
    pMark: {
      type: Object,
      default() {
        return {
          active: false,
          lng: 0.0,
          lat: 0.0,
        }
      }
    },  // Mark
    pActiveBgImg: {
      type: Object,
      default() {
        return {
          img: '',
          width: 0,
          height: 0,
          xoffset: 0,
          yoffset: 0,
        }
      }
    },  // BgImg
    pInactiveBgImg: {
      type: Object,
      default() {
        return {
          img: '',
          width: 0,
          height: 0,
          xoffset: 0,
          yoffset: 0,
        }
      }
    },  // BgImg
  },
  components: { BmOverlay },
  data() {
    return {
    }
  },
  watch: {
    pMark: {
      handler () {
        this.$refs.customMark.reload()
      },
      deep: true
    }
  },
  computed: {
    bgImg() {
      if (this.pMark.active) {
        return this.pActiveBgImg
      } else {
        return this.pInactiveBgImg
      }
    }
  },
  methods: {
    draw ({el, BMap, map}) {
      const lng = this.pMark.lng, lat = this.pMark.lat;
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))

      el.style.left = pixel.x - this.bgImg.width / 2 + this.bgImg.xoffset + 'px'
      el.style.top = pixel.y - this.bgImg.height / 2 + this.bgImg.yoffset + 'px'
    },
    OnClicked() {
      this.pMark.active = !this.pMark.active
      this.$emit('click', this.pMark.active)
    }
  }
}
</script>

<style>
.bm-overlay {
  text-align: center;
  position: absolute;
  cursor: pointer;
}

  .hp-mark {
  }

</style>
