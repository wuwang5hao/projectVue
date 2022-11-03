<template>
  <div>
    <Table :columns="columns1" :data="data1" height="200" width="270" ref="table">
    </Table>
    <BindTable :pColumns="columns1" pWidth="270" :pData="footerData" ref="bindTable"></BindTable>
  </div>
</template>
<script>
import BindTable from "jspc/widgets/BindTable"
export default {
  name: 'TestBindTablePage',
  components: {BindTable},
  data () {
    return {
      columns1: [
        {
          title: 'Name',
          key: 'name',
          width: 100,
        },
        {
          title: 'Age',
          key: 'age',
          width: 100,
        },
        {
          title: 'Address',
          key: 'address',
          width: 100,
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ],
      footerData: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
      ]
    }
  },
  mounted() {
    this.$refs.bindTable.bindTable(this.$refs.table)
  }
}
</script>
