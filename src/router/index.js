import Vue from 'vue';
import Router from 'vue-router';
import { baseRoutes } from '@/common/BaseRoutes';
import Login from '@/views/login';
import Manager from '@/views/manager';
import Homepage from '@/views/homepage/homepage';

// 企业信息审核
import EnterpriseVerify from '@/views/CustomManage/UserInfoVerify';
// import EnterpriseDetail from '@/views/CustomManage/EnterpriseDetail';
import EnterpriseDetail from '@/views/CustomManage/UserInfoVerify/VerifyDetail';
import OrderManage from '@/views/CustomManage/OrderManage/index';
import OrderDetail from '@/views/CustomManage/OrderManage/OrderDetail';
import EnterpriseService from '@/views/CustomManage/EnterpriseService';
import EnterpriseServiceReplyHistory from '@/views/CustomManage/EnterpriseServiceReplyHistory';
import CustomList from '@/views/CustomManage/CustomList';
import CustomBasicInfo from '@/views/CustomManage/CustomBasicInfo';
import CustomOrder from '@/views/CustomManage/CustomOrder';

// 碳基础信息维护
import CarbonMaintenance from '@/views/CarbonMaintenance/CarbonMaintenance';
// 碳资产管理
import CarbonAssetManage from '@/views/CarbonAssetManage/CarbonAssetManage';
// 排放因子数据库
import EmissionFactorDatabase from '@/views/EmissionFactorDatabase/EmissionFactorDatabase';
// 代理商列表
import AgentManageList from '@/views/AgentManage/AgentList';
import AgentBasicInfo from '@/views/AgentManage/AgentBasicInfo';
import TradeTotal from '@/views/AgentManage/TradeTotal';

Vue.use(Router);

let requiresAuth = true;
if (process.env.USERNAME === 'netsec') {
  requiresAuth = false;
}

export default new Router({
  routes: [
    ...baseRoutes,
    {
      path: '',
      redirect: '/manager/home'
    },
    {
      path: '/manager',
      component: Manager,
      meta: { requiresAuth },
      children: [
        {
          path: 'home',
          component: Homepage,
          meta: { requiresAuth }
        },
        {
          path: 'customManage/verify',
          component: EnterpriseVerify,
          meta: { requiresAuth }
          // props: route => ({ pCompanyId: route.params.companyId })
        },
        {
          path: 'customManage/verify/detail/:companyId',
          component: EnterpriseDetail,
          meta: { requiresAuth },
          props: route => ({ pCompanyId: route.params.companyId })
        },
        {
          path: 'customManage/service/:contactUsId?',
          component: EnterpriseService,
          meta: { requiresAuth },
          props: route => ({ pContactUsId: route.params.contactUsId })
        },
        {
          path: 'customManage/service/history/:contactUsId',
          component: EnterpriseServiceReplyHistory,
          meta: { requiresAuth },
          props: route => ({ pContactUsId: route.params.contactUsId })
        },
        {
          path: 'orderManage',
          component: OrderManage,
          meta: { requiresAuth }
        },
        {
          path: 'orderManage/detail',
          component: OrderDetail,
          meta: { requiresAuth }
        },
        {
          path: 'customManage/customList/customBasicInfo',
          component: CustomBasicInfo,
          meta: { requiresAuth }
        },
        {
          name: 'customList',
          path: 'customManage/customList',
          component: CustomList,
          meta: { requiresAuth }
        },
        {
          path: 'customManage/customList/customOrder',
          component: CustomOrder,
          meta: { requiresAuth }
        },
        {
          path: 'carbonMaintenance',
          component: CarbonMaintenance,
          meta: { requiresAuth }
        },
        {
          path: 'carbonAssetManage',
          component: CarbonAssetManage,
          meta: { requiresAuth }
        },
        {
          path: 'EmissionFactorDatabase',
          component: EmissionFactorDatabase,
          meta: { requiresAuth }
        },
        {
          path: 'agentManage/agentList',
          component: AgentManageList,
          meta: { requiresAuth }
        },
        {
          path: 'agentManage/agentList/basicInfo',
          component: AgentBasicInfo,
          meta: { requiresAuth }
        },
        {
          path: 'agentManage/trade',
          component: TradeTotal,
          meta: { requiresAuth }
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/click/:token',
      component: Login,
      props: route => ({ pToken: route.params.token })
    }
  ],
  mode: 'history'
});
