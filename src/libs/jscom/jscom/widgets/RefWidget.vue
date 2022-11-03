<script>
import {BaseWidget} from './BaseWidget'

export default {
  name: 'RefWidget',
  functional: true,
  props: {
    value: [String, Number, Object, Array, Boolean],
    pName: String,
    pProps: {
      type: Object,
      default: () => { return {} }
    },
    pOn: {
      type: Object,
      default: () => { return {} }
    }
  },
  watch: {
    value(val) {
      this.pProps.value = val
    }
  },
  render: (h, ctx) => {
    let widget = BaseWidget.Create(ctx.props.pName)
    if (ctx.props.value !== undefined) {
      ctx.props.pProps['value'] = ctx.props.value
      ctx.props.pOn['input'] = (value) => {
        ctx.$emit('input', value)
      }
    }
    let params = {props: ctx.props.pProps, on: ctx.props.pOn}
    params['children'] = ctx.children
    params['ctx'] = ctx
    return widget.render(h, params)
  }
}
</script>
