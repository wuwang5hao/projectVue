<template>
  <AFormModel
    class="pf-form"
    ref="form"
    :model="jsonModel"
    v-bind="layout"
    :rules="rules"
  >
    <AFormModelItem
      :ref="field.name"
      :style="{
        width: itemWidth(field),
        marginBottom: pMarginBottom,
      }"
      v-for="(field, index) of pFields"
      :key="index"
      :label="field.label"
      :required="!field.readonly && !pReadonly && field.required"
      :prop="field.name"
      :colon="false"
      :autoLink="false"
      :class="{'form-item-readonly': isReadonly(field)}"
      v-show="!field.isHide"
    >
      <Expand
        :class="['field', {'field-readonly': isReadonly(field)}]"
        :style="{width: field.width}"
        :pRender="(h, ctx) => { return renderField(h, ctx, field) }"
      >
      </Expand>
      <slot :name="`${field.name}-suffix`"></slot>
    </AFormModelItem>
  </AFormModel>
</template>
<script>
/**
 * 页面表单的基础组件
 *
 */
import Expand from 'jscom/widgets/Expand'
import FieldRenderMixin from "./FieldRenderMixin";

export default {
  name: 'PageForm',
  components: {Expand},
  mixins: [FieldRenderMixin],
  props: {
    pMarginBottom: { type: String, default: '25px' },
  },
  data() {
    return {
      layout: {
        layout: 'inline',
        // labelCol: { span: 6 },
        // wrapperCol: { span: 18 },
      },
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
    },
    /**
     * 元素宽度
     * @param field
     * @returns {string}
     */
    itemWidth(field) {
      if (field.width) {
        let width = parseFloat(field.width)
        return `${width + 170}px`
      } else {
        return '568px'
      }
    }
  },

  /**
   * 注入控件容器
   * @returns {{popupContainer: popupContainer}}
   */
  provide() {
    let vm = this
    return {
      popupContainer: () => {
        let form = vm.$refs.form.$el
        if (!form) {
          return document.body
        }
        return form
      }
    }
  }
}
</script>
<style lang="less">
.pf-form {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;

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

  .item {
  }
  .ant-form-item-label {
    width: 145px;
    margin-right: 14px;
  }
}

</style>
