<template>
  <div>
    <SkuEditor ref="skuEditor" :skuSpec="skuSpec" :skuList="skuList"></SkuEditor>
    <Button @click="onButtonClicked">提交</Button>
  </div>
</template>
<script>
import SkuEditor from 'jspc/widgets/sku/SkuEditor'
import {SkuSpec, SkuPropSpec} from "jspc/widgets/sku/data/SkuSpec";
export default {
  components: {
    SkuEditor,
  },
  data() {
    let skuSpec = new SkuSpec()
    // debug code
    let prop = new SkuPropSpec()
    prop.name = '重量'
    prop.values = ['25kg', '15kg']
    skuSpec.propSpecs.push(prop)

    prop = new SkuPropSpec()
    prop.name = '颜色'
    prop.values = ["红色", "黄色", "绿色", "蓝色", "紫色"]
    skuSpec.propSpecs.push(prop)

    prop = new SkuPropSpec()
    prop.name = '规格1'
    prop.values = ["属性1", "属性2", "属性3"]
    skuSpec.propSpecs.push(prop)

    let spuInfo = {
      "spuBasic": {
        "spuid": 524,
        "cateid": 10110,
        "name": "香什秋田小町",
        "shortName": "小町",
        "producePlace": "东北德惠",
        "seller_companyid": 1
      },
      "skuList": [
        {
          "skuid": 524001,
          "spuid": 524,
          "averageCost": 0,
          "salePrice": 0,
          "sellCount": 0,
          "index": 0,
          "props": [
            {
              "value": "5kg",
              "name": "重量"
            },
            {
              "value": "红色",
              "name": "颜色"
            }
          ],
          "imgs": [
            "http://cdn.mi2c.com/skuimgs/rice.png"
          ],
          "canSellCount": 0,
          "is_active": false
        },
        {
          "skuid": 524002,
          "spuid": 524,
          "averageCost": 0,
          "salePrice": 0,
          "sellCount": 0,
          "index": 0,
          "props": [
            {
              "value": "25kg",
              "name": "重量"
            },
            {
              "value": "红色",
              "name": "颜色"
            }
          ],
          "imgs": [
            "http://cdn.mi2c.com/skuimgs/rice.png"
          ],
          "canSellCount": 0,
          "is_active": false
        },
        {
          "skuid": 524003,
          "spuid": 524,
          "averageCost": 4866,
          "salePrice": 5400,
          "sellCount": 0,
          "index": 0,
          "props": [
            {
              "value": "10L",
              "name": "容量"
            },
            {
              "value": "蓝色",
              "name": "颜色"
            }
          ],
          "imgs": [
            "http://cdn.mi2c.com/skuimgs/rice.png"
          ],
          "canSellCount": 433,
          "is_active": true
        },
        {
          "skuid": 524004,
          "spuid": 524,
          "averageCost": 12550,
          "salePrice": 13400,
          "sellCount": 0,
          "index": 0,
          "props": [
            {
              "value": "25kg",
              "name": "重量"
            },
            {
              "value": "蓝色",
              "name": "颜色"
            }
          ],
          "imgs": [
            "http://cdn.mi2c.com/skuimgs/rice.png"
          ],
          "canSellCount": 1145,
          "is_active": true
        }
      ]
    }

    return {
      skuSpec,
      spuInfo,
      skuList: spuInfo['skuList'],
    }
  },
  methods: {
    onButtonClicked() {
      let ret = this.$refs.skuEditor.validate()
      console.log('skuEditor validate ' + ret)
      if (ret) {
        let [skus, inactiveSkus] = this.$refs.skuEditor.getSkuList()
        let skuids = skus.map((sku) => { return sku.skuid })
        let inactiveSkuids = inactiveSkus.map((sku) => { return sku.skuid })
        console.log('skuids ' + skuids.join(', '))
        console.log(JSON.stringify(skus))
        console.log('-------------------')
        console.log('inactiveSkuids ' + inactiveSkuids.join(', '))
        console.log(JSON.stringify(inactiveSkus))
      }
    }
  }

}
</script>
