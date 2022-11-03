/* eslint-disable */
import {BaseInterfApi} from 'unityrpcjs/unityrpc.js'

export var ACTION_TYPE_TABLE = "table";
export var ACTION_TYPE_FORM = "form";
export var ACTION_TYPE_CLIENT = "client";

export class ActionSpec {
    constructor() {
        this.name = "";  // 0 require
        this.title = "";  // 1 require
        this.type = "";  // 2 require
        this.toolbar = false;  // 3 optional
        this.actionCls = "";  // 4 require
        this.actionJson = "";  // 5 require
        this.confirmMsg = "";  // 6 require
        this.contextJson = "";  // 7 optional
        this.widgetName = "";  // 8 optional
        this.widgetJson = "";  // 9 optional
        this.formSpec = "";  // 10 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

ActionSpec.__json_class__ = 'FxAction.ActionSpec'

export class ActionData {
    constructor() {
        this.name = "";  // 0 require
        this.type = "";  // 1 require
        this.actionCls = "";  // 2 require
        this.actionJson = "";  // 3 require
        this.contextJson = "";  // 4 optional
        this.formData = "";  // 5 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

ActionData.__json_class__ = 'FxAction.ActionData'

export class ActionResult {
    constructor() {
        this.actions = [];  // 0 require
        this.formResult = "";  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

ActionResult.__json_class__ = 'FxAction.ActionResult'

export class GotoClientAction {
    constructor() {
        this.name = "";  // 0 require
        this.params = {};  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

GotoClientAction.__json_class__ = 'FxAction.GotoClientAction'

export class PopupClientAction {
    constructor() {
        this.title = "";  // 0 require
        this.message = "";  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

PopupClientAction.__json_class__ = 'FxAction.PopupClientAction'

export class ToastClientAction {
    constructor() {
        this.message = "";  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

ToastClientAction.__json_class__ = 'FxAction.ToastClientAction'
export var MENUITEM_TYPE_TABLE = "table";
export var MENUITEM_TYPE_FORM = "form";
export var MENUITEM_TYPE_CONTAINER = "container";

export class MenuItem {
    constructor() {
        this.type = "";  // 0 require
        this.name = "";  // 1 require
        this.title = "";  // 2 require
        this.view = "";  // 3 require
        this.subItems = [];  // 4 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

MenuItem.__json_class__ = 'FxAction.MenuItem'

export class UploadConfig {
    constructor() {
        this.action = "";  // 0 require
        this.actionChunk = "";  // 1 require
        this.actionComplete = "";  // 2 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

UploadConfig.__json_class__ = 'FxAction.UploadConfig'

export class Config {
    constructor() {
        this.upload = new UploadConfig();  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

Config.__json_class__ = 'FxAction.Config'

export class FxActionInterfApi extends BaseInterfApi {
    constructor(baseUrl, moduleName='FxAction',
            interfName='FxActionInterf', token='anonymous', ...args) {
        super(baseUrl, moduleName, interfName, token, ...args)
    }


    getMenu( context) {
        let params = {
            };
        let req = this.createRequest('getMenu', params);
        var _this = this;
        var respPromise = req.request();

        return new Promise(function (resolve, reject) {
            respPromise.then(function(resp) {
                _this.fillContext(context, resp.json);
                let robj = resp.json['data'];
                try {
                    resolve(robj);
                } catch (err) {
                    reject(new RpcSerializeError('getMenu'+err.message));
                }
            }, function(err) {
                console.log("error " + err.message);
                reject(err);
            });
        });
    }

    getConfig( context) {
        let params = {
            };
        let req = this.createRequest('getConfig', params);
        var _this = this;
        var respPromise = req.request();

        return new Promise(function (resolve, reject) {
            respPromise.then(function(resp) {
                _this.fillContext(context, resp.json);
                let robj = resp.json['data'];
                try {
                    resolve(robj);
                } catch (err) {
                    reject(new RpcSerializeError('getConfig'+err.message));
                }
            }, function(err) {
                console.log("error " + err.message);
                reject(err);
            });
        });
    }

}