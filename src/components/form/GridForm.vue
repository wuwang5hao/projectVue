<template>
  <AFormModel
    :class="{ form_grid: true, 'form-readonly': pReadonly }"
    ref="form"
    :model="jsonModel"
    v-bind="pLayout || layout"
    :rules="rules"
    :colon="false"
  >
    <ARow :gutter="24" align="middle" class="row">
      <ACol :span="field.span || 12" v-for="(field, index) in pFields" :key="index">
        <AFormModelItem
          :ref="field.name"
          :label="field.label"
          :required="!field.readonly && !pReadonly && field.required"
          :prop="field.name"
          :colon="false"
          :autoLink="false"
          :class="{ 'form-item-readonly': isReadonly(field) }"
        >
          <Expand
            :class="['field', { 'field-readonly': isReadonly(field) }]"
            :style="{ width: field.width }"
            :pRender="
              (h, ctx) => {
                return renderField(h, ctx, field);
              }
            "
          >
          </Expand>
          <div class="suffix">
            <slot
              :name="`${field.name}-suffix`"
              v-bind:field="field"
              v-bind:jsonVal="jsonModel[field.name]"
              v-bind:jsonModel="jsonModel"
            ></slot>
          </div>
          <div class="below-suffix" style="margin: 5px 0;">
            <slot
              :name="`${field.name}-below-suffix`"
              :field="field"
              v-bind:jsonVal="jsonModel[field.name]"
              v-bind:jsonModel="jsonModel"
            ></slot>
          </div>
        </AFormModelItem>
      </ACol>
    </ARow>
  </AFormModel>
</template>

<script>
/**
 * 表单的基础组件，定义表单的基本样式和基本行为
 */
import Expand from 'jscom/widgets/Expand';
import FieldRenderMixin from './FieldRenderMixin';

export default {
  name: 'BaseForm',
  components: { Expand },
  mixins: [FieldRenderMixin],
  props: {
    pLayout: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 19 }
      }
    };
  },
  created() {},
  methods: {
    validate(func) {
      this.$refs.form.validate(func);
    },
    resetFields() {
      this.$refs.form.resetFields();
    },
    isReadonly(field) {
      return field.readonly || this.pReadonly;
    }
  },
  /**
   * 注入控件容器
   * @returns {{popupContainer: popupContainer}}
   */
  provide() {
    let vm = this;
    return {
      popupContainer: () => {
        let form = vm.$refs.form.$el;
        if (!form) {
          return document.body;
        }
        return form;
      }
    };
  }
};
</script>
<style lang="less">
.form_grid {
  .ant-col {
    height: 65px;
  }
  .ant-form-item-label {
    line-height: 40px;
  }
  .form-item-readonly {
    // margin-top: -11px;
    height: 45px;
  }
  .field {
    display: inline-block;
  }
  .field-readonly {
    line-height: 1.3;
    padding-top: 11px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .cancel {
    margin-left: 30px;
  }
  .footer {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .ant-form-item-label {
    line-height: 40px;
  }
  .ant-form-item-control {
    line-height: 40px;
  }
  .suffix {
    display: inline-block;
    color: #99a2b7;
  }
  .below-suffix {
    color: #99a2b7;
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
