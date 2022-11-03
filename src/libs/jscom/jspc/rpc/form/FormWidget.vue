<!--
@brief: 基于rpc form spec展示只读或可修改表单
-->
<template>
  <div>
    <div ref="form_holder"></div>
  </div>
</template>

<script>
import { FormSpec } from 'jspc/rpc/form/data/FormSpec'
import { FormData } from "rpc/Form/Form"
import Vue from 'vue'

export default {
  name: 'FormWidget',

  computed: {
  },
  props: {
    pSpecName: {
      type: String,
      required: true,
    },
    pSpec: {
      type: Object,
      default: null,
    },
    pReadonly: {
      type: Boolean,
      default: false
    },
    pApi: {
      type: Object,
      default: null,
    },
    pUniqueKey: {
      type: Object,
      default() {
        return {'field': '', 'valueJson': ''}
      }
    },
    pKvs: {
      type: Object,
      default() {
        return {}
      },
    },
    pCodeListGetter: {
      type: Function,
      default: null,
    },
    pUpload_headers: {
      type: Object,
      default() { return {} },
    },
    pUpload_action: { type: String, default: '' },
    pUpload_action_chunk: { type: String, default: '' },
    pUpload_action_complete: { type: String, default: '' },
    pInitJsonData: {
      type: Object,
      default () { return {} }
    },
    pKwargs: {
      type: Object,
      default () { return {} }
    }
  },

  data () {
    return {
      specName: this.pSpecName,
      uniqueKey: this.pUniqueKey,
      spec: this.pSpec,
      readonly: this.pReadonly,
      kvs: this.pKvs,
      api: this.pApi,

      upload_headers: this.pUpload_headers,
      upload_action: this.pUpload_action,
      upload_action_chunk: this.pUpload_action_chunk,
      upload_action_complete: this.pUpload_action_complete,

      formModel: {},
      formSpec: null,
      fields: [],
      formVue: null,
      isShow: true,
      onSubmitFinished: null,
      onSubmitException: null,
      kwargs: this.pKwargs
    }
  },

  created () {
    this.loadSpec()
  },

  mounted () {
  },

  watch: {
    spec (spec) {
      this.formSpec = new FormSpec(this, spec, this.kvs)
      this.$nextTick(this.initForm)
    },
    pUniqueKey (val) {
      this.uniqueKey = val
      this.loadSpec(true)
    }
  },

  methods: {
    loadSpec(force=false) {
      if (force || !this.spec) {
        this.api.getFormSpec(this.specName, this.uniqueKey).then((data) => {
          this.spec = data.spec
        })
      } else {
        this.formSpec = new FormSpec(this, this.spec, this.kvs)
        this.$nextTick(this.initForm)
      }
    },
    initForm () {
      if (!this.formSpec) {
        return
      }
      let dataJsonObj = {}
      if (this.spec.dataJson) {
        dataJsonObj = JSON.parse(this.spec.dataJson)
      }
      Object.assign(dataJsonObj, this.pInitJsonData)
      this.spec.dataJson = JSON.stringify(dataJsonObj)
      let {ctx, fields} = this.formSpec.init()
      this.fields = this.formSpec.fields
      this.formModel = ctx.model
      this.formVue = new Vue({
        render: (h) => {
          return h('Form', {
            ref: 'formModel',
            props: {
              model: this.formModel,
              labelWidth: 120
            }
          },
          this.getFormItems(h),
          )
        }
      })
      const component = this.formVue.$mount()
      let holder = this.$refs.form_holder
      while (holder.firstChild) {
        holder.removeChild(holder.firstChild)
      }
      holder.appendChild(component.$el)
    },
    _submitButtonRender (h) {
      return h('Button', {
        props: {
          type: "primary"
        },
        on: {
          click: () => {
            this.onSubmit("formModel")
          }
        }
      }, this.submitText)
    },
    _cancelButtonRender (h) {
      return h('Button', {
        style: { marginLeft: 10 },
        on: {
          click: () => {
            this.isShow = false
          }
        }
      }, '取消')
    },
    getFormItems (h) {
      return Array.from(this.fields, (field) => {
        return field.getRender(h, {readonly: this.readonly})
      })
    },
    OnSubmitFinished (retmsg) {
      if (retmsg.ret === 0) {
        this.$Message.info('提交成功 ' + retmsg.msg)
      } else {
        // result {'message': 'Success', 'code': 0, 'timestamp': 1543471646666,
        // 'data': {'result': {
        // 'errors': {'mobile': {'msg': 'invalid mobile', 'code': 'invalid_mobile'}},
        // 'ret': -1,
        // 'msg': 'form data is invalid'}
        // }}
        if (retmsg.errors) {
          for (let field in retmsg.errors) {
            this.$Message.error(`字段错误 ${field} ${retmsg.errors[field]}`)
          }
        }
        this.$Message.error('提交失败 '+ retmsg.msg)
      }
    },
    OnSubmitException(error) {
      this.$Message.error('提交失败')
    },
    onSubmit (props) {
      let formVue = this.formVue
      let dataJsonObj = this.formSpec.getFormDataJsonObj()
      formVue.$refs['formModel'].validate((valid) => {
        if ('onValid' in props) {
          props.onValid(valid, dataJsonObj)
        }
        if (valid) {
          this.doSubmit(dataJsonObj)
        }
      })
    },
    doSubmit(dataJsonObj) {
      let formData = new FormData()
      formData.dataJson = JSON.stringify(dataJsonObj)
      formData.kwargs = JSON.stringify(this.pKwargs)
      this.api.submitForm(this.specName, this.uniqueKey, formData).then((data) => {
        this.OnSubmitFinished(data.result)
        if (this.onSubmitFinished) {
          this.onSubmitFinished(data.result)
        }
      }).catch((error) => {
        console.log('submitForm failed: ' + error)
        this.OnSubmitException(error)
        if (this.onSubmitException) {
          this.onSubmitException(error)
        }
      })
    },
    getCodeList() {
      if (this.pCodeListGetter) {
        return this.pCodeListGetter()
      } else {
        return new Promise((resolve, reject) => {
          resolve([])
        })
      }
    },
    OnDestroyForm() {
      for (let field of this.fields) {
        field.OnDestroy()
      }
    },
  }
}
</script>
