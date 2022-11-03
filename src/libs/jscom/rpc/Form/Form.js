/* eslint-disable */
import {BaseInterfApi} from 'unityrpcjs/unityrpc.js'

import * as Table from "rpc/Table/Table"

export class FormFieldSpec {
    constructor() {
        this.fieldSpec = new Table.FieldSpec();  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

FormFieldSpec.__json_class__ = 'Form.FormFieldSpec'

export class FormUniqueKey {
    constructor() {
        this.field = "";  // 0 require
        this.valueJson = "";  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

FormUniqueKey.__json_class__ = 'Form.FormUniqueKey'

export class FormSpec {
    constructor() {
        this.name = "";  // 0 require
        this.fields = [];  // 1 require
        this.dataJson = "";  // 2 require
        this.valueNameMap = {};  // 3 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

FormSpec.__json_class__ = 'Form.FormSpec'

export class FormValidationError {
    constructor() {
        this.msg = "";  // 0 require
        this.code = "";  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

FormValidationError.__json_class__ = 'Form.FormValidationError'

export class FormData {
    constructor() {
        this.dataJson = "";  // 0 require
        this.kwargs = "";  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

FormData.__json_class__ = 'Form.FormData'

export class FormResult {
    constructor() {
        this.ret = 0;  // 0 require
        this.msg = "";  // 1 require
        this.errors = {};  // 2 optional
        this.dataJson = "";  // 3 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

FormResult.__json_class__ = 'Form.FormResult'

export class FormInterfApi extends BaseInterfApi {
    constructor(baseUrl, moduleName='Form',
            interfName='FormInterf', token='anonymous', ...args) {
        super(baseUrl, moduleName, interfName, token, ...args)
    }


    getFormSpec(name,uniqueKey, context) {
        let params = {
            name: name,
            uniqueKey: uniqueKey,
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

    submitForm(name,uniqueKey,formData, context) {
        let params = {
            name: name,
            uniqueKey: uniqueKey,
            formData: formData,
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

    deleteForm(name,uniqueKey, context) {
        let params = {
            name: name,
            uniqueKey: uniqueKey,
            };
        let req = this.createRequest('deleteForm', params);
        var _this = this;
        var respPromise = req.request();

        return new Promise(function (resolve, reject) {
            respPromise.then(function(resp) {
                _this.fillContext(context, resp.json);
                let robj = resp.json['data'];
                try {
                    resolve(robj);
                } catch (err) {
                    reject(new RpcSerializeError('deleteForm'+err.message));
                }
            }, function(err) {
                console.log("error " + err.message);
                reject(err);
            });
        });
    }

}