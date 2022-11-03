<template>
  <ModalForm
    v-model="visible"
    ref="modalForm"
    :pTitle="modalTitle"
    :pFields="fields"
    :pJsonModel="jsonModel"
    :pReadonly="pReadonly"
    @confirm="onConfirm"
  >
  </ModalForm>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import MutationTypes from '@/store/MutationTypes'
import FormMixin from "@/components/form/FormMixin";
import OptionsMixin from "@/common/OptionsMixin";

export default {
  name: 'AddModuleModal',
  mixins: [FormMixin, OptionsMixin],

  props: {
    pVisible: Boolean,
    pReadonly: Boolean,
    pRow: Object,
    pType: {
      type: String,
      default: 'add', // add, update, view
      validator: (type) =>  ['add', 'update', 'view'].indexOf(type) !== -1
    }
  },

  data() {
    let fields = [
      {label: '模块名称', type: 'str', name: 'name', placeholder: '请输入模块名称', required: true, maxLength: 50},
      {label: '分类', type: 'str', name: 'type', placeholder: '请输入分类名称', required: true, maxLength: 50},
      {label: '计算方式', type: 'str', name: 'calculateWay', widget: 'SelectWidget', required: true,
        options: [{value: '1', label: '+'}, {value: '2', label: '-'}]}
    ]
    return {
      jsonModel: {},
      fields,
      visible: this.pVisible,
    }
  },
  created() {
    if(this.pType === 'update' || this.pType === 'view') {
      for (const key in this.pRow) {
        if (this.pRow[key] === '-') {
          this.pRow[key] = ''
        }
      }
      this.jsonModel = {
        ...this.pRow,
      }
    }
  },
  methods: {
    ...mapMutations([
      MutationTypes.SET_LOADING
    ]),
    onConfirm() {
      this.SET_LOADING({loading: true})
      let jsonModel = {...this.jsonModel}
      if (this.pType === 'add') {
        this.$apiUtil.getCarbonMaintenanceApi().add_modules(jsonModel).then(({data}) => {
          this.$emit('on-hide')
          this.$emit('success', data)
        }).catch(() => {
          this.SET_LOADING({loading: false})
        })
      } else if (this.pType === 'update') {
        this.$apiUtil.getCarbonMaintenanceApi().edit_modules({...jsonModel, module_id: this.pRow.id, version: this.pRow.version}).then(({data}) => {
          this.$emit('on-hide')
          this.$emit('success', data)
        }).catch(() => {
          this.SET_LOADING({loading: false})
        })
      }
    }
  }
}
</script>

<style lang="less">

</style>
