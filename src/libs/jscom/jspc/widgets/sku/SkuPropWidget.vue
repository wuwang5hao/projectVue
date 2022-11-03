<template>
  <div>
    <span>规格名：</span>
    <Select style="width:100px" filterable clearable
      ref="specSelect"
      :remoteMethod="onSpecRemoteMethod"
      @on-change="onSelectChanged"
      @on-clear="onSpecClear"
      :value="selectedSpecLabel"
      placeholder="请输入"
    >
      <Option v-for="(propSpec, index) in propSpecs" :value="propSpec.name"
        :label="propSpec.name" :key="index"></Option>
    </Select>
    <br/>
    <span>规格值：</span>
    <div class="d-inline" v-if="selectedSpec">
      <Tag v-for="value in selectedValues" :key="value" :name="value" closable
           @on-close="onCloseProp">{{ selectedSpec.valueToLabel(value) }}</Tag>

      <AutoComplete
        ref="input"
        v-model="inputValue"
        :data="curValidLabels"
        @on-search="onSearch"
        placeholder="请输入"
        style="width:200px"></AutoComplete>
      <Button :size="'small'" type="default" @click="onAddClicked">添加</Button>
    </div>
  </div>
</template>
<script>
import {SkuPropSpec} from './data/SkuSpec'
export default {
  props: {
    validator: {type: Object, default: null},
    skuSpec: {type: Object, default: null},
  },
  computed: {
    propSpecs() {
      let result = [...this.skuSpec.propSpecs]
      if (this.customPropSpec) {
        result.push(this.customPropSpec)
      }
      return result
    },
    curValidLabels() {
      if (this.selectedSpec == null) {
        return []
      }
      let result = []
      for (let value of this.options) {
        result.push(this.selectedSpec.valueToLabel(value))
      }
      return result
    },
    selectedSpecLabel() {
      if (!this.selectedSpec) return ''
      else return this.selectedSpec.name
    }
  },
  data() {
    return {
      customPropSpec: null,
      inputValue: '',
      options: [],
      validValues: [],
      selectedSpec: null,
      selectedValues: [],
    }
  },
  methods: {
    reset() {
      this.selectedSpec = null
      this.validValues = []
      this.options = []
      this.selectedValues = []
    },
    onSelectChanged(value) {
      console.log('onChange-> '+value)
      if (!value) return
      let spec = this.propSpecs.find((spec) => { return spec.name === value })
      if (this.validator && !this.validator.validateSelectSpec(spec)) {
        this.$refs.specSelect.clearSingleSelect()
        return
      }
      this.setSpec(spec)
      this.selectedValues = []
      this.$emit('on-change')
    },
    onSpecRemoteMethod(query) {
      console.log('remoteMethod ' + query)
      if (this.skuSpec.propSpecs.find((spec) => { return spec.name === query })) {
        this.customPropSpec = null
      } else {
        this.customPropSpec = new SkuPropSpec()
        this.customPropSpec.name = query
      }
    },
    onSpecClear() {
      this.reset()
      this.$emit('on-change')
    },
    onAddClicked() {
      if (!this.selectedSpec) return
      let value = this.selectedSpec.labelToValue(this.inputValue)
      if (!value && isNaN(value)) {
        this.$Message.warning('无效值 ' + this.inputValue)
        return
      }
      if (this.selectedValues.filter((v) => { return v === value }).length) {
        this.$Message.warning('不能重复添加 ' + this.inputValue)
        return
      }

      this.selectedValues.push(value)
      this.setValues(this.selectedValues)
      this.inputValue = ''
      this.$refs.input.$refs.input.blur()

      this.$emit('on-change')
    },
    onSearch(label) {
      if (label && label.length > 0) {
        this.options = [ this.selectedSpec.labelToValue(label) ]
      } else {
        this.options = this.validValues
      }
    },
    onCloseProp(event, value) {
      this.setValues(this.selectedValues.filter((v) => { return v !== value }))
      this.$emit('on-change')
    },
    setSpec(spec) {
      this.selectedSpec = spec
      this.validValues = spec.values.slice();
      this.options = this.validValues
    },
    setValues(values) {
      this.selectedValues = values
      values = Array.from(values, (value) => { return value.toString() })
      this.validValues= this.selectedSpec.values.slice()
      this.validValues = this.validValues.filter((v) => { return values.indexOf(v) < 0 })
      this.options = this.validValues
    }
  }
}
</script>
