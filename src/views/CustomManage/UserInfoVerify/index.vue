<template>
    <!-- v-show="!isShowVerify" -->
    <BaseTable
      ref="table"
      :pColumns="columns"
      :pDataSource="dataSource"
      :pFilterJsonModel="filterJsonModel"
      :pInlineActions="[{ name: 'view', title: '详情', toolbar: true, click: onViewClicked }]"
      :pActions="[]"
      :pFilterFields="filterFields"
      :pTotal="total"
      @change="onReload"
      @reset="onReset"
      class="custom-made"
      :pRowCount="5"
    >
      <span slot="statusTitle" class="site-tbale-actions" style="width:180px;">
        状态
        <!-- 漏斗筛选 -->
        <head-filter
        :pMenuList="[{ value: '', label: '全部' }, ...consts.verifyStatusOptions]"
         @click="onClickMenu" />
      </span>
    </BaseTable>
</template>

<script>
/**
 * 客户信息审核
 * @vue-props {}
 * @vue-data {}
 * @vue-event {}
 */
import TableMixin from '@/components/table/TableMixin';
import OptionsMixin from '@/common/OptionsMixin';
import HeadFilter from '@/components/table/HeadFilter';
import consts from '@/common/consts';
import moment from 'moment';

export default {
  name: 'EnterpriseVerify',

  mixins: [TableMixin, OptionsMixin],

  props: {
    pCompanyId: String
  },

  components: {
    HeadFilter
  },

  data() {
    return {
      consts,
      columns: [
        { title: '序号', key: 'index', primary: true, width: 80 },
        { title: '企业ID', key: 'id', align: 'center', ellipsis: true, sorter: false },
        { title: '企业名称', key: 'name', align: 'center', nameField: true, sorter: false, ellipsis: true },
        { title: '提交时间', key: 'updateTime', align: 'center', sorter: false },
        {
          key: 'appraiseStatus',
          align: 'center',
          slots: { title: 'statusTitle' },
          customRender: (value, record) => {
            const newVal = consts.verifyStatusOptions.find(v => v.value === value).label;
            return newVal;
          },
          sorter: false
        }
      ],
      dataSource: [],
      filterJsonModel: {
        appraiseStatus: ''
      },
      filterFields: [
        { label: '企业', type: 'str', name: 'companyKey', placeholder: '请输入企业ID/企业名称', maxLength: 50 },
        { label: '时间', type: 'date', name: 'updateTime', placeholder: '请选择提交时间', width: '100%' }
      ],
      selCompanyId: ''
    };
  },

  created() {
    if (this.pCompanyId) {
      this.selCompanyId = this.pCompanyId;
    }
  },

  methods: {
    /**
     * 加载数据
     * @param page
     * @param sortObj
     */
    onReload({ page, sortObj }) {
      this.getEnterpriseList(page, sortObj);
    },
    getEnterpriseList(page, sortObj) {
      let api = this.$apiUtil.getEnterpriseApi();
      if (this.filterJsonModel.updateTime) {
        this.filterJsonModel.updateTime = moment(this.filterJsonModel.updateTime).format('YYYYMMDD');
      }
      api.get_enterprises_verify({ ...this.filterJsonModel, ...page, sortObj }).then(({ data }) => {
        this.setData(data);
      });
    },
    onReset() {
      // this.filterJsonModel.appraiseStatus = '';
      this.$refs.table.reload();
    },
    /**
     * 查看点击
     * @param row
     */
    onViewClicked(row) {
      this.$router.push(`/manager/customManage/verify/detail/${row.id}`);
    },

    onVerifyClicked(row) {
      this.selCompanyId = row.companyId;
    },

    onClickMenu(key) {
      this.filterJsonModel.appraiseStatus = key;
      this.$refs.table.reload();
    }
  }
};
</script>

<style lang="less">
.site-tbale-actions {
  margin-left: -16px;
  display: inline-block;
  position: relative;
}
</style>
