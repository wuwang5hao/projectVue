<template>
  <Drawer
  :title="title"
  v-model="isShow"
  class='mfb-modal'
  :loading='isLoading'
  @on-visible-change='onVisibleChange'
  :width="67"
  :mask-closable="pMaskClosable"
  :styles="{height: 'calc(100% - 55px)', overflow: 'auto', paddingBottom: '53px', position: 'static'}"
  >
    <div ref="form_holder"></div>
    <div class="mfb-drawer-footer">
      <Button style="margin-right: 8px" @click="isShow=false">{{ cancelText }}</Button>
      <Button type="primary" @click="onBtnOk" :loading='isSubmitting'>{{ submitText }}</Button>
    </div>
  </Drawer>
</template>

<script>
import FormWidget from './FormWidget'

export default {
  name: 'ModalForm',

  extends: FormWidget,

  props: {
    title: {
      type: String,
      default: '表单'
    },
    submitText: {
      type: String,
      default: '提交'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    pMaskClosable: {
      type: Boolean,
      default: true,
    },
  },

  watch: {
  },

  data () {
    return {
      isShow: false,
      isLoading: true,
      onClose: null,
      isSubmitting: false
    }
  },

  methods: {
    onVisibleChange (isShow) {
      if (!isShow) {
        this.$emit('on-hide')
        if (this.onClose) {
          this.onClose()
        }
        this.OnDestroyForm()
      }
    },
    OnSubmitException(error) {
      this.$Message.error('提交失败 '+error.message)
      this._resetLoading()
    },
    OnSubmitFinished (retmsg) {
      if (retmsg.ret === 0) {
        this.isShow = false
      } else {
        this.$Message.error('提交失败 '+retmsg.msg)
        for (let [key, val] of Object.entries(retmsg.errors)) {
          this.$Message.error(`${key} ${val.code} ${val.msg}`)
        }
        this._resetLoading()
      }
    },
    _resetLoading() {
      this.isLoading = false
      this.isSubmitting = false
      this.$nextTick(() => { this.isLoading = true })
    },
    onBtnOk() {
      if (this.formSpec.isDisableAll) {
        this.$Message.warning('只读表单不能提交')
        this._resetLoading()
        return
      }
      this.isSubmitting = true
      this.onSubmit({
        onValid: (valid, data) => {
          if (valid) {
            this.$emit('submit', data)
          } else {
            console.log('validate failed')
            this._resetLoading()
          }
        }
      })
    },
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    }
  }
}
</script>

<style lang='less'>
  .mfb-modal {
    top: 50px;
    min-width: 500px;
  }
  .mfb-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }
</style>
