<template>
    <BaseTable
      ref="table"
      :pColumns="columns"
      :pRowCount="4"
      :pDataSource="dataSource"
      :pFilterFields="filterFields"
      :pFilterJsonModel="filterJsonModel"
      :pInlineActions="[
        { name: 'reply', title: '回复', toolbar: true, click: onReplyClicked },
        { name: 'historyDetail', title: '历史记录', toolbar: true, click: onHistoryClicked }
      ]"
      :pActions="[
        // {name: 'add', title: '添加', type: 'primary', click: onAddClicked},
      ]"
      :pTotal="total"
      @change="onReload"
      @reset="onReset"
    >
      <span slot="statusTypeTitle">
        状态
      </span>
      <span slot="statusType" slot-scope="statusType">
        <template v-for="(item, index) in statusTypes">
          <span :style="'color: ' + item.color" :key="index" v-if="item.key === Number(statusType)">{{
            item.value
          }}</span>
        </template>
      </span>
    </BaseTable>
</template>

<script>
/**
 * 客服中心
 * @vue-props {}
 * @vue-data {}
 * @vue-event {}
 */
import TableMixin from '@/components/table/TableMixin';
import OptionsMixin from '@/common/OptionsMixin';
import { ComponentUtil } from 'jscom/utils/vueutil';
import { dtUtil } from 'jscom/utils/sysutil';
import moment from 'moment';
import AddReplyModal from './AddReplyModal';
import EnterpriseServiceReplyHistory from './EnterpriseServiceReplyHistory';

export default {
  name: 'EnterpriseService',

  mixins: [TableMixin, OptionsMixin],

  props: {
    pContactUsId: String
  },

  // components: {
  //   EnterpriseServiceReplyHistory,
  // },

  data() {
    const statusTypes = [
      {
        key: 1,
        value: '已回复'
      },
      {
        key: 2,
        value: '未回复',
        color: 'red'
      }
    ];
    return {
      moment,
      statusTypes,
      columns: [
        {
          title: '提交时间',
          key: 'createDate',
          sorter: false,
          align: 'center',
          ellipsis: true,
          customRender: (value, row, index) => {
            return dtUtil.formatDatetime(new Date(value));
          }
        },
        { title: '客户姓名', key: 'name', sorter: false, ellipsis: true },
        { title: '客户电话', key: 'telephone', sorter: false, nameField: true, ellipsis: true },
        { title: '所在公司', key: 'companyName', sorter: false, ellipsis: true },
        { title: '问题描述', key: 'question', align: 'center', sorter: false, ellipsis: true },
        {
          key: 'replyStatus',
          align: 'center',
          slots: { title: 'statusTypeTitle' },
          scopedSlots: { customRender: 'statusType' },
          sorter: false,
          ellipsis: true
        }
      ],
      dataSource: [],
      filterJsonModel: {},
      filterFields: [
        { label: '所在公司', type: 'str', name: 'companyName', placeholder: '请输入公司名称', width: '100%' },
        { label: '时间', type: 'date', name: 'createDate', placeholder: '请选择提交时间', width: '100%' },
        {
          label: '状态',
          type: 'str',
          widget: 'SelectWidget',
          name: 'replyStatus',
          options: [
            { label: '已回复', value: '1' },
            { label: '未回复', value: '2' }
          ],
          width: '100%'
        }
      ]
    };
  },

  created() {},

  methods: {
    /**
     * 加载数据
     * @param page
     * @param sortObj
     */
    onReload({ page, sortObj }) {
      let api = this.$apiUtil.getEnterpriseApi();
      api.get_enterprise_service({ ...this.filterJsonModel, ...page }).then(({ data }) => {
        this.setData(data);
      });
    },

    onReset() {
      this.$refs.table.reload();
    },

    /**
     * 查看点击
     * @param row
     */
    onReplyClicked(row) {
      new ComponentUtil(this.$store, this.$router).create({
        cls: AddReplyModal,
        clsprops: {
          pVisible: true,
          pRow: row,
          pTable: this.$refs.table
        }
      });
    },

    onHistoryClicked(row) {
      this.$router.push(`/manager/customManage/service/history/${row.id}`);
      // this.$router.push({path:`/manager/customManage/service/history/${row.id}`,query:{id:1}})
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.inline-action {
  width: 120px !important;
}
</style>
