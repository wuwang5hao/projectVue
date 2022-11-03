// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './PublicPath'
import Vue from 'vue'
import VueRouter from 'vue-router';
import { init } from'@/common/BaseMain'
import '@/company/styles/theme/company.less'
import ApiUtil from '@/company/apis/ApiUtil'
import App from './App'
import routes from './router'
import store from './store/store'

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   store,
//   components: { App },
//   template: '<App/>',
// });
Vue.use(VueRouter)
let router = null;
let instance = null;

function render() {
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/companyapp' : '/',
    mode: 'history',
    routes,
  });

  init(store, router)

  // 注册ApiUtil组件，this.$apiUtil调用
  ApiUtil.install(store, router)

  instance = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
  });
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[company] vue app bootstraped');
}

export async function mount(props) {
  console.log('[company] props from main framework', props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}
