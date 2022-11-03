import { strUtil } from 'jscom/utils/strutil'
import {
  TableQuery,
  OrderBySpec,
  FILTER_CHOICE,
  FILTER_COMBO,
  FILTER_COMPLEMENT,
  FILTER_RANGE,
  FILTER_VALUE,
  TableSelect,
  FilterSpec,
} from 'rpc/Table/Table'
import { TableSpec, Format } from 'jspc/rpc/table/data/TableSpec'

export default {
  name: 'TableControl',
  props: {
    pSpecName: {
      type: String,
      default: '',
    },
    pTitle: {
      type: String,
      default: '',
    },
    pKvs: {
      type: Object,
      default() { return {} }
    },
    pFieldFormatterMap: {
      type: Object,
      default() { return {} }
    },
    pApi: Object,
    pFormats: { type: Array, default() { return [] } },
    pInitFilterValues: Object,
    pWidth: { type: [Number, String] },
    pHeight: { type: [Number, String] },
    pMinHeight: {
      type: [Number, String],
      default: 350,
    },
    pShowInlineActions: {
      type: Boolean,
      default: true
    },
    pGetTotalData: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    pFieldFormatterMap(val) {
      this.fieldFormatterMap = val
    },
    fieldFormatterMap(val) {
      if (this.tableSpec) {
        let formats = this._fieldFormatterMapToFormats(val)
        this.tableSpec.updateFormats(formats)
      }
    },
    pKvs(val) {
      if (JSON.stringify(this.kvs) !== JSON.stringify(val)) {
        this.kvs = val
        this.pageIndex = 0
        this.loadTableRecords()
      }
    }
  },
  computed: {
    totalCount: function () {
      return this.tableSpec ? this.tableSpec.totalCount : 0
    },
    totalPage: function () {
      return Math.ceil(this.totalCount/this.pageSize)
    },
    filters: function () {
      return this.tableSpec.filters
    },
    choiceFilters() {
      return this.tableSpec.getFiltersByType(FILTER_CHOICE)
    },
    comboFilters() {
      return this.tableSpec.getFiltersByType(FILTER_COMBO)
    },
    completeFilters() {
      return this.tableSpec.getFiltersByType(FILTER_COMPLEMENT)
    },
    selectFilters() {
      return [...this.comboFilters, ...this.completeFilters]
    },
    rangeFilters() {
      return this.tableSpec.getFiltersByType(FILTER_RANGE)
    },
    valueFilters() {
      if (!this.tableSpec) { return [] }
      return this.tableSpec.getFiltersByType(FILTER_VALUE)
    },
    barActions() {
      let result = []
      let supportFormAction = this.isSupportFormAction()
      for (let action of this.tableSpec.actions) {
        if (!supportFormAction && action.actionCls === 'FormAction') {
          continue
        }
        if (!action.hasTitle()) continue
        // NOTE: because updateForm trigger with double click event, do no create action button here
        if (action.name === 'UpdateFormAction') continue
        result.push(action)
      }
      return result
    },
    inlineActions() {
      let result = []
      let supportFormAction = this.isSupportFormAction()
      for (let action of this.tableSpec.actions) {
        if (!supportFormAction && action.actionCls === 'FormAction') {
          continue
        }
        if (!action.hasInlineTitle()) continue
        if (action.name === 'UpdateFormAction') continue
        result.push(action)
      }
      return result
    },
    searchTypeArr() {
      let result = []
      for (let searchSpec of this.tableSpec.getSearches()) {
        result.push({
          key: searchSpec.field,
          value: searchSpec.title,
        })
      }
      result.unshift({
        key: '_all',
        value: '全部'
      })
      return result
    }
  },
  data () {
    return {
      columns: [],
      isLoading: false,
      searchTextMap: {},
      pageIndex: 0,
      pageSize: 10,
      tableSpec: new TableSpec(this),
      fieldFormatterMap: this.pFieldFormatterMap,
      sortColumnData: null,
      title: this.pTitle,
      selections: [], // iview table 批量选择时会更新此字段
      selection: null, // 单条记录 action 操作时会赋值此字段
      specName: this.pSpecName,
      kvs: this.pKvs,
      api: this.pApi,
      searchValue: {'type': '_all', 'text': ''},
      formats: [],
      selRow: null,
      minHeight: this.pMinHeight,
      width: this.pWidth,
      height: this.pHeight,
      isSpecInited: false,
    }
  },
  methods: {
    // callbacks
    // @brief: called before change filter
    OnBeforeChangeFilter(filter) { },
    OnAfterChangeFilter(filter) { },
    OnFilterInited(filters) { },
    OnActionInited(actions) { },
    // 更新 columns 回调
    OnUpdateColumns(columns) {},
    OnInitTableSpec(spec) {},
    onpkColumn(e) {},

    isSupportFormAction() {
      return false
    },

    getTableSelect() {
      let tableSelect = new TableSelect()
      tableSelect.kvsJson = JSON.stringify(this.kvs)
      return tableSelect
    },
    onSelectionChange (selections) {
      let arr = []
      this.selections = selections

      this.$emit('onSelectionChange', this.selections)
    },
    onSelectCancel (selection, row) {
      this.$emit('onSelectCancel', selection, row)
    },
    onSelectAllCancel () {
      this.$emit('onSelectAllCancel', this.selections)
    },
    ondbClickItem (row, index) {
      this.$emit('on-row-double-click', row, index)
    },
    onPageSizeChange (size) {
      if (this.pageSize !== size) {
        this.pageSize = size
        this.loadTableRecords()
      }
    },
    onPageIndexChange (index) {
      if (this.pageIndex === index) {
        return
      }
      this.pageIndex = index
      this.loadTableRecords()
    },
    onPageNumChange(num) {
      this.onPageIndexChange(num-1)
    },
    onSortChange (sortData) {
      if (sortData.order === 'normal') {
        this.sortColumnData = null
      } else {
        this.sortColumnData = sortData
      }
      this.loadTableRecords()
    },
    getTableSpec () {
      this.isLoading = true
      this.api.getTableSpec(this.specName, this.getTableSelect()).then((data) => {
        this._initTableSpec(data.spec)
        this.loadTableRecords()
        this._initCallback()
      }).catch((error) => {
        this.$Message.error('获取表格信息失败 ' + error.message)
        console.error('getTableSpec failed: ' + error)
        this.isLoading = false
      })
    },
    _initTableSpec(spec) {
      this.OnInitTableSpec(spec)
      this.tableSpec = new TableSpec(this, spec)
      let formats = this._fieldFormatterMapToFormats(this.fieldFormatterMap)
      this.tableSpec.updateFormats(formats)
      this.tableSpec.updateFormats(this.formats)
      this.tableSpec.init()
      this.initFilters()
      this.initActions()
      this.initTableColumns()
      this.isSpecInited = true
    },
    initTableSpec() {
      // @note: 第一次初始化 TableSpec 数据，spec 的获取与 record 的获取并发
      this.selections = []
      this.isLoading = true
      let tableSelect = this.getTableSelect()
      let specPromise = this.api.getTableSpec(this.specName, tableSelect)
      let query = this.createInitTableQuery()
      let recordPromise = this.api.getTableRecords(this.specName, tableSelect, query)
      Promise.all([specPromise, recordPromise]).then(([specData, recordData]) => {
        this._initTableSpec(specData.spec)
        this.tableSpec.updateValueNameMap(recordData.result.valueNameMap)
        this.tableSpec.setTableRecords(recordData.result.records, recordData.result.total)
        this.$emit('onLoadRecords', this.tableSpec)
        this._initCallback()
        this.updateTableHeight()
        this.getTableTotalRecord()
      }).catch((error) => {
        console.log('init spec record failed: ' + error)
        this.$Message.error('初始化表格失败 ' + error.message)
      }).finally(() => {
        this.isLoading = false
      })
    },
    _initCallback() {
      for (let filter of this.tableSpec.filters) {
        if (filter.getActiveFilter() != null) {
          this.OnBeforeChangeFilter(filter)
          this.OnAfterChangeFilter(filter)
        }
      }
    },
    getPkLink (params) {
      let pk = params.row[params.column.key]
      return strUtil.strfmt(this.pkLinkFmt, [pk])
    },
    initTableColumns () {
      let tempCols = this.tableSpec.columns
      if (this.pkLinkFmt) {
        let pkColumn = this._getPkColumn(tempCols)
        if (pkColumn) {
          pkColumn.render = (h, params) => {
            let pk = params.row[params.column.key]
            return h('a', {
              attrs: {
                href: this.getPkLink(params)
              },
              on: {
                'click': (e) => {
                  this.onpkColumn(e)
                }
              }
            }, '' + pk)
          }
        }
      }
      if (this.tableSpec.hasBatchAction()) {
        let selectionColumn = {
          type: 'selection',
          width: 60,
          align: 'center'
        }
        tempCols.unshift(selectionColumn)
      }
      if (this.tableSpec.hasInlineTitleActions() && this.pShowInlineActions) {
        let singleActionColumn = {
          title: '操作',
          type: '',
          width: 120,
          align: 'center',
          render: this._renderInlineActions,
        }
        tempCols.push(singleActionColumn)
      }
      this.OnUpdateColumns(tempCols)
      this.initBindData(tempCols)
      this.columns = tempCols
    },
    isShowInlineAction(action, row, index, column) {
      return true
    },
    _renderInlineActions(h, params) {
      let children = []
      let _this = this
      let itemIndex = 0
      for (let index in this.inlineActions) {
        if (!_this.isShowInlineAction(this.inlineActions[index], params.row, params.index, params.column)) {
          continue
        }
        children.push(
          h('DropdownItem', {
            key: index,
            props: {
              name: index
            },
            attrs: {
              disabled: this.inlineActions[index].disabled
            },
            style: {
              display: this.inlineActions[index].inlineDisplay
            }
          }, this.inlineActions[index].inlineTitle)
        )
        itemIndex = index
      }
      if (children.length === 1) {
        return h('div', {}, [
          h('Button',
            {
              props: {
                type: 'text'
              },
              attrs: {
                disabled: this.inlineActions[children[0].key].disabled
              },
              style: {
                display: this.inlineActions[children[0].key].inlineDisplay
              },
              on: {
                click() {
                  _this.onInlineActionClick(_this.inlineActions[children[0].key], params)
                }
              }
            }, this.inlineActions[children[0].key].inlineTitle)
        ])
      }
      return h('Dropdown', {
        style: {
          display: children.length === 0 ? 'none' : 'inline-block'
        },
        on: {
          'on-click': (index) => {
            _this.onInlineActionClick(this.inlineActions[index], params)
          }
        }
      }, [
        h('Button', {
          type: 'primary'
        }, '更多操作'),
        h('DropdownMenu', {
          slot: 'list'
        }, children)
      ])
    },
    onInlineActionClick(action, params) {
      this.selection = params.row
      this.beforeRunAction(action)
      if (action.actionCls === 'FormAction') {
        this._runFormAction(action, params.row)
      } else {
        this._runTableAction(action)
      }
    },
    _getPkColumn(columnsArg) {
      let columns = columnsArg || this.columns
      for (let column of columns) {
        if (column.key === this.tableSpec.primaryKey) {
          return column
        }
      }
    },
    initFilters() {
      this.initFilterBar()
      this._initFilterWithInitValue(this.tableSpec.filters)
      this.OnFilterInited(this.tableSpec.filters)
    },
    initActions() {
      this.initActionBar()
      this.OnActionInited(this.tableSpec.actions)
    },

    initFilterBar() {
    },

    initActionBar() {
    },

    getInitFilterValue() {
      return this.pInitFilterValues || {}
    },
    getHideFilters () {
      return []
    },
    _initFilterWithInitValue(filters) {
      let initFilterValue = this.getInitFilterValue()
      for (let [field, value] of Object.entries(initFilterValue)) {
        let filter = this.tableSpec.getFilterByField(field)
        if (!filter) { continue }
        filter.setInitValue(value)
      }
    },
    updateFilter (filters) {
      this.tableSpec.reset()
      for (let [field, value] of Object.entries(filters)) {
        let filter = this.tableSpec.getFilterByField(field)
        if (!filter) { continue }
        filter.setInitValue(value)
      }
    },
    isHideFilter (filter) {
      return this.getHideFilters().indexOf(filter.field) !== -1
    },
    createInitTableQuery() {
      let query = new TableQuery()
      query.offset = 0
      query.limit = this.pageSize
      let initFilterValue = this.getInitFilterValue()
      for (let [field, value] of Object.entries(initFilterValue)) {
        let filterSpec = new FilterSpec()
        filterSpec.field = field
        let val = value
        if (!Array.isArray(val)) {
          val = [value]
        }
        filterSpec.valuesJson = JSON.stringify(val)
        query.filters.push(filterSpec)
      }
      return query
    },

    createQuery () {
      let query = new TableQuery()
      // filters
      for (let filter of this.tableSpec.filters) {
        let activeFilter = filter.getActiveFilter()
        if (!activeFilter) {
          continue
        }
        query.filters.push(activeFilter)
      }
      // searches
      let searches = this.tableSpec.getSearches()
      query.searches = Array.from(searches, (searchItem) => {
        let value = this.searchTextMap[searchItem.field]
        if (value) {
          searchItem.value = value
        } else {
          searchItem.value = ''
        }
        return searchItem
      })

      // orderbys
      if (this.sortColumnData) {
        let orderBySpec = new OrderBySpec()
        orderBySpec.field = this.sortColumnData.column.key
        orderBySpec.value = this.sortColumnData.order
        query.orderbys.push(orderBySpec)
      }
      return query
    },
    createTableQuery () {
      let query = this.createQuery()
      // offset limit
      query.offset = this.pageIndex * this.pageSize
      query.limit = this.pageSize
      return query
    },
    loadTableRecords() {
      if (!this.isSpecInited) {
        console.log('table spec is not inited')
        return
      }
      this.selections = []
      let query = this.createTableQuery()
      this.api.getTableRecords(this.specName, this.getTableSelect(), query).then((data) => {
        if (data.result.total > 0 && data.result.total <= query.offset) {
          this.pageIndex = Math.floor(data.result.total / (this.pageSize+1))
          this.loadTableRecords()
        } else {
          this.tableSpec.updateValueNameMap(data.result.valueNameMap)
          this.tableSpec.setTableRecords(data.result.records, data.result.total)
          this.$emit('onLoadRecords', this.tableSpec)
        }
      }).catch((error) => {
        console.log('getTableRecords failed: ' + error)
        this.$Message.error('获取列表失败 ' + error.message)
      }).finally(() => {
        this.isLoadPage = false
        this.isLoading = false
      })
    },
    getTableTotalRecord () {
      if (!this.pGetTotalData) {
        return
      }
      let query = this.createTableQuery()
      this.api.getTableTotalRecord(this.specName, this.getTableSelect(), query).then((data) => {
        let columnData = JSON.parse(data['totalRecord'])
        columnData['code'] = '合计：'
        let fieldFormatMap = this.tableSpec.fieldFormatMap
        for (let fieldName in columnData) {
          let formater = fieldFormatMap[fieldName]
          if (formater) {
            columnData[fieldName] = formater.format(columnData[fieldName])
          }
        }
        this.bindData = [columnData]
      }).catch((error) => {
        console.log('getTableRecords failed: ' + error)
      })
    },
    getPercentStr (ratio) {
      return ratio + '%'
    },
    getPercent100Str (ratio) {
      return (ratio / 100).toFixed(2) + '%'
    },
    runActionError (action, error) {
      return false
    },
    runActionSuccess (action, data) {},
    onClickAction (action) {
      this.beforeRunAction(action)
      if (!action.isSelection()) {
        this.$Message.warning('请选择')
        return
      }
      if (action.actionCls === 'FormAction') {
        this._runFormAction(action)
      } else {
        this._runTableAction(action)
      }
    },
    _runFormAction(action, selRow = null) {
      if (action.confirmMsg) {
        this.$Modal.confirm({
          content: action.confirmMsg,
          onOk: () => {
            this.runFormAction(action, selRow)
          }
        })
      } else {
        this.runFormAction(action, selRow)
      }
    },
    OnRunFormAction(action, formName, selRow) {
      return false
    },
    runFormAction(action, selRow) {
      action.postPrepareArgs(this)
      let formName = action.actionJsonObj.form
      this.selRow = selRow
      if (this.OnRunFormAction(action, formName, selRow)) { return }
      if (!selRow) {
        this.updateUniqueKey('', '')  // clean previous unique key
      } else {
        let primaryKey = this.tableSpec.primaryKey
        this.updateUniqueKey(primaryKey, selRow[primaryKey])
      }

      this.getFormSpec(formName, '')
    },
    OnRenderActionArg(h, action, index) {
    },
    renderActionArg(h, action, index) {
      console.log(action.confirmMsg)
      let tag = this.OnRenderActionArg(h, action, index)
      if (tag) return tag
      return h('div',
        {},
        [
          h('div', action.confirmMsg),
          h('Input', {
            props: {
              value: '',
              autofocus: true,
              placeholder: '请输入'
            },
            on: {
              input: (val) => {
                action.args['arg0'] = val
              }
            }
          })
        ],
      )
    },
    _runTableAction (action) {
      if (action.runAction(this)) {
        return
      }
      if (action.confirmMsg) {
        if (action.actionCls === 'PksActionArg1' ||
          action.actionCls === 'PkActionArg1' ||
          action.actionCls === 'ActionArg1') {
          this.$Modal.confirm({
            content: action.confirmMsg,
            onOk: () => {
              this.runTableAction(this.api, action)
            },
            render: (h) => {
              return this.renderActionArg(h, action, 0)
            }
          })
        } else {
          this.$Modal.confirm({
            content: action.confirmMsg,
            onOk: () => {
              this.runTableAction(this.api, action)
            }
          })
        }
      } else {
        this.runTableAction(this.api, action)
      }
    },
    OnRunTableAction(api, action, actionSpec) {
      return false
    },
    runTableAction(api, action) {
      action.postPrepareArgs(this)
      let actionSpec = action.getActionSpecReq()
      if (this.OnRunTableAction(api, action, actionSpec)) { return }
      api.runTableAction(this.specName, this.getTableSelect(), [actionSpec]).then((data) => {
        this.afterRunAction(action, data)
        this.selections = []
        if (this.runActionSuccess) {
          this.runActionSuccess(action, data)
        }
      }).catch((error) => {
        console.log('runTableAction failed: ' + this.specName +
          ' ' + actionSpec.name + ' ' + error)
        if (!this.runActionError(action, error)) {
          if (error.code < -100) {
            this.$Message.error(error.message)
          } else {
            this.$Message.error('操作失败')
          }
        }
      })
    },
    onClickFilter (filter) {
      if (filter) {
        this.OnBeforeChangeFilter(filter)
      }
      this.reloadTableRecords()
      if (filter) {
        this.OnAfterChangeFilter(filter)
      }
    },
    reloadTableRecords () {
      this.$refs.Page.currentPage = 1
      this.pageIndex = 0
      this.loadTableRecords()
      this.getTableTotalRecord()
    },
    onClickReset () {
      this.$refs.Page.currentPage = 1
      this.pageIndex = 0
      this.tableSpec.reset()
      this.searchTextMap = {}
      this.loadTableRecords()
      this.searchValue = {'type': '_all', 'text': ''}
    },
    onCurrentChange (currentRow, oldCurrentRow) {

    },
    beforeRunAction (action) {
      action.cleanArgs()
      action.prepareArgs()
      action.beforeRunAction()
    },
    afterRunAction (action, data) {
      action.afterRunAction(data)
      let cmds = data.result.cmds
      this.runClientCmds(cmds)
    },
    runClientCmds(cmds) {
      if (!cmds) return
      for (let cmd of cmds) {
        if (this.OnRunClientCmd(cmd)) continue
        if (cmd.name === 'RefreshCmd') {
          this.loadTableRecords()
        } else if (cmd.name === 'MessageCmd') {
          this.$Modal.confirm({
            title: '提示',
            content: cmd.message,
          })
        } else if (cmd.name === 'ToastCmd') {
          let josnData = JSON.parse(cmd.cmdJson)
          this.$Message.info(josnData.msg)
        } else if (cmd.name === 'ReloadCmd') {
          this.initTableSpec()
        }
      }
    },
    OnRunClientCmd(cmd) {
    },
    _fieldFormatterMapToFormats(fieldFormatMap) {
      let formats = []
      for (let [field, format] of Object.entries(fieldFormatMap)) {
        formats.push(new Format(null, field, format))
      }
      return formats
    },
    updateSearchTextMap(event, res) {
      let searches = this.tableSpec.getSearches()
      if (res.type === '_all') {
        for (let search of searches) {
          this.searchTextMap[search.field] = res.text
        }
      } else {
        for (let search of searches) {
          if (res.type === search.field) {
            this.searchTextMap[search.field] = res.text
          } else {
            this.searchTextMap[search.field] = ''
          }
        }
      }
    },
    updateTableHeight () {
      this.$nextTick(() => {
        let headerDoms = document.getElementsByClassName('ivu-drawer-header')
        let headerHeight = 0
        for (let dom of headerDoms) {
          if (dom.offsetHeight > 0) {
            headerHeight = dom.offsetHeight
          }
        }
        let topHeight = this.$refs.topSearch ? this.$refs.topSearch.offsetHeight : 0
        let pageHeight = this.$refs.page ? this.$refs.page.offsetHeight : 0
        let subHeight = topHeight + pageHeight + headerHeight + 40
        this.height = subHeight ? window.innerHeight - subHeight : document.body.clientHeight / 2
        if (this.height < this.minHeight) {
          this.height = this.minHeight
        }
        console.log(`handleResize width: ${this.width}, height: ${this.height}`)
      })
    },
    handleResize() {
      if (this.pWidth) {
        this.width = this.pWidth
      }
      if (this.pHeight) {
        this.height = this.pHeight
      } else {
        this.updateTableHeight()
      }
    },
    initBindData (data) {
      let bindTableColumns = []
      let columnData = {}
      for (let item of data) {
        let key = item.key === this.tableSpec.primaryKey ? 'code' : item.key
        bindTableColumns.push({
          key: key,
          title: item.title ? item.title : item.type,
          minWidth: item.minWidth ? item.minWidth : item.width
        })
        columnData[key] = ''
      }
      columnData['code'] = '合计'
      this.bindData = [columnData]
      this.bindTableColumns = bindTableColumns
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.$nextTick(this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  }
}
