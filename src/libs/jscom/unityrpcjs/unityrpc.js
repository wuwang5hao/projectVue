/* eslint-disable */
// common.js

export function AssertFailed(message) {
        this.toString = function() { return 'AssertFailed: ' + message; }
}

export function assert(exp, message) {
        if (!exp) throw new AssertFailed(message);
}

if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
              ? args[number] : match;
        });
    };
}

if (!String.prototype.sprintf) {
    String.prototype.sprintf = function () {
        var args = arguments;
        var idx = 0;
        return this.replace(/%s/g, function() {
            return args[idx++];
        });
    };
}

// exceptions.js
//OSError
//    TimeoutError  <- match python excepiton inheritance system
//    ConnectionError  <- match python excepiton inheritance system
//RpcError
//    RpcClientError
//    RpcServerError
//    RpcParseError
//    RpcAuthFailureError

export class RpcError extends Error {
    constructor(msg, response, code=-1, ...args) {
        super('code {0}, {1}'.format(code, msg), ...args)
        this.code = code;
        this.msg = msg;
        this.response = response
    }
    setCode(code) {
        this.code = code;
        return this;
    }
    get status_code () {
        return this.response.status
    }
    static
    CreateByCode(code, response, fmt='', ...args) {
        if ([0, 200].indexOf(code) >= 0) {
            return null;
        } else if ([401, 403].indexOf(code) >= 0) {
            return new RpcAuthFailureError('RpcAuthFailureError({0}) {1}'.format(
                        code, fmt.sprintf(...args)), response, code);
        } else if (code >= 400 && code < 500) {
            return new RpcClientError('RpcClientError({0}) {1}'.format(
                    code, fmt.sprintf(...args)), response, code);
        } else if (code >= 500 && code < 600) {
            return new RpcServerError('RpcServerError({0}) {1}'.format(
                    code, fmt.sprintf(...args)), response, code);
        } else if (code === -102) {
            return new RpcLogicDoesNotExist(fmt.sprintf(...args), response, code);
        } else if (code === -103) {
            return new RpcLogicPermissionDenied(fmt.sprintf(...args), response, code);
        } else if (code === -104) {
            return new RpcLogicValidationError(fmt.sprintf(...args), response, code);
        } else if (code === -101) {
            return new RpcLogicError(fmt.sprintf(...args), response, code);
        } else if (code === -2) {
            return new RpcParseError(fmt.sprintf(...args), response, code);
        } else if (code === -3) {
            return new RpcSerializeError(fmt.sprintf(...args), response, code);
        } else {
            return new RpcError(fmt.sprintf(...args), response, code);
        }
    }
}

export class RpcClientError extends RpcError {  // 4xx error
    constructor(...args) {
        super(...args);
    }
}

export class RpcServerError extends RpcError {  // 5xx error
    constructor(...args) {
        super(...args);
    }
}

export class RpcParseError extends RpcError {  // parse server response error
    constructor(...args) {
        super(...args);
    }
}

export class RpcSerializeError extends RpcError {  // parse server response error
    constructor(...args) {
        super(...args);
    }
}

export class RpcAuthFailureError extends RpcError {  // 401 403 error
    constructor(...args) {
        super(...args);
    }
}

export class RpcLogicError extends RpcError {
    // base class for rpc logic exception
    constructor(msg='', code=-101, ...args) {
        assert(code < -100)
        super(msg, code);
    }
}

export class RpcLogicValidationError extends RpcLogicError {
    // @brief: 参数检查失败
    constructor(msg='') {
        super(msg, -104);
    }
}

export class RpcLogicPermissionDenied extends RpcLogicError {
    // @brief: 权限校验失败
    constructor(msg='') {
        super(msg, -103);
    }
}

export class RpcLogicDoesNotExist extends RpcLogicError {
    // @brief: 访问对象不存在
    constructor(msg='') {
        super(msg, -102);
    }
}

// === JsonResponse JsonRequest ===
export class JsonResponse {
    constructor(json, req, jqXHR) {
        this.json = json;
        this.req = req;
        this.jqXHR = jqXHR;
    }

    get status_code() {
        return this.jqXHR.status;
    }
}

export class JsonRequest {
    constructor(url, params, method="POST", trymax=1024, interval=13,
                resultCodeKey="code", resultMessageKey="message") {
        this.url = url;
        this.params = params;
        // TODO: implement trymax
        this.trymax = trymax;
        this.interval = interval;
        this.headers = {};
        this.method = method
        this.cleanParams(this.params)
        this.resultCodeKey = resultCodeKey
        this.resultMessageKey = resultMessageKey
    }

    request() {
        return this._request();
    }

    cleanParams (params) {
        for (let key in params) {
            if (Object.prototype.toString.call(params[key]) === "[object String]") {
                params[key] = params[key].trim()
            } else if (Object.prototype.toString.call(params[key]) === "[object Object]") {
                this.cleanParams(params[key])
            } else if (Object.prototype.toString.call(params[key]) === "[object Array]") {
                this.cleanParams(params[key])
            }
        }
    }

    _processJsonResponse (response, resolve, reject, resultCodeKey, resultMessageKey) {
        let jobj = response.json();
        jobj.then(function (jobj) {
        let exc = RpcError.CreateByCode(jobj[resultCodeKey], response, jobj[resultMessageKey]);
        if (exc) {
          console.error(exc);
          reject(exc);
        } else {
          resolve(new JsonResponse(jobj, this, response));
        }
      });
    }

    _processAttachmentResponse (response, resolve, reject) {
        var filename = ''
        var disposition = response.headers.get('Content-Disposition');
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
            filename = matches[1].replace(/['"]/g, '');
            // filename = decodeURI(filename)
            filename = window.decodeURIComponent(window.escape(filename))
        }

        return response.blob()
            .then(blob => {
              var url = URL.createObjectURL(blob)
              return url
            })
            .then(url => {
              console.log(url)
              if (filename) {
                const link = document.createElement('a')
                link.download = filename
                link.href = url
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              } else {
                window.open(url, '_blank');
              }
              URL.revokeObjectURL(url);
            });
    }

    isObject(x) {
        return Object.prototype.toString.call(x) === "[object Object]"
    }

    getObjectParamKey(key, subKey) {
        return `${key}.${subKey}`
    }

    parseInlineParams (params) {
        var newParams = {}
        for (var key in params) {
            if (this.isObject(params[key])) {
                for (var subKey in params[key]) {
                    var subValue = params[key][subKey]
                    if (subValue) {
                        var newKey = this.getObjectParamKey(key, subKey)
                        newParams[newKey] = subValue
                    }
                }
            } else {
                newParams[key] = params[key]
            }
        }
        return newParams
    }

    _request() {
        console.debug('request url(%s)'.sprintf(this.url));
        var _this = this;
        var url = this.url
        var body = ''
        if (this.method === 'GET' || this.method === 'HEAD') {
            var params = this.parseInlineParams(this.params)
            var searchParams = new window.URLSearchParams(params)
            var strParams = searchParams.toString()
            if (strParams.length > 0) {
                url = `${url}?${strParams}`
            }
            body = null
        } else {
            body = JSON.stringify(this.params)
        }

        if (window.fetch != undefined) {
        var result = new Promise(function(resolve, reject) {
            _this.headers['Content-Type'] = 'application/json';
            _this.headers['Accept'] = 'application/json';
            fetch(url, {
                body: body,
                method: _this.method,
                redirect: 'follow',
                mode: 'cors',
                headers: _this.headers,
                // credentials: 'include',
            })
            .then(function(response) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.indexOf("application/json") !== -1) {
                  _this._processJsonResponse(response, resolve, reject, _this.resultCodeKey, _this.resultMessageKey)
                } else {
                  var disposition = response.headers.get('Content-Disposition');
                  if (disposition && disposition.indexOf('attachment') !== -1) {
                    return _this._processAttachmentResponse(response, resolve, reject)
                  }
                  reject(RpcError.CreateByCode(response.status, response, response.statusText))
                }
            })
            .catch(function (error) {
                console.error(error)
                reject(new RpcError(error));
            });
        });
        } else if (window.jQuery != undefined) {
            // use jQuery ajax
            $jQuery.ajax({
                url: url,
                type: _this.method,
                crossDomain: true,
                // xhrFields: { withCredentials: true },
                data: body,
                headers: _this.headers,
                dataType: "json",
                success: function (jobj, textStatus, jqXHR) {
                    let exc = RpcError.CreateByCode(jobj[this.resultCodeKey], jqXHR, jobj['message'], jqXHR);
                    if (exc) {
                        console.error(exc);
                        throw exc;
                    }
                    resolve(new JsonResponse(jobj, _this, jqXHR));
                },
                error: function (xhr, status) {
                    reject(new RpcError("error occur"));
                }
            });
        } else {
            throw new RpcError("need jQuery or fetch library!");
        }

        return result;
    }

    addHeader(key, val) {
        this.headers[key] = val;
    }

    setHeaders(headers) {
        this.headers = headers;
    }
}

class BaseInterfApiHanlder {
    onBeforeRequest(req, context) {}
    onAfterRequest(req, context) {}
    onResponseSuccess(resp, context) {}
    onResponseFailed(err, context) {}
}

// === BaseInterfApi ===
export class BaseInterfApi {
    constructor(baseUrl, moduleName, interfName, token, trymax=1024, interval=13) {
        this.trymax = trymax;
        this.interval = interval;
        this.access_token = token;
        this._baseUrl = baseUrl;
        this._moduleName = moduleName;
        this._interfName = interfName;
        this._headers = {};
        this._handler = null;
        this._resultCodeKey = 'code';
        this._resultMessageKey = 'message';
    }

    setHandler(handler) {
        this._handler = handler
    }

    setResultCodeKey(codeKey) {
        this._resultCodeKey = codeKey
    }

    setResultMessageKey(messageKey) {
        this._resultMessageKey = messageKey
    }

    addHeader(key, val) {
        this._headers[key] = val;
    }

    addAuthorizationBearer(token) {
        this._headers['AUTHORIZATION'] = '%s %s'.sprintf('Bearer', this.access_token);
    }

    _genUrlByFuncName(funcName) {
        return '%s/%s/%s/%s'.sprintf(this._baseUrl, this._moduleName, this._interfName, funcName);
    }

    _genCustomUrl(url, customArgs) {
      var newUrl = url.replace(/{(\S+?)}/g, function(match, key) {
        return typeof customArgs[key] != 'undefined'
          ? customArgs[key]
          : match
        ;
      });
      let result = ''
      if (newUrl.startsWith('/')) {
        result = '%s%s'.sprintf(this._baseUrl, newUrl)
      } else {
        result = '%s/%s'.sprintf(this._baseUrl, newUrl)
      }
      return result
    }

    createRequestByFuncName(funcName, params=None, method="POST") {
      /*
        @brief: rpc 接口本身是 function 声明，因此通过 function name 可以快速拼接默认 url
      */
      let url = this._genUrlByFuncName(funcName);
      return this.createRequest(url, params, method);
    }

    createRequest(url, params=null, method="POST") {
        let req = new JsonRequest(url, params, method, this.trymax, this.interval, this._resultCodeKey, this._resultMessageKey);
        if (this._headers) {
            req.setHeaders(this._headers);
        }
        return req;
    }

    doRequest(req, context) {
        if (this._handler) {
            this._handler.onBeforeRequest(req, context)
        }
        let respPromise = req.request();
        // debugger
        if (this._handler) {
            this._handler.onAfterRequest(req, context)
        }

        let _this = this;
        return new Promise(function (resolve, reject) {
            respPromise.then(function(resp) {
                _this.fillContext(context, resp.json);
                if (_this._handler) {
                    _this._handler.onResponseSuccess(resp, context)
                }
                try {
                    resolve({...resp.json, response: resp})
                } catch (err) {
                    reject(new RpcSerializeError(`${req.url} ${err.message}`));
                }
            }, function(err) {
                // console.log(`error ${req.url} ${err.message}`);
                if (_this._handler) {
                    _this._handler.onResponseFailed(err, context)
                }
                reject(err);
            });
        });
    }

    fillContext(context, json) {
        if (json && context instanceof Object) {
            context['json'] = json
        }
    }
}
