<template>
  <div>
    <AInputNumber
      ref="input"
      v-model="widgetVal"
      :placeholder="field.placeholder || '请输入'"
      :style="{ width: field.width || '166px' }"
      :formatter="numberFormatter"
      :min="field.min"
      :max="field.max"
      :defaultValue="field.defaultValue"
      :precision="field.precision"
      :step="field.step"
      :class="{ hideStep: field.hideStep }"
    ></AInputNumber>
    {{ field.suffix }}
  </div>
</template>
<script>
/**
 * 数字输入组件，只输入数字
 */
import BaseWidget from './BaseWidget';

export default {
  name: 'InputNumberWidget',
  extends: BaseWidget,
  data() {
    return {};
  },
  methods: {
    /**
     * 支持类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['int', 'long', 'float'];
    },
    /**
     * 校验规则类型
     */
    ruleType() {
      return 'number';
    },
    /**
     * widget到json值类型转换
     * @param val
     * @returns {boolean|*[]|*}
     */
    widgetToJson(widgetVal) {
      return this.tryStrToNumber(widgetVal);
    },
    /**
     * json到widget值类型转换
     */
    jsonToWidget(jsonVal) {
      return this.tryStrToNumber(jsonVal);
    },
    tryStrToNumber(val) {
      let result = parseFloat(val);
      if (Number.isNaN(result)) {
        return '';
      } else {
        return result;
      }
    },
    /**
     * 获取 jsonVal
     * @returns {string|number}
     */
    getJsonVal() {
      let val = this.pJsonModel[this.pField.name];
      return this.tryStrToNumber(val);
    },
    /**
     * 数字格式化器
     * @param value
     * @returns {string}
     */
    numberFormatter(value) {
      if (this.pField.prefix) {
        return `${this.pField.prefix || ''}  ${value}`;
      } else {
        return `${value}`;
      }
    }
  }
};
</script>
<style lang="less">
.hideStep {
  .ant-input-number-handler-wrap {
    display: none;
  }
}
.ant-input-number {
  border-radius: 2px;
  border: 1px solid rgba(238, 240, 242, 1);
  input {
    background: rgba(252, 252, 253, 1);
  }
}
</style>
