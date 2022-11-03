<template>
  <div v-if="field.readonly">
    <pre
      class="pre-text"
      :style="{width: field.width || '320px'}"
    >{{widgetVal || '无'}}</pre>
  </div>
  <div v-else class="lta-container">
    {{field.rows}}
    <AInput
      :style="{width: field.width || '320px', height: field.height || '96px' }"
      v-model="widgetVal"
      type="textarea"
      :placeholder="field.placeholder || '请输入'"
      @keyup="onKeyup"
      :rows="field.rows || 5"
      :maxLength="limit"
    >
    </AInput>
    <span v-if="isShowLimit" class="lta-hint">{{length}}/{{limit}}</span>
  </div>
</template>
<script>
/*
 * 多行文本组件， 在右下角显示当前文本长度和最大长度
 */
import BaseWidget from "./BaseWidget";

export default {
  name: 'LimitTextAreaWidget',
  supportReadonly: true,
  extends: BaseWidget,

  props: {
  },

  watch: {
    widgetVal() {
      this.updateLimit(this.widgetVal)
    }
  },

  data () {
    let showLimit = this.pField.showLimit !== undefined ? this.pField.showLimit : true
    let limit = this.pField.maxLength || 200
    if (!showLimit && this.pField.maxLength === undefined) {
      limit = undefined
    }
    return {
      length: 0,
      limit: limit,
      isShowLimit: showLimit,
    }
  },

  mounted() {
    this.updateLimit(this.widgetVal)
  },

  methods: {
    /**
     * 按键弹起触发
     * @param event
     */
    onKeyup (event) {
      if (this.field.upper) {
        this.widgetVal = event.target.value.toUpperCase()
      } else {
        this.widgetVal = event.target.value
      }
      if (this.field.filter && !this.field.filter(this.widgetVal)) {
        this.widgetVal = this.widgetVal.slice(0, this.widgetVal.length - 1)
      }
      if (this.field.replacePattern) {
        this.widgetVal = this.widgetVal.replace(this.field.replacePattern, '')
      }
      this.updateLimit(event.target.value)
    },
    /**
     * 更新字数限制
     * @param value
     */
    updateLimit (value) {
      if (this.limit === undefined) return
      let textVal = value
      let lengthMax = this.limit
      let length = this.limit - textVal.length
      if (length < 0) {
        length = 0
      }
      if (textVal.length >= lengthMax) {
        this.widgetVal = textVal.substring(0, lengthMax)
      }
      this.length = this.widgetVal.length
    }
  }
}
</script>

<style lang="less" scoped>
@import 'variables.less';
.lta-container {
  position: relative;
  background-color: #FCFCFD;
  padding-bottom: 15px;
  display: inline-block;
  border: 1px solid #EEF0F2;
  border-radius: 4px;
  textarea {
    resize: none;
    background-color: #FCFCFD;
    border: 0px;
    box-shadow: 0px 0px 0px 0px;
    margin-top: 7px;
  }
  textarea:focus {
    box-shadow: 0px 0px 0px 0px;
    border: 0px;
  }
  .lta-hint {
    position: absolute;
    right: 5px;
    bottom: 0px;
    font-size: @font-size-small;
    color: #B7B7B7;
    line-height: 20px;
  }
}
.pre-text {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size:14px;
  font-family: 'SourceHanSansCN-Regular,SourceHanSansCN'; // 1
  font-weight:400;
  text-align: justify;
}
</style>
