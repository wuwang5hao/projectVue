<template>
  <AConfigProvider :locale="locale">
    <AModal :title="pTitle" centered :maskClosable="false" :visible="visible" :width="800" destroyOnClose
      :bodyStyle="{ height: '600px', padding: '12px 24px' }" okText="新增" @cancel="onCancel" class="database-model">
      <template slot="footer">
        <a-button key="back" @click="onCancel"> 取消 </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="onConfirm"> 保存 </a-button>
        <a-button key="version" type="primary" :loading="isVersionLoading" @click="onVersion"> 发布 </a-button>
      </template>
      <div class="message">发布后，将同步至客户端，不可取消!</div>
      <FilterBar ref="filter" v-if="filterFields.length > 0" :pFields="filterFields" :pJsonModel="filterJsonModel"
        @query="onQuery" @reset="onReset"></FilterBar>
      <a-table :columns="columns" :data-source="dataSource" :scroll="{ y: 380 }" :loading="isLoading"
        :pagination="pagination" :row-key="(record) => record.index" class="database-table" bordered>
        <template slot="type" slot-scope="type, record">
          <span :title="record.type || '-'" v-if="!record.isEdit">{{ record.type || '-' }}</span>
          <a-input ref="input" :maxLength="15" v-model="record.type" placeholder="请输入" v-else />
        </template>
        <template slot="name" slot-scope="name, record">
          <span :title="name || '-'" v-if="!record.isEdit">{{ name || '-' }}</span>
          <a-input :maxLength="200" v-model="record.name" placeholder="请输入" v-else />
        </template>
        <template slot="action" slot-scope="action, record, index">
          <a-button type="link" :disabled="!record.name" @click="onEditClick(record, index)" href="javascript:;">{{
              record.isEdit ? '保存' : '编辑'
          }}</a-button>
          <a-divider type="vertical" />
          <a-button type="link" @click="onDeleteClicked(record, index)" href="javascript:;">删除</a-button>
        </template>
      </a-table>
    </AModal>
  </AConfigProvider>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { ComponentUtil } from 'jscom/utils/vueutil';
import ConfirmModal from '@/components/ConfirmModal';
import FilterBar from '@/components/table//FilterBar';
import { mapMutations } from 'vuex';
import MutationTypes from '@/store/MutationTypes';

export default {
  name: 'GasesTypeModel',
  components: {
    FilterBar,
  },
  props: ['pVisible', 'pTitle'],
  data() {
    return {
      locale: zh_CN,
      visible: this.pVisible,
      isLoading: false,
      isVersionLoading: false,
      columns: [
        { title: '序号', dataIndex: 'index', width: 60, align: 'center' },
        {
          title: '分类',
          dataIndex: 'type',
          width: 180,
          scopedSlots: { customRender: 'type' },
          align: 'center',
          sorter: false,
          ellipsis: true,
        },
        {
          title: '温室气体种类',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
          align: 'center',
          ellipsis: true,
        },
        { title: '操作', dataIndex: 'action', width: 170, scopedSlots: { customRender: 'action' }, align: 'center' },
      ],
      data: [],
      dataSource: [],
      typeOptions: [],
      filterFields: [
        { label: '分类', type: 'str', name: 'type', widget: 'SelectWidget', placeholder: '请选择分类', options: [] },
      ],
      filterJsonModel: {},
      total: 0,
      defaultItem: {
        type: '',
        name: '',
        isEdit: true,
      },
      pagination: {
        current: 1,
        total: 0,
        showQuickJumper: true,
        showSizeChanger: true,
        onChange: (page) => {
          this.pagination.current = page;
        },
      },
    };
  },
  watch: {
    data() {
      this.dataSource = this.data.map((item, index) => {
        item.index = index + 1;
        return item;
      });
    },
  },
  created() {
    this.onReload();
    this.getGasTypeOption();
  },
  mounted() {
    this.pagination.total = this.dataSource.length;
  },
  methods: {
    ...mapMutations([MutationTypes.SET_LOADING]),
    onReload() {
      this.isLoading = true;
      this.pagination.current = 1;
      this.$apiUtil
        .getEmissionFactorDatabaseApi()
        .get_emission_greenhouse_gas_types({ ...this.filterJsonModel })
        .then(({ data }) => {
          this.data = data.list.map((item) => {
            item.isEdit = false;
            return item;
          });
          this.pagination.total = this.data.length;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    getGasTypeOption() {
      this.$apiUtil
        .getEmissionFactorDatabaseApi()
        .get_greenhouse_gas_type_list_type_option({})
        .then(({ data }) => {
          this.filterFields[0].options = data.map((item) => {
            let newItem = {
              label: item,
              value: item,
            };
            return newItem;
          });
          this.typeOptions = this.filterFields[0].options;
        });
    },
    onEditClick(record) {
      if (record.isEdit) {
        if (record.id) {
          this.$apiUtil
            .getEmissionFactorDatabaseApi()
            .edit_emission_greenhouse_gas_types({ ...record })
            .then(() => {
              record.isEdit = !record.isEdit;
              this.getGasTypeOption();
            });
        } else {
          this.$apiUtil
            .getEmissionFactorDatabaseApi()
            .add_emission_greenhouse_gas_types({ ...record })
            .then(() => {
              record.isEdit = !record.isEdit;
              this.onReload();
              this.getGasTypeOption();
            });
        }
      } else {
        record.isEdit = !record.isEdit;
      }
    },
    onDeleteClicked(record, index) {
      if (!record.id) {
        this.data.splice(index, 1);
        return;
      }
      new ComponentUtil(this.$store).create({
        cls: ConfirmModal,
        clsprops: {
          pVisible: true,
          pType: 'warn',
          pTitle: '确认信息',
          pContent: '确定要删除温室气体种类%s吗？',
          pKeyWord: String(record.name),
          pMaskStyle: { zIndex: 1000 },
        },
        on: {
          confirm: () => {
            this.$apiUtil
              .getEmissionFactorDatabaseApi()
              .delete_emission_greenhouse_gas_types({ ...record })
              .then((data) => {
                this.onReload();
                this.getGasTypeOption();
              });
          },
        },
      });
    },
    onConfirm() {
      if (this.data.filter((item) => item.isEdit).length) {
        this.$message.destroy();
        this.$message.warning('请编辑完成当前数据后再新增');
        return;
      }
      this.data.unshift({ ...this.defaultItem });
      this.$nextTick(() => {
        this.pagination.total = this.dataSource.length;
        this.pagination.current = 1;
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      });
    },
    // 发布
    onVersion() {
      this.SET_LOADING({ isVersionLoading: true });
      this.$apiUtil
        .getEmissionFactorDatabaseApi()
        .push_version_emission_gas_types({})
        .then(() => {
          this.$emit('on-hide');
          this.$emit('success');
        })
        .catch(() => {
          this.SET_LOADING({ isVersionLoading: false });
        });
    },
    onQuery() {
      this.onReload();
    },
    onReset() {
      this.$refs.filter.reset();
      this.$nextTick(() => {
        this.onReload();
      });
    },
    onCancel() {
      this.visible = false;
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="less" scoped>
.database-model {
  padding: 0;

  .message {
    height: 43px;
    line-height: 43px;
    color: #EE722E;
    font-size: 12px;
    background: #FCECDF;
    border-radius: 4px;
    padding-left: 22px;
    margin-bottom: 14px;
  }

  .ant-input {
    height: 30px;
  }

  .ant-btn-link {
    height: 30px;
  }

  .ant-select {
    width: 100%;

    /deep/.ant-select-selection {
      height: 30px;

      .ant-select-selection__rendered {
        line-height: 30px;
      }
    }
  }

  .filter {
    padding-top: 12px;
    padding-bottom: 0;
    padding-left: 0;

    /deep/.ant-form .row {
      width: 99% !important;
    }
  }

  .database-table {
    /deep/.ant-table-bordered .ant-table-header tr:only-child>th:last-child {
      border-right-color: #e8e8e8 !important;
    }

    /deep/.ant-table-bordered .ant-table-body>table {
      border-top: 1px solid #e8e8e8 !important;
      border-bottom: 1px solid #e8e8e8 !important;
      border-radius: 4px;
    }

    /deep/ .ant-table-placeholder {
      border: 0;
    }

    /deep/ .ant-divider,
    .ant-divider-vertical {
      margin: 0;
    }
  }
}
</style>
