<script>
import BaseCompactTable from './BaseCompactTable'
import FormActionMixin from 'jspc/rpc/form/FormActionMixin'
export default {
  name: 'CompleteCompactTable',
  mixins: [FormActionMixin],
  extends: BaseCompactTable,
  created() {
    this.initTableSpec()
  },

  methods: {
    ondbClickItem (row, index) {
      this.$emit('on-row-double-click', row, index)
    }
  }
}
</script>