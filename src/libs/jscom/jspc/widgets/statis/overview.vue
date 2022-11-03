<template>
  <div class="overview" :class="direction">
    <div class='header'>
      <div class='item' v-for="(item, index) in data" :key="index">
        <p class="text-nowrap">{{ item.label }}</p>
        <p class='count'>
          {{ item.value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    direction: {type: String, default: 'horizontal'},
  },
}
</script>

<style lang='less' scoped>
  @import 'jspc/styles/common.less';
  .overview {
    padding: 0rem @horizontal-space;
    &.horizontal {
      .header {
        flex-flow: row nowrap;
      }
    }
    &.vertical {
      .header {
        flex-flow: column nowrap;
      }
    }
  }

  .overview > .header {
    width: 100%;
    display: flex;
    > .item {
      flex-grow: 1;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      > .count {
        color: #108EE9;
        font-size: @larger-font-size;
        margin-top: @vertical-space;
      }
    }
  }
</style>
