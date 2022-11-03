import { BaseFormField } from './FormField'

export class FormSpec {
  constructor (parentWidget, spec, fixedData) {
    this.parentWidget = parentWidget
    this.spec = spec
    this.fixedData = fixedData
    this.isDisableAll = true
    this.ctx = {model: {}, jsonModel: {}}
    this.fields = []
  }

  init() {
    let ctx = {model: {}, jsonModel: {}}
    let fields = []
    let dataJsonObj = {}
    if (this.spec.dataJson) {
      dataJsonObj = JSON.parse(this.spec.dataJson)
    }
    for (let ffSpec of this.spec.fields) {
      let valueNameMap = this._getMapValue(ffSpec.fieldSpec.name)
      let field
      let jsonVal = dataJsonObj[ffSpec.fieldSpec.name]
      ctx.jsonModel[ffSpec.fieldSpec.name] = jsonVal
      if (ffSpec.fieldSpec.genWidget) {
        field = ffSpec.fieldSpec.genWidget(this.parentWidget, ctx)
      } else {
        field = BaseFormField.Create(this.parentWidget, ffSpec.fieldSpec, valueNameMap)
        field.setCtx(ctx)
      }
      if (!field.isDisabled() && !field.isHidden()) {
        this.isDisableAll = false
      }
      fields.push(field)
    }
    this.ctx = ctx
    this.fields = fields
    return { ctx, fields }
  }

  _getMapValue (name, defaultValue={}) {
    if (!this.spec.valueNameMap) {
      return defaultValue
    }
    return this.spec.valueNameMap[name] || defaultValue
  }

  getRender(ref='formWidget', readonly=false) {
    return (h, params) => {
      return h('Form',
        {
          props: {
            model: this.ctx.model,
            labelWidth: 120
          },
          ref: ref,
        },
        Array.from(this.fields, (field) => {
          return field.getRender(h, {readonly: readonly})
        })
      )
    }
  }

  getFormDatas() {
    let result = {}
    for (let field of this.fields) {
      result[field.name] = field.getFormValue()
    }
    Object.assign(result, this.fixedData)
    return result
  }

  getFormDataJsonObj() {
    let result = {}
    for (let field of this.fields) {
      result[field.name] = field.getFormJsonValue()
    }
    Object.assign(result, this.fixedData)
    return result
  }

  getFormDataJsonStr() {
    return JSON.stringify(this.getFormDataJsonObj())
  }

  getFieldByName(name) {
    for (let field of this.fields) {
      if (field.name === name) {
        return field
      }
    }
    return null
  }

  getFieldValueMap() {
    let result = {}
    for (let field of this.fields) {
      result[field.name] = this._getMapValue(field.name)[field.jsonVal] || ''
    }
    return result
  }

  setSpecValueMap(valueNameMap) {
    if (!valueNameMap) {
      return
    }
    for (let [field, value] of Object.entries(valueNameMap)) {
      if (this.spec.valueNameMap[field]) {
        Object.assign(this.spec.valueNameMap[field], value)
      } else {
        this.spec.valueNameMap[field] = value
      }
    }
  }
}
