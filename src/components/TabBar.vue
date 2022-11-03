<template>
  <div :class="['tb-tabs', 'tb-tabs-' + pJustify]">
    <p v-for="item in pItems"
      :class="['tb-tabs-item', {'tb-tabs-item-active': isActive(item)}]"
      :key="item"
      @click="onClickTabItem(item)">{{ item }}</p>
  </div>
</template>

<script>
/*
 * 标签页栏组件
 */
export default {
  name: 'TabBar',
  props: {
    pItems: {
      type: Array,
      default: () => []
    },
    pActive: String,
    pJustify: {
      type: String,
      default: 'center'
    }
  },

  data () {
    return {
      activeItem: this.pActive || this.pItems[0]
    }
  },

  methods: {
    isActive (item) {
      return this.activeItem === item
    },
    onClickTabItem (item, type) {
      this.activeItem = item
      this.$emit('on-change', item, type)
    }
  }
}
</script>

<style lang="less">
@import 'variables.less';
.tb-tabs {
  font-size: @font-size-base;
  color: @text-color;
  display: flex;
  padding: 8px 16px 0px 16px;
  background-color: @white;
  &-center {
    justify-content: center;
  }
  &-start {
    justify-content: flex-start;
  }
  &-end {
    justify-content: flex-end;
  }
  &-item {
    // width: 88px;
    height: 40px;
    padding: 10px 10px;
    margin-bottom: 0px;
    line-height: 1;
    cursor: pointer;
    text-align: center;
    position: relative;
    color: #B7B7B7;
  }
   &-item:not(:last-child)::after {
    content: ' ';
    width: 10px;
    height: 14px;
    border-right: 1px solid;
    border-color: #D0D3DF;
    position: absolute;
    right: 0px;
  }
  &-item-active {
    color: #1E222B;
    font-size: 14px;
    font-weight: 500;
    border-bottom: 2px #ff791a solid;
  }
}
</style>
