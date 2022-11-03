<template>
  <a-sub-menu class="smi-menu-item" :key="pMenuItem.to" v-bind="$props" v-on="$listeners">
    <span slot="title">
      <!--  -->
      <img v-if="pImage" :src="pMenuItem.icon" style="margin-right: 12px;" />
      <a-icon v-else type="alert" />
      <span>{{ pMenuItem.title }}</span>
    </span>
    <template v-for="subMenuItem in pMenuItem.children">
      <sider-sub-menu-item
        v-if="isHasChildren(subMenuItem) && !subMenuItem.hidden"
        :key="subMenuItem.to"
        :pMenuItem="subMenuItem"
        :pImage="pImage"
        :pDot="pDot"
      >
      </sider-sub-menu-item>
      <a-menu-item v-else-if="!subMenuItem.hidden" :key="subMenuItem.to">
        <img v-if="pImage" :src="subMenuItem.icon" />
        <a-icon v-else :type="subMenuItem.icon" />
        <span>{{ subMenuItem.title }}</span>
      </a-menu-item>
    </template>
  </a-sub-menu>
</template>

<script>
/**
 * 侧边栏菜单项
 *
 */
import { Menu } from 'ant-design-vue';

export default {
  name: 'SiderSubMenuItem',
  // ant menu必须添加此项否则不会被认为子菜单组件
  isSubMenu: true,
  props: {
    ...Menu.SubMenu.props,
    pMenuItem: {
      type: Object,
      default() {
        return {
          title: '',
          to: '',
          icon: '',
          children: []
        };
      }
    },
    pImage: {
      type: Boolean,
      default: true
    },
    pDot: Boolean
  },

  methods: {
    isHasChildren(menuItem) {
      if (!menuItem.children || menuItem.children.length === 0) {
        return false;
      }
      let showCount = 0;
      menuItem.children.forEach(subItem => {
        if (!subItem.hidden) {
          showCount += 1;
        }
      });
      return showCount > 0;
    }
  }
};
</script>

<style lang="less">
.sub-menu-item::before {
  content: '·';
  padding-left: 10px;
  margin-right: 8px;
  font-size: 20px;
  position: relative;
  top: 2px;
  font-weight: bold;
  color: #fff;
}
</style>
