<template>
  <div :style="{width: '250px'}">
    <ellipsis
      text="这是一句很长的话，真的很长很长很长,到底有多长呢，你来猜猜看"
      :line-num="2"
      tagName="p"
      :fontWeight="100"
      fontSize="16px"
      :left="left"
      :leftRender="leftRender"
      :isImmediate="false"
    />
  </div>
</template>
<script>

import ellipsis from 'jscom/widgets/ellipsis'
export default {
  name: 'TestEllipsis',
  components: {ellipsis},
  data() {
    return {
      left: '<span class="bm-info-window-btn">...' + this.$t('more') + '</span>'
    }
  },
  methods: {
    leftRender(h, params) {
      return h('span', {
        props: {
          'class': 'bm-info-window-btn'
        },
        on: {
          'click': () => { alert('more clicked') }
        }
      }, '...' + this.$t('more'))
    }
  }
}
</script>

<style>
  .bm-info-window-btn {
    cursor: pointer;
  }
</style>
