import {RuntimeError} from "jscom/core/exceptions";
import {objUtil} from "jscom/utils/objutil";

export class BaseWidget {
  static BASE_WIDGET_MAP = {}
  static register (cls, name) {
    if (name in BaseWidget.BASE_WIDGET_MAP) {
      throw new RuntimeError(`widget name ${name} duplicate in WIDGET_MAP`)
    }
    BaseWidget.BASE_WIDGET_MAP[name] = cls
  }
  static Create(widgetName) {
    let Cls = objUtil.get(BaseWidget.BASE_WIDGET_MAP, widgetName, null)
    if (!Cls) {
      throw new RuntimeError(`can not create widget name: "${widgetName}"`)
    }
    let result = new Cls(widgetName)
    result.init()
    result.check()
    return result
  }

  // 基础类，描述控件渲染接口
  constructor (widgetName) {
    this.widgetName = widgetName
  }

  init() {}

  check() {
    // 检查 widget 是否正常
  }

  render(h, params={}) {
  }

  text() {
    // 控件的文字显示
  }

  reset() {
    // reset
  }

  OnDestroy() {
    // 当控件在弹出框，弹出框被关闭时调用，如 ModelForm
  }
}
