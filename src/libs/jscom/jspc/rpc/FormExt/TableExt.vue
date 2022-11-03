<template>
  <div>
    <Form ref="form" :model="curModel" >
      <Table class='te-table'
        ref="tablesMain"
        :data="initTableRecords"
        :columns="insideColumns"
        :stripe="stripe"
        :border="border"
        :show-header="showHeader"
        :width="width"
        :height="height"
        :loading="loading"
        :disabled-hover="disabledHover"
        :highlight-row="highlightRow"
        :row-class-name="rowClassName"
        :size="size"
        :no-data-text="noDataText"
        :no-filtered-data-text="noFilteredDataText"
        @on-current-change="onCurrentChange"
        @on-select="onSelect"
        @on-select-cancel="onSelectCancel"
        @on-select-all="onSelectAll"
        @on-selection-change="onSelectionChange"
        @on-sort-change="onSortChange"
        @on-filter-change="onFilterChange"
        @on-row-click="onRowClick"
        @on-row-dblclick="onRowDblclick"
        @on-expand="onExpand"
      >
        <slot name="header" slot="header"></slot>
        <slot name="footer" slot="footer"></slot>
        <slot name="loading" slot="loading"></slot>
      </Table>
    </Form>
  </div>
</template>

<script>
import EditCell from './EditCell.vue'
import { actionButtons } from './ActionButtons'
import './index.less'
import { TableSpec } from 'jspc/rpc/table/data/TableSpec'
export default {
  name: 'TableExt',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    pSpec: { type: Object },
    size: { type: String, default: 'small' },
    pWidth: { type: [Number, String] },
    pHeight: { type: [Number, String] },
    pMinHeight: {
      type: [Number, String],
      default: 350,
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default () {
        return ''
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * @description 全局设置是否可编辑
     */
    pEditable: {
      type: Boolean,
      default: true
    },
    pMinEmptyCount: { type: Number, default: 3 },
    pOperation: {
      type: Boolean,
      default: true
    },
    pBeforeSaveEdit: {
      type: Function,
      default: (params, cell) => {
      }
    }
  },
  /**
   * Events
   * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
   * @on-cancel-edit 返回值 {Object} 同上
   * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
   */
  data () {
    return {
      spec: this.pSpec,
      tableSpec: new TableSpec(this),
      insideColumns: [],
      initTableRecords: [], // 只用来初始化表格，或者数据的条数发生改变需要更新此变量
      insideTableRecords: [], // 此数组中的record就是insideTableCtxs中的jsonModel
      insideTableCtxs: [], // 保留table cell的当前数据
      editingCellId: '',
      editingText: '',
      minHeight: this.pMinHeight,
      width: this.pWidth,
      height: this.pHeight,
      curModel: {},
    }
  },
  created() {
  },
  computed: {
    isEditing() {
      return this.editingCellId !== ''
    },
  },
  provide: {'tableExt': this},
  methods: {
    supportEdit (item, index, column) {
      let _this = this
      item.render = (h, params) => {
        let cellId = `cell-${params.index}-${params.column.key}`
        let ctxOrig = _this.insideTableCtxs[params.index]
        // NOTE: 为了表格临时修改数据污染 table 内原有数据，以及修改数据引发 table 的重绘，这里 cell 绑定数据为深度复制数据
        let ctx = ctxOrig.cellCtx || JSON.parse(JSON.stringify(ctxOrig))
        if (!ctxOrig.cellCtx) {
          ctxOrig.cellCtx = ctx
        }
        let cell = h(EditCell, {
          ref: cellId,
          props: {
            pParams: params,
            pTableExt: _this,
            pCellId: cellId,
            pEditable: _this.pEditable && item.editable,
            pColumn: column,
            pCtx: ctx,
            pForm: _this.$refs.form,
            pTable: _this,
          },
          on: {
            'input': (val, cell) => {
              _this.editingText = val
            },
            'on-start-edit': (params, cell) => {
              // try close current editing cell
              if (_this.editingCellId) {
                this.$Message.warning('请确认其他修改')
              } else {
                _this.editingCellId = cell.pCellId
                _this.curModel = cell.ctx.model
                _this.$emit('on-start-edit', params)
              }
            },
            'on-cancel-edit': (params, cell) => {
              _this.editingCellId = ''
              _this.$emit('on-cancel-edit', params)
              _this.curModel = {}

              // NOTE: 恢复 table 中的数据深度拷贝到 cell 中
              let ctxOrig = _this.insideTableCtxs[params.index]
              let ctxOrigCopy = JSON.parse(JSON.stringify(ctxOrig))
              if (ctxOrigCopy.cellCtx) {
                delete ctxOrigCopy.cellCtx
              }
              Object.assign(cell.ctx, ctxOrigCopy)
            },
            'on-save-edit': (params, cell, widget) => {
              _this.editingCellId = ''
              _this.curModel = {}
              if (!_this.insideTableRecords[params.row.initRowIndex]._checked) {
                delete cell.ctx.model._checked
              }
              if (_this.beforeSaveEdit) {
                _this.beforeSaveEdit(params, cell)
              }
              // NOTE: cell 中的数据深度拷贝到 table 数据中
              let ctx = JSON.parse(JSON.stringify(cell.ctx))
              Object.assign(_this.insideTableCtxs[params.row.initRowIndex], ctx)
              Object.assign(_this.insideTableRecords[params.row.initRowIndex], ctx.jsonModel)
              _this.tryExtendRecords(false)
              _this.$emit('on-save-edit', params)
            }
          }
        })
        return cell
      }
      return item
    },
    updateTableCell(row, key, value) {
      this.insideTableCtxs[row].jsonModel[key] = value
      if (this.insideTableCtxs[row].cellCtx) {
        this.insideTableCtxs[row].cellCtx.jsonModel[key] = value
      }
    },
    supportAction(item) {
      let options = item.options || []
      let insideBtns = []
      options.forEach(item => {
        if (actionButtons[item]) insideBtns.push(actionButtons[item])
      })
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns
      let _this = this
      item.render = (h, params) => {
        params.tableRecords = this.insideTableRecords
        return h('div', {
          style: {display: _this.pEditable ? 'block' : 'none'}
        },
        btns.map(item => item(h, params, this)))
      }
      return item
    },
    getImageWidget (item, index, column) {
      item.render = (h, params) => {
        let record = this.insideTableRecords[params.row.initRowIndex]
        let tag = 'img'
        let image = record[params.column.key]
        if (!image || image.length === 0) {
          tag = 'span'
        }
        return h(tag, {
          attrs: {
            src: image
          },
          style: {
            width: '32px',
            height: '32px'
          }
        })
      }
      return item
    },
    handleColumns (columns) {
      let insideColumns = columns.filter((column, index) => {
        if (column.widgetName === 'InputWidget') {
          let jobj = JSON.parse(column.widgetJson)
          if (jobj.type === 'hidden') {
            return false
          }
        }
        return true
      }).map((column, index) => {
        let res = column
        if (!('width' in res) && !('minWidth' in res)) {
          res['minWidth'] = res.title.length * 20  // default min width
        }
        if (res.widgetName === 'ImageWidget') {
          res = this.getImageWidget(res, index, column)
        } else {
          res = this.supportEdit(res, index, column)
        }
        if (res.sortable) res.sortable = true

        // if (res.key === 'action') res = this.supportAction(res)
        return res
      })
      insideColumns.unshift({title: '序号', type: 'index', minWidth: 50, key: '_index'})
      if (this.pOperation) {
        insideColumns.push(this.supportAction({ title: '操作', key: '_action', options: ['delete'], minWidth: 50 }))
      }
      this.insideColumns = insideColumns
    },
    handleTableRecords() {
      this.insideTableRecords = this.value.map((item, index) => {
        let res = item
        res.initRowIndex = index
        return res
      })
      this.tryExtendRecords()
    },
    tryExtendRecords(isSyncCtxs=true) {
      let emptyRecord = this.getEmptyRecord()
      if (isSyncCtxs) {
        let ctxs = []
        for (let idx=0; idx < this.insideTableRecords.length; idx++) {
          let record = this.insideTableRecords[idx]
          ctxs.push({model: Object.assign({}, emptyRecord), jsonModel: record, validate: {}})
        }
        this.insideTableCtxs = ctxs
      }

      // 补全空白行
      let emptyCount = 0
      for (let record of this.insideTableRecords) {
        if (this.isEmptyRecord(record)) {
          emptyCount++
        }
      }
      let offset = this.insideTableRecords.length
      if (emptyCount < this.pMinEmptyCount) {
        for (let idx=0; idx<(this.pMinEmptyCount-emptyCount); idx++) {
          let record = Object.assign({}, emptyRecord, {initRowIndex: offset+idx})
          this.insideTableRecords.push(record)
          this.insideTableCtxs.push({model: Object.assign({}, emptyRecord), jsonModel: record, validate: {}})
        }
      }

      if (this.insideTableRecords.length !== this.initTableRecords.length) {
        this.initTableRecords = JSON.parse(JSON.stringify(this.insideTableRecords))
      }
    },
    isEmptyRecord(record) {
      for (let col of this.tableSpec.columns) {
        if (record[col.key] !== '') {
          return false
        }
      }
      return true
    },
    getEmptyRecord() {
      let result = {}
      for (let col of this.tableSpec.columns) {
        if (col.key.startsWith('_')) continue
        result[col.key] = ''
      }
      return result
    },
    exportCsv (params) {
      this.$refs.tablesMain.exportCsv(params)
    },
    clearCurrentRow () {
      this.$refs.talbesMain.clearCurrentRow()
    },
    onCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    onSelect (selection, row) {
      this.$emit('on-select', selection, row)
    },
    onSelectCancel (selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    onSelectAll (selection) {
      this.$emit('on-select-all', selection)
    },
    onSelectionChange (selection) {
      this.$emit('on-selection-change', selection)
    },
    onSortChange (column, key, order) {
      this.$emit('on-sort-change', column, key, order)
    },
    onFilterChange (row) {
      this.$emit('on-filter-change', row)
    },
    onRowClick (row, index) {
      this.$emit('on-row-click', row, index)
    },
    onRowDblclick (row, index) {
      this.$emit('on-row-dblclick', row, index)
    },
    onExpand (row, status) {
      this.$emit('on-expand', row, status)
    },
    handleResize() {
      if (this.pWidth) {
        this.width = this.pWidth
      }
      if (this.pHeight) {
        this.height = this.pHeight
      } else {
        this.height = document.body.clientHeight / 3
        if (this.height < this.minHeight) {
          this.height = this.minHeight
        }
      }
    },
    checkResult(tblResult) {
      let ret = true
      let errmsgList = []
      for (let ctx of this.insideTableCtxs) {
        ctx.cellCtx.validate = {}
      }
      if (tblResult && tblResult.length) {
        for (let item of tblResult) {
          let ctx = this.insideTableCtxs[item['index']]
          if (!ctx) continue
          ctx.cellCtx.validate = {'errors': item['errors']}
          for (let [field, error] of Object.entries(item['errors'])) {
            errmsgList.push(`第${item['index']+1}行: ${error['msg']}`)
          }
        }
        ret = false
      }
      return [ret, errmsgList]
    },
    beforeSaveEdit(params, cell) {
      if (this.pBeforeSaveEdit) {
        this.pBeforeSaveEdit(params, cell)
      }
    }
  },
  watch: {
    tableSpec(tableSpec) {
      if (tableSpec) {
        this.handleColumns(tableSpec.columns)
        this.handleTableRecords()
      }
    },
    value (val) {
      this.handleTableRecords()
    },
    pSpec(spec) {
      this.tableSpec = new TableSpec(this, spec)
      this.tableSpec.init()
    },
    spec(spec) {
      this.tableSpec = new TableSpec(this, spec)
      this.tableSpec.init()
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
    this.$nextTick(this.handleResize)
    if (this.spec) {
      this.tableSpec = new TableSpec(this, this.spec)
      this.tableSpec.init()
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang='less'>
.te-table {
  .ivu-table-cell {
    overflow: visible !important;
  }
}
</style>
