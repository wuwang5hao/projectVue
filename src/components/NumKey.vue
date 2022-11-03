<template>
  <ul
    class="keyboard"
    :style="{
      visibility: pVisible ? '' : 'hidden',
      position: pPos === null ? '' : 'fixed',
      top: pPos === null ? '' : `${pPos[0]}px`,
      left: pPos === null ? '' : `${pPos[1]}px`,
    }"
    @mousedown.prevent
  >
    <li
      @mousedown.prevent
      v-for="(key, index) in keyList"
      :key="index"
      :class="{[keyStyleMap[key]]: keyStyleMap[key]}"
      @click="clickKey(key)"
    >
      {{key}}
    </li>
  </ul>
</template>
<script>
/*
* 数字键盘组件
*/
export default {
  name: 'NumKey',
  props: {
    value: {type: String, default() { return '' }},
    pPos: {type: Array, default() { return null }},
    pVisible: {type: Boolean, default() { return false }},
  },
  watch: {
    value(val) {
      this.keyvalue = val
    }
  },
  data() {
    let keyList = [
      '（', '）', '%', '清除',
      '7', '8', '9', '÷',
      '4', '5', '6', '×',
      '1', '2', '3', '-',
      '0', '00', '.', '+',
    ]
    let keyStyleMap = {
      '（': 'func', '）': 'func', '%': 'func', '清除': 'func',
      '÷': 'func', '×': 'func', '-': 'func', '+': 'func',
    }
    return {
      keyList,
      keyStyleMap,
      keyvalue: this.value
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    // 按键响应函数，针对特殊控件处理和抛出input消息
    clickKey(key) {
      switch(key) {
        case "清除":
          this.keyvalue = ''
          break;

        case "÷":
          this.keyvalue += "/";
          break;

        case "×":
          this.keyvalue += "*";
          break;

        default:
          this.keyvalue += key;
          break;
      }
      this.$emit("input", this.keyvalue)
    },
    init() {},
  },

}
</script>

<style lang="less" scoped>
.keyboard {
  width:296px;
  height:217px;
  background:#FFFFFF;
  border-radius:5px;
  border:1px solid #ECECEC;

  margin: 0;
  padding: 20px 0px 0px 18px;
  list-style: none;
  user-select: none;

  li {
    float: left;
    margin: 0 8px 7px 0;
    width:59px;
    height:30px;

    font-size:11px;
    font-family:'SourceHanSansCN-Medium,SourceHanSansCN';
    font-weight:500;
    color:#212121;
    line-height:30px;

    text-align: center;
    border: 0px;
    border-radius: 3.2px;
    background:#F2F3F5;
    border-radius:3px;

    &:hover {
      position: relative;
      opacity: 0.7;
      cursor: pointer;
    }
  }

  .func {
    position: relative;
    background:#E0E1E5;
  }
}
</style>
