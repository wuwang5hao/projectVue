<template>
  <div class="header-bar">
    <div class='header-bar-left'>
      <span class='header-bar-icon' @click='onToggleSilder'><Icon type="ios-menu"></Icon></span>
      <slot name='left'></slot>
    </div>
    <div class='custom-content-con'>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'headerBar',
  props: {
    collapsed: Boolean
  },
  methods: {
    onToggleSilder () {
      this.$emit('on-coll-change', !this.collapsed)
    },
    onClickHome () {
      this.$emit('on-click-home')
    }
  }
}
</script>
<style lang="less">
@import 'variables.less';
.header-bar{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .header-bar-left{
    display: flex;
  }
  .header-bar-icon{
    font-size: @h1-font-size;
  }
  .header-bar-home{
    margin-left: @small-horz-space;
    font-size: @normal-font-size;
  }
  .custom-content-con{
    height: auto;
    padding-right: @horizontal-space;
    line-height: 64px;
    display: flex;
    align-items: center;
  }
}
</style>
