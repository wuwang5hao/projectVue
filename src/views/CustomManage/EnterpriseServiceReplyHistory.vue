<template>
  <div style="height:100%">
    <BaseTable
      ref="table"
      :pColumns="columns"
      :pDataSource="dataSource"
      :pFilterFields="filterFields"
      :pFilterJsonModel="filterJsonModel"
      :pRowCount="4"
      :pActions="[
        // {name: 'add', title: '添加', type: 'primary', click: onAddClicked},
      ]"
      :pTotal="total"
      @change="onReload"
      @reset="onReset"
    >
      <span slot="replyStatus" slot-scope="replyStatus">
        <span v-if="replyStatus === '1'">已回复</span>
        <span v-if="replyStatus === '2'">未回复</span>
      </span>
    </BaseTable>
  </div>
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
import moment from 'moment';
import { dtUtil } from 'jscom/utils/sysutil';

export default {
  name: 'EnterpriseServiceReplyHistory',

  mixins: [TableMixin, OptionsMixin],

  data() {
    return {
      columns: [
        { title: '序号', key: 'index', sorter: false, primary: true },
        {
          title: '回复时间（uct+8）',
          key: 'createDate',
          sorter: false,
          primary: true,
          customRender: (value, row, index) => {
            return dtUtil.formatDatetime(new Date(value))
          }
        },
        { title: '客服姓名', key: 'customerServiceName', sorter: false },
        { title: '回复方式', key: 'replyWay', sorter: false, nameField: true, ellipsis: true },
        { title: '当前状态', key: 'replyStatus', scopedSlots: { customRender: 'replyStatus' }, sorter: false },
        { title: '问题描述', key: 'comment', align: 'center', sorter: false, ellipsis: true }
      ],
      dataSource: [],
      filterJsonModel: {},
      filterFields: [
        { label: '客服姓名', type: 'str', name: 'customerServiceName', placeholder: '请输入客服姓名', width: '100%' },
        { label: '时间', type: 'date', name: 'createDate', placeholder: '请选择回复时间', width: '100%' },
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

  methods: {
    /**
     * 加载数据
     * @param page
     * @param sortObj
     */
    onReload({ page, sortObj }) {
      let api = this.$apiUtil.getEnterpriseApi();
      let jsonModel = {
        ...this.filterJsonModel,
        ...page,
        contactUsId: this.$route.params.contactUsId
      };
      // console.log('datadata',jsonModel)
      api.get_enterprise_service_replyHistory(jsonModel).then(({ data }) => {
        // console.log('datadata',data,jsonModel)
        this.setData(data);
      });
    },

    onReset() {
      this.$refs.table.reload();
    }
  }
};
</script>

<style></style>
