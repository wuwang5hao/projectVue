<template>
  <div>
    <ASelect
      :style="{width: field.width || '320px'}"
      class="sw-field"
      :mode="field.mode || 'default'"
      v-model="widgetVal"
      :placeholder="field.placeholder || '请选择'"
      showSearch
      optionFilterProp="children"
      :filterOption="filterOption"
      :allowClear="field.allowClear === undefined ? !field.required : field.allowClear"
      :disabled="field.disabled || false"
      :getPopupContainer="getPopupContainer()"
    >
      <ASelectOption v-for="(option, index) of field.options" :value="option.value" :key="index" :title="option.label">
        {{ option.label }}
      </ASelectOption>
    </ASelect>
  </div>
</template>
<script>
import BaseWidget from "./BaseWidget"

export default {
  name: 'SelectWidget',
  extends: BaseWidget,

  inject: ['popupContainer'],

  methods: {
    /**
     * 支持类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return [
        'str', 'int', 'long',  // mode === 'default'
        'str_list', 'int_list',  // mode === 'multiple', 'tags'
      ]
    },
    /**
     * @brief: 将空字符串转换为 undefined 修复 placeholder 因为有空字符串不显示的问题
     */
    jsonToWidget(jsonVal) {
      if (!jsonVal) {
        return undefined
      } else {
        return jsonVal
      }
    },
    /**
     * widget到json值类型转换
     * @param val
     * @returns {boolean|*[]|*}
     */
    widgetToJson(widgetVal) {
      if (!widgetVal) {
        return ''
      } else {
        return widgetVal
      }
    },
    /**
     * 筛选器选项
     */
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    /**
     * 占位符文字
     * @returns {*|string}
     */
    placeholder() {
      return this.field.placeholder || `请选择${this.field.label}`
    },
    /**
     * 获取弹出container
     * @returns {(function(): default.methods.$refs.footer.parentElement.previousElementSibling|default.methods.$el)|(function(): HTMLElement)}
     */
    getPopupContainer () {
      if (this.popupContainer) {
        return () => {
          return this.popupContainer()
        }
      } else {
        return () => document.body
      }
    },
    defaultRule() {
      return {
        required: this.field.required,
        message: this.ruleMessage(),
        trigger: this.ruleTrigger(),
        validator: (rule, value, callback) => {
          if (rule.required) {
            if (!value || !value.length) {
              callback(new Error(rule.message))
              return
            }
          }
          callback()
        }
      }
    },
  }
}
</script>
<style lang="less">
.sw-field {
  min-height:40px;
  /*background:rgba(252,252,253,1);*/
}
</style>
