/* eslint-disable */
import {BaseInterfApi} from 'unityrpcjs/unityrpc.js'

import * as FxTable from "rpc/FxTable/FxTable"
import * as FxAction from "rpc/FxAction/FxAction"

export class FormFieldSpec {
    constructor() {
        this.fieldSpec = new FxTable.FieldSpec();  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

FormFieldSpec.__json_class__ = 'FxForm.FormFieldSpec'

export class FormUniqueKey {
    constructor() {
        this.field = "";  // 0 require
        this.valueJson = "";  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

FormUniqueKey.__json_class__ = 'FxForm.FormUniqueKey'

export class FormSpec {
    constructor() {
        this.name = "";  // 0 require
        this.formFields = [];  // 1 require
        this.dataJson = "";  // 2 require
        this.fieldValueNameMap = {};  // 3 optional
        this.actions = [];  // 4 require
        this.fieldTableSpecMap = {};  // 5 optional
        this.fieldTableQueryResultMap = {};  // 6 optional
        this.arch = "";  // 7 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

FormSpec.__json_class__ = 'FxForm.FormSpec'

export class FormValidationError {
    constructor() {
        this.msg = "";  // 0 require
        this.code = "";  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

FormValidationError.__json_class__ = 'FxForm.FormValidationError'

export class FormData {
    constructor() {
        this.dataJson = "";  // 0 require
        this.fieldRecordsMap = {};  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

FormData.__json_class__ = 'FxForm.FormData'

export class TableRecordResult {
    constructor() {
        this.index = 0;  // 0 require
        this.errors = {};  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

TableRecordResult.__json_class__ = 'FxForm.TableRecordResult'

export class FormResult {
    constructor() {
        this.ret = 0;  // 0 require
        this.msg = "";  // 1 require
        this.errors = {};  // 2 optional
        this.dataJson = "";  // 3 optional
        this.tableRecordResultMap = {};  // 4 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

FormResult.__json_class__ = 'FxForm.FormResult'

export class SubmitAction {
    constructor() {
    }

    dump() {
        return JSON.stringify(this);
    }
}

SubmitAction.__json_class__ = 'FxForm.SubmitAction'

export class CancelAction {
    constructor() {
    }

    dump() {
        return JSON.stringify(this);
    }
}

CancelAction.__json_class__ = 'FxForm.CancelAction'

export class FxFormInterfApi extends BaseInterfApi {
    constructor(baseUrl, moduleName='FxForm',
            interfName='FxFormInterf', token='anonymous', ...args) {
        super(baseUrl, moduleName, interfName, token, ...args)
    }


    getFormSpec(name,uniqueKey,actionName,contextJson, context) {
        let params = {
            name: name,
            uniqueKey: uniqueKey,
            actionName: actionName,
            contextJson: contextJson,
            };
        let req = this.createRequest('getFormSpec', params);
        var _this = this;
        var respPromise = req.request();

        return new Promise(function (resolve, reject) {
            respPromise.then(function(resp) {
                _this.fillContext(context, resp.json);
                let robj = resp.json['data'];
                try {
                    resolve(robj);
                } catch (err) {
                    reject(new RpcSerializeError('getFormSpec'+err.message));
                }
            }, function(err) {
                console.log("error " + err.message);
                reject(err);
            });
        });
    }

    submitForm(name,uniqueKey,actionName,formData,contextJson, context) {
        let params = {
            name: name,
            uniqueKey: uniqueKey,
            actionName: actionName,
            formData: formData,
            contextJson: contextJson,
            };
        let req = this.createRequest('submitForm', params);
        var _this = this;
        var respPromise = req.request();

        return new Promise(function (resolve, reject) {
            respPromise.then(function(resp) {
                _this.fillContext(context, resp.json);
                let robj = resp.json['data'];
                try {
                    resolve(robj);
                } catch (err) {
                    reject(new RpcSerializeError('submitForm'+err.message));
                }
            }, function(err) {
                console.log("error " + err.message);
                reject(err);
            });
        });
    }

}