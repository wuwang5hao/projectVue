import { ComponentUtil } from 'jscom/utils/vueutil'

export default class CustomPopup {
  constructor(style='modal') {
    this.style = style
  }
  get styleWidget() {
    if (this.style === 'modal') { return 'Modal' }
    else if (this.style === 'drawer') { return 'Drawer' }
    else { return this.style }
  }
  create({store, render, popupProps}) {
    return new ComponentUtil().createCustom({
      vueprops: {
        data: {
          popupShow: true,
        },
        store: store
      },
      render: (h, vnode) => {
        vnode.$on('onClose', () => {
          vnode.popupShow = false
          if (popupProps.closeFunc) {
            popupProps.closeFunc()
          }
        })

        let popupPropsMerged = {
          value: vnode.popupShow,
          placement: 'right',
          closable: true,
          overlay: true,
        }
        Object.assign(popupPropsMerged, popupProps)
        let popupSelect = h(this.styleWidget, {
          props: popupPropsMerged,
          scopedSlots: {
            default(props) {
              return render(h, popupSelect)
            }
          },
          on: {
            input: function(value) {
              if (vnode.popupShow !== value && !value) {
                vnode.close()
              }
              vnode.popupShow = value
            }
          },
          methods: {
            close() {
              vnode.popupShow = false
              vnode.close()
            }
          }
        })
        return popupSelect
      }
    })
  }
}
