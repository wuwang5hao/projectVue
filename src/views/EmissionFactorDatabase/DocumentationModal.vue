<template name="documentation">
  <div class="documentation">
    <h3 class="documentation-title">补充信息</h3>
    <GridForm
      class="documentation-form"
      ref="documentForm"
      :pFields="docuFields"
      :pJsonModel="jsonModel"
      :pLayout="{
        labelCol: { style: { width: '110px', paddingRight: '8px', float: 'left' } },
        wrapperCol: { style: { width: 'calc(100% - 110px)', float: 'left' } },
      }"
    />

  </div>
</template>
<script>
import FormMixin from '@/components/form/FormMixin';
import GridForm from '@/components/form/GridForm';

export default {
  name: 'DocumentationModal',
  mixins: [FormMixin],
  props: {
    pStepInfo: {
      type: Object,
      default: () => {}
    },
    isReadyOnly: {
      type: Boolean,
      default: false,
    },
    pType: {
      type: String,
      default: 'add', // add, update, view
    }
  },
  components: {
    GridForm,
  },
  data() {
    return {
      // jsonModel: {}
    };
  },
  computed: {
    jsonModel() {
      return this.pStepInfo
    },
    docuFields() {
      let list = [
        {
          label: '参考文献',
          type: 'str',
          widget: 'LimitTextAreaWidget',
          name: 'reference',
          width: 'calc(100% - 20px)',
          span: 24,
          maxLength: 300,
          readonly: this.isReadyOnly,
        },
        {
          label: '排放因子描述',
          type: 'str',
          widget: 'LimitTextAreaWidget',
          name: 'emissionFactorDescribe',
          width: 'calc(100% - 20px)',
          maxLength: 200,
          span: 24,
          readonly: this.isReadyOnly,
        },
        {
          label: '备注',
          type: 'str',
          widget: 'LimitTextAreaWidget',
          name: 'comment',
          width: 'calc(100% - 20px)',
          maxLength: 200,
          span: 24,
          readonly: this.isReadyOnly,
        },
        {
          label: '更新人',
          type: 'str',
          name: 'updateUserName',
          width: 'calc(100% - 20px)',
          readonly: this.pType === 'update'
        },
        {
          label: '更新时间',
          type: 'datetime',
          name: 'updateTime',
          useTimestamp: true,
          maxLength: 20,
          span: 12,
          width: 'calc(100% - 20px)',
          readonly: this.pType === 'update'
        }
      ];
      return list;
    }
  },
};
</script>
<style lang="less" scoped>
@import 'variables.less';
.documentation {
  padding: 0 16px 16px;

  &-title {
    background: #fafafa;
    padding: 0 8px;
    border-radius: 4px;
    height: 36px;
    line-height: 36px;
    color: @primary;
    margin-bottom: 16px;
  }
  &-form {
    padding-left: 16px;
  }
  /deep/.form_grid .ant-col{
    // min-height: 65px!important;
    height: auto;
  }
}
</style>
