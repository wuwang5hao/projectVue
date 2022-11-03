<template>
  <ALocaleProvider :locale="locale">
    <AModal
      class="modal"
      :width="parseInt(pWidth)"
      :title="pTitle"
      centered
      :visible="value"
      @input="
        value => {
          $emit('input', value);
        }
      "
      @cancel="onCancel"
      :bodyStyle="{
        padding: `${pPaddingTop}px ${pPaddingRight}px ${pPaddingBottom}px ${pPaddingLeft}px`,
        maxHeight: modalMaxHeight
      }"
      :maskClosable="false"
    >
      <div class="container">
        <slot></slot>
      </div>
      <div slot="footer" class="footer">
        <template v-if="pOnlyClose">
          <AButton class="cancel" @click="onCancel">关闭</AButton>
        </template>
        <template v-else>
          <AButton class="cancel" @click="onCancel">取消</AButton>
          <AButton class="confirm" type="primary" @click="onConfirm" :loading="pIsLoading">确定</AButton>
        </template>
      </div>
    </AModal>
  </ALocaleProvider>
</template>
<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
  name: 'ModalForm',
  props: {
    value: { type: Boolean, default: false },
    pTitle: { type: String, default: '' },
    pWidth: { type: [Number, String], default: 598 },
    pOnlyClose: { type: Boolean, default: false },
    pPaddingTop: { type: Number, default: 23 },
    pPaddingLeft: { type: Number, default: 18 },
    pPaddingRight: { type: Number, default: 18 },
    pPaddingBottom: { type: Number, default: 23 },
    pIsLoading: { type: Boolean, default: false }
  },
  computed: {
    modalMaxHeight() {
      // return `${window.screen.height - 62 - 68 - 120}px`
      return `${window.screen.height * 0.55}px`;
    }
  },
  data() {
    return {
      locale: zh_CN
    };
  },
  methods: {
    /**
     * 确认回调
     */
    onConfirm() {
      this.$emit('confirm');
    },
    /**
     * 取消触发，关闭窗口
     */
    onCancel() {
      this.$emit('cancel');
      this.$emit('input', false);
    }
  }
};
</script>

<style lang="less" scoped>
.modal {
  .confirm,
  .cancel {
    width: 73px;
    height: 36px;
  }
  .cancel {
    margin-left: 16px;
  }
  .footer {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
