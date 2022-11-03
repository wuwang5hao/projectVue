<template name="head-filter">
  <!-- trigger="click" -->
  <a-popover overlayClassName="site-table-filter" v-model="visible" trigger="click" placement="topLeft">
    <a-menu :default-selected-keys="[pMenuList[0].value]" class="filter-menu" slot="content" style="width: calc(100% + 32px);margin-left: -16px;" @click="onClick">
      <a-menu-item class="filter-menu-item" v-for="item in pMenuList" :key="item.value">{{ item.label }}</a-menu-item>
    </a-menu>
    <a-icon type="filter" theme="filled" />
    <!-- <img src="../../static/img/circle-add.png" alt="" /> -->
  </a-popover>
</template>
<script>
export default {
  name: 'HeadeFilter',
  props: {
    pMenuList: {
      type: Array,
      default: () => []
    },

  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    onClick({ key }) {
      this.$emit('click', key);
      this.visible = false;
    }
  }
};
</script>
<style lang="less" scoped>
.ant-table-thead > tr > th .anticon-filter,
.ant-table-thead > tr > th .ant-table-filter-icon {
  right: 14px !important;
}
// .ant-popover-inner-content {
//   padding: 0 !important;
//   min-width: 100px;
// }
.site-table-filter {
  .filter-menu {
    border-right: none;
    // margin: -12px -16px;
    &-item {
      height: 36px;
      line-height: 36px;
      min-width: 80px;
      text-align: center;
      padding: 0 16px;
      margin-bottom: 0;
    }
  }
}
</style>
