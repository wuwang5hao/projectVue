import {objUtil} from "jscom/utils/objutil"

export default {
  name: 'Expand',
  functional: true,
  props: {
    pRender: Function,
    pData: {type: Object},
  },
  render: (h, ctx) => {
    let data = objUtil.setdefault(ctx, 'data', {})
    if (ctx.data.staticClass) {
      objUtil.setdefault(data, 'class', {})[ctx.data.staticClass] = true
    }
    return ctx.props.pRender(h, ctx, ctx.props.pData)
  }
};
