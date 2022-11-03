import ModalForm from './ModalForm'
import Vue from 'vue'

function createModal(props, on) {
  const vobj = new Vue({
    render(h) {
      return h(ModalForm, {
        props: props,
        on: on,
      })
    },
    methods: {}
  });
  const component = vobj.$mount()
  document.body.appendChild(component.$el)
  const modal = vobj.$children[0]
  return modal
}

ModalForm.create = function(props = {}, on={}) {
  let modal = createModal(props, on)
  return {
    show(options={}) {
      if ('onClose' in options) {
        modal.onClose = options.onClose
      } else {
        modal.onClose = function() {
          modal.hide()
          document.body.removeChild(modal.$el)
        }
      }
      if ('onSubmitFinished' in options) {
        modal.onSubmitFinished = options.onSubmitFinished
      }
      modal.show()
    },
    hide() {
      modal.hide()
      document.body.removeChild(modal.$el)
    }
  }
}

export default ModalForm
