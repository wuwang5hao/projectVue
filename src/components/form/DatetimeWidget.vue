<template>
  <div>
    <div v-if="field.readonly">
      {{readonlyText()}}
    </div>
    <ADatePicker
      v-else
      v-model="tmVal"
      @change="onChange"
      :placeholder="placeholder()"
      v-bind="bindValue"
      class="drw-container"
      :style="{ width: field.width || 'auto' }"
      :disabledDate="disabledDate"
      :getCalendarContainer="getPopupContainer()"
      :disabledTime="disabledTime"
      :disabled="field.disabled || false"
    />
  </div>
</template>
<script>
/*
 * 时间组件
 */
import moment from 'moment'
import {dtUtil} from "jscom/utils/sysutil"
import BaseWidget from './BaseWidget'

/**
 * @brief: jsonVal widgetVal 格式默认为 YYYY-mm-dd HH:MM:SS，如果设置 field.useTimestamp 那么就是 时间戳毫秒格式
 */
export default {
  name: 'DatetimeWidget',
  extends: BaseWidget,
  supportReadonly: true,
  inject: ['popupContainer'],
  data() {
    let mode = ''
    let showTime = false
    let dateName = ''
    let format = ''
    let bindValue = {}
    if (this.pField.type === 'datetime') {
      mode = undefined
      showTime = { format: 'HH:mm:ss' }
      dateName = '时间'
      format = 'YYYY-MM-DD HH:mm:ss'
      bindValue = {showTime, format}
    } else if (this.pField.type === 'date') {
      mode = 'date'
      dateName = '日期'
      format = 'YYYY-MM-DD'
      bindValue = {mode, format}
    } else if (this.pField.type === 'month') {
      mode = 'month'
      dateName = '月份'
      format = 'YYYY-MM'
      bindValue = {mode, format}
    } else if (this.pField.type === 'year') {
      mode = 'year'
      dateName = '年份'
      format = 'YYYY'
      bindValue = {mode, format}
    }
    return {
      mode,
      showTime,
      dateName,
      format,
      bindValue,
      tmVal: null,
    }
  },
  watch: {
    widgetVal(val) {
      this.updateTmVal()
    },
  },
  mounted() {
    this.updateTmVal()
  },
  methods: {
    /**
     * 修改时间值
     */
    updateTmVal() {
      if (!this.widgetVal) {
        this.tmVal = null
        return;
      }
      if (this.field.useTimestamp) {
        this.tmVal = moment(this.widgetVal)
      } else {  // str format
        this.tmVal = moment(this.widgetVal)
      }
    },
    /**
     * 支持类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['datetime', 'date', 'month', 'year']
    },
    /**
     * 控件值改变触发
     */
    onChange(date, dateString) {
      // console.log(date, dateString)
      if (this.field.useTimestamp) {
        if (date) {
          this.widgetVal = date.valueOf()  // 时间戳 毫秒
        } else {
          this.widgetVal = ''
        }
      } else {
        this.widgetVal = dateString
      }
    },
    /**
     * 占位符文字
     * @returns {*|string}
     */
    placeholder() {
      return this.field.placeholder || `选择${this.dateName}`
    },
    /**
     * 禁止日期逻辑
     */
    disabledDate (current) {
      if (this.field.startDate) {
        return current <= this.field.startDate
      }
      if (this.field.endDate) {
        return current >= this.field.endDate
      }
      // 屏蔽过去的日期
      if (this.field.disablePastDate) {
        return current && current < moment().startOf('day')
      }
      // 屏蔽未来的日期
      if (this.field.disableFutureDate) {
        return current && current > moment().endOf('day')
      }
      return false
    },
    /**
     * 数字区间生成
     */
    range(start, end) {
      const result = []
      for (let i = start; i < end; i++) {
        result.push(i)
      }
      return result
    },
    /**
     * 禁止时间逻辑
     */
    disabledTime (current) {
      console.log(current)
      let now = moment()
      if (this.field.disablePastDate) {
        if (current.clone().startOf('day') > now.clone().startOf('day')) {
          return undefined
        }
        let disabledMinuteRange = []
        if (current.hours() < now.hours()) {
          disabledMinuteRange = this.range(0, 60)
        } else if (current.hours() === now.hours()) {
          disabledMinuteRange = this.range(0, now.minutes())
        }
        let disabledSecondsRange = []
        if (current.minutes() < now.minutes()) {
          disabledSecondsRange = this.range(0, 60)
        } else if (current.minutes() === now.minutes()) {
          disabledSecondsRange = this.range(0, now.seconds())
        }
        return {
          disabledHours: () => this.range(0, now.hours()),
          disabledMinutes: () => disabledMinuteRange,
          disabledSeconds: () => disabledSecondsRange,
        }
      }
      return undefined
    },
    /**
     * 只读文字
     */
    readonlyText() {
      if (this.pField.useTimestamp) {
        // 'datetime', 'date', 'month', 'year'
        let dt = new Date(this.jsonVal)
        if (this.pField.type === 'datetime') {
          return dtUtil.formatDatetime(dt)
        } else if (this.pField.type === 'date') {
          return dtUtil.formatDate(dt)
        } else if (this.pField.type === 'month') {
          return dtUtil.formatMonth(dt)
        } else if (this.pField.type === 'year') {
          return dt.getFullYear
        }
      }
      return this.widgetVal
    },
    /**
     * 获取弹出container
     * @returns {(function(): default.methods.$refs.footer.parentElement.previousElementSibling|default.methods.$el)|(function(): HTMLElement)}
     */
    getPopupContainer () {
      if (this.popupContainer) {
        return () => {
          return this.popupContainer()
        }
      } else {
        return () => document.body
      }
    }
  },
}
</script>

<style lang="less">
.drw-container {
  max-width: 398px;
  min-width: 200px;
}
</style>
