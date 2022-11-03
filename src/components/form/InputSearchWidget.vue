<template>
  <div>
    <AInputSearch
      :style="{width: field.width || '330px'}"
      ref="input"
      v-model="widgetVal"
      @search="field.onSearch"
      :placeholder="field.placeholder || '请输入'"
      :prefix="field.prefix"
      :disabled="isDisabled"
      @blur="field.onBlur"
      @change="onChange"
      :maxLength="field.maxLength"
    >
      <div
        slot="suffix"
        v-if="field.suffix"
        class="suffix"
        :style="{backgroundColor: field.suffix_backgroundColor}"
      >
        {{field.suffix}}
      </div>
    </AInputSearch>
  </div>
</template>
<script>
import BaseWidget from './BaseWidget'

export default {
  name: 'InputSearchWidget',
  extends: BaseWidget,
  data() {
    return {
      isDisabled: this.pField.switch || this.pField.disabled || false
    }
  },
  methods: {
    /**
     * 支持数据类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['str', 'int', 'float', 'long', 'email', 'url', 'mobile']
    },
    /**
     * 改变只读状态触发
     */
    onChangeDisabled () {
      // 仅设置成可写，不需要再设置成只读
      // this.isDisabled = !this.isDisabled
      this.isDisabled = false
    },
    /**
     * widget到json值类型转换
     */
    widgetToJson(widgetVal) {
      if (widgetVal === '') {
        return ''
      }
      if (this.field.type === 'int') {
        return parseInt(widgetVal, 10)
      } else if (this.field.type === 'float') {
        return parseFloat(widgetVal)
      } else {
        return widgetVal
      }
    },
    /**
     * 判断是否为数字
     */
    isNumber() {
      return ['int', 'float', 'long'].includes(this.pField.type)
    },
    /**
     * json到widget值类型转换
     * @param jsonVal
     * @returns {{}|any}
     */
    jsonToWidget(jsonVal) {
      if (this.isNumber() && Number.isNaN(jsonVal)) {
        return ''
      } else {
        return jsonVal
      }
    },

    // 失去焦点触发
    // onBlur(event) {
    // },
    /**
     * 控件值修改触发
     * @param event
     */
    onChange(event) {
      if (this.field.upper) {
        this.widgetVal = event.target.value.toUpperCase()
      } else {
        this.widgetVal = event.target.value
      }
      if (this.field.filter && !this.field.filter(this.widgetVal)) {
        this.widgetVal = this.widgetVal.slice(0, this.widgetVal.length - 1)
      }
      if (this.field.replacePattern) {
        this.widgetVal = this.widgetVal.replace(this.field.replacePattern, '')
      }
    },

    /**
     * 校验规则类型
     * @returns {string}
     */
    ruleType() {
      if (this.isNumber()) {
        return 'number'
      } else {
        return 'any'
      }
    },
    /**
     * 校验规则列表
     * @returns {[]}
     */
    rules() {
      let result = []
      let validator = this.genValidator()
      if (validator) {
        result.push(validator)
      }
      if (this.field.type === 'url') {
        result.push(
          {
            required: this.field.required,
            message: 'URL格式错误',
            trigger: this.ruleTrigger(),
            type: 'url',
          }
        )
      }
      if (this.field.type === 'email') {
        result.push(
          {
            required: this.field.required,
            message: '邮箱格式错误',
            trigger: this.ruleTrigger(),
            type: 'email',
          }
        )
      }
      if (this.field.type === 'mobile') {
        result.push(
          {
            required: this.field.required,
            message: '手机格式错误',
            trigger: this.ruleTrigger(),
            validator: (rule, value, callback) => {
              if (!value || value.length !== 11) {
                callback(rule.message)
                return
              }
              let test = value.replace(/[\d]/g, '')
              if (test.length !== 0) {
                callback(rule.message)
                return
              }
              callback()
            },
          }
        )
      }
      return result
    },
    /**
     * 生成校验规则函数
     * @returns {{validator: validator, trigger: string, required: *}|null}
     */
    genValidator() {
      if (!this.field.validate) {
        return null
      }
      const validator = (rule, value, callback) => {
        let msg = this.field.validate(value)
        if (msg) {
          callback(msg)
        } else {
          callback()
        }
      }
      let result = {
        required: this.field.required,
        // message: this.ruleMessage(),
        trigger: this.ruleTrigger(),
        // type: this.ruleType(),
        validator,
      }
      return result
    }
  }
}
</script>
<style lang="less">
.suffix {
  height: 100%;
  /* width: 100%; */
  flex-grow: 1;
  padding: 0 10px;
  text-align: center;
  display: flex;
  align-items: center;
}
.input-content {
  display: flex;
  .suffix-icon {
    margin-left: 10px;
    color: #02C5E0;
    line-height: 40px;
  }
}
.ant-input-affix-wrapper {
  input {
    background:rgba(252,252,253,1);
    border-radius:2px;
    border:1px solid rgba(238,240,242,1);
  }
}
</style>
