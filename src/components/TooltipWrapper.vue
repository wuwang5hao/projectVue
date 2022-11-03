<template>
  <ATooltip
    class="tw-tooltip"
    overlayClassName="tw-tooltip"
  >
    <span slot="title">
      {{ pText }}
    </span>
    <span>{{ pText }}</span>
  </ATooltip>
</template>

<script>
/*
 * 文字提示组件
 */
export default {
  name: 'TooltipWrapper',

  props: {
    pText: String
  },

  data () {
    return {

    }
  }
}
</script>

<style lang="less">
.tw-tooltip {
  .ant-tooltip-inner {
    font-size: 9px;
    font-family: 'SourceHanSansCN-Regular,SourceHanSansCN';
    font-weight:400;
    color:rgba(11,12,16,1);

    background-color:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(0,0,0,0.09);
  }
  .ant-tooltip-arrow::before {
    background-color:rgba(255,255,255,1);
  }
}
</style>
