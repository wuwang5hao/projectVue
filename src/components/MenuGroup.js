/*
 * 菜单处理类，继承于BaseMenuGroup主要用来获取面包屑字段，和菜单项数据转换
 */

import { MenuItem, BaseMenuGroup } from 'jspc/widgets/dashboard/BaseMenuGroup'

export default class MenuGroup extends BaseMenuGroup {
  constructor (menus, prefix, defaultItem=null) {
    super()
    this.locMenus = menus
    this.prefix = prefix
    this.defaultItem = defaultItem
  }

  getMenus (userInfo) {
    const result = this.genMenuItems(this.locMenus)
    return result
  }

  /* 菜单项数据结构转换
   * params: menus 外部定义的菜单结构
   */
  genMenuItems(menus) {
    const result = []
    if (!menus) return result
    for (const menu of menus) {
      result.push(new MenuItem(menu.title, menu.title, menu.name, '', menu.icon,
        this.genMenuItems(menu.children), menu.view, menu.type, menu.hidden || false, menu))
    }
    return result
  }
  // 获取面包屑文字
  getCrumbMenus (currentMenu, path) {
    let selMenu = currentMenu
    if (path) {
      selMenu = this.getMenuByPath(path, false)
    }
    const menuStruct = this.getMenuStruct(selMenu)
    const result = []
    if (this.defaultItem) {
      result.push(this.defaultItem)
    }
    for (const menu of menuStruct) {
      if (menu.id === selMenu.id) {
        result.push(menu)
        break
      }
      result.push(menu)
    }
    return result
  }
}
