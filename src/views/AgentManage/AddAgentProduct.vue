<template>
  <ModalForm
    ref="modalForm"
    v-model="visible"
    :pTitle="modalTitle"
    :pFields="fields"
    :pJsonModel="jsonModel"
    :pWidth="600"
    @confirm="onConfirm"
    :pIsLoading="isLoading"
    pMessage="提醒：提交确定后将无法删除!"
  >
  </ModalForm>
</template>

<script>
import FormMixin from '@/components/form/FormMixin';
import OptionsMixin from '@/common/OptionsMixin';
import moment from 'moment';

export default {
  name: 'addAgentProduct',
  mixins: [FormMixin, OptionsMixin],

  props: {
    pVisible: Boolean,
    saleAgentId: Number,
    pRecord: {
      type: Object,
      default: null
    },
    pType: {
      type: String,
      default: 'add', // add, edit, view
      validator: type => ['add', 'edit', 'view'].indexOf(type) !== -1
    }
  },

  created() {
    if (this.pType === 'edit') {
      console.log('edit', this.pRecord, this.pRecord.softwareModuleName);
      let moduleId = '';
      if (this.pRecord.softwareModuleName === '基础版') {
        moduleId = '1'
      }else if(this.pRecord.softwareModuleName === '高级版') {
        moduleId = '2'
      }else {
        moduleId = '3'
      }
      this.editStauts = true;
      this.jsonModel = {
        softwareModuleId: moduleId,
        ...this.pRecord
      };
    }
  },
  computed: {
    modalTitle() {
      if (this.pType === 'add') {
        return '新增';
      } else if (this.pType === 'edit') {
        return '编辑';
      } else {
        // view
        return '详情';
      }
    },
    fields() {
      return [
        {
          label: '代理产品',
          type: 'str',
          name: 'softwareModuleId',
          required: true,
          widget: 'SelectWidget',
          options: [
            { label: '基础版', value: '1' },
            { label: '高级版', value: '2' },
            { label: '产品碳足迹', value: '3' }
          ],
          disabled: this.editStauts
        },
        {
          label: '代理价（元）',
          type: 'int',
          name: 'price',
          required: true,
          widget: 'InputNumberWidget',
          max: 999999999.99,
          precision: 2,
          width: '320px',
          placeholder: '请输入代理价（元）',
          replacePattern: /^[0-9]*$/,
          validator: (rule, value, callback) => {
            console.log('gggg', value);
            if (value && value < 0 || value === 0) {
              callback(new Error('请输入大于0的数字'));
              return;
            }
            callback();
          }
        },
        {
          label: '合同号',
          type: 'str',
          name: 'contractNumber',
          required: true,
          maxLength: 20
        },
        {
          label: '代理年限（年）',
          type: 'int',
          name: 'agentPeriodYear',
          required: true,
          widget: 'InputNumberWidget',
          min: 1,
          replacePattern: /^[0-9]*$/,
          width: '320px',
          validator: (rule, value, callback) => {
            if (value && String(value).length > 10) {
              callback(new Error('请输入最多10位'));
              return;
            }
            callback();
          }
        },
        {
          label: '代理日期',
          type: 'date',
          name: 'agentProductDate',
          required: true,
          width: '320px',
          widget: 'DatetimeWidget',
          disabled: this.editStauts
        }
      ];
    }
  },
  data() {
    return {
      editStauts: false,
      jsonModel: {},
      // fields: ,
      visible: this.pVisible,
      isLoading: false
    };
  },
  methods: {
    onConfirm() {
      let api = this.$apiUtil.getAgentApi();
      if (this.pType === 'add') {
        api.add_agentProduct({ ...this.jsonModel, saleAgentId: this.saleAgentId }).then(({ data }) => {
          this.$emit('on-hide');
          this.$emit('success', data);
        });
      }
      if (this.pType === 'edit') {
        api.edit_agentProduct({ ...this.jsonModel, agentProductId: this.pRecord.id }).then(({ data }) => {
          this.$emit('on-hide');
          this.$emit('success', data);
        });
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
