<template>
  <AConfigProvider :locale="locale">
    <AModal
      :title="pTitle"
      centered
      :maskClosable="false"
      :visible="visible"
      :width="1100"
      destroyOnClose
      :bodyStyle="{ height: '600px', padding: '12px 24px' }"
      okText="新增"
      @ok="onConfirm"
      @cancel="onCancel"
      class="database-model"
    >
      <FilterBar
          ref="filter"
          v-if="filterFields.length > 0"
          :pFields="filterFields"
          :pJsonModel="filterJsonModel"
          :pRowCount="4"
          @query="onQuery"
          @reset="onReset"
        ></FilterBar>
      <a-table :columns="columns" :data-source="dataSource" :scroll="{ y: 380 }" :loading="isLoading" :pagination="pagination" :row-key="record => record.index" class="database-table" bordered>
        <template slot="type" slot-scope="type, record">
          <span v-if="!record.isEdit">
            <span v-if="record.type === '01'">通用数据库</span>
            <span v-else-if="record.type === '02'">项目数据库</span>
            <span v-else-if="record.type === '03'">客户数据库</span>
          </span>
          <ASelect ref="select" v-else v-model="record.type" placeholder="请选择数据库类型" >
            <ASelectOption v-for="(option, index) of databaseTypeOptions" :value="option.value" :key="index">
              {{ option.label }}
            </ASelectOption>
          </ASelect>
        </template>
        <template slot="name" slot-scope="name, record">
          <span :title="name" v-if="!record.isEdit">{{name || '-'}}</span>
          <a-input :maxLength="50" v-model="record.name" placeholder="请输入" v-else />
        </template>
        <template slot="databaseEdition" slot-scope="databaseEdition, record">
          <span :title="databaseEdition" v-if="!record.isEdit">{{databaseEdition || '-'}}</span>
          <a-input :maxLength="30" v-model="record.databaseEdition" placeholder="请输入" v-else />
        </template>
        <template slot="action" slot-scope="action, record, index">
          <a-button type="link" :disabled="!record.type||!record.name||!record.databaseEdition" @click="onEditClick(record, index)" href="javascript:;">{{record.isEdit ? '保存' : '编辑'}}</a-button>
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
import FilterBar from '@/components/table/FilterBar';

export default {
  name: 'databaseModel',
  components: {
    FilterBar
  },
  props: ['pVisible', 'pTitle'],
  data() {
    return {
      locale: zh_CN,
      visible: this.pVisible,
      isLoading: false,
      columns: [
        { title: '序号', dataIndex: 'index', width: 60, align: 'center' },
        { title: '类型', dataIndex: 'type', width: 180, scopedSlots: { customRender: 'type' }, align: 'center', sorter: false, ellipsis: true },
        { title: '数据库', dataIndex: 'name', scopedSlots: { customRender: 'name' }, align: 'center', ellipsis: true },
        { title: '版本', dataIndex: 'databaseEdition', scopedSlots: { customRender: 'databaseEdition' }, align: 'center', ellipsis: true },
        { title: '操作', dataIndex: 'action', width: 170, scopedSlots: { customRender: 'action' }, align: 'center' },
      ],
      data: [],
      databaseTypeOptions: [],
      dataSource: [],
      filterFields: [
        {label: '类型', type: 'str', name: 'type', widget: 'SelectWidget', placeholder: '请选择数据库类型',
          options: []
        },
        {label: '数据库', type: 'str', name: 'name', widget: 'SelectWidget', placeholder: '请选择数据库名称', mode: 'tags', maxTagsCount: 1,
          options: []
        },
        {label: '版本', type: 'str', name: 'databaseEdition', widget: 'SelectWidget', placeholder: '请选择数据库版本',
          options: []
        },
      ],
      filterJsonModel: {
        databaseEdition: ''
      },
      total: 0,
      defaultItem: {
        type: undefined,
        name: '',
        databaseEdition: '',
        isEdit: true
      },
      pagination: {
        current: 1,
        total: 0,
        showQuickJumper: true,
        showSizeChanger: true,
        onChange: (page) => {
          this.pagination.current = page;
        }
      }
    };
  },
  watch: {
    data() {
      this.dataSource = this.data.map((item, index) => {
        item.index = index + 1;
        return item;
      })
    }
  },
  created() {
    this.onReload()
    this.getDatabaseTypeOption()
    this.getDatabaseNameOption()
    this.getDatabaseEditionOption()
  },
  mounted() {
    this.pagination.total = this.dataSource.length
  },
  methods: {
    onReload () {
      this.isLoading = true
      this.pagination.current = 1;
      this.$apiUtil.getEmissionFactorDatabaseApi()
        .get_emission_factor_databases({ ...this.filterJsonModel })
        .then(({data}) => {
          this.data = data.list.map((item) => {
            item.isEdit = false;
            return item;
          });
          this.pagination.total = this.data.length;
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    getDatabaseTypeOption() {
      this.$apiUtil.getEmissionFactorDatabaseApi().get_emission_factor_database_type_option({}).then(({data}) => {
        this.filterFields[0].options = data.map((item) => {
          item.label = item.name
          item.value = item.id
          return item
        })
        this.databaseTypeOptions = this.filterFields[0].options
      })
    },
    getDatabaseNameOption() {
      this.$apiUtil.getEmissionFactorDatabaseApi().get_emission_factor_database_name_option({}).then(({data}) => {
        this.filterFields[1].options = data.map((item) => {
          let newItem = {
            label: item,
            value: item
          }
          return newItem
        })
      })
    },
    getDatabaseEditionOption(action) {
      this.$apiUtil.getEmissionFactorDatabaseApi().get_emission_factor_database_edition_option({}).then(({data}) => {
        this.filterFields[2].options = data.map((item) => {
          item.label = item.databaseEdition
          item.value = item.databaseEdition
          return item
        })
        if(action&&this.filterJsonModel.databaseEdition && !this.filterFields[2].options.filter((item) => item.value === this.databaseType).length) {
          this.filterJsonModel.databaseEdition = ''
          this.onReload()
        }
      })
    },
    onEditClick (record) {
      if (record.isEdit) {
        if (record.id) {
          this.$apiUtil.getEmissionFactorDatabaseApi().edit_emission_factor_databases({ ...record }).then(() => {
            record.isEdit = !record.isEdit;
            if(!this.filterJsonModel.databaseEdition) {
              this.onReload();
            }
            this.getDatabaseNameOption()
            this.getDatabaseEditionOption(true)
          })
        } else {
          this.$apiUtil.getEmissionFactorDatabaseApi().add_emission_factor_databases({ ...record }).then(() => {
            record.isEdit = !record.isEdit;
            this.onReload();
            this.getDatabaseNameOption()
            this.getDatabaseEditionOption()
          })
        }
      } else {
        record.isEdit = !record.isEdit;
      }
    },
    onDeleteClicked (record, index) {
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
          pContent: '确定要删除数据库%s吗？',
          pKeyWord: String(record.name),
          pMaskStyle: {zIndex: 1000},
        },
        on: {
          confirm: () => {
            this.$apiUtil.getEmissionFactorDatabaseApi().delete_emission_factor_databases({ ...record }).then((data) => {
              this.onReload();
              this.getDatabaseNameOption()
              this.getDatabaseEditionOption()
            })
          },
        }
      });
    },
    onConfirm () {
      if (this.data.filter(item => item.isEdit).length) {
        this.$message.destroy();
        this.$message.warning('请编辑完成当前数据后再新增');
        return;
      }
      this.data.unshift({...this.defaultItem});
      this.$nextTick(() => {
        this.pagination.total = this.dataSource.length
        this.pagination.current = 1;
        this.$nextTick(() => {
          this.$refs.select.focus()
        })
      })
    },
    onQuery() {
      this.onReload();
    },
    onReset() {
      this.$refs.filter.reset();
      this.$nextTick(() => {
        this.onReload()
      });
    },
    onCancel () {
      this.visible = false;
      this.$emit('cancel');
    }
  }
};
</script>

<style lang="less" scoped>
  .database-model {
    padding: 0;
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
        width: 99%!important;
      }
    }
    .database-table {
      /deep/.ant-table-bordered .ant-table-header tr:only-child > th:last-child {
        border-right-color: #e8e8e8!important;
      }
      /deep/.ant-table-bordered .ant-table-body > table {
        border-top: 1px solid #e8e8e8!important;
        border-bottom: 1px solid #e8e8e8!important;
        border-radius: 4px;
      }
      /deep/ .ant-table-placeholder {
        border: 0;
      }
      /deep/ .ant-divider, .ant-divider-vertical {
        margin: 0;
      }
    }
  }
</style>
