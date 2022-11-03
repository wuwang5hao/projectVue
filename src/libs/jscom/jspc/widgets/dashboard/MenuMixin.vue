<script>
import { BaseMenuGroup } from './BaseMenuGroup'
import { sysUtil } from 'jscom/utils/sysutil'

export default {
  name: 'MenuMixin',

  data () {
    return {
      isCollapsed: true,
      menuGroup: new BaseMenuGroup(), // required by sub class
      currentMenu: null,
      menuActiveName: '',
      menuOpenNames: [],
      menuItems: [],
      crumbMenus: []
    }
  },

  computed: {
    firstMenus: function() {
      return this.menuGroup.getFirstMenus(this.currentMenu)
    },
    secondMenus: function () {
      return this.menuGroup.getSecondMenus(this.currentMenu)
    },
    thirdMenus: function () {
      return this.menuGroup.getThirdMenus(this.currentMenu)
    },
    firstId: function() {
      let menu = this.menuGroup.getFirstMenu(this.currentMenu)
      if (menu) return menu.id
    },
    secondId: function() {
      let menu = this.menuGroup.getSecondMenu(this.currentMenu)
      if (menu) return menu.id
    },
    thirdId: function() {
      let menu = this.menuGroup.getThirdMenu(this.currentMenu)
      if (menu) return menu.id
    }
  },

  watch: {
    isCollapsed (val) {
      sysUtil.setLocalStore('isCollapsed', val)
    }
  },

  methods: {
    initMenuGroups () {

    },
    initMenus () {
      this.initMenuGroups()
      this.menuGroup.initMenus()
      this.menuItems = this.menuGroup.menus
      this.initActiveMenus(this.$route.path)
    },
    initCollapsedState () {
      let isCollapsed = JSON.parse(sysUtil.getLocalStore('isCollapsed'))
      if (typeof isCollapsed === 'boolean') {
        this.isCollapsed = isCollapsed
      }
    },
    initActiveMenus (path) {
      let activeMenu = this.menuGroup.getMenuByPath(path)
      // if (!activeMenu) {
      //   if (this.$route.query.redirect) {
      //     this.$router.replace(this.$route.query.redirect)
      //     return
      //   }
      //   let initMenu = this.menuGroup.getInitialMenu()
      //   if (initMenu.to.indexOf(path) === 0) {
      //     this.$router.replace(initMenu.to)
      //     return
      //   }
      
      //   activeMenu = initMenu
      // }
      this.updateActiveMenus(activeMenu, path)
    },
    updateActiveMenus (activeMenu, path) {
      if (!activeMenu) {
        this.currentMenu = null
        this.menuActiveName = ''
        this.menuOpenNames = []
        this.crumbMenus = this.menuGroup.getCrumbMenus(activeMenu, path)
      } else {
        this.currentMenu = activeMenu
        this.menuActiveName = activeMenu.to
        this.menuOpenNames = []
        let pathNames = this.menuGroup.getPathNames(this.menuActiveName)
        // todo 如果路径和菜单的路径一致，怎设置打开菜单为父节点， 否则为当前节点
        // if (path === activeMenu.to) {
        //   pathNames = pathNames.slice(0, pathNames.length - 1)
        // }
        for (let index = 0; index < pathNames.length; index += 1) {
          this.menuOpenNames.push(pathNames.slice(0, index+1).join('/'))
        }
        this.crumbMenus = this.menuGroup.getCrumbMenus(activeMenu, path)
      }
    },
    onMenuSelect (path, level) {
      if (sysUtil.isObject(path)) {
        path = path.key
      }
      this.currentMenu = this.menuGroup.getLeafMenuByPath(path)
      this.updateActiveMenus(this.currentMenu)
      this.$router.push(this.currentMenu.to)
    }
  },

  beforeRouteUpdate (to, from, next) {
    this.initActiveMenus(to.path)
    next()
  }
}
</script>
