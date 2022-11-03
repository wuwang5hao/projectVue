<template>
  <div>
    <div v-for="index in propCount" :key="index">
      <SkuPropWidget @on-change="OnSkuPropChanged" :skuSpec="skuSpec" :validator="_self"
                     ref="propWidgets"></SkuPropWidget>
    </div>
    <div class="footer">
      <Button @click="addProp()">添加规格属性</Button>
    </div>
    <div>
      <span>Sku 明细</span>
      <Table @on-select-cancel="_onTableSelectCancel"
             @on-select="_onTableSelect"
             @on-select-all='_onTableSelectAll'
             @on-selection-change='_onTableSelectAllCancel'
             :columns="skuColumns" :data="skuData"></Table>
    </div>
  </div>
</template>
<script>
import SkuPropWidget from './SkuPropWidget'
import { mapUtil } from 'jscom/utils/maputil'
import { arrUtil } from 'jscom/utils/arrutil'
import { objUtil } from 'jscom/utils/objutil'
import {Sku, SkuProp} from './data/SkuSpec'
import { strUtil } from 'jscom/utils/strutil'

class PropWrapper {
  constructor(propSpec, prop) {
    this.propSpec = propSpec
    this.prop = prop
    this.value = propSpec.getValue(prop).toString()
    this.label = propSpec.valueToLabel(this.value)
    this.name = propSpec.name
  }
}
class SkuWrapper {
  constructor(sku, skuSpec) {
    this.sku = sku
    this.propWrappers = []
    for (let prop of sku.props) {
      let propSpec = skuSpec.getPropSpecByName(prop.name)
      if (!propSpec) continue  // 无效属性，滤掉
      this.propWrappers.push(new PropWrapper(propSpec, prop))
    }
  }
  matchRow(rowDict) {
    let result = 0
    for (let propWrapper of this.propWrappers) {
      if (propWrapper.name in rowDict && rowDict[propWrapper.name] === propWrapper.label) {
        result += 5
      }
    }
    if (this.sku.is_active) {
      // 有效 sku 有更高分数
      result += 1
    }
    return result
  }
  updateRow(rowDict) {
    rowDict['skuid'] = this.sku.skuid
    rowDict['salePrice'] = this.sku.salePrice
    rowDict['averageCost'] = this.sku.averageCost
    rowDict['basePrice'] = this.sku.basePrice
    rowDict['sellCount'] = this.sku.sellCount
    // rowDict['canSellCount'] = this.sku.canSellCount
    rowDict['skuCode'] = this.sku.skuCode
    rowDict['barcode'] = this.sku.barcode
    rowDict['weight'] = this.sku.weight
    // rowDict['origPrice'] = 0  // TODO: add in database
    if (this.sku.imgs.length > 0) {
      rowDict['img'] = this.sku.imgs[0]
    }
  }
}

export default {
  components: {
    SkuPropWidget
  },
  props: {
    skuSpec: {type: Object, default: null},
    maxPropCount: {type: Number, default: 3},
    skuList: {
      type: Array, default() { return [] }
    }
  },
  data() {
    return {
      propCount: 0,
      skuColumns: [],
      skuData: [],
      skuDataCopy: [],
      skuWrappers: [],
      globalRowScore: [],  // 保存用户选择 row 的 score [[rowidx, skuid, score], ...]
    }
  },
  computed: {
  },
  watch: {
    skuSpec(skuSpec) {
      this.initSpec()
    }
  },
  created() {
    if (this.skuSpec) {
      this.initSpec()
    }
  },
  methods: {
    initSpec() {
      for (let sku of this.skuList) {
        this.skuWrappers.push(new SkuWrapper(sku, this.skuSpec))
      }
      this.genPropMatrix()
      this.regenSkuColumns()
      this.regenSkuData()
    },
    filterMethod(value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
    onPropBlur(prop) {
    },
    onPropSearch(prop) {
      console.log(prop)
    },
    addProp() {
      if (this.propCount >= this.maxPropCount) {
        this.$Message.warning('限制属性数量 ' + this.maxPropCount)
      } else {
        this.propCount += 1
        console.log(this.$refs.propWidgets)
      }
    },
    validateSelectSpec(spec) {
      for (let propWidget of this.$refs.propWidgets) {
        let spec0 = propWidget.selectedSpec
        if (!spec0) continue
        if (spec0.name === spec.name) {
          this.$Message.warning('不能重复添加规格 ' + spec.name)
          return false
        }
      }
      return true
    },
    OnSkuPropChanged() {
      this.globalRowScore = []
      this.regenSkuColumns()
      this.regenSkuData()
    },
    _setSkuValue(skuid, colName, value) {
      skuid = parseInt(skuid)
      for (let skuWrap of this.skuWrappers) {
        if (skuWrap.sku.skuid === skuid) {
          skuWrap.sku[colName] = value
          console.log('set '+colName +' value ' +value)
        }
      }
    },
    renderRow(colName, isEdit=true, isNumber=true) {
      return (h, params) => {
        if (isEdit) {
          return h('Input', {
            attrs: {
              value: params.row[colName],
              disabled: !this.skuDataCopy[params.row.index]._checked,
            },
            class: this.skuDataCopy[params.row.index][colName+'_hasError'] ? 'cellError': '',
            on: {
              input: (event) => {
                let val = event
                if (isNumber) {
                  val = parseFloat(val)
                  if (isNaN(val)) val = 0
                }
                this._setSkuValue(params.row['skuid'], colName, val)
                this.skuDataCopy[params.row.index][colName] = val
              }
            }
          })
        } else {
          return h('span', params.row[colName])
        }
      }
    },
    _optionRender (h, params, key, name) {
      return h('Option', {
        props: {
          value: key
        }
      }, name)
    },
    _createSkuidOptionsRender(h, params) {
      let options = []
      for (let skuWrapper of this.skuWrappers) {
        let skuid = skuWrapper.sku.skuid
        options.push(this._optionRender(h, params, skuid, skuid))
      }
      return options
    },
    regenSkuColumns() {
      this.skuColumns = [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: 'SKU ID',
          key: 'skuid',
          width: 120,
          render: (h, params) => {
            let ret = h('Select', {
              attrs: {
                disabled: !this.skuDataCopy[params.row.index]._checked
              },
              props: {
                value: params.row.skuid,
                clearable: true,
                // NOTE: dirty code, do not use skuDataCopy, fix skuid select can not rerender
                label: this.skuData[params.row.index]._checked ? '新增' : '无效',
              },
              on: {
                'on-change': (value) => {
                  this._onSkuidSelectChange(h, params, value)
                },
              }
            }, this._createSkuidOptionsRender(h, params))
            return ret
          }
        },
        {
          title: '售价',
          key: 'salePrice',
          render: this.renderRow('salePrice'),
          renderHeader: (h, params) => {
            return h('span', {
            }, [h('span', {class: 'text-danger'}, '*'), ' 售价'])
          }
        },
        {
          title: '销售基准价',
          key: 'basePrice',
          render: this.renderRow('basePrice'),
          renderHeader: (h, params) => {
            return h('span', {
            }, [h('span', {class: 'text-danger'}, '*'), ' 销售基准价'])
          }
        },
        // {
        //   title: '可销售库存',
        //   key: 'canSellCount',
        //   render: this.renderRow('canSellCount'),
        //   renderHeader: (h, params) => {
        //     return h('span', {
        //     }, ['库存'])
        //   }
        // },
        {
          title: '规格编码',
          key: 'skuCode',
          render: this.renderRow('skuCode', true, false)
        },
        {
          title: 'EAN条形码',
          key: 'barcode',
          render: this.renderRow('barcode', true, false)
        },
        // {
        //   title: '划线价',
        //   key: 'origPrice',
        //   render: this.renderRow('origPrice')
        // },
        {
          title: '成本价',
          key: 'averageCost',
          render: this.renderRow('averageCost')
        },
        {
          title: '重量kg',
          key: 'weight',
          render: this.renderRow('weight'),
          renderHeader: (h, params) => {
            return h('span', {
            }, [h('span', {class: 'text-danger'}, '*'), ' 重量kg'])
          }
        },
        {
          title: '销量',
          key: 'sellCount',
        },
      ]
      if (this.$refs.propWidgets) {
        for (let widget of this.$refs.propWidgets.slice().reverse()) {
          if (!widget.selectedSpec) continue
          if (widget.selectedValues.length <= 0) continue
          let colName = widget.selectedSpec.name
          this.skuColumns.unshift(
            {
              title: colName,
              key: colName,
              render: (h, params) => {
                return h('span',
                  {
                    attrs: {
                      class: this.skuDataCopy[params.row.index]._checked ? 'cellChecked' : 'cellUnchecked',
                    }
                  },
                  params.row[colName])
              }
            }
          )
        }
      }
    },
    _onSkuidSelectChange(h, params, value) {
      this.globalRowScore = this.globalRowScore.filter((item) => {
        return item[0] !== params.row.index
      })
      if (value) {
        this.globalRowScore.push([params.row.index, value, 999])
      } else {
        this.globalRowScore.push([params.row.index, value, 1000])
      }
      this.regenSkuData()
    },
    regenSkuData() {
      if (!this.$refs.propWidgets) {
        this.skuData = []
        return
      }
      let skuData = []
      this.permutation(this.$refs.propWidgets.filter((widget) => {
        return widget.selectedValues.length > 0
      }), skuData)
      let index = 0
      for (let row of skuData) {
        row.index = index
        index += 1
        row.salePrice_hasError = false
        row.basePrice_hasError = false
        row.weight_hasError = false
      }
      let scoreMap = new Map()
      this._calcRowSkuScore(scoreMap, skuData)
      this._dumpScoreMap(scoreMap)
      this._updateRowByScoreMap(scoreMap, skuData)
      for (let row of skuData) {
        if (row['skuid']) {
          let skuid = parseInt(row['skuid'])
          let skuWrapper = this.skuWrappers.find((skuWrapper) => { return skuWrapper.sku.skuid === skuid })
          if (!skuWrapper || !skuWrapper.sku.is_active) {
            // unexpected
            row['_checked'] = false
          } else {
            row['_checked'] = true
          }
        } else {
          row['_checked'] = false
        }
      }
      this.skuDataCopy = JSON.parse(JSON.stringify(skuData))
      this.skuData = skuData
    },
    _dumpScoreMap(scoreMap) {
      for (let [skuWrapper, items] of scoreMap.entries()) {
        for (let [skuMatchScore, row] of items) {
          console.log('skuid ' + skuWrapper.sku.skuid + ' score ' + skuMatchScore + ' row ' + row.index)
        }
      }
    },
    _calcRowSkuScore(scoreMap, skuData) {
      for (let row of skuData) {
        for (let skuWrapper of this.skuWrappers) {
          let skuMatchScore = skuWrapper.matchRow(row)
          if (skuMatchScore <= 0) continue
          mapUtil.setdefault(scoreMap, skuWrapper, []).push([skuMatchScore, row])
        }
      }
      for (let [rowidx, skuid, score] of this.globalRowScore) {
        let row = skuData.find((elem) => { return elem.index === rowidx })
        if (!skuid) {  // 这一行被用户取消绑定
          row.unbind = true
          continue
        }
        let skuWrapper = this.skuWrappers.find((elem) => { return elem.sku.skuid === skuid })
        if (!row||!skuWrapper) continue
        mapUtil.setdefault(scoreMap, skuWrapper, []).push([score, row])
      }
    },
    _updateRowByScoreMap(scoreMap, skuData) {
      let rowScoreMap = new Map()
      for (let [skuWrapper, items] of scoreMap.entries()) {
        let [score, row] = arrUtil.max(items, (item) => { return item[0] })
        console.log('max score ' + score + ' row ' + row.index)
        if (!rowScoreMap.has(row)) {
          rowScoreMap.set(row, [score, skuWrapper])
        } else {
          let score0 = rowScoreMap.get(row)[0]
          if (score > score0) {
            rowScoreMap.set(row, [score, skuWrapper])
          }
        }
      }
      for (let [row, item] of rowScoreMap.entries()) {
        let [score, skuWrapper] = item
        if (row.unbind) continue
        skuWrapper.updateRow(row)
        console.log('got score ' + score + ' skuid ' + skuWrapper.sku.skuid)
      }
    },
    permutation(widgets, result) {
      if (widgets.length <= 0) return
      let widget = widgets[0]
      // level 0
      for (let value of widget.selectedValues) {
        let dict = {
          [widget.selectedSpec.name]: widget.selectedSpec.valueToLabel(value)
        }
        this.recursivePermutation(dict, 1, widgets, result)
      }
    },
    recursivePermutation(dict, level, widgets, result) {
      if (level >= widgets.length) {
        result.push(dict)
        return
      }
      let widget = widgets[level]
      for (let value of widget.selectedValues) {
        let newDict = Object.assign({}, dict)
        newDict[widget.selectedSpec.name] = widget.selectedSpec.valueToLabel(value)
        this.recursivePermutation(newDict, level + 1, widgets, result)
      }
    },
    genPropMatrix() {
      // if (this.skuList.length <= 0) return
      let propSpecs = []
      let propSpecValuesMap = new Map()
      for (let sku of this.skuList) {
        if (!sku.is_active) continue
        for (let prop of sku.props) {
          let propSpec = this.skuSpec.getPropSpecByName(prop.name)
          if (!propSpec) continue  // 无效属性，滤掉
          if (!propSpecValuesMap.has(propSpec)) {
            propSpecs.push(propSpec)
          }
          let values = mapUtil.setdefault(propSpecValuesMap, propSpec, new Set())
          values.add(propSpec.getValue(prop))
        }
      }
      this.propCount = propSpecs.length
      this.$nextTick(() => {
        if (this.$refs.propWidgets) {
          console.log(this.$refs.propWidgets)
          for (const [widget, propSpec] of arrUtil.zip(this.$refs.propWidgets, propSpecs)) {
            widget.setSpec(propSpec)
            widget.setValues(Array.from(mapUtil.get(propSpecValuesMap, propSpec, new Set())))
          }
          this.OnSkuPropChanged()
        }
      })
    },
    _onTableSelectCancel(selection, row) {
      this.skuDataCopy[row.index]._checked = false
      // NOTE: dirty code, fix skuid select can not rerender
      this.skuData[row.index]._checked = false
    },
    _onTableSelect(selection, row) {
      this.skuDataCopy[row.index]._checked = true
      // NOTE: dirty code, fix skuid select can not rerender
      this.skuData[row.index]._checked = true
    },
    _onTableSelectAll (selection) {
      let length = this.skuDataCopy.length
      for (let index = 0; index < length; index++) {
        this.skuDataCopy[index]._checked = true
        // NOTE: dirty code, fix skuid select can not rerender
        this.skuData[index]._checked = true
      }
    },
    // 由于all cancel没有消息出来，暂时用change替代
    _onTableSelectAllCancel (selection) {
      if (selection.length > 0) {
        return
      }
      let length = this.skuDataCopy.length
      for (let index = 0; index < length; index++) {
        this.skuDataCopy[index]._checked = false
        // NOTE: dirty code, fix skuid select can not rerender
        this.skuData[index]._checked = false
      }
    },
    validate() {
      // PUBLIC_API
      // @brief: 校验数据
      let error = 0
      for (let row of this.skuDataCopy) {
        if (!row._checked) continue
        if (!row['salePrice']) {
          row['salePrice_hasError'] = true
          error += 1
        } else {
          row['salePrice_hasError'] = false
        }
        if (!row['basePrice']) {
          row['basePrice_hasError'] = true
          error += 1
        } else {
          row['basePrice_hasError'] = false
        }
        // if (!row['canSellCount']) {
        //   row['canSellCount_hasError'] = true
        //   error += 1
        // } else {
        //   row['canSellCount_hasError'] = false
        // }
        if (row['weight'] === 0.0) {
          row['weight_hasError'] = true
          error += 1
        } else {
          row['weight_hasError'] = false
        }
      }
      return error === 0
    },
    getSkuList() {
      // PUBLIC_API
      // @brief: 获取所有 sku 列表，包括有skuid（修改/未改变/设置无效），无skuid（新增）
      let result = []
      let index = 0

      for (let row of this.skuDataCopy) {
        if (!row._checked) continue
        if (!row.skuid) {
          // 新增
          let sku = new Sku()
          sku.skuid = 0
          sku.spuid = 0
          sku.averageCost = strUtil.safeFloat(row.averageCost) // 平均成本
          sku.salePrice = strUtil.safeFloat(row.salePrice)  // 售价
          sku.basePrice = strUtil.safeFloat(row.basePrice) // 销售基准价
          sku.sellCount = strUtil.safeInt(row.sellCount)  // 销量
          sku.index = strUtil.safeInt(index)  // 排序序号
          index += 1
          sku.props = this._getPropsByRow(row)  // sku 已选属性值
          sku.imgs = []  // sku 图片, string list
          // sku.canSellCount = strUtil.safeInt(row.canSellCount)  // 库存
          sku.is_active = true
          sku.skuCode = strUtil.safeStr(row.skuCode)
          sku.barcode = strUtil.safeStr(row.barcode)
          sku.weight = strUtil.safeFloat(row.weight)
          result.push(sku)
        } else {
          let skuid = strUtil.safeInt(row.skuid)
          let skuWrapper = this.skuWrappers.find((skuWrapper) => {
            return skuid === skuWrapper.sku.skuid
          })
          if (!skuWrapper) continue // unexpected
          // 修改/未改变
          let sku = new Sku()
          sku.skuid = strUtil.safeInt(skuWrapper.sku.skuid)
          sku.spuid = strUtil.safeInt(skuWrapper.sku.spuid)
          sku.averageCost = strUtil.safeFloat(row.averageCost)  // 平均成本
          sku.salePrice = strUtil.safeFloat(row.salePrice)  // 售价
          sku.basePrice = strUtil.safeFloat(row.basePrice) // 销售基准价
          sku.sellCount = strUtil.safeInt(row.sellCount)  // 销量
          sku.index = strUtil.safeInt(index)  // 排序序号
          index += 1
          sku.props = this._getPropsByRow(row)  // sku 已选属性值
          sku.imgs = []  // sku 图片, string list
          sku.canSellCount = strUtil.safeInt(row.canSellCount)  // 库存
          sku.is_active = true
          sku.skuCode = strUtil.safeStr(row.skuCode)
          sku.barcode = strUtil.safeStr(row.barcode)
          sku.weight = strUtil.safeFloat(row.weight)
          result.push(sku)
        }
      }

      let inactiveSkus = []
      for (let skuWrapper of this.skuWrappers) {
        let skuid = skuWrapper.sku.skuid
        if (result.filter((sku) => { return sku.skuid === skuid }).length <= 0) {
          // 设置无效
          let sku = objUtil.clone(skuWrapper.sku)
          sku.is_active = false
          inactiveSkus.push(sku)
        }
      }
      return [result, inactiveSkus]
    },
    _getPropsByRow(row) {
      let props = []
      for (let propWidget of this.$refs.propWidgets) {
        let spec = propWidget.selectedSpec
        if (!spec) continue
        let prop = new SkuProp()
        prop.name = spec.name
        let val = spec.labelToValue(row[spec.name])
        spec.setValue(prop, val)
        props.push(prop)
      }
      return props
    }
  },
}
</script>

<style>
  .cellChecked {
  }
  .cellUnchecked {
    color: #c9c9c9;
  }
  .cellError .ivu-input {
    border: 1px solid #ed4014;
  }
</style>
