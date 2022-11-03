<template>
  <div>
    <Button @click="OnTest">测试</Button>
  </div>
</template>
<script>
import CustomPopup from "jspc/utils/CustomPopup";
import TableExt from './TableExt'

export default {
  name: 'TestTableExtPopupPage',
  data() {
    return {
      "costTableSpec": {
        "fields": [
          {
            "name": "type",
            "title": "类型",
            "type": "str"
          },
          {
            "name": "customid",
            "title": "费用客户ID",
            "type": "int"
          },
          {
            "name": "acctCode",
            "title": "付款科目编号",
            "type": "str"
          },
          {
            "name": "shouldPayAmount",
            "title": "应付金额",
            "type": "int"
          },
          {
            "name": "paidAmount",
            "title": "实付金额",
            "type": "int"
          },
          {
            "name": "isShareCost",
            "title": "是否摊入成本",
            "type": "bool"
          }
        ],
        "filters": [],
        "searches": [
          {
            "field": "type"
          },
          {
            "field": "customid"
          },
          {
            "field": "acctCode"
          },
          {
            "field": "shouldPayAmount"
          },
          {
            "field": "paidAmount"
          }
        ],
        "orderbys": [],
        "actions": []
      }
    }
  },
  methods: {
    OnTest() {
      new CustomPopup('modal').create({
        store: this.$store,
        render: (h, vm) => {
          return h(TableExt, {
            props: {
              pSpec: this.costTableSpec,
              pWidth: 760,
            }
          })
        },
        popupProps: {
          width: 800,
        }
      })
    }
  },
}
</script>
