<template>
  <div>
    <span v-if="field.readonly === 'list'">
      {{readonlyListText || '无'}}
    </span>
    <div v-else-if="!treeData || Object.entries(treeData).length === 0">
      <span v-if="field.readonly">无</span>
    </div>
    <ATree
      v-else
      class="tw-tree"
      v-model="checkedKeys"
      :checkable="!field.readonly"
      @expand="onExpand"
      :expandedKeys="expandedKeys"
      :autoExpandParent="autoExpandParent"
      :defaultExpandAll="true"
      :value="widgetVal"
      @select="onSelect"
      @check="onCheck"
      :selectedKeys="selectedKeys"
      :treeData="treeData"
      :disabled="field.readonly"
      :showLine="field.showLine"
      :selectable="!field.readonly"
      :showIcon="!field.readonly"
      :style="{maxHeight: field.maxHeight || '200px', 'overflowY': 'auto', width: field.width || '320px',  height: field.height, minHeight: field.minHeight || '100px'}"
    />
  </div>
</template>
<script>
import { sysUtil } from "jscom/utils/sysutil"
import BaseWidget from "./BaseWidget";

/**
 * jsonVal 格式 [{key: '', title: ''}, ...]  title 在只读模式下可能被使用
 */
export default {
  name: 'TreeWidget',
  extends: BaseWidget,
  supportReadonly: true,
  defaultValue: () => { return [] },
  computed: {
    readonlyListText() {
      return this._getReadonlyListText()
    }
  },
  data() {
    let field = this.pField
    let defaultExpandAll = field.defaultExpandAll === undefined ? true : field.defaultExpandAll
    let [treeData, expandedKeys] = this.initTreeData()
    return {
      expandedKeys: expandedKeys,
      defaultExpandAll: defaultExpandAll,
      autoExpandParent: true,
      selectedKeys: field.selectedKeys || [],
      checkedKeys: field.checkedKeys || [],
      treeData,
    }
  },
  created() {
  },
  watch: {
    'pField.treeData': {
      handler() {
        [this.treeData, this.expandedKeys] = this.initTreeData()
      }
    },
    'pField.readonly': {
      handler() {
        [this.treeData, this.expandedKeys] = this.initTreeData(this.expandedKeys)
      }
    },
    jsonModel: {
      handler() {
        [this.treeData, this.expandedKeys] = this.initTreeData(this.expandedKeys)
      }
    }
  },
  methods: {
    /**
     * @brief: 初始化 treeData
     */
    initTreeData(currentExpandedKeys) {
      let treeData = this.pField.treeData
      let initValues = this.pJsonModel[this.pField.name]
      if (sysUtil.isArrayObject(initValues)) {
        this.checkedKeys = initValues.map((item) => item.key)
      }
      if (this.pField.readonly) {
        // 如果为只读状态 treeData 仅显示那些包含选择值的项
        treeData = this.checkedTreeData(this.pField.treeData, this.pJsonModel[this.pField.name])
      }

      let expandedKeys = currentExpandedKeys
      if (!expandedKeys) {
        // ant 所有 node 展开特性有bug，因此此处遍历所有非叶子节点并设置自动展开 expandedKeys
        let defaultExpandAll = this.pField.defaultExpandAll === undefined ? true : this.pField.defaultExpandAll
        expandedKeys = this.pField.expandedKeys || []
        if (defaultExpandAll) {
          let keys = []
          this.allNodeKeys(treeData, keys)
          expandedKeys = keys
        }
      }
      return [treeData, expandedKeys || []]
    },
    /**
     * 获取所有节点的key
     */
    allNodeKeys(nodeList, keys) {
      if (!nodeList) return
      for (let node of nodeList) {
        if (!node.children) continue
        keys.push(node.key)
        this.allNodeKeys(node.children, keys)
      }
    },
    /**
     * 已勾选的节点
     */
    checkedTreeData(nodeList, jsonVal) {
      let result = []
      let values = Array.from(jsonVal, (item) => { return item.key })
      for (let node of nodeList) {
        let ret = this._checkedTreeData(node, values)
        if (ret) {
          result.push(ret)
        }
      }
      return result
    },
    /**
     * 已勾选的数据节点逻辑
     */
    _checkedTreeData(treeData, values) {
      if (!values) return null
      let result = {...treeData}
      let childrenMatch = false
      if (result.children) {
        let children = result.children
        result.children = []
        for (let subNode of children) {
          let ret = this._checkedTreeData(subNode, values)
          if (ret) {
            childrenMatch = true
            result.children.push(ret)
          }
        }
      }
      if (childrenMatch || values.indexOf(result.key) !== -1) {
        return result
      } else {
        return null
      }
    },
    /**
     * 支持类型声明
     * @returns {string[]}
     */
    supportTypes() {
      // {title: '', value: ''}
      return ['obj_list']
    },
    /**
     * 展开回调
     */
    onExpand(expandedKeys) {
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      if (this.field.onExpand) {
        this.field.onExpand(expandedKeys)
      }
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    /**
     * @brief: check 回调
     */
    onCheck(checkedKeys, event) {
      this._onCheck(checkedKeys)
    },
    /**
     * 勾选回调逻辑
     */
    _onCheck(checkedKeys) {
      let keys = checkedKeys
      if (this.pField.onlyLeaf !== false) {  // true or undefined
        keys = []
        for (let key of checkedKeys) {
          let node = this._getNodeByKey(key)
          if (node && (!node.children || node.children.length === 0)) {
            keys.push(key)
          }
        }
      }
      this.widgetVal = keys
      this.pField.checkedKeys = keys
    },
    /**
     * json到widget值类型转换
     */
    jsonToWidget(jsonVal) {
      return Array.from(jsonVal, (item) => {
        return item.key
      })
    },
    /**
     * widget到json值类型转换
     * @param val
     * @returns {boolean|*[]|*}
     */
    widgetToJson(widgetVal) {
      return Array.from(widgetVal, (item) => {
        let ret = this._getNodeByKey(item)
        return {
          key: item,
          title: ret ? ret.title : item
        }
      })
    },
    /**
     * 获取子key列表
     */
    _getSubKeys(searchKeys) {
      function getSubKeysOfNode(node, keys) {
        keys.push(node.key)
        if (node.children) {
          for (let subNode of node.children) {
            getSubKeysOfNode(subNode, keys)
          }
        }
      }
      let allKeys = []
      for (let key0 of searchKeys) {
        let node = this._getNodeByKey(key0)
        getSubKeysOfNode(node, allKeys)
      }
      return allKeys
    },
    /**
     * @brief: 选择回调
     */
    onSelect(selectedKeys, info) {
      if (!this.pField.selectNotCheck) {
        if (!selectedKeys || selectedKeys.length === 0) {
          // remove
          let allKeys = this._getSubKeys(this.selectedKeys)
          // let selectKey = this.selectedKeys[0]
          this.checkedKeys = this.checkedKeys.filter((item) => { return !allKeys.includes(item) })
        } else {
          let node = this._getNodeByKey(selectedKeys[0])
          if (node.checkable === false) {
            this.toggleExpandedKey(selectedKeys[0])
            return
          }
          let allKeys = this._getSubKeys(selectedKeys)
          for (let key of allKeys) {
            if (!this.checkedKeys.includes(key)) {
              this.checkedKeys.push(key)
            }
          }
        }
        this._onCheck(this.checkedKeys)
      }
      this.selectedKeys = selectedKeys
      this.pField.selectedKeys = selectedKeys
    },
    /**
     * 切换展开key
     */
    toggleExpandedKey(key) {
      if (this.expandedKeys.includes(key)) {
        this.expandedKeys = this.expandedKeys.filter((item) => { return item !== key })
      } else {
        this.expandedKeys = [...this.expandedKeys, key]
      }
    },
    /**
     * 通过key获取节点
     */
    _getNodeByKey0(node, key) {
      if (node.key === key) {
        return node
      } else if (node.children) {
        for (let subNode of node.children) {
          let ret = this._getNodeByKey0(subNode, key)
          if (ret) return ret
        }
      }
      return null
    },
    /**
     * 通过key获取节点逻辑
     */
    _getNodeByKey(key) {
      for (let node of this.treeData) {
        let ret = this._getNodeByKey0(node, key)
        if (ret) return ret
      }
      return null
    },
    /**
     * 获取只读文字
     */
    _getReadonlyListText() {
      if (!this.jsonVal) return ''
      let result = []
      for (let item of this.jsonVal) {
        let ret = this._getNodeByKey(item.key)
        result.push(ret ?  ret.title : item)
      }
      return result.join('，') || '无'
    },
    /**
     * 占位符文字
     * @returns {*|string}
     */
    placeholder() {
      return this.field.placeholder || `请选择${this.field.label}`
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
              callback(new Error('请选择'))
              return
            }
          }
          callback()
        }
      }
    },
  },
};
</script>

<style lang="less">
@import 'variables.less';
.tw-tree {
  background-color: #FCFCFD;
  border: 1px #EEF0F2 solid;
  border-radius: 2px;
  padding: 5px;
  color: #666666;
  li.ant-tree-treenode-disabled > .ant-tree-node-content-wrapper span{
  color:#666666;
}
}


</style>
