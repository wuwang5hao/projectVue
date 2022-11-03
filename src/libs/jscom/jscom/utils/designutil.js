class DesignUtil {
  callObservers(observers, method, args) {
    let ret = false
    if (!observers || observers.length === 0) return
    for (let observer of observers.slice(0)) {
      if (observer && observer[method]) {
        ret |= observer[method](...args)
      }
    }
    return ret
  }
  safeCall(obj, method, args, defval=null) {
    if (!obj) return defval
    if (!obj[method]) return defval
    return obj[method](...args)
  }
}

export var designUtil = new DesignUtil()
