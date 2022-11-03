<template>
  <div class="indi-container">
    <div class="indi-title ant-col-5">{{ pTitle}}</div>
    <div class="indi-right ant-col-16">
        <p class="indi-bar" :style="styleFirst"></p>
        <p class="indi-bar" :style="styleSecond"></p>
        <p class="indi-bar" :style="styleThird"></p>
        <p class="indi-text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
/**
 * @vue-data {String} pTitle - 标题
 * @vue-data {String} pLevel - 强度
 */
export default {
  name: 'indicator',

  props: {
    pTitle: String,
    pLevel: {
      type: String,
      default: 'low',
      validator: (val) => ['none', 'low', 'middle', 'high'].includes(val)
    },
    pPassword: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      styleMap: {
        low: 'background-color: #ED675C',
        middle: 'background-color: #FFC72D',
        high: 'background-color: #69D700'
      },
      textMap: {
        low: '低',
        middle: '中',
        high: '高'
      },
      level: this.pLevel || 'low'
    }
  },

  watch: {
    pPassword (password) {
      this.checkPasswordLevel(password)
    }
  },

  computed: {
    styleFirst () {
      if (this.level !== 'none') {
        return this.styleMap[this.level]
      }
      return ''
    },
    styleSecond () {
      if (this.level === 'middle' || this.level === 'high') {
        return this.styleMap[this.level]
      }
      return ''
    },
    styleThird () {
      if (this.level === 'high') {
        return this.styleMap[this.level]
      }
      return ''
    },
    text () {
      return this.textMap[this.level]
    }
  },

  methods: {
    checkPasswordLevel (password) {
      if (!password) {
        return
      }
      let score = 0
      // 长度判断 ^[0-9a-zA-Z~!@#$%^&*()_+]{8,30}$
      //  ^[0-9a-zA-Z_]{8,30}
      /*
        5分：5位以下
        10分：5位 - 7位
        25分：8位以上
      */
      if (password.length < 5) {
        score += 5
      } else if (password.length <= 7) {
        score += 10
      } else {
        score += 25
      }

      /* 字母
        0分：没有
        10分：全部大写或全部小写
        25分：大小写混合
      */
      let lowercase = password.match(/[a-z]/g)
      let uppercase = password.match(/[A-Z]/g)
      if (lowercase && uppercase) {
        score += 25
      } else if (lowercase || uppercase) {
        score += 10
      }
      /* 数字
        0分：没有
        10分：3个以下数字
        20分：3个以上数字
      */
      let number = password.match(/\d/g)
      if (number) {
        score += number.length > 3 ? 20 : 10
      }

      /* 符号
        0分：没有
        10分：2个以下符号
        25分：2个以上符号
      */
      let temp = password.replace(/[a-zA-Z\d]/g, '')
      let symbol = temp.match(/[~!@#$%^&*()_+]/g)
      if (symbol) {
        score += symbol.length > 2 ? 25 : 10
      }
      /* 奖励
        2分：字母和数字
        3分：字母，数字和符号
        5分：大小写字母，数字和符号
      */
      let alphabet = (lowercase || uppercase)
      if (lowercase && uppercase && number && symbol) {
        score += 5
      } else if (alphabet && number && symbol) {
        score += 3
      } else if (alphabet && number) {
        score += 2
      }
      if (score < 60) {
        this.level = 'low'
      } else if (score < 70) {
        this.level = 'middle'
      } else {
        this.level = 'high'
      }
    }
  }
}
</script>

<style lang="less">
@import 'variables.less';
.indi-container {
  padding: @space-size-mini 0px;
  display: flex;
  margin-right: -15px;
  margin-left: -15px;
//   align-items: center;
  .indi-title {
    text-align: right;
    align-items: center;
    color: #9B9B9B;
    padding-right: 15px;
  }
  .indi-right{
      display: flex;
      align-items: center;
  .indi-bar {
    display: flex;
    height: 8px;
    width: 54px;
    background-color: #F1F1F1;
    margin-right: @space-size-tiny;
    border-radius: 1px;
  }
  }
  .indi-text {
    color: @primary;
    width: 20px;
    text-align: right;
  }
  .ant-modal-footer button + button {
  margin-bottom: 0;
  margin-left: 16px;
}
}
</style>
