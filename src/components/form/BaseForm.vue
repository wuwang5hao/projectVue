<template>
  <AFormModel
    :class="{form: true, 'form-readonly': pReadonly}"
    ref="form"
    :model="jsonModel"
    v-bind="layout"
    :rules="rules"
    :colon="false"
  >
    <!-- 此处不使用 AFormModel 的 autlLink 特性，避免 html 在 input -> div .. 的消息传递导致的 change 事件发生时机不对的问题
      以及 select image 等控件不能与 input 一致的向上传递 change 事件的问题，在 FieldRenderMixin 中进行手动绑定 validate
    -->
<!--    :autoLink="field.autoLink === undefined ? true: field.autoLink"-->
    <AFormModelItem
      :ref="field.name"
      v-for="(field, index) of pFields"
      :key="index"
      :label="field.label"
      :required="!field.readonly && !pReadonly && field.required"
      :prop="field.name"
      :colon="false"
      :autoLink="false"
      :class="{'form-item-readonly': isReadonly(field)}"
    >
      <Expand
        :class="['field', {'field-readonly': isReadonly(field)}]"
        :pRender="(h, ctx) => { return renderField(h, ctx, field) }"
      ></Expand>
      <slot :name="`${field.name}-suffix`" v-bind:field="field" v-bind:jsonVal="jsonModel[field.name]" v-bind:jsonModel="jsonModel">
      </slot>
      <div style="margin: 5px 0;">
        <slot :name="`${field.name}-below-suffix`" :field="field" v-bind:jsonVal="jsonModel[field.name]" v-bind:jsonModel="jsonModel"></slot>
      </div>
    </AFormModelItem>
  </AFormModel>
</template>
<script>
/**
 * 表单的基础组件，定义表单的基本样式和基本行为
 */
import Expand from 'jscom/widgets/Expand'
import FieldRenderMixin from "./FieldRenderMixin";

export default {
  name: 'BaseForm',
  components: {Expand},
  mixins: [FieldRenderMixin],
  props: {
    pLayout: {
      type: Object,
      default() {
        return {
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
        }
      }
    },
  },
  data() {
    return {
      layout: this.pLayout,
    }
  },
  created() {
  },
  methods: {
    /**
     * 校验函数
     * @param func
     */
    validate(func) {
      this.$refs.form.validate(func)
    },
    /**
     * 是否为只读
     * @param field
     * @returns {*|boolean}
     */
    isReadonly(field) {
      return field.readonly || this.pReadonly
    }
  }
}
</script>
<style lang="less">
.form {
  .form-item-readonly {
    margin-top: -12px;
  }
  .field {
    display: inline-block;
  }
  .field-readonly {
    line-height: 1.3;
    padding-top: 12px;
    min-width: 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ant-form-item-label {
    line-height: 40px;
  }
  .ant-form-item-control {
    line-height: 1;
  }
}
.form-readonly {
  .ant-form-item-label > label.ant-form-item-required::after {
    content: '';
  }
}

/*.ant-form-item-control {*/
/*  line-height: 21px;*/
/*}*/
</style>
