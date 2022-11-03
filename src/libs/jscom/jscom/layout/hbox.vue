<script>
import box from './box'

export default {
  name: 'hbox',
  extends: box,
  computed: {
  },
  data() {
    return {}
  },
  methods: {
    getDirection() {
      return 'horizontal'
    },
    getFlexDirection() {
      if (!this.pReverse) {
        return 'row'
      } else {
        return 'row-reverse'
      }
    },
  }
}
</script>
<style>
</style>
