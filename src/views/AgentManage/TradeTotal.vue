<template>
  <div class="tarde">
    <div class="tradeTable">
      <BaseTable
        ref="table"
        class="agent-total"
        :pRowCount="3"
        :pTotal="total"
        :pColumns="columns"
        :pScrollX="900"
        :pDataSource="dataSource"
        :pFilterJsonModel="filterJsonModel"
        :pFilterFields="filterFields"
        :pSelections="selections"
        :pInlineActions="[
          { name: 'url', title: '订单详情', toolbar: true, click: onOrderDetailClicked },
          { name: 'detail', title: '客户详情', click: onCustomDetailClicked }
        ]"
        :pActions="[{ name: 'add', title: '导出', type: 'primary', click: onExport, disabled: !dataSource.length }]"
        @change="onReload"
        @reset="onReset"
      >
      </BaseTable>
    </div>
    <div class="totalNum">
      <span class="totalNum-left"
        >统计<span class="totalNum-left-contentStyle"
          >（筛选出条数/总条数）{{ selectNumber }} / {{ this.total }}</span
        ></span
      >
      <span class="totalNum-right">
        实付款总计（人民币元）
        <span v-if="realPayAccount > 0" class="totalNum-right-number1"> + </span>
        <!-- <span v-if="realPayAccount < 0" class="totalNum-right-number1"> - </span> -->
        <span class="totalNum-right-number1 rightStryle">
          {{ formartPrice(realPayAccount) }}
        </span>
        <span style="padding-left: 25px">
          结算金额总计（人民币元）
          <span v-if="settleAccount > 0" class="totalNum-right-number2"> + </span>
          <span v-if="settleAccount < 0" class="totalNum-right-number2"> - </span>
          <span class="totalNum-right-number2">
            {{ formartPrice(Math.abs(settleAccount)) }}
          </span>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import OptionsMixin from '@/common/OptionsMixin';
import TableMixin from '@/components/table/TableMixin';
import moment from 'moment';
import HeadFilter from '@/components/table/HeadFilter';
import { formartPrice } from 'jscom/utils/vueutil';

export default {
  name: 'TradeTotal',
  mixins: [TableMixin, OptionsMixin],
  components: {
    HeadFilter
  },

  computed: {
    // 实付款总额
    realPayAccount() {
      let realMoney = 0;
      console.log('dddd', this.selections, this.allCount);
      // 全选
      if (this.selections.length === this.allCount || this.selections.length === 0) {
        return this.realPay;
      }
      // 全不选
      // if (this.selections.length === 0) {
      //   return this.realPay;
      // }
      if (this.selections.length > 0 && this.selections.length < this.allCount) {
        realMoney = this.selections.reduce((total, curValue) => {
          if (typeof curValue.orderPayAmount === 'string') {
            return total + 0;
          }
          return total + curValue.orderPayAmount;
        }, 0);
      }
      return realMoney || 0;
    },

    // 结算总额
    settleAccount() {
      let settleMoney = 0;
      // 全选
      if (this.selections.length === this.allCount || this.selections.length === 0) {
        return this.settlePay;
      }
      if (this.selections.length > 0 && this.selections.length < this.allCount) {
        settleMoney = this.selections.reduce((total, curValue) => {
          if (typeof curValue.endAmount === 'string') {
            return total + 0;
          }
          return total + curValue.endAmount;
        }, 0);
      }
      return settleMoney || 0;
    },

    // 筛选条数
    selectNumber() {
      return this.selections.length;
    }
  },

  data() {
    return {
      formartPrice,
      columns: [
        { title: '序号', key: 'index', primary: true, width: 50, fixed: 'left' },
        {
          title: '代理商ID',
          key: 'saleAgentId',
          ellipsis: true,
          align: 'center',
          sorter: false,
          width: 150
        },
        {
          title: '代理商企业名称',
          key: 'saleAgentCompanyName',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150
        },
        {
          title: '客户企业ID',
          key: 'companyId',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150
        },
        {
          title: '客户企业名称',
          key: 'companyName',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150
        },
        {
          title: '订单号',
          key: 'customerOrderId',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150
        },
        {
          title: '购买产品',
          key: 'softwareModuleName',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150
        },
        {
          title: '流水编号',
          key: 'transactionNumber',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150
        },
        {
          title: '支付时间',
          key: 'payTime',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150,
          customRender: value => `${value && value !== '-' ? moment(value).format('YYYY-MM-DD HH:MM:SS') : ''}`
        },
        {
          title: '代理价',
          key: 'agentAmount',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150,
          customRender: (value, row, index) => {
            return `¥ ${this.priceFormate(value)}`;
          }
        },
        {
          title: '实付价',
          key: 'orderPayAmount',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150,
          customRender: (value, row, index) => {
            return `¥ ${this.priceFormate(value)}`;
          }
        },
        {
          title: '结算金额',
          key: 'endAmount',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150,
          customRender: (value, row, index) => {
            return `¥ ${this.priceFormate(value)}`;
          }
        }
      ],
      filterFields: [
        {
          label: '代理商名称',
          type: 'str',
          name: 'saleAgentKey',
          placeholder: '请输入代理商ID或名称'
        },
        {
          label: '客户企业名称',
          type: 'str',
          name: 'companyKey',
          placeholder: '请输入企业ID或名称'
        },
        {
          label: '订单号',
          type: 'str',
          name: 'orderNumber',
          placeholder: '请输入订单号'
        },
        {
          label: '支付时间',
          type: 'date_range',
          widget: 'DateRangeWidgetTwo',
          name: 'dateRange'
        }
      ],
      dataSource: [],
      total: 0,
      curPageNum: 1,
      selections: [],
      exportPage: {}, // 导出所需page
      realPay: 0, // 实付款总额
      settlePay: 0, // 结算总额
      allCount: 0 // 全选总条数
    };
  },
  methods: {
    onReload({ page, sortObj }) {
      let api = this.$apiUtil.getAgentApi();
      api.getAgentOrderTotal({ ...this.filterJsonModel, ...page, sortObj }).then(({ data }) => {
        // this.dataSource = data
        this.exportPage = { ...page };
        this.realPay = data.payAccount;
        this.settlePay = data.endAccount;
        this.allCount = data.allCount;
        this.selections = [];
        this.setData(data);
      });
    },
    // 转换价格
    priceFormate(value) {
      if (value === '-') {
        console.log('222', typeof value);
        return '0.00';
      }
      if (typeof value === 'number') {
        return value.toFixed(2);
      }
      return '0.00';
    },
    // 点击订单详情
    onOrderDetailClicked(record) {
      this.$router.push({
        path: `/manager/orderManage/detail`,
        query: { orderId: record.lastOrderId, companyId: record.companyId }
      });
    },
    // 点击客户详情
    onCustomDetailClicked(record) {
      this.$router.push({
        path: `/manager/customManage/customList/customBasicInfo`,
        query: { id: record.companyId }
      });
    },
    // 点击导出
    onExport() {
      let idsList = this.selections.map(item => {
        return item.id;
      });
      this.$apiUtil
        .getAgentApi()
        .export_detail_list_agent({
          ...this.exportPage,
          ...this.filterJsonModel,
          exportIdList: idsList
        })
        .then();
    },
    onReset() {
      console.log('onDetailClicked');
    }
  }
};
</script>

<style lang="less" scoped>
.site-table-actions {
  margin-left: -16px;
  display: inline-block;
  position: relative;
}
.tarde {
  background: #ffffff;
  margin: 0px 24px;
  height: 730px;
  .tradeTable {
    height: calc(100% - 50px);
    .container {
      height: calc(100% - 85px);
      .table .tp-page {
        margin-top: 25px !important;
      }
      .table .ant-table-wrapper {
        .ant-table-scroll .ant-table-body {
          max-height: 350px;
        }
        .ant-table-fixed-left .ant-table-body-inner {
          max-height: 350px;
        }
        .ant-table-body-outer .ant-table-body-inner {
          max-height: 350px;
        }
      }
    }
  }
  /deep/.agent-total {
    .filter .ant-col:nth-child(1) .sw-field .ant-calendar-picker {
      min-width: auto !important;
    }
    .filter .ant-col:nth-child(1) .label {
      width: 74px !important;
    }
    .filter .ant-col:nth-child(2) .label {
      width: 90px !important;
    }
  }
}
.totalNum {
  height: 50px;
  line-height: 24px;
  margin-left: 16px;
  padding-top: 16px;
  font-size: 16px;
  color: #181818;
  // background: #ffffff;
  &-left {
    height: 16px;
    &-contentStyle {
      font-size: 14px;
      color: #666666;
    }
  }
  &-right {
    height: 25px;
    float: right;
    margin-right: 45px;
    &-number1 {
      font-size: 24px;
      color: #ff6a00;
    }
    &-number2 {
      font-size: 24px;
      color: #e01515;
    }
  }
}

.rightStryle {
  padding-right: 25px;
  border-right: 2px solid #999999;
}
</style>
