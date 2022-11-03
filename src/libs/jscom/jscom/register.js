import { arrUtil } from "jscom/utils/arrutil"
import { mapUtil } from "jscom/utils/maputil"
import { objUtil } from "jscom/utils/objutil"
import { strUtil } from "jscom/utils/strutil"
import { dtUtil, sysUtil } from "jscom/utils/sysutil"
import { designUtil } from 'jscom/utils/designutil'
import { VueUtil } from 'jscom/utils/vueutil'
import { install as layoutInstall } from './layout/register'
import RefWidget from './widgets/RefWidget'

function addUtil(key, instance) {
  window.Vue.prototype[key] = instance
  window.Vue[key] = instance
  window[key] = instance
}

export function install(Vue) {
  window.Vue.component('RefWidget', RefWidget)
  addUtil('$arrUtil', arrUtil)
  addUtil('$mapUtil', mapUtil)
  addUtil('$objUtil', objUtil)
  addUtil('$strUtil', strUtil)
  addUtil('$dtUtil', dtUtil)
  addUtil('$sysUtil', sysUtil)
  addUtil('$designUtil', designUtil)
  layoutInstall(Vue)
}

export function installVue(router, store) {
  install()
  addUtil('$vueUtil', new VueUtil(router, store))
}
