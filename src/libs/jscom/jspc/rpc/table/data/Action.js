import { PksAction, PkAction, PksActionArg1, ExportCsvAction, PkActionArg1, ActionArg1 } from 'rpc/Table/Table'

export let actionNameMap = {
  exportCsv: 'exportCsv',
  form: 'FormAction',
  createForm: 'CreateFormAction',
  updateForm: 'UpdateFormAction',
  batchDelete: 'BatchDeleteAction',
  printAction: 'ClientPrintCmdAction',
  repaymentAction: 'ClientRepaymentAction'
}

export class Action {
  static Create(tableWidget, actionSpec) {
    if (actionSpec.actionCls === 'ExportCsvAction') {
      return new ExportAction(tableWidget, actionSpec)
    } else if (actionSpec.name === actionNameMap.repaymentAction) {
      return new RepaymentAction(tableWidget, actionSpec)
    } else if (actionSpec.name === 'RefreshAction') {
      return new RefreshAction(tableWidget, actionSpec)
    }
    return new Action(tableWidget, actionSpec)
  }

  constructor (tableWidget, actionSpec) {
    this.tableWidget = tableWidget
    this.actionSpec = actionSpec
    this.actionData = null
    this.disabled = false
    this.inlineDisplay = ''
    this.type = 'default'
    this.args = {}
  }

  setDisabled() {
    this.disabled = true
    this.inlineDisplay = 'none'
  }

  setEnabled() {
    this.disabled = false
    this.inlineDisplay = ''
  }

  setTypePrimary() {
    this.type = 'primary'
  }

  cleanType() {
    this.type = 'default'
  }

  getActionSpecReq () {
    let specReq = Object.assign({}, this.actionSpec)
    if (this.actionData) {
      specReq.actionJson = JSON.stringify(this.actionData)
    } else {
      specReq.actionJson = '{}'
    }
    return specReq
  }

  cleanArgs() {
    this.actionData = null
  }

  beforeRunAction () {
  }

  _collectPks () {
    let pks = []
    let selections = this.collectSelections(this.tableWidget)
    for (let row of selections) {
      let pk = row[this.tableWidget.tableSpec.primaryKey]
      if (pk !== undefined) {
        pks.push(''+pk)
      }
    }
    return pks
  }

  collectSelections() {
    let result = []
    if (this.tableWidget.selections && this.tableWidget.selections.length > 0) {
      for (let row of this.tableWidget.selections) {
        result.push(row)
      }
    } else if (this.tableWidget.selection) {
      result.push(this.tableWidget.selection)
    }
    return result
  }

  prepareArgs() {
    if (this.actionCls === 'PksAction') {
      this.actionData = new PksAction()
      this.actionData.pks = this._collectPks()
    } else if (this.actionCls === 'PkAction') {
      this.actionData = new PkAction()
      this.actionData.pk = '' + this.tableWidget.selection[this.tableWidget.tableSpec.primaryKey]
    } else if (this.actionCls === 'PksActionArg1') {
      this.actionData = new PksActionArg1()
      this.actionData.pks = this._collectPks()
      this.actionData.arg0 = JSON.stringify(this.args['arg0'])
    } else if (this.actionCls === 'PkActionArg1') {
      this.actionData = new PkActionArg1()
      this.actionData.pk = '' + this.tableWidget.selection[this.tableWidget.tableSpec.primaryKey]
      this.actionData.arg0 = JSON.stringify(this.args['arg0'])
    } else if (this.actionCls === 'ActionArg1') {
      this.actionData = new ActionArg1()
      this.actionData.arg0 = JSON.stringify(this.args['arg0'])
    }
    // clean
    // tableSpecComp.selections = null
    // tableSpecComp.selection = null
    return this.actionData
  }
  postPrepareArgs() {
    if (this.actionCls === 'PksActionArg1' || this.actionCls === 'PkActionArg1' ||
          this.actionCls === 'ActionArg1') {
      this.actionData.arg0 = JSON.stringify(this.args['arg0'])
    }
  }

  afterRunAction (data) {

  }

  runAction (table) {
    return false
  }

  getRender (h, params) {
    return h('Button', {
      'class': params.class,
      on: {
        click: params.clickHandler
      }
    }, this.title)
  }

  get name () {
    return this.actionSpec ? this.actionSpec.name : ''
  }

  get field () {
    return this.actionSpec ? this.actionSpec.field : ''
  }

  get title () {
    return this.actionSpec ? this.actionSpec.title : ''
  }

  get actionCls() {
    return this.actionSpec ? this.actionSpec.actionCls : ''
  }

  get actionJsonObj () {
    if (!this.actionSpec || !this.actionSpec.actionJson) {
      return {}
    }
    return JSON.parse(this.actionSpec.actionJson)
  }
  isBatch () {
    return this.actionCls === 'PksAction' || this.actionCls === 'PksActionArg1'
  }
  isPkAction () {
    return this.actionCls === 'PkAction' || this.actionCls === 'PkActionArg1'
  }
  hasInlineTitle () {
    return this.actionSpec.inlineTitle !== ''
  }
  hasTitle() {
    return this.title !== '';
  }
  get inlineTitle () {
    return this.actionSpec ? this.actionSpec.inlineTitle : ''
  }
  get confirmMsg () {
    if (!this.actionSpec) return ''
    if (this.actionSpec.confirmMsg === 'auto') {
      let title = this.inlineTitle ? this.inlineTitle : this.title
      if (!title.startsWith('确认')) {
        return '确认' + title + '?'
      } else {
        return title + '?'
      }
    } else {
      return this.actionSpec.confirmMsg
    }
  }

  isSelection () {
    if (this.isBatch()) {
      return this.tableWidget.selections && this.tableWidget.selections.length > 0
    } else if (this.isPkAction()) {
      return !!this.tableWidget.selection
    } else {
      return true
    }
  }
}

class ExportAction extends Action {
  beforeRunAction () {
    let args = new ExportCsvAction()
    let actionJson = JSON.parse(this.actionSpec.actionJson)
    args.filename = this.tableWidget.specName + actionJson.suffix || '.xlsx'
    args.query = this.tableWidget.createQuery()
    args.fields = Array.from(this.tableWidget.columns, (column) => {
      return column.key
    }).filter((value) => {
      return value != null && value !== undefined
    })
    this.actionData = args
  }
  afterRunAction (data) {
    // let writter = new FileWritter(this.actionData.filename)
    // writter.save(data)
  }
}

class RepaymentAction extends Action {
  runAction (table) {
    table.runPayAction(this)
    return true
  }
}

class RefreshAction extends Action {
  runAction(table) {
    table.loadTableRecords()
    if(table.$Spin) {
      table.$Spin.show();
      setTimeout(() => {
        table.$Spin.hide();
      }, 700);
    }
    return true
  }
}
