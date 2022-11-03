<template>
  <div v-if="field.readonly === 'eye'">
    <div class="eye-box" :style="{ display: 'inline-block', maxWidth: field.width || '320px' }">
      <span
        class="text"
        :style="{
          visibility: isEye ? 'hidden' : undefined,
          maxWidth: field.width || '320px'
        }"
        >{{ eyeText }}</span
      >
      <AIcon
        v-show="isShowEye"
        :style="{ marginLeft: '26px' }"
        :type="isEye ? 'eye-invisible' : 'eye'"
        @click="onChangeEye"
      />
      <span
        class="star"
        :style="{
          visibility: !isEye ? 'hidden' : undefined,
          maxWidth: field.width || '320px'
        }"
        >{{ eyeStarText }}</span
      >
    </div>
  </div>
  <span v-else-if="field.readonly" :style="{ display: 'inline-block', maxWidth: field.width || '320px' }">{{
    jsonVal || jsonVal === 0 ? jsonVal : '无'
  }}</span>
  <div v-else class="input-content" style="display: inline-block;width:100%;">
    <AInput
      :style="{ width: field.width || '320px' }"
      ref="input"
      v-model="widgetVal"
      @change="onChange"
      :placeholder="field.placeholder || `请输入${field.label}`"
      :prefix="field.prefix"
      :addonBefore="field.addonBefore"
      :disabled="isDisabled"
      :maxLength="field.maxLength"
    >
      <div
        slot="iw-suffix"
        v-if="field.suffix"
        class="suffix"
        :style="{ backgroundColor: field.suffix_backgroundColor }"
      >
        {{ field.suffix }}
      </div>
    </AInput>
    <a-icon v-if="field.switch" class="suffix-icon" type="edit" @click="onChangeDisabled" />
  </div>
</template>
<script>
/**
 * 输入组件，支持'str', 'int', 'float', 'long', 'email', 'url', 'mobile'类型
 */
import BaseWidget from './BaseWidget';

export default {
  name: 'InputWidget',
  extends: BaseWidget,
  supportReadonly: true,
  mounted() {
    if (!this.field.readonly) {
      // 仅在编辑模式下设置底色
      let input = this.$refs.input;
      for (let child of input.$children[0].$el.children) {
        if (child.tagName.toUpperCase() === 'INPUT') {
          // TODO: 暂时不设置 input 底色
          // child.style.backgroundColor = this.field.backgroundColor || '#FCFCFD'
          if (this.field.prefixWidth) {
            child.style.paddingLeft = `${this.field.prefixWidth}px`;
          }
        }
      }
    }
  },
  data() {
    return {
      isEye: true
      // isDisabled: this.pField.switch || this.pField.disabled || false,
    };
  },
  computed: {
    isDisabled() {
      return this.pField.switch || this.pField.disabled || false;
    },
    eyeText() {
      if (!this.jsonVal) {
        return '无';
      }
      return this.jsonVal;
    },
    eyeStarText() {
      if (!this.jsonVal) {
        return '无';
      }
      return Array(Math.min(49, `${this.jsonVal}`.length))
        .fill('*')
        .join('');
    },
    isShowEye() {
      if (!this.jsonVal) {
        return false;
      }
      return this.field.readonly === 'eye';
    }
  },
  methods: {
    /**
     * 支持类型声明
     * @returns {string[]}
     */
    supportTypes() {
      return ['str', 'int', 'float', 'long', 'email', 'url', 'mobile', 'parseFloat'];
    },
    /**
     * eye图标点击改变
     */
    onChangeEye() {
      this.isEye = !this.isEye;
    },
    /**
     * 只读改变触发
     */
    onChangeDisabled() {
      // 仅设置成可写，不需要再设置成只读
      // this.isDisabled = !this.isDisabled
      this.isDisabled = false;
    },
    /**
     * widget到json值类型转换
     * @param val
     * @returns {boolean|*[]|*}
     */
    widgetToJson(widgetVal) {
      if (widgetVal === '') {
        return '';
      }
      if (this.field.type === 'int') {
        return parseInt(widgetVal, 10);
      } else if (this.field.type === 'float') {
        return parseFloat(widgetVal);
      } else {
        return widgetVal;
      }
    },
    /**
     * 判断是否为数字类型
     */
    isNumber() {
      return ['int', 'float', 'long'].includes(this.pField.type);
    },
    /**
     * json到widget值类型转换
     */
    jsonToWidget(jsonVal) {
      if (this.isNumber() && Number.isNaN(jsonVal)) {
        return '';
      } else {
        return jsonVal;
      }
    },
    /**
     * 控件值改变触发
     */
    onChange(event) {
      if (this.field.upper) {
        this.widgetVal = event.target.value.toUpperCase();
      } else {
        this.widgetVal = event.target.value;
      }
      if (this.field.filter && !this.field.filter(this.widgetVal)) {
        this.widgetVal = this.widgetVal.slice(0, this.widgetVal.length - 1);
      }
      if (this.field.replacePattern) {
        this.widgetVal = this.widgetVal.replace(this.field.replacePattern, '');
      }
    },
    /**
     * 规则类型
     * @returns {string}
     */
    ruleType() {
      if (this.isNumber()) {
        return 'number';
      } else {
        return 'any';
      }
    },
    /**
     * 校验规则声明
     * @returns {[]}
     */
    rules() {
      let result = [];
      let validator = this.genValidator();
      if (validator) {
        result.push(validator);
      }
      if (this.field.type === 'url') {
        result.push({
          required: this.field.required,
          message: 'URL格式错误',
          trigger: this.ruleTrigger(),
          type: 'url'
        });
      }
      if (this.field.type === 'email') {
        result.push({
          required: this.field.required,
          message: '邮箱格式错误',
          trigger: this.ruleTrigger(),
          type: 'email'
        });
      }
      if (this.field.type === 'mobile') {
        result.push({
          required: this.field.required,
          message: '手机格式错误',
          trigger: this.ruleTrigger(),
          validator: (rule, value, callback) => {
            if (!value || value.length !== 11) {
              callback(rule.message);
              return;
            }
            let test = value.replace(/[\d]/g, '');
            if (test.length !== 0) {
              callback(rule.message);
              return;
            }
            callback();
          }
        });
      }
      return result;
    },
    /**
     * 生成自定义validator
     * @returns {{validator: validator, trigger: string, required: *}|null}
     */
    genValidator() {
      if (!this.field.validate) {
        return null;
      }
      const validator = (rule, value, callback) => {
        let msg = this.field.validate(value);
        if (msg) {
          callback(msg);
        } else {
          callback();
        }
      };
      let result = {
        required: this.field.required,
        // message: this.ruleMessage(),
        trigger: this.ruleTrigger(),
        // type: this.ruleType(),
        validator
      };
      return result;
    }
  }
};
</script>
<style lang="less">
.iw-suffix {
  height: 100%;
  /* width: 100%; */
  flex-grow: 1;
  padding: 0 10px;
  text-align: center;
  display: flex;
  align-items: center;
}
.input-content {
  display: flex;
  .suffix-icon {
    margin-left: 10px;
    color: #ff791a;
    line-height: 40px;
  }
}
.ant-input-affix-wrapper {
  input {
    background: #ffffff;
    border-radius: 2px;
    border: 1px solid rgba(238, 240, 242, 1);
  }
}
.eye-box {
  position: relative;
  .text {
  }
  .star {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
