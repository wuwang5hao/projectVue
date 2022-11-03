<template>
  <BaseModal
    @confirm="onConfirm"
    @cancel="handleCancel"
    pTitle="修改订单类型"
    v-model="visible"
    :pWidth="520"
    :pHeight="modalMaxHeight"
    :pIsLoading="isLoading"
  >
    <BaseForm ref="fixedField" :pFields="fields" :pJsonModel="jsonModel"> </BaseForm>
    <GridForm
      class="fixedFieldRenewal-form"
      ref="fixedFieldRenewal"
      v-if="isFieldRenewal"
      :pFields="filedsRenewal"
      :pJsonModel="renewalJsonModel"
      :pLayout="{
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      }"
    />
    <!-- <BaseForm ref="fixedFieldRenewal" v-if="isFieldRenewal" :pFields="filedsRenewal" :pJsonModel="renewalJsonModel">
    </BaseForm> -->
    <h4 class="record">
      支付详情
      <a-divider class="record-divider" />
    </h4>
    <BaseForm ref="paramsField" :pFields="fieldsParamsShow" :pJsonModel="paramsJsonModel"> </BaseForm>
  </BaseModal>
</template>

<script>
import FormMixin from '@/components/form/FormMixin';
import OptionsMixin from '@/common/OptionsMixin';
import moment from 'moment';
import consts from '@/common/consts';
import GridForm from '@/components/form/GridForm';

export default {
  name: 'AddVirtualPointModal',
  mixins: [FormMixin, OptionsMixin],
  props: {
    pVisible: Boolean,
    PCustomerOrganizationName: String, //场地名称
    PCustomerOrganizationId: Number, //场地ID
    pActiveStart: Number,
    pActiveEnd: Number,
    PSoftwareModuleName: String,
    pOrderEffectiveStatus: String
  },
  components: {
    GridForm
  },
  computed: {
    modalMaxHeight() {
      return `${window.screen.height * 0.55}px`;
    },
    activeStart() {
      return this.pActiveStart;
    },
    activeEnd() {
      return this.pActiveEnd;
    },
    fieldsParamsShow() {
      let list = [
        {
          label: this.jsonModel.orderType === '5' ? '退款方式' : '支付方式',
          type: 'str',
          name: 'wayToPay',
          widget: 'SelectWidget',
          // options: consts.wayToPaysI,
          options: [
            {
              value: '01',
              label: '线下支付'
            }
          ],
          placeholder: '请选择支付方式',
          required: true
        },
        {
          label: '实付价',
          type: 'int',
          widget: 'InputNumberWidget',
          width: '195px',
          prefix: '¥',
          precision: 2,
          name: 'orderPayAmount',
          // min: 0,
          required: true,
          replacePattern: /^[1-9]d*$/,
          validator: (rule, value, callback) => {
            if (value && value < 0 && this.jsonModel.orderType !== '5') {
              callback(new Error('费用应大于0'));
              return;
            }
            // if (value && value > 0&&this.jsonModel.orderType === '5') {
            //   callback(new Error('费用应小于0'));
            //   return;
            // }
            callback();
          },
          onChange: (jsonVal, jsonModel) => {
            if (this.jsonModel.orderType === '5') {
              jsonModel.orderPayAmount = Number(`-${jsonModel.orderPayAmount}`);
            }
          }
        },
        {
          label: '支付时间',
          type: 'datetime',
          name: 'payTime',
          placeholder: '请选择支付时间',
          required: true
        },
        {
          label: '流水编号',
          type: 'str',
          name: 'transactionNumber',
          placeholder: '请输入流水编号',
          required: true,
          maxLength: 20
        },
        {
          label: '支付账号',
          type: 'str',
          name: 'payAccount',
          placeholder: '请输入支付账号',
          maxLength: 20
        },
        {
          label: '购买渠道',
          type: 'str',
          name: 'orderChannel',
          widget: 'SelectWidget',
          options: this.channelList,
          required: true
        }
      ];
      return list;
    },
    filedsRenewal() {
      let filedsRenewal = [
        { label: '场地（实例）', type: 'str', name: 'customerOrganizationName', readonly: true, span: 24 },
        {
          label: this.isActiveAuto ? '有效期(天)' : '续费时长(年)',
          type: 'int',
          widget: 'InputNumberWidget',
          // name: 'year',
          name: 'customTime',
          suffix: this.isActiveAuto ? '天' : '年',
          min: 0,
          max: this.isActiveAuto ? 999 : 99,
          precision: 0,
          required: true,
          span: 16,
          replacePattern: /^[1-9]d*$/,
          validator: (rule, value, callback) => {
            if (value && String(value).length > 2 && !this.isActiveAuto) {
              callback(new Error('请输入最多2位'));
              return;
            }
            if (value && String(value).length > 3 && this.isActiveAuto) {
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
            if (this.isActiveAuto) {
              // 有效期
              if (jsonVal > 999) {
                return;
              }
              const time = [
                moment(this.activeStart).format('YYYY-MM-DD'),
                moment(this.activeEnd)
                  .add(jsonVal, 'days')
                  .endOf('day')
                  .format('YYYY-MM-DD')
              ];
              jsonModel.operationTime = jsonVal !== '' ? time : null;
            } else {
              // 续费年份
              if (jsonVal > 99) {
                return;
              }
              const time = [
                moment(this.activeStart).format('YYYY-MM-DD'),
                moment(this.activeEnd)
                  .add(jsonVal, 'years')
                  .endOf('day')
                  .format('YYYY-MM-DD')
              ];
              jsonModel.operationTime = jsonVal !== '' ? time : null;
            }
          }
        },
        {
          label: '',
          type: 'bool',
          text: '是否自定义有效期',
          name: 'renewalFlag',
          span: 8,
          widget: 'CheckboxWidget',
          onChange: (value, jsonModel) => {
            this.isActiveAuto = value;
            if (value) {
              // 有效期
              if (jsonModel.customTime > 999) {
                return;
              }
              const time = [
                moment(this.activeStart).format('YYYY-MM-DD'),
                moment(this.activeEnd)
                  .add(jsonModel.customTime, 'days')
                  .endOf('day')
                  .format('YYYY-MM-DD')
              ];
              jsonModel.operationTime = jsonModel.customTime !== '' ? time : null;
            } else {
              // 续费年份
              if (jsonModel.customTime > 99) {
                return;
              }
              const time = [
                moment(this.activeStart).format('YYYY-MM-DD'),
                moment(this.activeEnd)
                  .add(jsonModel.customTime, 'years')
                  .endOf('day')
                  .format('YYYY-MM-DD')
              ];
              jsonModel.operationTime = jsonModel.customTime !== '' ? time : null;
            }
          }
        },
        {
          label: '续费后起止时间',
          type: 'datetime_range',
          name: 'operationTime',
          placeholder: ['开始日期', '结束日期'],
          renderRo: (h, jsonVal, jsonModel) => {
            console.log('dddd', h, jsonVal, jsonModel);
            const time = jsonVal ? `${jsonVal[0]} 至 ${jsonVal[1]}` : '-';
            return h('span', {}, [time]);
          },
          required: false,
          readonly: true,
          span: 24
        }
      ];
      return filedsRenewal;
    }
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
    const newOrderTypes = consts.orderTypes.filter(
      v => v.value === '2' ||
        (v.value === '3' &&
          this.PSoftwareModuleName !== '高级版' && this.PSoftwareModuleName !== '产品碳足迹' &&
          !(
            Number(this.pOrderEffectiveStatus) === 1 && moment(new Date()).diff(moment(this.activeEnd), 'days') < 30
          )) ||
        (v.value === '5' && this.pOrderEffectiveStatus !== '1')
    );
    return {
      isFieldRenewal: false,
      isActiveAuto: false, // 是否选择有效期
      fields: [
        {
          label: '订单类型',
          type: 'str',
          name: 'orderType',
          widget: 'SelectWidget',
          options: newOrderTypes,
          required: true
        }
      ],
      jsonModel: {
        orderType: ''
      },
      visible: this.pVisible,
      isLoading: false,
      renewalJsonModel: {
        operationTime: null // 续费后起止时间
      },
      paramsJsonModel: {},
      channelList: []
    };
  },
  watch: {
    'jsonModel.orderType'(val, old) {
      if (Number(val) === 2) {
        this.renewalJsonModel = {
          ...this.renewalJsonModel,
          customerOrganizationName: this.PCustomerOrganizationName
        };
        this.isFieldRenewal = true;
      } else {
        this.isFieldRenewal = false;
        this.renewalJsonModel = {};
      }
      //订单类型修改时交易费用清空
      this.$refs.paramsField.jsonModel.orderPayAmount = '';
    }
  },
  created() {
    this.getChannelList();
  },
  methods: {
    getChannelList() {
      this.$apiUtil
        .getSoftwareServiceApi()
        .get_order_channel_list({ customerOrderId: this.$route.query.orderId })
        .then(({ data, resultCode }) => {
          console.log(data);
          const list = data.map(item => {
            return {
              value: item.orderChannel,
              label: item.channelName
            };
          });
          this.channelList = list;
        })
        .catch(() => {});
    },
    /**
     * 取消事件
     */
    handleCancel() {
      this.visible = false;
    },

    /**
     * 输入校验
     */
    validateAllFields() {
      let result = false;
      this.$refs.fixedField.validate(valid => {
        if (valid) {
          result = true;
        } else {
          result = false;
        }
      });
      if (Number(this.jsonModel.orderTypes) === 2) {
        this.$refs.fixedFieldRenewal.validate(valid => {
          if (valid) {
            result = true;
          } else {
            result = false;
          }
        });
      }
      this.$refs.paramsField.validate(valid => {
        if (valid) {
          result = true;
        } else {
          result = false;
        }
      });
      return result;
    },
    /**
     * @brief: 确认事件，添加、更新逻辑
     */
    onConfirm() {
      if (!this.validateAllFields()) {
        return;
      }
      let jsonModel = {
        ...this.jsonModel,
        ...this.paramsJsonModel,
        ...this.renewalJsonModel,
        customerOrderId: this.$route.query.orderId,
        customerOrganizationId: this.PCustomerOrganizationId
      };
      this.isLoading = true;
      this.$apiUtil
        .getSoftwareServiceApi()
        .customer_order_change(jsonModel)
        .then(({ data }) => {
          this.isLoading = false;
          this.$emit('on-hide');
          this.$emit('success', data);
          this.$router.back();
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="less" scoped>
/*ant-form-item*/
.form /deep/.ant-form-item-control {
  line-height: 1;
}
h4 {
  margin: 24px 16px;
}
.record {
  display: flex;
  align-items: center;
  .record-divider {
    margin-left: 16px;
    flex: 1;
    min-width: 0;
    height: 1px;
  }
}
.fixedFieldRenewal-form {
  /deep/.ant-col-16 {
    .ant-col-6 {
      width: 37%;
    }
    .ant-col-18 {
      width: 63%;
    }
  }
  /deep/.ant-col-8 {
    .ant-form-item-control-wrapper {
      padding-right: 0px !important;
      .ant-form-item-control .ant-form-item-children .field {
        margin-top: 0px !important;
      }
    }
  }
}
</style>
