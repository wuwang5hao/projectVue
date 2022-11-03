import Vue from "vue";
import {sysUtil} from "jscom/utils/sysutil";
import {EnergyConsumptionCommandServiceClient} from './js/energy_consumption_command_grpc_web_pb';
import {EnergyConsumptionQueryServiceClient} from './js/energy_consumption_query_grpc_web_pb';
import {SaveAndUpdateRequest} from './js/energy_consumption_command_pb';
import {
  ExportRequest,
  CollectFunctionGroupDetailRequest,
  EnergyConsumptionTypeListRequest,
  SortObj,
  TreeRequest,
  TemplateRequest,
  EnergyConsumptionSubitemListRequest,
  CollectFunctionListRequest,
  CollectFunctionGroupListRequest,
} from './js/energy_consumption_query_pb';

// const BASE_URL = 'http://192.168.50.126:10000';
const BASE_URL = 'http://192.168.8.57:10000';
const CLIENT_CONFIG = [BASE_URL, null, null]


/**
 * 请求处理类
 * @class
 * @method onBeforeRequest 请求之前
 * @method onAfterRequest 请求之后
 * @method onResponseSuccess 请求成功
 * @method onResponseFailed 请求失败
 * @method processApiError 处理错误
 */
class HttpHandler {
  constructor(store, router) {
    this.store = store
    this.router = router
  }

  onBeforeRequest(req) {

  }

  onAfterRequest(req) {

  }

  onResponseSuccess(response) {
  }

  onResponseFailed(err) {
    if (err.code === 16) {
      this.store.commit('CLEAR_USEROAUTH')
      this.router.push('/login')
    }
    if (err && err.notShowErrorMessage) {
      return
    }
    this.processApiError(err || '服务错误', "网络忙，请稍后再试！")
  }

  processApiError(error, defaultMsg) {
    let msg = defaultMsg
    if (sysUtil.isStringObject(error.message)&& error.code !== 2) {
      msg = decodeURI(error.message);
      if (msg.indexOf('/n') !== -1) {
        const msgList = msg.split('/n');
        const TextElList = [];
        msg = (h) => {
          msgList.forEach((value, index) => {
            if (index !== 0) TextElList.push(h('br'))
            TextElList.push(h('span', null, value));
          });
          return h('span', null, TextElList);
        }
      }
    }
    Vue.prototype.$message.error(msg);
  }
}

/**
 * gRPC工具类
 * @class
 * @method httpHandler 请求处理
 * @method AddUtil 添加全局
 * @method install 安装
 */
class GRPCUtil {
  constructor(store, router) {
    this.store = store
    this.router = router
    this._handler = new HttpHandler(store, router)
  }
  clients = {
    energyConsumptionCommand: new EnergyConsumptionCommandServiceClient(...CLIENT_CONFIG),
    energyConsumptionQuery: new EnergyConsumptionQueryServiceClient(...CLIENT_CONFIG),
  };
  /**
   * 请求处理
   * @param {function} api api封装函数
   * @param req 请求值
   * @return {Promise<unknown>}
   */
  httpHandler(api, req) {
    if (this._handler) {
      this._handler.onBeforeRequest(req);
    }
    let respPromise =  api(req);
    if (this._handler) {
      this._handler.onAfterRequest(req);
    }
    return new Promise((resolve, reject) => {
      respPromise.then((resp) => {
        console.log(resp);
        if (this._handler) {
          this._handler.onResponseSuccess(resp);
        }
        try {
          resolve(resp);
        } catch (err) {
          console.log(err);
          reject(err);
        }
      }, (err) => {
        console.log(err);
        if (this._handler) {
          this._handler.onResponseFailed(err);
        }
        reject(err);
      });
    });
  }

  /**
   * 添加工具
   * @param {string} name 全局变量名
   * @param {GRPCUtil} obj gRPC工具类实例
   * @static
   */
  static AddUtil(name, obj) {
    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.prototype[name] = obj
      window.Vue[name] = obj
    }
  }

  /**
   * 安装
   * @param store
   * @param router
   */
  static install(store, router) {
    let gPRC = new GRPCUtil(store, router);
    GRPCUtil.AddUtil('$gRPCUtil', gPRC);
  }

  getHeaders(extraHeaders = {}) {
    let headers = {}
    let oauth = this.store.state.userOauth
    headers.Language = 'zh'
    if (oauth && oauth.token) {
      headers.Token = oauth.token
    }
    headers = {...headers, ...extraHeaders}
    return headers
  }

  /**
   * 获取api
   * @param {string} clientName 客户端名称
   * @param {string} url 地址
   * @param request
   * @param  etrHeaders
   * @return {function(*=): Q.Promise<any> | Promise<postcss.Result>}
   * @private
   */
  _getApi(clientName, url, request, etrHeaders = {}) {
    const headers = this.getHeaders(etrHeaders)
    const api = (req) => {
      return new Promise((resolve, reject) => {
        const client = this.clients[clientName][url](req, headers, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.toObject());
          }
        });
        client.on('status', () => {
          let token = client.a.a.getResponseHeader('token');
          if (token) {
            let oAuth = {token: token}
            this.store.commit('SET_USEROAUTH', oAuth)
          }
        });
      });
    }
    return this.httpHandler(api, request).catch(() => {});
  }

  /**
   * 能源能耗批量导入
   * @param {string } data 上传数据
   * @return (function(*=): Q.Promise<*>)|Promise<postcss.Result>
   */
  energyUpload(data) {
    const req = new SaveAndUpdateRequest();
    req.setData(data.base64);
    req.setName(data.name);
    return this._getApi('energyConsumptionCommand', 'upload', req);
  }

  /**
   * 能源能耗导出
   * @return {(function(*=): Q.Promise<*>)|Promise<postcss.Result>}
   */
  export() {
    const req = new ExportRequest();
    return this._getApi('energyConsumptionQuery', 'export', req);
  }

  /**
   * 能源能耗模板导出
   * @return {(function(*=): Q.Promise<*>)|Promise<postcss.Result>}
   */
  template() {
    const req = new TemplateRequest();
    return this._getApi('energyConsumptionQuery', 'template', req);
  }

  /**
   * 能源能耗树
   * @return {(function(*=): Q.Promise<*>)|Promise<postcss.Result>}
   */
  tree() {
    const req = new TreeRequest();
    return this._getApi('energyConsumptionQuery', 'tree', req);
  }

  /**
   *  能源能耗分类列表
   * @param {{field: string, orderBy: string}} sortObj
   * @return {(function(*=): Q.Promise<*>)|Promise<postcss.Result>}
   */
  energyConsumptionTypeList(sortObj) {
    const req = new EnergyConsumptionTypeListRequest();
    const sort = new SortObj();
    sort.setField(sortObj.field);
    sort.setOrderBy(sortObj.orderBy);
    req.setSortObj(sort);
    return this._getApi('energyConsumptionQuery', 'energyConsumptionTypeList', req);
  }

  /**
   * 能源能耗分项列表
   * @param{string} parentSubitemNo
   * @param {string} energyConsumptionTypeNo
   * @param {{field: string, orderBy: string}}sortObj
   * @return {(function(*=): Q.Promise<*>)|Promise<postcss.Result>}
   */
  energyConsumptionSubitemList({parentSubitemId, energyConsumptionTypeNo, sortObj}) {
    const req = new EnergyConsumptionSubitemListRequest();
    // req.setParentSubitemNo(parentSubitemNo);
    // req.setParentTypeNo(parentTypeNo);
    req.setParentSubitemId(parentSubitemId);
    req.setEnergyConsumptionTypeNo(energyConsumptionTypeNo);
    const sort = new SortObj();
    sort.setField(sortObj.field);
    sort.setOrderBy(sortObj.orderBy);
    req.setSortObj(sort);
    return this._getApi('energyConsumptionQuery', 'energyConsumptionSubitemList', req);
  }

  /**
   * 采集功能列表
   * @param {string} searchKey
   * @param {string} parentTypeNo
   * @param {{field: string, orderBy: string}} sortObj
   * @param {string} pageNum
   * @param {string} pageSize
   * @return {(function(*=): Q.Promise<*>)|Promise<postcss.Result>}
   */
  collectFunctionList({
    searchKey, parentTypeNo, sortObj, pageNum, pageSize,
  }) {
    const req = new CollectFunctionListRequest();
    req.setSearchKey(searchKey);
    req.setEnergyConsumptionTypeNo(parentTypeNo);
    req.setPageNum(pageNum);
    req.setPageSize(pageSize);
    const sort = new SortObj();
    sort.setField(sortObj.field);
    sort.setOrderBy(sortObj.orderBy);
    req.setSortObj(sort);
    return this._getApi('energyConsumptionQuery', 'collectFunctionList', req);
  }

  /**
   * 采集功能组列表
   * @param {string} searchKey
   * @param {string} parentTypeNo
   * @param {{field: string, orderBy: string}} sortObj
   * @param {string} pageNum
   * @param {string} pageSize
   * @return {(function(*=): Q.Promise<*>)|Promise<postcss.Result>}
   */
  collectFunctionGroupList({
    searchKey, parentTypeNo, sortObj, pageNum, pageSize,
  }) {
    const req = new CollectFunctionGroupListRequest();
    req.setSearchKey(searchKey);
    req.setEnergyConsumptionTypeNo(parentTypeNo);
    req.setPageNum(pageNum);
    req.setPageSize(pageSize);
    const sort = new SortObj();
    sort.setField(sortObj.field);
    sort.setOrderBy(sortObj.orderBy);
    req.setSortObj(sort);
    return this._getApi('energyConsumptionQuery', 'collectFunctionGroupList', req);
  }

  /**
   * 采集功能组功能列表
   * @param {string} collectFunctionGroupId
   * @return {(function(*=): Q.Promise<*>)|Promise<postcss.Result>}
   */
  collectFunctionGroupDetail({collectFunctionGroupId}) {
    const req = new CollectFunctionGroupDetailRequest();
    req.setCollectFunctionGroupId(collectFunctionGroupId);
    return this._getApi('energyConsumptionQuery', 'collectFunctionGroupDetail', req);
  }
}

export default GRPCUtil;
