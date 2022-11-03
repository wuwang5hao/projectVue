import {FieldSpec} from "rpc/Table/Table"
import {FormFieldSpec, FormSpec as RpcFormSpec} from "rpc/Form/Form";
import {FormSpec} from 'jspc/rpc/form/data/FormSpec'

export default class FormSpecFactory {
  constructor(name) {
    this.name = name
    this.fields = []
    this.dataJsonObj = {}
    this.valueNameMap = {}
  }

  addField(name, title, type, opts={required: true, disabled: false, hidden: false, widget: null}) {
    let fieldSpec = new FieldSpec()
    fieldSpec.name = name
    fieldSpec.title = title
    fieldSpec.type = type
    fieldSpec.required = opts.required
    fieldSpec.disabled = opts.disabled
    fieldSpec.hidden = opts.hidden
    if (opts.widget) {
      fieldSpec.widgetName = opts.widget.constructor.name
      fieldSpec.widgetJson = JSON.stringify(opts.widget)
    }
    this.fields.push(fieldSpec)
  }

  setValueNameMap(vnMap) {
    this.valueNameMap = vnMap
  }

  setValueName(field, value, name) {
    let vn = this.valueNameMap[field]
    if (!vn) {
      vn = this.valueNameMap[field] = {}
    }
    vn[value] = name
  }

  genRpcFormSpec() {
    let spec = new RpcFormSpec()
    spec.name = this.name
    spec.dataJson = JSON.stringify(this.dataJsonObj)
    spec.valueNameMap = this.valueNameMap
    for (let fieldSpec of this.fields) {
      let ffSpec = new FormFieldSpec()
      ffSpec.fieldSpec = fieldSpec
      spec.fields.push(ffSpec)
    }
    return spec
  }

  genFormSpec(parentWidget, fixedData={}) {
    let spec = this.genRpcFormSpec()
    let result = new FormSpec(parentWidget, spec, fixedData)
    result.init()
    return result
  }
}
