<template>
    <BaseTable
      ref="table"
      :pColumns="columns"
      :pRowCount="4"
      :pDataSource="dataSource"
      :pFilterFields="filterFields"
      :pFilterJsonModel="filterJsonModel"
      :pInlineActions="[
        { name: 'detail', title: '详情', toolbar: true, click: onDetailClicked },
        {
          name: 'order',
          title: '作废',
          click: onOrderClicked,
          visible: row => {
            return row.orderStatus === '0';
          }
        }
      ]"
      :pTotal="total"
      @change="onReload"
      @reset="onReset"
    >
      <span slot="effectiveStatusTitle">订单状态</span>
      <span slot="effectiveStatus" slot-scope="effectiveStatus">
        <template v-for="(item, index) in effectiveStatusTypes">
          <span :key="index" :style="'color: ' + item.color" v-if="item.key === effectiveStatus">{{ item.value }}</span>
        </template>
      </span>
      <span slot="orderTypeTitle" class="site-table-actions" style="width: 120px">
        类型
        <!-- 漏斗筛选 -->
        <head-filter :pMenuList="orderTypes" @click="onClickMenu" />
      </span>
      <span slot="orderTypeSlot" slot-scope="orderTypeSlot">
        <template v-for="(item, index) in orderTypes">
          <span :key="index" v-if="item.value === orderTypeSlot">{{ item.label }}</span>
        </template>
      </span>
      <span slot="orderStatusTitle" class="site-table-actions" style="width: 150px">
        支付状态
        <!-- 漏斗筛选 -->
        <head-filter :pMenuList="orderStatusTypes" @click="onClickPayMenu" />
      </span>
      <span slot="orderStatusSlot" slot-scope="orderStatusSlot">
        <template v-for="(item, index) in orderStatusTypes">
          <span :key="index" :style="'color: ' + item.color" v-if="item.value === orderStatusSlot">{{ item.label }}</span>
        </template>
      </span>
    </BaseTable>
</template>

<script>
/**
 * 客户列表
 * @vue-props {}
 * @vue-data {}
 * @vue-event {}
 */
import TableMixin from '@/components/table/TableMixin';
import OptionsMixin from '@/common/OptionsMixin';
import { ComponentUtil } from 'jscom/utils/vueutil';
import ConfirmModal from '@/components/ConfirmModal';
import moment from 'moment';
import HeadFilter from '@/components/table/HeadFilter';

export default {
  name: 'CustomOrder',

  mixins: [TableMixin, OptionsMixin],

  components: {
    HeadFilter
  },

  data() {
    const effectiveStatusTypes = [
      {
        key: '0',
        value: '未生效'
      },
      {
        key: '1',
        value: '已失效'
      },
      {
        key: '2',
        value: '生效中',
        color: 'red'
      }
    ];
    const orderTypes = [
      {
        value: 'all',
        label: '全部'
      },
      {
        value: '1',
        label: '新购'
      },
      {
        value: '2',
        label: '续费'
      },
      {
        value: '3',
        label: '升级'
      },
      {
        value: '4',
        label: '降级'
      },
      {
        value: '5',
        label: '退款'
      },
      {
        value: '6',
        label: '试用'
      },
    ];
    const orderStatusTypes = [
      {
        value: 'all',
        label: '全部'
      },
      {
        value: '0',
        label: '待支付',
        color: 'red'
      },
      {
        value: '1',
        label: '已支付'
      },
      {
        value: '2',
        label: '作废'
      }, {
        value: '3',
        label: '已退款'
      }
    ];
    return {
      moment,
      effectiveStatusTypes,
      orderTypes,
      orderStatusTypes,
      columns: [
        { title: '序号', key: 'index', sorter: false, primary: true },
        { title: '订单号', key: 'originalOrderId', sorter: false, align: 'center', ellipsis: true },
        { title: '产品', key: 'softwareModuleName', sorter: false, align: 'center' },
        {
          key: 'orderEffectiveStatus',
          slots: { title: 'effectiveStatusTitle' },
          scopedSlots: { customRender: 'effectiveStatus' },
          sorter: false,
          align: 'center'
        },
        {
          key: 'orderType',
          slots: { title: 'orderTypeTitle' },
          scopedSlots: { customRender: 'orderTypeSlot' },
          sorter: false,
          ellipsis: true,
          align: 'center',
          width: 130,
        },
        { title: '创建时间', key: 'createTime', sorter: false, nameField: true, ellipsis: true, align: 'center' },
        { title: '企业名称(客户)', key: 'companyName', sorter: false, align: 'center', ellipsis: true },
        {
          key: 'orderStatus',
          slots: { title: 'orderStatusTitle' },
          scopedSlots: { customRender: 'orderStatusSlot' },
          sorter: false,
          ellipsis: true,
          align: 'center',
          width: 180
        },
        {
          title: '官网价',
          key: 'softwareModulePrice',
          align: 'center',
          ellipsis: true,
          sorter: false,
          customRender: (value, row, index) => {
            return `¥${value}`;
          }
        }
      ],
      dataSource: [],
      filterJsonModel: {},
      filterFields: [
        { label: '订单号', type: 'str', name: 'orderId', placeholder: '请输入订单号', width: '100%' },
        { label: '时间', type: 'date', name: 'createDate', placeholder: '请选择创建时间', width: '100%' },
        {
          label: '产品',
          type: 'str',
          widget: 'SelectWidget',
          name: 'softwareModuleCode',
          options: [
            { label: '基础版', value: 'ELCC-01' },
            { label: '高级版', value: 'ELCC-02' }
          ],
          width: '100%'
        }
      ]
    };
  },

  created() {},

  methods: {
    onClickMenu(key) {
      this.filterJsonModel.orderType = key;
      this.$refs.table.reload();
    },
    onClickPayMenu(key) {
      this.filterJsonModel.orderStatus = key;
      this.$refs.table.reload();
    },
    /**
     * 加载数据
     * @param page
     * @param sortObj
     */
    onReload({ page, sortObj }) {
      let jsonModel = {
        ...this.filterJsonModel,
        ...page,
        company_id: this.$route.query.id
      };
      let api = this.$apiUtil.getEnterpriseApi();
      api.get_custom_customOrderList({ ...jsonModel, ...page, sortObj }).then(({ data }) => {
        this.setData(data);
      });
    },

    onReset() {
      this.filterJsonModel.orderType = 'all';
      this.filterJsonModel.orderStatus = 'all';
      this.$refs.table.reload();
    },

    /**
     * 查看点击
     * @param row
     */
    onDetailClicked(row) {
      this.$router.push({
        path: '/manager/orderManage/detail',
        query: {
          orderId: row.customerOrderId,
          companyId: this.$route.query.id
        }
      });
    },
    onOrderClicked(row) {
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
            let api = this.$apiUtil.getEnterpriseApi();
            api
              .cancelCustomOrder({ companyId: this.$route.query.id, ...row })
              .then(data => {
                this.$refs.table.reload();
              })
              .finally(() => {});
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.site-table-actions {
  margin-left: -16px;
  display: inline-block;
  position: relative;
}
</style>
