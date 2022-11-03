<template>
  <div :class="['cc-container', pClass]">
    <div class="cc-title" v-if="pIsShowTitle">
      <slot name="title">
        <span>{{ pTitle }}</span>
      </slot>
      <div v-if="pIsShowMore" class="cc-more" @click="onClickMore">
      更多&nbsp;<a-icon type="right" /></div>
    </div>
    <div :class="['cc-content', {'cc-content-column': pColumn}]">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * @vue-prop {String} pClass - 最外围样式
 * @vue-prop {Boolean} pIsShowTitle - 是否显示标题，默认不显示
 * @vue-prop {String} pTitle - 标题
 * @vue-prop {Boolean} pColumn  - flex的按列分布
 * @vue-prop {Boolean} pIsShowMore - 是否显示‘更多’，默认不显示
 * @vue-event {null} on-more - 点击‘更多’
 */
export default {
  name: 'ContentContainer',
  props: {
    pClass: String,
    pIsShowTitle: Boolean,
    pTitle: String,
    pColumn: Boolean,
    pIsShowMore: Boolean
  },

  methods: {
    onClickMore () {
      this.$emit('on-more')
    }
  }
}
</script>

<style lang="less">
@import 'variables.less';
.cc-container {
  border-radius: 8px;
  background-color: @white;
  padding: 20px 0px 0px 0px;
  box-shadow:0px 7px 24px 1px rgba(233,235,243,0.63);
}
.cc-title {
  font-size: 16px;
  padding: 0px 25px 15px 25px;
  border-bottom: 1px @divider-color solid;
  font-weight: @font-weight-medium;
  font-family: 'SourceHanSansCN-Medium,SourceHanSansCN';
  color: #181818;
  display: flex;
  justify-content: space-between;
}
.cc-more {
  color: @comment-color;
  text-align: right;
  padding-right: @space-size-base;
  margin-bottom: @space-size-mini;
}
.cc-content {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  &-column {
    flex-direction: column;
  }
}
</style>
