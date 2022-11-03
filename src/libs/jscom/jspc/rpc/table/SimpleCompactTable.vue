<script>
import BaseCompactTable from './BaseCompactTable'
export default {
  name: 'SimpleCompactTable',
  extends: BaseCompactTable,
  created() {
    this.initTableSpec()
  },
  props: {
    pHideFilters: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    getHideFilters () {
      return this.pHideFilters
    }
  }
}
</script>
