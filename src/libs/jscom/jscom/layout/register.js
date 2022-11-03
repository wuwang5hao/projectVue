import BoxDirective from './BoxDirective'

export function install(Vue) {
  Vue.directive('box', BoxDirective)
}
