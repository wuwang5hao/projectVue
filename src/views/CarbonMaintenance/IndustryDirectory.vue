<template>
<div class="industry-directory">
  <div class="left">
    <input ref="upload" type="file" @change="selectFile" name="upload" style="display: none"/>
    <BaseTable
      ref="table"
      :pScrollX=300
      :pColumns="columns"
      :pDataSource="dataSource"
      :pFilterJsonModel="filterJsonModel"
      :pInlineActions="[
        {name: 'update', title: '编辑', toolbar: true, click: onUpdateClicked},
        {name: 'delete', title: '删除', click: onDeleteClicked}
      ]"
      :pActions="[
        {name: 'add', title: '新增', type: 'primary', click: onAddClicked},
        {name: 'import', title: '导入', type: 'primary',click:onImportClicked },
        {name: 'contact', title: '关联标准', type: 'primary', click: onContactClicked, disabled: !selections.length},
        {name: 'batch_delete', title: '批量删除', type: 'danger', click: onBatchDeleteClicked, disabled: !selections.length},
      ]"
      :pFilterFields="filterFields"
      :pTotal="total"
      :pCustomRow="customRow"
      :pRowClassName="rowClassName"
      :pSelections="selections"
      @change="onReload"
    >
    </BaseTable>
  </div>
  <div class="right">
    <BaseTable
      ref="table1"
      :pScrollX=300
      :pColumns="columnsRight"
      :pDataSource="dataSourceRight"
      :pFilterJsonModel="filterJsonModelRight"
      :pInlineActions="[
        {name: 'update', title: '设为默认', toolbar: true, click: onSetDefaultClicked,
          visible: (row) => {
            return row.defaultStandard==='否'
          }
        },
        {name: 'jump', title: '跳转', click: onJumpClicked}
      ]"
      :pFilterFields="filterFieldsRight"
      :pTotal="totalRight"
      :pInitChange="false"
      @change="onReloadRight"
    >
    </BaseTable>
  </div>
  <div class="loading" v-if="isLoading">
    <AIcon type="loading" class="loading_icon" />
  </div>
</div>
</template>

<script>
import OptionsMixin from "@/common/OptionsMixin"
import TableMixin from "@/components/table/TableMixin";
import UploadMixin from '@/common/UploadMixin';
import { ComponentUtil } from 'jscom/utils/vueutil'
import ConfirmModal from '@/components/ConfirmModal'
import AddIndustryModal from './AddIndustryModal'
import ContactStandardModal from './ContactStandardModal'

export default {
  name: 'IndustryDirectory',
  mixins: [TableMixin, OptionsMixin, UploadMixin],
  data() {
    return {
      columns: [
        { title: '序号', key: 'index', primary: true, width: 50, customCell: this.customRow, fixed: 'left' },
        { title: '行业代码', key: 'tradeCode', nameField: true, ellipsis: true, width: 100, align: 'center', defaultSortOrder: 'DESC', customCell: this.customRow },
        { title: '门类', key: 'kindName', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '大类', key: 'largeCategoryName', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '中类', key: 'mediumCategoryName', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '小类', key: 'littleCategoryName', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '创建人', key: 'createUserName', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '创建时间', key: 'createTime', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '修改人', key: 'updateUserName', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '修改时间', key: 'updateTime', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
      ],
      columnsRight: [
        { title: '序号', key: 'index', primary: true, fixed: 'left', width: 50},
        { title: '编号', key: 'serialNumber', nameField: true, ellipsis: true, width: 100, align: 'center', defaultSortOrder: 'DESC'},
        { title: '类型', key: 'type', ellipsis: true, width: 150, align: 'center'},
        { title: '标准名称', key: 'name', ellipsis: true, width: 150, align: 'center'},
        { title: '场景', key: 'scene', ellipsis: true, width: 150, align: 'center'},
        { title: '默认项', key: 'defaultStandard', ellipsis: true, width: 80, align: 'center'},
      ],
      filterFields: [{label: '行业目录', type: 'int_list', name: 'tradeKey', widget: 'CascaderWidget', options: [], placeholder: '请输入行业关键词', maxLength: 20}],
      filterFieldsRight: [
        {label: '适配标准', type: 'str', name: 'standardType', widget: 'SelectWidget', placeholder: '请选择类型',
          options: []},
        {label: '', type: 'str', name: 'standardName', placeholder: '请输入标准名称', maxLength: 30}
      ],
      filterJsonModel: {
        tradeKey: []
      },
      filterJsonModelRight: {
        standardName: '', standardType: ''
      },
      dataSource: [],
      dataSourceRight: [],
      total: 0,
      totalRight: 0,
      selectKey: '',
      selections: [],
      standardTypes: [],
      isLoading: false,
      uploadAction: '/software_maintenance/carbon_account/ver1/lead_in_trade'
    }
  },
  watch: {
    selectKey() {
      this.filterJsonModelRight = {
        standardName: '',
        standardType: ''
      }
      if(this.selectKey==='') {
        this.dataSourceRight = []
        this.totalRight = 0
        return
      }
      this.$refs.table1.reload()
    },
    dataSource() {
      this.selectKey = this.dataSource.length?this.dataSource[0].id:''
    },
  },
  created() {
    this.getTradeOptions()
    this.getStandardTypes()
  },
  methods: {
    onReload({page, sortObj}) {
      this.selections = []
      // this.selectKey = ''
      this.$apiUtil.getCarbonMaintenanceApi().get_trade({...this.filterJsonModel, ...page, sortObj}).then(({data}) => {
        this.setData(data)
      })
    },
    onReloadRight({page, sortObj}) {
      if(this.selectKey === '') {
        // this.$message.error('请先选中一条行业目录')
        return
      }
      this.$apiUtil.getCarbonMaintenanceApi().get_standard_trade({...this.filterJsonModelRight, tradeId: this.selectKey, ...page, sortObj}).then(({data}) => {
        this.dataSourceRight = data.list
        this.totalRight = data.total
      })
    },
    getTradeOptions() {
      this.$apiUtil.getCarbonMaintenanceApi().get_trade_option({}).then(({data}) => {
        let tradeList = data
        tradeList.forEach((trade) => {
          trade.value = trade.kindName
          trade.label = trade.kindName
          if (trade.largeCategoryList) {
            trade.largeCategoryList.forEach((largeCategory) => {
              largeCategory.value = largeCategory.largeCategoryName
              largeCategory.label = largeCategory.largeCategoryName
              if (largeCategory.mediumCategoryList) {
                largeCategory.mediumCategoryList.forEach((mediumCategory) => {
                  mediumCategory.value = mediumCategory.tradeCode ? mediumCategory.tradeCode : mediumCategory.mediumCategoryName
                  mediumCategory.label = mediumCategory.mediumCategoryName
                  if (mediumCategory.littleCategoryList) {
                    mediumCategory.littleCategoryList.forEach((littleCategory) => {
                      littleCategory.value = littleCategory.tradeCode
                      littleCategory.label = littleCategory.littleCategoryName
                    })
                    mediumCategory.children = mediumCategory.littleCategoryList
                  }
                })
                largeCategory.children = largeCategory.mediumCategoryList
              }
            })
            trade.children = trade.largeCategoryList
          }
        })
        this.filterFields[0].options = tradeList
      })
    },
    // 获取标准类型
    getStandardTypes() {
      this.$apiUtil.getCarbonMaintenanceApi().standard_types({}).then(({data}) => {
        this.standardTypes = data.map((item) => {
          let itemType = {
            value: item,
            label: item,
          }
          return itemType
        })
        this.filterFieldsRight[0].options = this.standardTypes
      })
    },
    // 新增
    onAddClicked() {
      new ComponentUtil(this.$store, this.$router).create({
        cls: AddIndustryModal,
        clsprops: {
          pVisible: true,
          pType: 'add',
          pTable: this.$refs.table,
        },
        on: {
          success: () => {
            this.getTradeOptions()
          }
        }
      })
    },
    // 编辑
    onUpdateClicked(row) {
      new ComponentUtil(this.$store, this.$router).create({
        cls: AddIndustryModal,
        clsprops: {
          pVisible: true,
          pType: 'update',
          pRow: row,
          pTable: this.$refs.table,
        },
        on: {
          success: () => {
            this.getTradeOptions()
          }
        }
      })
    },
    // 删除
    onDeleteClicked(row) {
      let api = this.$apiUtil.getCarbonMaintenanceApi()
      // let context = {message: '删除成功'}
      api.delete_trade({trade_id: row.id, version: row.version}).then((data) => {
        if(this.selectKey === row.id) {
          this.selectKey = ''
        }
        this.getTradeOptions()
        this.$refs.table.reload()
      })
    },
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
        this.post(files[0], {})
      } else {
        this.selFile = files[0]
        this.post(this.selFile, {})
      }
      event.target.value = ''
    },
    // 关联标准
    onContactClicked() {
      let tradeList = this.selections.map((item) => {
        return item.id
      })
      new ComponentUtil(this.$store).create({
        cls: ContactStandardModal,
        clsprops: {
          pVisible: true,
          pTradeList: tradeList,
          pType: this.standardTypes
        },
        on: {
          'confirm': () => {
            this.filterJsonModelRight = {
              standardName: '',
              standardType: ''
            }
            this.selectKey !== ''&& (this.$refs.table1.reload())
          }
        }
      })
    },
    // 批量删除
    onBatchDeleteClicked() {
      new ComponentUtil(this.$store).create({
        cls: ConfirmModal,
        clsprops: {
          pVisible: true,
          pType: 'warn',
          pTitle: '确认信息',
          pContent: '确定要删除吗？',
        },
        on: {
          confirm: () => {
            const list = this.selections.map((item) => {
              const { id, version } = item;
              return { id, version };
            })
            let api = this.$apiUtil.getCarbonMaintenanceApi()
            api.batch_delete_trade({list}).then((data) => {
              this.selections = [];
              this.getTradeOptions()
              this.$refs.table.reload()
            })
          },
        },
      })
    },
    // 设为默认
    onSetDefaultClicked(row) {
      this.isLoading = true
      let jsonModel = {
        trade_id: this.selectKey,
        standardId: row.id,
        version: row.version,
      }
      this.$apiUtil.getCarbonMaintenanceApi().edit_trade_default_standard(jsonModel).then(({data}) => {
        this.$refs.table1.reload()
      }).finally(() => {
        this.isLoading = false
      })
    },
    // 跳转
    onJumpClicked(row) {
      this.$emit('onJumpClicked', {title: '标准目录', id: row.id})
    },
    customRow(record) {
      return {
        on: {
          click: () => {
            // if(this.selectKey === record.id) {
            //   this.selectKey = ''
            //   return
            // }
            this.selectKey = record.id
          },
        },
      }
    },
    rowClassName(record, index) {
      if (this.selectKey === record.id) {
        return 'select-row'
      }
      return '';
    },
  }
}
</script>

<style lang='less'>
.industry-directory {
  display: flex;
  margin: 0;
  height: calc(100% - 68px);
  padding: 16px;
  .ant-cascader-menu-item-expand .ant-cascader-menu-item-expand-icon, .ant-cascader-menu-item-loading-icon {
    position: absolute;
    right: 10px;
  }
  .right {
    .inline-action {
      width: 120px!important;
    }
  }
  .loading {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.45);
    .loading_icon {
      color: #aaa;
      display: flex;
      font-size: 40px;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
