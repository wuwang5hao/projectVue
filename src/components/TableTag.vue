<template>
  <div :class="['tt-container', 'tt-container-' + pColor]">
    <span class="tt-container-dot"></span>{{ pLabel }}</div>
</template>

<script>
/*
 * 表格内标签组件
 */
export default {
  name: "TableTag",
  props: {
    pColor: {
      type: String,
      default: 'green'
    },
    pLabel: String
  }
}
</script>

<style lang="less">
@import 'variables.less';
.tt-container {
  border: 1px #0f0 solid;
  border-radius: 4px;
  width: 59px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-align: center;
  &-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 7px;
    background-color: inherit;
  }
  &-red {
    border-color: #FF3232;
    color: #FF3232;
    background-color: rgba(255,50,50,0.2)
  }
  &-green {
    border-color: #00F2FF;
    color: #00F2FF;
    background-color: rgba(0,242,255,0.2)
  }
  &-yellow {
    border-color: #FFC63F;
    color: #FFC63F;
    background-color: rgba(255,198,63,0.2)
  }
}
</style>
