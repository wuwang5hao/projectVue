<template>
  <div class='cd-item'>
    <div class='cd-item-header'>
      <p class='cd-item-title'>{{ pTitle }}</p>
      <Button v-if='pEditable' @click='onEditForm()' type='text'>编辑</Button>
    </div>
    <div ref="form_holder"></div>
  </div>
</template>
<script>
import FormWidget from 'jspc/rpc/form/FormWidget';
import ModalFormDialog from './ModalFormDialog'

export default {
  extends: FormWidget,
  props: {
    pTitle: {
      type: String,
      default: ''
    },
    pEditable: {
      type: Boolean,
      default: true
    },
    pUniqueKey: {
      type: Object,
      default() {
        return {'field': '', 'valueJson': ''}
      },
    }
  },
  data() {
    return {}
  },
  methods: {
    onEditForm() {
      ModalFormDialog.create({
        pSpecName: this.specName,
        pSpec: this.spec,
        pApi: this.api,
        pUniqueKey: this.pUniqueKey,
      }).show({
        onSubmitFinished: (retmsg) => {
          if (retmsg.ret === 0) {
            this.loadSpec(true)
          }
        }
      })
    }
  }
}

</script>
<style lang="less" scoped>
@import 'jspc/styles/common.less';
.cd-item {
  .cd-item-header {
      padding: @spacer 0;
      margin-bottom: @spacer;
      border-bottom: 1px solid @border-color;
      display: flex;
      justify-content: space-between;
    .cd-item-title {
      font-size: @h2-font-size;
      font-weight: bold;
    }
  }
}
</style>
