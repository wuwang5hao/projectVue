<template>
  <div>
    <FormExt
      ref="formExt"
      :pSpec="formSpec"
      :pFieldHolders="fieldHolders"
      :pInline="true"
    ></FormExt>
    <TableExt
      ref="tableExt"
      :pSpec="tableSpec"
      v-model="tableRecords"
    ></TableExt>
    <Row type="flex">
      <Col>
        <Row type="flex">
          <div ref="create_userid">!!空!!</div>
          <div ref="financeAcctCode">!!空!!</div>
          <div ref="financeAmount">!!空!!</div>
        </Row>
      </Col>
      <Col>
        <Row>
        合计重量：<span ref="allWeight">0</span>
        合计数量：<span ref="allCount">0</span>
        合计金额：<span ref="allAmount">0</span>
        </Row>
        <Row>
        本次应收：<span ref="shouldReceive">0</span>
        此前应收：<span ref="beforeShouldReceive">0</span>
        合计应收：<span ref="allShouldReceive">0</span>
        </Row>
      </Col>
    </Row>
    <Row>
      <Button @click="OnCostClicked">费用结算（运费等）</Button>
      <Button @click="OnRefOrderClicked">引用销售订单</Button>
      <Button @click="OnPrintClicked">打印</Button>
      <Button @click="OnStoreQueryClicked">库存查询</Button>
      <Button @click="OnSaveClicked">保存|退出</Button>
    </Row>
  </div>
</template>
<script>
import FormExt from "./FormExt";
import TableExt from './TableExt'
import {VueUtil} from 'jscom/utils/vueutil'
import CustomPopup from 'jspc/utils/CustomPopup'
import Expand from 'jscom/widgets/Expand'
import { BaseTableMoreInputField } from "jspc/rpc/shortcut/FieldExt"

class SkuidTableMoreInputField extends BaseTableMoreInputField {
  setRowValue(row, params) {
    this.setJsonValue(row['skuid'], params)
    if (!this.jsonModel) return
    this.jsonModel.img = row.img
    this.jsonModel.name = row.name
    this.jsonModel.shortName = row.shortName
    this.jsonModel.barcode = row.barcode
    this.jsonModel.producePlace = row.producePlace
    this.jsonModel.spec = row.spec
    this.jsonModel.brand = row.brand
    this.jsonModel.expirationDate = row.expirationDate
    this.jsonModel.unitName = row.unitName
    // TODO:
    this.jsonModel.price = row.price
  }
}

class CustomidTableMoreInputField extends BaseTableMoreInputField {
  constructor() {
    super(...arguments)
    this.initCustomName()
  }
  initCustomName() {
    if (this.jsonVal) {
      this.setShowValue(this.valueNameMap[this.jsonVal])
    }
  }
  setRowValue(row, params) {
    this.setJsonValue(row['customid'], params)
    this.setShowValue(row.name)
  }
}

const data = {
  "code": 0,
  "timestamp": 1552373582216,
  "message": "Success",
  "data": {
    "spec": {
      "formSpec": {
        "name": "StoreBillSpec_out_sell",
        "fields": [
          {
            "fieldSpec": {
              "name": "type",
              "title": "类型",
              "type": "str",
              "required": true,
              "widgetName": "InputWidget",
              "widgetJson": "{\"type\": \"text\"}"
            },
            "initialJson": ""
          },
          {
            "fieldSpec": {
              "name": "storeBillCode",
              "title": "单据编码",
              "type": "str",
              "required": true,
              "widgetName": "InputWidget",
              "widgetJson": "{\"type\": \"text\"}"
            },
            "initialJson": "\"\""
          },
          {
            "fieldSpec": {
              "name": "customid",
              "title": "客户",
              "type": "int",
              "required": true,
              "widgetName": "InputWidget",
              "widgetJson": "{\"type\": \"number\"}"
            },
            "initialJson": ""
          },
          {
            "fieldSpec": {
              "name": "storeid",
              "title": "仓库",
              "type": "int",
              "required": true,
              "widgetName": "ChoiceWidget",
              "widgetJson": "{\"type\": \"select\", \"choicesJson\": \"[1, 2]\"}"
            },
            "initialJson": ""
          },
          {
            "fieldSpec": {
              "name": "handle_userid",
              "title": "经手人",
              "type": "int",
              "required": true,
              "widgetName": "InputWidget",
              "widgetJson": "{\"type\": \"number\"}"
            },
            "initialJson": ""
          },
          {
            "fieldSpec": {
              "name": "summary",
              "title": "摘要",
              "type": "str",
              "required": true,
              "widgetName": "InputWidget",
              "widgetJson": "{\"type\": \"text\"}"
            },
            "initialJson": ""
          },
          {
            "fieldSpec": {
              "name": "note",
              "title": "备注",
              "type": "str",
              "required": true,
              "widgetName": "InputWidget",
              "widgetJson": "{\"type\": \"text\"}"
            },
            "initialJson": ""
          },
          {
            "fieldSpec": {
              "name": "create_userid",
              "title": "制单人",
              "type": "int",
              "required": true,
              "disabled": true,
              "widgetName": "InputWidget",
              "widgetJson": "{\"type\": \"number\"}"
            },
            "initialJson": "1"
          },
          {
            "fieldSpec": {
              "name": "financeAcctCode",
              "title": "科目/账户",
              "type": "str",
              "required": true,
              "widgetName": "InputWidget",
              "widgetJson": "{\"type\": \"text\"}"
            },
            "initialJson": ""
          },
          {
            "fieldSpec": {
              "name": "financeAmount",
              "title": "金额",
              "type": "int",
              "required": true,
              "widgetName": "InputWidget",
              "widgetJson": "{\"type\": \"number\"}"
            },
            "initialJson": ""
          }
        ],
        "valueNameMap": {
          "storeid": {
            "1": "仓库1",
            "2": "仓库2"
          }
        }
      },
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
            "minWidth": 100,
            "title": "仓库",
            "type": "int",
            "editable": true,
            "widgetName": "ChoiceWidget",
            "widgetJson": "{\"type\": \"select\", \"choicesJson\": \"[1, 2, 3, 4]\"}"
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
            "name": "spec",
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
            "field": "spec"
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
        "actions": [],
        "valueNameMap": {
          "storeid": {
            "1": "仓库1",
            "2": "仓库2",
            "3": "仓库3",
            "4": "仓库4"
          }
        }
      },
      "costTableSpec": {
        "fields": [
          {
            "name": "type",
            "title": "类型",
            "type": "str",
            "editable": true,
            "widgetName": "ChoiceWidget",
            "widgetJson": "{\"type\": \"select\", \"choicesJson\": \"[\\\"logistics\\\", \\\"other\\\"]\"}"
          },
          {
            "name": "customid",
            "title": "费用客户ID",
            "type": "int",
            "editable": true
          },
          {
            "name": "acctCode",
            "title": "付款科目编号",
            "type": "str",
            "editable": true
          },
          {
            "name": "shouldPayAmount",
            "title": "应付金额",
            "type": "int",
            "editable": true
          },
          {
            "name": "paidAmount",
            "title": "实付金额",
            "type": "int",
            "editable": true
          },
          {
            "name": "isShareCost",
            "title": "是否摊入成本",
            "type": "bool",
            "editable": true
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
        "actions": [],
        "valueNameMap": {
          "type": {
            "logistics": "物流费用",
            "other": "其他费用"
          }
        }
      }
    }
  },
  "status_code": 200
}

export default {
  name: 'TestFormExtPage',
  components: {FormExt, TableExt, Expand},
  data() {
    let result = {
      formSpec: data.data.spec.formSpec,
      tableSpec: data.data.spec.tableSpec,
      costTableSpec: data.data.spec.costTableSpec,
      fieldHolders: {},
      tableRecords: [],
      costTableRecords: [],
    }
    for (let field of result.tableSpec.fields) {
      if (field.name === 'skuid') {
        field.genWidget = this.genSkuidSelectWidget(field, result.tableSpec)
      }
    }
    for (let field of result.formSpec.fields) {
      if (field.fieldSpec.name === 'customid') {
        field.fieldSpec.genWidget = this.genCustomidSelectWidget(field, result.formSpec)
      }
    }
    return result
  },
  created() {
    this.vueUtil = new VueUtil(this.$router, this.$store)
  },
  mounted() {
    this.fieldHolders = {
      'create_userid': this.$refs.create_userid,
      'financeAcctCode': this.$refs.financeAcctCode,
      'financeAmount': this.$refs.financeAmount,
    }
  },
  methods: {
    genSkuidSelectWidget(fieldSpec, tableSpec) {
      return (parentWidget, ctx) => {
        let widget = new SkuidTableMoreInputField(parentWidget, fieldSpec,
          tableSpec.valueNameMap[fieldSpec.name], 'SkuSelect', this.$apiUtil.getTableApi())
        widget.setCtx(ctx)
        return widget
      }
    },
    genCustomidSelectWidget(ffSpec, formSpec) {
      return (parentWidget, ctx) => {
        let widget = new CustomidTableMoreInputField(parentWidget, ffSpec.fieldSpec,
          formSpec.valueNameMap[ffSpec.fieldSpec.name], 'Custom', this.$apiUtil.getTableApi())
        widget.setCtx(ctx)
        return widget
      }
    },
    OnCostClicked() {
      new CustomPopup().create({
        store: this.$store,
        render: (h, vm) => {
          return h(TableExt, {
            ref: 'tableExt',
            props: {
              pSpec: this.costTableSpec,
              pWidth: 760,
              value: this.costTableRecords,
            }
          })
        },
        popupProps: {
          width: 800,
          title: '费用结算',
        }
      }).$on('onClose', (instance, vm) => {
        let records = vm.$refs.tableExt.insideTableRecords
        console.log(records)
        this.costTableRecords = records
      })
    },
    OnRefOrderClicked() {
    },
    OnPrintClicked() {
    },
    OnStoreQueryClicked() {
    },
    OnSaveClicked() {
      console.log(this.$refs.formExt.formModel)
      console.log(this.$refs.tableExt.insideTableRecords)
      console.log(this.costTableRecords)
      this.$refs.formExt.validate().then((valid) => {
        console.log('formExt validate ' + valid)
        let formData = this.$refs.formExt.getFormDataJsonStr()
        console.log(formData)
      })
      console.log('tableExt isEditing ' + this.$refs.tableExt.isEditing)
    }
  }
}
</script>
