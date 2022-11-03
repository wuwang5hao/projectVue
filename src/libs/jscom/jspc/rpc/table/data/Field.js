import { dtUtil } from 'jscom/utils/sysutil'
import AreaSelect from 'jspc/widgets/AreaSelect'
import ChunkedUpload from 'jspc/widgets/ChunkedUpload'
import Tinymce from 'jspc/widgets/Tinymce'

import {
  FIELD_TYPE_STR,
  FIELD_TYPE_STR_LIST,
  FIELD_TYPE_INT_LIST,
  CHOICE_TYPE_SELECT_MULTIPLE,
} from 'rpc/Table/Table'

let maxWidth = '300px'

/// NOTE: Field 其实大部分逻辑是描述 Widget 结构以及渲染，Field 命名为 Widget，暂时不修改名称

function getWidgetType (fieldSpec) {
  let obj = fieldSpec ? JSON.parse(fieldSpec.widgetJson) : {}
  return obj.type
}

export class BaseField {
  static Create(parentWidget, fieldSpec, valueNameMap) {
    if (fieldSpec.widgetName === 'InputWidget') {
      return new InputField(parentWidget, fieldSpec, valueNameMap)
    } else if (fieldSpec.widgetName === 'ChoiceWidget') {
      return new ChoiceField(parentWidget, fieldSpec, valueNameMap)
    } else if (fieldSpec.widgetName === 'DatetimeWidget') {
      return new DatetimeField(parentWidget, fieldSpec, valueNameMap)
    } else if (fieldSpec.widgetName === 'FileWidget') {
      return new FileField(parentWidget, fieldSpec, valueNameMap)
    } else if (fieldSpec.widgetName === 'ImageWidget') {
      return new ImageField(parentWidget, fieldSpec, valueNameMap)
    } else if (fieldSpec.widgetName === 'AreaWidget') {
      return new AreaField(parentWidget, fieldSpec, valueNameMap)
    } else if (fieldSpec.widgetName === 'RichEditorWidget') {
      return new RichEditorField(parentWidget, fieldSpec, valueNameMap)
    }
    return new InputField(parentWidget, fieldSpec, valueNameMap)
  }

  constructor (parentWidget, fieldSpec, valueNameMap) {
    this.parentWidget = parentWidget
    this.fieldSpec = fieldSpec
    this.valueNameMap = valueNameMap
    if (this.valueNameMap === undefined) {
      this.valueNameMap = {}
    }
    this.error = ''
    this.defaultPlaceholder = ''

    this.model = null  // widgetVals
    this.jsonModel = null
    this.ctx = null
    this.jsonVal = null  // 只在初始化时赋值为初始值
    this.widgetVal = null
  }

  setCtx(ctx) {
    // 设置record，在值改变时会根据 fieldSpec.name 字段更新 model 中对应的值
    this.ctx = ctx
    this.model = ctx.model
    this.jsonModel = ctx.jsonModel

    this.jsonVal = ctx.jsonModel[this.name]
    this.widgetVal = this.jsonToWidgetValue(this.jsonVal)
    this.model[this.name] = this.widgetVal
  }

  getRender (h, params={}) {
    let props = {
      prop: this.name,
      rules: this.getRules(),
      error: this.error
    }
    if (!params.hideLabel) {
      props['label'] = this.title + '：'
    }
    return h('FormItem', {
      props: props,
      style: {
        display: this.isHidden() ? 'none' : 'relative'
      }
    }, this.getChildrenRender(h, params))
  }

  getRules () {
    let rules = []
    // this.isRequired() &&
    if (!this.isDisabled() && !this.isHidden() && !this.isReadonly()) {
      this.createRules(rules)
    }
    return rules
  }

  createRules (rules) {

  }

  getChildrenRender (h, params) {
    return []
  }
  get type () {
    return this.fieldSpec ? this.fieldSpec.type : ''
  }

  get name () {
    return this.fieldSpec ? this.fieldSpec.name : ''
  }

  get title () {
    return this.fieldSpec ? this.fieldSpec.title : ''
  }

  isRequired () {
    return this.fieldSpec ? this.fieldSpec.required : false
  }

  isDisabled () {
    return this.fieldSpec ? this.fieldSpec.disabled : true
  }

  isHidden () {
    return this.widgetJsonObj.type ? this.widgetJsonObj.type === 'hidden' : false
  }

  isReadonly () {
    if (!this.widgetJsonObj.attrs) {
      return false
    }
    return this.widgetJsonObj.attrs.readonly === 'true'
  }

  isNumber () {
    return this.type === 'int' || this.type === 'float'
  }

  isArray () {
    return this.type === FIELD_TYPE_STR_LIST || this.type === FIELD_TYPE_INT_LIST
  }

  isString() {
    return this.type === FIELD_TYPE_STR
  }

  isBoolean () {
    return this.type === 'bool'
  }

  widgetValueToJson(widgetValue) {
    if (this.isBoolean()) {
      if (widgetValue) { return true }
      else { return false }
    }
    if (widgetValue === 'None') {
      return null
    } else {
      return widgetValue
    }
  }

  jsonToWidgetValue(jsonValue) {
    if (this.isBoolean()) return Boolean(jsonValue)
    else if (jsonValue === 0) return jsonValue
    else if (!jsonValue) return ''
    else return jsonValue
  }

  // NOTE: deprecated
  jsonToFormStr(json) {
    if (json === undefined) {
      return ''
    } else {
      return '' + json
    }
  }

  // NOTE: deprecated
  getFormValue() {
    let jsonVal = this.widgetValueToJson(this.widgetVal)
    if (this.type === FIELD_TYPE_STR) {
      return this.jsonToFormStr(jsonVal)
    } else {
      return JSON.stringify(jsonVal)
    }
  }

  getFormJsonValue() {
    let jsonVal = this.widgetValueToJson(this.widgetVal)
    return jsonVal
  }

  get widgetName () {
    return this.fieldSpec ? this.fieldSpec.widgetName : ''
  }

  get widgetJsonObj () {
    return this.fieldSpec.widgetJson ? JSON.parse(this.fieldSpec.widgetJson) : {}
  }

  get placeholder () {
    if (!this.widgetJsonObj.attrs || !this.widgetJsonObj.attrs.placeholder) {
      return this.defaultPlaceholder
    }
    return this.widgetJsonObj.attrs.placeholder
  }

  get cols() {
    if (!this.widgetJsonObj.attrs || !this.widgetJsonObj.attrs.cols) {
      return 1
    }
    return parseInt(this.widgetJsonObj.attrs.cols)
  }

  get rows() {
    if (!this.widgetJsonObj.attrs || !this.widgetJsonObj.attrs.rows) {
      return 1
    }
    return parseInt(this.widgetJsonObj.attrs.rows)
  }

  _readonlyRender (h, text) {
    let showText = this.valueNameMap ? this.valueNameMap[text] : null
    showText = showText || text
    return h('span', {
      style: {
        maxWidth: maxWidth,
        display: 'inline-block',
      },
    }, showText)
  }
  setValue(value, params) {
    if (value === undefined) return
    this.widgetVal = value
    this.jsonVal = this.widgetValueToJson(value)
    this.model[this.fieldSpec.name] = this.widgetVal
    this.jsonModel[this.fieldSpec.name] = this.jsonVal
    if (params && params.onInput) {
      params.onInput(this.widgetVal, this.jsonVal, this.fieldSpec.name)
    }
  }
  setJsonValue(value, params) {
    this.jsonVal = value
    this.widgetVal = this.jsonToWidgetValue(value)
    this.model[this.fieldSpec.name] = this.widgetVal
    this.jsonModel[this.fieldSpec.name] = this.jsonVal
    if (params && params.onInput) {
      params.onInput(this.widgetVal, this.jsonVal, this.fieldSpec.name)
    }
  }
  cleanValue() {
    this.widgetVal = undefined
    if (this.model) {
      this.model[this.fieldSpec.name] = undefined
    }
  }
  getRuleTrigger() {
    return 'change'
  }
  OnDestroy() {
  }
}

class InputField extends BaseField {
  constructor (parentWidget, fieldSpec, valueNameMap) {
    super(parentWidget, fieldSpec, valueNameMap)
    this.defaultPlaceholder = `请输入${this.title}`
  }

  getRuleTrigger() {
    return 'blur'
  }

  createRules (rules) {
    if (this.widgetJsonObj.type === 'checkbox') {
      return
    }
    let rule = {required: this.isRequired(), message: this.hintMessage, trigger: this.getRuleTrigger()}
    if (this.type === 'float') {
      rule.type = 'number'
      rule.min = 0
      rule.message = `${this.title}不能小于${rule.min}`
    } else if (this.type === 'int' || this.type === 'date') {
      rule.type = 'integer'
      rule.min = 0
      rule.message = `${this.title}不能小于${rule.min}`
    }
    rules.push(rule)
  }

  getChildrenRender (h, params) {
    return [this._getSubRender(h, params)]
  }

  _getSubRender (h, params) {
    if (this.widgetJsonObj.type === 'checkbox') {
      return this._checkboxRender(h, params)
    }
    return this._inputRender(h, params)
  }

  _inputRender (h, params) {
    if (params.readonly || this.isDisabled() || this.isReadonly()) {
      return this._readonlyRender(h, this.widgetVal)
    }
    let props = {
      placeholder: this.placeholder,
      value: this.widgetVal,
      disabled: this.isDisabled(),
      number: this.isNumber(),
      rows: this.rows,
      cols: this.cols
    }
    if (this.widgetJsonObj.type === 'textarea') {
      props['type'] = 'textarea'
    }
    return h('Input', {
      style: {
        maxWidth: maxWidth
      },
      props: props,
      ref: 'Input',
      on: {
        'input': (value) => {
          if (params.isGetBlur) {
            return
          }
          this.setValue(value, params)
        },
        'on-blur': (event) => {
          this.setValue(event.target._value, params)
        }
      }
    })
  }

  _checkboxRender (h, params) {
    if (params.readonly || this.isDisabled() || this.isReadonly()) {
      return this._readonlyRender(h, this.widgetVal ? '是' : '否')
    }
    return h('Checkbox', {
      props: {
        value: this.widgetVal,
        disabled: this.isDisabled()
      },
      on: {
        input: (value) => {
          this.setValue(value, params)
        }
      }
    }, '')
  }

  get hintMessage () {
    return `${this.title}不能为空`
  }
}

export class BaseMoreInputField extends InputField {
  constructor() {
    super(...arguments)
    this.showValue = ''
  }
  _inputRender (h, params) {
    if (params.readonly || this.isDisabled() || this.isReadonly()) {
      return this._readonlyRender(h, this.showValue)
    }
    let props = {
      placeholder: this.placeholder,
      value: this.getShowValue(),
      disabled: this.isDisabled(),
      number: this.isNumber(),
      rows: this.rows,
      cols: this.cols,
    }
    if (this.widgetJsonObj.type === 'textarea') {
      props['type'] = 'textarea'
    }
    this.inputWidget = h('Input',
      {
        style: {
          maxWidth: maxWidth
        },
        props: props,
        on: {
          'input': (value) => {
            if (value) { return }
            this.cleanValue()
          },
          'on-blur': () => {
            this.inputWidget.componentInstance.currentValue = this.getShowValue()
          }
        },
      },
      [
        h('Button',
          {
            props: {},
            slot: 'append',
            on: {
              click: (event) => {
                this.onMoreButtonClicked(event, params)
              }
            }
          },
          ['...']
        )
      ]
    )
    return this.inputWidget
  }
  getShowValue() {
    return this.showValue
  }
  setShowValue(val) {
    this.showValue = val
    this.ctxShowValue[this.name] = val
  }
  get ctxShowValue() {
    if (!this.ctx.showValue) {
      this.ctx.showValue = {}
    }
    return this.ctx.showValue
  }
  onMoreButtonClicked(event, params) {
  }
  getRuleTrigger() {
    return 'blur,change'
  }
  cleanValue() {
    super.cleanValue()
    this.ctxShowValue[this.name] = ''
    this.showValue = ''
  }
  setCtx(ctx) {
    super.setCtx(ctx)

    let val = this.model[this.fieldSpec.name]
    if (this.model && ctx.showValue) {
      this.showValue = ctx.showValue[this.fieldSpec.name]
    }
    if (!this.showValue && val !== undefined) {
      this.showValue = this.valueNameMap[val]
    }
    if (this.showValue === undefined) {
      this.showValue = val
    }
  }
}

class ChoiceField extends BaseField {
  constructor (parentWidget, fieldSpec, valueNameMap) {
    super(parentWidget, fieldSpec, valueNameMap)
    this.defaultPlaceholder = `请选择${this.title}`
  }

  createRules (rules) {
    if (this.isString() || this.isNumber()) {
      const validateChoiceValue = (rule, value, callback) => {
        let values = this._getChoiceValues()
        if (values.indexOf(value) >= 0) {
          callback()
        } else {
          if (!value && !rule.required) {
            callback()
          } else {
            callback(new Error(rule.message))
          }
        }
      }
      let rule = { required: this.isRequired(),
        message: this.placeholder,
        trigger: this.getRuleTrigger(),
        validator: validateChoiceValue
      }
      rules.push(rule)
    } else {
      let rule = {required: this.isRequired(), message: this.placeholder, trigger: this.getRuleTrigger()}
      if (this.type === 'int') {
        rule.type = 'integer'
        rule.min = 0
      } else if (this.type === 'float') {
        rule.type = 'number'
        rule.min = 0
      } else if (this.isArray()) {
        rule.type = 'array'
      }
      rules.push(rule)
    }
  }

  getChildrenRender (h, params) {
    return [this._getSelectRender(h, params)]
  }

  _getSelectRender (h, params) {
    if (params.readonly || this.isDisabled() || this.isReadonly()) {
      return this._readonlyRender(h, this.widgetVal)
    }
    return h('Select', {
      style: {
        maxWidth: '300px'
      },
      props: {
        value: this.widgetVal,
        placeholder: this.placeholder,
        disabled: this.isDisabled(),
        multiple: this._isSupportMultiple(),
        filterable: true,
      },
      on: {
        'on-change': (value) => {
          this.setValue(value, params)
        }
      }
    }, this._getOptionsRender(h, params))
  }

  _isSupportMultiple () {
    return this.widgetJsonObj.type === CHOICE_TYPE_SELECT_MULTIPLE
  }

  _getOptionsRender (h, params) {
    let options = []
    let choiceValues = this._getChoiceValues()
    for (let key of choiceValues) {
      let name = this.valueNameMap[key]
      options.push(this._optionRender(h, params, key, name))
    }
    return options
  }

  _optionRender (h, params, key, name) {
    return h('Option', {
      props: {
        value: key
      }
    }, name)
  }

  _readonlyRender(h, key) {
    let text = ''
    if (this._isSupportMultiple()) {
      let textList = []
      for (let item of key) {
        textList.push(this.valueNameMap ? this.valueNameMap[item] : item)
      }
      text = textList.join(', ')
    } else {
      text = this.valueNameMap ? this.valueNameMap[key] : key
    }
    return h('span', {
      style: {
        maxWidth: maxWidth
      }
    }, text || key)
  }

  _getChoiceValues () {
    let choicesJson = this.widgetJsonObj.choicesJson
    return JSON.parse(choicesJson)
  }

  getFormValue() {
    let jsonVal = this.widgetValueToJson(this.widgetVal)
    if (this._isSupportMultiple()) {
      return JSON.stringify(jsonVal)
    } else {
      return this.jsonToFormStr(jsonVal)
    }
  }

  widgetValueToJson(widgetVal) {
    if (this._isSupportMultiple()) {
      let values = widgetVal.filter((item) => {
        return this.valueNameMap[item]
      })
      return values
    } else {
      if (widgetVal === 'None') {
        return null
      } else {
        return widgetVal
      }
    }
  }

  jsonToWidgetValue(jsonVal) {
    let val = super.jsonToWidgetValue(jsonVal)
    if (!val && this._isSupportMultiple()) {
      return []
    }
    return val
  }
}

class DatetimeField extends BaseField {
  constructor (parentWidget, fieldSpec, valueNameMap) {
    super(parentWidget, fieldSpec, valueNameMap)
    this.defaultPlaceholder = `请选择${this.title}`
  }

  createRules (rules) {
    let rule = {required: this.isRequired(), message: this.placeholder, trigger: this.getRuleTrigger()}
    rules.push(rule)
  }

  getChildrenRender (h, params) {
    return [this._getDatetimeRender(h, params)]
  }

  /*
   * DatePicker: date, datetime, daterange, datetimerange, month
   * TimePicker: time, timerange
  */
  _getUIComponent () {
    if (this.widgetJsonObj.type.indexOf('date') !== -1 ||
      this.widgetJsonObj.type === 'month') {
      return 'DatePicker'
    }
    return 'TimePicker'
  }

  _getDatetimeRender (h, params) {
    if (params.readonly || this.isDisabled() || this.isReadonly()) {
      return this._readonlyRender(h, this.dateFormatStr(this.jsonVal))
    }
    return h(this._getUIComponent(), {
      props: {
        value: this.widgetVal,
        placeholder: this.placeholder,
        type: this.widgetJsonObj.type,
        disabled: this.isDisabled(),
        transfer: true,
      },
      on: {
        'on-change': (dateValue) => {
          this.setValue(dateValue, params)
        },
        'on-open-change': (event) => {
          if (params.onOpenChange) {
            params.onOpenChange(event)
          }
        }
      }
    })
  }

  isRange () {
    return this.widgetJsonObj.type.indexOf('range') !== -1
  }

  dateFormatStr (jsonVal) {
    if (!jsonVal) { return '无' }
    if (this.widgetJsonObj.type.indexOf('range') === -1) {
      let date = new Date(jsonVal)
      if (this.widgetJsonObj.type === 'date') {
        return dtUtil.formatDate(date)
      } else if (this.widgetJsonObj.type === 'datetime') {
        return dtUtil.formatDatetime(date)
      } else if (this.widgetJsonObj.type === 'time') {
        return dtUtil.formatTimeint(jsonVal)
      } else if (this.widgetJsonObj.type === 'month') {
        return dtUtil.formatMonth(date)
      }
    } else {
      let dateArr = jsonVal
      let startDate = new Date(dateArr[0])
      let endDate = new Date(dateArr[1])
      if (this.widgetJsonObj.type === 'daterange') {
        return dtUtil.formatDate(startDate) + ' - ' + dtUtil.formatDate(endDate)
      } else if (this.widgetJsonObj.type === 'datetimerange') {
        return dtUtil.formatDatetime(startDate) + ' - ' + dtUtil.formatDatetime(endDate)
      } else if (this.widgetJsonObj.type === 'timerange') {
        return dtUtil.formatTimeint(dateArr[0]) + ' - ' + dtUtil.formatTimeint(dateArr[0])
      }
    }
  }

  _getDatetimeFormWidgetValue (widgetVal) {
    if (!widgetVal) return 0
    if (this.widgetJsonObj.type === 'time' || this.widgetJsonObj.type === 'timerange') {
      return dtUtil.parseTimeStr(widgetVal)
    } else if (this.widgetJsonObj.type === 'date' || this.widgetJsonObj.type === 'daterange') {
      let date = dtUtil.parseDateStr(widgetVal)
      return date.getTime()
    } else if (this.widgetJsonObj.type === 'month') {
      let date = dtUtil.parseMonthStr(widgetVal)
      return date.getTime()
    }else {
      let date = dtUtil.parseDatetimeStr(widgetVal)
      return date.getTime()
    }
  }

  widgetValueToJson(widgetVal) {
    if (this.isRange()) {
      return [this._getDatetimeFormWidgetValue(widgetVal[0]),
        this._getDatetimeFormWidgetValue(widgetVal[1])]
    }
    return this._getDatetimeFormWidgetValue(widgetVal)
  }

  jsonToWidgetValue(jsonVal) {
    if (!jsonVal) {
      return ''
    }

    if (this.widgetJsonObj.type.indexOf('range') === -1) {
      let date = new Date(jsonVal)
      if (this.widgetJsonObj.type === 'date') {
        return dtUtil.formatDate(date)
      } else if (this.widgetJsonObj.type === 'datetime') {
        return dtUtil.formatDatetime(date)
      } else if (this.widgetJsonObj.type === 'time') {
        return dtUtil.formatTimeint(jsonVal)
      } else if (this.widgetJsonObj.type === 'month') {
        return dtUtil.formatMonth(date)
      }
    } else {
      let dateArr = jsonVal
      if (this.widgetJsonObj.type === 'daterange') {
        return Array.from(dateArr, (time) => {
          return dtUtil.formatDate(new Date(time))
        })
      } else if (this.widgetJsonObj.type === 'datetimerange') {
        return Array.from(dateArr, (time) => {
          return dtUtil.formatDatetime(new Date(time))
        })
      } else if (this.widgetJsonObj.type === 'timerange') {
        return Array.from(dateArr, (time) => {
          return dtUtil.formatTimeint(time)
        })
      }
    }

    return ''
  }
}

class AreaField extends ChoiceField {
  createRules (rules) {
    let rule = {type: 'array', required: this.isRequired(), message: this.placeholder, trigger: this.getRuleTrigger()}
    rules.push(rule)
  }

  getChildrenRender (h, params) {
    return [this._getAreaSelectRender(h, params)]
  }

  _getAreaSelectRender (h, params) {
    if (params.readonly || this.isDisabled() || this.isReadonly()) {
      return this._readonlyRender(h, this.getAreaStr())
    }
    return h(AreaSelect, {
      props: {
        placeholder: this.placeholder,
        value: this.widgetVal,
        codeListGetter: this.parentWidget.getCodeList,
        pChangeOnSelect: this.widgetJsonObj.changeOnSelect
      },
      on: {
        'on-change': (value, selectedData) => {
          console.log('value: ' + JSON.stringify(value) + ' selectedData:' + JSON.stringify(selectedData))
          this.setValue(value, params)
        }
      }
    })
  }

  getAreaStr () {
    if (!this.widgetVal) { return '' }
    let areaList = this.widgetVal
    let areas = Array.from(areaList, (strItem) => {
      return strItem.label
    })
    return areas.join('/')
  }

  jsonToWidgetValue(jsonVal) {
    if (!jsonVal) {
      return []
    }
    let areaList = jsonVal
    let result = []
    for (let strItem of areaList) {
      if (strItem.length > 0) {
        let slist = strItem.split('-')
        result.push({
          value: Number(slist[0]),
          label: slist[1]
        })
      }
    }
    return result
  }

  widgetValueToJson(widgetVal) {
    return Array.from(widgetVal, (select) => {
      return select.value + '-' + select.label
    })
  }
}

class FileField extends BaseField {
  getChildrenRender (h, params) {
    return [this._getSubRender(h, params)]
  }
  _getSubRender(h, params) {
    let widgetJsonObj = this.widgetJsonObj
    let uploadButton = h('Button', {attrs: {'icon': 'ios-cloud-upload-outline'}}, '上传')
    let defaultFileList = []
    if (this.widgetVal) {
      let name = this.widgetVal
      try {
        let jobj = JSON.parse(this.widgetVal)
        name = jobj['filename']
      } catch(err) {
      }
      defaultFileList.push({
        name: name
      })
    }
    if (widgetJsonObj.type === 'upload') {
      return h('Upload', {
        props: {
          action: this.parentWidget.upload_action,
          headers: this.parentWidget.upload_headers,
          defaultFileList: defaultFileList,
          onSuccess: (res, file, fileList) => {
            if (widgetJsonObj.format === 'json') {
              this.setValue(JSON.stringify(res.data), params)
            } else {
              this.setValue(res.data.fpath, params)
            }
          }
        }
      }, [uploadButton])
    } else if (widgetJsonObj.type === 'chunkedupload') {
      return h(ChunkedUpload, {
        props: {
          name: "chunked_upload_file",
          headers: this.parentWidget.upload_headers,
          action: 'unsupport',
          action_chunk: this.parentWidget.upload_action_chunk,
          action_complete: this.parentWidget.upload_action_complete,
          defaultFileList: defaultFileList,
          onSuccess: (res, file, fileList) => {
            if (widgetJsonObj.format === 'json') {
              this.setValue(JSON.stringify(res.data), params)
            } else {
              this.setValue(res.data.fpath, params)
            }
          }
        }
      }, [uploadButton])
    } else {
      console.log(`unsupport type ${widgetJsonObj.type}`)
    }
  }
}

class ImageField extends BaseField {
  getChildrenRender (h, params) {
    return [this._getSubRender(h, params)]
  }

  _getSubRender (h, params) {
    return h('img', {
      style: {
        width: 32,
        height: 32
      }
    }, this.widgetVal)
  }
}

class RichEditorField extends InputField {
  getChildrenRender (h, params) {
    return [this._getSubRender(h, params)]
  }

  _getSubRender (h, params) {
    this.tinymce = h(Tinymce, {
      props: {
        value: this.widgetVal,
        headers: this.parentWidget.upload_headers,
        action: this.parentWidget.upload_action,
        action_chunk: this.parentWidget.upload_action_chunk,
        action_complete: this.parentWidget.upload_action_complete,
      },
      on: {
        'input': (value) => {
          this.setValue(value, params)
        }
      }
    })
    return this.tinymce
  }

  OnDestroy() {
    this.tinymce.componentInstance.destroyTinymce()
  }
};
