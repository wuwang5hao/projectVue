<template>
<div class="module-directory">
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
        {name: 'contact', title: '关联参数', type: 'primary', click: onContactClicked, disabled: selectKey===''},
      ]"
      :pFilterFields="filterFields"
      :pTotal="total"
      :pPageNum="curPageNum"
      :pCustomRow="customRow"
      :pRowClassName="rowClassName"
      @change="onReload"
    >
      <template slot="calculateWay" slot-scope="calculateWay">
        <span v-if="calculateWay==='1'">+</span>
        <span v-if="calculateWay==='2'">-</span>
      </template>
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
import AddModuleModal from './AddModuleModal'
import ContactParameterModal from './ContactParameterModal'

export default {
  name: 'ModuleDirectory',
  mixins: [TableMixin, OptionsMixin],
  props: ['pJumpModuleId'],
  data() {
    return {
      columns: [
        { title: '序号', key: 'index', primary: true, width: 50, fixed: 'left', customCell: this.customRow },
        { title: '编号', key: 'serialNumber', ellipsis: true, align: 'center', width: 100, defaultSortOrder: 'DESC', customCell: this.customRow },
        { title: '分类', key: 'type', nameField: true, ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '模块名称', key: 'name', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '计算方式', key: 'calculateWay', ellipsis: true, align: 'center', width: 100, customCell: this.customRow, scopedSlots: {customRender: 'calculateWay'}},
        { title: '创建人', key: 'createUserName', ellipsis: true, align: 'center', width: 100, customCell: this.customRow },
        { title: '创建时间', key: 'createTime', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
        { title: '修改人', key: 'updateUserName', ellipsis: true, align: 'center', width: 100, customCell: this.customRow },
        { title: '修改时间', key: 'updateTime', ellipsis: true, align: 'center', width: 150, customCell: this.customRow },
      ],
      columnsRight: [
        { title: '序号', key: 'index', primary: true, width: 50, fixed: 'left'},
        { title: '编号', key: 'serialNumber', nameField: true, ellipsis: true, align: 'center', width: 100, defaultSortOrder: 'DESC'},
        { title: '一级分类', key: 'type', ellipsis: true, align: 'center', width: 150},
        { title: '二级分类', key: 'level2CategoryName', ellipsis: true, align: 'center', width: 150},
        { title: '三级分类', key: 'level3CategoryName', ellipsis: true, align: 'center', width: 150},
        { title: '四级级分类', key: 'level4CategoryName', ellipsis: true, align: 'center', width: 150},
      ],
      filterFields: [
        {label: '模块目录', type: 'str', name: 'moduleType', widget: 'SelectWidget', placeholder: '请选择分类',
          options: []},
        {label: '', type: 'str', name: 'moduleName', placeholder: '请输入模块名称', maxLength: 30}
      ],
      filterFieldsRight: [
        {label: '适配参数', type: 'str', name: 'parameterType', widget: 'SelectWidget', placeholder: '请选择一级分类',
          options: []},
        {label: '', type: 'str', name: 'level2CategoryName', placeholder: '请输入二级分类', maxLength: 30}
      ],
      filterJsonModel: {
        moduleName: '',
        moduleType: ''
      },
      filterJsonModelRight: {
        parameterType: '', level2CategoryName: ''
      },
      dataSource: [],
      dataSourceRight: [],
      total: 0,
      totalRight: 0,
      selectKey: '',
      jumpModuleId: '',
      version: '',
      moduleTypes: [],
      curPageNum: 1,
    }
  },
  watch: {
    selectKey() {
      this.filterJsonModelRight = {
        parameterType: '',
        level2CategoryName: ''
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
        return item.id===this.jumpModuleId
      })
      if(this.jumpModuleId!=='') {
        this.selectKey = this.jumpModuleId
        dataFilter.length && (this.jumpModuleId = '')
        return
      }
      this.selectKey = this.dataSource.length?this.dataSource[0].id:''
    },
  },
  created() {
    this.selectKey = this.pJumpModuleId
    this.jumpModuleId = this.pJumpModuleId
    this.getModuleTypes()
    this.getParameterTypes()
    if(this.pJumpModuleId!=='') {
      this.$apiUtil.getCarbonMaintenanceApi().get_page_number_module({module_id: this.pJumpModuleId}).then(({data}) => {
        this.curPageNum = data.pageNum
      })
    }
  },
  methods: {
    onReload({page, sortObj}) {
      this.$apiUtil.getCarbonMaintenanceApi().get_modules({...this.filterJsonModel, ...page, sortObj}).then(({data}) => {
        this.setData(data)
      })
    },
    onReloadRight({page, sortObj}) {
      if(this.selectKey==='') {
        // this.$message.error('请先选中一条模块目录')
        return
      }
      this.$apiUtil.getCarbonMaintenanceApi().get_parameter_module({...this.filterJsonModelRight, moduleId: this.selectKey, ...page, sortObj}).then(({data}) => {
        this.dataSourceRight = data.list
        this.totalRight = data.total
      })
    },
    // 获取模块分类
    getModuleTypes() {
      this.$apiUtil.getCarbonMaintenanceApi().module_types({}).then(({data}) => {
        this.filterFields[0].options = data.map((item) => {
          let itemType = {
            value: item,
            label: item,
          }
          return itemType
        })
      })
    },
    // 获取参数选项
    getParameterTypes() {
      this.$apiUtil.getCarbonMaintenanceApi().parameter_types({}).then(({data}) => {
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
        cls: AddModuleModal,
        clsprops: {
          pVisible: true,
          pType: 'add',
          pTable: this.$refs.table,
        },
        on: {
          success: () => {
            this.getModuleTypes()
          }
        }
      })
    },
    // 编辑
    onUpdateClicked(row) {
      new ComponentUtil(this.$store, this.$router).create({
        cls: AddModuleModal,
        clsprops: {
          pVisible: true,
          pType: 'update',
          pRow: row,
          pTable: this.$refs.table,
        },
        on: {
          success: () => {
            this.getModuleTypes()
          }
        }
      })
    },
    // 删除
    onDeleteClicked(row) {
      let api = this.$apiUtil.getCarbonMaintenanceApi()
      // let context = {message: '删除成功'}
      api.delete_modules({module_id: row.id, version: row.version}).then((data) => {
        if(this.selectKey === row.id) {
          this.selectKey = ''
        }
        this.getModuleTypes()
        this.$refs.table.reload()
      })
    },
    // 关联标准
    onContactClicked() {
      new ComponentUtil(this.$store).create({
        cls: ContactParameterModal,
        clsprops: {
          pVisible: true,
          pSelectKey: this.selectKey,
          pType: this.moduleTypes
        },
        on: {
          'confirm': () => {
            this.filterJsonModelRight = {
              parameterType: '',
              level2CategoryName: ''
            }
            this.$refs.table1.reload()
          }
        }
      })
    },
    // 跳转
    onJumpClicked(row) {
      this.$emit('onJumpClicked', {title: '参数类型', id: row.id})
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
.module-directory {
  display: flex;
  margin: 0;
  height: calc(100% - 68px);
  padding: 10px;
}
</style>
