export default {
  isLogin (state) {
    return state.userOauth && state.userOauth.token
  },
  hasPermission (state) {
    return (permission) => {
      if (state.userInfo && state.userInfo.actions) {
        return state.userInfo.actions.indexOf(permission) !== -1
      } else {
        return false
      }
    }
  },
  actions (state) {
    if (state.userInfo && state.userInfo.actions) {
      return state.userInfo.actions
    } else {
      return []
    }
  }
}
