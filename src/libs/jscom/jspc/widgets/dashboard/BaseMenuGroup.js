import { arrUtil } from "jscom/utils/arrutil"
import { objUtil } from "jscom/utils/objutil"

export class MenuItem {
  constructor (title, subTitle, name, to = '', icon='',
    children = [], view='', type='', hidden=false, data={}, iconActive='') {
    this.title = title
    this.subTitle = subTitle
    this.name = name
    this.to = to
    this.children = children
    this.view = view
    this.type = type
    this.icon = icon
    this.iconActive = iconActive
    this.hidden = hidden
    this.data = data
  }

  setChildren (children) {
    this.children = children
  }

  appendChild (child) {
    this.children.push(child)
  }
}

export class BaseMenuGroup {
  constructor () {
    this.menus = []
    this.menuStructMap = {}
    this.menuIdMap = {}
    this.homeItem = null
    this.sliceCount = 2
  }

  initMenus(userInfo) {
    this.menus = this.getMenus(userInfo)
    this.menuStructMap = this._searchMenuStruct()
  }

  _searchMenuStruct() {
    let stack = []
    let menuStructMap = {}
    for (let menu of this.menus) {
      stack.push(menu)
      this._searchMenu(menu, stack, menuStructMap, this.menuIdMap)
      stack.pop()
    }
    return menuStructMap
  }

  addRoutes (menuItem) {
  }

  checkAddView (menuItem) {
    return false
  }

  _searchMenu(parent, stack, menuStructMap, menuIdMap) {
    if (parent.children.length === 0) {
      let nameStack = []
      for (let item of stack) {
        nameStack.push(item.name)
        item.id = nameStack.join('.')
        item.to = this.prefix + '/' + nameStack.join('/')
        if (item.view) {
          if (this.checkAddView(item)) {
            this.addRoutes(item)
            item.to = `${item.to}/${item.view}`
            item.id = `${item.id}.${item.view}`
          }
        }
        menuIdMap[item.id] = item
        menuStructMap[item.id] = arrUtil.copy(stack)
      }
      return
    }
    let children = arrUtil.copy(parent.children)
    for (let menu of children.reverse()) {
      stack.push(menu)
      this._searchMenu(menu, stack, menuStructMap, menuIdMap)
      stack.pop()
    }
  }

  getMenuStruct(menu) {
    if (!menu) return []
    return objUtil.get(this.menuStructMap, menu.id, [])
  }

  getMenuById(id_) {
    return objUtil.get(this.menuIdMap, id_, null)
  }

  getMenuByPath(path, filterHidden=true) {
    let names = path.split('/').slice(this.sliceCount)
    while (names.length > 0) {
      let id = names.join('.')
      let menu = this.getMenuById(id)
      if (menu && (!filterHidden || !menu.hidden)) {
        return menu
      }
      names.pop()
    }
    return null
  }

  getInitialMenu() {
    let firstMenu = this.menus[0]
    let menuStruct = this.getMenuStruct(firstMenu)
    // 获取最后一个可显示的子菜单
    let parentMenu = null
    for (let menu of menuStruct) {
      if (menu.hidden) {
        return parentMenu
      }
      parentMenu = menu
    }
    return parentMenu
  }

  getMenus (userInfo) {
  }

  getCrumbMenus (currentMenu, path) {
    if (path) {
      currentMenu = this.getMenuByPath(path, false)
    }
    let menuStruct = this.getMenuStruct(currentMenu)
    let result = []
    for (let menu of menuStruct) {
      if (menu.id === currentMenu.id) {
        result.push(menu)
        break
      }
      result.push(menu)
    }
    return result
  }

  // some assist functions
  getFirstMenus(currentMenu) {
    return this.menus
  }
  getSecondMenus(currentMenu) {
    let menuStruct = this.getMenuStruct(currentMenu)
    if (menuStruct[0]) {
      return menuStruct[0].children
    }
  }
  getThirdMenus(currentMenu) {
    let menuStruct = this.getMenuStruct(currentMenu)
    if (menuStruct[1]) {
      return menuStruct[1].children
    } else {
      return []
    }
  }

  getFirstMenu(currentMenu) {
    let menuStruct = this.getMenuStruct(currentMenu)
    return menuStruct[0]
  }
  getSecondMenu(currentMenu) {
    let menuStruct = this.getMenuStruct(currentMenu)
    return menuStruct[1]
  }
  getThirdMenu(currentMenu) {
    let menuStruct = this.getMenuStruct(currentMenu)
    return menuStruct[2]
  }
  getLeafMenuById(id) {
    let menu = this.getMenuById(id)
    let menuStruct = this.getMenuStruct(menu)
    return arrUtil.index(menuStruct, -1)
  }
  getLeafMenuByPath(path) {
    let menu = this.getMenuByPath(path)
    let menuStruct = this.getMenuStruct(menu)
    for (let index = menuStruct.length - 1; index >=0; index--) {
      if (!menuStruct[index].hidden) {
        return menuStruct[index]
      }
    }
    return null
  }
  getEmptyRouter () {
    return []
  }
  getAllDetailPage () {
    return []
  }
  getHomeItem () {
    if (this.homeItem) {
      return this.homeItem
    }
    return this.getInitialMenu()
  }
  getPathNames (path) {
    return path.split('/').slice(this.sliceCount)
  }
}
