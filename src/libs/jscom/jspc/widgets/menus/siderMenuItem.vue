<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <Icon :type='parentItem.icon || ""' />
      <span>{{ parentItem.title }}</span>
    </template>
    <template v-for='menu in children'>
      <template v-if='menu.children && menu.children.length === 1 && false'>
        <sider-menu-item v-if='showChildren(menu)' :key="`menu-${menu.name}`" :parent-item='menu'></sider-menu-item>
        <menu-item v-else :name='getNameOrTo(menu, true)' :key="`menu-${menu.children[0].name}`"><Icon :type='menu.children[0].icon || ""' />{{ menu.children[0].title }}</menu-item>
      </template>
      <template v-if="!menu.hidden">
        <sider-menu-item v-if='showChildren(menu)' :key="`menu-${menu.name}`" :parent-item='menu'></sider-menu-item>
        <menu-item v-else :name='getNameOrTo(menu)' :key="`menu-${menu.name}`"><Icon :type='menu.icon || ""' />{{ menu.title }}</menu-item>
      </template>
    </template>
  </Submenu>
</template>
<script>
import siderItemMixin from './siderItemMixin'
import menuItemMixin from './menuItemMixin'
export default {
  name: 'siderMenuItem',
  mixins: [siderItemMixin, menuItemMixin]
}
</script>
<style lang="less">
@import 'variables.less';
</style>
