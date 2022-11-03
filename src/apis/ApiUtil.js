import { sysUtil } from 'jscom/utils/sysutil';
import Vue from 'vue';
import {
  AuthInterfApi,
  HomeInterfApi,
  RoleInterfApi,
  UserInterfApi,
  DictInterfApi,
  AreaInterfApi,
  SoftwareServiceInterfApi,
  softwareServiceModuleInterfApi,
  SoftwareModuleFeatureInterfApi,
  AuthorityInterfApi,
  HardwareInterfApi,
  ProtocolInterfApi,
  SslcServiceInterfApi,
  InventoryInterfApi,
  DeviceInterfApi,
  EnterpriseInterfApi,
  OrderInterfApi,
  FeedbackInterfApi,
  PublishInterfApi,
  BaseOperationLogInterfApi,
  EnergyInterApi,
  CarbonMaintenanceInterApi,
  CarbonAssetManageInterApi,
  AgentInterfApi,
  EmissionFactorDatabaseInterApi
} from './rpc/BackboneSslc/BackboneSslc';

// let baseUrl = 'http://dev02.elc.cn:8843';
let baseUrl = 'http://uat.elc.cn:8843';
// let baseUrl = 'http://192.168.50.121:9105'
// let baseUrl = 'http://192.168.8.155:9105'
// let baseUrl = 'http://192.168.15.211:9105'
// let baseUrl = 'http://192.168.8.51:9105'

// let baseUrl = 'http://218.202.234.78:19105'

// let baseUrl = 'http://192.168.22.61:9105'
// let baseUrl = 'http://192.168.22.58:9104'
//let baseUrl = 'http://192.168.22.58:9105'

// let baseUrl = 'http://192.168.50.121:9104'
// let baseUrl = 'http://192.168.50.126:9105'
//  let baseUrl = 'http://218.202.234.78:19105'

// let baseUrl = 'http://192.168.8.174:9105'
// let baseUrl = 'http://192.168.50.126:9105'
// let baseUrl = 'http://192.168.50.140:9105'

/**
  上传工单附件 -- name="workOrderFile" 【url最后拼接的参数："/work_order"】
  上传营业执照 -- name="businessLicenseFile" 【url最后拼接的参数："/enterprise"】
  上传企业LOGO-- name="enterpriseLogoFile" 【url最后拼接的参数："/enterprise"】
  上传企业折叠LOGO -- name="enterpriseLogoSmallFile" 【url最后拼接的参数："/enterprise"】
  上传软件服务模块 -- name="softwareModuleLogoFile" 【url最后拼接的参数："/software_service_module"】
  上传硬件品牌LOGO -- name="hardwareBrandLogoFile" 【url最后拼接的参数："/hardware_brand"】
  上传硬件型号LOGO -- name="hardwareModelPictureFile" 【url最后拼接的参数："/hardware_model"】
  上传硬件型号附件 -- name="documentFile" 【url最后拼接的参数："/hardware_model"】
  上传设备品牌LOGO -- name="deviceBrandLogoFile" 【url最后拼接的参数："/device_brand"】
**/

const uploadActionMap = {
  workOrder: {
    action: '/base/file/v1/upload_workorder_attachment/work_order',
    filename: 'workOrderFile',
    limitSize: 5 * 1000 * 1000
  },
  businessLicense: {
    action: '/base/file/v1/upload_business_license/enterprise',
    filename: 'businessLicenseFile',
    limitSize: 10 * 1000 * 1000,
    size: 850 * 1150
  },
  enterpriseLogo: {
    action: '/base/file/v1/upload_enterprise_logo/enterprise',
    filename: 'enterpriseLogoFile',
    limitSize: 10 * 1000 * 1000,
    size: 156 * 62
  },
  enterpriseLogoSmall: {
    action: '/base/file/v1/upload_enterprise_logo_small/enterprise',
    filename: 'enterpriseLogoSmallFile',
    limitSize: 10 * 1000 * 1000,
    size: 60 * 60
  },
  softwareModuleLogo: {
    action: '/base/file/v1/upload_software_module_logo/software_service_module',
    filename: 'softwareModuleLogoFile',
    limitSize: 10 * 1000 * 1000,
    size: 20 * 20
  },
  hardwareBrandLogo: {
    action: '/base/file/v1/upload_hardware_brand_logo/hardware_brand',
    filename: 'hardwareBrandLogoFile',
    limitSize: 10 * 1000 * 1000,
    size: 120 * 60
  },
  hardwareModelPicture: {
    action: '/base/file/v1/upload_hardware_model_picture/hardware_model',
    filename: 'hardwareModelPictureFile',
    limitSize: 10 * 1000 * 1000,
    size: 800 * 600
  },
  hardwareModelFile: {
    action: '/base/file/v1/upload_document_attachment/hardware_model',
    filename: 'documentFile',
    limitSize: 10 * 1000 * 1000
  },
  deviceBrandLogo: {
    action: '/base/file/v1/upload_brand_logo/device_brand',
    filename: 'deviceBrandLogoFile',
    limitSize: 10 * 1000 * 1000,
    size: 120 * 60
  },
  agentbusinessLicense: {
    action: '/software_maintenance/agent/ver1/upload_agent_business_license',
    filename: 'agentBusinessLicenseFile',
    limitSize: 5 * 1024 * 1024,
    size: 1400 * 1900
  },
  contractImage: {
    action: '/software_maintenance/agent/ver1/upload_agent_contract',
    filename: 'contractFile',
    limitSize: 1000 * 1000 * 1000,
    size: 850 * 1150
  },
};

class HttpHandler {
  constructor(store, router) {
    this.store = store;
    this.router = router;
  }
  onBeforeRequest(req, context) {
    let emptyKeys = [];
    for (let [key, value] of Object.entries(req.params)) {
      if (value === '') {
        emptyKeys.push(key);
      }
    }
    for (let key of emptyKeys) {
      delete req.params[key];
    }
  }

  onAfterRequest(req, context) {}
  onResponseSuccess(response, context) {
    let token = response.jqXHR.headers.get('token');
    if (token) {
      let oAuth = { token: token };
      this.store.commit('SET_USEROAUTH', oAuth);
    }
    let json = response.json;
    if (json) {
      if (json.resultCode === 0) {
        if (context && context.message === '') {
          return;
        }
        let message = context && context.message ? context.message : json.message;
        message = message || '';
        message = message.trim();
        let omitMsgs = ['管理员', ''];
        if (!omitMsgs.includes(message)) {
          Vue.prototype.$message.destroy();
          Vue.prototype.$message.success(message);
        }
      }
    }
  }
  onResponseFailed(err, context) {
    if (err.status_code === 401) {
      this.store.commit('CLEAR_USEROAUTH');
      // this.router.push('/login')
      window.location.href = `${window.location.origin}/login`;
    }
    if (context && context.notShowErrorMessage) {
      return;
    }
    this.processApiError(err, (context && context.errorMessage) || '服务错误');
  }
  processApiError(error, defaultMsg) {
    let msg = defaultMsg;
    if (sysUtil.isStringObject(error.msg)) {
      msg = error.msg;
      if (msg.indexOf('/n') !== -1) {
        const msgList = msg.split('/n');
        const TextElList = [];
        msg = h => {
          msgList.forEach((value, index) => {
            if (index !== 0) TextElList.push(h('br'));
            TextElList.push(h('span', null, value));
          });
          return h('span', null, TextElList);
        };
      }
    }
    Vue.prototype.$message.destroy();
    Vue.prototype.$message.error(msg);
  }
}

class ApiUtil {
  constructor(store, router) {
    this.store = store;
    this.router = router;
    this.handler = new HttpHandler(store, router);
  }

  static AddUtil(name, obj) {
    if (typeof window !== 'undefined' && window.Vue) {
      window.Vue.prototype[name] = obj;
      window.Vue[name] = obj;
    }
  }

  static install(store, router) {
    let apiUtil = new ApiUtil(store, router);
    ApiUtil.AddUtil('$apiUtil', apiUtil);
  }

  getHeaders(headers = {}) {
    headers = { ...headers };
    let oauth = this.store.state.userOauth;
    headers.Language = 'zh';
    if (oauth && oauth.token) {
      headers.Token = oauth.token;
    }
    return headers;
  }

  _getApi(Cls, headers = {}) {
    headers = this.getHeaders(headers);
    let api = new Cls(baseUrl);
    api.setHandler(this.handler);
    api.setResultCodeKey('resultCode');
    for (let [key, val] of Object.entries(headers)) {
      api.addHeader(key, val);
    }
    return api;
  }
  getUploadAction(moduleKey, id) {
    let actionItem = uploadActionMap[moduleKey];
    if (!actionItem) {
      return { action: '', filename: '' };
    }
    let result = { ...actionItem, headers: this.getHeaders() };
    if (id) {
      result.action = `${this.baseUrl()}${result.action}/${id}`;
    } else {
      result.action = `${this.baseUrl()}${result.action}`;
    }
    return result;
  }
  getImageUrl(id) {
    return `${this.baseUrl()}/software_maintenance/company/ver1/image/${id}`;
  }
  // getImageUrl(id) {
  //   return `${this.baseUrl()}/software_maintenance/agent/ver1/image/${id}`;
  // }
  getAgentImageUrl(id) {
    return `${this.baseUrl()}/software_maintenance/agent/ver1/image/${id}`;
  }

  getFileUrl(fileId) {
    return `${this.baseUrl()}/base/file/v1/down/${fileId}`;
  }

  baseUrl() {
    return baseUrl;
  }

  getAuthApi() {
    return this._getApi(AuthInterfApi);
  }

  getHomeApi() {
    return this._getApi(HomeInterfApi);
  }

  getSoftwareServiceApi() {
    return this._getApi(SoftwareServiceInterfApi);
  }

  getSoftwareModuleApi() {
    return this._getApi(softwareServiceModuleInterfApi);
  }

  getSoftwareModuleFeatureApi() {
    return this._getApi(SoftwareModuleFeatureInterfApi);
  }

  getSslcServiceApi() {
    return this._getApi(SslcServiceInterfApi);
  }

  getAuthorityApi() {
    return this._getApi(AuthorityInterfApi);
  }

  getRoleApi() {
    return this._getApi(RoleInterfApi);
  }

  getUserApi() {
    return this._getApi(UserInterfApi);
  }

  getDictApi() {
    return this._getApi(DictInterfApi);
  }

  getAreaApi() {
    return this._getApi(AreaInterfApi);
  }

  //能源能耗增加Api
  getEnergyApi() {
    return this._getApi(EnergyInterApi);
  }
  getCarbonMaintenanceApi() {
    return this._getApi(CarbonMaintenanceInterApi);
  }
  getCarbonAssetManageApi() {
    return this._getApi(CarbonAssetManageInterApi);
  }
  // 碳排因子数据库
  getEmissionFactorDatabaseApi() {
    return this._getApi(EmissionFactorDatabaseInterApi);
  }

  getHwApi() {
    return this._getApi(HardwareInterfApi);
  }

  getProtocolApi() {
    return this._getApi(ProtocolInterfApi);
  }

  getInventoryApi() {
    return this._getApi(InventoryInterfApi);
  }

  getDeviceApi() {
    return this._getApi(DeviceInterfApi);
  }

  getEnterpriseApi() {
    return this._getApi(EnterpriseInterfApi);
  }

  getOrderApi() {
    return this._getApi(OrderInterfApi);
  }

  getFeedbackApi() {
    return this._getApi(FeedbackInterfApi);
  }

  getPublishApi() {
    return this._getApi(PublishInterfApi);
  }

  getBaseOperationLogApi() {
    return this._getApi(BaseOperationLogInterfApi);
  }

  getAgentApi() {
    return this._getApi(AgentInterfApi);
  }
}

export default ApiUtil;
