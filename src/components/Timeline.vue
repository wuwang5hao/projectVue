<template>
  <a-timeline>
    <a-timeline-item v-for="(item, index) in pItemList"
      :key="index">
      <div class="tl-item">
        <p class="tl-item-time">{{ item.datetime }}</p>
        <p class="tl-item-content">{{ item.desc }}</p>
      </div>
      <div slot="dot" :class="index === 0 ? 'tl-first-dot' : 'tl-dot'">
        <div class="tl-dot"></div>
      </div>
    </a-timeline-item>
  </a-timeline>
</template>

<script>
/*
 * 时间轴组件
 */
export default {
  name: 'Timeline',

  props: {
    pItemList: Array
  },

  methods: {
    getColor (color) {
      if (color === 'red') {
        return '#FF6F7B'
      } else if (color === 'green') {
        return '#00E3B3'
      } else if (color === 'yellow') {
        return '#F7B500'
      } else {
        return '#739DFF'
      }
    }
  }
}
</script>

<style lang="less">
@import 'variables.less';
.tl-item {
  background-color: #FAFAFD;
  width: 242px;
  // height: 85px;
  line-height: 22px;
  padding: 14px 28px;
  border-radius: 6px;
  p {
    margin-bottom: 0px
  }
  p:first-child {
    margin-bottom: 14px;
  }
  &-time {
    color: #595959;
    font-size: 14px;
  }
  &-content {
    color: #9B9B9B;
  }
}
.ant-timeline-item-tail {
  top: calc(50% - 20px);
}
.ant-timeline-item-head-custom {
  top: calc(50% - 20px);
}
.tl-dot {
  width: 10px;
  height: 10px;
  background: rgba(2,197,224,1);
  border-radius: 10px;
}
.tl-first-dot {
  width: 12px;
  height: 12px;
  border-radius: 10px;
  border: 1px solid rgba(2, 197, 224, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  .tl-dot {
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background: rgba(2, 197, 224, 1);
  }
}
</style>
