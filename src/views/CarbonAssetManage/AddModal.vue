<template>
  <div class="add-report">
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
  name: 'addModal',
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
        {label: '交易所', type: 'str', name: 'carbonEmissionTransactionMarketId', required: true, widget: 'SelectWidget', options: []},
        {label: '交易日期', type: 'date', name: 'transactionDate', widget: 'DatetimeWidget', required: true, width: '320px', disableFutureDate: true},
        {label: '收盘价（元）', type: 'int', name: 'transactionClosingPrice', required: true, widget: 'InputNumberWidget', precision: 2, width: '320px', placeholder: '请输入收盘价（元）'},
      ],
      visible: this.pVisible,
      isLoading: false,
    };
  },
  created() {
    this.getMmarketName()
    if(this.pType === 'update' || this.pType === 'view') {
      this.fields[0].disabled = true
      this.fields[1].disabled = true
      this.jsonModel = {
        ...this.pRow,
      }
      this.pRow.transactionClosingPrice==='-'&&(this.jsonModel.transactionClosingPrice = 0)
    }
  },
  computed: {
    modalTitle() {
      if (this.pType === 'add') {
        return '新增'
      } else if (this.pType === 'update') {
        return '修改'
      } else { // view
        return '详情'
      }
    }
  },
  methods: {
    // 获取交易所
    getMmarketName() {
      this.$apiUtil.getCarbonAssetManageApi().get_market_name({}).then(({data}) => {
        this.fields[0].options = data.map((item) => {
          return {
            label: item.name,
            value: item.carbonEmissionTransactionMarketId
          }
        })
      })
    },
    onConfirm() {
      if (this.isLoading === true) {
        return;
      }
      this.isLoading = true;
      if (this.pType === 'add') {
        this.$apiUtil.getCarbonAssetManageApi().add_transaction_price(this.jsonModel).then(({data}) => {
          this.$emit('on-hide')
          this.$emit('success', data)
        }).finally(() => {
          this.isLoading = false
        })
      } else if (this.pType === 'update') {
        this.$apiUtil.getCarbonAssetManageApi().edit_transaction_price({...this.jsonModel}).then(({data}) => {
          this.$emit('on-hide')
          this.$emit('success', data)
        }).finally(() => {
          this.isLoading = false
        })
      }
      // this.visible = false;
    },
  }
};
</script>

<style lang="less">
</style>
