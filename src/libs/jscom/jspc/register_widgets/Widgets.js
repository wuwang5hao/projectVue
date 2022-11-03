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
