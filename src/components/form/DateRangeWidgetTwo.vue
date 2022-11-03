<template>
  <div class="sw-field" :style="{ width: field.width || '320px', display: 'flex', justifyContent: 'space-between' }">
    <ADatePicker
      style="min-width: 174px"
      :disabledDate="disabledStartDate"
      :showTime="showTime"
      :mode="mode[0]"
      :format="format"
      v-model="startValue"
      :placeholder="placeholder()[0]"
      :open="startOpen"
      @openChange="handleStartOpenChange"
      :getCalendarContainer="getPopupContainer()"
      :disabled="field.disabled || false"
    />
    <div class="drwt-spliter">~</div>
    <ADatePicker
      style="min-width: 174px"
      :disabledDate="disabledEndDate"
      :showTime="showTime"
      :mode="mode[1]"
      :format="format"
      :placeholder="placeholder()[1]"
      v-model="endValue"
      :open="endOpen"
      @openChange="handleEndOpenChange"
      :getCalendarContainer="getPopupContainer()"
      :disabled="field.disabled || false"
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
 * 时间间隔组件，时间组件分开
 */
import moment from 'moment';
import BaseWidget from './BaseWidget';

export default {
  name: 'DateRangeWidget',
  extends: BaseWidget,
  inject: ['popupContainer'],
  watch: {
    widgetVal(val, oldVal) {
      if (JSON.stringify(val) === JSON.stringify(oldVal)) {
        return;
      }
      if (!val) {
        this.startValue = null;
        this.endValue = null;
      } else {
        if (this.pField.type === 'datetime_range') {
          val[1] = moment(val[1])
            .endOf('day')
            .format('YYYY-MM-DD HH:mm:ss');
        }
        [this.startValue, this.endValue] = val.map(item => {
          let result = moment(item);
          if (result.isValid()) {
            return result;
          } else {
            return null;
          }
        });
      }
    },

    startValue(val, oldVal) {
      this.onChange(
        [this.startValue, this.endValue],
        [
          this.startValue ? this.startValue.format(this.format) : '',
          this.endValue ? this.endValue.format(this.format) : ''
        ]
      );
    },
    endValue(val, oldVal) {
      this.onChange(
        [this.startValue, this.endValue],
        [
          this.startValue ? this.startValue.format(this.format) : '',
          this.endValue ? this.endValue.format(this.format) : ''
        ]
      );
    }
  },
  data() {
    let mode = '';
    let showTime = false;
    let dateName = '';
    let format = 'YYYY-MM-DD HH:mm:ss';
    if (this.pField.type === 'datetime_range') {
      mode = ['date', 'date'];
      showTime = { format: 'HH:mm' };
      dateName = '时间';
    } else if (this.pField.type === 'date_range') {
      mode = ['date', 'date'];
      dateName = '日期';
      format = 'YYYY-MM-DD';
    } else if (this.pField.type === 'month_range') {
      mode = ['month', 'month'];
      dateName = '月份';
    } else if (this.pField.type === 'year_range') {
      mode = ['year', 'year'];
      dateName = '年份';
    }
    return {
      mode,
      showTime,
      dateName,
      format,

      startValue: null,
      endValue: null,
      startOpen: false,
      endOpen: false
    };
  },
  methods: {
    /**
     * 支持类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['datetime_range', 'date_range', 'month_range', 'year_range'];
    },
    /**
     * 控件值改变触发
     */
    onChange(date, dateString) {
      console.log('date', date, dateString);
      this.widgetVal = dateString;
    },
    /**
     * 占位符文字
     * @returns {*|string}
     */
    placeholder() {
      return this.field.placeholder || [`开始${this.dateName}`, `结束${this.dateName}`];
    },
    /**
     * 禁止开始日期
     */
    disabledStartDate(startValue) {
      const endValue = this.endValue;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.startOf('day') > endValue.startOf('day');
    },
    /**
     * 禁止结束日期
     */
    disabledEndDate(endValue) {
      const startValue = this.startValue;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.startOf('day') > endValue.startOf('day');
    },
    /**
     * 开始日期修改触发
     */
    handleStartOpenChange(open) {
      this.startOpen = open;
    },
    /**
     * 结束日期修改触发
     */
    handleEndOpenChange(open) {
      this.endOpen = open;
    },
    /**
     * 获取弹出container
     * @returns {(function(): default.methods.$refs.footer.parentElement.previousElementSibling|default.methods.$el)|(function(): HTMLElement)}
     */
    getPopupContainer() {
      if (this.popupContainer) {
        return () => {
          return this.popupContainer();
        };
      } else {
        return () => document.body;
      }
    }
  }
};
</script>

<style lang="less">
// .drw-container {
//   max-width: 398px;
//   min-width: 200px;
// }
.drwt-spliter {
  margin: auto 8px;
  width: 14px;
}
</style>
