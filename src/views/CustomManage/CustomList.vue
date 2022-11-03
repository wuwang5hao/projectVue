<template>
  <BaseTable
    ref="table"
    :pColumns="columns"
    :pRowCount="4"
    :pDataSource="dataSource"
    :pFilterFields="filterFields"
    :pFilterJsonModel="filterJsonModel"
    :pInlineActions="[
      { name: 'detail', title: '企业详情', toolbar: true, click: onDetailClicked },
      { name: 'order', title: '企业订单', toolbar: true, click: onOrderClicked }
    ]"
    :pActions="[
      // {name: 'add', title: '添加', type: 'primary', click: onAddClicked},
    ]"
    :pTotal="total"
    @change="onReload"
    @reset="onReset"
  >
    <span slot="statusTypeTitle" class="site-table-actions" style="width: 150px">
      审核状态
      <!-- 漏斗筛选 -->
      <head-filter :pMenuList="statusTypes" @click="key => onClickMenu(key)" />
    </span>
    <span slot="statusType" slot-scope="statusType">
      <template v-for="(item, index) in statusTypes">
        <span :key="index" :style="'color: ' + item.color" v-if="item.value === statusType">{{ item.label }}</span>
      </template>
    </span>
    <span slot="agentStatus" slot-scope="agentStatus">
      {{ agentStatus === '1' ? '代理中' : '-' }}
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
import moment from 'moment';
import HeadFilter from '@/components/table/HeadFilter';

export default {
  name: 'CustomList',

  mixins: [TableMixin, OptionsMixin],

  components: {
    HeadFilter
  },

  data() {
    const statusTypes = [
      {
        value: 'all',
        label: '全部'
      },
      {
        value: '0',
        label: '待审核',
        // color: '#ff791a'
        color: 'red'
      },
      {
        value: '1',
        label: '审核通过'
      },
      {
        value: '2',
        label: '审核驳回'
      }
      // {
      //   value: '4',
      //   label: '未认证'
      // }
    ];

    return {
      moment,
      statusTypes,
      columns: [
        { title: '序号', key: 'index', sorter: false, primary: true },
        {
          title: '企业ID',
          key: 'id',
          sorter: false,
          align: 'center'
        },
        { title: '企业名称', key: 'name', sorter: false, align: 'center' },
        { title: '注册日期', key: 'createTime', sorter: false, nameField: true, ellipsis: true, align: 'center' },
        {
          key: 'appraiseStatus',
          align: 'center',
          slots: { title: 'statusTypeTitle' },
          scopedSlots: { customRender: 'statusType' },
          sorter: false,
          ellipsis: true
        },
        { title: '客户渠道', key: 'saleAgentName', sorter: false, align: 'center' },
        {
          title: '代理状态',
          key: 'agentStatus',
          scopedSlots: { customRender: 'agentStatus' },
          sorter: false,
          align: 'center'
        }
      ],
      dataSource: [],
      filterJsonModel: {saleAgentName: ''},
      filterFields: [
        { label: '企业', type: 'str', name: 'companyKey', placeholder: '请输入企业ID/企业名称', width: '100%' },
        { label: '客户渠道', type: 'str', name: 'saleAgentName', placeholder: '请输入代理商名称', width: '100%' }
      ]
    };
  },

  created() {
    const saleAgentName = this.$route.params.saleAgentName;
    console.log(this.$route);
    if (saleAgentName) {
      this.filterJsonModel.saleAgentName = saleAgentName;
    }
  },

  methods: {
    onClickMenu(key) {
      this.filterJsonModel.appraiseStatus = key;
      this.$refs.table.reload();
    },
    /**
     * 加载数据
     * @param page
     * @param sortObj
     */
    onReload({ page, sortObj }) {
      let api = this.$apiUtil.getEnterpriseApi();
      console.log('dddd5', this.filterJsonModel);
      api.get_custom_customList({ ...this.filterJsonModel, ...page, sortObj }).then(({ data }) => {
        this.setData(data);
      });
    },

    onReset() {
      this.filterJsonModel.saleAgentName = '';
    },

    /**
     * 查看点击
     * @param row
     */
    onDetailClicked(row) {
      this.$router.push({ path: `/manager/customManage/customList/customBasicInfo/`, query: { id: row.id } });
    },

    onOrderClicked(row) {
      this.$router.push({ path: `/manager/customManage/customList/customOrder/`, query: { id: row.id } });
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
