<script>
import box from './box'

export default {
  name: 'vbox',
  extends: box,
  props: {
  },
  computed: {
  },
  data() {
    return {}
  },
  methods: {
    getDirection() {
      return 'vertical'
    },
    getFlexDirection() {
      if (!this.pReverse) {
        return 'column'
      } else {
        return 'column-reverse'
      }
    },
  }
}
</script>
<style>
</style>
