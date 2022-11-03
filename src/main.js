// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import { init } from'@/common/BaseMain'
import '@/styles/theme/backbone.less'
import ApiUtil from '@/apis/ApiUtil'
import BaseTable from "@/components/table/BaseTable";
import BaseForm from "@/components/form/BaseForm";
import ModalForm from "@/components/form/ModalForm";
import Expand from "jscom/widgets/Expand";
import BaseModal from "@/components/BaseModal";
import Clipboard from 'v-clipboard';
import store from './store/store'
import App from './App';
import router from './router';


Vue.use(Clipboard);

Vue.component('BaseTable', BaseTable)
Vue.component('BaseForm', BaseForm)
Vue.component('ModalForm', ModalForm)
Vue.component('Expand', Expand)
Vue.component('BaseModal', BaseModal)


window.Vue = Vue

init(store, router)
// 注册ApiUtil组件，this.$apiUtil调用
ApiUtil.install(store, router)

Vue.directive('perm', {
  bind (el, binding) {
    if (!store.getters.hasPermission(binding.value)) {
      el.style = 'display: none'
    }
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
