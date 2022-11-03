import { sysUtil } from "jscom/utils/sysutil"
import MutationTypes from './MutationTypes'

export default {
  [MutationTypes.SET_USEROAUTH] (state, userOauth) {
    state.userOauth = { ...userOauth }
    sysUtil.setLocalStore('userOauth', state.userOauth, true)
  },

  [MutationTypes.INIT_USEROAUTH] (state) {
    let strUserOauth = sysUtil.getLocalStore('userOauth', true)
    if (!strUserOauth) {
      console.warn('cannot get userOauth from local store')
      return
    }

    state.userOauth = JSON.parse(strUserOauth)
    if (!state.userOauth) {
      state.userOauth = {}
    }
  },

  [MutationTypes.CLEAR_USEROAUTH] (state) {
    state.userOauth = {}
    sysUtil.removeLocalStore('userOauth', true)
  },

  [MutationTypes.CLEAR_USEROAUTH] (state) {
    state.userOauth = {}
    sysUtil.removeLocalStore('userOauth', true)
  },

  [MutationTypes.INIT_USERINFO] (state, userInfo) {
    let strUserInfo = sysUtil.getLocalStore('userInfo', true)
    if (!strUserInfo) {
      console.warn('cannot get userInfo from local store')
      return
    }

    state.userInfo = JSON.parse(strUserInfo)
    if (!state.userInfo) {
      state.userInfo = {}
    }
  },

  [MutationTypes.SET_USERINFO] (state, userInfo) {
    state.userInfo = { ...userInfo }
    sysUtil.setLocalStore('userInfo', state.userInfo, true)
  },

  [MutationTypes.CLEAR_USERINFO] (state) {
    state.userInfo = {}
    sysUtil.removeLocalStore('userInfo', true)
  },

  [MutationTypes.INIT_STORE] (state) {
    this.commit(MutationTypes.INIT_USEROAUTH)
    this.commit(MutationTypes.INIT_USERINFO)
  },

  [MutationTypes.CLEAR_STORE] (state) {
    this.commit(MutationTypes.CLEAR_USEROAUTH)
  },

  [MutationTypes.SET_LOADING] (state, payload) {
    state.loading = payload.loading
  }
}
