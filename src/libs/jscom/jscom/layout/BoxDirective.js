import {RuntimeError} from "../core/exceptions";

export default {
  bind (el, binding, vnode) {
    if (binding.arg === 'grow') {
      let val = binding.value
      if (!val) { val = '1' }
      el.style['flex-grow'] = val
      if (el.style['flex-shrink'] === undefined) {
        el.style['flex-shrink'] = val
      }
    } else if (binding.arg === 'shrink') {
      let val = binding.value
      if (!val) { val = '1' }
      el.style['flex-shrink'] = val
    } else if (binding.arg === 'width') {
      el.style['width'] = binding.value
    } else if (binding.arg === 'height') {
      el.style['height'] = binding.value
    } else if (binding.arg === 'padding') {
      el.style['padding'] = binding.value
    } else if (binding.arg === 'margin') {
      el.style['margin'] = binding.value
    } else if (binding.arg === 'pt') {
      el.style['padding-top'] = binding.value
    } else if (binding.arg === 'pr') {
      el.style['padding-right'] = binding.value
    } else if (binding.arg === 'pb') {
      el.style['padding-bottom'] = binding.value
    } else if (binding.arg === 'pl') {
      el.style['padding-left'] = binding.value
    } else if (binding.arg === 'mt') {
      el.style['margin-top'] = binding.value
    } else if (binding.arg === 'mr') {
      el.style['margin-right'] = binding.value
    } else if (binding.arg === 'mb') {
      el.style['margin-bottom'] = binding.value
    } else if (binding.arg === 'ml') {
      el.style['margin-left'] = binding.value
    } else {
      throw new RuntimeError(`not support arg ${binding.arg}`)
    }
  }
}
