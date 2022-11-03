<template>
  <AModal :visible="visible" :footer="null" :closable="false" centered :class="pClass" :maskStyle='pMaskStyle'>
    <div class="cm-body">
      <div class="cm-body-header">
        <div :class="['cm-body-icon', `cm-body-icon-${pType}`]"></div>
        <span class="cm-body-title">{{ pTitle }}</span>
      </div>
      <div class="cm-body-content" v-html="content"></div>
      <div class="cm-body-footer">
        <AButton @click="onCancel">取消</AButton>
        <AButton class="cm-body-btn"
          type="primary"
          @click="onConfirm">确定</AButton>
      </div>
    </div>
  </AModal>
</template>

<script>
/**
 * 确认对话框
 */
import { strUtil } from 'jscom/utils/strutil'

export default {
  name: 'ConfirmModal',

  props: {
    pVisible: Boolean,
    pContent: String,
    pKeyWord: String,
    pIcon: String,
    pType: {
      type: String,
      validator: (type) => {
        return ['warn', 'info', 'except'].indexOf(type) !== -1
      },
      default: 'info'
    },
    pTitle: {
      type: String,
      default: '确认信息'
    },
    pClass: {
      type: String
    },
    pMaskStyle: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  computed: {
    content () {
      if (!this.pKeyWord) {
        return strUtil.sprintf(this.pContent, '')
      }
      let keySpan = `<span class="cm-body-content-key">&nbsp;${this.pKeyWord}&nbsp;</span>`
      return strUtil.sprintf(this.pContent, keySpan)
    }
  },

  watch: {
    pVisible (visible) {
      this.visible = visible
    }
  },

  data () {
    return {
      visible: this.pVisible
    }
  },

  methods: {
    /**
     * 提交触发，提交逻辑
     */
    onConfirm () {
      this.visible = false
      this.$emit('confirm')
      this.remove()
    },
    /**
     * 取消触发，关闭窗口
     */
    onCancel () {
      this.visible = false
      this.$emit('cancel')
      this.remove()
    },
    remove () {
      setTimeout(() => {
        this.$destroy()
      }, 300)
    }
  }
}
</script>

<style lang="less">
@import 'variables.less';
@import '../static/font/font.css';
.cm-body {
  width: 550px;
  &-header {
    display: flex;
    align-items: center;
  }
  &-icon {
    margin-right: 20px;
    width: 30px;
    height: 30px;
    display: inline-block;
    &-info {
      background-image: url('/static/img/info.png');
    }
    &-warn {
      background-image: url('/static/img/warn.png');
    }
    &-except {
      background-image: url('/static/img/except.png');
    }
  }
  &-title {
    color: @title-color;
    font-size: @font-size-large;
    font-weight: @font-weight-medium;
    font-family: 'SourceHanSansCN-Medium,SourceHanSansCN';
  }
  &-content {
    padding: 29px 44px 67px 50px;
    font-size: 15px;
    color: @body-color;
    &-key {
      color: @primary;
    }
  }
  &-footer {
    display: flex;
    justify-content: flex-end;
  }
  &-btn {
    margin-left: 16px;
  }
}
</style>
