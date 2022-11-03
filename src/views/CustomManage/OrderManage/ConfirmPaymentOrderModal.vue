<template>
  <ALocaleProvider :locale="locale">
    <AModal :maskClosable="false" ref="modalForm" centered :visible="visible" @cancel="onCancel" title="确认支付">
      <div class="tip"><a-icon type="info-circle" theme="filled" class="icon" />确认后将无法更改！</div>

      <BaseForm ref="form" :pFields="fields" :pJsonModel="jsonModel"></BaseForm>
      <div ref="footer" slot="footer">
        <AButton class="cancel" @click="onCancel">取消</AButton>
        <AButton class="confirm" type="primary" @click="onConfirm" :loading="isLoading">确定</AButton>
      </div>
    </AModal>
  </ALocaleProvider>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import consts from '@/common/consts';
import MutationTypes from '@/store/MutationTypes';
import FormMixin from '@/components/form/FormMixin';
import OptionsMixin from '@/common/OptionsMixin';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

export default {
  name: 'ConfirmPaymentOrderModal',
  mixins: [FormMixin, OptionsMixin],

  props: {
    pVisible: Boolean,
    // pRow: Object
    pVersion: Number,
    pPayAmount: Number,
  },

  data() {
    let fields = [
      {
        label: '支付方式',
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
      // {
      //   label: '费用',
      //   type: 'int',
      //   widget: 'InputNumberWidget',
      //   prefix: '¥',
      //   precision: 2,
      //   width: '220px',
      //   name: 'orderPayAmount',
      //   min: 0,
      //   required: true
      // },
      {
        label: '费用',
        type: 'str',
        name: 'orderPayAmount',
        disabled: true,
      },
      {
        label: '支付时间',
        type: 'datetime',
        name: 'payTime',
        placeholder: '请选择支付时间',
        width: 195,
        required: true,
      },
      {
        label: '有效期(天)',
        type: 'str',
        name: 'orderActiveDayNumber',
        placeholder: '请输入整数，年费订单请勿填写',
        required: false,
        replacePattern: /[^0-9]+/,
        validator: (rule, value, callback) => {
          if (Number(value) >999) {
            callback(new Error('有效期不超过三位数!'));
            return;
          }
          callback();
        }
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
      }
    ];
    return {
      jsonModel: {},
      fields,
      visible: this.pVisible,
      isLoading: false,
      locale: zh_CN
    };
  },
  created() {
    this.jsonModel = {
      orderPayAmount: this.pPayAmount,
      ...this.pRow
    };
  },

  methods: {
    ...mapMutations([MutationTypes.SET_LOADING]),
    onCancel() {
      this.isLoading = false;
      this.visible = false;
    },
    onConfirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.edit();
        }
        return valid;
      });
    },
    edit() {
      let jsonModel = { ...this.jsonModel };
      if (this.isLoading === true) {
        return;
      }
      this.isLoading = true;
      let api = this.$apiUtil.getSoftwareServiceApi();
      api
        .pay_customer_orders({
          customer_order_id: this.$route.query.orderId,
          companyId: this.$route.query.companyId,
          version: this.pVersion,
          ...jsonModel
        })
        .then(({ data }) => {
          this.$emit('success');
          this.isLoading = false;
          this.visible = false;
          this.$router.back();
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  },
  /**
   * 注入控件容器
   * @returns {{popupContainer: popupContainer}}
   */
  provide() {
    let vm = this;
    return {
      popupContainer: () => {
        let modalBody = vm.$refs.footer.parentElement.previousElementSibling;
        if (!modalBody) {
          return document.body;
        }
        return modalBody;
      }
    };
  }
};
</script>

<style lang="less">
@import 'variables.less';
.tip {
  margin-bottom: 16px;
  padding: 0 16px;
  background-color: #fdf6e7;
  border-radius: 4px;
  height: 35px;
  width: 100%;
  line-height: 35px;
  color: @primary;
  .icon {
    margin-right: 16px;
  }
}
</style>
