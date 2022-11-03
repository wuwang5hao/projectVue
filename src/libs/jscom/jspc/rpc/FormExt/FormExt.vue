<template>
  <div>
    <div ref="form_holder"></div>
  </div>
</template>
<script>
import { FormSpec } from 'jspc/rpc/form/data/FormSpec'
import Vue from 'vue'

export default {
  name: 'FormExt',
  props: {
    pSpec: {type: Object},
    pFieldHolders: {type: Object, default() {return {}}},
    pInline: {type: Boolean, default: false},
    pReadonly: { type: Boolean, default: false },
    pFixedData: { type: Object, default() {return {}} },
    pCodeListGetter: { type: Function, default: null }
  },
  data() {
    return {
      formSpec: null,
      spec: this.pSpec,
      formVues: [],
      ctx: [],
    }
  },
  watch: {
    pSpec(spec) {
      this.spec = spec
      this.formSpec = new FormSpec(this, spec, this.pFixedData)
      this.$nextTick(this.initForm)
    },
    pFieldHolders(holders) {
      this.$nextTick(this.initForm)
    }
  },
  created () {
    if (this.spec) {
      this.formSpec = new FormSpec(this, this.spec, this.pFixedData)
      this.$nextTick(this.initForm)
    }
  },
  methods: {
    getFormItems (h) {
      let _this = this
      return Array.from(this.formSpec.fields, (field) => {
        if (!(field.name in this.pFieldHolders)) {
          return field.getRender(h, {readonly: this.pReadonly, model: _this.ctx.model, onInput: this.onInput})
        } else {
          this.$nextTick(function () {
            // 必须使用 nextTick 延迟执行，否则在外层 Vue.render 会被影响，
            // Vue 的 targetStack 会被打乱，出现 Dep.target == null 的情况
            // 从而导致 field.getRender 过程依赖变量收集出现问题
            let vm = new Vue({
              render: (h0) => {
                return h0('Form',
                  {
                    ref: 'form',
                    props: {
                      model: _this.ctx.model,
                      labelWidth: 5 * field.name.length,
                      inline: this.pInline,
                    }
                  },
                  [field.getRender(h0, {readonly: this.pReadonly, model: _this.ctx.model, onInput: this.onInput}), ]
                )
              }
            })
            let holder = this.pFieldHolders[field.name]
            while (holder.firstChild) {
              holder.removeChild(holder.firstChild)
            }
            const component = vm.$mount()
            holder.appendChild(component.$el)
            _this.formVues.push(vm)
          })
        }
      })
    },
    initForm() {
      if (!this.formSpec) {
        return
      }
      // TODO: if use ctx.model hold in FormSpec, will cause form validate failed
      let {ctx, fields} = this.formSpec.init()
      this.ctx = ctx
      let maxNameLen = 10
      for (let field of this.formSpec.fields) {
        let nameLen = field.name.length
        if (nameLen > maxNameLen) {
          maxNameLen = nameLen
        }
      }

      let _this = this
      let vm = new Vue({
        render: (h) => {
          return h('Form',
            {
              ref: 'form',
              props: {
                model: _this.ctx.model,
                labelWidth: 6 * maxNameLen,
                inline: this.pInline,
              }
            },
            _this.getFormItems(h),
          )
        }
      })
      const component = vm.$mount()
      let holder = this.$refs.form_holder
      while (holder.firstChild) {
        holder.removeChild(holder.firstChild)
      }
      holder.appendChild(component.$el)
      this.formVues.push(vm)
    },
    loadSpec(spec) {
      this.spec= spec
      this.formSpec = new FormSpec(this, this.spec, this.pFixedData)
      this.$nextTick(this.initForm)
    },
    getForms() {
      let result = []
      for (let vue of this.formVues) {
        result.push(vue.$refs.form)
      }
      return result
    },
    getFormValidatePromises() {
      let result = []
      let forms = this.getForms()
      for (let form of forms) {
        result.push(
          new Promise((resolve, reject) => {
            form.validate((valid) => {
              resolve(valid)
            })
          })
        )
      }
      return result
    },
    validate(func) {
      return new Promise((resolve, reject) => {
        let formValidatePromises = this.getFormValidatePromises()
        Promise.all(formValidatePromises).then((validList) => {
          let valid = true
          for (let item of validList) {
            if (!item) {
              valid = false
              break
            }
          }
          resolve(valid)
          if (func) {
            func(valid)
          }
        })
      })
    },
    // NOTE: deprecatd
    getFormDatas() {
      return this.formSpec.getFormDatas()
    },
    getFormDataJsonObj() {
      return this.formSpec.getFormDataJsonObj()
    },
    getFormDataJsonStr() {
      return this.formSpec.getFormDataJsonStr()
    },
    getFormFieldValueMap() {
      return this.formSpec.getFieldValueMap()
    },
    setFormSpecValueMap(valueNameMap) {
      this.formSpec.setSpecValueMap(valueNameMap)
    },
    checkResult(result, nameTableMap, showTblHint=true) {
      // 'result': {
      // 'formResult': {
      //   'ret': -1,
      //   'msg': '表单错误',
      //   'errors': {
      //     'relative_type': {'msg': '这个字段是必填项。', 'code': 'required'},
      //     'relative_id': {'msg': '这个字段是必填项。', 'code': 'required'}
      //   }
      // },
      // 'tableRecordResultMap': {
      //   'StoreBillSku': [{'index': 0, 'errors': {'averageCost': {'msg': '入库单成本不能为空', 'code': 'None'}}}]
      // }
      // }
      let ret = true
      let errmsg = ''
      if (result.formResult['ret'] !== 0) {
        ret = false
        let msg = result.formResult['msg']
        let errors = result.formResult['errors']
        if (errors) {
          errmsg += `${msg}:`
          for (let [field, item] of Object.entries(errors)) {
            errmsg += ` ${field} ${item['msg']}`
          }
        }
      }
      let tableRecordResultMap = result.tableRecordResultMap
      if (tableRecordResultMap) {
        let tblRet = true
        let errmsgList = []
        for (let [name, tbl] of Object.entries(nameTableMap)) {
          let tblResult = tableRecordResultMap[name]
          if (!tblResult) continue
          let [tblRet0, errmsgList0] = tbl.checkResult(tblResult, showTblHint)
          tblRet &= tblRet0
          errmsgList = errmsgList.concat(errmsgList0)
        }
        if (!tblRet) {
          errmsg += ' 请查看表格错误'
          if (errmsgList.length) {
            errmsg += '</br>' + errmsgList.join('</br>')
          }
        }
        ret &= tblRet
      }
      return [ret, errmsg]
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
    onInput (value, val, name) {
      this.$emit('on-change', value, val, name)
    }
  }
}
</script>
