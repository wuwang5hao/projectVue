<script>
/**
 * 表单插件
 */
export default {
  name: 'FormMixin',

  props: {
    pTable: Object
  },

  computed: {
    modalTitle() {
      if (this.pType === 'add') {
        return '新增'
      } else if (this.pType === 'update') {
        return '编辑'
      } else if (this.pType === 'copy') {
        return '复制'
      } else { // view
        return '详情'
      }
    }
  },

  mounted () {
    this.$on('success', this.reloadTable)
    this.$on('on-hide', this.removeModal)
    if (this.$refs.modalForm) {
      this.$refs.modalForm.$on('cancel', this.removeModal)
      this.$refs.modalForm.$on('input', (value) => {
        if (value === false) {
          this.removeModal()
        }
      })
    }
    // this.$on('cancel', this.removeModal)
  },

  methods: {
    /**
     * 重新加载表格
     */
    reloadTable () {
      if (this.pTable) {
        this.pTable.reload()
      }
    },
    /**
     * 删除窗口
     */
    removeModal () {
      setTimeout(() => {
        this.$destroy()
        // let el = document.getElementById('sslc-form')
        // document.body.removeChild(el.parentNode)
      }, 300)
    }
  }
}
</script>
