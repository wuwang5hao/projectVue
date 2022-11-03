/* eslint-disable */
import {BaseInterfApi} from 'unityrpcjs/unityrpc.js'

import * as FxAction from "rpc/FxAction/FxAction"
export var FIELD_TYPE_INT = "int";
export var FIELD_TYPE_STR = "str";
export var FIELD_TYPE_BOOL = "bool";
export var FIELD_TYPE_FLOAT = "float";
export var FIELD_TYPE_DATETIME = "datetime";
export var FIELD_TYPE_DATE = "date";
export var FIELD_TYPE_TIME = "time";
export var FIELD_TYPE_UNKNOWN = "unknown";
export var FIELD_TYPE_MANY2ONE = "many2one";
export var FIELD_TYPE_MANY2MANY = "many2many";
export var FIELD_TYPE_ONE2ONE = "one2one";
export var FIELD_TYPE_R_MANY2ONE = "r_many2one";
export var FIELD_TYPE_R_ONE2ONE = "r_one2one";
export var FIELD_TYPE_R_MANY2MANY = "r_many2many";
export var FIELD_TYPE_AUTO = "auto";
export var FIELD_TYPE_FILE = "file";
export var FIELD_TYPE_IMAGE = "image";
export var FIELD_TYPE_EMAIL = "email";
export var FIELD_TYPE_URL = "url";
export var FIELD_TYPE_TEXT = "text";
export var FIELD_TYPE_INT16 = "int16";
export var FIELD_TYPE_UINT16 = "uint16";
export var FIELD_TYPE_UINT = "uint";
export var FIELD_TYPE_INT64 = "int64";
export var FIELD_TYPE_IP = "ip";
export var FIELD_TYPE_MONTH = "month";
export var FIELD_TYPE_PRICE100INT = "price100int";
export var FIELD_TYPE_PREC100FLOAT = "prec100float";
export var FIELD_TYPE_STR_LIST = "str_list";
export var FIELD_TYPE_INT_LIST = "int_list";
export var FIELD_TYPE_TIMERANGE = "timerange";
export var FIELD_TYPE_DATERANGE = "daterange";
export var FIELD_TYPE_DATETIMERANGE = "datetimerange";
export var FIELD_TYPE_MONTHRANGE = "monthrange";
export var FIELD_TYPE_AREA = "area";

export class SearchFieldValue {
    constructor() {
        this.name = "";  // 0 require
        this.value = "";  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

SearchFieldValue.__json_class__ = 'FxTable.SearchFieldValue'

export class SearchFieldSpec {
    constructor() {
        this.name = "";  // 0 require
        this.title = "";  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

SearchFieldSpec.__json_class__ = 'FxTable.SearchFieldSpec'

export class SearchSpec {
    constructor() {
        this.searchFields = [];  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

SearchSpec.__json_class__ = 'FxTable.SearchSpec'
export var ORDER_ASC = "asc";
export var ORDER_DESC = "desc";

export class OrderByValue {
    constructor() {
        this.field = "";  // 0 require
        this.order = "";  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

OrderByValue.__json_class__ = 'FxTable.OrderByValue'

export class OrderBySpec {
    constructor() {
        this.fields = [];  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

OrderBySpec.__json_class__ = 'FxTable.OrderBySpec'
export var ALIGN_LEFT = "left";
export var ALIGN_RIGHT = "right";
export var ALIGN_CENTER = "center";
export var FIXED_LEFT = "left";
export var FIXED_RIGHT = "right";

export class FieldSpec {
    constructor() {
        this.name = "";  // 0 require
        this.title = "";  // 1 require
        this.type = "";  // 2 require
        this.relatedField = "";  // 3 optional
        this.relatedFieldType = "";  // 4 optional
        this.relatedModel = "";  // 5 optional
        this.primary = false;  // 6 optional
        this.width = 0;  // 7 optional
        this.minWidth = 0;  // 8 optional
        this.maxWidth = 0;  // 9 optional
        this.align = "";  // 10 optional
        this.fixed = "";  // 11 optional
        this.ellipsis = false;  // 12 optional
        this.editable = false;  // 13 optional
        this.required = false;  // 14 optional
        this.disabled = false;  // 15 optional
        this.tip = "";  // 16 optional
        this.widgetName = "";  // 17 optional
        this.widgetJson = "";  // 18 optional
        this.hidden = false;  // 19 optional
        this.name_field = false;  // 20 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

FieldSpec.__json_class__ = 'FxTable.FieldSpec'

export class FilterFieldValue {
    constructor() {
        this.name = "";  // 0 require
        this.valueJson = "";  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

FilterFieldValue.__json_class__ = 'FxTable.FilterFieldValue'

export class FilterFieldSpec {
    constructor() {
        this.fieldSpec = new FieldSpec();  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

FilterFieldSpec.__json_class__ = 'FxTable.FilterFieldSpec'

export class FilterSpec {
    constructor() {
        this.filterFields = [];  // 0 require
        this.initialJson = "";  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

FilterSpec.__json_class__ = 'FxTable.FilterSpec'

export class TableQuery {
    constructor() {
        this.filterValues = [];  // 0 require
        this.searchValues = [];  // 1 require
        this.orderbyValues = [];  // 2 require
        this.offset = 0;  // 3 require
        this.limit = 0;  // 4 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

TableQuery.__json_class__ = 'FxTable.TableQuery'

export class TableQueryResult {
    constructor() {
        this.records = [];  // 0 require
        this.total = 0;  // 1 require
        this.fieldValueNameMap = {};  // 2 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

TableQueryResult.__json_class__ = 'FxTable.TableQueryResult'

export class TableAction {
    constructor() {
        this.pks = [];  // 0 require
        this.withDelPks = false;  // 1 optional
        this.delPks = [];  // 2 optional
        this.inlineTitle = "";  // 3 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

TableAction.__json_class__ = 'FxTable.TableAction'

export class ExportCsvAction {
    constructor() {
        this.filename = "";  // 0 require
        this.query = null;  // 1 optional
        this.fields = [];  // 2 optional
        this.suffix = "";  // 3 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

ExportCsvAction.__json_class__ = 'FxTable.ExportCsvAction'

export class ImportCsvAction {
    constructor() {
        this.filename = "";  // 0 require
        this.path = "";  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

ImportCsvAction.__json_class__ = 'FxTable.ImportCsvAction'

export class CreateFormAction {
    constructor() {
        this.form = "";  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

CreateFormAction.__json_class__ = 'FxTable.CreateFormAction'

export class UpdateFormAction {
    constructor() {
        this.form = "";  // 0 require
        this.inlineTitle = "";  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

UpdateFormAction.__json_class__ = 'FxTable.UpdateFormAction'

export class RefreshTableAction {
    constructor() {
    }

    dump() {
        return JSON.stringify(this);
    }
}

RefreshTableAction.__json_class__ = 'FxTable.RefreshTableAction'

export class ReloadTableAction {
    constructor() {
    }

    dump() {
        return JSON.stringify(this);
    }
}

ReloadTableAction.__json_class__ = 'FxTable.ReloadTableAction'

export class TableSelect {
    constructor() {
        this.kvsJson = "";  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

TableSelect.__json_class__ = 'FxTable.TableSelect'

export class TableSpec {
    constructor() {
        this.name = "";  // 0 require
        this.title = "";  // 1 require
        this.fields = [];  // 2 require
        this.filterSpec = new FilterSpec();  // 3 require
        this.searchSpec = new SearchSpec();  // 4 require
        this.orderbySpec = new OrderBySpec();  // 5 require
        this.actions = [];  // 6 require
        this.limit = 10;  // 7 require
        this.arch = "";  // 8 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

TableSpec.__json_class__ = 'FxTable.TableSpec'

export class FxTableInterfApi extends BaseInterfApi {
    constructor(baseUrl, moduleName='FxTable',
            interfName='FxTableInterf', token='anonymous', ...args) {
        super(baseUrl, moduleName, interfName, token, ...args)
    }


    getTableSpec(name,select, context) {
        let params = {
            name: name,
            select: select,
            };
        let req = this.createRequest('getTableSpec', params);
        var _this = this;
        var respPromise = req.request();

        return new Promise(function (resolve, reject) {
            respPromise.then(function(resp) {
                _this.fillContext(context, resp.json);
                let robj = resp.json['data'];
                try {
                    resolve(robj);
                } catch (err) {
                    reject(new RpcSerializeError('getTableSpec'+err.message));
                }
            }, function(err) {
                console.log("error " + err.message);
                reject(err);
            });
        });
    }

    getTableRecords(name,select,query, context) {
        let params = {
            name: name,
            select: select,
            query: query,
            };
        let req = this.createRequest('getTableRecords', params);
        var _this = this;
        var respPromise = req.request();

        return new Promise(function (resolve, reject) {
            respPromise.then(function(resp) {
                _this.fillContext(context, resp.json);
                let robj = resp.json['data'];
                try {
                    resolve(robj);
                } catch (err) {
                    reject(new RpcSerializeError('getTableRecords'+err.message));
                }
            }, function(err) {
                console.log("error " + err.message);
                reject(err);
            });
        });
    }

    getTableTotalRecord(name,select,query, context) {
        let params = {
            name: name,
            select: select,
            query: query,
            };
        let req = this.createRequest('getTableTotalRecord', params);
        var _this = this;
        var respPromise = req.request();

        return new Promise(function (resolve, reject) {
            respPromise.then(function(resp) {
                _this.fillContext(context, resp.json);
                let robj = resp.json['data'];
                try {
                    resolve(robj);
                } catch (err) {
                    reject(new RpcSerializeError('getTableTotalRecord'+err.message));
                }
            }, function(err) {
                console.log("error " + err.message);
                reject(err);
            });
        });
    }

    runTableAction(name,select,actionData, context) {
        let params = {
            name: name,
            select: select,
            actionData: actionData,
            };
        let req = this.createRequest('runTableAction', params);
        var _this = this;
        var respPromise = req.request();

        return new Promise(function (resolve, reject) {
            respPromise.then(function(resp) {
                _this.fillContext(context, resp.json);
                let robj = resp.json['data'];
                try {
                    resolve(robj);
                } catch (err) {
                    reject(new RpcSerializeError('runTableAction'+err.message));
                }
            }, function(err) {
                console.log("error " + err.message);
                reject(err);
            });
        });
    }

}