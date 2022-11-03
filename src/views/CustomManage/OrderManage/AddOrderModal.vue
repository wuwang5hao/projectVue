<template>
  <ModalForm
    v-model="visible"
    pTitle="新增-试用订单"
    ref="modalForm"
    :pFields="fields"
    :pJsonModel="jsonModel"
    @confirm="onConfirm"
    :pWidth="600"
    :pHeight="modalMaxHeight"
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
  name: 'AddOrderModal',
  mixins: [FormMixin, OptionsMixin],
  props: {
    pVisible: Boolean,
  },
  data() {
    return {
      jsonModel: {},
      visible: this.pVisible,
      verfiyList: []
    };
  },
  created() {
    this.getEnterpriseVerify()
  },
  computed: {
    modalMaxHeight() {
      return `${window.screen.height * 0.55}px`;
    },
    fields() {
      let list = [
        {
          label: '企业名称（客户）',
          type: 'str',
          name: 'companyId',
          placeholder: '请输入企业名称',
          widget: 'SelectWidget',
          options: this.verfiyList,
          maxLength: 50,
          required: true,
          width: '250px',
        },
        {
          label: '有效期',
          type: 'int',
          widget: 'InputNumberWidget',
          name: 'days',
          suffix: '天',
          width: '250px',
          min: 0,
          max: 999,
          precision: 0,
          required: true,
          replacePattern: /^[1-9]d*$/,
          validator: (rule, value, callback) => {
            if (value && String(value).length > 3) {
              callback(new Error('请输入最多3位'));
              return;
            }
            if (value && value < 0) {
              callback(new Error('请输入正整数'));
              return;
            }
            callback();
          },
          onChange: (jsonVal, jsonModel) => {
            if (jsonVal > 999) {
              return;
            }
            const time = [moment().format('YYYY-MM-DD '), moment().add(jsonVal, 'days').format('YYYY-MM-DD ')];
            jsonModel.operationTime = jsonVal !== '' ? time : null;
          },
        },
        {
          label: '续费后起止时间',
          type: 'datetime_range',
          name: 'operationTime',
          placeholder: ['开始日期', '结束日期'],
          renderRo: (h, jsonVal, jsonModel) => {
            const time = jsonVal ? `${jsonVal[0]} 至 ${jsonVal[1]}` : '-';
            return h('span', {}, [time]);
          },
          readonly: true,
        },
      ];
      return list
    }
  },
  methods: {
    ...mapMutations([MutationTypes.SET_LOADING]),
    onConfirm() {
      this.SET_LOADING({ loading: true });
      let jsonModel = { ...this.jsonModel };
      jsonModel.companyName =this.verfiyList?.length>0&&this.verfiyList?.find(v => v.value ===jsonModel.companyId).label
      this.$apiUtil
        .getSoftwareServiceApi()
        .customer_order_temporary_add({ ...jsonModel })
        .then(({ data, resultCode }) => {
          if (resultCode === 0) {
            this.$message.success('新增成功');
          }
          this.$emit('on-hide');
          this.$emit('success');
        })
        .catch(() => {
          this.SET_LOADING({ loading: false });
        });
    },
    /**
     * 企业名称列表
     * @params
     */
    getEnterpriseVerify() {
      let api = this.$apiUtil.getEnterpriseApi();
      api.get_enterprises_verify({
        updateTime: '',
        companyKey: '',
        pageNum: 1,
        pageSize: 10000,
        sortObj: '',
        appraiseStatus: '1',
      }).then(({ data }) => {
        data.list.map(item => {
          item.value=item.id
          item.label = item.name
          return item
        })
        this.verfiyList = data.list
      });
    },
  },
};
</script>

<style lang="less">

// .ant-select-dropdown-menu {
//     max-height: 150px;
//   }


</style>
