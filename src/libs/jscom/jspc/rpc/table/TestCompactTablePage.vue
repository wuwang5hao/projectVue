<template>
  <!--<BaseCompactTable ref="table" pSpecName="TestMoreFiltersTable" :pApi="tableApi" pTitle="测试紧凑排列"></BaseCompactTable>-->
  <BaseCompactTable ref="table" pSpecName="Sku" :pApi="tableApi" pTitle="测试紧凑排列"></BaseCompactTable>
</template>
<script>
import BaseCompactTable from './BaseCompactTable'
export default {
  name: 'TestCompactTablePage',
  components: {BaseCompactTable},
  data() {
    return { tableApi: this.$apiUtil.getTableApi() }
  },
  mounted() {
    this.$refs.table.initTableSpec()
  }
}
</script>
