<template>
  <Table :columns="pColumns" :show-header="false" :width="pWidth" :data="pData" ref="bindTable"></Table>
</template>
<script>
export default {
  name: 'BindTable',
  props: {
    pColumns: { type: Array },
    pWidth: { type: [String, Number] },
    pData: Array,
  },
  mounted() {
    this.$refs.bindTable.$refs.body.style.overflow = 'hidden'
  },
  methods: {
    bindTable(table) {
      let elem = table.$el.getElementsByClassName('ivu-table-body')[0]
      elem.addEventListener("scroll", (event) => {
        this.$refs.bindTable.$refs.body.scrollLeft = event.target.scrollLeft
      })
    }
  }
}
</script>
