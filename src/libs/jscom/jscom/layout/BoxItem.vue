<template>
  <div :style="{
    'flex-basis': this.flexBasis,
    'flex-grow': this.flexGrow,
    'flex-shrink': this.flexShrink,
    'align-self': this.alignSelf,

    width: this.boxWidth,
    height: this.boxHeight,
    padding: this.boxPadding,
    margin: this.boxMargin,
  }">
    <slot></slot>
  </div>
</template>
<script>

export default {
  name: 'BoxItem',
  props: {
    // width, height 支持 'preferred', 'expand', 'auto'
    //  auto 表示默认值，在主轴使用 preferred，交叉轴使用 expand，不在 box 中默认 expand
    //  preferred 表示原大小优先（即宽高不设定尺寸）
    //  expand 表示尽量伸展（即设置宽高为100%）
    pWidth: {String, default: 'auto'},
    pHeight: {String, default: 'auto'},
    pPadding: String,
    pPaddingLeft: String,
    pPaddingRight: String,
    pPaddingTop: String,
    pPaddingBottom: String,
    pMargin: String,
    pMarginLeft: String,
    pMarginRight: String,
    pMarginTop: String,
    pMarginBottom: String,

    pGrow: {type: Number, default: -1},  // -1 means auto
    pShrink: {type: Number, default: -1},  // -1 means auto
    pBasis: {type: String, default: 'auto'},
    pAlignSelf: {
      validator(val) {
        return ['start', 'end', 'center', 'baseline', 'stretch', ''].indexOf(val) !== -1
      },
      default: '',
    }
  },
  watch: {
    pWidth(val) {
      this.width = val
      this.mainSize = this.getMainSize()
      this.crossSize = this.getCrossSize()
    },
    pHeight(val) {
      this.height = val
      this.mainSize = this.getMainSize()
      this.crossSize = this.getCrossSize()
    },
  },
  computed: {
    boxWidth() {
      let isMain = this.isWidthMain()
      let innerBox = this.isInnerBox()
      return this._convertSize({
        size: this.width,
        isMain: isMain,
        innerBox: innerBox
      })
    },
    boxHeight() {
      let isMain = this.isHeightMain()
      let innerBox = this.isInnerBox()
      return this._convertSize({
        size: this.height,
        isMain: isMain,
        innerBox: innerBox
      })
    },
    flexBasis() {
      if (!this.isInnerBox()) {
        return this.pBasis
      }
      // 主轴有设定尺寸，返回尺寸
      return this.mainSize !== '' ? this.mainSize: this.pBasis
    },
    flexGrow() {
      if (!this.isInnerBox()) {
        // 不在box中，如实返回，(适应于其他 flex html 外层标签)
        return this.getGrow()
      }
      // 主轴有设定尺寸，返回0，限制伸缩
      return this.mainSize !== '' ? 0: this.getGrow()
    },
    flexShrink() {
      if (!this.isInnerBox()) {
        // 不在box中，如实返回，(适应于其他 flex html 外层标签)
        return this.getShrink()
      }
      // 主轴有设定尺寸，返回0，限制伸缩
      if (this.mainSize !== '') {
        return 0
      }
      return this.mainSize !== '' ? 0: this.getShrink()
    },
    alignSelf() {
      let propMap = {
        'start': 'flex-start',
        'end': 'flex-end',
        'center': 'center',
        'baseline': 'baseline',
        'stretch': 'stretch',
        '': ''
      }
      let alignSelf = propMap[this.pAlignSelf]
      return alignSelf
    },
    boxPadding() {
      if (this.pPadding) {
        return this.pPadding
      } else {
        let result = [this.pPaddingTop, this.pPaddingRight, this.pPaddingBottom, this.pPaddingLeft]
        return this._convertPaddingMarginArray(result)
      }
    },
    boxMargin() {
      if (this.pMargin) {
        return this.pMargin
      } else {
        let result = [this.pMarginTop, this.pMarginRight, this.pMarginBottom, this.pMarginLeft]
        return this._convertPaddingMarginArray(result)
      }
    },
  },
  data() {
    return {
      // common style
      width: this.pWidth,
      height: this.pHeight,
      //'align-self': 'stretch',
      // 主轴方向尺寸
      mainSize: '',
      // 交叉轴方向尺寸
      crossSize: '',
    }
  },
  created() {
    this.mainSize = this.getMainSize()
    this.crossSize = this.getCrossSize()
  },
  methods: {
    isInnerBox() {
      let name = this.$parent.constructor.options.name
      return name === 'vbox' || name === 'hbox'
    },
    isParentVertical() {
      return this.$parent.direction === 'vertical'
    },
    isParentHorizontal() {
      return this.$parent.direction === 'horizontal'
    },
    /**
     * @desc 获取交叉轴方向尺寸
     * @returns {string}
     */
    getCrossSize() {
      if (this.isWidthMain()) {
        return this._convertSize({
          size: this.height,
          isMain: true,
          innerBox: true
        })
      } else if (this.isHeightMain()) {
        return this._convertSize({
          size: this.width,
          isMain: true,
          innerBox: true
        })
      } else {
        return ''
      }
    },
    /**
     * @desc 获取主轴方向尺寸
     * @returns {string}
     */
    getMainSize() {
      if (this.isWidthMain()) {
        return this._convertSize({
          size: this.width,
          isMain: true,
          innerBox: true
        })
      } else if (this.isHeightMain()) {
        return this._convertSize({
          size: this.height,
          isMain: true,
          innerBox: true
        })
      } else {
        return ''
      }
    },
    /**
     * @desc 从 width/height 转换尺寸格式
     * @param size
     * @private
     */
    _convertSize({size, isMain, innerBox}) {
      if (size === 'auto') {
        if (!innerBox) {
          // 不在 box 中默认伸展
          size = 'expand'
        } else if (isMain) {
          // 在 box 中，且为主轴，默认原大小
          size = 'preferred'
        } else {
          // 在 box 中，且为交叉轴，默认伸展
          size = 'expand'
        }
      }
      if (size === 'expand') {
        return '100%'
      } else if (size === 'preferred') {
        return ''
      } else {
        return size
      }
    },
    /**
     * @desc 宽是否为主轴
     * @returns {null|boolean}
     */
    isWidthMain() {
      if (!this.isInnerBox()) {
        return false
      }
      if (this.isParentVertical()) {
        return false
      } else if (this.isParentHorizontal()) {
        return true
      }
    },
    /**
     * @desc 高是否为主轴
     * @returns {boolean}
     */
    isHeightMain() {
      if (!this.isInnerBox()) {
        return false
      }
      if (this.isParentVertical()) {
        return true
      } else if (this.isParentHorizontal()) {
        return false
      }
    },
    _convertPaddingMarginArray(pmArray) {
      let result = Array.from(pmArray, (item) => {
        if (!item) return '0'
        else return item
      })
      return result.join(' ')
    },
    getGrow() {
      if (this.pGrow < 0) {
        return 0
      } else {
        return this.pGrow
      }
    },
    getShrink() {
      if (this.pShrink < 0) {
        if (this.pGrow >= 0) {
          return this.pGrow
        } else {
          return 0
        }
      } else {
        return this.pShrink
      }
    }
  }
}
</script>
<style>
</style>
