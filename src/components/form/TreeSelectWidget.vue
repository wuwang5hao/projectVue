<template>
  <div>
    <span v-if="field.readonly" :title="field.readTitle">
      {{ field.readTitle || '无' }}
    </span>
    <ATreeSelect
      v-else
      :style="{width: field.width || '320px'}"
      v-model="widgetVal"
      :treeData="field.treeData"
      placeholder="请选择"
      :showSearch="field.showSearch"
      :filterTreeNode="filter"
      :allowClear="!field.required"
      :disabled="field.disabled"
      :getPopupContainer="getPopupContainer()"
      :dropdownClassName="!field.treeData.filter(item => item.children&&item.children.length).length?'selectTree':''"
    />
  </div>
</template>
<script>
import BaseWidget from './BaseWidget'

export default {
  name: 'TreeSelectWidget',
  extends: BaseWidget,
  supportReadonly: true,
  inject: ['popupContainer'],
  computed: {
    readonlyListText() {
      return this._getReadonlyListText()
    }
  },
  created() {
    // console.log(this.field.treeData)
  },
  watch: {
  },
  data() {
    return {
    }
  },
  methods: {
    /**
     * 支持数据类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['str', 'int']
    },
    /**
     * 过滤器定制
     */
    filter(inputValue, path) {
      return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    },
    /**
     * 占位符文字
     * @returns {*|string}
     */
    placeholder() {
      return this.field.placeholder || `请选择${this.field.label}`
    },
    /**
     * json到widget值类型转换
     * @param jsonVal
     * @returns {{}|any}
     */
    jsonToWidget(jsonVal) {
      if (!jsonVal) { return undefined }
      else { return jsonVal }
    },
    /**
     * widget到json值类型转换
     */
    widgetToJson(widgetVal) {
      if (widgetVal === undefined) { return '' }
      else { return widgetVal }
    },
    /**
     * 通过value获取node节点
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
     * 通过value获取node节点
     * @param value
     * @param valueLevel
     * @returns {null|*}
     * @private
     */
    _getNodeByValue(value, valueLevel) {
      for (let node of this.field.treeData) {
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
        result.push(ret ?  ret.title: value)
      }
      return result.join('/')
    },
    /**
     * 获取弹出容器
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
  .selectTree{
    .ant-select-tree li span.ant-select-tree-switcher{
      width: auto;
      max-width: 24px;
    }
    .ant-select-tree li .ant-select-tree-node-content-wrapper{
      width: 100%;
    }
    .ant-select-tree li span.ant-select-tree-switcher.ant-select-tree-switcher_open .ant-select-switcher-icon{
      width: 24px;
    }
  }
</style>
