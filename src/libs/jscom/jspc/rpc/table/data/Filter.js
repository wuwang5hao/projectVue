import {
  FILTER_CHOICE,
  FILTER_COMBO,
  FILTER_COMPLEMENT,
  FILTER_RANGE,

  FIELD_TYPE_DATETIME,
  FIELD_TYPE_BOOL,
  FIELD_TYPE_INT,

  DATETIME_TYPE_DATETIME,
  DATETIME_TYPE_MONTH,
  DATETIME_TYPE_DATE
} from 'rpc/Table/Table'

import {sysUtil, dtUtil} from 'jscom/utils/sysutil'

export class Filter {
  static filterAllKey = '0'
  static filterAllTitle = '全部'

  static Create(filter, valueNameMap) {
    if (filter.type === FILTER_CHOICE) {
      return new ChoiceFilter(filter, valueNameMap)
    } else if (filter.type === FILTER_RANGE) {
      return new RangeFilter(filter, valueNameMap)
    } else {
      return new Filter(filter, valueNameMap)
    }
  }

  static isValidFilter (filter) {
    if (filter.type === FILTER_CHOICE ||
      filter.type === FILTER_COMBO ||
      filter.type === FILTER_COMPLEMENT) {
      if (filter.valuesJson.length < 2) {
        return false
      }
      let valueObj = JSON.parse(filter.valuesJson)
      return (sysUtil.isArrayObject(valueObj) &&
        Object.keys(valueObj).length >= 0)
    }
    return true
  }

  constructor (filter, valueNameMap) {
    this.filter = filter
    this.valueNameMap = {}
    this._initValueNameMap(filter, valueNameMap)
    this.activeValue = ''
    this.initValue = ''
    this.widgetJson = this.parseWidgetJson(this.filter.widgetJson)
  }

  parseWidgetJson(widgetJson) {
    if (!widgetJson) return {}
    return JSON.parse(widgetJson)
  }

  setInitValue(value) {
    this.initValue = value
    this.reset()
  }

  _initValueNameMap (filter, valueNameMap) {
    if (filter.valuesJson.length < 2) {
      return
    }
    let valueArr = JSON.parse(filter.valuesJson)
    for (let value of valueArr) {
      let name = null
      let strval = ''
      if (value === null) {  // python 返回的 valueNameMap key None 会变成 'None' 对应 json value 的 null
        strval = 'None'
      }
      strval = '' + value
      if (valueNameMap) {
        name = valueNameMap[strval]
      }
      if (!name) {
        if (filter.fieldType === FIELD_TYPE_DATETIME) {
          name = dtUtil.formatMonth(new Date(value))
        } else if (filter.fieldType === FIELD_TYPE_BOOL) {
          name = value ? '是' : '否'
        } else {
          name = strval
        }
      }

      this.valueNameMap[strval] = name
    }
  }

  getActiveKey () {
    if (this.activeValue === '') return undefined
    if (this.type === FILTER_COMBO || this.type === FILTER_COMPLEMENT) {
      return this._reviseFieldTypeValue(this.activeValue)
    } else {
      return this.widgetToJsonValue(this.activeValue)
    }
  }

  widgetToJsonValue(value) {
    let result = value
    for (let nameKey of Object.keys(this.valueNameMap)) {
      if (this.valueNameMap[nameKey] === value) {
        result = nameKey
      }
    }
    result = this._reviseFieldTypeValue(result)
    return result
  }

  _reviseFieldTypeValue(key) {
    if (key === undefined) return key
    if (this.filter.fieldType === FIELD_TYPE_BOOL) {
      if (key === 'false') {
        key = false
      } else if (key === 'true') {
        key = true
      }
    } else if (this.filter.fieldType === FIELD_TYPE_INT) {
      if (key === 'null') {
        key = null
      } else {
        key = parseInt(key)
      }
    }
    return key
  }

  keyToValue(key) {
    return this.valueNameMap[key]
  }

  getActiveFilter () {
    let activeKey = ''
    if (this.isWidgetTypeDatetime() || this.isWidgetTypeDate()) {
      activeKey = this._getDateActiveValue()
    } else if (this.isWidgetTypeMonth()) {
      activeKey = this._getMonthActiveValue()
    } else {
      activeKey = this.getActiveKey()
    }
    if (activeKey === undefined) {
      return null
    }
    let activeFilter = Object.assign({}, this.filter)
    activeFilter.valuesJson = JSON.stringify([activeKey])
    return activeFilter
  }

  reset() {
    if (this.fieldType === FIELD_TYPE_DATETIME || this.fieldType === DATETIME_TYPE_DATE) {
      this.activeValue = this.initValue === '' ? '' : new Date(this.initValue)
    } else {
      this.activeValue = this.initValue
    }
  }

  get type () {
    return this.filter ? this.filter.type : ''
  }

  get title () {
    return this.filter ? this.filter.title : ''
  }

  get field () {
    return this.filter ? this.filter.field : ''
  }

  get fieldType () {
    return this.filter ? this.filter.fieldType : ''
  }

  get widgetName() {
    return this.filter ? this.filter.widgetName: ''
  }

  isFilterable () {
    return this.type === FILTER_COMPLEMENT
  }

  isTypeRange() {
    return this.type === FILTER_RANGE
  }

  isWidgetTypeDatetime () {
    return this.widgetJson.type === DATETIME_TYPE_DATETIME
  }

  isWidgetTypeMonth () {
    return this.widgetJson.type === DATETIME_TYPE_MONTH
  }

  isWidgetTypeDate () {
    return this.widgetJson.type === DATETIME_TYPE_DATE
  }

  _getDateActiveValue () {
    return new Date(this.activeValue).getTime()
  }

  _getMonthActiveValue () {
    if (!this.activeValue) return
    let dt = new Date(this.activeValue)
    if (isNaN(dt.getTime())) return
    dt.setDate(1)
    dt.setHours(0)
    dt.setMinutes(0)
    dt.setSeconds(0)
    return dt.getTime()
  }
}

export class ChoiceFilter extends Filter {
  constructor(filter, valueNameMap) {
    super(filter, valueNameMap)
    // this.valueNameMap[Filter.filterAllKey] = Filter.filterAllTitle
    this.activeValue = Filter.filterAllTitle
    this.initValue = Filter.filterAllTitle
  }

  setInitValue(key) {
    this.initValue = this.keyToValue(key)
    this.reset()
  }

  isFilterAll() {
    return (this.activeValue === Filter.filterAllTitle)
  }

  getActiveKey() {
    // @brief: 获取当前过滤器选中的 key
    // @return: 如果没有 match 则返回 undefined
    if (!this.activeValue || this.isFilterAll()) {
      return undefined
    }
    return this.widgetToJsonValue(this.activeValue)
  }
}

export class RangeFilter extends Filter {
  constructor (filter, valueNameMap) {
    super(filter, valueNameMap)
    this.activeValue = ['', '']
    this.initValue = ['', '']
  }

  _getDateActiveValue () {
    let activeValue = []
    let startDate = new Date(this.activeValue[0])
    activeValue.push(startDate.getTime())
    let endDate = new Date(this.activeValue[1])
    endDate.setHours(23)
    endDate.setMinutes(59)
    endDate.setSeconds(59)
    activeValue.push(endDate.getTime())
    return activeValue
  }

  reset() {
    if (this.isDatetimeRange()) {
      this.activeValue = this.initValue.map((value) => { return value === '' ? '' : new Date(value) })
    } else if (this.isMonthRange()) {
      this.activeValue = this.initValue.map((value) => { return value === '' ? '' : new Date(value) })
    } else {
      this.activeValue = this.initValue
    }
  }

  _getMonthActiveValue () {
    let activeValue = []

    let startDate = new Date(this.activeValue[0])
    let endDate = new Date(this.activeValue[1])
    if (startDate > endDate) {
      let tempDate = startDate
      startDate = endDate
      endDate = tempDate
    }
    startDate.setDate(1)
    startDate.setHours(0)
    startDate.setMinutes(0)
    startDate.setSeconds(0)
    startDate.setMilliseconds(0)
    activeValue.push(startDate.getTime())
    endDate.setDate(1)
    endDate.setMonth(endDate.getMonth() + 1)
    endDate.setDate(0)
    endDate.setHours(23)
    endDate.setMinutes(59)
    endDate.setSeconds(59)
    activeValue.push(endDate.getTime())
    return activeValue
  }

  getActiveFilter () {
    if (this.activeValue.length !== 2) {
      return null
    }
    if (this.isDatetimeRange() || this.isMonthRange()) {
      if (!this.activeValue[0] && !this.activeValue[1]) {
        return null
      }
      // 为了支持下面两种情况
      // 1. 只填写结束时间，过滤结束时间之前的所有项
      // 2. 只填写开始时间，过滤开始时间到当前时间所有项
      if (!this.activeValue[0]) {
        this.activeValue[0] = new Date(0).getTime()
      }
      if (!this.activeValue[1]) {
        this.activeValue[1] = new Date().getTime()
      }
    } else if (!this.activeValue[0] || !this.activeValue[1]) {
      return null
    }


    let activeFilter = Object.assign({}, this.filter)
    let activeValue = this.activeValue
    if (this.isDatetimeRange()) {
      activeValue = this._getDateActiveValue()
    } else if (this.isMonthRange()) {
      activeValue = this._getMonthActiveValue()
    }
    activeFilter.valuesJson = JSON.stringify(activeValue)
    return activeFilter
  }

  isMonthRange() {
    return this.isTypeRange() && this.isWidgetTypeMonth()
  }

  isDatetimeRange() {
    return this.isTypeRange() && this.isWidgetTypeDatetime()
  }
}
