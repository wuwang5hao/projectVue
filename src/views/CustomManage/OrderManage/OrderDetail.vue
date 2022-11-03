<template>
  <div class="order-detail">
    <a-card :bordered="false">
      <div class="detail-header-btns">
        <AButton
          v-if="Number(orderDetail.orderStatus) === 0 && (orderDetail.orderType == 1 || orderDetail.orderType == 6)"
          type="primary"
          @click="confirmPayment"
          >确认支付</AButton
        >
        <AButton
          v-if="
            Number(orderDetail.orderStatus) === 1 && moment(new Date()).diff(moment(orderDetail.activeEnd), 'days') < 30
          "
          type="primary"
          @click="onOrderTyeChange"
          >订单类型变更</AButton
        >
      </div>
      <div class="order-detail-content">
        <a-descriptions :column="2">
          <a-descriptions-item :span="2">
            <template v-solt:label>
              <span class="order-detail-content-label"> 订单号： </span>
            </template>
            {{ orderDetail.originalOrderId || '-' }}
          </a-descriptions-item>
          <a-descriptions-item :span="2">
            <template v-solt:label>
              <span class="order-detail-content-label"> 支付状态： </span>
            </template>
            <span v-if="orderDetail.orderStatus">
              <span v-if="Number(orderDetail.orderStatus) === 0">
                <span class="price">¥{{ orderDetail.orderPayAmount }}<span>待支付</span></span>
                <a-button type="link" @click="changePrice">
                  更改价格
                </a-button>
              </span>
              <template v-for="(item, index) in consts.orderStatusList" v-else>
                <span :key="index" v-if="item.value === Number(orderDetail.orderStatus)">{{ item.label }}</span>
              </template>
            </span>
            <span v-else>-</span>
          </a-descriptions-item>
          <a-descriptions-item :span="2">
            <template v-solt:label>
              <span class="order-detail-content-label"> 起止时间（UCT+8）： </span>
            </template>
            {{ orderDetail.activeStart ? moment(orderDetail.activeStart).format('YYYY-MM-DD') : '-' }}
            至
            {{ orderDetail.activeEnd ? moment(orderDetail.activeEnd).format('YYYY-MM-DD') : '-' }}
          </a-descriptions-item>
          <a-descriptions-item>
            <template v-solt:label>
              <span class="order-detail-content-label"> 创建时间（UCT+8）： </span>
            </template>
            {{ orderDetail.createTime ? moment(orderDetail.createTime).format('YYYY-MM-DD HH:mm:ss') : '-' }}
          </a-descriptions-item>
          <a-descriptions-item>
            <template v-solt:label>
              <span class="order-detail-content-label"> 支付时间（UCT+8）： </span>
            </template>
            {{ orderDetail.payTime ? moment(orderDetail.payTime).format('YYYY-MM-DD HH:mm:ss') : '-' }}
          </a-descriptions-item>
          <a-descriptions-item>
            <template v-solt:label>
              <span class="order-detail-content-label"> 订单类型： </span>
            </template>
            <template v-for="(item, index) in consts.orderTypes">
              <span :key="index" v-if="item.value == orderDetail.orderType">{{ item.label }}</span>
            </template>
          </a-descriptions-item>
          <a-descriptions-item>
            <template v-solt:label>
              <span class="order-detail-content-label" v-if="orderDetail.softwareModuleCode === 'ELCC-03'">
                产品信息编号：
              </span>
              <span class="order-detail-content-label" v-else> 场地（实例）： </span>
            </template>
            <span v-if="orderDetail.softwareModuleCode === 'ELCC-03'">{{
              orderDetail.carbonFootprintSerialNumber || '-'
            }}</span>
            <span v-else>{{ orderDetail.customerOrganizationName || '-' }}</span>
          </a-descriptions-item>
        </a-descriptions>
        <div class="order-detail-content-desc">
          <span class="order-detail-content-label">备注：</span>
          <a-textarea
            placeholder="请输入内容（运维自行备注，不做限制，可随时更改）"
            allow-clear
            :rows="4"
            :value="comment"
            @change="onTextChange"
            class="order-detail-content-textarea"
          />
          <a-button class="order-detail-content-save" type="link" @click="onSave">保存</a-button>
        </div>
      </div>
      <h3>订单详情</h3>
      <a-table
        class="detail-table"
        :columns="columns"
        :data-source="dataSource"
        ref="table"
        :pagination="false"
        bordered
        :rowKey="(list, index) => index"
      >
      </a-table>

      <template v-if="Number(orderDetail.orderStatus) !== 0 && Number(orderDetail.orderStatus) !== 2">
        <h3>支付详情</h3>
        <a-table
          class="detail-table"
          :columns="payColumns"
          :data-source="payDataSource || []"
          ref="table"
          :pagination="false"
          bordered
          :rowKey="(list, index) => index"
        >
        </a-table>
      </template>

      <template v-if="customerOrderHistory">
        <h3 class="record">
          <a-icon type="snippets" theme="twoTone" />
          订单历史交易记录
          <a-divider class="record-divider" />
        </h3>
        <a-timeline style="padding-left: 24px">
          <a-timeline-item v-for="(item, index) in customerOrderHistory" :key="index">
            <span v-if="item.createTime"> {{ moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') || '--' }} </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span v-if="item.orderType"> {{ item.comment }}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>操作人：{{ item.createUserName || '--' }}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>流水编号：{{ item.transactionNumber || '--' }}</span>
          </a-timeline-item>
        </a-timeline>
      </template>
    </a-card>
  </div>
</template>

<script>
import consts from '@/common/consts';
import moment from 'moment';
import { mapGetters, mapState } from 'vuex';
import { ComponentUtil, formartPrice, formatterData } from 'jscom/utils/vueutil';
// import ModifyInformation from './ModifyInformation';
import ConfirmPaymentOrderModal from './ ConfirmPaymentOrderModal';
import EditOrderypeModal from './EditOrderypeModal';
import EditPrice from './EditPrice';

export default {
  name: 'OrderDetail',
  components: {},

  data() {
    const columns = [
      { title: '产品', dataIndex: 'softwareName', align: 'center', nameField: true },
      {
        title: '具体配置',
        dataIndex: 'config',
        align: 'center',
        ellipsis: true,
        customRender: (value, record, index) => {
          return (
            <div class="config-text">
              <p class="config-item">D碳云服务规格：{record.softwareModuleName}</p>
              {record.softwareModuleCode === 'ELCC-01' && (
                <p class="config-item">场地数量：{record.softwareModuleStationNumber}</p>
              )}
              {record.softwareModuleCode === 'ELCC-02' && (
                <div>
                  <p class="config-item">测点数量：{record.softwareModuleMeasurePointNumber}</p>
                  <p class="config-item">场地数量：{record.softwareModuleStationNumber}</p>
                </div>
              )}
              {record.softwareModuleCode === 'ELCC-03' && (
                <p class="config-item">产品数量：{record.carbonFootprintProductNumber}</p>
              )}
            </div>
          );
        }
      },
      { title: '付款方式', dataIndex: 'type', align: 'center', ellipsis: true },
      {
        title: '时长',
        dataIndex: 'softwareModuleOrderMonthNumber',
        align: 'center',
        ellipsis: true,
        customRender: (value, record) => {
          if (record.tryOutOrderDays) {
            return `${record.tryOutOrderDays}天`;
          }
          return `1年`;
        }
      },
      { title: '数量', dataIndex: 'num', align: 'center', ellipsis: true },
      {
        title: '官网价',
        dataIndex: 'softwareModulePrice',
        align: 'center',
        ellipsis: true,
        customRender: (value, record, index) => {
          return (
            <div class="config-text">
              <p>
                配置费用：<span style="color: #F59A23;">¥{this.formatterData(value)}</span>
              </p>
            </div>
          );
        }
      }
    ];
    const payColumns = [
      {
        title: '支付方式',
        dataIndex: 'wayToPay',
        align: 'center',
        nameField: true,
        customRender: (value, record, index) => {
          const newVal = consts.wayToPays[value];
          return newVal || '-';
        }
      },
      {
        title: '实付价',
        dataIndex: 'orderPayAmount',
        align: 'center',
        ellipsis: true,
        customRender: (value, record, index) => (
          <div class="config-text">
            <span style="color: #F59A23;">¥{this.formatterData(value)}</span>
          </div>
        )
      },
      {
        title: '有效期',
        dataIndex: 'activeDayDisplay',
        align: 'center',
        ellipsis: true,
      },
      {
        title: '扣款时间',
        dataIndex: 'payTime',
        align: 'center',
        scopedSlots: { customRender: 'payTime' },
        ellipsis: true,
        customRender: value => `${value && value !== '-' ? moment(value).format('YYYY-MM-DD HH:mm:ss') : ''}`
      },
      { title: '流水编号', dataIndex: 'transactionNumber', align: 'center', ellipsis: true },
      {
        title: '支付账号',
        dataIndex: 'payAccount',
        align: 'center',
        ellipsis: true
      },
      {
        title: '购买渠道',
        dataIndex: 'channelName',
        align: 'center',
        ellipsis: true
      }
    ];
    return {
      consts,
      moment,
      orderId: '',
      orderDetail: {},
      columns,
      dataSource: [],
      payColumns,
      payDataSource: [],
      formatterData,
      customerOrderHistory: [],
      comment: ''
    };
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    const orderId = this.$route.query.orderId;
    if (!orderId) {
      this.$router.back();
    }
    this.orderId = orderId;
    this.getOrderDetail();
  },
  methods: {
    onSave() {
      // if (!this.comment) return;
      let api = this.$apiUtil.getSoftwareServiceApi();
      api
        .edit_orider_comment({
          customer_order_id: this.$route.query.orderId,
          companyId: this.$route.query.companyId,
          comment: this.comment,
          version: this.orderDetail.version
        })
        .then(({ data, resultCode }) => {
          this.orderDetail.version = data.version;
          if (resultCode === 0) {
            this.$message.success('保存成功');
          }
        })
        .finally(() => {});
    },
    onTextChange(e) {
      this.comment = e.target.value;
    },
    getOrderDetail() {
      const customer_order_id = this.orderId;
      const companyId = this.$route.query.companyId;
      let api = this.$apiUtil.getSoftwareServiceApi();
      api
        .get_order_detail({ customer_order_id, companyId })
        .then(({ data }) => {
          this.orderDetail = data;
          this.dataSource = [
            {
              ...data,
              type: '包年',
              num: '1'
            }
          ];
          this.payDataSource = data.customerOrderPayInfo;
          this.customerOrderHistory = data.customerOrderHistory;
          this.comment = data.comment;
        })
        .finally(() => {});
    },
    confirmPayment() {
      new ComponentUtil(this.$store, this.$router).create({
        cls: ConfirmPaymentOrderModal,
        clsprops: {
          pVisible: true,
          pVersion: this.orderDetail.version,
          pPayAmount: this.orderDetail.orderPayAmount
        },
        on: {
          success: () => {
            const orderId = this.$route.query.orderId;
            const companyId = this.$route.query.companyId;
            this.getOrderDetail(orderId, companyId);
          }
        }
      });
    },
    /**
     * 订单类型变更
     */
    onOrderTyeChange() {
      this.editOrderypeModal = new ComponentUtil(this.$store, this.$router).create({
        cls: EditOrderypeModal,
        clsprops: {
          pVisible: true,
          PCustomerOrganizationName: this.orderDetail.customerOrganizationName,
          PCustomerOrganizationId: this.orderDetail.customerOrganizationId,
          pActiveStart: this.orderDetail.activeStart,
          pActiveEnd: this.orderDetail.activeEnd,
          PSoftwareModuleName: this.orderDetail.softwareModuleName,
          pOrderEffectiveStatus: this.orderDetail.orderEffectiveStatus
        },
        on: {
          success: () => {
            // this.getOrderDetail();
          },
          cancel: () => {}
        }
      });
    },
    changePrice() {
      this.editPrice = new ComponentUtil(this.$store, this.$router).create({
        cls: EditPrice,
        clsprops: {
          pVisible: true,
          pCompanyId: this.$route.query.companyId,
          pOrderDetail: this.orderDetail
        },
        on: {
          success: () => {
            this.getOrderDetail();
          },
          cancel: () => {}
        }
      });
    }
  },
  beforeDestroy() {
    this.editOrderypeModal && (this.editOrderypeModal.$children[0].visible = false);
    this.editPrice && (this.editPrice.$children[0].visible = false);
  }
};
</script>

<style lang="less" scoped>
@import 'variables.less';
.order-detail {
  width: 100%;
  color: #333;
  padding: 16px;
  .detail-header-btns {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
  &:after {
    content: '';
    display: table;
    clear: both;
  }
  h3 {
    margin: 60px 0 30px;
  }
  .record {
    display: flex;
    align-items: center;
    .record-divider {
      margin-left: 16px;
      flex: 1;
      min-width: 0;
      height: 2px;
    }
  }
  .order-detail-content {
    background: #f4f4f4;
    padding: 20px 30px;
    &-label {
      width: 145px;
      text-align: right;
      display: inline-block;
      color: #666;
    }
    &-desc {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      width: 73%;
    }
    &-textarea {
      width: calc(100% - 145px);
      height: 100px;
      /deep/.ant-input {
        resize: none;
      }
    }
    &-save {
      position: absolute;
      bottom: -5px;
      right: -5px;
      &:hover {
        opacity: 0.7;
      }
    }
    .ant-descriptions-item {
      height: 48px;
      line-height: 48px;
      padding-bottom: 0;
    }
    // .ant-descriptions-item-label {
    //   width: 140px;
    //   color: #999999;
    //   text-align: right;
    // }
    /deep/.ant-descriptions-item-content {
      color: #333;
      .price {
        display: inline-block;
        color: #f59a23;
        span {
          margin-left: 20px;
        }
      }
      // .ant-btn {
      //   background: #ee722e;
      //   border: none;
      // }
    }
  }
  .detail-table {
    border-bottom: 1px solid #e8e8e8;
  }
  .ant-table table {
    // border-bottom: 1px solid #e8e8e8;
    // font-size: 16px;
    // margin-bottom: 30px;
    .config-text {
      p {
        margin-bottom: 0;
      }
    }
  }
}
</style>
