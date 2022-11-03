<template>
  <!-- <div class="orderManage"> -->
    <BaseTable
      :pActions="[{ name: 'add', title: '新增', type: 'primary', click: onAddClicked }]"
      :pColumns="columns"
      :pDataSource="dataSource"
      :pFilterFields="filterFields"
      :pRowCount="5"
      :pFilterJsonModel="filterJsonModel"
      :pInlineActions="[
        { name: 'detail', title: '详情', toolbar: true, click: this.onClickDetail },
        {
          name: 'cancel',
          title: '作废',
          toolbar: true,
          click: this.cancelOrder,
          visible: row => {
            return !Number(row.orderStatus);
          }
        }
      ]"
      :pTotal="total"
      @change="onReload"
      @reset="onReset"
      :pPageSize="pageSize"
      :pPageNum="pageNum"
      ref="table"
      :pScrollX="1400"
    >
      <span slot="orderTypeTitle" class="site-tbale-actions" style="width:130px;">
        类型
        <a-popover overlayClassName="site-table-tips" placement="topLeft">
          <template slot="content">
            <h3>说明</h3>
            <div class="tips-text">
              新购：用户采购或开通某种产品或者服务<br />
              续费：用户通过付费延长资源的有效使用时长<br />
              升级：用户付费在有效期内提升产品规格、功能或者服务<br />
              降级：用户在有效期内主动降低产品或者服务的配置<br />
              退款：用户发起释放资源并按情况退还相应的费用
            </div>
          </template>
          <a-icon style="margin-left: 5px" type="question-circle" />
        </a-popover>
        <!-- 漏斗筛选 -->
        <head-filter
          :pMenuList="[{ value: '', label: '全部' }, ...consts.orderTypes]"
          @click="key => onClickMenu(key, 'orderType')"
        />
      </span>
      <span slot="orderStatusTitle" class="site-tbale-actions" style="width:180px">
        支付状态
        <a-popover overlayClassName="site-table-tips" placement="topLeft">
          <template slot="content">
            <h3>说明</h3>
            <div class="tips-text">
              作废：订单由于支付超时或主动关闭，变更为无效状态<br />
              未支付：订单创建完成，但并未完成支付，资源不会执行生产<br />
              已支付：订单创建并支付完成，订单状态完结，后续会执行生产动作(若有)
            </div>
          </template>
          <a-icon style="margin-left: 5px" type="question-circle" />
        </a-popover>
        <!-- 漏斗筛选 -->
        <head-filter
          :pMenuList="[{ value: '', label: '全部' }, ...consts.orderStatusList]"
          @click="key => onClickMenu(key, 'orderStatus')"
        />
      </span>
      <span slot="moduleName" slot-scope="moduleName, record">
        <span>{{ record.orderDetailList[0].moduleName }}</span>
      </span>

      <template slot="orderEffectiveStatus" slot-scope="orderEffectiveStatus">
        <template v-for="(item, index) in consts.orderEffectiveStatus">
          <a-button
            type="link"
            style="cursor:inherit"
            :class="orderEffectiveStatus != '2' && 'btn'"
            :key="index"
            v-if="item.value == orderEffectiveStatus"
            >{{ item.label }}</a-button
          >
        </template>
      </template>
      <template slot="orderStatus" slot-scope="orderStatus">
        <template v-for="(item, index) in consts.orderStatusList">
          <a-button
            type="link"
            style="cursor:inherit"
            :class="orderStatus != '0' && 'btn'"
            :key="index"
            v-if="item.value == orderStatus"
            >{{ item.label }}</a-button
          >
        </template>
      </template>
    </BaseTable>
  <!-- </div> -->
</template>

<script>
import consts from '@/common/consts';
import OptionsMixin from '@/common/OptionsMixin';
import TableMixin from '@/components/table/TableMixin';
import HeadFilter from '@/components/table/HeadFilter';

import ConfirmModal from '@/components/ConfirmModal';
import { ComponentUtil } from 'jscom/utils/vueutil';
import { mapGetters, mapState } from 'vuex';
import moment from 'moment';
import AddOrderModal from './AddOrderModal';

export default {
  name: 'OrderManage',
  mixins: [TableMixin, OptionsMixin],
  components: {
    HeadFilter
  },

  data() {
    const columns = [
      { title: '序号', key: 'index', align: 'center', primary: true, width: 80, fixed: 'left' },
      {
        title: '订单号',
        key: 'originalOrderId',
        align: 'center',
        width: 150,
        ellipsis: true,
        sorter: false,
        fixed: 'left'
      },
      {
        title: '产品',
        key: 'softwareModuleName',
        align: 'center',
        scopedSlots: { customRender: 'softwareModuleName' },
        ellipsis: true,
        sorter: false
        // width: 100
      },
      {
        title: '订单状态',
        key: 'orderEffectiveStatus',
        align: 'center',
        scopedSlots: { customRender: 'orderEffectiveStatus' },
        // width: 110,
        ellipsis: true,
        sorter: false
      },
      {
        key: 'orderType',
        align: 'center',
        slots: { title: 'orderTypeTitle' },
        ellipsis: true,
        sorter: false,
        width: 130,
        customRender: (value, row, index) => {
          const val = consts.orderTypes.find(item => item.value === value)?.label;
          return val || '-';
        }
      },
      { title: '创建时间', key: 'createTime', align: 'center', sorter: false, ellipsis: true },
      { title: '企业名称（用户）', key: 'companyName', align: 'center', sorter: false, ellipsis: true, width: 180 },
      {
        key: 'orderStatus',
        align: 'center',
        slots: { title: 'orderStatusTitle' },
        scopedSlots: { customRender: 'orderStatus' },
        ellipsis: true,
        sorter: false,
        width: 180
      },
      {
        title: '官网价',
        key: 'orderAmount',
        align: 'center',
        ellipsis: true,
        sorter: false,
        // width: 150,
        customRender: (value, row, index) => {
          return `¥${value}`;
        }
      }
    ];
    const dataSource = [];
    return {
      moment,
      consts,
      columns,
      dataSource,
      pageSize: 10,
      pageNum: 0,
      filterFields: [
        { label: '订单号', type: 'str', required: true, name: 'id', placeholder: '请输入订单号', width: '100%' },
        {
          label: '企业名称',
          type: 'str',
          required: true,
          name: 'companyName',
          placeholder: '请输入企业名称（用户）',
          width: '100%'
        },
        { label: '时间', type: 'date', name: 'createDate', placeholder: '请选择创建时间', width: '100%' }
      ],
      filterJsonModel: {
        orderType: '',
        orderStatus: ''
      },
      customerOrganizationName: '',
      isReadonly: false,
      defaultDetail: {},
      selectKey: null,
    };
  },
  computed: {
    ...mapState(['userInfo']),
  },
  created() {},
  mounted() {
    // this.onReload();
  },
  methods: {
    onClickMenu(key, type) {
      if (type === 'orderType') {
        this.filterJsonModel.orderType = key;
      }
      if (type === 'orderStatus') {
        this.filterJsonModel.orderStatus = key;
      }
      this.$refs.table.reload();
    },
    /**
     * 添加点击报告
     */
    onAddClicked() {
      new ComponentUtil(this.$store, this.$router).create({
        cls: AddOrderModal,
        clsprops: {
          pVisible: true,
        },
        on: {
          success: () => {
            this.$refs.table.reload();
          }
        }
      });
    },
    onReload({ page, filters, sorter }) {
      let api = this.$apiUtil.getSoftwareServiceApi();
      api
        .get_orders({ ...this.filterJsonModel, ...page, companyId: this.$route.query.id })
        .then(({ data }) => {
          this.setData(data);
        })
        .finally(() => {});
    },
    offlinePayment(row) {
      new ComponentUtil(this.$store).create({
        cls: ConfirmModal,
        clsprops: {
          pVisible: true,
          pType: 'warn',
          pTitle: '确认线下支付',
          pContent: '是否确认已线下支付'
        },
        on: {
          confirm: () => {
            const companyId = this.userInfo.companyId;
            let api = this.$apiUtil.getSoftwareServiceApi();
            api
              .put_offline_payment_order({ customerOrderId: row.id, ...row })
              .then(data => {
                this.$refs.table.reload();
              })
              .finally(() => {});
          }
        }
      });
    },
    cancelOrder(row) {
      new ComponentUtil(this.$store).create({
        cls: ConfirmModal,
        clsprops: {
          pVisible: true,
          pType: 'warn',
          pTitle: '作废订单',
          pContent: '是否确认作废'
        },
        on: {
          confirm: () => {
            let api = this.$apiUtil.getSoftwareServiceApi();
            api
              .cancel_customer_order({ customer_order_id: row.id, companyId: row.companyId, version: row.version })
              .then(data => {
                this.$refs.table.reload();
              })
              .finally(() => {});
          }
        }
      });
    },

    onClickDetail(row) {
      this.$router.push({
        path: '/manager/orderManage/detail',
        query: {
          orderId: row.id,
          companyId: row.companyId
        }
      });
    },
    onReset() {
      // this.filterJsonModel.orderType = '';
      // this.filterJsonModel.orderStatus = '';
      this.$refs.table.reload();
    }
  }
};
</script>

<style lang="less">
// .orderManage {
  // height: 100%;
  /deep/.inline-action {
    width: 180px;
  }
// }

.btn {
  color: #333;
}
.site-tbale-actions {
  margin-left: -16px;
  display: inline-block;
  position: relative;
}
.site-table-tips {
  h3 {
    margin-bottom: 4px;
  }
  .tips-text {
    color: #999;
    line-height: 26px;
  }
}
</style>
