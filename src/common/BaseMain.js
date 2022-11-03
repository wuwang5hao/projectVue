// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sysUtil } from 'jscom/utils/sysutil'
import VueECharts from 'vue-echarts'
import hbox from 'jscom/layout/hbox'
import vbox from 'jscom/layout/vbox'
import Antd from 'ant-design-vue'
import { addUtil } from "jscom/utils/vueutil"
import settings from '../../config/settings'
import '../static/font/font.css'

Vue.component('VueECharts', VueECharts)
Vue.component('hbox', hbox)
Vue.component('vbox', vbox)

Vue.use(Antd);

// window.Vue = Vue;

Vue.config.productionTip = false;

// media and static settings
addUtil('settings', settings, Vue)
addUtil('STATIC_URL', settings.STATIC_URL, Vue)
addUtil('STATIC_IMG_URL', `${settings.STATIC_URL}img/`, Vue)

// 注册工具函数
function processApiError (error, defaultMsg) {
  let msg = defaultMsg
  if (sysUtil.isStringObject(error.msg)) {
    msg = error.msg
  }
  Vue.prototype.$message.error(msg)
}
Vue.prototype.$processApiError = processApiError
Vue.$processApiError = processApiError

export function init(store, router, checkCallback) {
  // 加载初始数据
  store.commit('INIT_STORE')
  // 统一判断登录状态并控制页面跳转
  router.beforeEach((to, from, next) => {
    if (to.matched.some((route) => {
      return route.meta.requiresAuth
    })) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!store.getters.isLogin) {
        console.warn(`beforeEach isNotLogin from: ${from.path} to: ${to.path}`)
        const redirectParams = {
          path: '/login',
          query: { redirect: to.fullPath }
        }
        window.location.href = `${window.location.origin}/login?redirect=${to.fullPath}`
        next(redirectParams)
      } else if (checkCallback) {
        if (checkCallback(to, from, next)) {
          next()
        }
      } else {
        next()
      }
    } else {
      next() // 确保一定要调用 next()
    }
  })
}
