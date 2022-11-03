<script>
export default {
  name: 'FieldWidget',
  props: {
    pColumn: Object,
    pCtx: Object,
    pForm: Object,
    pTable: Object,
  },
  data() {
    return {
    }
  },
  render(h) {
    this.widget = this.pColumn.genWidget(this.pTable, this.pCtx)
    let renderEle = this.widget.getRender(h, {
      onInput: this.onInput,
      hideLabel: true,
      isGetBlur: true,
      onOpenChange: this.onOpenChange
    })
    this.$nextTick(() => {
      if (renderEle.context.$refs.Input) {
        renderEle.context.$refs.Input.focus()
      }
    })
    return renderEle
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)
    },
    onOpenChange (value) {
      this.$emit('on-open-change', value)
    },
    validate(onValid) {
      this.pForm.validate((valid) => {
        if (onValid) {
          onValid(valid, this.widget)
        }
      })
    }
  }
}
</script>
