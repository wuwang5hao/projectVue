<template>
  <div v-if="field.readonly">
    <span v-if="!widgetVal || (!widgetVal[0] && !widgetVal[1])">无</span>
    <div v-else>
      <span>{{widgetVal && widgetVal[0]}}</span> - <span>{{widgetVal && widgetVal[1]}}</span>
    </div>
  </div>
  <div v-else :style="{width: field.width || '320px', display: 'flex', justifyContent: 'space-between'}">
    <AInputNumber
      v-model="intFirst"
      :style="{width: field.width || '142px'}"
      :min="field.min"
      :max="field.max"
      :precision="field.precision"
      :step="field.step"
    />
    <span :style="{marginLeft: '5px', marginRight: '5px', lineHeight: '38px'}">-</span>
    <AInputNumber
      v-model="intSecond"
      :style="{width: field.width || '142px'}"
      :min="field.min"
      :max="field.max"
      :precision="field.precision"
      :step="field.step"
    />
  </div>
</template>
<script>
/*
 * int范围组件，[startInt， endInt]
 */
import BaseWidget from './BaseWidget'

export default {
  name: 'IntRangeWidget',
  extends: BaseWidget,
  supportReadonly: true,
  watch: {
    intFirst() {
      this.widgetVal = [this.intFirst, this.intSecond]
    },
    intSecond() {
      this.widgetVal = [this.intFirst, this.intSecond]
    },
    jsonVal(val) {
      if (val) {
        [this.intFirst, this.intSecond] = val
      }
    }
  },
  data() {
    let jsonVal = this.pJsonModel[this.pField.name]
    let intFirst = ''
    let intSecond = ''
    if (jsonVal) {
      [intFirst, intSecond] = jsonVal
    }
    return {
      intFirst,
      intSecond,
    }
  },
  methods: {
    /**
     * 支持类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['int_list', 'int_range']
    },
    /**
     * 默认校验规则
     * @returns {{validator: validator, trigger: string, message: (*|string), required: *}}
     */
    defaultRule() {
      return {
        required: this.field.required,
        message: this.ruleMessage(),
        trigger: this.ruleTrigger(),
        validator: (rule, value, callback) => {
          if (rule.required) {
            if (!value || value.length !== 2) {
              callback(new Error('请输入'))
              return
            }
            if (typeof value[0] !== 'number') {
              callback(new Error('第一个值无效'))
              return
            }
            if (typeof value[1] !== 'number') {
              callback(new Error('第二个值无效'))
              return
            }
          }
          callback()
        }
      }
    },
  },
}
</script>
