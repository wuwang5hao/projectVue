/* eslint-disable */
import {BaseInterfApi} from 'unityrpcjs/unityrpc.js'


export class WidgetAttrs {
    constructor() {
        this.readonly = false;  // 0 optional
        this.placeholder = false;  // 1 optional
        this.hidden = false;  // 2 optional
        this.target = "";  // 3 optional
        this.type = "";  // 4 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

WidgetAttrs.__json_class__ = 'FxWidget.WidgetAttrs'
export var CHOICE_TYPE_SELECT = "select";
export var CHOICE_TYPE_CHECKBOX = "checkbox";
export var CHOICE_TYPE_RADIO = "radio";

export class ChoiceWidget {
    constructor() {
        this.type = "";  // 0 require
        this.choicesJson = "[]";  // 1 require
        this.attrs = new WidgetAttrs();  // 2 require
        this.multiple = false;  // 3 optional
        this.filterable = false;  // 4 optional
        this.remote = false;  // 5 optional
        this.remoteMethod = "";  // 6 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

ChoiceWidget.__json_class__ = 'FxWidget.ChoiceWidget'
export var INPUT_TYPE_HIDDEN = "hidden";
export var INPUT_TYPE_PASSWORD = "password";
export var INPUT_TYPE_EMAIL = "email";
export var INPUT_TYPE_URL = "url";
export var INPUT_TYPE_NUMBER = "number";
export var INPUT_TYPE_TEXT = "text";
export var INPUT_TYPE_TEXTAREA = "textarea";

export class InputWidget {
    constructor() {
        this.type = "";  // 0 require
        this.attrs = new WidgetAttrs();  // 1 require
        this.rows = 0;  // 2 optional
        this.cols = 0;  // 3 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

InputWidget.__json_class__ = 'FxWidget.InputWidget'

export class ImageWidget {
    constructor() {
        this.attrs = new WidgetAttrs();  // 0 require
        this.width = 0;  // 1 optional
        this.height = 0;  // 2 optional
        this.upload_action = "";  // 3 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

ImageWidget.__json_class__ = 'FxWidget.ImageWidget'
export var DATETIME_TYPE_DATE = "date";
export var DATETIME_TYPE_TIME = "time";
export var DATETIME_TYPE_MONTH = "month";
export var DATETIME_TYPE_DATETIME = "datetime";
export var DATETIME_TYPE_DATERANGE = "daterange";
export var DATETIME_TYPE_TIMERANGE = "timerange";
export var DATETIME_TYPE_MONTHRANGE = "monthrange";
export var DATETIME_TYPE_DATETIMERANGE = "datetimerange";

export class DateTimeWidget {
    constructor() {
        this.type = "";  // 0 require
        this.attrs = new WidgetAttrs();  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

DateTimeWidget.__json_class__ = 'FxWidget.DateTimeWidget'
export var FILE_TYPE_UPLOAD = "upload";
export var FILE_TYPE_CHUNKEDUPLOAD = "chunkedupload";
export var FILE_FORMAT_STR = "str";
export var FILE_FORMAT_JSON = "json";

export class FileWidget {
    constructor() {
        this.type = "";  // 0 require
        this.attrs = new WidgetAttrs();  // 1 require
        this.format = "";  // 2 require
        this.accept = "";  // 3 optional
        this.upload_action = "";  // 4 optional
        this.upload_action_chunk = "";  // 5 optional
        this.upload_action_complete = "";  // 6 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

FileWidget.__json_class__ = 'FxWidget.FileWidget'

export class AreaWidget {
    constructor() {
        this.attrs = new WidgetAttrs();  // 0 require
        this.changeOnSelect = false;  // 1 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

AreaWidget.__json_class__ = 'FxWidget.AreaWidget'

export class RichEditorWidget {
    constructor() {
        this.attrs = new WidgetAttrs();  // 0 require
        this.upload_action = "";  // 1 optional
        this.upload_action_chunk = "";  // 2 optional
        this.upload_action_complete = "";  // 3 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

RichEditorWidget.__json_class__ = 'FxWidget.RichEditorWidget'

export class Price100IntegerWidget {
    constructor() {
        this.attrs = new WidgetAttrs();  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

Price100IntegerWidget.__json_class__ = 'FxWidget.Price100IntegerWidget'

export class Precision100FloatWidget {
    constructor() {
        this.attrs = new WidgetAttrs();  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

Precision100FloatWidget.__json_class__ = 'FxWidget.Precision100FloatWidget'

export class GenericIPAddressWidget {
    constructor() {
        this.attrs = new WidgetAttrs();  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

GenericIPAddressWidget.__json_class__ = 'FxWidget.GenericIPAddressWidget'

export class Many2ManyWidget {
    constructor() {
        this.attrs = new WidgetAttrs();  // 0 require
        this.tableSpecName = "";  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

Many2ManyWidget.__json_class__ = 'FxWidget.Many2ManyWidget'

export class Many2OneWidget {
    constructor() {
        this.attrs = new WidgetAttrs();  // 0 require
        this.tableSpecName = "";  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

Many2OneWidget.__json_class__ = 'FxWidget.Many2OneWidget'

export class One2OneWidget {
    constructor() {
        this.attrs = new WidgetAttrs();  // 0 require
        this.tableSpecName = "";  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

One2OneWidget.__json_class__ = 'FxWidget.One2OneWidget'

export class ReverseMany2OneWidget {
    constructor() {
        this.attrs = new WidgetAttrs();  // 0 require
        this.tableSpecName = "";  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

ReverseMany2OneWidget.__json_class__ = 'FxWidget.ReverseMany2OneWidget'

export class ReverseOne2OneWidget {
    constructor() {
        this.attrs = new WidgetAttrs();  // 0 require
        this.tableSpecName = "";  // 1 optional
    }

    dump() {
        return JSON.stringify(this);
    }
}

ReverseOne2OneWidget.__json_class__ = 'FxWidget.ReverseOne2OneWidget'

export class LinkActionWidget {
    constructor() {
        this.attrs = new WidgetAttrs();  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

LinkActionWidget.__json_class__ = 'FxWidget.LinkActionWidget'

export class ButtonActionWidget {
    constructor() {
        this.attrs = new WidgetAttrs();  // 0 require
    }

    dump() {
        return JSON.stringify(this);
    }
}

ButtonActionWidget.__json_class__ = 'FxWidget.ButtonActionWidget'