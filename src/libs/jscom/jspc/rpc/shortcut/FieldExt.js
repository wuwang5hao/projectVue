import { BaseMoreInputField } from 'jspc/rpc/table/data/Field'
import CustomPopup from "jspc/utils/CustomPopup"
import SimpleCompactTable from 'jspc/rpc/table/SimpleCompactTable'
import CompleteCompactTable from 'jspc/rpc/table/CompleteCompactTable'
import {NotImplementedError} from 'jscom/core/exceptions'

export class BaseTableMoreInputField extends BaseMoreInputField {
  constructor(parentWidget, fieldSpec, valueNameMap, specName, tableApi, style='drawer') {
    super(parentWidget, fieldSpec, valueNameMap)
    this.specName = specName
    this.tableApi = tableApi
    this.style = style
    this.tableKvs = {}
    this.beforeGetTableFunc = null
    this.checkSelectValueFunc = null
    this.rowSuccessFunc = null
    this.initFilterValues = {}
    this.hideFilters = []
  }
  onMoreButtonClicked(event, params) {
    if (this.beforeGetTableFunc) {
      if (!this.beforeGetTableFunc(this)) {
        return
      }
    }
    new CustomPopup(this.style).create({
      store: this.parentWidget.$store,
      render: (h, vm) => {
        return h(SimpleCompactTable,
          {
            props: {
              pSpecName: this.specName,
              pApi: this.tableApi,
              pKvs: this.tableKvs,
              pInitFilterValues: this.initFilterValues,
              pHideFilters: this.hideFilters
            },
            on: {
              'on-row-double-click': (row, index) => {
                if (this.checkSelectValueFunc) {
                  if (!this.checkSelectValueFunc(row, this)) {
                    return
                  }
                }
                this.setRowValue(row, params)
                if (this.rowSuccessFunc) {
                  this.rowSuccessFunc(row, params)
                }
                vm.data.methods.close()
              }
            }
          }
        )
      },
      popupProps: {
        width: 67,
        maskClosable: true,
      },
    })
  }
  setBeforeGetTableFunc (func) {
    this.beforeGetTableFunc = func
  }
  setCheckSelectValueFunc (func) {
    this.checkSelectValueFunc = func
  }
  setTableKvs (kvs) {
    this.tableKvs = kvs
  }
  setRowValue(row, params) {
    throw NotImplementedError
  }
  setInitFilterValues (values) {
    this.initFilterValues = values
  }
  setRowSuccessFunc (func) {
    this.rowSuccessFunc = func
  }
  setHideFilters (filters) {
    this.hideFilters = filters
  }
}

export class CompleteTableMoreInputField extends BaseTableMoreInputField {
  constructor(parentWidget, fieldSpec, valueNameMap, specName, tableApi, formApi, style='drawer') {
    super(parentWidget, fieldSpec, valueNameMap, specName, tableApi, style)
    this.formApi = formApi
  }
  onMoreButtonClicked(event, params) {
    new CustomPopup(this.style).create({
      store: this.parentWidget.$store,
      render: (h, vm) => {
        return h(CompleteCompactTable,
          {
            props: {
              pSpecName: this.specName,
              pApi: this.tableApi,
              pFormApi: this.formApi
            },
            on: {
              'on-row-double-click': (row, index) => {
                this.setRowValue(row, params)
                if (this.rowSuccessFunc) {
                  this.rowSuccessFunc()
                }
                vm.data.methods.close()
              }
            }
          }
        )
      },
      popupProps: {
        width: 67,
        maskClosable: true,
      },
    })
  }
}

export class TemplateMoreInputField extends BaseMoreInputField {
  constructor(parentWidget, fieldSpec, valueNameMap, template, templateProps, style='modal') {
    super(parentWidget, fieldSpec, valueNameMap)
    this.style = style
    this.template = template
    this.templateProps = templateProps
    this.specName = 'template'
  }
  onMoreButtonClicked(event, params) {
    new CustomPopup(this.style).create({
      store: this.parentWidget.$store,
      render: (h, vm) => {
        return h(this.template, {
          props: Object.assign(this.templateProps, { pParams: params, pWidgetVal: this.widgetVal }),
          on: {
            'on-ok': (row) => {
              this.setRowValue(row, params)
              vm.data.methods.close()
            }
          }
        })
      },
      popupProps: {
        'footer-hide': true,
        'mask-closable': false
      }
    })
  }
  setRowSuccessFunc (fun) {}
}
