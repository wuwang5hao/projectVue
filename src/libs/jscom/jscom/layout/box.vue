<template>
  <!-- display flex-direction align-items 控制 box 父容器 -->
  <!-- flex-basis flex-grow flex-shrink 控制 flex 子容器 -->
  <div :style="{
    'display': 'flex',
    'flex-direction': this.flexDirection,
    'align-items': this.alignItems,
    'justify-content': this.justifyContent,

    'flex-basis': this.flexBasis,
    'flex-grow': this.flexGrow,
    'flex-shrink': this.flexShrink,
    'align-self': this.alignSelf,

    width: this.boxWidth,
    height: this.boxHeight,
    padding: this.boxPadding,
    margin: this.boxMargin,
  }">
    <slot/>
  </div>
</template>
<script>
import BoxItem from './BoxItem'
import {NotImplementedError, RuntimeError} from "jscom/core/exceptions"

export default {
  name: 'box',
  extends: BoxItem,
  props: {
    pReverse: {type: Boolean, default: false},
    pAlignMain: {type: String, default: ''},  // same as justify-content
    pAlignCross: {type: String, default: ''},  // same as align-items
    pSpace: {type: String, default: ''},
  },
  watch: {
    pReverse() {
      this.flexDirection = this.getFlexDirection()
    },
    pAlignCross(val) {
      this.alignItems = this.getAlignItems()
    },
    pAlignMain(val) {
      this.justifyContent = this.getJustifyContent()
    },
    pSpace(val) {
      this.updateSpace(val);
    }
  },
  computed: {
  },
  data() {
    return {
      direction: '',   // horizontal / vertical
      // 方向
      flexDirection: '',
      alignItems: '',
      justifyContent: '',
    }
  },
  created() {
    this.direction = this.getDirection()
    this.flexDirection = this.getFlexDirection()
    this.alignItems = this.getAlignItems()
    this.justifyContent = this.getJustifyContent()
    this.$nextTick(() => {
      this.updateSpace(this.pSpace)
    })
  },
  methods: {
    /**
     * @returns {string}
     */
    getDirection() {
      throw NotImplementedError
    },
    getFlexDirection() {
      throw NotImplementedError
    },
    getAlignItems() {
      let propMap = {
        'start': 'flex-start',
        'end': 'flex-end',
        'center': 'center',
        'baseline': 'baseline',
        'stretch': 'stretch',
        '': 'auto',  // 单独处理
      }
      let alignItems = propMap[this.pAlignCross]
      if (alignItems === undefined) {
        throw new RuntimeError(`pAlignCross must be ${Object.keys(propMap)}`)
      }
      if (alignItems === 'auto') {
        if (this.direction === 'horizontal') {
          return 'center'
        } else {
          return 'flex-start'
        }
      } else {
        return alignItems
      }
    },
    getJustifyContent() {
      let propMap = {
        'start': 'flex-start',
        'end': 'flex-end',
        'around': 'space-around',
        'between': 'space-between',
        'center': 'center',
        '': 'space-around',
      }
      let justifyContent = propMap[this.pAlignMain]
      if (justifyContent === undefined) {
        throw new RuntimeError(`pAlignMain must be ${Object.keys(propMap)}`)
      }
      return justifyContent
    },
    updateSpace(val) {
      // 所有子元素两边加 margin，首尾前后不加
      if (!val || val + '' === '0px' || val + '' === '0') {
        return
      }
      for (let idx=0; idx < this.$children.length; idx++) {
        let child = this.$children[idx]
        if (this.direction === 'vertical') {
          if (idx === 0) {
            child.$el.style.marginBottom = val/2
          } else if (idx === this.$children.length - 1) {
            child.$el.style.marginTop = val/2
          } else {
            child.$el.style.marginTop = val/2
            child.$el.style.marginBottom = val/2
          }
        } else {
          if (idx === 0) {
            child.$el.style.marginRigth = val/2
          } else if (idx === this.$children.length - 1) {
            child.$el.style.marginLeft = val /2
          } else {
            child.$el.style.marginLeft = val/2
            child.$el.style.marginRigth = val/2
          }
        }
      }
    }
  }
}
</script>
