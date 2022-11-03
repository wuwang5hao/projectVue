import {RuntimeError} from "jscom/core/exceptions";

export default {
  name: 'TableMixin',
  data() {
    return {
      columns: [],
      dataSource: [],
      filterJsonModel: {},
      total: 0,
    }
  },
  methods: {
    /**
     * 设置服务器返回数据到表格
     * @param data
     */
    setData(data) {
      if (!data) {
        throw new RuntimeError(`data must not be none ${data}`)
      }
      if (!('total' in data)) {
        throw new RuntimeError(`data must have total attr ${data}`)
      }
      if (!('list' in data)) {
        throw new RuntimeError(`data must have list attr ${data}`)
      }
      this.total = data.total
      this.dataSource = data.list
    },
    /**
     * 重置过滤器触发
     */
    resetFilter () {

    },
    /**
     * 页码改变触发
     * @param num
     */
    onPageChange (num) {
      this.page.pageNum = num
      this.reload()
    },
    /**
     * 页面数量改变触发
     * @param size
     */
    onPageSizeChange (size) {
      this.page.pageNum = 1
      this.page.pageSize = size
      this.reload()
    },
    /**
     * 查询触发
     */
    onQuery () {
      this.reload()
    },
    /**
     * 重置触发
     */
    onReset () {
      this.resetFilter()
      this.reload()
    },
    /**
     * 获取所有非叶子节点
     * @param treeData
     * @returns {[]}
     */
    getNotLeafNodes(treeData) {
      let result = []
      function recursive(node) {
        if (!('children' in node)) {
          node.isLeaf = true
        } else {
          result.push(node)
          for (let subNode of node.children) {
            recursive(subNode)
          }
        }
      }
      for (let node of treeData) {
        recursive(node)
      }
      return result
    },
  }
}
