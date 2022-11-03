<template>
  <ARow class="emission-factor">
    <ACol class="emission-factor-col" :span="4">
      <EmissionFactorDatabaseLeft :pDatabase="database"
        @changeIndexObj="(changeIndexObj) => indexObj=changeIndexObj"
        @changeGasType="(gasTypeKeys) => gasType=gasTypeKeys">
      </EmissionFactorDatabaseLeft>
    </ACol>
    <ACol class="emission-factor-col" :span="20">
      <input ref="upload" type="file" @change="selectFile" name="upload" style="display: none"/>
      <BaseTable
        ref="table"
        class="emission-factor-table"
        :pScrollX=300
        :pRowCount=4
        :pTitle="titleTotal"
        :pColumns="columns"
        :pDataSource="dataSource"
        :pFilterJsonModel="filterJsonModel"
        :pActions="[
          {name: 'add', title: '新增', type: 'primary', click: ()=>onAddClicked('add')},
          {name: 'upload', title: '下载模板', type: 'primary',click:onUpload},
          {name: 'import', title: '导入', type: 'primary',click:onImportClicked },
          {name: 'export', title: '导出', type: 'primary', click:onExportClicked,disabled:dataSource.length == 0},
          {name: 'batchEdit', title: '批量编辑', type: 'primary', click: onBatchDelClicked,disabled: selections.length == 0},
          {name: 'delete', title: '删除', type: 'danger',click:onDeleteClicked, disabled: selections.length == 0},
        ]"
        :pFilterFields="filterFields"
        :pTotal="total"
        :pSelections="selections"
        @change="onReload"
        :pCustomRow="customRow"
      >
        <!-- 排放因子 -->
        <template slot="emissionFactorSummary" slot-scope="emissionFactorSummary, record">
          <span v-if="emissionFactorSummary==='-'">-</span>
          <template v-else>
            <div class="deal-summary" v-for="(item, index) in record.emissionFactorSummaryDeal" :key="index" :title="item">{{ item || '-' }}</div>
          </template>
        </template>
        <!-- 单位备注 -->
        <template slot="unitCommentSummary" slot-scope="unitCommentSummary, record">
          <span v-if="unitCommentSummary==='-'">-</span>
          <template v-else>
            <div class="deal-summary" v-for="(item, index) in record.unitCommentSummaryDeal" :key="index" :title="item">{{ item || '-' }}</div>
          </template>
        </template>
      </BaseTable>
    <a ref="download" href="../../static/file/排放因子数据库导入模板.xlsx"></a>
    </ACol>
  </ARow>
</template>

<script>
import TableMixin from '@/components/table/TableMixin';
import OptionsMixin from '@/common/OptionsMixin';
import UploadMixin from '@/common/UploadMixin'
import ConfirmModal from '@/components/ConfirmModal';
import { ComponentUtil, formatterOption} from 'jscom/utils/vueutil';
import AddModal from './AddModal';
import BatchEditModal from './BatchEditModal';
import EmissionFactorDatabaseLeft from './EmissionFactorDatabaseLeft'

export default {
  name: 'EmissionFactorDatabase',
  mixins: [TableMixin, OptionsMixin, UploadMixin],
  components: {EmissionFactorDatabaseLeft},
  data() {
    return {
      database: {
        type: undefined,
        name: undefined,
        databaseEdition: undefined
      },
      indexObj: {
        selectedKeys: ['-2'], // 右侧索引选中
        indexText: '全部',
      },
      gasType: [],
      columns: [
        { title: 'ID', key: 'index', primary: true, width: 50, fixed: 'left' },
        { title: '索引', key: 'emissionFactorTypeNoSerialNumberIndexName', nameField: true, ellipsis: true, width: 150, align: 'center', sorter: false, customCell: this.customRow, },
        { title: '排放源', key: 'emissionSource', ellipsis: true, align: 'center', width: 150, customCell: this.customRow, },
        { title: '排放气体', key: 'emissionGreenhouseGasTypeName', ellipsis: true, align: 'center', width: 150, customCell: this.customRow, },
        { title: '排放环节', key: 'emissionLink', ellipsis: true, align: 'center', width: 150, customCell: this.customRow, },
        { title: '排放因子', key: 'emissionFactorSummary', align: 'center', width: 150, sorter: false, scopedSlots: { customRender: 'emissionFactorSummary' }, customCell: this.customRow, },
        { title: '单位备注', key: 'unitCommentSummary', ellipsis: true, align: 'center', width: 150, sorter: false, scopedSlots: { customRender: 'unitCommentSummary' }, customCell: this.customRow, },
        { title: '数据库类型', key: 'emissionFactorDatabaseTypeName', ellipsis: true, align: 'center', width: 150, customCell: this.customRow, },
        { title: '数据库名称', key: 'emissionFactorDatabaseName', ellipsis: true, align: 'center', width: 150, customCell: this.customRow, },
        { title: '数据库版本', key: 'emissionFactorDatabaseEdition', ellipsis: true, align: 'center', width: 150, customCell: this.customRow, },
        { title: '数据类型', key: 'dataTypeName', ellipsis: true, align: 'center', width: 150, customCell: this.customRow, },
        { title: '排放因子分类', key: 'emissionFactorTypeName', ellipsis: true, align: 'center', width: 200, customCell: this.customRow, },
        { title: '数据分值', key: 'dataScore', ellipsis: true, align: 'center', width: 100, sorter: false, customCell: this.customRow, },
        { title: '不确定性范围', key: 'uncertaintyRange', ellipsis: true, align: 'center', width: 100, sorter: false, customCell: this.customRow, },
        { title: '数据质量', key: 'dataQuality', ellipsis: true, align: 'center', width: 100, sorter: false, customCell: this.customRow, },
        { title: '数据供应商', key: 'dataSupplier', ellipsis: true, align: 'center', width: 150, customCell: this.customRow, },
        { title: '国家', key: 'country', ellipsis: true, align: 'center', width: 100, customCell: this.customRow, },
        { title: '区域', key: 'region', ellipsis: true, align: 'center', width: 100, customCell: this.customRow, },
        { title: '参考文献', key: 'reference', ellipsis: true, align: 'center', width: 150, sorter: false, customCell: this.customRow, },
        { title: '排放因子描述', key: 'emissionFactorDescribe', ellipsis: true, align: 'center', width: 150, sorter: false, customCell: this.customRow, },
        { title: '信息备注', key: 'comment', ellipsis: true, align: 'center', width: 150, sorter: false, customCell: this.customRow, },
        { title: '更新人', key: 'updateUserName', ellipsis: true, align: 'center', width: 150, sorter: false, customCell: this.customRow, },
        { title: '更新时间', key: 'updateTime', ellipsis: true, align: 'center', width: 150, customCell: this.customRow, },
      ],
      filterFields: [
        {label: '索引', type: 'str', name: 'indexText', readonly: true},
        {label: '排放源', type: 'str', name: 'emissionSource'},
        {label: '排放环节', type: 'str', name: 'emissionLink', widget: 'SelectWidget', mode: 'tags', maxTagsCount: 1, options: []},
        {label: '数据类型', type: 'str', name: 'dataType', widget: 'SelectWidget', options: []},
        {label: '排放因子分类', type: 'str', name: 'emissionFactorType', widget: 'SelectWidget', options: []},
        {label: '数据供应商', type: 'str', name: 'dataSupplier', widget: 'SelectWidget', options: []},
        {label: '国家', type: 'str', name: 'country', widget: 'SelectWidget', options: []},
        {label: '区域', type: 'str', name: 'region', widget: 'SelectWidget', options: []},
        {label: '参考文献', type: 'str', name: 'reference'},
      ],
      dataSource: [],
      filterJsonModel: {
        indexText: '全部',
        dataSupplier: '',
        country: '',
        region: ''
      },
      selections: [],
      total: 0,
      page: {
        pageNum: '',
        pageSize: '',
      },
      sortObj: {},
      uploadAction: '/software_maintenance/emission_factor/ver1/lead_in_emission_factor_data'
    }
  },
  computed: {
    titleTotal() {
      return `排放数据（ ${this.total}条 ）`
    }
  },
  created () {
    this.getOptions()
    this.getRealTimeOptions('first')
  },
  watch: {
    'indexObj.indexText'(val) {
      this.filterJsonModel.indexText = val
    },
  },
  methods: {
    onUpload() {
      this.$refs.download.click()
    },
    /**
     * 导入点击
     */
    onImportClicked() {
      this.$refs.upload.click()
    },
    selectFile (event) {
      let { files } = event.target
      if (!files.length) {
        return
      }
      this.filename = files[0].name
      if (this.isDirectUpload) {
        this.post(files[0], {}, this.getRealTimeOptions)
      } else {
        this.selFile = files[0]
        this.post(this.selFile, {}, this.getRealTimeOptions)
      }
      event.target.value = ''
      // this.post(this.selFile)
    },
    customRow(record) {
      return {
        on: {
          dblclick: () => {
            // console.log('record', record);
            Object.keys(record).map(key => {
              if(record[key] === '-') {
                record[key] = ''
              }
              return key
            })
            this.onAddClicked('update', record)
          },
        },
      }
    },
    formatSelections() {
      let list = this.selections.map((item) => {
        return {
          id: item.id,
          version: item.version
        }
      })
      return list
    },
    onReload({ page, sortObj }) {
      this.sortObj = sortObj
      this.page = page
      let jsonModel = {
        ...this.filterJsonModel,
        emissionFactorDatabaseType: this.database.type,
        emissionFactorDatabaseName: this.database.name,
        emissionFactorDatabaseEdition: this.database.databaseEdition,
        emissionFactorTypeId: Number(this.indexObj.selectedKeys[0]),
        emissionGreenhouseGasTypeIdList: this.gasType,
      }
      this.$apiUtil
        .getEmissionFactorDatabaseApi()
        .get_emission_factor_data({
          ...jsonModel,
          ...page,
          sortObj
        })
        .then(({ data }) => {
          data.list.forEach((item) => {
            if(item.emissionFactorSummary) {
              item.emissionFactorSummaryDeal = item.emissionFactorSummary.split('\n')
              item.emissionFactorSummaryDeal.pop()
            }
            if(item.unitCommentSummary) {
              item.unitCommentSummaryDeal = item.unitCommentSummary.split('\n')
              item.unitCommentSummaryDeal.pop()
            }
          })
          data.list.map(item => {
            item.key = item.id;
            return item
          })
          this.setData(data);
        });
    },
    getOptions() {
      let api = this.$apiUtil.getEmissionFactorDatabaseApi();
      let emissionLink = api.get_emission_factor_data_emission_link_option({}); // 排放环节
      let dataType = api.get_emission_factor_data_type_option({}); // 数据类型
      let emissionFactorType = api.get_emission_factor_data_emission_factor_type_option({}); // 排放因子分类

      Promise.all([
        emissionLink,
        dataType,
        emissionFactorType,
      ]).then(
        ([
          emissionLinkOption,
          dataTypeOption,
          emissionFactorTypeOption,
        ]) => {
          this.filterFields[2].options  = formatterOption(emissionLinkOption.data, 'name', 'name') // 排放环节
          this.filterFields[3].options  = formatterOption(dataTypeOption.data, 'name', 'id') // 数据类型
          this.filterFields[4].options  = formatterOption(emissionFactorTypeOption.data, 'name', 'id') // 排放因子分类
        }
      );
    },
    getRealTimeOptions(type) {
      let api = this.$apiUtil.getEmissionFactorDatabaseApi();
      let dataSupplier = api.get_data_supplier_option({}) // 数据供应商
      let country = api.get_data_country_option({}) // 国家
      let region = api.get_data_region_option({}) // 区域

      Promise.all([
        dataSupplier,
        country,
        region,
      ]).then(
        ([
          dataSupplierOption,
          countryOption,
          regionOption,
        ]) => {
          this.filterFields[5].options  = this.dealOption(dataSupplierOption.data) // 数据供应商
          this.filterFields[6].options  = this.dealOption(countryOption.data) // 国家
          this.filterFields[7].options  = this.dealOption(regionOption.data) // 区域
          if(this.filterJsonModel.dataSupplier && !dataSupplierOption.data.filter((item) => item === this.filterJsonModel.dataSupplier).length) {
            this.filterJsonModel.dataSupplier = ''
          }
          if(this.filterJsonModel.country && !countryOption.data.filter((item) => item === this.filterJsonModel.country).length) {
            this.filterJsonModel.country = ''
          }
          if(this.filterJsonModel.region && !regionOption.data.filter((item) => item === this.filterJsonModel.region).length) {
            this.filterJsonModel.region = ''
          }
          type !== 'first' && this.$refs.table.reload()
        }
      );
    },
    dealOption(data) {
      if (!data.length) {
        return []
      }
      let newData = data.map(item => {
        return {
          label: item,
          value: item
        }
      })
      return newData
    },
    /**
     * 添加排放因子
     */
    onAddClicked(type, row) {
      new ComponentUtil(this.$store, this.$router).create({
        cls: AddModal,
        clsprops: {
          pVisible: true,
          pType: type,
          pTable: this.$refs.table,
          pRow: row
        },
        on: {
          success: () => {
            // this.$refs.table.reload();
            this.getRealTimeOptions()
          }
        }
      });
    },
    /**
     * 批量编辑
     */
    onBatchDelClicked() {
      new ComponentUtil(this.$store, this.$router).create({
        cls: BatchEditModal,
        clsprops: {
          pVisible: true,
          pSelections: this.formatSelections()
        },
        on: {
          success: () => {
            // this.$refs.table.reload()
            this.selections = []
            this.getRealTimeOptions()
          },
        },
      });
    },
    onDeleteClicked() {
      new ComponentUtil(this.$store).create({
        cls: ConfirmModal,
        clsprops: {
          pVisible: true,
          pType: 'warn',
          pTitle: '确认信息',
          pContent: '确定要删除选中数据吗？',
          // pKeyWord: row.name
        },
        on: {
          confirm: () => {
            this.$apiUtil.getEmissionFactorDatabaseApi().bulk_delete_emission_factor_data({
              list: this.formatSelections()
            }).then(() => {
              // this.$refs.table.reload()
              this.selections = []
              this.getRealTimeOptions()
            })
          },
        },
      })
    },
    // 导出
    onExportClicked() {
      let exportIdList = this.selections.map((item) => {
        return item.id
      })
      let jsonModel = {
        ...this.filterJsonModel,
        emissionFactorDatabaseType: this.database.type,
        emissionFactorDatabaseName: this.database.name,
        emissionFactorDatabaseEdition: this.database.databaseEdition,
        emissionFactorTypeId: Number(this.indexObj.selectedKeys[0]),
        emissionGreenhouseGasTypeIdList: this.gasType,
        exportIdList,
        page: this.page,
        sortObj: this.sortObj
      }
      // console.log('jsonModel', this.selections, this.sortObj, this.page);
      let context = {message: '导出成功'}
      this.$apiUtil.getEmissionFactorDatabaseApi().export_emission_factor_data({...jsonModel, context}).then()
    },
  }
}
</script>
<style lang="less">
.emission-factor {
  height: 100%;
  margin-left: 16px;
  margin-right: 0;
  padding-bottom: 16px;
  &-col {
    height: 100%;
    padding: 0;
  }
  &-table {
    padding-top: 0!important;
    .filter {
      .row .ant-col {
        margin-right: 0;
        padding-right: 10px!important;
      }
      .label {
        width: 110px!important;
        margin-right: 8px;
      }
      .field {
        min-width: auto;
      }
      .filter-button {
        margin-left: 16px;
      }
      .row:first-child .ant-col:first-child {
        .field {
          display: flex;
          overflow: hidden;
          span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .deal-summary {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
@media screen and (max-width: 1440px) {
  .filter {
    .field {
      width: 80%!important;
    }
  }
}
</style>
