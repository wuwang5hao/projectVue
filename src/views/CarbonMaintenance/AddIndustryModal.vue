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
  name: 'AddIndustryModal',
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
      {label: '行业代码', type: 'str', name: 'tradeCode', placeholder: '请输入行业代码', replacePattern: /[^\w]/g, required: true, maxLength: 5,
        validator: (rule, value, callback) => {
          if(value && value.length<4) {
            callback(new Error('请输入最少4位'))
            return
          }
          callback()
        }
      },
      {label: '门类', type: 'str', name: 'kindName', placeholder: '请输入门类', required: true, maxLength: 20},
      {label: '大类', type: 'str', name: 'largeCategoryName', placeholder: '请输入大类', required: true, maxLength: 20},
      {label: '中类', type: 'str', name: 'mediumCategoryName', placeholder: '请输入中类', required: true, maxLength: 20},
      {label: '小类', type: 'str', name: 'littleCategoryName', placeholder: '请输入小类',  maxLength: 20},
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
        this.$apiUtil.getCarbonMaintenanceApi().add_trade(jsonModel).then(({data}) => {
          this.$emit('on-hide')
          this.$emit('success', data)
        }).catch(() => {
          this.SET_LOADING({loading: false})
        })
      } else if (this.pType === 'update') {
        this.$apiUtil.getCarbonMaintenanceApi().edit_trade({...jsonModel, trade_id: this.pRow.id, version: this.pRow.version}).then(({data}) => {
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
