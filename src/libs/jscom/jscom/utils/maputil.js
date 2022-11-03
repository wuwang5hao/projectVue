export class MapUtil {
  setdefault(mapObj, key, defval) {
    if (mapObj.has(key)) {
      return mapObj.get(key)
    } else {
      mapObj.set(key, defval)
      return defval
    }
  }
  get(mapObj, key, defval) {
    return mapObj.get(key) || defval
  }
  obj2map(obj) {
    return new Map(Object.entries(obj))
  }
}

export var mapUtil = new MapUtil()
