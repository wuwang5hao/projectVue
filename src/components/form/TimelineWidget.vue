<template>
  <div>
    <Timeline class="timeline" :pItemList="records"></Timeline>
  </div>
</template>

<script>
/**
 * 时间轴控件
 */
import Timeline from '@/components/Timeline'
import BaseWidget from "./BaseWidget";

export default {
  name: 'TimelineWidget',

  extends: BaseWidget,
  supportReadonly: true,

  components: {
    Timeline
  },

  data() {
    return {
    }
  },

  computed: {
    records () {
      return this.pJsonModel[this.pField.name]
    }
  },

  methods: {
    /**
     * 支持类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['obj_list']
    },
  }
}
</script>
<style lang="less" scoped>
.timeline {
  text-align: left;
}
</style>
