<template>
  <div>
    <Expand
      :pRender="column.render"></Expand>
    <Button @click="OnBtnClicked">Test</Button>
  </div>
</template>
<script>
import Expand from 'jscom/widgets/Expand'
export default {
  name: 'TestExpandPage',
  components: {Expand},
  data() {
    return {
      ctx: null,
      column: {
        render: (h, params, ctx) => {
          console.log('render...')
          this.ctx = ctx
          return h('Input', {
            ref: 'expandInput',
            props: {
              value: 'test value'
            }
          })
        }
      }
    }
  },
  methods: {
    getExpandRef() {
      let ref = this.$refs.expandInput
      console.log(ref)
    },
    OnBtnClicked() {
      console.log('OnBtnClicked')
      this.getExpandRef()
    }
  },
}
</script>
