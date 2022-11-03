<template>
<div class="standard-directory">
  <div class="left">
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
        {name: 'contact', title: '关联模块', type: 'primary', click: onContactClicked, disabled: !selections.length},
        {name: 'batch_delete', title: '批量删除', type: 'danger', click: onBatchDeleteClicked, disabled: !selections.length},
      ]"
      :pFilterFields="filterFields"
      :pTotal="total"
      :pPageNum="curPageNum"
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
        {name: 'jump', title: '跳转', click: onJumpClicked}
      ]"
      :pFilterFields="filterFieldsRight"
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
import { ComponentUtil } from 'jscom/utils/vueutil'
import ConfirmModal from '@/components/ConfirmModal'
import AddStandardModal from './AddStandardModal'
import ContactModuleModal from './ContactModuleModal'

export default {
  name: 'StandardDirectory',
  mixins: [TableMixin, OptionsMixin],
  props: ['pJumpStandardId'],
  data() {
    return {
      columns: [
        { title: '序号', key: 'index', primary: true, width: 50, fixed: 'left', customCell: this.customRow },
        { title: '编号', key: 'serialNumber', ellipsis: true, align: 'center', width: 100, defaultSortOrder: 'DESC', customCell: this.customRow },
        { title: '类型', key: 'type', nameField: true, ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '标准名称', key: 'name', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '场景', key: 'scene', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '创建人', key: 'createUserName', ellipsis: true, align: 'center', width: 100, customCell: this.customRow },
        { title: '创建时间', key: 'createTime', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '修改人', key: 'updateUserName', ellipsis: true, align: 'center', width: 100, customCell: this.customRow },
        { title: '修改时间', key: 'updateTime', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
      ],
      columnsRight: [
        { title: '序号', key: 'index', primary: true, width: 50, fixed: 'left'},
        { title: '编号', key: 'serialNumber', nameField: true, ellipsis: true, align: 'center', width: 100, defaultSortOrder: 'DESC'},
        { title: '分类', key: 'type', ellipsis: true, align: 'center', width: 150},
        { title: '模块名称', key: 'name', ellipsis: true, align: 'center', width: 150},
        { title: '计算方式', key: 'calculateWay', ellipsis: true, align: 'center', width: 100},
      ],
      filterFields: [
        {label: '标准目录', type: 'str', name: 'standardType', widget: 'SelectWidget', placeholder: '请选择类型',
          options: []},
        {label: '', type: 'str', name: 'standardName', placeholder: '请输入标准名称', maxLength: 30}
      ],
      filterFieldsRight: [
        {label: '适配模块', type: 'str', name: 'moduleType', widget: 'SelectWidget', placeholder: '请选择分类',
          options: []},
        {label: '', type: 'str', name: 'moduleName', placeholder: '请输入模块名称', maxLength: 30}
      ],
      filterJsonModel: {
        standardName: '',
        standardType: ''
      },
      filterJsonModelRight: {
        moduleType: '', moduleName: ''
      },
      dataSource: [],
      dataSourceRight: [],
      total: 0,
      totalRight: 0,
      selectKey: '',
      jumpStandardId: '',
      version: '',
      selections: [],
      moduleTypes: [],
      curPageNum: 1,
    }
  },
  watch: {
    selectKey() {
      this.filterJsonModelRight = {
        moduleType: '',
        moduleName: ''
      }
      if(this.selectKey==='') {
        this.dataSourceRight = []
        this.totalRight = 0
        return
      }
      this.$refs.table1.reload()
    },
    dataSource() {
      let dataFilter = this.dataSource.filter((item) => {
        return item.id===this.jumpStandardId
      })
      if(this.jumpStandardId!=='') {
        this.selectKey = this.jumpStandardId
        dataFilter.length && (this.jumpStandardId = '')
        return
      }
      this.selectKey = this.dataSource.length?this.dataSource[0].id:''
    },
  },
  created() {
    this.selectKey = this.pJumpStandardId
    this.jumpStandardId = this.pJumpStandardId
    this.getStandardTypes()
    this.getModuleTypes()
    if(this.pJumpStandardId!=='') {
      this.$apiUtil.getCarbonMaintenanceApi().get_page_number_standard({standard_id: this.pJumpStandardId}).then(({data}) => {
        this.curPageNum = data.pageNum
      })
    }
  },
  methods: {
    onReload({page, sortObj}) {
      this.selections = []
      this.$apiUtil.getCarbonMaintenanceApi().get_standard({...this.filterJsonModel, ...page, sortObj}).then(({data}) => {
        this.setData(data)
      })
    },
    onReloadRight({page, sortObj}) {
      if(this.selectKey==='') {
        // this.$message.error('请先选中一条标准目录')
        return
      }
      this.$apiUtil.getCarbonMaintenanceApi().get_module_standard({...this.filterJsonModelRight, standardId: this.selectKey, ...page, sortObj}).then(({data}) => {
        this.dataSourceRight = data.list
        this.totalRight = data.total
      })
    },
    // 获取标准目录类型
    getStandardTypes() {
      this.$apiUtil.getCarbonMaintenanceApi().standard_types({}).then(({data}) => {
        this.filterFields[0].options = data.map((item) => {
          let itemType = {
            value: item,
            label: item,
          }
          return itemType
        })
      })
    },
    // 获取模块分类
    getModuleTypes() {
      this.$apiUtil.getCarbonMaintenanceApi().module_types({}).then(({data}) => {
        this.moduleTypes = data.map((item) => {
          let itemType = {
            value: item,
            label: item,
          }
          return itemType
        })
        this.filterFieldsRight[0].options = this.moduleTypes
      })
    },
    // 新增
    onAddClicked() {
      new ComponentUtil(this.$store, this.$router).create({
        cls: AddStandardModal,
        clsprops: {
          pVisible: true,
          pType: 'add',
          pTable: this.$refs.table,
        },
        on: {
          success: () => {
            this.getStandardTypes()
          }
        }
      })
    },
    // 编辑
    onUpdateClicked(row) {
      new ComponentUtil(this.$store, this.$router).create({
        cls: AddStandardModal,
        clsprops: {
          pVisible: true,
          pType: 'update',
          pRow: row,
          pTable: this.$refs.table,
        },
        on: {
          success: () => {
            this.getStandardTypes()
          }
        }
      })
    },
    // 删除
    onDeleteClicked(row) {
      let api = this.$apiUtil.getCarbonMaintenanceApi()
      // let context = {message: '删除成功'}
      api.delete_standard({standard_id: row.id, version: row.version}).then((data) => {
        if(this.selectKey === row.id) {
          this.selectKey = ''
        }
        this.getStandardTypes()
        this.$refs.table.reload()
      })
    },
    // 关联标准
    onContactClicked() {
      let standardList = this.selections.map((item) => {
        return item.id
      })
      new ComponentUtil(this.$store).create({
        cls: ContactModuleModal,
        clsprops: {
          pVisible: true,
          pStandardList: standardList,
          pType: this.moduleTypes
        },
        on: {
          'confirm': () => {
            this.filterJsonModelRight = {
              moduleType: '',
              moduleName: ''
            }
            this.selectKey !== ''&&(this.$refs.table1.reload())
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
            api.batch_delete_standard({list}).then((data) => {
              this.selections = [];
              this.getStandardTypes()
              this.$refs.table.reload()
            })
          },
        },
      })
    },
    // 跳转
    onJumpClicked(row) {
      this.$emit('onJumpClicked', {title: '模块目录', id: row.id})
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
.standard-directory {
  display: flex;
  margin: 0;
  height: calc(100% - 68px);
  padding: 10px;
}
</style>
