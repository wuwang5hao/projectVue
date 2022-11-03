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
  name: 'AddParameterDetailModal',
  mixins: [FormMixin, OptionsMixin],

  props: {
    pVisible: Boolean,
    pReadonly: Boolean,
    pRow: Object,
    pSelectKey: Number,
    pType: {
      type: String,
      default: 'add', // add, update, view
      validator: (type) =>  ['add', 'update', 'view'].indexOf(type) !== -1
    }
  },

  data() {
    let fields = [
      {label: '参数名称', type: 'str', name: 'name', placeholder: '请输入参数名称', required: true, maxLength: 50},
      {label: '类型', type: 'str', name: 'type', placeholder: '请输入类型', required: true, maxLength: 30},
      {label: '数值', type: 'str', name: 'decimalValue', replacePattern: /[^\d.-]/g, placeholder: '请输入数值', required: true, maxLength: 20,
        validator: (rule, value, callback) => {
          let secondNumber = value.split('.')[1]
          if(secondNumber && secondNumber.length>5) {
            callback(new Error('最多5位小数'))
            return
          }
          callback()
        }
      },
      {label: '计量单位', type: 'str', name: 'unit', placeholder: '请输入计量单位', required: true, maxLength: 50},
      {label: '资料来源', type: 'str', name: 'source', widget: 'LimitTextAreaWidget', placeholder: '请输入资料来源', maxLength: 300},
      {label: '备注', type: 'str', name: 'comment', widget: 'LimitTextAreaWidget', placeholder: '请输入备注', maxLength: 300},
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
        this.$apiUtil.getCarbonMaintenanceApi().add_parameter_details({...jsonModel, parameterTypeId: this.pSelectKey}).then(({data}) => {
          this.$emit('on-hide')
          this.$emit('success', data)
        }).catch(() => {
          this.SET_LOADING({loading: false})
        })
      } else if (this.pType === 'update') {
        this.$apiUtil.getCarbonMaintenanceApi().edit_parameter_details({...jsonModel, parameter_detail_id: this.pRow.id, version: this.pRow.version}).then(({data}) => {
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
