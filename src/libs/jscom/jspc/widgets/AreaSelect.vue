<template>
  <Cascader
  :data="areaTree"
  v-model="areaList"
  :placeholder='placeholder'
  :load-data="loadChildren"
  :change-on-select="pChangeOnSelect"
  @on-change='onChange'></Cascader>
</template>

<script>
import AreaData from 'jscom/widgets/AreaData'
class AreaItem {
  constructor (label, value) {
    this.value = value
    this.label = label
    this.children = []
  }
}

export default {
  name: 'AreaSelect',

  props: {
    placeholder: {
      type: String,
      default: '请选择省市区'
    },
    value: Array,
    codeListGetter: { type: Function, default: null },
    pChangeOnSelect: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      areaMap: {},
      areaTree: AreaData.initDistrictList,
      areaList: []
    }
  },

  created () {
    let areaList = []
    this.value && this.value.forEach((item) => {
      areaList.push(item.value)
    })
    this.areaList = areaList
  },

  methods: {
    loadChildren (item, callback) {
      item.isLoading = true
      for (let district of AreaData.districtList) {
        if (district.label === item.label) {
          item.children = district.children
          break
        }
      }
      item.isLoading = false
      callback()
    },
    queryAddressCode () {
      if (this.codeListGetter) {
        this.codeListGetter().then((codeList) => {
          this.updateAreaTree(codeList)
        })
      } else {
        this.updateAreaTree([])
      }
    },
    updateDistrictList (districtList) {
    // const districtList = {
    //   110000: '北京市',
    //   110100: '北京市',
    //   110101: '东城区'
    // }
      Object.keys(districtList).map((district) => {
        let areaItem = new AreaItem(districtList[district], district)
        if (this.areaMap[district]) {
          areaItem.children.concat(this.areaMap[district].children)
        }
        this.areaMap[district] = areaItem
        let parentCode = 0
        if (district % 10000 === 0) {
          this.areaTree.push(areaItem)
        } else if (district % 100 === 0) {
          parentCode = Math.floor(district / 10000) * 10000
        } else {
          parentCode = Math.floor(district / 100) * 100
        }
        if (parentCode > 0) {
          let parentItem = this.areaMap[parentCode]
          if (!parentItem) {
            parentItem = new AreaItem('', parentCode)
            this.areaMap[parentCode] = parentItem
          }
          parentItem.children.push(areaItem)
        }
      })
    },
    updateAreaTree (codeList) {
      // codeList = [
      //   { title: '北京市', code: 110000, type: 1 },
      //   { title: '北京市', code: 110100, type: 2 },
      //   { title: '东城区', code: 110101, type: 3 }
      // ]
      // 获取省，直辖市
      codeList.map((addressCode) => {
        // 获取省，直辖市
        let areaItem = new AreaItem(addressCode.title, addressCode.code)
        if (this.areaMap[addressCode.code]) {
          areaItem.children.concat(this.areaMap[addressCode.code].children)
        }
        this.areaMap[addressCode.code] = areaItem
        let parentCode = 0
        if (addressCode.code % 10000 === 0) {
          this.areaTree.push(areaItem)
        } else if (addressCode.code % 100 === 0) {
          parentCode = Math.floor(addressCode.code / 10000) * 10000
        } else {
          parentCode = Math.floor(addressCode.code / 100) * 100
        }
        if (parentCode > 0) {
          let parentItem = this.areaMap[parentCode]
          if (!parentItem) {
            parentItem = new AreaItem('', parentCode)
            this.areaMap[parentCode] = parentItem
          }
          parentItem.children.push(areaItem)
        }
      })
    },
    onChange (value, selectedData) {
      this.$emit('input', selectedData)
      this.$emit('on-change', selectedData)
    }
  }
}

</script>

<style lang='less'>

</style>
