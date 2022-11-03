<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref='menu' v-show='!collapsed' :active-name='activeName' :openNames='openedNames' :accordion='accordion' :theme="theme" width="auto" @on-select="handleSelect">
      <template v-for='menu in menuList'>
        <sider-menu-item v-if='showChildren(menu) && !menu.hidden'
          :key="`menu-${menu.name}`"
          :parent-item='menu'></sider-menu-item>
        <menu-item v-else-if="!menu.hidden"
        :name='getNameOrTo(menu)'
        :key="`menu-${menu.name}`"
        :class="{'sm-menu-item-up': upIcon}">
          <img v-if="iconImg" :src="getNameOrTo(menu) === activeName ? (menu.iconActive || menu.icon || '') : (menu.icon || '')" />
          <Icon v-else :type="menu.icon || ''" />
          <span :class="{'sm-menu-item-right-title': !upIcon}">{{ menu.title }}</span></menu-item>
      </template>
    </Menu>
    <div class='menu-collapsed' v-show='collapsed'>
      <template v-for='menu in menuList'>
        <drop-menu v-if="!menu.hidden"
          @on-click='handleSelect'
          hide-title
          :theme='theme'
          :key="`drop-menu-${menu.name}`"
          :parent-item='menu'></drop-menu>
      </template>
    </div>
  </div>
</template>
<script>
import SiderMenuItem from './siderMenuItem'
import siderItemMixin from './siderItemMixin'
import DropMenu from './dropMenu'
export default {
  name: 'siderMenu',
  mixins: [siderItemMixin],
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    theme: {
      type: String,
      default: 'dark'
    },
    collapsed: Boolean,
    activeName: {
      type: String,
      default: ''
    },
    openedNames: {
      type: Array,
      default: () => []
    },
    accordion: Boolean,
    upIcon: Boolean,
    iconImg: Boolean
  },
  components: {
    SiderMenuItem,
    DropMenu
  },
  watch: {
    activeName (name) {
      this.$nextTick(() => {
        this.$refs.menu.updateActiveName()
      })
    },
    openedNames () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  methods: {
    handleSelect (name) {
      this.$emit('on-select', name)
    }
  }
}
</script>
<style lang="less">
@import 'variables.less';
.side-menu-wrapper{
  user-select: none;
  .menu-collapsed{
    padding-top: 10px;

    .ivu-dropdown{
      width: 100%;
      .ivu-dropdown-rel a{
        width: 100%;
      }
    }
    .ivu-tooltip{
      width: 100%;
      .ivu-tooltip-rel{
        width: 100%;
      }
      .ivu-tooltip-popper .ivu-tooltip-content{
        .ivu-tooltip-arrow{
          border-right-color: #fff;
        }
        .ivu-tooltip-inner{
          background: #fff;
          color: #495060;
        }
      }
    }
  }
  a.drop-menu-a{
    display: inline-block;
    padding: 6px 15px;
    width: 100%;
    text-align: center;
    color: #495060;
  }
}
.menu-title{
  padding-left: 6px;
}
.sm-drio-menu-span{
  display: inline-block;
  text-align: center;
  color: @white;
  padding: 6px 15px;
  width: 100%;
  text-align: center;
  font-size: @larger-font-size;
  cursor: pointer;
}
.sm-menu-item-right-title {
  margin-left: 5px;
}

.sm-menu-item-up {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    margin-bottom: 6px;
  }
}
</style>
