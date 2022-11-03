<template>
  <ModalForm
    v-model="visible"
    pTitle="更改价格"
    ref="modalForm"
    :pFields="fields"
    :pJsonModel="jsonModel"
    @confirm="onConfirm"
    :pWidth="600"
    :pLayout="{
      labelCol: { span: 9 },
      wrapperCol: { span: 14 },
    }"

  >
  </ModalForm>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MutationTypes from '@/store/MutationTypes';
import FormMixin from '@/components/form/FormMixin';
import OptionsMixin from '@/common/OptionsMixin';
import moment from 'moment';

export default {
  name: 'EditPrice',
  mixins: [FormMixin, OptionsMixin],
  props: {
    pVisible: Boolean,
    pOrderDetail: Object,
    pCompanyId: String,
  },
  data() {
    return {
      jsonModel: {},
      visible: this.pVisible,
    };
  },
  created() {
    this.jsonModel = {
      softwareModuleName: this.pOrderDetail.softwareModuleName,
      orderPayAmount: this.pOrderDetail.orderPayAmount,
    }
  },
  computed: {
    fields() {
      let list = [
        {
          label: '产品',
          type: 'str',
          name: 'softwareModuleName',
          maxLength: 50,
          readonly: true,
          width: '250px',
        },
        {
          label: '更改后费用',
          type: 'int',
          widget: 'InputNumberWidget',
          prefix: '¥',
          precision: 2,
          width: '200px',
          name: 'orderPayAmount',
          min: 0,
          required: true
        },
      ];
      return list
    }
  },
  methods: {
    onConfirm() {
      let jsonModel = { ...this.jsonModel };
      this.$apiUtil
        .getSoftwareServiceApi()
        .edit_order_pay_amount({ ...this.pOrderDetail, ...jsonModel, companyId: this.pCompanyId })
        .then(({ data, resultCode }) => {
          if (resultCode === 0) {
            this.$message.success('更改成功');
          }
          console.log(data);
          this.$emit('on-hide');
          this.$emit('success');
        })
    },
  },
};
</script>

<style lang="less">

// .ant-select-dropdown-menu {
//     max-height: 150px;
//   }


</style>
