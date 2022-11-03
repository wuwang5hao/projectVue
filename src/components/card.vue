<template>
  <div class="card-container" :style="style">
    <div class="card-img"><img :src="pIcon" /></div>
    <p :class="['card-value', {'card-value-small': pIsSmall}]">
      {{ pValue }}&nbsp;<span class="card-unit">{{ pUnit }}</span>
    </p>
    <p :class="['card-desc', {'card-desc-small': pIsSmall}]">{{ pDesc }}</p>
  </div>
</template>

<script>
/**
 * @vue-prop {String} pBgImg - 背景图
 * @vue-prop {String} pIcon - 图标
 * @vue-prop {String} pTitle - 标题
 * @vue-prop {String} pValue - 值
 * @vue-prop {String} pDesc - 描述
 * @vue-computed {String} style - 背景图样式
 */
export default {
  name: 'card',

  props: {
    pBgImg: String,
    pIcon: String,
    pUnit: String,
    pValue: [Number, String],
    pDesc: String,
    pIsSmall: Boolean,
    pImageStyle: String
  },

  computed: {
    style () {
      return `background-image: url(${this.pBgImg}); background-size: 100% 100%;`
    }
  },

  data () {
    return {

    }
  }
}
</script>

<style lang="less">
@import 'variables.less';
.card-container {
  color: @white;
  position: relative;
  .card-img {
    width: 71px;
    height: 71px;
    position: absolute;
    top: 60px;
    left: 66px;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .card-unit {
    font-size: @font-size-large;
  }
  .card-value {
    font-size: 60px;
    width: 408px;
    position: absolute;
    top: 29px;
    left: 205px;
    text-align: left;
    font-weight: bold;
    font-family:'DINAlternate-bold';
    &-small {
      font-size: 50px;
      width: 171px;
      left: 170px;
      top: 41px;
      font-weight: normal;
    }
  }
  .card-desc {
    font-size: 26px;
    width: 408px;
    position: absolute;
    top: 109px;
    left: 205px;
    text-align: left;
    &-small {
      font-size: 20px;
      width: 171px;
      left: 172px;
      top: 110px;
    }
  }
}

@media screen and (max-width: @page-switch-width) {
  .card-container {
    .card-unit {
      font-size: @font-size-small;
    }
    .card-img {
      width: 50px;
      height: 50px;
      position: absolute;
      top: 28px;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .card-value {
      &-small {
        font-size: 36px;
        width: 141px;
        left: 116px;
        top: 29px;
      }
    }
    .card-desc {
      &-small {
        font-size: 14px;
        width: 141px;
        left: 118px;
        top: 73px;
      }
    }
  }
}
</style>
