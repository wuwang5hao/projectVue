<template>
  <div>
    <ModalForm
      ref="modalForm"
      v-model="visible"
      pTitle="驳回"
      :pFields="fields"
      :pJsonModel="jsonModel"
      :pWidth="526"
      @confirm="onConfirm"
    >
    </ModalForm>
  </div>
</template>

<script>
/*
 * 企业审核驳回弹窗
 */
import { mapState, mapMutations } from 'vuex';
import MutationTypes from '@/store/MutationTypes';
import FormMixin from '@/components/form/FormMixin';
import OptionsMixin from '@/common/OptionsMixin';

export default {
  name: 'VerifyModal',
  mixins: [FormMixin, OptionsMixin],

  props: {
    pVisible: Boolean,
    pEnterprise: Object,
    pType: {
      type: String,
      validator: val => {
        return ['reject', 'pass'].indexOf(val) !== -1;
      }
    }
  },

  mounted() {
    this.init();
  },

  data() {
    return {
      jsonModel: {
        rejectReason: ''
      },
      fields: [
        {
          label: '驳回理由',
          type: 'str',
          name: 'rejectReason',
          required: true,
          widget: 'LimitTextAreaWidget',
          placeholder: '请输入驳回理由',
          maxLength: 100
        }
      ],
      visible: this.pVisible
    };
  },

  methods: {
    ...mapMutations([MutationTypes.SET_LOADING]),
    /**
     * 初始化逻辑
     */
    init() {},
    /**
     * @brief: 确认事件，审核逻辑
     * 驳回 2， 通过 1
     */
    onConfirm() {
      if (!this.jsonModel.rejectReason) {
        this.$message.warn('请输入驳回理由');
        return;
      }
      let jsonModel = { ...this.jsonModel };
      this.SET_LOADING({ loading: true });
      jsonModel.appraiseStatus = '2';
      this.$emit('success', jsonModel);
      this.$emit('on-hide');
    }
  }
};
</script>

<style lang="less"></style>
