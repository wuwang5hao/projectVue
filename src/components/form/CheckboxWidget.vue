<template>
  <div :style="{
      'margin-top': field.marginTop || '12px',
      'display': 'inline-block',
    }"
  >
    <ACheckbox
      v-if="field.type === 'bool'"
      v-model="widgetVal"
    >{{field.text}}</ACheckbox>
    <ACheckboxGroup
      v-else
      :options="field.options"
      v-model="widgetVal"
    />
  </div>
</template>
<script>
/*
 * 选择框组件
 */
import BaseWidget from './BaseWidget'

export default {
  name: 'CheckboxWidget',
  extends: BaseWidget,
  methods: {
    /**
     * 支持类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['str', 'int', 'bool', 'str_list']
    },
    /**
     * json到widget值类型转换
     */
    jsonToWidget(val) {
      if (this.pField.type === 'bool') {
        if (val) return true
        else return false
      } else {
        if (!val) {
          return []
        } else {
          return val
        }
      }
    },
    /**
     * widget到json值类型转换
     * @param val
     * @returns {boolean|*[]|*}
     */
    widgetToJson(val) {
      if (this.pField.type === 'bool') {
        if (val) return true
        else return false
      } else {
        if (!val) {
          return []
        } else {
          return val
        }
      }
    }
  },
}
</script>
