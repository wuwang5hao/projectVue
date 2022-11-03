import Vue from 'vue'
import store from '@/store/store';

export class DialogUtil {
  constructor(storeIn) {
    if (storeIn === undefined) {
      this.store = store
    } else {
      this.store = storeIn
    }
  }
  createModal(cls, props = {}) {
    let _this = this
    const vobj = new Vue({
      store: _this.store,
      render: (h) => {
        return h(cls, {
          props: props
        })
      },
      methods: {}
    });
    const component = vobj.$mount()
    document.body.appendChild(component.$el)
    const modal = vobj.$children[0]
    return {
      show(options = {}) {
        if ('onHide' in options) {
          modal.onHide = options['onHide']
        }
        if ('onOk' in options) {
          modal.onOk = options['onOk']
        }
        if ('onCancel' in options) {
          modal.onCancel = options['onCancel']
        }
        modal.show()
      },
      hide() {
        modal.hide()
      }
    }
  }
}

export default new DialogUtil()
