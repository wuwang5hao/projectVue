<template>
  <div class="rank-container">
    <div class="rank-content">
      <div class="rank-content-left">
        <p class="rank-content-icon">
          <img v-if="rankIcon" :src="rankIcon"/>
          <span v-else>{{ pIndex }}</span>
        </p>
        <div class="rank-content-wrapper">
          <div class="rank-content-desc">
            <TooltipWrapper :pText="pDesc" />
          </div>
          <div class="rank-content-title">
            <TooltipWrapper :pText="pTitle" />
          </div>
        </div>
      </div>
      <p class="rank-content-value">{{ pValue }}&nbsp;
        <span class="rank-content-unit">{{ pUnit }}</span>
      </p>
    </div>
    <div class="rank-bar">
      <p :class="getBarClass(pIndex)" :style="style"></p>
    </div>
  </div>
</template>

<script>
/**
 * 硬件接入排名组件
 * @vue-prop {Number} pIndex - 排名
 * @vue-data {String} pTitle - 标题
 * @vue-data {String} pDesc - 描述
 * @vue-data {String, Number} pValue - 值
 * @vue-data {String} pUnit - 单位
 */
import TooltipWrapper from '@/components/TooltipWrapper'

export default {
  name: 'rank',

  components: {
    TooltipWrapper
  },

  props: {
    pIndex: Number,
    pTitle: String,
    pDesc: String,
    pValue: [String, Number],
    pMaxValue: [String, Number],
    pUnit: String,
    pMax: {
      type: Number,
      default: 6
    },
    pUseIcon: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {

    }
  },

  computed: {
    style () {
      if (this.pMaxValue) {
        const percent = Math.ceil(this.pValue * 100/this.pMaxValue)
        return `width: ${percent}%; height: 100%;`
      } else {
        const percent = Math.ceil((this.pMax - this.pIndex + 1) * 100/this.pMax)
        return `width: ${percent}%; height: 100%;`
      }
    },
    rankIcon () {
      if (!this.pUseIcon) {
        return ''
      }
      if (this.pIndex === 1) {
        return `${this.STATIC_IMG_URL}gold.png`
      } else if (this.pIndex === 2) {
        return `${this.STATIC_IMG_URL}silver.png`
      } else if (this.pIndex === 3) {
        return `${this.STATIC_IMG_URL}copper.png`
      } else {
        return ''
      }
    }
  },

  methods: {
    getBarClass () {
      if (this.pIndex === 1) {
        return 'rank-bar-gold'
      } else if (this.pIndex === 2) {
        return 'rank-bar-silver'
      } else if (this.pIndex === 3) {
        return 'rank-bar-coppery'
      } else {
        return 'rank-bar-blue'
      }
    }
  }
}
</script>

<style lang="less">
@import 'variables.less';
@import 'mixins.less';
.rank-container {
  padding: 12px 0px;
  width: 100%;
  border-bottom: 1px @divider-color solid;
  height: 100px;
  p {
    margin-bottom: 0px;
  }
  .rank-content {
    margin-bottom: @space-size-small;
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: space-between;
    .rank-content-wrapper {
      width: calc(100% - 40px);
    }
    &-left {
      display: flex;
      align-items: center;
      width: 75%;
    }
    &-icon {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #F6F7FA;
      line-height: 36px;
      text-align: center;
      margin-right: @space-size-mini;
    }
    &-desc {
      font-size: 12px;
      color: #657386;
      .text-overflow();
    }
    &-title {
      font-size: 16px;
      color: #1E222B;
      .text-overflow();
    }
    &-value {
      font-size: @font-size-massive;
      color: @black;
      font-weight: @font-weight-medium;
    }
    &-unit {
      font-size: @font-size-small;
      color: @text-color;
      font-weight: normal;
    }
  }

  .rank-bar {
    height: 12px;
    width: 100%;
    background-color: #F6F7FA;
    &-gold {
      background: linear-gradient(90deg,rgba(225,173,66,1) 0%,rgba(249,242,151,1) 100%);
    }
    &-silver {
      background: linear-gradient(90deg,rgba(178,178,178,1) 0%,rgba(242,242,242,1) 100%);
    }
    &-coppery {
      background: linear-gradient(90deg,rgba(165,141,118,1) 0%,rgba(253,227,199,1) 100%);
    }
    &-blue {
      background: linear-gradient(319deg,rgba(82,111,229,1) 0%,rgba(95,154,231,1) 100%);
    }
  }
}
.rank-container:last-child {
  border-bottom: 0px;
}

@media screen and (max-width: @page-switch-width) {
  .rank-container {
    padding: 12px 0px;
    height: 82px;
    .rank-content {
      margin-bottom: 3px;
      &-icon {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background-color: #F6F7FA;
        line-height: 26px;
        text-align: center;
        margin-right: @space-size-mini;
      }
      &-desc {
        font-size: @font-size-small;
      }
      &-title {
        font-size: @font-size-base;
      }
      &-value {
        font-size: @font-size-large;
      }
      &-unit {
        font-size: @font-size-small;
      }
    }

    .rank-bar {
      height: 10px;
    }
  }
}
</style>
