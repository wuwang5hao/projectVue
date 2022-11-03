/**
 * 表单组件的基础组件，定义表单组件的基本行为
 * @vue-props {Object} pField - 表单项结构
 * @vue-props {Object} pJsonModel - 表单数据结构
 * @vue-props {Object} pRules - 表单项验证规则
 * @vue-data {any} widgetVal - UI组件数据
 */
import {RuntimeError} from "jscom/core/exceptions"
import {objUtil} from "jscom/utils/objutil";

export default {
  name: 'BaseWidget',
  // 如果要定制 readonly 控件，需要将该标志置为 true
  supportReadonly: false,
  defaultValue: () => { return '' },
  props: {
    pJsonModel: Object,
    pField: Object,
    pRules: Object,
  },
  watch: {
    pField: {
      handler(value) {
        Object.assign(this.field, value)
        this.init()
        this.check()
      },
      deep: true
    },
    widgetVal: {
      handler(widgetVal) {
        if(this.field.mode==='tags'&&this.field.maxTagsCount===1&&widgetVal&&widgetVal.length > 1) {
          widgetVal = [widgetVal[widgetVal.length - 1]]
        }
        this._setWidgetVal(widgetVal)
      },
      deep: true,
    },
    pJsonModel: {
      handler(val) {
        if (JSON.stringify(this.jsonModel) === JSON.stringify(val)) {
          // NOTE: 解除循环设置，第二次相同值设置时直接返回
          return
        }
        this.jsonModel = objUtil.clone(this.pJsonModel)
        let jsonVal = this.jsonModel[this.pField.name]
        this.widgetVal = this.jsonToWidget(jsonVal)
        let oldJsonVal = this.jsonVal
        this.jsonVal = jsonVal

        if (this.field.onChange && JSON.stringify(oldJsonVal) !== JSON.stringify(jsonVal)) {
          this.field.onChange(jsonVal, this.pJsonModel, oldJsonVal, 'json')
          this.onJsonChange(jsonVal, this.pJsonModel, oldJsonVal, 'json')
        }
      },
      deep: true
    }
  },
  data() {
    let jsonVal = this.getJsonVal()
    if ([undefined, null, ''].includes(jsonVal)) { jsonVal = this.$options.defaultValue() }
    if (jsonVal !== this.pJsonModel[this.pField.name]) {
      this.pJsonModel[this.pField.name] = jsonVal
    }
    let widgetVal = this.jsonToWidget(jsonVal)
    return {
      jsonModel: objUtil.clone(this.pJsonModel),
      field: this.pField,
      jsonVal,
      widgetVal,
    }
  },
  created() {
    this.init()
    this.check()
  },
  methods: {
    /**
     * 初始化逻辑
     */
    init() {
      this.pRules[this.field.name] = this._rules()
    },
    // 检查表单项类型
    check() {
      let supportTypes = this.supportTypes()
      if (supportTypes.indexOf(this.field.type) === -1) {
        throw new RuntimeError(`widget ${this.$options.name} can not support type ${this.field.type}, supported are ${supportTypes}`)
      }
    },
    // 表单项支持的类型
    supportTypes() {
      return ['str', 'int']
    },
    // 表单数据到UI组件数据的转化
    jsonToWidget(jsonVal) {
      return jsonVal
    },
    // UI组件数据到表单数据的转化
    widgetToJson(widgetVal) {
      return widgetVal
    },
    /*
    string: Must be of type string. This is the default type.
    number: Must be of type number.
    boolean: Must be of type boolean.
    method: Must be of type function.
    regexp: Must be an instance of RegExp or a string that does not generate an exception when creating a new RegExp.
    integer: Must be of type number and an integer.
    float: Must be of type number and a floating point number.
    array: Must be an array as determined by Array.isArray.
    object: Must be of type object and not Array.isArray.
    enum: Value must exist in the enum.
    date: Value must be valid as determined by Date
    url: Must be of type url.
    hex: Must be of type hex.
    email: Must be of type email.
    any: Can be any type.
    */
    defaultRule() {
      let ruleType = this.ruleType()
      if (ruleType === 'any') {
        return this._genAnyValidatorRule()
      } else {
        let result = {
          required: this.field.required,
          message: this.ruleMessage(),
          trigger: this.ruleTrigger(),
          type: this.ruleType(),
        }
        return result
      }
    },
    /**
     * 获取any自定义校验函数
     * @returns {{validator: validator, trigger: string, message: *, required: *}}
     * @private
     */
    _genAnyValidatorRule() {
      const validator = (rule, value, callback) => {
        if (value) {  // !== '', !== undefined, !== null
          callback()
        } else if (!value && !rule.required) {
          callback()
        } else {
          callback(new Error(rule.message))
        }
      }
      let result = {
        required: this.field.required,
        message: this.ruleMessage(),
        trigger: this.ruleTrigger(),
        // type: this.ruleType(),
        validator,
      }
      return result
    },
    /**
     * 校验规则定义
     * @returns {{validator: validator, trigger: string, required: *}[]}
     */
    _rules() {
      let rules = [this.defaultRule()]
      if (this.pField.validator) {
        rules.push({
          required: this.field.required,
          // message: this.ruleMessage(),
          trigger: this.ruleTrigger(),
          // type: this.ruleType(),
          validator: this.pField.validator,
        })
      }
      let rules1 = this.rules()
      if (rules1) {
        rules = rules.concat(rules1)
      }
      return rules
    },
    /**
     * 校验规则定义
     * @returns {{validator: validator, trigger: string, required: *}[]}
     */
    rules() {
      return []
    },
    /**
     * 占位符文字
     * @returns {*|string}
     */
    placeholder() {
      return this.field.placeholder || `请输入${this.field.label}`
    },
    /**
     * rule校验错误显示消息
     * @returns {*|string}
     */
    ruleMessage() {
      return this.placeholder()
    },
    /**
     * rule触发方式
     * @returns {string}
     */
    ruleTrigger() {
      return 'change'
    },
    /**
     * rule类型
     * @returns {string}
     */
    ruleType() {
      if (this.field.type.endsWith('_list')) {  // 'int_list', 'str_list', 'obj_list' and so on
        return 'array'
      } else {
        return 'any'
      }
      // if (this.field.type === 'int' || this.field.type === 'float' || this.field.type === 'long') {
      //   return 'number'
      // } else if (this.field.type === 'bool') {
      //   return 'boolean'
      // } else if (this.field.type === 'int_list'
      //   || this.field.type === 'str_list'
      //   || this.field.type === 'obj_list') {
      //   return 'array'
      // } else {
      //   return 'string'
      // }
    },
    /**
     * 获取jsonVal
     * @returns {*}
     */
    getJsonVal() {
      return this.pJsonModel[this.pField.name]
    },
    /**
     * 设置控件值逻辑
     * @param widgetVal
     * @private
     */
    _setWidgetVal(widgetVal) {
      this.widgetVal = widgetVal

      // 构建一个全新的 jsonVal
      let jsonVal = objUtil.clone(this.widgetToJson(widgetVal))

      this.jsonVal = jsonVal
      let oldJsonVal = this.jsonModel[this.field.name]
      this.jsonModel[this.field.name] = jsonVal
      // 构建一个全新的 jsonVal 到父 jsonModel, 以免 array object 结构发生联动修改
      this.pJsonModel[this.field.name] = objUtil.clone(jsonVal)

      if (JSON.stringify(oldJsonVal) !== JSON.stringify(jsonVal)) {
        if (this.field.onChange) {
          this.field.onChange(jsonVal, this.pJsonModel, oldJsonVal, 'widget')
        }
        this.onJsonChange(jsonVal, this.pJsonModel, oldJsonVal, 'widget')
        // 因为在 validator 中可能会用到外层的 jsonModel，因此在此进行延迟触发信号，以确保 validator 调用时外层 jsonModel 已经被更新
        this.$nextTick(() => {
          this.$emit('change', jsonVal)
        })
      }
    },
    /**
     * json值改变回调
     * @param jsonVal
     * @param jsonModel
     * @param oldJsonVal
     * @param source
     */
    onJsonChange (jsonVal, jsonModel, oldJsonVal, source) {

    }
    // NOTE: 目前不支持直接修改 jsonVal 同时修改 widgetVal 的场景
    //  否则会产生循环设置 jsonVal widgetVal (当 jsonVal widgetVal不同的时候)
    // setJsonVal(jsonVal) {
    //   this.jsonVal = jsonVal
    //   this.protectPJsonModel = true
    //   let oldJsonVal = this.jsonModel[this.field.name]
    //   this.jsonModel[this.field.name] = jsonVal
    //   this.pJsonModel[this.field.name] = jsonVal
    //
    //   if (this.field.onChange && oldJsonVal !== jsonVal) {
    //     this.field.onChange(jsonVal, this.jsonModel)
    //   }
    // }
  }
}
