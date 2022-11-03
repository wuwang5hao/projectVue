<template>
  <div>
    <span v-if="field.readonly">
      {{ readonlyListText || '无' }}
    </span>
    <ACascader
      class="cw-cascader"
      v-else
      :style="{width: field.width || '320px'}"
      v-model="widgetVal"
      :options="field.options"
      :placeholder="placeholder()"
      :showSearch="{filter}"
      :allowClear="!field.required"
      expand-trigger="hover"
      change-on-select
      :getPopupContainer="getPopupContainer()"
    />
  </div>
</template>
<script>
/*
 * 级联组件
 */
import BaseWidget from './BaseWidget'

export default {
  name: 'CascaderWidget',
  extends: BaseWidget,
  supportReadonly: true,
  defaultValue: () => { return [] },
  inject: ['popupContainer'],
  computed: {
    readonlyListText() {
      return this._getReadonlyListText()
    }
  },
  watch: {
  },
  data() {
    return {}
  },
  methods: {
    /**
     * 支持类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['str_list', 'int_list']
    },
    /**
     * 过滤器回调
     * @param inputValue
     * @param path
     * @returns {*}
     */
    filter(inputValue, path) {
      return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
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
            if (!value || !value.length) {
              callback(new Error(rule.message))
              return
            }
          }
          callback()
        }
      }
    },
    /**
     * 占位符文字
     * @returns {*|string}
     */
    placeholder() {
      return this.field.placeholder || `请选择${this.field.label}`
    },
    /**
     * 根据value获取node节点
     * @param node
     * @param value
     * @param currentLevel
     * @param valueLevel
     * @returns {null|*}
     * @private
     */
    _getNodeByValue0(node, value, currentLevel, valueLevel) {
      if (currentLevel === valueLevel && node.value === value) {
        return node
      } else if (node.children) {
        for (let subNode of node.children) {
          let ret = this._getNodeByValue0(subNode, value, currentLevel+1, valueLevel)
          if (ret) return ret
        }
      }
      return null
    },
    /**
     * 根据value获取node节点
     * @param value
     * @param valueLevel
     * @returns {null|*}
     * @private
     */
    _getNodeByValue(value, valueLevel) {
      for (let node of this.field.options) {
        let currentLevel = 0
        let ret = this._getNodeByValue0(node, value, currentLevel, valueLevel)
        if (ret) return ret
      }
      return null
    },
    /**
     * 获取只读文字
     * @returns {string}
     * @private
     */
    _getReadonlyListText() {
      if (!this.jsonVal) return ''
      let result = []
      for (let [index, value] of Object.entries(this.jsonVal)) {
        let valueLevel = parseFloat(index)
        let ret = this._getNodeByValue(value, valueLevel)
        result.push(ret ?  ret.label: value)
      }
      return result.join('/')
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
    }
  },
}
</script>
<style lang="less">
.cw-cascader.ant-cascader-picker {
  border: unset;
}
</style>
