import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)
const state = {
  userOauth: { token: '' }, // 用户登录信息
  userInfo: {}, // 用户信息
  loginInfo: {},
  modalArr: [],
  loading: false,
}
// const temporaryStorage= {
//   tPage: {
//     pageNum: 0,
//     pageSize: 0
//   }
// }

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  // temporaryStorage
})
