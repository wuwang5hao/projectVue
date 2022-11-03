import { Filter } from 'jspc/rpc/table/data/Filter'
import { Action } from 'jspc/rpc/table/data/Action'
import {
  FIELD_TYPE_BOOL,
  FIELD_TYPE_DATETIME,
  FIELD_TYPE_DATE,
} from 'rpc/Table/Table'
import { dtUtil } from 'jscom/utils/sysutil'
import { objUtil } from 'jscom/utils/objutil'
import { BaseField } from "./Field"

export class Format {
  constructor(type=null, field=null, format=null) {
    this._type = type
    this._field = field
    this._format = format
  }
  type() { return this._type } // 匹配字段类型
  field() { return this._field }  // 匹配字段名称
  format(data) {
    if (this._format) {
      return this._format(data)
    } else {
      return data
    }
  }
  genRender() {
  }
}

export class DateFormat extends Format {
  type () {
    return FIELD_TYPE_DATE
  }
  format(data) {
    if (data === '' || data === 0) {
      return ''
    }
    return dtUtil.formatDate(new Date(data))
  }
}

export class DateTimeFormat extends Format {
  type () {
    return FIELD_TYPE_DATETIME
  }
  format(data) {
    if (data === '' || data === 0) {
      return ''
    }
    return dtUtil.formatDatetime(new Date(data), '')
  }
}

export class BoolFormat extends Format {
  type () {
    return FIELD_TYPE_BOOL
  }
  format (data) {
    return data ? '是' : '否'
  }
}

let FORMATS = [new DateFormat(), new DateTimeFormat(), new BoolFormat()]

export class TableSpec {
  constructor (tableWidget, spec=null, formats=[]) {
    this.tableWidget = tableWidget
    if (spec != null) {
      this.spec = spec
    } else {
      this.spec = {fields: [], filters: [], searches: [], orderbys: [], actions: [], valueNameMap: {}}
    }
    this.formats = formats

    this.fieldSpecMap = {}
    for (let field of this.spec.fields) {
      this.fieldSpecMap[field.name] = field
    }
    this.tableRecords = []
    this.jsonRecords = []
    this.records = []
    this.totalCount = 0
    this.primaryKey = ''
    this.typeFormatMap = {}
    this.fieldFormatMap = {}
    this.actions = this._getActions()
    this.filters = this._getFilters()
    this.columns = []
  }

  init() {
    this._initFormats()
    this.columns = this._getColumns()
  }

  _initFormats() {
    this.updateFormats(FORMATS)
    this.updateFormats(this.formats)
  }

  updateFormats(formats) {
    for (let format of formats) {
      if (format.type() != null) {
        this.typeFormatMap[format.type()] = format
      }
      if (format.field() != null) {
        this.fieldFormatMap[format.field()] = format
      }
    }
  }

  _getFilters() {
    let filters = []
    for (let filterSpec of this.spec.filters) {
      let valueNameMap = this._getValueNameMap(filterSpec.field)
      if (!Filter.isValidFilter(filterSpec)) {
        continue
      }
      let filter = Filter.Create(filterSpec, valueNameMap)
      filters.push(filter)
    }
    return filters
  }

  _getColumns () {
    let tempCols = []
    for (let fieldSpec of this.spec.fields) {
      if (fieldSpec.hidden) continue
      let column = Object.assign(fieldSpec)
      column.key = fieldSpec.name
      if (fieldSpec.primary) {
        this.primaryKey = fieldSpec.name
      }
      this.updateSortable(fieldSpec.name, column)
      if (fieldSpec.widgetName === 'ImageWidget') {
        column.render = (h, params) => {
          let image = params.row[params.column.key]
          return h('img', {
            attrs: {
              src: image
            },
            style: {
              width: '32px',
              height: '32px'
            }
          })
        }
      }

      let format = this.fieldFormatMap[fieldSpec.name]
      if (!format) {
        format = this.typeFormatMap[fieldSpec.type]
      }
      if (format) {
        let render = format.genRender(this, fieldSpec)
        if (render) {
          column.render = render
        }
      }

      if (!column.genWidget) {
        column.genWidget = (parentWidget, ctx) => {
          let widget = BaseField.Create(parentWidget, fieldSpec,
            this.valueNameMap[fieldSpec.name])
          widget.setCtx(ctx)
          return widget
        }
      }
      if (column.ellipsis) {
        column.tooltip = true
      }
      if (!('width' in column) && !('minWidth' in column)) {
        column['minWidth'] = column.title.length * 20  // default min width
      }
      tempCols.push(column)
    }
    return tempCols
  }

  getSearches () {
    return this.spec ? this.spec.searches : []
  }

  updateSortable (field, column) {
    if (!this.spec) {
      return false
    }
    let isSortable = false
    for (let sortItem of this.spec.orderbys) {
      if (sortItem.field === field) {
        column.sortable = 'custom'
        isSortable = true
        break
      }
    }
    return isSortable
  }

  _getValueNameMap (field) {
    if (!this.valueNameMap) {
      return {}
    }
    return this.valueNameMap[field]
  }

  get valueNameMap() {
    return this.spec.valueNameMap
  }

  _getActions() {
    let actions = []
    for (let actionSpec of this.spec.actions) {
      let action = Action.Create(this.tableWidget, actionSpec)
      action.tableWidget = this.tableWidget
      actions.push(action)
    }
    return actions
  }

  getFiltersByType (type) {
    return this.filters.filter((filter) => filter.type === type)
  }

  getFiltersByField (field) {
    return this.filters.filter((filter) => filter.field === field)
  }

  getFilterByField (field) {
    for (let filter of this.filters) {
      if (filter.field === field) return filter
    }
  }

  getActionByName(name) {
    for (let action of this.actions) {
      if (action.name === name) {
        return action
      }
    }
  }

  getActionByCls(clsName) {
    for (let action of this.actions) {
      if (action.actionCls === clsName) {
        return action
      }
    }
  }

  setTableRecords (records, total) {
    this.tableRecords = records
    this.totalCount = total
    this.jsonRecords = this.tableRecords.map(record => JSON.parse(record))
    this.records = this.jsonRecords.map(jrecord => this._convertRecord(jrecord))
  }

  convertFieldValue(field, value) {
    let fieldSpec = this.fieldSpecMap[field]
    if (!fieldSpec) {
      console.warn('cannot found fieldSpec: ' + field)
    }
    let fieldValueNameMap = objUtil.get(this.valueNameMap, field, {})

    let mapValue = fieldValueNameMap[value]
    if (mapValue !== undefined) {
      return mapValue
    }
    let format = this.fieldFormatMap[field]
    if (!format) {
      format = this.typeFormatMap[fieldSpec.type]
    }
    return format ? format.format(value) : value
  }

  _convertRecord (jrecord) {
    let result = {'_jrecord': jrecord}
    for (let [field, value] of Object.entries(jrecord)) {
      result[field] = this.convertFieldValue(field, value)
    }
    return result
  }

  hasBatchAction() {
    for (let action of this.actions) {
      if (action.isBatch()) {
        return true
      }
    }
    return false
  }

  hasInlineTitleActions() {
    for (let action of this.actions) {
      if (action.name === 'UpdateFormAction') continue
      if (action.hasInlineTitle()) {
        return true
      }
    }
    return false
  }

  hasNotInlineTitleActions() {
    for (let action of this.actions) {
      if (action.hasTitle()) {
        return true
      }
    }
    return false
  }

  reset() {
    for (let filter of this.filters) {
      filter.reset()
    }
  }

  updateValueNameMap(valueNameMap) {
    if (!valueNameMap) return
    for (let [field, choices] of Object.entries(valueNameMap)) {
      if (this.spec.valueNameMap[field]) {
        Object.assign(this.spec.valueNameMap[field], choices)
      } else {
        this.spec.valueNameMap[field] = choices
      }
    }
  }
}
