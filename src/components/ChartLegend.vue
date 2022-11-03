<template>
  <div>
    <p v-if="pTitle" class="cl-title">{{ pTitle }}</p>
    <a-row class="cl-footer" type="flex" justify="space-between">
    <div class="cl-item" v-for="legend in pDatas" :key="legend.title">
      <p class="cl-value">{{ legend.value }}&nbsp;
        <span class="cl-unit">{{ legend.unit }}</span>
      </p>
      <div class="cl-desc">
        <p class="cl-dot" :style="getDotStyle(legend.color)"></p>
        &nbsp;{{ legend.title }}
      </div>
    </div>
  </a-row>
  </div>
</template>

<script>
/**
 * @vue-props {Array} pDatas - 图例数据
 */
export default {
  name: 'ChartLegend',

  props: {
    pDatas: {
      type: Array,
      default () {
        return []
      }
    },
    pTitle: String
  },

  methods: {
    getDotStyle (color) {
      return `background-color: ${color}`
    }
  }
}
</script>

<style lang="less">
@import 'variables.less';
.cl-title {
  color: @title-color;
  text-align: center;
  margin-bottom: 0px;
}
.cl-item {
  text-align: center;
  position: relative;
  flex: 1;
}
.cl-item:first-child {
  text-align: left;
}
.cl-item:last-child {
  text-align: right;
}
.cl-item:not(:last-child)::after {
  content: ' ';
  width: 2px;
  height: 24px;
  border-right: 1px solid #F2F3F7;
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
}
.cl-total {
  .cl-value {
    font-size: @h4-font-size;
  }
}
.cl-desc {
  font-size: @font-size-small;
  color: @text-color;
  margin-bottom: 0px;
}
.cl-value {
  font-size: @font-size-huge;
  color: @title-color;
  font-weight: bold;
  margin-bottom: 5px;
  line-height: 1;
}
.cl-unit {
  font-size: @font-size-small;
  color: @disabled-color;
}
.cl-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
  margin: auto;
}
.cl-footer {
  padding-bottom: 10px;
}
</style>
