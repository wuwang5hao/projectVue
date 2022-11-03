<template>
  <BaseTable
    ref="table"
    class="agent-list"
    :pRowCount="4"
    :pTotal="total"
    :pColumns="columns"
    :pScrollX="900"
    :pDataSource="dataSource"
    :pFilterJsonModel="filterJsonModel"
    :pFilterFields="filterFields"
    :pInlineActions="[
      {
        name: 'url',
        title: '专属链接',
        toolbar: true,
        click: onUrlClicked,
        visible: row => {
          return row.contractStatus === '0';
        }
      },
      { name: 'detail', title: '详情', click: onDetailClicked }
    ]"
    :pActions="[{ name: 'add', title: '新增', type: 'primary', click: this.onAddClicked }]"
    @change="onReload"
    @reset="onReset"
  >
    <span slot="statusTypeTitle" class="site-table-actions" style="width: 150px">
      合约状态
      <!-- 漏斗筛选 -->
      <head-filter :pMenuList="statusTypes" @click="key => onClickMenu(key)" />
    </span>
    <span slot="statusType" slot-scope="statusType">
      <template v-for="(item, index) in statusTypes">
        <span :key="index" :style="'color: ' + item.color" v-if="item.value === statusType">{{ item.label }}</span>
      </template>
    </span>
  </BaseTable>
</template>

<script>
import OptionsMixin from '@/common/OptionsMixin';
import TableMixin from '@/components/table/TableMixin';
import { ComponentUtil } from 'jscom/utils/vueutil';
import HeadFilter from '@/components/table/HeadFilter';
import moment from 'moment';
import AddAgentModal from './AddAgentModal';
import UrllShow from './UrllShow';

export default {
  name: 'AgentList',
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
        label: '履约中'
        // color: '#ff791a'
      },
      {
        value: '1',
        label: '已解约'
      },
      {
        value: '2',
        label: '未代理'
      }
    ];
    return {
      statusTypes,
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
          key: 'companyName',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150
        },
        {
          title: '联系人',
          key: 'contactName',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150
        },
        {
          title: '联系电话',
          key: 'contactTelephone',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150
        },
        {
          key: 'contractStatus',
          ellipsis: true,
          sorter: false,
          align: 'center',
          slots: { title: 'statusTypeTitle' },
          scopedSlots: { customRender: 'statusType' },
          width: 150
        },
        {
          title: '银行账号',
          key: 'bankAccountNumber',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150
        },
        {
          title: '签约日期',
          key: 'contractTime',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150,
          customRender: value => `${value && value !== '-' ? moment(value).format('YYYY-MM-DD') : ''}`
        },
        {
          title: '本司联络人',
          key: 'companyContactName',
          ellipsis: true,
          sorter: false,
          align: 'center',
          width: 150
        }
      ],
      filterFields: [
        {
          label: '代理商企业名称',
          type: 'str',
          name: 'saleAgentKey',
          placeholder: '请输入代理商ID/企业名称'
        },
        {
          label: '联系人',
          type: 'str',
          name: 'contactName',
          placeholder: '请输入联系人名称'
        },
        {
          label: '签约日期',
          type: 'date_range',
          widget: 'DateRangeWidgetTwo',
          name: 'dateRange'
        }
      ],
      filterJsonModel: {},
      dataSource: [],
      total: 0,
      urlData: []
    };
  },
  methods: {
    onClickMenu(key) {
      this.filterJsonModel.contractStatus = key;
      this.$refs.table.reload();
    },
    onReload({ page, sortObj }) {
      let api = this.$apiUtil.getAgentApi();
      api.get_agent_list({ ...this.filterJsonModel, ...page, sortObj }).then(({ data }) => {
        // this.dataSource = data
        this.setData(data);
      });
    },
    // 点击专属链接
    onUrlClicked(record) {
      new ComponentUtil(this.$store, this.$router).create({
        cls: UrllShow,
        clsprops: {
          pVisible: true,
          saleAgentId: record.saleAgentId
        },
        on: {
          success: () => {
            // this.onUrlList()
          }
        }
      });
    },
    // 点击代理商详情
    onDetailClicked(record) {
      this.$router.push({
        path: `/manager/agentManage/agentList/basicInfo/`,
        query: { saleAgentId: record.saleAgentId }
      });
    },
    // 点击新增代理商
    onAddClicked() {
      new ComponentUtil(this.$store, this.$router).create({
        cls: AddAgentModal,
        clsprops: {
          pVisible: true
          // pTable: this.$refs.table,
        },
        on: {
          success: () => {
            this.$refs.table.reload();
          }
        }
      });
    },
    onReset() {
      console.log('onDetailClicked');
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
.agent-list {
  .filter .ant-col:nth-child(3) .sw-field .ant-calendar-picker {
    min-width: auto !important;
  }
  .filter .ant-col:nth-child(1) .label {
    width: 110px !important;
  }
}
@media screen and (max-width: 1440px) {
.agent-list {
  .filter .ant-col:nth-child(1) {
    .label {
      width: 125px !important;
    }
    .field {
      min-width: 172px !important;
      // width: 40% !important;
    }
  }
}
}
</style>
