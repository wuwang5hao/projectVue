<template>
  <BaseModal
    @confirm="onConfirm"
    pTitle="企业标注变更"
    v-model="visible"
    :pWidth="520"
    :pHeight="300"
    :pIsLoading="isLoading"
  >
    <div class="tips">
      <p>请确认该企业是否已将授权场地全部解除关联！</p>
      <p class="warn">确认更改后，无法再次变更！</p>
    </div>
    <BaseForm ref="fixedField" :pFields="fields" :pJsonModel="jsonModel"> </BaseForm>
  </BaseModal>
</template>

<script>
import FormMixin from '@/components/form/FormMixin';
import OptionsMixin from '@/common/OptionsMixin';

export default {
  name: 'EditCompanyTypeModal',
  mixins: [FormMixin, OptionsMixin],
  props: {
    pVisible: Boolean,
    pCompanyTypeFlag: String,
    pCompanyId: String,
  },

  /**
   * 注入控件容器 Number
   * @returns {{popupContainer: popupContainer}}
   */
  provide() {
    let vm = this;
    return {
      popupContainer: () => {
        let form = vm.$refs.fixedField.$el;
        if (!form) {
          return document.body;
        }
        return form;
      }
    };
  },

  data() {
    return {
      fields: [
        {
          label: '企业标注',
          type: 'str',
          name: 'companyTypeFlag',
          widget: 'SelectWidget',
          options: [
            {
              label: '一般企业',
              value: '01'
            },
            {
              label: '工业园区',
              value: '02'
            },
            {
              label: '集团公司',
              value: '03'
            },
          ],
          required: true
        }
      ],
      jsonModel: {
        companyTypeFlag: this.pCompanyTypeFlag
      },
      visible: this.pVisible,
      isLoading: false,
    };
  },
  created() {
  },
  methods: {
    onConfirm() {
      let api = this.$apiUtil.getEnterpriseApi();
      const context = { message: '' };
      console.log(this.$route);
      api.update_company_type({companyId: this.pCompanyId, companyTypeFlag: this.jsonModel.companyTypeFlag, context}).then(({data}) => {
        this.$emit('confirm');
        this.visible = false;
        this.$message.success('修改成功');
      });
    },
  }
};
</script>

<style lang="less" scoped>
  .tips {
    padding: 0 20px;
    .warn {
      color: red;
    }
  }
</style>
