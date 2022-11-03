<template>
   <AModal class="modal" title="专属链接" :maskClosable="false" :closable="false" centered :visible="pVisible">
      <div slot="footer" class="footer">
        <template>
          <AButton class="cancel" type="primary" @click="onCancel">关闭</AButton>
        </template>
      </div>
      <ATable
        class="tableUrl"
        :scroll="{ y: 300 }"
        :pagination="false"
        :columns="columnsUrl"
        :dataSource="dataSource"
        size="middle"
        :bordered="true"
      >
        <span slot="copy" slot-scope="record">
          <a-icon
            class="report-card-content-copy"
            type="copy"
            v-clipboard:copy="() => record.copy"
            v-clipboard:success="copySuccess"
            v-clipboard:error="copyError"
          />
        </span>
      </ATable>
    </AModal>
</template>

<script>
import FormMixin from '@/components/form/FormMixin';
import OptionsMixin from '@/common/OptionsMixin';

export default {
  name: 'urlShow',
  mixins: [FormMixin, OptionsMixin],

  props: {
    pVisible: Boolean,
    pUrlData: Array,
    saleAgentId: Number
  },

  created() {
    this.onReload();
  },

  data() {
    return {
      columnsUrl: [
        { title: '名称', key: 'softwareModuleName', dataIndex: 'softwareModuleName', align: 'center', width: 100 },
        { title: '链接', key: 'exclusiveUrl', dataIndex: 'exclusiveUrl', align: 'center', width: 350 },
        { title: '复制', key: 'copy', align: 'center', scopedSlots: { customRender: 'copy', width: 100 } }
      ],
      dataSource: [],
      total: 0
    };
  },
  computed: {},
  methods: {
    onCancel() {
      this.$emit('on-hide');
    },
    onReload() {
      let api = this.$apiUtil.getAgentApi();
      api.get_url_list({ saleAgentId: this.saleAgentId }).then(({ data }) => {
        const list = data.map(item => {
          return {
            ...item,
            copy: item.exclusiveUrl
          };
        });
        this.dataSource = list;
        this.total = data.length;
      });
    },
    // Success event handler
    copySuccess({ value, event }) {
      this.$message.success('已复制');
    },
    // Error event handler
    copyError({ value, event }) {
      console.log('error', value);
    }
  }
};
</script>

<style lang="less" scoped >
/deep/.ant-table-header {
      padding-right: 0px!important;
      margin-right: 10px!important;
    }
/deep/.ant-table table {
      border: 1px solid #e8e8e8!important;
    }
</style>
