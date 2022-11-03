<template name="batch-edit">
  <a-config-provider :locale="zh_CN">
    <AModal
      :maskClosable="false"
      title="批量编辑"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @cancel="onCancel"
      width="750px"
      class="batch-edit"
      :bodyStyle="{ height: '580px', padding: '24px 0px' }"
    >
      <div class="batch-edit" v-for="(item, index) in list" :key="index">
        <h4 class="batch-edit-title">{{ item.title }}</h4>
        <a-table
          :columns="columns"
          :data-source="item.dataSource"
          :pagination="false"
          bordered
          :rowKey="(list, index) => list.name"
          size="small"
          :showHeader="false"
          :row-selection="rowSelection"
          :class="[{'data-base-table':item.title === '数据库信息'}]"
        >
          <template slot="value" slot-scope="val, record" >
            <span style="margin-left: 24px" v-if="!record.isEdit">--</span>
            <template v-else>
              <a-select
                v-if="record.isFieldType === 'select'"
                style="width: 100%"
                :placeholder="`请选择${record.name}`"
                v-model="record.value"
                @change="(value)=>handleChange(value,record)"
              >
                <a-select-option v-for="item in record.options" :key="item.value" :value="item.value">
                  {{ item.label }}
                </a-select-option>
              </a-select>

              <a-tree-select
                v-else-if="record.isFieldType === 'treeSelect'"
                v-model="record.value"
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                :tree-data="record.treeData"
                :placeholder="`请选择${record.name}`"
                tree-default-expand-all
              >
              </a-tree-select>
              <a-textarea
                  :placeholder="`请输入${record.name}`"
                  :auto-size="{ minRows: 2, maxRows: 6 }"
                  v-model="record.value"
                  :maxLength="record.maxLength"
                  v-else-if="record.isFieldType ==='textarea'"
                />
                <a-date-picker v-else-if="record.isFieldType ==='date'" show-time :placeholder="`请选择${record.name}`"
                  format="YYYY-MM-DD HH:mm:ss"
                  v-model="record.value"
                 />
              <a-input
                :placeholder="`请输入${record.name}`"
                class="batch-edit-input"
                :maxLength="record.maxLength"
                v-model="record.value"
                v-else
              />
            </template>

          </template>
        </a-table>
      </div>
      <div slot="footer" class="footer">
        <a-button @click="onCancel">取消</a-button>
        <a-button type="primary" class="sap-btn" @click="onConfirm">保存</a-button>
      </div>
    </AModal>
  </a-config-provider>
</template>
<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import { mapState } from 'vuex';
import SelectWidget from '@/components/form/SelectWidget';
import { formatterOption } from 'jscom/utils/vueutil';

export default {
  name: 'BatchEditModal',
  components: { SelectWidget },
  props: {
    pVisible: Boolean,
    pReadonly: Boolean,
    pType: {
      type: String,
      default: 'add', // add, update, view
      validator: type => ['add', 'update', 'view'].indexOf(type) !== -1
    },
    pSelections: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      zh_CN,
      visible: this.pVisible,
      confirmLoading: false,
      selectedRowKeys: [],
      columns: [
        {
          dataIndex: 'name',
          title: '索引',
          align: 'center',
          ellipsis: true,
          width: 150,
          // scopedSlots: { customRender: 'name' },

        },
        {
          dataIndex: 'value',
          title: '排放气体',
          scopedSlots: { customRender: 'value' },
          ellipsis: true,
        }
      ],
      list: [
        {
          title: '索引信息',
          dataSource: [
            {
              name: '索引',
              isEdit: false,
              isFieldType: 'treeSelect',
              filed: 'emissionFactorTypeId',
              selectFlag: 'emissionFactorTypeIdSelectFlag'
            },
            {
              name: '排放气体',
              isEdit: false,
              isFieldType: 'treeSelect',
              filed: 'emissionGreenhouseGasTypeId',

            },
            {
              name: '排放环节',
              isEdit: false,
              isFieldType: 'select',
              filed: 'emissionLink',
            }
          ]
        },
        {
          title: '数据库信息',
          dataSource: [
            {
              name: '数据库类型',
              isEdit: false,
              isFieldType: 'select',
              filed: 'databaseType',
            },
            {
              name: '数据库',
              isEdit: false,
              isFieldType: 'select',
              filed: 'databaseName',
              options: [],
            },
            {
              name: '数据库版本',
              isEdit: false,
              isFieldType: 'select',
              options: [],
              filed: 'databaseEdition',
            }
          ]
        },
        {
          title: '地域信息/适用范围',
          dataSource: [
            {
              name: '国家',
              isEdit: false,
              isFieldType: 'input',
              maxLength: 30,
              filed: 'country',
              selectFlag: 'countrySelectFlag'
            },
            {
              name: '地区',
              isEdit: false,
              isFieldType: 'input',
              maxLength: 30,
              filed: 'region',
              selectFlag: 'regionSelectFlag'
            }
          ]
        },
        {
          title: '审查信息',
          dataSource: [
            {
              name: '数据类型',
              isEdit: false,
              isFieldType: 'select',
              filed: 'dataType',
            },
            {
              name: '排放因子分类',
              isEdit: false,
              isFieldType: 'select',
              options: [],
              filed: 'emissionFactorType',
            },
            {
              name: '数据分值',
              isEdit: false,
              isFieldType: 'input',
              filed: 'dataScore',
              selectFlag: 'dataScoreSelectFlag'
            },
            {
              name: '不确定性范围',
              isEdit: false,
              isFieldType: 'input',
              filed: 'uncertaintyRange',
              selectFlag: 'uncertaintyRangeSelectFlag'
            },
            {
              name: '数据质量',
              isEdit: false,
              isFieldType: 'input',
              maxLength: 30,
              filed: 'dataQuality',
              selectFlag: 'dataQualitySelectFlag'
            },
            {
              name: '数据供应商',
              isEdit: false,
              isFieldType: 'input',
              maxLength: 100,
              filed: 'dataSupplier',
              selectFlag: 'dataSupplierSelectFlag'
            }
          ]
        },
        {
          title: '补充信息',
          dataSource: [
            {
              name: '参考文献',
              isEdit: false,
              isFieldType: 'textarea',
              maxLength: 300,
              filed: 'reference',
              selectFlag: 'referenceSelectFlag'

            },
            {
              name: '排放因子描述',
              isEdit: false,
              isFieldType: 'textarea',
              maxLength: 200,
              filed: 'emissionFactorDescribe',
              selectFlag: 'emissionFactorDescribeSelectFlag'

            },
            {
              name: '备注',
              isEdit: false,
              isFieldType: 'textarea',
              maxLength: 200,
              filed: 'comment',
              selectFlag: 'commentSelectFlag'
            }
          ]
        }
      ],
      databaseNameValue: "", //数据库名称
      emissionFactorDatabaseId: ''//数据库版本
    };
  },
  computed: {
    ...mapState(['userInfo', 'curOrganisation']),

    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
        onSelect: (record, selected, selectedRows) => {
          record.isEdit = !record.isEdit;
          if (record.isEdit === false) {
            delete record.value
          }
          let filterName = selectedRows.length>0&&selectedRows?.find(item => item.name === '数据库类型')
          if(filterName?.name) {
            this.list[1].dataSource[1].isEdit=true
            this.list[1].dataSource[2].isEdit=true
          }else{
            this.list[1].dataSource[1].isEdit=false
            this.list[1].dataSource[2].isEdit=false
          }
        }
      };
    }
  },
  created() {
    this.getDatabaseTypeOption(); // 数据库类型
    this.getData();
  },
  methods: {
    handleChange(value, record) {
      if(record.name === "数据库类型") {
        this.$nextTick(() => {
          this.selectedRowKeys = this.selectedRowKeys.filter(item => item !== '数据库'&&item !== '数据库版本')
          this.getDatabaseNameOption(value); // 数据库名称
        })
      }
      if(record.name === "数据库") {
        this.list[1].dataSource[2].options=[]
        delete this.list[1].dataSource[2].value
        this.selectedRowKeys = this.selectedRowKeys.filter(item => item !== '数据库版本')
        this.getDatabaseEditionOption(this.list[1].dataSource[0].value, value); // 数据库名称
        this.databaseNameValue = value
      }
      if(record.name === "数据库版本") {
        this.emissionFactorDatabaseId = value
      }
    },
    // 序列化树结构数据
    formatterTreeData(treeData) {
      treeData.forEach(item => {
        item.value = item.key;
        item.title = item.seq ? `${item.seq}. ${item.title}` : item.title;
        if (item.children && item.children.length) {
          this.formatterTreeData(item.children);
        }
      });
      return treeData;
    },
    getData() {
      let api = this.$apiUtil.getEmissionFactorDatabaseApi();
      let greenhouseGasType = api.get_emission_greenhouse_gas_type_option({}); // 取得排放温室气体种类选项列表
      let emissionFactorType = api.get_emission_factor_data_emission_factor_type_option({}); // 取得排放因子分类选项列表
      let emissionFactorTypes = api.get_emission_factor_types({ filterEmptyDataFlag: '0' }); // 取得索引
      let dataType = api.get_emission_factor_data_type_option({}); // 取得排放因子数据类型选项列表
      let emissionLink = api.get_emission_factor_data_emission_link_option({}); // 取得排放因子数据排放环节选项列表

      Promise.all([emissionFactorTypes, greenhouseGasType, emissionFactorType, dataType, emissionLink]).then(
        ([emissionFactorTypesData, greenhouseGasTypeData, emissionFactorTypeData, dataTypeData, emissionLinkData]) => {
          // 索引信息 选择下拉列表
          this.list[0].dataSource[0].treeData = this.formatterTreeData(emissionFactorTypesData.data.list);
          this.list[0].dataSource[1].treeData = this.formatterTreeData(greenhouseGasTypeData.data.list);
          this.list[0].dataSource[2].options  = formatterOption(emissionLinkData.data, 'name', 'name');
          // 审查信息 选择下拉列表
          this.list[3].dataSource[1].options = formatterOption(emissionFactorTypeData.data, 'name', 'id');
          this.list[3].dataSource[0].options = formatterOption(dataTypeData.data, 'name', 'id');
        }
      );
    },
    getDatabaseTypeOption() {
      this.$apiUtil
        .getEmissionFactorDatabaseApi()
        .get_emission_factor_database_type_option({})
        .then(({ data }) => {
          this.list[1].dataSource[0].options = formatterOption(data, 'name', 'id')
        });
    },
    getDatabaseNameOption(databaseType) {
      this.$apiUtil
        .getEmissionFactorDatabaseApi()
        .get_emission_factor_database_name_option({ databaseType })
        .then(({ data }) => {
          const arr = []
          data.map(item => {
            let newItem = {
              label: item,
              value: item
            };
            arr.push(newItem)
            return newItem;
          });
          this.list[1].dataSource[1].options = arr;
        });
    },
    getDatabaseEditionOption(databaseType, databaseName) {
      this.$apiUtil
        .getEmissionFactorDatabaseApi()
        .get_emission_factor_database_edition_option({ databaseType, databaseName })
        .then(({ data }) => {
          data.map(item => {
            item.label = item.databaseEdition;
            item.value = item.id;
            return item;
          });
          this.list[1].dataSource[2].options = data
        });
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      if (selectedRowKeys.indexOf('数据库类型')>-1) {
        this.list[1].dataSource[1].options=[]
        this.list[1].dataSource[2].options=[]
        delete this.list[1].dataSource[1].value
        delete this.list[1].dataSource[2].value
      }
      this.selectedRowKeys = selectedRowKeys;
    },
    onCancel(e) {
      this.visible = false;
    },
    /**
     * @brief: 确认事件，添加、更新逻辑
     */
    onConfirm() {
      let newObj = {}
      this.confirmLoading = true;
      this.list.map(v => {
        v.dataSource.map(k => {
          this.selectedRowKeys.map(key => {
            if(key === k.name) {
              newObj[k.filed] = k.value
              if(k.selectFlag) {
                newObj[k.selectFlag] = 1
              }
            }
            return key
          })
          return k
        })
        return v
      })
      if(newObj.databaseType&&(!this.databaseNameValue||!this.emissionFactorDatabaseId)) {
        this.$message.error('请修改数据库、数据库版本')
        return;
      }
      this.$apiUtil
        .getEmissionFactorDatabaseApi()
        .bulk_edit_emission_factor_data({...newObj, emissionFactorDatabaseId: this.emissionFactorDatabaseId, list: this.pSelections})
        .then(({ data }) => {
          this.visible = false;
          this.$emit('on-hide');
          this.$emit('success');
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.batch-edit {
  margin: 0 16px;
  &:first-child {
    border-top: 1px solid #d9d9d9;
  }
  /deep/.ant-table-tbody > tr {
    height: 40px !important;
    &.ant-table-row-selected td {
      background: #fff;
    }
  }
  /deep/.ant-table-tbody > tr > td {
    padding: 4px 8px !important;
  }
  /deep/.ant-table-small {
    border: 1px solid #d9d9d9;
    border-radius: 0;
  }
  /deep/.ant-table-small.ant-table-bordered .ant-table-content {
    border: none;
  }
  &-title {
    text-align: center;
    background: #f4f4f4;
    border-left: 1px solid #d9d9d9;
    border-right: 1px solid #d9d9d9;
    margin: 0;
    padding: 0 8px;
    height: 36px;
    line-height: 36px;
    color: #666;
  }
  &-input {
    height: 32px;
    line-height: 32px;
    padding: 0 16px;
  }
  .data-base-table{
    /deep/.ant-table-tbody > tr:nth-child(2)>td:nth-child(1)>span,/deep/.ant-table-tbody > tr:nth-child(3)>td:nth-child(1)>span{
      display: none;
    }
  }
}
</style>
