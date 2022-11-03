<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="false"
    class="project-manage"
    bordered
    :rowKey="(list, index) => index"
    size="small"
  >
    <template slot="factorNumerator" slot-scope="v, record">
      <span v-if="!record.isEdit">{{ v || '-' }}</span>
      <a-input-number
        :min="0"
        v-model="record.factorNumerator"
        :precision="3"
        v-else
      />
    </template>
    <template slot="unitPrefix" slot-scope="v, record">
      <span v-if="!record.isEdit">{{ v || '-' }}</span>
      <a-input :maxLength="10" v-model="record.unitPrefix" v-else />
    </template>
    <template slot="factorDenominator" slot-scope="v, record">
      <span v-if="!record.isEdit">{{ v || '-' }}</span>
      <a-input-number
        :min="0"
        v-model="record.factorDenominator"
        :precision="3"
        v-else
      />
    </template>
    <template slot="unitSuffix" slot-scope="v, record">
      <span v-if="!record.isEdit">{{ v || '-' }}</span>
      <a-input :maxLength="10" v-model="record.unitSuffix" v-else />
    </template>
    <template slot="unitComment" slot-scope="v, record">
      <span v-if="!record.isEdit">{{ v || '-' }}</span>
      <a-input :maxLength="100" v-model="record.unitComment" v-else />
    </template>
    <template slot="action" slot-scope="action, record, index">
      <span v-if="isReadyOnly">-</span>
      <template v-else>
        <a-button
          type="link"
          :disabled="!record.factorNumerator"
          @click="onEditClick(record, index)"
          href="javascript:;"
          style="padding:0 8px"
        >
          {{ record.isEdit ? '确定' : '编辑' }}
        </a-button>
        <a-divider type="vertical" />
        <a-button type="link" @click="onDeleteClicked(record, index)" href="javascript:;" style="padding:0 8px"
          >删除</a-button
        >
      </template>
    </template>
  </a-table>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { formartData } from 'jscom/utils/vueutil';

export default {
  name: 'FactorDataModal',
  props: {
    pStepInfo: {
      type: Object,
      default: () => {
        return {
          list: []
        };
      }
    },
    pGasType: {
      type: String,
      default: ''
    },
    isReadyOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formartData,
      locale: zh_CN,
      visible: false,
      isLoading: false,
      columns: [
        { title: '序号', dataIndex: 'index', width: 60, align: 'center' },
        {
          title: `排放因子(格式：2 kg ${this.pGasType}/300t)`,
          children: [
            {
              dataIndex: 'factorNumerator',
              title: '因子分子',
              scopedSlots: { customRender: 'factorNumerator' },
              align: 'center',
              ellipsis: true
            },
            {
              dataIndex: 'unitPrefix',
              title: '单位前缀',
              scopedSlots: { customRender: 'unitPrefix' },
              align: 'center',
              ellipsis: true
            },
            {
              dataIndex: 'gasType',
              title: '气体种类',
              // scopedSlots: { customRender: 'gasType' },
              width: 80,
              align: 'center',
              ellipsis: true
            },
            {
              dataIndex: 'factorDenominator',
              title: '因子分母',
              scopedSlots: { customRender: 'factorDenominator' },
              align: 'center',
              ellipsis: true
            },
            {
              dataIndex: 'unitSuffix',
              title: '单位后缀',
              scopedSlots: { customRender: 'unitSuffix' },
              align: 'center',
              ellipsis: true
            }
          ]
        },
        {
          title: '单位备注',
          dataIndex: 'unitComment',
          scopedSlots: { customRender: 'unitComment' },
          align: 'center',
          ellipsis: true
        },
        { title: '操作', dataIndex: 'action', width: 150, scopedSlots: { customRender: 'action' }, align: 'center' }
      ],
      data: [],
      dataSource: [],
      total: 0,
      defaultItem: {
        isEdit: true
      }
      //   pagination: {
      //     current: 1,
      //     onChange: (page) => {
      //       this.pagination.current = page;
      //     },
      //   },
    };
  },
  watch: {
    data() {
      this.dataSource = this.data.map((item, index) => {
        item.index = index + 1;
        item.gasType = this.pGasType;
        return item;
      });
    }
  },
  created() {
    this.onReload();
  },
  methods: {
    onConfirm() {
      if (this.data.filter(item => item.isEdit).length) {
        this.$message.destroy();
        this.$message.warning('请编辑完成当前数据后再新增');
        return;
      }
      this.data.unshift({ ...this.defaultItem });
      //   this.pagination.current = 1;
    },
    onReload() {
      this.isLoading = true;
      this.data = this.pStepInfo.list || [];
    },
    onEditClick(record) {
      record.isEdit = !record.isEdit;
    },
    onDeleteClicked(record, index) {
      if (!record.id) {
        this.data.splice(index, 1);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.project-manage {
  padding: 0;
  .ant-input {
    height: 30px;
  }
  .ant-btn-link {
    height: 30px;
  }
  /deep/.ant-table-scroll .ant-table-body {
    overflow: auto !important;
  }
  /deep/.ant-table-bordered .ant-table-body > table {
    border-bottom: 1px solid #e8e8e8;
    border-radius: 4px;
  }
  /deep/ .ant-table-placeholder {
    border-bottom: 1px solid #e8e8e8 !important;
  }
}
</style>
