<template>
  <div class="add-agent">
    <ModalForm
      ref="modalForm"
      v-model="visible"
      :pTitle="modalTitle"
      :pFields="fields"
      :pJsonModel="jsonModel"
      :pWidth="600"
      :pReadonly="pReadonly"
      @confirm="onConfirm"
      :pIsLoading="isLoading"
    >
    </ModalForm>
  </div>
</template>

<script>
import FormMixin from '@/components/form/FormMixin';
import OptionsMixin from '@/common/OptionsMixin';

export default {
  name: 'addAgentModal',
  mixins: [FormMixin, OptionsMixin],

  props: {
    pVisible: Boolean,
    pReadonly: Boolean,
    pRow: Object,
    pType: {
      type: String,
      default: 'add', // add, update, view
      validator: type => ['add', 'update', 'view'].indexOf(type) !== -1
    }
  },

  data() {
    return {
      jsonModel: {},
      fields: [
        {
          label: '代理商企业名称',
          type: 'str',
          name: 'companyName',
          required: true,
          maxLength: 50
        },
        {
          label: '联系人',
          type: 'str',
          name: 'contactName',
          required: true,
          maxLength: 10
        },
        {
          label: '联系电话',
          type: 'str',
          name: 'contactTelephone',
          required: true,
          replacePattern: /[^0-9-*]+/,
          maxLength: 20,
          placeholder: '仅支持数字和“-” 、“*”',
          // validator: (rule, value, callback) => {
          //   if (!value) {
          //     callback(new Error('仅支持数字和“-” 、“*”'));
          //     return;
          //   }
          //   callback();
          // }
        },
        {
          label: '代理商银行账号',
          type: 'str',
          name: 'bankAccountNumber',
          required: true,
          maxLength: 20
        },
        {
          label: '开户行',
          type: 'str',
          name: 'openAccountBank',
          required: true,
          maxLength: 30
        },
        {
          label: '签约日期',
          type: 'date',
          name: 'contractTime',
          widget: 'DatetimeWidget',
          required: true,
          width: '320px',
          disableFutureDate: true
        },
        {
          label: '统一社会信用代码',
          type: 'str',
          name: 'unifiedSocialCreditId',
          maxLength: 18
        },
        {
          label: '本司联络人',
          type: 'str',
          name: 'companyContactName',
          required: true,
          maxLength: 10
        }
      ],
      visible: this.pVisible,
      isLoading: false
    };
  },
  created() {},
  computed: {},
  methods: {
    onConfirm() {
      let api = this.$apiUtil.getAgentApi();
      api.add_agent({ ...this.jsonModel }).then(({ data }) => {
        this.$emit('on-hide');
        this.$emit('success', data);
      });
    }
  }
};
</script>

<style lang="less"></style>
