<template>
  <div>
    <Card>
      <TableExt
        ref="tables"
        :pSpec="spec"
        v-model="tableRecords"
        @on-delete="handleDelete"/>
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
      <Button style="margin: 10px 0;" @click="dumpTableRecords">dump数据</Button>
    </Card>
  </div></template>

<script>
import TableExt from './TableExt'
import Mock from 'mockjs'
const data = {
  "tableSpec": {
    "fields": [
      {
        "name": "id",
        "title": "ID",
        "type": "int",
        "minWidth": 50
      },
      {
        "name": "storeid",
        "title": "仓库",
        "type": "int",
        "editable": true
      },
      {
        "name": "skuid",
        "title": "SKU ID",
        "type": "int",
        "editable": true
      },
      {
        "name": "skuimg",
        "title": "商品图片",
        "type": "str",
        "width": 80
      },
      {
        "name": "name",
        "title": "商品名称",
        "type": "str",
        "fixed": "left"
      },
      {
        "name": "shortName",
        "title": "商品简名",
        "type": "str"
      },
      {
        "name": "barcode",
        "title": "EAN条形码",
        "type": "str"
      },
      {
        "name": "producePlace",
        "title": "产地",
        "type": "str"
      },
      {
        "name": "propSpec",
        "title": "属性规格",
        "type": "str"
      },
      {
        "name": "brand",
        "title": "品牌",
        "type": "str"
      },
      {
        "name": "productionDate",
        "title": "生产日期",
        "type": "datetime"
      },
      {
        "name": "expirationDate",
        "title": "保质期",
        "type": "int"
      },
      {
        "name": "batchCode",
        "title": "批次号",
        "type": "str",
        "editable": true
      },
      {
        "name": "unitName",
        "title": "单位名称",
        "type": "str",
        "ellipsis": true
      },
      {
        "name": "count",
        "title": "数量",
        "type": "int",
        "editable": true
      },
      {
        "name": "price",
        "title": "单价",
        "type": "int",
        "editable": true
      },
      {
        "name": "shareCost",
        "title": "分摊成本",
        "type": "int",
        "editable": true
      },
      {
        "name": "note",
        "title": "备注",
        "type": "str",
        "minWidth": 200,
        "maxWidth": 400,
        "editable": true
      }
    ],
    "filters": [],
    "searches": [
      {
        "field": "storeid"
      },
      {
        "field": "skuid"
      },
      {
        "field": "skuimg"
      },
      {
        "field": "name"
      },
      {
        "field": "shortName"
      },
      {
        "field": "barcode"
      },
      {
        "field": "producePlace"
      },
      {
        "field": "propSpec"
      },
      {
        "field": "brand"
      },
      {
        "field": "expirationDate"
      },
      {
        "field": "batchCode"
      },
      {
        "field": "unitName"
      },
      {
        "field": "count"
      },
      {
        "field": "price"
      },
      {
        "field": "shareCost"
      },
      {
        "field": "note"
      }
    ],
    "orderbys": [],
    "actions": []
  }
}
export default {
  name: 'TestTableExtPage',
  components: {
    TableExt,
  },
  data () {
    return {
      spec: data.tableSpec,
      tableRecords: [],
    }
  },
  methods: {
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    dumpTableRecords() {
      let content = this.$refs.tables.insideTableRecords.map((item) => {return `<p>${JSON.stringify(item)}</p>`}).join('')
      this.$Modal.confirm({
        title: 'Title',
        content: content,
        okText: 'OK',
        cancelText: 'Cancel'
      });
    }
  },
  mounted () {
    this.tableRecords = []
    for (let idx=0; idx < 5; idx++) {
      this.tableRecords.push(
        Mock.mock({
          id: '@id',
          companyid: '@natural(1, 100)',
          storeid: '@natural',
          skuid: '@integer',
          skuimg: '@image',
          name: '@name',
          shortName: '@name',
          barcode: '@word',
          producePlace: '@word',
          propSpec: '@word',
          brand: '@word',
          productionDate: '@date',
          expirationDate: '@date',
          batchCode: '@string',
          unitName: '@string',
          count: '@integer',
          price: '@float',
          shareCost: '@float',
          note: '@sentence',
        })
      )
    }
  }
}
</script>

<style>

</style>
