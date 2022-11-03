<template>
  <div class="sm-container">
    <slot name="header"></slot>
    <a-menu
      class="sm-menu"
      :style="style"
      :theme="pTheme"
      :mode="pMode"
      :selectedKeys="selectKeys"
      :openKeys="openKeys"
      :inlineCollapsed="pIsCollapsed"
      @select="onMenuSelect"
      @openChange="onOpenChange"
    >
      <template v-for="menuItem in pMenuItems">
        <sider-sub-menu-item
          v-if="isHasChildren(menuItem) && !menuItem.hidden"
          :key="menuItem.to"
          :pMenuItem="menuItem"
          :pImage="pImage"
          :pDot="pDot"
        ></sider-sub-menu-item>
        <a-menu-item v-else-if="!menuItem.hidden" :key="menuItem.to">
          <img v-if="pImage" :src="menuItem.icon" />
          <a-icon v-else :type="menuItem.icon" />
          <span>{{ menuItem.title }}</span>
        </a-menu-item>
      </template>
    </a-menu>
    <slot name="footer"></slot>
  </div>
</template>

<script>
/**
 * 侧边栏菜单
 *
 */
import SiderSubMenuItem from './SiderSubMenuItem';

export default {
  name: 'SiderMenu',

  components: {
    'sider-sub-menu-item': SiderSubMenuItem
  },

  props: {
    pTheme: {
      type: String,
      default: 'dark'
    },
    pMode: {
      type: String,
      default: 'inline'
    },
    pIsCollapsed: Boolean,
    pImage: Boolean,
    pDot: Boolean,
    pSelectName: String,
    pOpenedNames: {
      type: Array,
      default() {
        return [];
      }
    },
    pAccordion: {
      type: Boolean,
      default: true
    },
    pMenuItems: {
      type: Array,
      default() {
        return [];
      }
    },
    pHeight: Number,
    pPrefixMenu: {
      type: String,
      default: ''
    }
  },

  watch: {
    pSelectName(name) {
      this.selectKeys = [name];
    },
    pMenuItems(items) {
      return items.map(item => item.to);
    },
    pOpenedNames(value) {
      this.openKeys = value.map(menu => {
        return `${this.prefixMenu}/${menu}`;
      });
      if (this.pIsCollapsed) {
        this.openKeys = [this.openKeys.pop()];
      }
    }
  },

  data() {
    return {
      selectKeys: [this.pSelectName],
      openKeys: [],
      rootSubmenuKeys: this.pMenuItems.map(item => item.to),
      prefixMenu: this.pPrefixMenu
    };
  },

  created() {
    this.openKeys = this.pOpenedNames.map(menu => {
      return `${this.prefixMenu}/${menu}`;
    });
    if (this.pIsCollapsed) {
      this.openKeys = [];
    }
  },

  computed: {
    style() {
      return `height: ${this.pHeight}px`;
    }
  },

  methods: {
    onMenuSelect({ key }) {
      this.$emit('on-select', key);
    },
    onOpenChange(openKeys) {
      if (!this.pAccordion) {
        return;
      }
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
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
@import 'variables.less';
.sm-container {
  position: relative;
  height: 100%;
  // margin-right: -6px;

  .ant-menu-inline-collapsed > .ant-menu-item img + span {
    max-width: 0px;
    display: none;
  }
  .ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title img + span {
    max-width: 0px;
    display: none;
  }
  .ant-menu-item-selected {
    border-left: 3px @primary solid;
  }
  .ant-menu-item {
    // height: 58px;
    // line-height: 58px;
    padding: 0px 24px;
    > img {
      margin-right: 12px;
    }
  }
  .ant-menu-sub.ant-menu-inline > .ant-menu-item,
  .ant-menu-sub.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
    height: 48px;
    line-height: 48px;
  }

  .ant-menu.ant-menu-dark .ant-menu-item-selected,
  .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
    background-color: #262933;
  }
  .ant-menu-vertical > .ant-menu-item,
  .ant-menu-vertical-left > .ant-menu-item,
  .ant-menu-vertical-right > .ant-menu-item,
  .ant-menu-inline > .ant-menu-item,
  .ant-menu-vertical > .ant-menu-submenu > .ant-menu-submenu-title,
  .ant-menu-vertical-left > .ant-menu-submenu > .ant-menu-submenu-title,
  .ant-menu-vertical-right > .ant-menu-submenu > .ant-menu-submenu-title,
  .ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
    height: 40px;
    line-height: 40px;
  }
}

.sm-container .sm-menu::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
.sm-container .sm-menu::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}
.sm-container .sm-menu::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: transparent;
}
.sm-menu {
  overflow-y: auto;
  position: absolute;
  top: 48px;
  bottom: 80px;
  padding-top: 20px;
}
.sm-menu-collapsed {
  bottom: 150px;
}

@media screen and (max-width: @page-switch-width) {
  .sm-container {
    .ant-menu-sub.ant-menu-inline > .ant-menu-item,
    .ant-menu-sub.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
      height: 44px;
      line-height: 44px;
    }

    .ant-menu.ant-menu-dark .ant-menu-item-selected,
    .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
      background-color: #262933;
    }
    .ant-menu-vertical > .ant-menu-item,
    .ant-menu-vertical-left > .ant-menu-item,
    .ant-menu-vertical-right > .ant-menu-item,
    .ant-menu-inline > .ant-menu-item,
    .ant-menu-vertical > .ant-menu-submenu > .ant-menu-submenu-title,
    .ant-menu-vertical-left > .ant-menu-submenu > .ant-menu-submenu-title,
    .ant-menu-vertical-right > .ant-menu-submenu > .ant-menu-submenu-title,
    .ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
      height: 44px;
      line-height: 44px;
    }
  }

  .sm-menu {
    top: 48px;
    bottom: 60px;
  }
  .sm-menu-collapsed {
    bottom: 130px;
  }
}
</style>
