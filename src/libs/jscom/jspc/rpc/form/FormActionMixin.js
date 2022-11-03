import ModalFormDialog from './ModalFormDialog'

export default {
  name: 'FormActionMixin',

  props: {
    pFormKvs: { type: Object, default() { return {} } },
    pFormKwargs: {
      type: Object,
      default () {
        return {}
      }
    },
    pFormApi: Object,
    pUpload_action: String,
    pUpload_action_chunk: String,
    pUpload_action_complete: String,
    pUpload_headers: Object,
    pFormInitJsonData: Object,
    pMaskClosable: {type: Boolean, default: true}
  },

  watch: {
    pFormKvs(val) {
      this.formKvs = val
    }
  },

  data() {
    return {
      uniqueKey: {field: '', valueJson: ''},
      formKvs: this.pFormKvs, // 用于添加默认的提交数据，所有value值都为String
      upload_action: this.pUpload_action,
      upload_action_chunk: this.pUpload_action_chunk,
      upload_action_complete: this.pUpload_action_complete,
      upload_headers: this.pUpload_headers,
      formApi: this.pFormApi,
      formInitJsonData: this.pFormInitJsonData,
      maskClosable: this.pMaskClosable,
      kwargs: this.pFormKwargs
    }
  },

  methods: {
    OnInitFormSpec(name, formSpec) {},
    isSupportFormAction() {
      return true
    },
    updateUniqueKey (primaryKey, value) {
      if (!value || !primaryKey) {
        this.uniqueKey = {field: '', valueJson: ''}
      } else {
        this.uniqueKey = {field: primaryKey, valueJson: JSON.stringify(value)}
      }
    },
    getFormSpec (name) {
      this.isLoading = true
      this.formApi.getFormSpec(name, this.uniqueKey).then((data) => {
        this.OnInitFormSpec(name, data.spec)
        this.showForm(data.spec)
      }).catch((error) => {
        console.log('getFormSpec failed: ' + error)
      }).finally(() => {
        this.isLoading = false
      })
    },
    showForm (formSpec) {
      ModalFormDialog.create({
        pSpecName: formSpec.name,
        pSpec: formSpec,
        pApi: this.formApi,
        pUniqueKey: this.uniqueKey,
        pKvs: this.formKvs,
        pKwargs: this.kwargs,
        pCodeListGetter: this.getCodeList,
        pUpload_action: this.upload_action,
        pUpload_action_chunk: this.upload_action_chunk,
        pUpload_action_complete: this.upload_action_complete,
        pUpload_headers: this.upload_headers,
        pInitJsonData: this.formInitJsonData,
        pMaskClosable: this.maskClosable,
      }).show({
        onSubmitFinished: (result) => {
          if (this.loadTableRecords) {
            this.loadTableRecords()
          }
          this.submitFinished(result)
        }
      })
    },

    submitFinished (result) {
    },
    ondbClickItem (row, index) {
      let updateAction = this.tableSpec.getActionByName('UpdateFormAction')
      let data = JSON.parse(this.tableSpec.tableRecords[index])
      let formName = this.reviseUpdateActionForm(updateAction, row, index, data)
      if (!formName) return
      let primaryKey = this.tableSpec.primaryKey
      if (!this.checkRow(row)) {
        this.$Modal.warning({
          content: '该记录不支持修改'
        })
      } else {
        this.updateUniqueKey(this.tableSpec.primaryKey, row[primaryKey])
        this.getFormSpec(formName)
      }
    },
    reviseUpdateActionForm(updateAction, row, index, data) {
      if (!updateAction) return null
      else return updateAction.actionJsonObj.form
    },
    checkRow(row) {
      let primaryKey = this.tableSpec.primaryKey
      return row[primaryKey] !== undefined
    },
    getCodeList()  {
      return new Promise((resolve, reject) => {
        resolve([])
      })
    }
  }
}
