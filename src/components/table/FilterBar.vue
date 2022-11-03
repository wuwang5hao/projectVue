<template>
  <div :class="['filter', { 'filter-shadow': pShowShadow }]" ref="filter">
    <AFormModel ref="form" :model="jsonModel" v-bind="layout">
      <ARow v-for="(row, index) in filterRows" :key="index" type="flex" align="middle" class="row">
        <ACol
          :span="spanVal"
          v-for="(field, index) in row.fields"
          :key="index"
          style="display: flex; align-items: center;"
        >
          <span class="label" :style="{ width: pLabelWidth }" v-if="field.label">{{ field.label }}</span>
          <div class="field">
            <Expand
              :pRender="
                (h, ctx) => {
                  return renderField(h, ctx, field);
                }
              "
            />
          </div>
        </ACol>
        <ACol :span="spanVal" v-if="row.count < pRowCount">
          <AButton type="primary" class="filter-button" @click="onQuery">查询</AButton
          ><AButton class="reset-button" @click="onReset">重置</AButton>
        </ACol>
      </ARow>
    </AFormModel>
  </div>
</template>
<script>
/**
 * 表格过滤区域
 * 定义基本布局和基本行为
 */
import FieldRenderMixin from '@/components/form/FieldRenderMixin';
import Expand from 'jscom/widgets/Expand';

export default {
  name: 'FilterBar',
  components: { Expand },
  props: {
    pRowCount: {
      type: Number,
      default: 3
    },
    pShowShadow: {
      type: Boolean,
      default: true
    },
    pLabelWidth: {
      type: String,
      default: '64px'
    }
  },
  mixins: [FieldRenderMixin],
  computed: {
    filterRows() {
      let result = [];
      function createEmptyRow() {
        return { count: 0, fields: [] };
      }
      let row = createEmptyRow();
      for (let [index, field] of this.pFields.entries()) {
        row.count += 1;
        row.fields.push(field);
        field.index = index;
        if (row.count === this.pRowCount) {
          result.push(row);
          row = createEmptyRow();
        }
      }
      if (this.pFields.length > 0) {
        if (row.count !== this.pRowCount) {
          result.push(row);
        } else {
          result.push(createEmptyRow());
        }
      }
      return result;
    }
  },
  created() {
    for (let field of this.pFields) {
      // field.width = '398px'
      field.width = '100%';
    }
  },
  data() {
    return {
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      spanVal: 24 / this.pRowCount
    };
  },
  methods: {
    /**
     * 查询触发
     */
    onQuery() {
      this.$emit('query');
    },
    /**
     * 重置触发
     */
    onReset() {
      this.$emit('reset');
    }
  },

  provide() {
    let vm = this;
    return {
      popupContainer: () => {
        return vm.$el;
      }
    };
  }
};
</script>
<style lang="less">
@import 'variables.less';
.filter {
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;

  margin-bottom: 16px;
  padding-top: 24px;
  padding-left: 30px;
  padding-bottom: 1px;
  position: relative;

  .label {
    display: inline-block;
    // width: 64px;
    /*height:20px;*/
    font-size: 14px;
    font-family: SourceHanSansCN-Regular, SourceHanSansCN;
    font-weight: 400;
    color: rgba(155, 155, 155, 1);
    line-height: 20px;
    margin-right: 14px;
    text-align: right;
  }

  .field {
    display: inline-block;
    max-width: 398px;
    min-width: 200px;
    width: 80%;
  }

  .filter-button {
    margin-right: 16px;
  }

  .row {
    margin-bottom: 24px;
    .ant-col {
      margin-right: 11px;
      padding-right: 0px !important;
      padding-left: 0px !important;
    }
  }
}

@media screen and (max-width: @page-switch-width) {
  .filter {
    .field {
      width: 60%;
    }
  }
}
</style>
