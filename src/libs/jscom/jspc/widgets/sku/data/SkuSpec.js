export class SkuPropSpec {
  constructor() {
    this.name = ''
    this.values = []  // 可选名称
  }
  labelToValue(label) {
    return label
  }
  valueToLabel(value) {
    return value.toString()
  }
  getValue(prop) {
    return prop.value
  }
  setValue(prop, val) {
    prop.value = val.toString()
  }
}

export class SkuSpec {
  constructor() {
    this.propSpecs = []
  }
  getPropSpecByName(name) {
    for (let propSpec of this.propSpecs) {
      if (propSpec.name === name) {
        return propSpec
      }
    }
  }
}

export class Sku {
  constructor() {
    this.skuid = 0
    this.spuid = 0
    this.averageCost = 0  // 平均成本
    this.salePrice = 0  // 售价
    this.sellCount = 0  // 销量
    this.index = 0   // 排序序号
    this.weight = 0  // 重量kg float
    this.props = []  // sku 已选属性值
    // {
    //   "name": "重量",
    //   "value": "25kg"
    // },
    this.imgs = []  // sku 图片, string list
    this.storeCount = 0  // 库存
    this.is_active = true
  }
}

export class SkuProp {
  constructor() {
    this.value = ''
    this.name = ''
  }
}
