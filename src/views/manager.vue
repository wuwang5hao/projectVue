<template>
  <a-layout class="m-container">
    <a-layout-sider class="m-left-sider" collapsible :width="siderWidth" :trigger="null" v-model="isCollapsed">
      <SiderMenu class="m-sider-menu" :pMenuItems="menuItems" :pSelectName="menuActiveName"
        :pOpenedNames="menuOpenNames" :pIsCollapsed="isCollapsed" pPrefixMenu="/manager" pImage
        @on-select="onMenuSelect">
        <div :class="['m-left-sider-header', { 'm-left-sider-header-small': isCollapsed }]" slot="header">
          <img v-if="isCollapsed" src="../static/img/logo-white.png" />
          <img v-else src="../static/img/logo-white.png" />
        </div>
        <div slot="footer" class="m-left-sider-footer">
          <a-icon :type="foldName" @click="onClickCollapse" />
          <!-- <img src="../../src/company/static/img/mannual.png" /> -->
        </div>
      </SiderMenu>
    </a-layout-sider>
    <a-layout :class="['m-content', { 'm-content-collapsed': isCollapsed }]">
      <ContentHeader :pMenuItems="dropdownMenuItems" :pAvatarUrl="avatarUrl" :pUsername="username"
        @on-menu-action="onDropdownMenuSelected">
        <div slot="left" class="cm-content-header-left">
          <span style="fontSize:20px;">D碳云</span>
        </div>
      </ContentHeader>
      <a-layout-content class="m-content-content">
        <div class="m-breadcrumb" v-if="isShowCrumb">
          <a-breadcrumb separator="|">
            <a-breadcrumb-item v-for="menu in crumbMenus" :key="menu.name" :to="{ path: menu.to }">{{
                menu.title
            }}</a-breadcrumb-item>
          </a-breadcrumb>

          <a-button v-if="checkShowBack()" type="primary" @click="onClickBack">
            <span class="back-icon" />返回
          </a-button>
        </div>
        <div :class="['m-content-view', { 'm-content-view-max': !isShowCrumb }]">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
/**
 * 主要布局页面
 * 包括菜单，头部状态栏，主要内容区域
 */
import MenuGroup from '@/components/MenuGroup';
import MenuMixin from 'jspc/widgets/dashboard/MenuMixin';
import ContentHeader from '@/components/ContentHeader';
import SiderMenu from '@/components/menu/SiderMenu';
import { mapMutations, mapState, mapGetters } from 'vuex';
import MutationTypes from '@/store/MutationTypes';
import { ComponentUtil } from 'jscom/utils/vueutil';
import ModifyPassword from '@/common/ModifyPassword';
import ConfirmModal from '@/components/ConfirmModal';

// 菜单数组
let menus = [
  {
    title: '首页',
    name: 'home',
    children: [],
    icon: `${window.STATIC_IMG_URL}home.png`
  },
  // {
  //   title: '系统设置',
  //   name: 'systemSetting',
  //   children: [
  //     { title: '角色管理', name: 'roleManage', permission: ['sys_role'] },
  //     { title: '用户管理', name: 'userManage', permission: ['sys_user'] },
  //     { title: '数据字典管理', name: 'dictManage', permission: ['dictionary'] },
  //     { title: '地区管理', name: 'areaManage', permission: ['area'] }
  //   ],
  //   icon: `${window.STATIC_IMG_URL}system-setting.png`,
  //   permission: ['sys_role', 'sys_user', 'dictionary', 'area']
  // },
  // {
  //   title: '软件管理',
  //   name: 'softwareManage',
  //   children: [
  //     { title: '软件服务管理', name: 'service', permission: ['software_service'] },
  //     { title: '服务模块管理', name: 'module', permission: ['software_module'] },
  //     { title: '模块功能管理', name: 'feature', permission: ['software_function'] },
  //     { title: '权限管理', name: 'authority', permission: ['software_authority'] },
  //     { title: '上实龙创服务', name: 'sslcService', permission: ['sslc_serve'] }
  //   ],
  //   icon: `${window.STATIC_IMG_URL}software.png`,
  //   permission: ['software_service', 'software_module', 'software_function', 'software_authority', 'sslc_serve']
  // },
  // {
  //   title: '硬件管理',
  //   name: 'hardwareManage',
  //   children: [
  //     { title: '硬件品牌管理', name: 'brand', permission: ['hardware_brand'] },
  //     { title: '硬件系列管理', name: 'series', permission: ['hardware_series'] },
  //     { title: '硬件产品管理', name: 'product', permission: ['hardware_product'] },
  //     { title: '硬件型号管理', name: 'model', permission: ['hardware_model'] },
  //     { title: '硬件固件管理', name: 'firmware', permission: ['hardware_firmware'] },
  //     {
  //       title: '硬件序列号库',
  //       name: 'serial',
  //       permission: ['hardware_serial'],
  //       children: [{ title: '详情', name: 'detail', hidden: true, showBack: true }]
  //     },
  //     { title: '硬件出入库', name: 'inventory', permission: ['hardware_io'] }
  //   ],
  //   icon: `${window.STATIC_IMG_URL}hardware.png`,
  //   permission: [
  //     'hardware_brand',
  //     'hardware_series',
  //     'hardware_product',
  //     'hardware_model',
  //     'hardware_firmware',
  //     'hardware_serial',
  //     'hardware_io'
  //   ]
  // },
  // {
  //   title: '配置中心',
  //   name: 'configCenter',
  //   children: [
  //     {
  //       title: '规约驱动配置',
  //       name: 'protocol',
  //       permission: ['configure_protocol'],
  //       children: [{ title: '参数列表', name: 'parameters', hidden: true, showBack: true }]
  //     },
  //     {
  //       title: '能源能耗配置',
  //       name: 'energy',
  //       permission: ['configure_energy'],
  //       children: [{ title: '采集功能', name: 'collectFunction', hidden: true, showBack: true }]
  //     }
  //   ],
  //   icon: `${window.STATIC_IMG_URL}config.png`,
  //   permission: ['configure_protocol', 'configure_energy']
  // },
  // {
  //   title: '设备管理',
  //   name: 'deviceManage',
  //   children: [
  //     { title: '设备类型管理', name: 'type', permission: ['device_type'] },
  //     { title: '设备品牌管理', name: 'brand', permission: ['device_brand'] },
  //     { title: '设备型号管理', name: 'model', permission: ['device_model'] },
  //     {
  //       title: '设备模型管理',
  //       name: 'pointModel',
  //       permission: ['point_model'],
  //       children: [
  //         {
  //           title: '点位列表',
  //           name: 'pointList',
  //           hidden: true,
  //           showBack: true,
  //           children: [
  //             { title: '点位详情', name: 'detail', hidden: true, showBack: true },
  //             { title: '添加/编辑录入点位', name: 'create', hidden: true },
  //             { title: '添加/编辑虚拟点位', name: 'createVirtual', hidden: true },
  //             { title: '添加/编辑采集点位', name: 'createCollect', hidden: true }
  //           ]
  //         }
  //       ]
  //     }
  //   ],
  //   icon: `${window.STATIC_IMG_URL}device.png`,
  //   permission: ['device_brand', 'device_type', 'device_model', 'point_model']
  // },
  {
    title: '客户管理',
    name: 'customManage',
    children: [
      {
        title: '客服中心',
        name: 'service',
        children: [{ title: '历史记录', name: 'history', hidden: true, showBack: true }]
      },
      {
        title: '客户信息审核',
        name: 'verify',
        permission: ['customer_verify'],
        children: [{ title: '审核详情', name: 'detail', hidden: true, showBack: true }]
      },
      {
        title: '客户列表',
        name: 'customList',
        children: [
          { title: '客户订单管理', name: 'customOrder', hidden: true, showBack: true },
          { title: '企业详情', name: 'customBasicInfo', hidden: true, showBack: true }
        ]
      },
      {
        title: '客户信息管理',
        name: 'manage',
        permission: [
          'customer_history',
          'customer_add',
          'customer_edit',
          'customer_toggle_activate',
          'customer_toggle_frozen',
          'customer_sales_point',
          'customer_admin_point'
        ],
        children: [
          { title: '客户信息录入', name: 'edit', hidden: true },
          {
            title: '审核详情',
            name: 'detail',
            hidden: true,
            showBack: true,
            children: [{ title: '账号列表', name: 'account', hidden: true, showBack: true }]
          },
          { title: '客户软件服务', name: 'software', hidden: true, showBack: true }
        ]
      },
      // {
      //   title: '订单管理',
      //   name: 'orderManage',
      //   children: [{ title: '订单详情', name: 'detail', hidden: true, showBack: true }]
      // },
      {
        title: '客户订单管理',
        name: 'order',
        permission: ['order_add', 'order_cancel', 'order_software'],
        children: [
          { title: '订单详情', name: 'detail', hidden: true, showBack: true },
          { title: '新订单', name: 'create', hidden: true }
        ]
      }
    ],
    icon: `${window.STATIC_IMG_URL}user.png`,
    permission: [
      'customer_verify',
      'customer_service',
      'customer_history',
      'customer_add',
      'customer_edit',
      'customer_toggle_activate',
      'customer_toggle_frozen',
      'customer_sales_point',
      'customer_admin_point',
      'order_add',
      'order_cancel',
      'order_software'
    ]
  },
  {
    title: '订单管理',
    name: 'orderManage',
    children: [
      // { title: '订单列表', name: 'list', showBack: true },
      { title: '订单详情', name: 'detail', hidden: true, showBack: true }
    ],
    // icon: `${window.STATIC_IMG_URL}order.png`
    icon: `${window.STATIC_IMG_URL}hardware.png`,
  },
  {
    title: '碳基础信息维护',
    name: 'carbonMaintenance',
    children: [],
    icon: `${window.STATIC_IMG_URL}release.png`
  },
  {
    title: '碳资产管理',
    name: 'carbonAssetManage',
    children: [],
    icon: `${window.STATIC_IMG_URL}device.png`
  },
  {
    title: '排放因子数据库',
    name: 'EmissionFactorDatabase',
    children: [],
    icon: `${window.STATIC_IMG_URL}query.png`
  },
  {
    title: '代理商管理',
    name: 'agentManage',
    children: [
      { title: '代理商列表', name: 'agentList', children: [
        { title: '基本信息', name: 'basicInfo', hidden: true, showBack: true },
      ] },
      { title: '成交统计', name: 'trade', children: [] }
    ],
    icon: `${window.STATIC_IMG_URL}agent.png`
  },
  // {
  //   title: '产品发布',
  //   name: 'productPublish',
  //   icon: `${window.STATIC_IMG_URL}release.png`,
  //   permission: ['publish']
  // },
  // {
  //   title: '咨询反馈',
  //   name: 'feedback',
  //   children: [
  //     {
  //       title: '我的工单',
  //       name: 'workOrder',
  //       permission: ['work_order'],
  //       children: [
  //         { title: '工单详情', name: 'detail', hidden: true, showBack: true },
  //         { title: '工单处理', name: 'handle', hidden: true }
  //       ]
  //     }
  //   ],
  //   icon: `${window.STATIC_IMG_URL}feedback.png`,
  //   permission: ['work_order']
  // },
  // {
  //   title: '日志查询',
  //   name: 'operationLog',
  //   icon: `${window.STATIC_IMG_URL}query.png`,
  //   permission: ['log']
  // }
];

export default {
  name: 'manager',

  mixins: [MenuMixin],

  components: {
    ContentHeader,
    SiderMenu
  },

  data() {
    // 菜单结构转化
    function traversalMenu(menu) {
      if (menu.children === undefined) {
        menu.children = [];
      }
      for (let strField of ['view', 'type', 'icon']) {
        if (menu[strField] === undefined) {
          menu[strField] = '';
        }
      }
      for (let subMenu of menu.children) {
        traversalMenu(subMenu);
      }
    }
    for (let menu of menus) {
      traversalMenu(menu);
    }
    return {
      menus,
      logo: '../../assets/logo.png',
      prefix: '/manager',
      selectModel: '',
      dropdownMenuItems: [
        {
          title: '修改密码',
          icon: `${this.STATIC_IMG_URL}edit.png`,
          type: 'edit',
          key: 'modify_password'
        },
        {
          title: '退出登录',
          icon: `${this.STATIC_IMG_URL}logout.png`,
          type: 'logout',
          key: 'logout'
        }
      ],
      siderWidth: 220
    };
  },

  created() {
    this.initMenus();
    // window.onresize = () => {
    //   // this.siderWidth = document.body.clientWidth > 1440 ? 256 : 180;
    // };
  },
  mounted() {
    // this.siderWidth = document.body.clientWidth > 1440 ? 256 : 180;
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapGetters(['hasPermission']),
    isShowCrumb() {
      return this.$route.path !== '/manager/home';
    },
    foldName() {
      return this.isCollapsed ? 'menu-unfold' : 'menu-fold';
    },
    username() {
      if (this.userInfo) {
        return this.userInfo.name;
      }
      return '';
    },
    avatarUrl() {
      return `${window.STATIC_IMG_URL}user-header.png`;
    }
  },

  watch: {
    menus(val) {
      this.menuGroup = new MenuGroup(this.menus, this.prefix, null);
      this.initMenus();
    }
  },

  // 主要为了向子组件注册函数
  provide() {
    return {
      getManageCrumbMenus: () => {
        return this.crumbMenus;
      },
      setCurrentTitle: (title) => {
        if (this.crumbMenus && this.crumbMenus) {
          this.crumbMenus[this.crumbMenus.length - 1].title = title;
          this.crumbMenus[this.crumbMenus.length - 1].subTitle = title;
        }
      }
    };
  },

  methods: {
    ...mapMutations({
      clearStore: MutationTypes.CLEAR_STORE
    }),
    // 检查菜单权限
    checkMenuPermission(menu) {
      if (menu.permission) {
        menu.hidden = true;
        for (let perm of menu.permission) {
          if (this.hasPermission(perm)) {
            menu.hidden = false;
            break;
          }
        }
      }
      if (menu.children) {
        for (let subMenu of menu.children) {
          this.checkMenuPermission(subMenu);
        }
      }
    },
    // 初始化菜单管理类
    initMenuGroups() {
      for (let menu of this.menus) {
        this.checkMenuPermission(menu);
      }
      this.menuGroup = new MenuGroup(this.menus, this.prefix, null);
    },
    isHasChildren(menu) {
      return menu.children && menu.children.length > 0;
    },
    onClickCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    // 菜单展开
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find((key) => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    // 下拉菜单处理函数
    onDropdownMenuSelected(menuKey) {
      if (menuKey === 'logout') {
        new ComponentUtil(this.$store).create({
          cls: ConfirmModal,
          clsprops: {
            pVisible: true,
            pContent: '确定签退%s吗？',
            pKeyWord: this.userInfo.name
          },
          on: {
            confirm: () => {
              this.logout();
            }
          }
        });
      } else if (menuKey === 'modify_password') {
        this.modifyPassword();
      }
    },
    logout() {
      let api = this.$apiUtil.getAuthApi();
      api
        .logout({ ...this.userInfo })
        .then(() => {
          this.clearStore();
          this.$router.push('/login');
        })
        .catch(() => { });
    },
    modifyPassword() {
      new ComponentUtil(this.$store).create({
        cls: ModifyPassword,
        clsprops: {
          pIsShow: true
        }
      });
    },
    checkShowBack() {
      let path = this.$route.path;
      let currentMenu = this.menuGroup.getMenuByPath(path, false);
      return currentMenu && currentMenu.data.showBack;
    },
    onClickBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less">
@import 'variables.less';

.m-container {
  width: 100%;
  height: 100%;
  background-color: @body-bg;
  position: relative;

  .m-content {
    position: absolute;
    left: 220px;
    top: 0px;
    right: 0px;
    bottom: 0px;

    &-collapsed {
      left: 80px;
    }

    &-content {
      height: 1008px;
    }

    &-view {
      // height: 952px;
      height: calc(100% - 50px);
      position: relative;
      overflow-y: auto;
      overflow-x: hidden;
    }

    &-view-max {
      // height: 1008px;
      height: 100%;
    }
  }
}

.m-left-sider {
  background: #333647;
  height: 100%;
  overflow-y: auto;
  background: @primary;

  &-header {
    height: 48px;
    width: 100%;
    background-color: @primary;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 40px;
    }
  }

  // &-footer {
  //   height: 160px;
  //   // line-height: 90px;
  //   padding: 5px 20px;
  //   font-size: @font-size-big;
  //   color: @white;
  //   bottom: 0;
  // }
  &-footer {
    padding: @space-size-mini 31px;
    font-size: @font-size-big;
    color: @white;
    position: absolute;
    bottom: 0px;
    height: 50px;
    display: flex;

    >img {
      width: 20px;
      height: 20px;
    }

    >img:not(:first-child) {
      margin-left: 20px;
    }

    &-footer-collapse {
      height: 120px;
      flex-direction: column;
      padding: 9px 28px;

      >img:not(:first-child) {
        margin-top: 15px;
        margin-bottom: 0px;
        margin-left: 0px;
      }
    }
  }
}

.m-sider-menu {
  background: #333647;
}

.ant-menu-submenu-title {
  color: #bbc2ce;
}

.m-breadcrumb {
  height: 48px;
  width: 100%;
  /*margin-bottom: 5px;*/
  display: flex;
  align-items: center;
  padding: 0px 24px;
  justify-content: space-between;

  .ant-breadcrumb-separator {
    margin: 0 16px;
    font-size: 14px;
    width: 1px;
  }
}

/*.back-icon {*/
/*width: 16px;*/
/*height: 16px;*/
/*margin-right: 5px;*/
/*background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA1UlEQVQ4T7WTMUpDURBFz2mtI4ILsLWyM5CQzmAj6Cp0BTapLLIBS6sUsRZs4xKEVKmzjysPEnnR/w0x5HXDcM/M3Jknez731HM4QJJX9W5bh40dFDFwrPZ3BqzEt8BsZ0Alrgs/Ax/qtKmb7xFaxLXmXb36CakBQ6DMfvTX3OqGbxtBkgEwAU6KB8AcOAW6xdQV+FF9Whf5tYUkl8ALsKxNTHIDPAA94Fp9K5C2NV4A46YtJBkBHfW+FVASSc7VzyY/CkQtoP+fcpIzdXG4v7DthNf5L6SZQREcd2lgAAAAAElFTkSuQmCC');*/
/*}*/
</style>
