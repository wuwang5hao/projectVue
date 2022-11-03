<template>
  <div class="lta-container">
    <AInput v-model="textValue" type="textarea"
      @on-change="onChange"
      @keyup="onKeyup"
      :rows="pRows"
      :maxLength="pLimit">
    </AInput>
    <span v-if="isShowLimit" class="lta-hint">{{length}}/{{pLimit}}</span>
  </div>
</template>

<script>
export default {
  name: 'LimitTextArea',

  props: {
    value: [String, Number],
    pLimit: Number,
    pIsShowLimit: {
      type: Boolean,
      default: true
    },
    pRows: {
      type: Number,
      default: 2
    }
  },

  watch: {
    textValue (val) {
      this.$emit('input', val)
    }
  },

  data () {
    return {
      textValue: this.value,
      length: 0,
      isShowLimit: this.pIsShowLimit
    }
  },

  mounted() {
    this.updateLimit(this.value)
  },

  methods: {
    onChange (event) {

    },
    onKeyup (event) {
      this.updateLimit(event.target.value)
    },
    updateLimit (value) {
      let textVal = value
      let lengthMax = this.pLimit
      let length = this.pLimit - textVal.length
      if (length < 0) {
        length = 0
      }
      if (textVal.length >= lengthMax) {
        this.textValue = textVal.substring(0, lengthMax)
      }
      this.length = this.textValue.length
    }
  }
}
</script>

<style lang="less">
@import 'variables.less';
.lta-container {
  position: relative;
  background-color: #FCFCFD;
  padding-bottom: 15px;
  display: inline-block;
  border: 1px solid #EEF0F2;
  textarea {
    resize: none;
    background-color: #FCFCFD;
    border: 0px;
    box-shadow: 0px 0px 0px 0px;
  }
  textarea:focus {
    box-shadow: 0px 0px 0px 0px;
    border: 0px;
  }
  .lta-hint {
    position: absolute;
    right: 5px;
    bottom: 0px;
    font-size: @font-size-small;
    color: #B7B7B7;
    line-height: 20px;
  }
}
</style>
