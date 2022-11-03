<template>
  <div class="layout">
    <Layout>
      <Sider ref='Sider' hide-trigger collapsible :width="220" :collapsed-width="64"
        v-model="collapsed" class="left-sider"
        :style="{height: '100vh', left: 0, overflow: 'hidden'}">
        <sider-menu :collapsed='collapsed'
        :active-name='menuActiveName'
        :openedNames='menuOpenNames'
        :menu-list='menuItems'
        accordion
        @on-select='onMenuSelect'>
          <div class="logo-con">
            <p :class='[collapsed ? "min-logo-con-title" : "max-logo-con-title"]'>{{ title }}</p>
          </div>
        </sider-menu>
      </Sider>
      <Layout class='index-right-layout'>
        <Header class="layout-header-bar">
          <Icon type="ios-menu" @click='onToggleSilder'></Icon>
          <Breadcrumb class='index-bread-crumb' v-if='isShowCrumb'>
            <BreadcrumbItem v-for='menu in crumbMenus'
            :key='menu.id'
            :to='menu.to'>{{ menu.title }}</BreadcrumbItem>
          </Breadcrumb>
          <RadioGroup v-else
          ref='radioGroup'
          v-model='thirdId'
          class='index-radio-group'
          type='button'
          @on-change='onMenuSelect($event, 2)'>
            <Radio
            class='index-radio'
            v-for='menuItem in thirdMenus'
            :label='menuItem.title'
            :key='menuItem.name'></Radio>
          </RadioGroup>
          <p class='layout-header-account'>
            <span>{{ user.username }}</span>&nbsp;
            <span>{{ user.mobile }}</span>
            <Button type='text' @click='onClickLogout'>退出</Button>
          </p>
        </Header>
        <Content class="main-content-con">
          <Layout class="main-layout-con">
            <div class="tag-nav-wrapper">
              <tags-nav :value="$route" :tags-list='tagsNavList' @on-Close-tab='onCloseTab' @input='onClickNavTab' @on-drop-down='onNavDropDown'></tags-nav>
            </div>
            <Content class="content-wrapper">
              <div v-if='isShowHint' class='manager-hint'>您没有相关操作权限，请联系管理员</div>
              <keep-alive :include="includeList" v-else>
                <router-view></router-view>
              </keep-alive>
              <!-- <BackTop></BackTop> -->
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import {BaseMenuGroup} from './BaseMenuGroup'
import SiderMenu from 'jspc/widgets/menus/siderMenu'
import TagsNav from 'jspc/widgets/menus/tagsNav'
import {sysUtil} from 'jscom/utils/sysutil'

export default {
  name: 'DashboardWidget',

  components: {
    SiderMenu,
    TagsNav
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
    },
    subTitle: function () {
      if (this.firstId) {
        return this.firstId.subTitle
      }
    },
    isShowCrumb: function () {
      return this.crumbMenus && this.crumbMenus.length > 0
    }
  },

  data () {
    return {
      collapsed: false,
      title: '', // required by sub class
      menuGroup: new BaseMenuGroup(), // required by sub class
      currentMenu: null,

      message: 'DashboardWidget',
      isShowHint: false,
      user: {},
      prefix: '',
      activeDate: new Date().getTime(),
      menuActiveName: '',
      menuOpenNames: [],
      menuItems: [],
      tagsNavList: [],
      includeList: [],
      tagsNavName: 'tagsNavList'
    }
  },

  created () {
    this.initMenus()
    let collapsed = JSON.parse(sysUtil.getLocalStore('collapsed'))
    if (typeof collapsed === 'boolean') {
      this.collapsed = collapsed
    }
    this.$router.closeCurrentPage = this.closeCurrentPage
  },

  watch: {
    '$route' (newRoute) {
      this.activeDate = new Date().getTime()
      this.updateRoute(newRoute)
    },
    collapsed (val) {
      sysUtil.setLocalStore('collapsed', val)
    }
  },

  methods: {
    initMenus () {
      this.getUserInfo().then((user) => {
        this.user = user
        this.getMenuGroup().then((menuGroup) => {
          menuGroup.initMenus(this.user)
          this.menuGroup = menuGroup
          this.menuItems = menuGroup.menus
          // this.currentMenu = menuGroup.getInitialMenu()
          this.initTagsNavs()
          this.initActiveMenus(this.$route.path)
          this.isShowHint = this.menuGroup.menus.length === 0
        })
      })
    },
    onToggleSilder () {
      this.collapsed = !this.collapsed
    },
    onClickLogout () {
      this.OnLogout()
    },
    OnLogout() {
      throw new Error('NotImplementError')
    },
    getMenuGroup () {
      // brief: should return menuGroup object
    },
    getUserInfo () {
      // @breif: should return user object
      throw new Error('NotImplementError')
    },
    onMenuSelect (path, level) {
      this.currentMenu = this.menuGroup.getLeafMenuByPath(path)
      console.log('router change to ' + this.currentMenu.view + ' to ' + this.currentMenu.to)
      this.updateActiveMenus(this.currentMenu)
      this.$router.push(this.currentMenu.to)
    },
    initActiveMenus (path) {
      let activeMenu = this.menuGroup.getMenuByPath(path)
      if (!activeMenu) {
        if (this.$route.query.redirect) {
          this.$router.replace(this.$route.query.redirect)
          return
        }
        let initMenu = this.menuGroup.getInitialMenu()
        this.$router.replace(initMenu.to)
        return
      }
      this.updateActiveMenus(activeMenu)
    },
    updateActiveMenus (activeMenu) {
      this.currentMenu = activeMenu
      this.menuActiveName = activeMenu.to
      let pathNames = this.menuActiveName.split('/').slice(2)
      this.menuOpenNames = [pathNames[0]]
      this.crumbMenus = this.menuGroup.getCrumbMenus(activeMenu)
    },
    updateRoute (newRoute) {
      let componentName = this.$router.getMatchedComponents()[1].name
      this.setIncludeList(componentName)
      let path = newRoute.path
      let params = newRoute.params
      let pathName = path.split('/').slice(2)
      let emptyRouters =this.menuGroup.getEmptyRouter()
      if (this.getIsParams(params)) {
        let menu = this.menuGroup.getMenuByPath(newRoute.path)
        if (menu) {
          menu['componentName'] = componentName
          this.updateTagsNav(menu)
        } else {
          let detailList = this.menuGroup.getAllDetailPage()
          for (let detail of detailList) {
            let keys = params.keys()
            let tabName = params[keys[keys.length-1]]
            if (newRoute.path.indexOf(detail.to) === 0) {
              let detailCtx = {
                subTitle: tabName ? detail.title + tabName : detail.title,
                to: path,
                componentName: componentName,
                params: tabName
              }
              let nav = Object.assign(detail, detailCtx)
              this.updateTagsNav(JSON.parse(JSON.stringify(nav)))
            }
          }
        }
        return
      }
      for (let menuItem of this.menuItems) {
        if (menuItem.name === pathName[0]) {
          for (let children of menuItem.children) {
            if (children.name === pathName[1]) {
              children['componentName'] = componentName
              this.updateTagsNav(children)
            }
          }
        }
      }
      if (emptyRouters[pathName[1]] && emptyRouters[pathName[1]].children.length === 0) {
        emptyRouters[pathName[1]]['componentName'] = componentName
        this.updateTagsNav(emptyRouters[pathName[1]])
      }
    },
    getIsParams (params) {
      for (let [key, value] of Object.entries(params)) {
        if (!value) {
          return false
        }
        return true
      }
    },
    onClickNavTab (item) {
      this.onMenuSelect(item.to)
    },
    closeCurrentPage () {
      for (let tag of this.tagsNavList) {
        if (tag.to === this.$route.path) {
          this.onCloseTab(tag)
        }
      }
    },
    onCloseTab (item) {
      this.checkIncludeList(item.componentName)
      if (item.to === this.$route.path) {
        let index = this.tagsNavList.indexOf(item)
        if (index === this.tagsNavList.length - 1) {
          this.onMenuSelect(this.tagsNavList[index - 1].to)
        } else {
          this.onMenuSelect(this.tagsNavList[index + 1].to)
        }
      }
      this.deleteTagsNav(item)
    },
    checkIncludeList (componentName) {
      this.includeList = this.includeList.filter((include) => {
        if (include !== componentName) {
          return include
        }
      })
    },
    onNavDropDown (name) {
      this.setTagsNavs([this.menuGroup.getHomeItem()])
      this.includeList = []
      if (name === 'all') {
        this.onMenuSelect(this.menuGroup.getHomeItem().to)
      } else {
        this.includeList = [this.$router.getMatchedComponents()[0].name]
        this.updateRoute(this.$route)
        this.onMenuSelect(this.$route.path)
      }
    },
    onClickHome () {
      this.$router.push(this.menuGroup.getHomeItem().to)
    },
    onRadioChange () {},
    setIncludeList (name) {
      if (this.includeList.indexOf(name) === -1) {
        this.includeList.push(name)
      }
    },
    setTagsNavs (tagsNavs) {
      this.tagsNavList = tagsNavs
      sysUtil.setLocalStore(this.tagsNavName, this.tagsNavList, false)
    },
    initTagsNavs () {
      let tagsNavs = sysUtil.getLocalStore(this.tagsNavName, false)
      if (tagsNavs) {
        this.tagsNavList = JSON.parse(tagsNavs)
        if (!this.tagsNavList) {
          this.tagsNavList = []
        }
      }
      let homeItem = this.menuGroup.getHomeItem()
      if (!homeItem) {
        return
      }
      if (this.tagsNavList.length === 0 ||
        !this.tagsNavList.find(item => item.to === homeItem.to)) {
        this.tagsNavList.unshift(homeItem)
        sysUtil.setLocalStore(this.tagsNavName, this.tagsNavList, false)
      }
    },
    updateTagsNav (tagsNav) {
      let index = 0
      let isUpdated = false
      for (let tagsNavItem of this.tagsNavList) {
        if (tagsNavItem.to === tagsNav.to) {
          return
        }
        if ((tagsNav.params && tagsNavItem.params) && tagsNavItem.name === tagsNav.name && tagsNavItem.params !== tagsNav.params) {
          this.tagsNavList[index] = tagsNav
          isUpdated = true
          break
        }
        index++
      }
      if (!isUpdated) {
        this.tagsNavList.push(tagsNav)
      }
      sysUtil.setLocalStore(this.tagsNavName, this.tagsNavList, false)
    },
    deleteTagsNav (tagsNav) {
      for (let index in this.tagsNavList) {
        if (this.tagsNavList[index].to === tagsNav.to) {
          this.tagsNavList.splice(index, 1)
          break
        }
      }
      sysUtil.setLocalStore(this.tagsNavName, this.tagsNavList, false)
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.initActiveMenus(to.path)
    next()
  }
}
</script>

<style lang='less' scoped>
  @import 'jspc/styles/common.less';
  .index-sub-sider {
    background-color: @white;
    flex: 0 0 120px;
    border-right: 1px solid @border-color;
  }
  .index-title {
    color: @white;
    font-size: @h1-font-size;
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }
  .index-sub-title {
    color: @text-color;
    font-size: @normal-font-size;
    width: 100%;
    height: 80px;
    line-height: 80px;
    text-align: center;
    border-bottom: 1px solid @border-color;
  }
  .index-menu-title {
    font-size: @normal-font-size;
  }

  .index-right-layout {
    //min-width: 1000px;
  }

  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    padding: 0px @horizontal-space;
    font-size: @h1-font-size;
    display: flex;
    align-items: flex-end;
    .layout-header-account {
      font-size: @base-font-size;
      padding: 0;
      line-height: normal;
      display: flex;
      align-items: center;
    }

    .index-radio-group {
      display: flex;
      flex: 1;
      padding: 0px @horizontal-space @vertical-space @horizontal-space;
      .index-radio {
        margin: 0rem 0.4rem;
        border-radius: 0px;
      }
    }

    .index-bread-crumb {
      flex: 1;
      padding: 0px @horizontal-space @vertical-space @horizontal-space;
      height: 32px;
      line-height: 32px;
    }
  }

  .logo-con{
    height: 64px;
    padding: @small-horz-space;
    .max-logo-con-title{
      color: @white;
      font-size: @h1-font-size;
      width: 100%;
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
    .min-logo-con-title{
      color: @white;
      font-size: @large-font-size;
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin-top: @small-horz-space;
    }
  }

  .main-layout-con{
    height: 100%;
    overflow: hidden;
  }
  .main-content-con{
    height: ~"calc(100% - 60px)";
    overflow: hidden;
  }
  .tag-nav-wrapper{
    padding: 0;
    height:40px;
    background:#F0F0F0;
  }
  .content-wrapper{
    padding: 18px;
    height: ~"calc(100% - 80px)";
    overflow: auto;
    background: @white;
    .manager-hint{
      line-height: 220px;
      align-self: center;
      font-size: @larger-font-size;
      text-align: center;
    }
  }
</style>
