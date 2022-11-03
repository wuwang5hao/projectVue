<template>
  <div class='ss-container'>
    <Input
      class='ss-input' v-model='innerValue.text'
      :placeholder='pPlaceholder'
      @on-change="onInputChanged"
      @on-enter='onEnterKey'
      :style="{width: inputWidth}"
    >
      <Select
        class='ss-input-select'
        v-model='innerValue.type'
        slot='prepend'
        @on-change="onSelectChanged"
        :style="{width: selectWidth}">
        <Option
          v-for='searchType in pSearchTypeArr'
          :value='searchType.key'
          :key='searchType.key'
        >{{ searchType.value }}</Option>
      </Select>
      <Button v-if="pShowSearchButton" slot='append' icon='ios-search' @click='onClickSearch'></Button>
    </Input>
  </div>
</template>

<script>
export default {
  name: 'SelectSearch',

  props: {
    pSearchTypeArr: {
      type: Array,
      default: () => {
        return []
      }
    },
    pPlaceholder: String,
    pInputWidth: { type: Number, default: 320 },
    pSelectMinWidth: { type: Number, default: 70 },
    pSelectMaxWidth: { type: Number, default: 100 },
    pShowSearchButton: { type: Boolean, default: false },
    value: { type: Object, default() { return {type: '', text: ''} } },
  },

  data () {
    return {
      innerValue: Object.assign({}, this.value),
      selectWidth: this.pSelectMinWidth + 'px',
      inputWidth: this.pInputWidth + 'px',
    }
  },

  created() {
    this.updateSelectWidth(this.pSearchTypeArr)
  },

  watch: {
    pSearchTypeArr(arr) {
      this.updateSelectWidth(arr)
    },
    pInputWidth(width) {
      this.inputWidth = width + 'px'
    },
    value(value) {
      this.innerValue = Object.assign({}, this.value)
    }
  },

  methods: {
    updateSelectWidth(searchTypeArr) {
      let len = 0
      for (let item of searchTypeArr) {
        if (item.value.length > len) {
          len = item.value.length
        }
      }
      len *= 15  // one word with 15px
      if (len < this.pSelectMinWidth) {
        len = this.pSelectMinWidth
      }
      if (len > this.pSelectMaxWidth) {
        len = this.pSelectMaxWidth
      }
      this.selectWidth = len + 'px'
    },
    onEnterKey () {
      this.search()
    },
    onClickSearch () {
      this.search()
    },
    onInputChanged(event) {
      this.$emit('on-change', event, this.innerValue)
      this.$emit('input', this.innerValue)
    },
    onSelectChanged(value) {
      this.$emit('on-change', event, this.innerValue)
      this.$emit('input', this.innerValue)
    },
    search () {
      this.$emit('on-search', this.innerValue)
    }
  }
}
</script>

<style lang='less'>
@import 'jspc/styles/common.less';
.ss-container {
  .ss-input {
    .ss-input-select {
      display: inline-block;
    }
  }
}
</style>
