<template>
  <BaseTable
      ref="table"
      class="carbon-asset-manage"
      :pRowCount="5"
      :pTotal="total"
      :pColumns="columns"
      :pDataSource="dataSource"
      :pFilterJsonModel="filterJsonModel"
      :pFilterFields="filterFields"
      :pInlineActions="[
        {name: 'update', title: '修改', toolbar: true, click: onUpdateClicked},
        {name: 'delete1', title: '删除', click: onDeleteClicked}
      ]"
      :pActions="[{name: 'add', title: '新增', type: 'primary', click: this.onAddClicked}]"
      @change="onReload"
      @reset="onReset"
    >
      <template slot="transactionClosingPrice" slot-scope="transactionClosingPrice">
        <span>{{dealPrice(transactionClosingPrice)}}</span>
      </template>
    </BaseTable>
</template>
<script>
import OptionsMixin from "@/common/OptionsMixin"
import TableMixin from "@/components/table/TableMixin";
import { ComponentUtil } from 'jscom/utils/vueutil';
import ConfirmModal from '@/components/ConfirmModal';
import AddModal from './AddModal';

export default {
  name: 'CarbonAssetManage',
  mixins: [TableMixin, OptionsMixin],
  data() {
    return {
      filterFields: [
        {label: '交易所', type: 'str_list', name: 'idList', widget: 'SelectWidget', mode: 'multiple', options: []},
        {label: '交易日期选择', type: 'str', name: 'submissiontype', widget: 'SelectWidget', onChange: this.onChangeType,
          options: [{label: '按自选周期', value: 1}, {label: '按提交时间', value: 2}, {label: '按上一交易日', value: 3}]
        },
      ],
      columns: [
        {title: '交易所', key: 'name', nameField: true, ellipsis: true, align: 'center', sorter: false},
        {title: '交易类型', key: 'transactionType', ellipsis: true, align: 'center', sorter: false},
        {title: '交易日期', key: 'transactionDate', ellipsis: true, align: 'center', dateRender: true, sorter: false},
        {title: '收盘价（元）', key: 'transactionClosingPrice', ellipsis: true, align: 'center', sorter: false, scopedSlots: { customRender: 'transactionClosingPrice' }},
        {title: '创建时间', key: 'createTime', ellipsis: true, align: 'center', dateRender: true, sorter: false},
      ],
      filterJsonModel: {
        idList: [],
        exchangeTime: '',
        endDate: '',
        startDate: ''
      },
      dataSource: [],
    }
  },
  created() {
    this.getMmarketName()
  },
  mounted() {},
  methods: {
    onReload({page, sortObj}) {
      this.$apiUtil.getCarbonAssetManageApi().get_transaction_price({...this.filterJsonModel, ...page, sortObj}).then(({data}) => {
        this.setData(data)
      })
    },
    onReset() {
      this.filterJsonModel.exchangeTime = ''
      this.filterJsonModel.endDate = ''
      this.filterJsonModel.startDate = ''
    },
    // 获取交易所
    getMmarketName() {
      this.$apiUtil.getCarbonAssetManageApi().get_market_name({}).then(({data}) => {
        this.filterFields[0].options = data.map((item) => {
          return {
            label: item.name,
            value: item.carbonEmissionTransactionMarketId
          }
        })
      })
    },
    onChangeType(val) {
      let field = {label: '', type: 'date_range', name: 'exchangeTime',
        onChange: (jsonVal, jsonModel) => {
          // [jsonModel['startDate'], jsonModel['endDate']] = jsonVal
          this.$nextTick(() => {
            this.filterJsonModel.exchangeTime = jsonVal
            this.filterJsonModel.startDate = jsonVal[0]
            this.filterJsonModel.endDate = jsonVal[1]
          })
        }
      }
      if(val === 1) {
        this.filterFields.push(field)
      }else {
        this.filterFields.length === 3 && this.filterFields.pop()
        this.$nextTick(() => {
          this.filterJsonModel.exchangeTime = ''
          this.filterJsonModel.endDate = ''
          this.filterJsonModel.startDate = ''
        })
      }
    },
    onAddClicked() {
      new ComponentUtil(this.$store).create({
        cls: AddModal,
        clsprops: {
          pVisible: true,
          pType: 'add',
          pTable: this.$refs.table,
        },
      });
    },
    onUpdateClicked(row) {
      new ComponentUtil(this.$store).create({
        cls: AddModal,
        clsprops: {
          pVisible: true,
          pType: 'update',
          pRow: row,
          pTable: this.$refs.table,
        },
      });
    },
    onDeleteClicked(row) {
      new ComponentUtil(this.$store).create({
        cls: ConfirmModal,
        clsprops: {
          pVisible: true,
          pType: 'warn',
          pTitle: '确认信息',
          pContent: '确定要删除交易所%s吗？',
          pKeyWord: row.name
        },
        on: {
          confirm: () => {
            let jsonModel = {
              carbonEmissionTransactionPriceId: row.carbonEmissionTransactionPriceId,
              version: row.version
            }
            this.$apiUtil.getCarbonAssetManageApi().delete_transaction_price({ ...jsonModel }).then(() => {
              this.$refs.table.reload()
            })
          },
        },
      })
    },
    dealPrice(val) {
      if(val === '-') {
        return '0.00'
      }
      let newVal = val.toFixed(2).split('.')
      newVal[0] = Number(newVal[0]).toLocaleString()
      return newVal.join('.');
    },
  }
}
</script>
<style lang='less'>
@import 'variables.less';
.carbon-asset-manage .filter {
  .ant-col:first-child {
    .field {
      width: 398px;
    }
  }
  .ant-col:nth-child(2) {
    .label {
      width: 100px!important;
    }
  }
  .ant-calendar-picker {
    min-width: 150px!important;
  }
  .ant-select-selection--multiple {
    height: 36px;
    .ant-select-selection__rendered {
      height: 34px;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
@media screen and (max-width: @page-switch-width) {
  .carbon-asset-manage .filter {
    .ant-col:first-child {
      .field {
        width: 310px;
      }
    }
  }
}
</style>
