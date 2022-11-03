<template>
<div class="parameter-directory">
  <div class="left">
    <input ref="upload" type="file" @change="selectFile" name="upload" style="display: none"/>
    <a ref="download" href="../../static/file/碳规划配置表模板.xlsx"></a>
    <BaseTable
      ref="table"
      :pScrollX=300
      :pColumns="columns"
      :pDataSource="dataSource"
      :pFilterJsonModel="filterJsonModel"
      :pInlineActions="[
        {name: 'update', title: '编辑', toolbar: true, click: onUpdateClicked},
        {name: 'reference', title: '引用', click: onReferenceClicked},
        {name: 'delete', title: '删除', click: onDeleteClicked}
      ]"
      :pActions="[
        {name: 'add', title: '新增', type: 'primary', click: onAddClicked},
        {name: 'download', title: '下载模板', type: 'primary',click:onDownloadClicked },
        {name: 'import', title: '导入碳规划配置表', type: 'primary',click:onImportClicked },
      ]"
      :pFilterFields="filterFields"
      :pTotal="total"
      :pPageNum="curPageNum"
      :pCustomRow="customRow"
      :pRowClassName="rowClassName"
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
        {name: 'update', title: '编辑', toolbar: true, click: onUpdateClickedRight},
        {name: 'delete', title: '删除', click: onDeleteClickedRight}
      ]"
      :pFilterFields="filterFieldsRight"
      :pActions="[
        {name: 'add', title: '新增', type: 'primary', click: onAddClickedRight, disabled: dataSource.length===0},
      ]"
      :pTotal="totalRight"
      :pInitChange="false"
      @change="onReloadRight"
    >
    </BaseTable>
  </div>
</div>
</template>

<script>
import OptionsMixin from "@/common/OptionsMixin"
import TableMixin from "@/components/table/TableMixin";
import UploadMixin from '@/common/UploadMixin';
import { ComponentUtil } from 'jscom/utils/vueutil'
import ConfirmModal from '@/components/ConfirmModal'
import AddParameterModal from './AddParameterModal'
import AddParameterDetailModal from './AddParameterDetailModal'

export default {
  name: 'ParameterDirectory',
  mixins: [TableMixin, OptionsMixin, UploadMixin],
  props: ['pJumpParameterId'],
  data() {
    return {
      columns: [
        { title: '序号', key: 'index', primary: true, width: 50, fixed: 'left', customCell: this.customRow },
        { title: '编号', key: 'serialNumber', ellipsis: true, align: 'center', width: 100, defaultSortOrder: 'DESC', customCell: this.customRow },
        { title: '一级分类', key: 'type', nameField: true, ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '二级分类', key: 'level2CategoryName', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '三级分类', key: 'level3CategoryName', ellipsis: true, align: 'center', width: 150, customCell: this.customRow},
        { title: '四级分类', key: 'level4CategoryName', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
      ],
      columnsRight: [
        { title: '序号', key: 'index', primary: true, width: 50, fixed: 'left'},
        { title: '参数名称', key: 'name', nameField: true, ellipsis: true, align: 'center', width: 100},
        { title: '类型', key: 'type', ellipsis: true, align: 'center', width: 100},
        { title: '数值', key: 'decimalValue', ellipsis: true, align: 'center', width: 100},
        { title: '计量单位', key: 'unit', ellipsis: true, align: 'center', width: 100},
        { title: '资料来源', key: 'source', ellipsis: true, align: 'center', width: 150},
        { title: '备注', key: 'comment', ellipsis: true, align: 'center', width: 150},
        { title: '修改人', key: 'updateUserName', ellipsis: true, align: 'center', width: 100},
        { title: '修改时间', key: 'updateTime', ellipsis: true, align: 'center', width: 150},
      ],
      filterFields: [
        {label: '参数类型', type: 'str', name: 'parameterType', widget: 'SelectWidget', placeholder: '请选择一级分类',
          options: []},
        {label: '', type: 'str', name: 'level2CategoryName', placeholder: '请输入二级分类', maxLength: 30}
      ],
      filterFieldsRight: [
        {label: '参数详情', type: 'str', name: 'parameterName', widget: 'SelectWidget', placeholder: '请选择参数名称',
          options: []},
        {label: '', type: 'str', name: 'type', widget: 'SelectWidget', placeholder: '请选择类型',
          options: []},
      ],
      filterJsonModel: {
        level2CategoryName: '',
        parameterType: ''
      },
      filterJsonModelRight: {
        parameterName: '',
        type: '',
      },
      dataSource: [],
      dataSourceRight: [],
      total: 0,
      totalRight: 0,
      selectKey: '',
      jumpParameterId: '',
      version: '',
      curPageNum: 1,
      uploadAction: '/software_maintenance/carbon_plan/ver1/lead_in_baseline'
    }
  },
  watch: {
    selectKey() {
      this.filterJsonModelRight = {
        parameterName: '',
        type: '',
      }
      if(this.selectKey==='') {
        this.dataSourceRight = []
        this.totalRight = 0
        return
      }
      this.getParameterName()
      this.getParameterType()
      this.$refs.table1.reload()
    },
    dataSource() {
      let dataFilter = this.dataSource.filter((item) => {
        return item.id===this.jumpParameterId
      })
      if(this.jumpParameterId!=='') {
        this.selectKey = this.jumpParameterId
        dataFilter.length && (this.jumpParameterId = '')
        return
      }
      this.selectKey = this.dataSource.length?this.dataSource[0].id:''
    },
  },
  created() {
    this.selectKey = this.pJumpParameterId
    this.jumpParameterId = this.pJumpParameterId
    this.getParameterTypes()
    if(this.pJumpParameterId!=='') {
      this.$apiUtil.getCarbonMaintenanceApi().get_page_number_parameter_type({parameter_type_id: this.pJumpParameterId}).then(({data}) => {
        this.curPageNum = data.pageNum
      })
    }
  },
  methods: {
    onReload({page, sortObj}) {
      this.$apiUtil.getCarbonMaintenanceApi().get_parameter_types({...this.filterJsonModel, ...page, sortObj}).then(({data}) => {
        this.setData(data)
      })
    },
    onReloadRight({page, sortObj}) {
      if(this.selectKey==='') {
        // this.$message.error('请先选中一条参数类型')
        return
      }
      this.$apiUtil.getCarbonMaintenanceApi().get_parameter_detail({...this.filterJsonModelRight, parameter_type_id: this.selectKey, ...page, sortObj}).then(({data}) => {
        this.dataSourceRight = data.list
        this.totalRight = data.total
      })
    },
    // 获取参数选项
    getParameterTypes() {
      this.$apiUtil.getCarbonMaintenanceApi().parameter_types({}).then(({data}) => {
        this.filterFields[0].options = data.map((item) => {
          let itemType = {
            value: item,
            label: item,
          }
          return itemType
        })
      })
    },
    // 获取参数名称选项
    getParameterName() {
      this.$apiUtil.getCarbonMaintenanceApi().parameter_detail_names({parameter_type_id: this.selectKey}).then(({data}) => {
        this.filterFieldsRight[0].options = data.map((item) => {
          let itemType = {
            value: item,
            label: item,
          }
          return itemType
        })
      })
    },
    // 获取参数名称选项
    getParameterType() {
      this.$apiUtil.getCarbonMaintenanceApi().parameter_detail_types({parameter_type_id: this.selectKey}).then(({data}) => {
        this.filterFieldsRight[1].options = data.map((item) => {
          let itemType = {
            value: item,
            label: item,
          }
          return itemType
        })
      })
    },
    // 新增
    onAddClicked() {
      new ComponentUtil(this.$store, this.$router).create({
        cls: AddParameterModal,
        clsprops: {
          pVisible: true,
          pType: 'add',
          pTable: this.$refs.table,
        },
        on: {
          success: () => {
            this.getParameterTypes()
          }
        }
      })
    },
    // 编辑
    onUpdateClicked(row) {
      new ComponentUtil(this.$store, this.$router).create({
        cls: AddParameterModal,
        clsprops: {
          pVisible: true,
          pType: 'update',
          pRow: row,
          pTable: this.$refs.table,
        },
        on: {
          success: () => {
            this.getParameterTypes()
          }
        }
      })
    },
    // 引用
    onReferenceClicked(row) {
      new ComponentUtil(this.$store).create({
        cls: ConfirmModal,
        clsprops: {
          pVisible: true,
          pContent: '是否引用类型%s？',
          pKeyWord: row.type,
        },
        on: {
          'confirm': () => {
            this.$apiUtil.getCarbonMaintenanceApi().parameter_type_reference({id: row.id}).then(() => {
              this.getParameterTypes()
              this.$refs.table.reload()
            })
          }
        }
      })
    },
    // 删除
    onDeleteClicked(row) {
      let api = this.$apiUtil.getCarbonMaintenanceApi()
      // let context = {message: '删除成功'}
      api.delete_parameter_types({parameter_type_id: row.id, version: row.version}).then((data) => {
        if(this.selectKey === row.id) {
          this.selectKey = ''
        }
        this.getParameterTypes()
        this.$refs.table.reload()
      })
    },
    // 新增参数详情
    onAddClickedRight() {
      if(this.selectKey==='') {
        this.$message.error('请先选中一条参数类型')
        return
      }
      new ComponentUtil(this.$store, this.$router).create({
        cls: AddParameterDetailModal,
        clsprops: {
          pVisible: true,
          pType: 'add',
          pTable: this.$refs.table1,
          pSelectKey: this.selectKey,
        },
        on: {
          success: () => {
            this.getParameterName()
            this.getParameterType()
          }
        }
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
    // 下载模板
    onDownloadClicked() {
      this.$refs.download.click()
    },
    // 编辑参数详情
    onUpdateClickedRight(row) {
      new ComponentUtil(this.$store, this.$router).create({
        cls: AddParameterDetailModal,
        clsprops: {
          pVisible: true,
          pType: 'update',
          pRow: row,
          pTable: this.$refs.table1,
        },
        on: {
          success: () => {
            this.getParameterName()
            this.getParameterType()
          }
        }
      })
    },
    // 删除参数详情
    onDeleteClickedRight(row) {
      let api = this.$apiUtil.getCarbonMaintenanceApi()
      // let context = {message: '删除成功'}
      api.delete_parameter_details({parameter_detail_id: row.id, version: row.version}).then((data) => {
        this.getParameterName()
        this.getParameterType()
        this.$refs.table1.reload()
      })
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
            this.version = record.version
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
.parameter-directory {
  display: flex;
  margin: 0;
  height: calc(100% - 68px);
  padding: 16px;
  .right {
    width: 60%;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    .filter {
      .ant-col:first-child {
        width: auto;
      }
      .ant-col:nth-child(2) {
        width: auto;
        margin-right: 11px;
        .label {
          display: none;
        }
        .field {
          min-width: 200px;
        }
      }
      .ant-col:last-child {
        width: 25%;
      }
    }
  }
  .left {
    width: calc(40% - 16px);
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-right: 16px;
    .filter {
      .ant-col:first-child {
        width: 47%;
      }
      .ant-col:nth-child(2) {
        width: 28%;
        margin-right: 4px;
        .label {
          display: none;
        }
        .field {
          min-width: 160px;
        }
      }
      .ant-col:last-child {
        width: 25%;
      }
    }
  }
}
</style>
