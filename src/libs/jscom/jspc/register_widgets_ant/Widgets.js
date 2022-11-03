import {BaseWidget} from "jscom/widgets/BaseWidget";

class ButtonWidget extends BaseWidget {
  render(h, params = {}) {
    return h('a-button', {
      props: params.props,
      on: params.on,
    }, params.children)
  }
}

class DrawerWidget extends BaseWidget {
  render(h, params = {}) {
    let props = params.props
    let on = params.on
    if ('value' in props) {
      props.visible = props.value
      delete props.value
      params['on']['close'] = () => {
        if (params.ctx) {
          params.ctx.listeners.input(false)
        }
      }
    }

    // TODO:
    // if ('on-visible-change' in on) {
    //   params['on']['close'] = () => {
    //     if (params.ctx) {
    //     }
    //   }
    // }

    if (typeof props.width === 'number') {
      props.width = `${props.width}%`
    }
    return h('a-drawer', {
      props: params.props,
      on: params.on,
    }, params.children)
  }
}

export function install() {
  BaseWidget.register(ButtonWidget, 'ButtonWidget')
  BaseWidget.register(DrawerWidget, 'DrawerWidget')
}
