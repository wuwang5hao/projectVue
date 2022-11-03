/* eslint-disable */
import {BaseInterfApi} from 'unityrpcjs/unityrpc.js'

export var FILTER_CHOICE = "choice";
export var FILTER_COMBO = "combo";
export var FILTER_COMPLEMENT = "complement";
export var FILTER_RANGE = "range";
export var FILTER_VALUE = "value";
export var FIELD_TYPE_INT = "int";
export var FIELD_TYPE_STR = "str";
export var FIELD_TYPE_BOOL = "bool";
export var FIELD_TYPE_FLOAT = "float";
export var FIELD_TYPE_DATETIME = "datetime";
export var FIELD_TYPE_DATE = "date";
export var FIELD_TYPE_TIME = "time";
export var FIELD_TYPE_UNKNOWN = "unknown";

export class FilterSpec {
    constructor() {
        this.type = "";  // 0 require
        this.field = "";  // 1 require
        this.fieldType = "";  // 2 require
        this.title = "";  // 3 require
        this.valuesJson = "";  // 4 require
        this.emptyTip = "";  // 5 optional
        this.widgetName = "";  // 14 optional
        this.widgetJson = "";  // 15 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

FilterSpec.__json_class__ = 'Table.FilterSpec'

export class SearchSpec {
    constructor() {
        this.field = "";  // 0 require
        this.title = "";  // 1 require
        this.value = "";  // 2 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

SearchSpec.__json_class__ = 'Table.SearchSpec'
export var ORDER_BY_VALUE_ASC = "asc";
export var ORDER_BY_VALUE_DESC = "desc";

export class OrderBySpec {
    constructor() {
        this.field = "";  // 0 require
        this.value = "";  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

OrderBySpec.__json_class__ = 'Table.OrderBySpec'
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
        this.primary = false;  // 3 optional
        this.width = 0;  // 4 optional
        this.minWidth = 0;  // 5 optional
        this.maxWidth = 0;  // 6 optional
        this.align = "";  // 7 optional
        this.fixed = "";  // 8 optional
        this.ellipsis = false;  // 9 optional
        this.editable = false;  // 10 optional
        this.required = false;  // 11 optional
        this.disabled = false;  // 12 optional
        this.tip = "";  // 13 optional
        this.widgetName = "";  // 14 optional
        this.widgetJson = "";  // 15 optional
        this.hidden = false;  // 16 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

FieldSpec.__json_class__ = 'Table.FieldSpec'

export class TableQuery {
    constructor() {
        this.filters = [];  // 0 require
        this.searches = [];  // 1 require
        this.orderbys = [];  // 2 require
        this.offset = 0;  // 3 require
        this.limit = 0;  // 4 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

TableQuery.__json_class__ = 'Table.TableQuery'

export class TableQueryResult {
    constructor() {
        this.records = [];  // 0 require
        this.total = 0;  // 1 require
        this.valueNameMap = {};  // 2 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

TableQueryResult.__json_class__ = 'Table.TableQueryResult'

export class ActionSpec {
    constructor() {
        this.name = "";  // 0 require
        this.title = "";  // 1 require
        this.field = "";  // 2 require
        this.inlineTitle = "";  // 3 require
        this.actionCls = "";  // 4 require
        this.actionJson = "";  // 5 require
        this.confirmMsg = "";  // 6 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

ActionSpec.__json_class__ = 'Table.ActionSpec'

export class PkAction {
    constructor() {
        this.pk = "";  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

PkAction.__json_class__ = 'Table.PkAction'

export class PkActionArg1 {
    constructor() {
        this.pk = "";  // 0 require
        this.arg0 = "";  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

PkActionArg1.__json_class__ = 'Table.PkActionArg1'

export class ActionArg1 {
    constructor() {
        this.arg0 = "";  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

ActionArg1.__json_class__ = 'Table.ActionArg1'

export class UpdateAction {
    constructor() {
        this.pk = "";  // 0 require
        this.kvs = {};  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

UpdateAction.__json_class__ = 'Table.UpdateAction'

export class SelectAction {
    constructor() {
        this.kvs = {};  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

SelectAction.__json_class__ = 'Table.SelectAction'

export class FormAction {
    constructor() {
        this.form = "";  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

FormAction.__json_class__ = 'Table.FormAction'

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

ExportCsvAction.__json_class__ = 'Table.ExportCsvAction'

export class KvsAction {
    constructor() {
        this.pk = "";  // 0 require
        this.kvs = {};  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

KvsAction.__json_class__ = 'Table.KvsAction'

export class PksAction {
    constructor() {
        this.pks = [];  // 0 require
        this.withOtherPks = false;  // 1 optional
        this.otherPks = [];  // 2 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

PksAction.__json_class__ = 'Table.PksAction'

export class PksActionArg1 {
    constructor() {
        this.pks = [];  // 0 require
        this.arg0 = "";  // 1 require
        this.withOtherPks = false;  // 2 optional
        this.otherPks = [];  // 3 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

PksActionArg1.__json_class__ = 'Table.PksActionArg1'

export class GotoCmd {
    constructor() {
        this.name = "";  // 0 require
        this.params = {};  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

GotoCmd.__json_class__ = 'Table.GotoCmd'

export class PopupCmd {
    constructor() {
        this.title = "";  // 0 require
        this.message = "";  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

PopupCmd.__json_class__ = 'Table.PopupCmd'

export class RecordsCmd {
    constructor() {
        this.records = [];  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

RecordsCmd.__json_class__ = 'Table.RecordsCmd'

export class ClientCmdSpec {
    constructor() {
        this.name = "";  // 0 require
        this.cmdJson = "";  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

ClientCmdSpec.__json_class__ = 'Table.ClientCmdSpec'

export class ActionResult {
    constructor() {
        this.cmds = [];  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

ActionResult.__json_class__ = 'Table.ActionResult'

export class TableSelect {
    constructor() {
        this.kvsJson = "";  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

TableSelect.__json_class__ = 'Table.TableSelect'
export var FIELD_TYPE_STR_LIST = "str_list";
export var FIELD_TYPE_INT_LIST = "int_list";
export var CHOICE_TYPE_SELECT = "select";
export var CHOICE_TYPE_SELECT_MULTIPLE = "select_multiple";
export var CHOICE_TYPE_RADIO = "radio";
export var CHOICE_TYPE_CHECKBOX = "checkbox";

export class ChoiceWidget {
    constructor() {
        this.type = "";  // 0 require
        this.choicesJson = "[]";  // 1 require
        this.attrs = {};  // 2 optional
        this.filterable = false;  // 3 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

ChoiceWidget.__json_class__ = 'Table.ChoiceWidget'
export var INPUT_TYPE_HIDDEN = "hidden";
export var INPUT_TYPE_PASSWORD = "password";
export var INPUT_TYPE_EMAIL = "email";
export var INPUT_TYPE_URL = "url";
export var INPUT_TYPE_NUMBER = "number";
export var INPUT_TYPE_TEXT = "text";
export var INPUT_TYPE_FILE = "file";
export var INPUT_TYPE_CHECKBOX = "checkbox";
export var INPUT_TYPE_TEXTAREA = "textarea";

export class InputWidget {
    constructor() {
        this.type = "";  // 0 require
        this.attrs = {};  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

InputWidget.__json_class__ = 'Table.InputWidget'

export class ImageWidget {
    constructor() {
        this.width = 0;  // 0 optional
        this.height = 0;  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

ImageWidget.__json_class__ = 'Table.ImageWidget'
export var DATETIME_TYPE_DATE = "date";
export var DATETIME_TYPE_TIME = "time";
export var DATETIME_TYPE_MONTH = "month";
export var DATETIME_TYPE_DATETIME = "datetime";
export var DATETIME_TYPE_DATERANGE = "daterange";
export var DATETIME_TYPE_TIMERANGE = "timerange";
export var DATETIME_TYPE_MONTHRANGE = "monthrange";
export var DATETIME_TYPE_DATETIMERANGE = "datetimerange";

export class DatetimeWidget {
    constructor() {
        this.type = "";  // 0 require
        this.attrs = {};  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

DatetimeWidget.__json_class__ = 'Table.DatetimeWidget'
export var FILE_TYPE_UPLOAD = "upload";
export var FILE_TYPE_CHUNKEDUPLOAD = "chunkedupload";

export class FileWidget {
    constructor() {
        this.type = "";  // 0 require
        this.format = "";  // 1 require
        this.accept = "";  // 2 optional
        this.attrs = {};  // 3 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

FileWidget.__json_class__ = 'Table.FileWidget'

export class AreaWidget {
    constructor() {
        this.changeOnSelect = false;  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

AreaWidget.__json_class__ = 'Table.AreaWidget'

export class RichEditorWidget {
    constructor() {
    }

    dump() {
        return JSON.stringify(this);
    }
}

RichEditorWidget.__json_class__ = 'Table.RichEditorWidget'

export class TableSpec {
    constructor() {
        this.fields = [];  // 0 require
        this.filters = [];  // 1 require
        this.searches = [];  // 2 require
        this.orderbys = [];  // 3 require
        this.actions = [];  // 4 require
        this.valueNameMap = {};  // 5 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

TableSpec.__json_class__ = 'Table.TableSpec'

export class TableInterfApi extends BaseInterfApi {
    constructor(baseUrl, moduleName='Table',
            interfName='TableInterf', token='anonymous', ...args) {
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

    runTableAction(name,select,actions, context) {
        let params = {
            name: name,
            select: select,
            actions: actions,
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