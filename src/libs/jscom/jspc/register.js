import { install as Widgets_install } from './register_widgets/Widgets'
import { install as Widgets_ant_install } from './register_widgets_ant/Widgets'
import {RuntimeError} from "jscom/core/exceptions"

export function install(widgetType='iview') {
  if (widgetType === 'iview') {
    Widgets_install()
  } else if (widgetType === 'ant-design') {
    Widgets_ant_install()
  } else {
    throw new RuntimeError(`unknown widgetType ${widgetType}`)
  }
}

