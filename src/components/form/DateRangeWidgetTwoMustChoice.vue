<template>
  <div :style="{ width: field.width || '320px', display: 'flex', justifyContent: 'space-between'}">
    <ADatePicker
      style="width: 174px"
      :disabledDate="disabledStartDate"
      :showTime="showTime"
      :mode="mode[0]"
      :format="format"
      v-model="startValue"
      :placeholder="placeholder()[0]"
      :open="startOpen"
      @openChange="handleStartOpenChange"
    />
    <ADatePicker
      style="width: 174px"
      :disabledDate="disabledEndDate"
      :showTime="showTime"
      :mode="mode[1]"
      :format="format"
      :placeholder="placeholder()[1]"
      v-model="endValue"
      :open="endOpen"
      @openChange="handleEndOpenChange"
    />
  </div>
<!--  <ARangePicker-->
<!--    v-model="dtVal"-->
<!--    @change="onChange"-->
<!--    :placeholder="placeholder()"-->
<!--    :format="format"-->
<!--    :mode="mode"-->
<!--    :showTime="showTime"-->
<!--    class="drw-container"-->
<!--  />-->
</template>
<script>
/*
 * 时间间隔组件，时间组件分开，清空时调用改变接口
 */
import moment from 'moment'
import BaseWidget from './BaseWidget'

export default {
  name: 'DateRangeWidget',
  extends: BaseWidget,
  watch: {
    widgetVal(val) {
      if (!val) {
        this.dtVal = []
      } else {
        this.dtVal = val.map((item) => { return moment(item) })
      }
    },

    startValue(val, oldVal) {
      // console.log('startValue', val);
      if (oldVal && !val) { // 清空 startValue 时
        if (this.endValue) {
          this.endValue = null
        }
      }
      if (!this.startValue && !this.endValue) {
        this.onChange([null, null], ['', ''])
      }
      if (this.startValue && this.endValue) {
        this.onChange([this.startValue, this.endValue],
          [this.startValue.format(this.format), this.endValue.format(this.format)])
      }
    },
    endValue(val, oldVal) {
      // console.log('endValue', val);
      if (oldVal && !val) { // 清空 startValue 时
        if (this.startValue) {
          this.startValue = null
        }
      }
      if (!this.startValue && !this.endValue) {
        this.onChange([null, null], ['', ''])
      }
      if (this.startValue && this.endValue) {
        this.onChange([this.startValue, this.endValue],
          [this.startValue.format(this.format), this.endValue.format(this.format)])
      }
    },
  },
  data() {
    let mode = ''
    let showTime = false
    let dateName = ''
    let format = 'YYYY-MM-DD HH:mm'
    if (this.pField.type === 'datetime_range') {
      mode = ['date', 'date']
      showTime = { format: 'HH:mm' }
      dateName = '时间'
    } else if (this.pField.type === 'date_range') {
      mode = ['date', 'date']
      dateName = '日期'
      format = 'YYYY-MM-DD'
    } else if (this.pField.type === 'month_range') {
      mode = ['month', 'month']
      dateName = '月份'
    } else if (this.pField.type === 'year_range') {
      mode = ['year', 'year']
      dateName = '年份'
    }
    return {
      mode,
      showTime,
      dateName,
      format,
      dtVal: [],

      startValue: null,
      endValue: null,
      startOpen: false,
      endOpen: false,
    }
  },
  methods: {
    /**
     * 支持类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['datetime_range', 'date_range', 'month_range', 'year_range']
    },
    /**
     * 控件值改变触发
     */
    onChange(date, dateString) {
      console.log(date, dateString)
      this.widgetVal = dateString
    },
    /**
     * 占位符文字
     * @returns {*|string}
     */
    placeholder() {
      return this.field.placeholder || [`开始${this.dateName}`, `结束${this.dateName}`]
    },
    /**
     * 禁止开始日期逻辑
     * @param startValue
     * @returns {boolean}
     */
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    /**
     * 禁止结束日期逻辑
     * @param endValue
     * @returns {boolean}
     */
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    /**
     * 开始日期修改触发
     * @param open
     */
    handleStartOpenChange(open) {
      // if (!open) {
      //   this.endOpen = true;
      // }
      if (!open && !this.startValue) {
        return
      }
      this.startOpen = open
      if (!this.endValue && this.startValue) {
        this.endOpen = true
      }
    },
    /**
     * 结束日期修改触发
     * @param open
     */
    handleEndOpenChange(open) {
      if (!open && !this.endValue) {
        return
      }
      this.endOpen = open
      if (!this.startValue && this.endValue) {
        this.startOpen = true
      }
    },
  },
}
</script>

<style lang="less">
.drw-container {
  max-width: 398px;
  min-width: 200px;
}
</style>
