<template>
  <div class="ni-container">
    <a-input v-model="number"
      type="number"
      :max="pMax"
      :min="pMin"
      :precision="2"
      :placeholder="pPlaceholder"
      @change="onChange"></a-input>
    <div class="ni-suffix">
      <span class="ni-suffix-item" @click="onClickUp"><a-icon type="up" /></span>
      <span class="ni-suffix-item" @click="onClickDown"><a-icon type="down" /></span>
    </div>
  </div>
</template>

<script>
/*
* 数字输入组件，只允许输入数字
*/
export default {
  name: 'NumberInput',

  props: {
    pMax: Number,
    pMin: Number,
    value: [Number, String],
    pStep: {
      type: Number,
      default: 1
    },
    pPlaceholder: {
      type: String,
      default: '请输入'
    }
  },

  data () {
    return {
      number: this.value
    }
  },

  watch: {
    value (val) {
      this.number = val
    }
  },

  methods: {
    onClickUp () {
      if (!this.number) {
        this.number = this.pMin || 1
        this.updateNumber(this.number)
        return
      }
      this.number += this.pStep
      if (this.pMax !== undefined && this.number > this.pMax) {
        this.number = this.pMax
      }
      this.updateNumber(this.number)
    },
    onClickDown () {
      if (!this.number) {
        this.number = this.pMin || 1
        this.updateNumber(this.number)
        return
      }
      this.number -= this.pStep
      if (this.pMin !== undefined && this.number < this.pMin) {
        this.number = this.pMin
      }
      this.updateNumber(this.number)
    },
    onChange (event) {
      this.updateNumber(parseInt(event.target.value, 10))
    },
    updateNumber (value) {
      this.$emit('input', value)
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="less">
@import 'variables.less';
.ni-container {
  position: relative;
  line-height: 40px;
  display: inline-block;
  .ni-suffix {
    position: absolute;
    right: 1px;
    bottom: 0;
    height: 40px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    border-radius: 0px 2px 2px 0px;
    border-left: 1px solid rgba(238,240,242,1);
    &-item {
      line-height: 20px;
      color: #999999;
      width: 27px;
      text-align: center;
      font-size: 8px;
    }
    &-item:first-child {
      border-bottom: 1px solid rgba(238,240,242,1);
    }
  }
}
</style>
