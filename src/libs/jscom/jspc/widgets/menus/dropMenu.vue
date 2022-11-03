<template>
  <Dropdown ref='dropDown' transfer-class-name='dm-transfer' :class="hideTitle ? '' : 'collased-menu-dropdown'" @on-click='onClickDrop' :transfer='true' :placement='placement'>
    <a href='javasrcipt:viod(0)' class='dm-menu'
    @mouseover='handleMouseover($event, children)'
    :style="{textAlign: !hideTitle ? 'left' : ''}">
      <Icon :color='textColor' :style="{'dm-menu-icon': parentItem}" :type='parentItem.icon || ""'></Icon>
      <span :style="{color: textColor}" class='menu-title' v-if='!hideTitle || !parentItem.icon'>
        {{ parentItem.title }}
      </span>
      <Icon :color='textColor' type="ios-arrow-forward" v-if='!hideTitle' :size="16"></Icon>
    </a>
    <DropdownMenu ref='dropDown' slot="list">
      <template v-for='child in children'>
        <drop-menu v-if='showChildren(child)' :parent-item='child' :key="`drop-${child.name}`"></drop-menu>
        <DropdownItem v-else :key="`drop-${child.name}`" :name='getNameOrTo(child)'>
          <Icon :type='child.icon || ""'></Icon><span class='menu-title'>{{ child.title }}</span>
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>
<script>
import menuItemMixin from './menuItemMixin'
import mixin from './siderItemMixin'
export default {
  name: 'dropMenu',
  mixins: [menuItemMixin, mixin],
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      placement: 'right-end'
    }
  },
  methods: {
    onClickDrop (name) {
      this.$emit('on-click', name)
    },
    handleMouseover (event, children) {
      const { pageY } = event
      const height = children.length * 38
      const isOverflow = pageY + height < window.innerHeight
      this.placement = isOverflow ? 'right-start' : 'right-end'
    }
  }
}
</script>
<style lang='less'>
@import 'variables.less';
.menu-title{
  padding-left: 6px;
  font-size: @small-font-size;
}
.dm-menu{
  display: inline-block;
  text-align: center;
  padding: 6px 15px;
  width: 100%;
  font-size: @larger-font-size;
}
.dm-menu-icon{
  color: @white;
}
.dm-menu:hover {
  text-decoration: none;
}
.dm-drop-down-item{
  height: 100%;
}
div.ivu-dropdown-transfer{
  max-height: 100%;
}
</style>
