<template>
  <div class="tables-edit-outer">
    <div v-if="!isEditing" class="tables-edit-con" :style="borderStyle" @click='startEdit'>
      <Tooltip v-if='pColumn.ellipsis' placement="bottom" max-width='300' :content="valueLabel" style="width:100%">
        <span class='tables-edit-tooltip'>{{ valueLabel }}</span>
      </Tooltip>
      <span v-else class="value-con">&nbsp;{{ valueLabel }}&nbsp;</span>
      <Button v-if="pEditable" @click.stop="startEdit" class="tables-edit-btn" style="padding: 2px 4px;" type="text"><Icon type="md-create"></Icon></Button>
    </div>
    <div v-else class="tables-editing-con">
      <!-- <Button  @click="saveEdit" type="text"><Icon type="md-checkmark"></Icon></Button> -->
      <!-- <Button v-show='!isShowAction' @click="cancelEdit" type="text"><Icon type="md-close"></Icon></!-->
      <FieldWidget ref="fieldWidget" :pForm="pForm" :pTable="pTable"
                   :pColumn="pColumn" :pCtx="ctx" v-on:input="saveEdit" @on-open-change='onOpenChange'></FieldWidget>
    </div>
  </div>
</template>

<script>
import FieldWidget from './FieldWidget'
import { objUtil } from "jscom/utils/objutil"

export default {
  name: 'EditCell',
  components: { FieldWidget },
  props: {
    pTableExt: Object,
    pCellId: String,
    pParams: Object,
    pEditable: Boolean,
    pColumn: Object,
    // NOTE: 这里的 pCtx 中的所有值修改都会引发本控件的刷新
    pCtx: Object,
    pForm: Object,
    pTable: Object,
  },
  data() {
    return {
      fieldWidget: null,
      ctx: this.pCtx,
      genWidget: null,
      isShowAction: true
    }
  },
  created() {

  },
  computed: {
    valueLabel() {
      let value = this.ctx.jsonModel[this.pParams.column.key]
      return this.pTableExt.tableSpec.convertFieldValue(this.pParams.column.key, value);
    },
    isEditing () {
      let result = false
      if (this.pTableExt.editingCellId) {
        result = this.pTableExt.editingCellId === this.pCellId
      }
      // console.log(this.pCellId+' isEditing ' + result)
      return result
    },
    cell() {
      return this.ctx.jsonModel[this.pParams.column.key]
    },
    fieldName() {
      return this.pParams.column.key
    },
    record() {
      return this.ctx.jsonModel
    },
    borderStyle() {
      let error = this.error
      if (!objUtil.isEmpty(error)) {
        return {'border': '1px solid #ed4014'}
      } else {
        return {}
      }
    },
    error() {
      if (!this.ctx.validate) return {}
      if (!this.ctx.validate.errors) return {}
      return this.ctx.validate.errors[this.fieldName]
    }
  },
  watch: {
    pCtx(ctx) {
      this.ctx = ctx
    }
  },
  methods: {
    startEdit (e) {
      if (!this.pEditable) {
        return
      }
      this.genWidget = this.pColumn.genWidget(this.pTable, this.ctx)
      if (this.genWidget.specName) {
        this.genWidget.onMoreButtonClicked(e, this.pParams)
        this.genWidget.setRowSuccessFunc(this.onSaveEdit)
        return
      }
      if (this.genWidget.type === 'date') {
        this.isShowAction = false
      }
      this.$emit('on-start-edit', this.pParams, this)
    },
    onSaveEdit () {
      this.onInput(this.genWidget.jsonVal)
      this.$emit('on-save-edit', this.pParams, this, this.genWidget)
    },
    validate(onValid) {
      console.log('==> validate ' + this.$refs.fieldWidget)
      if (!this.fieldWidget) {
        this.fieldWidget = this.$refs.fieldWidget
      }
      if (this.fieldWidget) {
        this.fieldWidget.validate(onValid)
      }
    },
    saveEdit (onValid) {
      console.log('this.uid ' + this._uid + ' cellid ' + this.pCellId + ' ' + this.$refs.fieldWidget)
      console.log(this.$refs.fieldWidget.widget)
      if (!this.$refs.fieldWidget.widget.jsonVal) {
        this.$emit('on-save-edit', this.pParams, this, this.$refs.fieldWidget.widget)
      }
      this.validate((valid, widget) => {
        console.log('valid ' + valid)
        if (onValid && this.$sysUtil.isFunction(onValid)) { onValid(valid, widget) }
        if (valid) {
          this.$emit('on-save-edit', this.pParams, this, this.$refs.fieldWidget.widget)
        } else {
          this.$Message('请提交未完成修改')
        }
      })
    },
    cancelEdit () {
      this.$emit('on-cancel-edit', this.pParams, this)
    },
    onOpenChange (value) {
      this.$nextTick(() => {
        if (!value) {
          this.cancelEdit()
        }
      })
    },
    onInput(value) {
      this.$emit('input', value)
      if (this.genWidget.type === 'date') {
        this.saveEdit()
      }
    }
  }
}
</script>

<style lang="less">
.tables-edit-outer{
  height: 100%;
  .tables-edit-con{
    position: relative;
    height: 100%;
    .value-con{
      vertical-align: middle;
    }
    .tables-edit-btn{
      position: absolute;
      right: 10px;
      top: 0;
      display: none;
    }
    &:hover{
      .tables-edit-btn{
        display: inline-block;
      }
    }
  }
  .tables-editing-con{
    .tables-edit-input{
      width: ~"calc(100% - 60px)";
    }
  }
  .tables-edit-tooltip{
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
