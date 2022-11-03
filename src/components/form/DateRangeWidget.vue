<template>
  <ARangePicker
    v-model="dtVal"
    @change="onChange"
    :placeholder="placeholder()"
    :format="format"
    :mode="mode"
    :showTime="showTime"
    class="drw-container"
    @panelChange="handlePanelChange"
    :allowClear="field.allowClear"
    ref="picker"
  />
</template>
<script>
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
        console.log('222', val);
        // if(val[0]>val[1]&&this.pField.type === 'year_range') {
        //   let newDate = [val[0], val[0]]
        //   this.dtVal = newDate.map((item) => { return moment(item) })
        //   console.log('this.dtVal', this.dtVal);
        // }else{
        //   this.dtVal = val.map((item) => { return moment(item) })
        // }
        this.dtVal = val.map((item) => { return moment(item) })
      }
    }
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
      format = 'YYYY'
    }
    return {
      mode,
      showTime,
      dateName,
      format,
      dtVal: []
    }
  },
  methods: {

    /**
     * 支持数据类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['datetime_range', 'date_range', 'month_range', 'year_range']
    },
    /**
     * 控件值修改触发
     */
    onChange(date, dateString) {
      this.widgetVal = dateString
    },
    handlePanelChange(value, mode) {
      this.widgetVal = value
      // if (this.dtVal[1] && this.dtVal[1]._d !== value[1]._d) {
      //   this.$refs.picker.$refs.picker.sOpen = false;
      // }
    },
    /**
     * 占位符文字
     * @returns {*|string}
     */
    placeholder() {
      return this.field.placeholder || [`开始${this.dateName}`, `结束${this.dateName}`]
    },

  },
}
</script>

<style lang="less">
.drw-container {
  max-width: 398px;
  min-width: 150px;
}
</style>
