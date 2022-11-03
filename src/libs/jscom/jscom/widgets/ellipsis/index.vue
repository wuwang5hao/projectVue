<script>
import core from './core';
import { userConfig } from './config';
import { addResizeListener, removeResizeListener }from './resize-event';
export default {
  name: 'ellipsis',
  props: {
    text: {
      type: String,
      default: '',
    },
    width: {
      type: String,
    },
    // lineHeight: {
    //    type: String,
    //    default: '14px',
    // },
    lineNum: {
      type: Number,
    },
    fontFamily: {
      type: String,
    },
    fontWeight: {
      type: String | Number,
    },
    fontSize: {
      type: String,
    },
    left: {
      type: String,
    },
    leftRender: {
      type: Function,
      default: null,
    },
    tagName: {
      type: String,
      default: userConfig.tagName,
    },
    isImmediate: {
      type: Boolean,
      default: userConfig.isImmediate,
    },
  },
  data() {
    return {
      textArr: [],
      hasLeft: false,
      span: '',
      parentWidth: '',
      resizeEvent: '',
    };
  },
  render(h, params) {
    let children = []
    let idx = 0
    for (idx=0; idx < this.textArr.length; idx++) {
      let item = this.textArr[idx]
      if (idx === this.textArr.length-1 && this.hasLeft) {
        // process last line render
        if (this.leftRender) {
          let elem = h(this.tagName, {
            props: {
              'class': 'ellipsis'
            }
          }, [item, this.leftRender(h, params)])
          children.push(elem)
        } else {
          let elem = h(this.tagName, {
            props: {
              'class': 'ellipsis'
            }
          }, [item+this.left])
          children.push(elem)
        }
      } else {
        children.push(h(this.tagName, {
          props: {
            'class': 'ellipsis'
          }
        }, item))
      }
    }
    return h('div', {
      props: {}
    }, children)
  },
  watch: {
    width: function () {
      this.update();
    }
  },
  methods: {
    init() {
      // 初始化
      this.span  = document.createElement('span');
      this.span.style.opacity = 0;
      this.span.style['white-space'] = 'nowrap';
      this.span.style['font-weight'] = this.fontWeight || userConfig.fontWeight;
      this.span.style['font-family'] = this.fontFamily || userConfig.fontFamily;
      this.span.style['font-size'] = this.fontSize|| userConfig.fontSize;
      document.body.append(this.span);
      const font = {
        text: this.text,
        width: this.parentWidth || parseFloat(getComputedStyle(this.$el.parentElement).width, 10),
        lineHeight: this.lineHeight || userConfig.lineHeight,
        lineNum: this.lineNum || userConfig.lineNum,
        fontFamily: this.fontFamily || userConfig.fontFamily,
        fontSize: this.fontSize || userConfig.fontSize,
        fontWeight: this.fontWeight || userConfig.fontWeight,
        left: this.left || userConfig.left,
      };
      [this.textArr, this.hasLeft] = core(font, this.span)
      this.destory();
    },
    destory() {
      this.span.remove();
      this.span = '';
    },
    update() {
      this.init();
    },
  },
  beforeMount() {
    if (this.width) {
      this.parentWidth = this.width;
      this.init();
    }
  },
  mounted() {
    if (!this.width) {
      this.parentWidth = parseFloat(getComputedStyle(this.$el.parentElement).width, 10);
      this.init();
      const min = 1000;
      let timeout;
      let begin = new Date().getTime();
      const that = this;
      this.resizeEvent = () => {
        if (that.parentWidth === parseFloat(getComputedStyle(this.$el.parentElement).width, 10)) return;
        that.parentWidth = parseFloat(getComputedStyle(this.$el.parentElement).width, 10);
        if (that.isImmediate) {
          that.init();
        } else {
          const now = new Date().getTime();
          if (now - begin < min) {
            timeout = setTimeout(() => {
              that.init(that)
              begin = now;
            }, now - begin)
          } else {
            timeout = null;
            clearTimeout(timeout);
            that.init();
            begin = now;
          }
        }
      };
      addResizeListener(this.$el, this.resizeEvent);
    }
  },
  destroyed() {
    removeResizeListener(this.$el, this.resizeEvent);
  },
};
</script>
