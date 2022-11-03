<template>
  <ModalForm
    v-model="visible"
    pTitle="回复"
    ref="modalForm"
    :pFields="fields"
    :pJsonModel="jsonModel"
    @confirm="onConfirm"
  >
  </ModalForm>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MutationTypes from '@/store/MutationTypes';
import FormMixin from '@/components/form/FormMixin';
import OptionsMixin from '@/common/OptionsMixin';

export default {
  name: 'AddReplyModal',
  mixins: [FormMixin, OptionsMixin],

  props: {
    pVisible: Boolean,
    pRow: Object
  },

  data() {
    let fields = [
      {
        label: '客服姓名',
        type: 'str',
        name: 'customerServiceName',
        placeholder: '请输入客服姓名',
        maxLength: 10,
        required: true
      },
      { label: '回复方式', type: 'str', name: 'replyWay', maxLength: 10 },
      {
        label: '当前状态',
        type: 'str',
        name: 'replyStatus',
        widget: 'SelectWidget',
        options: [
          { label: '已回复', value: '1' },
          { label: '未回复', value: '2' }
        ],
        placeholder: '请选择当前状态',
        required: true
      },
      { label: '问题描述', type: 'str', name: 'comment', widget: 'LimitTextAreaWidget', maxLength: 80 }
    ];
    return {
      jsonModel: {},
      fields,
      visible: this.pVisible
    };
  },
  created() {
    this.jsonModel = {
      ...this.pRow
    };
  },

  methods: {
    ...mapMutations([MutationTypes.SET_LOADING]),
    onConfirm() {
      this.SET_LOADING({ loading: true });
      let jsonModel = { ...this.jsonModel };
      this.$apiUtil
        .getEnterpriseApi()
        .add_reply({ ...jsonModel, contactUsId: this.pRow.id })
        .then(({ data }) => {
          this.$emit('on-hide');
          this.$emit('success', data);
        })
        .catch(() => {
          this.SET_LOADING({ loading: false });
        });
    }
  }
};
</script>

<style lang="less"></style>
