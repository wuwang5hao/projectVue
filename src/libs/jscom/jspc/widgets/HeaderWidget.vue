<template>
  <div class='header'>
    <span class='title' :class="pHx">{{ pTitle }}</span>
    <slot></slot>
  </div>
</template>
<script>

export default {
  name: 'HeaderWidget',
  props: {
    pTitle: { type: String, required: true },
    pHx: { type: String, default: 'h3' }
  }
}
</script>
<style lang="less" scoped>
@import 'jspc/styles/common.less';
.header {
    padding: @spacer 0;
    margin-bottom: @spacer;
    border-bottom: 1px solid @border-color;
    display: flex;
    justify-content: space-between;
  .title {
    font-weight: bold;
  }
}
</style>
