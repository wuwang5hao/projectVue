/* eslint-disable */
/*
 * 基干平台接口定义文件
 */
import { BaseInterfApi, RpcLogicValidationError, RpcSerializeError } from 'unityrpcjs/unityrpc.js';

export class UserInfo {
  constructor() {
    this.id = 0; // 0 require
    this.name = ''; // 1 require
    this.sex = ''; // 2 require
    this.mobile = ''; // 3 require
    this.email = ''; // 4 require
    this.actions = []; // 5 require
    this.status = ''; // 6 require
    this.version = 0; // 7 require
    this.dealPassword = ''; // 8 require
    this.isLogin = ''; // 9 optional
  }

  dump() {
    return JSON.stringify(this);
  }
}

UserInfo.__json_class__ = 'BackboneSslc.UserInfo';

// 用户接口类， 包含登录，登出，修改密码等接口
export class AuthInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'AuthInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  login({ cellPhoneNumber, password, rememberPassword, context }) {
    let _params = {};
    // check require
    if (cellPhoneNumber === undefined) {
      throw new RpcLogicValidationError('require argument "cellPhoneNumber"');
    }
    if (password === undefined) {
      throw new RpcLogicValidationError('require argument "password"');
    }
    if (rememberPassword === undefined) {
      throw new RpcLogicValidationError('require argument "rememberPassword"');
    }

    // set argument into _params
    _params['cellPhoneNumber'] = cellPhoneNumber;
    _params['password'] = password;
    _params['rememberPassword'] = rememberPassword;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/staff/auth/ver1/login', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  confirm_replace_login({ cellPhoneNumber, password, rememberPassword, context }) {
    let _params = {};
    // check require
    if (cellPhoneNumber === undefined) {
      throw new RpcLogicValidationError('require argument "cellPhoneNumber"');
    }
    if (password === undefined) {
      throw new RpcLogicValidationError('require argument "password"');
    }
    if (rememberPassword === undefined) {
      throw new RpcLogicValidationError('require argument "rememberPassword"');
    }

    // set argument into _params
    _params['cellPhoneNumber'] = cellPhoneNumber;
    _params['password'] = password;
    _params['rememberPassword'] = rememberPassword;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/staff/auth/ver1/replace_login', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  first_modify_password({ newPassword, confirmPassword, version, rememberPassword, context }) {
    let _params = {};
    // check require
    if (newPassword === undefined) {
      throw new RpcLogicValidationError('require argument "newPassword"');
    }
    if (confirmPassword === undefined) {
      throw new RpcLogicValidationError('require argument "confirmPassword"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }
    if (rememberPassword === undefined) {
      throw new RpcLogicValidationError('require argument "rememberPassword"');
    }

    // set argument into _params
    _params['newPassword'] = newPassword;
    _params['confirmPassword'] = confirmPassword;
    _params['rememberPassword'] = rememberPassword;
    _params['version'] = version;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/staff/auth/ver1/first_modify_password', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  logout({ id, cellPhoneNumber, name, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (cellPhoneNumber === undefined) {
      throw new RpcLogicValidationError('require argument "cellPhoneNumber"');
    }
    if (name === undefined) {
      throw new RpcLogicValidationError('require argument "name"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['mobile'] = cellPhoneNumber;
    _params['name'] = name;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/staff/auth/ver1/logout', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  get_personal_detail({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/auth/v1/get_personal_detail/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  modify_password({ password, newPassword, confirmPassword, context }) {
    let _params = {};
    // check require
    if (password === undefined) {
      throw new RpcLogicValidationError('require argument "password"');
    }
    if (newPassword === undefined) {
      throw new RpcLogicValidationError('require argument "newPassword"');
    }
    if (confirmPassword === undefined) {
      throw new RpcLogicValidationError('require argument "confirmPassword"');
    }

    // set argument into _params
    _params['password'] = password;
    _params['newPassword'] = newPassword;
    _params['confirmPassword'] = confirmPassword;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/staff/auth/ver1/modify_password', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  check_mail_token({ mailToken, context }) {
    let _params = {};
    // check require
    if (mailToken === undefined) {
      throw new RpcLogicValidationError('require argument "mailToken"');
    }

    // set argument into _params
    _params['mailToken'] = mailToken;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/mail/v1/check', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
}

export class TodoItem {
  constructor() {
    this.id = 0; // 0 require
    this.businessType = ''; // 1 require
    this.targetUrl = ''; // 2 require
    this.content = ''; // 3 require
    this.enterpriseId = ''; // 4 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

TodoItem.__json_class__ = 'BackboneSslc.TodoItem';

export class IndustryItem {
  constructor() {
    this.industryName = ''; // 0 require
    this.industryCount = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

IndustryItem.__json_class__ = 'BackboneSslc.IndustryItem';

export class SoftwareItem {
  constructor() {
    this.serviceNo = ''; // 0 require
    this.serviceName = ''; // 1 require
    this.moduleNo = ''; // 2 require
    this.moduleName = ''; // 3 require
    this.softwareTotalCount = ''; // 4 require
    this.softwarePercent = ''; // 5 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SoftwareItem.__json_class__ = 'BackboneSslc.SoftwareItem';

export class HardwareItem {
  constructor() {
    this.hardwareSeriesNo = ''; // 0 require
    this.hardwareSeriesName = ''; // 1 require
    this.hardwareProductNo = ''; // 2 require
    this.hardwareProductName = ''; // 3 require
    this.hardwareTotalCount = ''; // 4 require
    this.hardwarePercent = ''; // 5 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

HardwareItem.__json_class__ = 'BackboneSslc.HardwareItem';

// 首页接口类
export class HomeInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'HomeInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  totality_statistics({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/home/v1/totality_statistics', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  todo_list({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/home/v1/todo_list_list?userId={id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  industry_proportion({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/home/v1/industry_proportion', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  software_product_sales_proportion({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/home/v1/software_product_sales_proportion', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  hardware_product_sales_proportion({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/home/v1/hardware_product_sales_proportion', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}

export class SortObject {
  constructor() {
    this.field = ''; // 0 require
    this.orderBy = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SortObject.__json_class__ = 'BackboneSslc.SortObject';

export class PageIn {
  constructor() {
    this.pageNum = 0; // 0 require
    this.pageSize = 0; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

PageIn.__json_class__ = 'BackboneSslc.PageIn';

export class Page {
  constructor() {
    this.total = 0; // 0 require
    this.pageNum = 0; // 1 require
    this.pageSize = 0; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

Page.__json_class__ = 'BackboneSslc.Page';

export class RoleDetail {
  constructor() {
    this.id = 0; // 0 optional
    this.roleName = ''; // 1 require
    this.version = 0; // 2 optional
    this.description = ''; // 3 require
    this.auths = []; // 4 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

RoleDetail.__json_class__ = 'BackboneSslc.RoleDetail';

export class RoleInfo {
  constructor() {
    this.id = 0; // 0 require
    this.roleName = ''; // 1 require
    this.version = 0; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

RoleInfo.__json_class__ = 'BackboneSslc.RoleInfo';

export class RoleCate {
  constructor() {
    this.id = 0; // 0 require
    this.type = ''; // 1 require
    this.typeSon = ''; // 2 require
    this.auth = ''; // 3 require
    this.name = ''; // 4 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

RoleCate.__json_class__ = 'BackboneSslc.RoleCate';

export class RoleName {
  constructor() {
    this.id = 0; // 0 require
    this.name = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

RoleName.__json_class__ = 'BackboneSslc.RoleName';

// 角色管理接口类
export class RoleInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'RoleInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_roles({ roleName, pageNum, pageSize, sortObj, context }) {
    let _params = {};
    // check require
    if (roleName === undefined) {
      throw new RpcLogicValidationError('require argument "roleName"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }

    // set argument into _params
    _params['roleName'] = roleName;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['sortObj'] = sortObj;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/role/v1/roles', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_role({ p_id, id, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }

    // set argument into _params
    _params['id'] = id;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/role/v1/roles/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_role({ id, roleName, version, description, auths, context }) {
    let _params = {};
    // check require
    if (roleName === undefined) {
      throw new RpcLogicValidationError('require argument "roleName"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (auths === undefined) {
      throw new RpcLogicValidationError('require argument "auths"');
    }

    // set argument into _params
    if (id !== undefined) {
      _params['id'] = id;
    }
    _params['roleName'] = roleName;
    if (version !== undefined) {
      _params['version'] = version;
    }
    _params['description'] = description;
    _params['auths'] = auths;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/role/v1/roles', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  update_role({ p_id, id, roleName, version, description, auths, context }) {
    let _params = {};
    // check require
    if (roleName === undefined) {
      throw new RpcLogicValidationError('require argument "roleName"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (auths === undefined) {
      throw new RpcLogicValidationError('require argument "auths"');
    }

    // set argument into _params
    if (id !== undefined) {
      _params['id'] = id;
    }
    _params['roleName'] = roleName;
    if (version !== undefined) {
      _params['version'] = version;
    }
    _params['description'] = description;
    _params['auths'] = auths;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/role/v1/roles/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_role({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/role/v1/roles/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  get_role_actions({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/role/v1/get_role_actions', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_all_roles({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/role/v1/get_all_roles', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}

export class UserInfoT {
  constructor() {
    this.id = 0; // 0 require
    this.account = ''; // 1 require
    this.name = ''; // 2 require
    this.sex = ''; // 3 require
    this.mobile = ''; // 4 require
    this.email = ''; // 5 require
    this.status = ''; // 6 require
    this.version = 0; // 7 require
    this.roleList = []; // 8 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

UserInfoT.__json_class__ = 'BackboneSslc.UserInfoT';

export class UserDetail {
  constructor() {
    this.id = 0; // 0 optional
    this.account = ''; // 1 optional
    this.name = ''; // 2 require
    this.sex = ''; // 3 require
    this.mobile = ''; // 4 require
    this.email = ''; // 5 require
    this.description = ''; // 6 require
    this.version = 0; // 7 optional
    this.status = ''; // 8 optional
    this.roleIdList = []; // 9 require
    this.roleNameList = []; // 10 optional
  }

  dump() {
    return JSON.stringify(this);
  }
}

UserDetail.__json_class__ = 'BackboneSslc.UserDetail';

export class AdminUser {
  constructor() {
    this.id = 0; // 0 require
    this.name = ''; // 1 require
    this.mobile = ''; // 2 require
    this.email = ''; // 3 optional
  }

  dump() {
    return JSON.stringify(this);
  }
}

AdminUser.__json_class__ = 'BackboneSslc.AdminUser';

// 用户管理接口类
export class UserInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'UserInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_users({ adminuserKey, roleId, status, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (adminuserKey === undefined) {
      throw new RpcLogicValidationError('require argument "adminuserKey"');
    }
    if (roleId === undefined) {
      throw new RpcLogicValidationError('require argument "roleId"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['adminuserKey'] = adminuserKey;
    _params['roleId'] = roleId;
    _params['status'] = status;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/admin_user/v1/admin_users', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_user_detail({ p_id, id, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }

    // set argument into _params
    _params['id'] = id;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/admin_user/v1/admin_users/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_user({
    id,
    account,
    name,
    sex,
    mobile,
    email,
    description,
    version,
    status,
    roleIdList,
    roleNameList,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (name === undefined) {
      throw new RpcLogicValidationError('require argument "name"');
    }
    if (sex === undefined) {
      throw new RpcLogicValidationError('require argument "sex"');
    }
    if (mobile === undefined) {
      throw new RpcLogicValidationError('require argument "mobile"');
    }
    if (email === undefined) {
      throw new RpcLogicValidationError('require argument "email"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (roleIdList === undefined) {
      throw new RpcLogicValidationError('require argument "roleIdList"');
    }

    // set argument into _params
    if (id !== undefined) {
      _params['id'] = id;
    }
    if (account !== undefined) {
      _params['account'] = account;
    }
    _params['name'] = name;
    _params['sex'] = sex;
    _params['mobile'] = mobile;
    _params['email'] = email;
    _params['description'] = description;
    if (version !== undefined) {
      _params['version'] = version;
    }
    if (status !== undefined) {
      _params['status'] = status;
    }
    _params['roleIdList'] = roleIdList;
    if (roleNameList !== undefined) {
      _params['roleNameList'] = roleNameList;
    }
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/admin_user/v1/admin_users', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  update_user({
    p_id,
    id,
    account,
    name,
    sex,
    mobile,
    email,
    description,
    version,
    status,
    roleIdList,
    roleNameList,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (name === undefined) {
      throw new RpcLogicValidationError('require argument "name"');
    }
    if (sex === undefined) {
      throw new RpcLogicValidationError('require argument "sex"');
    }
    if (mobile === undefined) {
      throw new RpcLogicValidationError('require argument "mobile"');
    }
    if (email === undefined) {
      throw new RpcLogicValidationError('require argument "email"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (roleIdList === undefined) {
      throw new RpcLogicValidationError('require argument "roleIdList"');
    }

    // set argument into _params
    if (id !== undefined) {
      _params['id'] = id;
    }
    if (account !== undefined) {
      _params['account'] = account;
    }
    _params['name'] = name;
    _params['sex'] = sex;
    _params['mobile'] = mobile;
    _params['email'] = email;
    _params['description'] = description;
    if (version !== undefined) {
      _params['version'] = version;
    }
    if (status !== undefined) {
      _params['status'] = status;
    }
    _params['roleIdList'] = roleIdList;
    if (roleNameList !== undefined) {
      _params['roleNameList'] = roleNameList;
    }
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/admin_user/v1/admin_users/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_user({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/admin_user/v1/admin_users/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  reset_password({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/admin_user/v1/reset_password/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  activate_user({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/admin_user/v1/activate_user/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  lock_user({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/admin_user/v1/lock_user/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }
  // 用户管理导入按钮
  lead_in_admin_user({ excelFile, context }) {
    let _params = {};
    // check require
    if (excelFile === undefined) {
      throw new RpcLogicValidationError('require argument "excelFile"');
    }

    // set argument into _params
    _params['excelFile'] = excelFile;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/admin_user/v1/lead_in_admin_user', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  get_user_by_auth({ auth, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['auth'] = auth;
    let _url = this._genCustomUrl('/base/admin_user/v1/get_user_by_auth/{auth}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_user_by_role({ role_id, roleId, context }) {
    let _params = {};
    // check require
    if (roleId === undefined) {
      throw new RpcLogicValidationError('require argument "roleId"');
    }

    // set argument into _params
    _params['roleId'] = roleId;
    // prepare url
    let customArgs = {};
    customArgs['role_id'] = role_id;
    let _url = this._genCustomUrl('/base/admin_user/v1/get_user_by_role/{role_id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_user_by_name_or_mobile({ name, mobile, context }) {
    let _params = {};
    // check require
    if (name === undefined) {
      throw new RpcLogicValidationError('require argument "name"');
    }
    if (mobile === undefined) {
      throw new RpcLogicValidationError('require argument "mobile"');
    }

    // set argument into _params
    _params['name'] = name;
    _params['mobile'] = mobile;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/admin_user/v1/get_user_by_name_or_mobile', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_admin_users_by_role({ role_object, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['role_object'] = role_object;
    let _url = this._genCustomUrl('/base/admin_user/v1/get_admin_users_by_role/{role_object}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}

// 碳基础信息维护
export class CarbonMaintenanceInterApi extends BaseInterfApi {
  constructor(
    baseUrl,
    moduleName = 'BackbonSslc',
    interfName = 'CarbonMaintenanceInter',
    token = 'anonymous',
    ...args
  ) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  // 取得行业目录一览
  get_trade({ tradeKey, sortObj, pageNum, pageSize, context }) {
    let _params = {};

    _params['tradeKey'] = tradeKey;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/trade', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得行业选项一览
  get_trade_option({ context }) {
    let _params = {};

    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/trade_option', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  add_trade({ tradeCode, kindName, largeCategoryName, mediumCategoryName, littleCategoryName, context }) {
    let _params = {};
    // set argument into _params
    _params['tradeCode'] = tradeCode;
    _params['kindName'] = kindName;
    _params['largeCategoryName'] = largeCategoryName;
    _params['mediumCategoryName'] = mediumCategoryName;
    _params['littleCategoryName'] = littleCategoryName;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('software_maintenance/carbon_account/ver1/trade', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  edit_trade({
    trade_id,
    tradeCode,
    kindName,
    largeCategoryName,
    mediumCategoryName,
    littleCategoryName,
    version,
    context
  }) {
    let _params = {};
    // set argument into _params
    _params['tradeCode'] = tradeCode;
    _params['kindName'] = kindName;
    _params['largeCategoryName'] = largeCategoryName;
    _params['mediumCategoryName'] = mediumCategoryName;
    _params['littleCategoryName'] = littleCategoryName;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['trade_id'] = trade_id;

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/trade/{trade_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  delete_trade({ trade_id, version, context }) {
    let _params = {};
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['trade_id'] = trade_id;
    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/trade/{trade_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }
  batch_delete_trade({ list, context }) {
    let _params = {};
    if (list === undefined) {
      throw new RpcLogicValidationError('require argument "list"');
    }

    // set argument into _params
    _params['list'] = list;
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/trade', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }
  // 取得行业关联标准一览
  get_trade_relate_standard({ trade_id, type, context }) {
    let _params = {};
    if (type === undefined) {
      type = '';
    }
    _params['type'] = type;

    let customArgs = {};
    customArgs['trade_id'] = trade_id;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/trade_relate_standard/{trade_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得行业批量关联标准一览
  get_trade_bulk_relate_standard({ tradeList, type, context }) {
    let _params = {};
    if (type === undefined) {
      type = '';
    }
    _params['tradeList'] = tradeList;
    _params['type'] = type;

    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/trade_bulk_relate_standard', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 编辑行业关联标准
  edit_trade_relate_standard({ trade_id, list, context }) {
    let _params = {};
    // set argument into _params
    _params['list'] = list;
    // prepare url
    let customArgs = {};
    customArgs['trade_id'] = trade_id;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/edit_trade_relate_standard/{trade_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  // 编辑行业批量关联标准
  edit_trade_bulk_relate_standard({ tradeList, standardList, context }) {
    let _params = {};
    // set argument into _params
    _params['tradeList'] = tradeList;
    _params['standardList'] = standardList;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/edit_trade_bulk_relate_standard',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  // 取得行业ID关联标准一览
  get_standard_trade({ tradeId, standardName, standardType, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    _params['standardName'] = standardName;
    _params['standardType'] = standardType;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;

    let customArgs = {};
    customArgs['trade_id'] = tradeId;

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/standard_trade/{trade_id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 编辑行业默认碳排查标准
  edit_trade_default_standard({ trade_id, standardId, version, context }) {
    let _params = {};
    // set argument into _params
    _params['standardId'] = standardId;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['trade_id'] = trade_id;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/edit_trade_default_standard/{trade_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  // 取得标准类型
  standard_types({ context }) {
    let _params = {};

    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/standard_types', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  // 取得标准目录一览
  get_standard({ standardName, standardType, sortObj, pageNum, pageSize, context }) {
    let _params = {};

    _params['standardName'] = standardName;
    _params['standardType'] = standardType;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/standard', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得标准所在页号
  get_page_number_standard({ standard_id, context }) {
    let _params = {};

    let customArgs = {};
    customArgs['standard_id'] = standard_id;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/get_page_number_standard/{standard_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  add_standard({ name, type, scene, context }) {
    let _params = {};
    // set argument into _params
    _params['name'] = name;
    _params['type'] = type;
    _params['scene'] = scene;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/standard', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  edit_standard({ standard_id, name, type, scene, version, context }) {
    let _params = {};
    // set argument into _params
    _params['name'] = name;
    _params['type'] = type;
    _params['scene'] = scene;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['standard_id'] = standard_id;

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/standard/{standard_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  delete_standard({ standard_id, version, context }) {
    let _params = {};
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['standard_id'] = standard_id;
    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/standard/{standard_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }
  batch_delete_standard({ list, context }) {
    let _params = {};
    if (list === undefined) {
      throw new RpcLogicValidationError('require argument "list"');
    }

    // set argument into _params
    _params['list'] = list;
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/standard', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }
  // 取得标准ID关联模块一览
  get_module_standard({ standardId, moduleName, moduleType, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    _params['moduleName'] = moduleName;
    _params['moduleType'] = moduleType;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;

    let customArgs = {};
    customArgs['standard_id'] = standardId;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/module_standard/{standard_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得模块分类
  module_types({ context }) {
    let _params = {};

    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/module_types', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得标准关联模块一览
  get_standard_relate_module({ standard_id, type, context }) {
    let _params = {};
    if (type === undefined) {
      type = '';
    }
    _params['type'] = type;

    let customArgs = {};
    customArgs['standard_id'] = standard_id;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/standard_relate_module/{standard_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得标准批量关联模块一览
  get_standard_bulk_relate_module({ standardList, type, context }) {
    let _params = {};
    if (type === undefined) {
      type = '';
    }
    _params['standardList'] = standardList;
    _params['type'] = type;

    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/standard_bulk_relate_module', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 编辑标准批量关联模块
  edit_standard_relate_module({ standard_id, list, context }) {
    let _params = {};
    // set argument into _params
    _params['list'] = list;
    // prepare url
    let customArgs = {};
    customArgs['standard_id'] = standard_id;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/edit_standard_relate_module/{standard_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  // 编辑标准关联模块
  edit_standard_bulk_relate_module({ standardList, moduleList, context }) {
    let _params = {};
    // set argument into _params
    _params['standardList'] = standardList;
    _params['moduleList'] = moduleList;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/edit_standard_bulk_relate_module',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  // 取得模块目录一览
  get_modules({ moduleName, moduleType, sortObj, pageNum, pageSize, context }) {
    let _params = {};

    _params['moduleName'] = moduleName;
    _params['moduleType'] = moduleType;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/modules', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得模块所在页号
  get_page_number_module({ module_id, context }) {
    let _params = {};

    let customArgs = {};
    customArgs['module_id'] = module_id;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/get_page_number_module/{module_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  add_modules({ name, type, calculateWay, context }) {
    let _params = {};
    // set argument into _params
    _params['name'] = name;
    _params['type'] = type;
    _params['calculateWay'] = calculateWay;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/modules', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  edit_modules({ module_id, name, type, calculateWay, version, context }) {
    let _params = {};
    // set argument into _params
    _params['name'] = name;
    _params['type'] = type;
    _params['calculateWay'] = calculateWay;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['module_id'] = module_id;

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/modules/{module_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  delete_modules({ module_id, version, context }) {
    let _params = {};
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['module_id'] = module_id;
    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/modules/{module_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }
  // 取得参数选项
  parameter_types({ context }) {
    let _params = {};

    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/parameter_type_option', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得模块ID关联参数一览
  get_parameter_module({ moduleId, level2CategoryName, parameterType, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    _params['level2CategoryName'] = level2CategoryName;
    _params['parameterType'] = parameterType;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;

    let customArgs = {};
    customArgs['module_id'] = moduleId;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/parameter_type_module/{module_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得模块关联参数一览
  get_module_relate_parameter({ module_id, type, context }) {
    let _params = {};
    if (type === undefined) {
      type = '';
    }
    _params['type'] = type;

    let customArgs = {};
    customArgs['module_id'] = module_id;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/module_relate_parameter_type/{module_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 编辑模块关联参数
  edit_module_relate_parameter({ module_id, list, context }) {
    let _params = {};
    // set argument into _params
    _params['list'] = list;
    // prepare url
    let customArgs = {};
    customArgs['module_id'] = module_id;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/edit_module_relate_parameter_type/{module_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  // 取得参数类型一览
  get_parameter_types({ level2CategoryName, parameterType, sortObj, pageNum, pageSize, context }) {
    let _params = {};

    _params['level2CategoryName'] = level2CategoryName;
    _params['parameterType'] = parameterType;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/parameter_types', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  add_parameter_types({ type, level2CategoryName, level3CategoryName, level4CategoryName, context }) {
    let _params = {};
    // set argument into _params
    _params['type'] = type;
    _params['level2CategoryName'] = level2CategoryName;
    _params['level3CategoryName'] = level3CategoryName;
    _params['level4CategoryName'] = level4CategoryName;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/parameter_types', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  edit_parameter_types({
    parameter_type_id,
    type,
    level2CategoryName,
    level3CategoryName,
    level4CategoryName,
    version,
    context
  }) {
    let _params = {};
    // set argument into _params
    _params['type'] = type;
    _params['level2CategoryName'] = level2CategoryName;
    _params['level3CategoryName'] = level3CategoryName;
    _params['level4CategoryName'] = level4CategoryName;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['parameter_type_id'] = parameter_type_id;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/parameter_types/{parameter_type_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  delete_parameter_types({ parameter_type_id, version, context }) {
    let _params = {};
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['parameter_type_id'] = parameter_type_id;
    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/parameter_types/{parameter_type_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }
  parameter_type_reference({ id, context }) {
    let _params = {};
    _params['id'] = id;

    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/parameter_type_reference', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  // 取得参数类型ID相关参数名称选项一览
  parameter_detail_names({ parameter_type_id, context }) {
    let _params = {};

    let customArgs = {};
    customArgs['parameter_type_id'] = parameter_type_id;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/parameter_detail_names/{parameter_type_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得参数类型ID相关类型选项一览
  parameter_detail_types({ parameter_type_id, context }) {
    let _params = {};

    let customArgs = {};
    customArgs['parameter_type_id'] = parameter_type_id;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/parameter_detail_types/{parameter_type_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得参数类型ID相关参数详情一览
  get_parameter_detail({ parameter_type_id, parameterName, type, sortObj, pageNum, pageSize, context }) {
    let _params = {};

    _params['parameterName'] = parameterName;
    _params['type'] = type;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    let customArgs = {};
    customArgs['parameter_type_id'] = parameter_type_id;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/parameter_detail_parameter_type/{parameter_type_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得参数类型所在页号
  get_page_number_parameter_type({ parameter_type_id, context }) {
    let _params = {};

    let customArgs = {};
    customArgs['parameter_type_id'] = parameter_type_id;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/get_page_number_parameter_type/{parameter_type_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  add_parameter_details({ parameterTypeId, name, type, decimalValue, unit, source, comment, context }) {
    let _params = {};
    // set argument into _params
    _params['parameterTypeId'] = parameterTypeId;
    _params['name'] = name;
    _params['type'] = type;
    _params['decimalValue'] = decimalValue;
    _params['unit'] = unit;
    _params['source'] = source;
    _params['comment'] = comment;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/carbon_account/ver1/parameter_details', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  edit_parameter_details({ parameter_detail_id, name, type, decimalValue, unit, source, comment, version, context }) {
    let _params = {};
    // set argument into _params
    _params['name'] = name;
    _params['type'] = type;
    _params['decimalValue'] = decimalValue;
    _params['unit'] = unit;
    _params['source'] = source;
    _params['comment'] = comment;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['parameter_detail_id'] = parameter_detail_id;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/parameter_details/{parameter_detail_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  delete_parameter_details({ parameter_detail_id, version, context }) {
    let _params = {};
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['parameter_detail_id'] = parameter_detail_id;
    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_account/ver1/parameter_details/{parameter_detail_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }
}
// 碳资产管理
export class CarbonAssetManageInterApi extends BaseInterfApi {
  constructor(
    baseUrl,
    moduleName = 'BackbonSslc',
    interfName = 'CarbonAssetManageInter',
    token = 'anonymous',
    ...args
  ) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  // 获取交易所名称
  get_market_name({ context }) {
    let _params = {};

    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_trade/ver1/get_carbon_emission_transaction_market_name/',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 获取碳排放权交易价格
  get_transaction_price({ idList, submissiontype, startDate, endDate, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    _params['idList'] = idList.join(',');
    _params['submissiontype'] = submissiontype;
    _params['startDate'] = startDate;
    _params['endDate'] = endDate;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;

    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_trade/ver1/get_carbon_emission_transaction_price/',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  // 新增碳排放权交易价格
  add_transaction_price({ carbonEmissionTransactionMarketId, transactionClosingPrice, transactionDate, context }) {
    let _params = {};
    // set argument into _params
    _params['carbonEmissionTransactionMarketId'] = carbonEmissionTransactionMarketId;
    _params['transactionClosingPrice'] = transactionClosingPrice;
    _params['transactionDate'] = transactionDate;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_trade/ver1/add_carbon_emission_transaction_price/',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  // 修改碳排放权交易价格
  edit_transaction_price({
    carbonEmissionTransactionMarketId,
    transactionClosingPrice,
    transactionDate,
    carbonEmissionTransactionPriceId,
    context
  }) {
    let _params = {};
    // set argument into _params
    // _params['carbonEmissionTransactionMarketId'] = carbonEmissionTransactionMarketId;
    _params['transactionClosingPrice'] = transactionClosingPrice;
    // _params['transactionDate'] = transactionDate;
    // _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['carbon_emission_transaction_price_id'] = carbonEmissionTransactionPriceId;

    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_trade/ver1/update_carbon_emission_transaction_price/{carbon_emission_transaction_price_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  // 删除碳排放权交易价格
  delete_transaction_price({ carbonEmissionTransactionPriceId, version, context }) {
    let _params = {};
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    _params['carbonEmissionTransactionPriceId'] = carbonEmissionTransactionPriceId;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl(
      '/software_maintenance/carbon_trade/ver1/delete_carbon_emission_transaction_price/',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }
}

// 碳排因子数据库
export class EmissionFactorDatabaseInterApi extends BaseInterfApi {
  constructor(
    baseUrl,
    moduleName = 'BackbonSslc',
    interfName = 'EmissionFactorDatabaseInter',
    token = 'anonymous',
    ...args
  ) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  // 取得碳排因子数据库列表
  get_emission_factor_databases({ type, name, databaseEdition, context }) {
    let _params = {};
    if (type !== undefined) {
      _params['type'] = type;
    }
    if (name !== undefined) {
      _params['name'] = name;
    }
    if (databaseEdition !== undefined) {
      _params['databaseEdition'] = databaseEdition;
    }

    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/emission_factor/ver1/emission_factor_databases', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得数据库 类型 选项列表
  get_emission_factor_database_type_option({ context }) {
    let _params = {};

    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/get_emission_factor_database_type_option',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得数据库 名称 选项列表
  get_emission_factor_database_name_option({ databaseType, context }) {
    let _params = {};
    if (databaseType !== undefined) {
      _params['databaseType'] = databaseType;
    }

    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/get_emission_factor_database_name_option',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得数据库 版本 选项列表
  get_emission_factor_database_edition_option({ databaseType, databaseName, context }) {
    let _params = {};
    if (databaseType !== undefined) {
      _params['databaseType'] = databaseType;
    }
    if (databaseName !== undefined) {
      _params['databaseName'] = databaseName;
    }
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/get_emission_factor_database_edition_option',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 新增碳排因子数据库
  add_emission_factor_databases({ type, name, databaseEdition, context }) {
    let _params = {};
    // set argument into _params
    _params['type'] = type;
    _params['name'] = name;
    _params['databaseEdition'] = databaseEdition;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/emission_factor/ver1/emission_factor_databases', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  // 编辑碳排因子数据库
  edit_emission_factor_databases({ id, type, name, databaseEdition, version, context }) {
    let _params = {};
    // set argument into _params
    _params['type'] = type;
    _params['name'] = name;
    _params['databaseEdition'] = databaseEdition;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['database_id'] = id;

    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/emission_factor_databases/{database_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  // 删除碳排因子数据库
  delete_emission_factor_databases({ id, version, context }) {
    let _params = {};
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['database_id'] = id;
    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/emission_factor_databases/{database_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  // 批量删除排放因子数据
  bulk_delete_emission_factor_data({ list, context }) {
    let _params = {};
    _params['list'] = list;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/bulk_delete_emission_factor_data',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  // 批量编辑排放因子数据
  bulk_edit_emission_factor_data({
    comment,
    commentSelectFlag,
    country,
    countrySelectFlag,
    dataQuality,
    dataQualitySelectFlag,
    dataScore,
    dataScoreSelectFlag,
    dataSupplier,
    dataSupplierSelectFlag,
    dataType,
    emissionFactorDatabaseId,
    emissionFactorDescribe,
    emissionFactorDescribeSelectFlag,
    emissionFactorType,
    emissionFactorTypeId,
    emissionFactorTypeIdSelectFlag,
    emissionGreenhouseGasTypeId,
    emissionLink,
    emissionSource,
    reference,
    referenceSelectFlag,
    region,
    regionSelectFlag,
    uncertaintyRange,
    uncertaintyRangeSelectFlag,
    updateTime,
    updateTimeSelectFlag,
    updateUserName,
    updateUserNameSelectFlag,
    list,
    context
  }) {
    let _params = {};
    // set argument into _params
    _params['comment'] = comment;
    _params['commentSelectFlag'] = commentSelectFlag;
    _params['country'] = country;
    _params['countrySelectFlag'] = countrySelectFlag;
    _params['dataQuality'] = dataQuality;
    _params['dataQualitySelectFlag'] = dataQualitySelectFlag;
    _params['dataScore'] = dataScore;
    _params['dataScoreSelectFlag'] = dataScoreSelectFlag;
    _params['dataSupplier'] = dataSupplier;
    _params['dataSupplierSelectFlag'] = dataSupplierSelectFlag;
    _params['dataType'] = dataType;
    _params['emissionFactorDatabaseId'] = emissionFactorDatabaseId;
    _params['emissionFactorDescribe'] = emissionFactorDescribe;
    _params['emissionFactorDescribeSelectFlag'] = emissionFactorDescribeSelectFlag;
    _params['emissionFactorType'] = emissionFactorType;
    _params['emissionFactorTypeId'] = emissionFactorTypeId;
    _params['emissionFactorTypeIdSelectFlag'] = emissionFactorTypeIdSelectFlag;
    _params['emissionGreenhouseGasTypeId'] = emissionGreenhouseGasTypeId;
    _params['emissionLink'] = emissionLink;
    _params['emissionSource'] = emissionSource;
    _params['reference'] = reference;
    _params['referenceSelectFlag'] = referenceSelectFlag;
    _params['region'] = region;
    _params['regionSelectFlag'] = regionSelectFlag;
    _params['uncertaintyRange'] = uncertaintyRange;
    _params['uncertaintyRangeSelectFlag'] = uncertaintyRangeSelectFlag;
    _params['updateTime'] = updateTime;
    _params['updateTimeSelectFlag'] = updateTimeSelectFlag;
    _params['updateUserName'] = updateUserName;
    _params['updateUserNameSelectFlag'] = updateUserNameSelectFlag;
    _params['list'] = list;

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/bulk_edit_emission_factor_data',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  // 新增碳排因子数据
  add_emission_factor_data({
    emissionFactorTypeId,
    emissionSource,
    emissionGreenhouseGasTypeId,
    emissionLink,
    country,
    region,
    dataType,
    emissionFactorType,
    uncertaintyRange,
    dataScore,
    dataQuality,
    dataSupplier,
    list,
    reference,
    emissionFactorDescribe,
    emissionFactorDatabaseId,
    comment,
    updateUserName,
    updateTime,
    context
  }) {
    let _params = {};
    // set argument into _params
    _params['emissionFactorTypeId'] = emissionFactorTypeId;
    _params['emissionSource'] = emissionSource;
    _params['emissionGreenhouseGasTypeId'] = emissionGreenhouseGasTypeId;
    _params['emissionLink'] = emissionLink;
    _params['country'] = country;
    _params['region'] = region;
    _params['dataType'] = dataType;
    _params['emissionFactorType'] = emissionFactorType;
    _params['dataScore'] = dataScore;
    _params['uncertaintyRange'] = uncertaintyRange;
    _params['dataQuality'] = dataQuality;
    _params['dataSupplier'] = dataSupplier;
    _params['list'] = list;
    _params['reference'] = reference;
    _params['emissionFactorDescribe'] = emissionFactorDescribe;
    _params['comment'] = comment;
    _params['emissionFactorDatabaseId'] = emissionFactorDatabaseId;
    _params['updateTime'] = updateTime;
    _params['updateUserName'] = updateUserName;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/emission_factor/ver1/emission_factor_data', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  // 编辑排放因子数据
  edit_emission_factor_data({
    emissionFactorDataId,
    emissionFactorTypeId,
    emissionSource,
    emissionGreenhouseGasTypeId,
    emissionLink,
    country,
    region,
    dataType,
    emissionFactorType,
    uncertaintyRange,
    dataScore,
    dataQuality,
    dataSupplier,
    list,
    reference,
    emissionFactorDescribe,
    emissionFactorDatabaseId,
    comment,
    version,
    updateUserName,
    updateTime,
    context
  }) {
    if (emissionFactorDataId === undefined) {
      throw new RpcLogicValidationError('require argument "emissionFactorDataId"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }
    let _params = {};
    // set argument into _params
    _params['emissionFactorTypeId'] = emissionFactorTypeId;
    _params['emissionSource'] = emissionSource;
    _params['emissionGreenhouseGasTypeId'] = emissionGreenhouseGasTypeId;
    _params['emissionLink'] = emissionLink;
    _params['country'] = country;
    _params['region'] = region;
    _params['dataType'] = dataType;
    _params['emissionFactorType'] = emissionFactorType;
    _params['dataScore'] = dataScore;
    _params['uncertaintyRange'] = uncertaintyRange;
    _params['dataQuality'] = dataQuality;
    _params['dataSupplier'] = dataSupplier;
    _params['list'] = list;
    _params['reference'] = reference;
    _params['emissionFactorDescribe'] = emissionFactorDescribe;
    _params['comment'] = comment;
    _params['emissionFactorDatabaseId'] = emissionFactorDatabaseId;
    _params['version'] = version;
    _params['updateTime'] = updateTime;
    _params['updateUserName'] = updateUserName;
    // prepare url
    let customArgs = {};
    customArgs['emission_factor_data_id'] = emissionFactorDataId;

    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/emission_factor_data/{emission_factor_data_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  // 导出排放因子数据列表
  export_emission_factor_data({
    exportIdList,
    emissionFactorDatabaseType,
    emissionFactorDatabaseName,
    emissionFactorDatabaseEdition,
    emissionFactorTypeId,
    emissionGreenhouseGasTypeIdList,
    emissionSource,
    emissionLink,
    dataType,
    emissionFactorType,
    dataSupplier,
    country,
    region,
    reference,
    pageNum,
    pageSize,
    sortObj,
    context
  }) {
    let _params = {};
    // if (pageNum === undefined) {
    //   throw new RpcLogicValidationError('require argument "pageNum"');
    // }
    // if (pageSize === undefined) {
    //   throw new RpcLogicValidationError('require argument "pageSize"');
    // }
    if (emissionFactorDatabaseType !== undefined) {
      _params['emissionFactorDatabaseType'] = emissionFactorDatabaseType;
    }
    if (emissionFactorDatabaseName !== undefined) {
      _params['emissionFactorDatabaseName'] = emissionFactorDatabaseName;
    }
    if (emissionFactorDatabaseEdition !== undefined) {
      _params['emissionFactorDatabaseEdition'] = emissionFactorDatabaseEdition;
    }
    if (emissionLink && emissionLink.length) {
      _params['emissionLink'] = emissionLink[0];
    }
    _params['emissionFactorTypeId'] = emissionFactorTypeId;
    _params['emissionGreenhouseGasTypeIdList'] = emissionGreenhouseGasTypeIdList;
    _params['emissionSource'] = emissionSource;
    _params['dataType'] = dataType;
    _params['emissionFactorType'] = emissionFactorType;
    _params['dataSupplier'] = dataSupplier;
    _params['country'] = country;
    _params['region'] = region;
    _params['reference'] = reference;
    if (sortObj !== undefined) {
      _params['sortObj'] = sortObj;
    }
    // set argument into _params

    // _params['pageNum'] = pageNum;
    // _params['pageSize'] = pageSize;

    if (exportIdList !== undefined) {
      _params['exportIdList'] = exportIdList; // 导出ID列表
    }
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/emission_factor/ver1/export_emission_factor_data', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  // 取得 索引 列表
  get_emission_factor_types({ filterEmptyDataFlag, addAllFlag, context }) {
    let _params = {};
    if (filterEmptyDataFlag !== undefined) {
      _params['filterEmptyDataFlag'] = filterEmptyDataFlag;
    }
    if (addAllFlag !== undefined) {
      _params['addAllFlag'] = addAllFlag;
    }

    let customArgs = {};
    let _url = this._genCustomUrl('/software_maintenance/emission_factor/ver1/emission_factor_types', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得排放温室气体种类选项列表
  get_emission_greenhouse_gas_type_option({ addAllFlag, context }) {
    let _params = {};
    if (addAllFlag !== undefined) {
      _params['addAllFlag'] = addAllFlag;
    }
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/get_emission_greenhouse_gas_type_option',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得排放温室气体 版本
  getEmissionGasVersion({ context }) {
    let _params = {};
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/emission_greenhouse_gas_types_history_type_version/',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得排放因子分类 版本
  getEmissionFactorVersion({ context }) {
    let _params = {};
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/get_emission_factor_history_type_version',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得排放因子分类选项列表
  get_emission_factor_data_emission_factor_type_option({ context }) {
    let _params = {};
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/get_emission_factor_data_emission_factor_type_option',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  // 取得排放因子数据详情列表
  get_emission_factor_data_detail({ emissionFactorDataId, context }) {
    let _params = {};
    _params['emissionFactorDataId'] = emissionFactorDataId;
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl('/software_maintenance/emission_factor/ver1/emission_factor_data_detail', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  // 取得排放因子数据排放环节选项列表
  get_emission_factor_data_emission_link_option({ context }) {
    let _params = {};
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/get_emission_factor_data_emission_link_option',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得排放因子数据类型选项列表
  get_emission_factor_data_type_option({ context }) {
    let _params = {};
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/get_emission_factor_data_type_option',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 编辑 索引 列表
  edit_emission_factor_types({ list, context }) {
    let _params = {};
    _params['list'] = list;

    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/emission_factor/ver1/emission_factor_types', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  // 发布 索引 列表
  push_version_emission_factor_types({ context }) {
    let _params = {};

    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/emission_factor_update_type_version',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  // 发布 温室气体 列表
  push_version_emission_gas_types({ context }) {
    let _params = {};

    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/emission_greenhouse_gas_update_type_version',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  // 取得温室气体维护列表
  get_emission_greenhouse_gas_types({ type, context }) {
    let _params = {};
    if (type !== undefined) {
      _params['type'] = type;
    }

    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/emission_greenhouse_gas_types',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得排放因子数据列表
  get_emission_factor_data({
    emissionFactorDatabaseType,
    emissionFactorDatabaseName,
    emissionFactorDatabaseEdition,
    emissionFactorTypeId,
    emissionGreenhouseGasTypeIdList,
    emissionSource,
    emissionLink,
    dataType,
    emissionFactorType,
    dataSupplier,
    country,
    region,
    reference,
    pageNum,
    pageSize,
    sortObj,
    context
  }) {
    let _params = {};
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }
    if (emissionFactorDatabaseType !== undefined) {
      _params['emissionFactorDatabaseType'] = emissionFactorDatabaseType;
    }
    if (emissionFactorDatabaseName !== undefined) {
      _params['emissionFactorDatabaseName'] = emissionFactorDatabaseName;
    }
    if (emissionFactorDatabaseEdition !== undefined) {
      _params['emissionFactorDatabaseEdition'] = emissionFactorDatabaseEdition;
    }
    if (emissionLink && emissionLink.length) {
      _params['emissionLink'] = emissionLink[0];
    }
    _params['emissionFactorTypeId'] = emissionFactorTypeId;
    _params['emissionGreenhouseGasTypeIdList'] = emissionGreenhouseGasTypeIdList;
    _params['emissionSource'] = emissionSource;
    _params['dataType'] = dataType;
    _params['emissionFactorType'] = emissionFactorType;
    _params['dataSupplier'] = dataSupplier;
    _params['country'] = country;
    _params['region'] = region;
    _params['reference'] = reference;
    if (sortObj !== undefined) {
      _params['sortObj'] = sortObj;
    }
    // set argument into _params

    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/emission_factor/ver1/emission_factor_data', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得温室气体 分类选项
  get_greenhouse_gas_type_list_type_option({ context }) {
    let _params = {};

    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/get_emission_greenhouse_gas_type_list_type_option',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 新增温室气体种类
  add_emission_greenhouse_gas_types({ type, name, context }) {
    let _params = {};
    // set argument into _params
    _params['type'] = type;
    _params['name'] = name;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/emission_greenhouse_gas_types',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  // 编辑温室气体种类
  edit_emission_greenhouse_gas_types({ id, type, name, version, context }) {
    let _params = {};
    // set argument into _params
    _params['type'] = type;
    _params['name'] = name;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['gas_type_id'] = id;

    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/emission_greenhouse_gas_types/{gas_type_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  // 删除温室气体种类
  delete_emission_greenhouse_gas_types({ id, version, context }) {
    let _params = {};
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['gas_type_id'] = id;
    let _url = this._genCustomUrl(
      '/software_maintenance/emission_factor/ver1/emission_greenhouse_gas_types/{gas_type_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  // 取得数据供应商选项列表
  get_data_supplier_option({ context }) {
    let _params = {};

    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/emission_factor/ver1/get_data_supplier_option', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得国家选项列表
  get_data_country_option({ context }) {
    let _params = {};

    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/emission_factor/ver1/get_data_country_option', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 取得地区选项列表
  get_data_region_option({ context }) {
    let _params = {};

    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/emission_factor/ver1/get_data_region_option', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}

export class DictInfo {
  constructor() {
    this.id = 0; // 0 require
    this.typeCode = ''; // 1 require
    this.typeName = ''; // 2 require
    this.code = ''; // 3 require
    this.keyValue = ''; // 4 require
    this.codeName = ''; // 5 require
    this.description = ''; // 6 optional
    this.parentCode = ''; // 7 require
    this.parentCodeName = ''; // 8 optional
    this.version = 0; // 9 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

DictInfo.__json_class__ = 'BackboneSslc.DictInfo';

export class DictDetailU {
  constructor() {
    this.id = 0; // 0 require
    this.typeCode = ''; // 1 require
    this.typeName = ''; // 2 require
    this.code = ''; // 3 require
    this.keyValue = ''; // 4 require
    this.codeName = ''; // 5 optional
    this.description = ''; // 6 require
    this.parentCode = ''; // 7 optional
    this.parentCodeName = ''; // 8 optional
    this.version = 0; // 9 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

DictDetailU.__json_class__ = 'BackboneSslc.DictDetailU';

export class TypeCode {
  constructor() {
    this.id = 0; // 0 require
    this.typeCode = ''; // 1 require
    this.typeName = ''; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

TypeCode.__json_class__ = 'BackboneSslc.TypeCode';

export class DictCode {
  constructor() {
    this.id = 0; // 0 require
    this.code = ''; // 1 require
    this.keyValue = ''; // 2 require
    this.name = ''; // 3 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

DictCode.__json_class__ = 'BackboneSslc.DictCode';

export class DictCodeTree {
  constructor() {
    this.id = 0; // 0 require
    this.code = ''; // 1 require
    this.keyValue = ''; // 2 require
    this.name = ''; // 3 require
    this.list = []; // 4 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

DictCodeTree.__json_class__ = 'BackboneSslc.DictCodeTree';

// 数字字典管理接口类
export class DictInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'DictInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_dict_list({ typeCode, dictionaryKey, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (typeCode === undefined) {
      throw new RpcLogicValidationError('require argument "typeCode"');
    }
    if (dictionaryKey === undefined) {
      throw new RpcLogicValidationError('require argument "dictionaryKey"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['typeCode'] = typeCode;
    _params['dictionaryKey'] = dictionaryKey;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/dictionary/v1/dictionaries', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_dict_detail({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/dictionary/v1/dictionaries/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_dict({ typeCode, typeName, code, keyValue, parentCode, description, context }) {
    let _params = {};
    // check require
    if (typeCode === undefined) {
      throw new RpcLogicValidationError('require argument "typeCode"');
    }
    if (typeName === undefined) {
      throw new RpcLogicValidationError('require argument "typeName"');
    }
    if (code === undefined) {
      throw new RpcLogicValidationError('require argument "code"');
    }
    if (keyValue === undefined) {
      throw new RpcLogicValidationError('require argument "keyValue"');
    }
    if (parentCode === undefined) {
      throw new RpcLogicValidationError('require argument "parentCode"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['typeCode'] = typeCode;
    _params['typeName'] = typeName;
    _params['code'] = code;
    _params['keyValue'] = keyValue;
    _params['parentCode'] = parentCode;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/dictionary/v1/dictionaries', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  update_dict({
    p_id,
    id,
    typeCode,
    typeName,
    code,
    keyValue,
    codeName,
    description,
    parentCode,
    parentCodeName,
    version,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (typeCode === undefined) {
      throw new RpcLogicValidationError('require argument "typeCode"');
    }
    if (typeName === undefined) {
      throw new RpcLogicValidationError('require argument "typeName"');
    }
    if (code === undefined) {
      throw new RpcLogicValidationError('require argument "code"');
    }
    if (keyValue === undefined) {
      throw new RpcLogicValidationError('require argument "keyValue"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['typeCode'] = typeCode;
    _params['typeName'] = typeName;
    _params['code'] = code;
    _params['keyValue'] = keyValue;
    if (codeName !== undefined) {
      _params['codeName'] = codeName;
    }
    _params['description'] = description;
    if (parentCode !== undefined) {
      _params['parentCode'] = parentCode;
    }
    if (parentCodeName !== undefined) {
      _params['parentCodeName'] = parentCodeName;
    }
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/dictionary/v1/dictionaries/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_dict({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/dictionary/v1/dictionaries/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  get_all_type_code_list({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/dictionary/v1/get_all_type_code_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_data_dictionary_type_options({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('base/dictionary/v1/get_data_dictionary_type_options', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_all_code_list({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/dictionary/v1/get_all_code_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_code_list_by_code({ type_code, typeCode, context }) {
    let _params = {};
    // check require
    if (typeCode === undefined) {
      throw new RpcLogicValidationError('require argument "typeCode"');
    }

    // set argument into _params
    _params['typeCode'] = typeCode;
    // prepare url
    let customArgs = {};
    customArgs['type_code'] = type_code;
    let _url = this._genCustomUrl('/base/dictionary/v1/get_code_list/{type_code}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}

export class AreaBasic {
  constructor() {
    this.id = 0; // 0 require
    this.areaCode = ''; // 1 require
    this.areaName = ''; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

AreaBasic.__json_class__ = 'BackboneSslc.AreaBasic';

export class Area {
  constructor() {
    this.id = 0; // 0 require
    this.areaCode = ''; // 1 require
    this.areaName = ''; // 2 require
    this.parentAreaCode = ''; // 3 require
    this.parentAreaName = ''; // 4 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

Area.__json_class__ = 'BackboneSslc.Area';

export class AreaTree {
  constructor() {
    this.id = 0; // 0 require
    this.areaCode = ''; // 1 require
    this.areaName = ''; // 2 require
    this.parentAreaCode = ''; // 3 require
    this.parentAreaName = ''; // 4 require
    this.areaTree = []; // 5 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

AreaTree.__json_class__ = 'BackboneSslc.AreaTree';

export class AreaInfo {
  constructor() {
    this.id = 0; // 0 require
    this.areaCode = ''; // 1 require
    this.areaName = ''; // 2 require
    this.areaLevel = ''; // 3 require
    this.parentAreaCode = ''; // 4 require
    this.parentAreaName = ''; // 5 require
    this.version = 0; // 6 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

AreaInfo.__json_class__ = 'BackboneSslc.AreaInfo';

export class AreaDetailU {
  constructor() {
    this.id = 0; // 0 require
    this.areaCode = ''; // 1 require
    this.areaName = ''; // 2 require
    this.areaLevel = ''; // 3 require
    this.districtNo = ''; // 4 optional
    this.parentCityCode = ''; // 5 optional
    this.parentCityName = ''; // 6 optional
    this.parentProvinceCode = ''; // 7 optional
    this.parentProvinceName = ''; // 8 optional
    this.description = ''; // 9 require
    this.version = 0; // 10 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

AreaDetailU.__json_class__ = 'BackboneSslc.AreaDetailU';

export class CreateAreaIn {
  constructor() {
    this.areaName = ''; // 0 require
    this.areaLevel = ''; // 1 require
    this.districtNo = ''; // 2 optional
    this.parentCityCode = ''; // 3 optional
    this.parentProvinceCode = ''; // 4 optional
    this.description = ''; // 5 optional
  }

  dump() {
    return JSON.stringify(this);
  }
}

CreateAreaIn.__json_class__ = 'BackboneSslc.CreateAreaIn';

// 区域管理接口类
export class AreaInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'AreaInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_area_tree({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/area/v1/area_tree', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_areas({ id, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/area/v1/areas', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_area_detail({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/area/v1/areas/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_area({ areaName, areaLevel, districtNo, parentCityCode, parentProvinceCode, description, context }) {
    let _params = {};
    // check require
    if (areaName === undefined) {
      throw new RpcLogicValidationError('require argument "areaName"');
    }
    if (areaLevel === undefined) {
      throw new RpcLogicValidationError('require argument "areaLevel"');
    }

    // set argument into _params
    _params['areaName'] = areaName;
    _params['areaLevel'] = areaLevel;
    if (districtNo !== undefined) {
      _params['districtNo'] = districtNo;
    }
    if (parentCityCode !== undefined) {
      _params['parentCityCode'] = parentCityCode;
    }
    if (parentProvinceCode !== undefined) {
      _params['parentProvinceCode'] = parentProvinceCode;
    }
    if (description !== undefined) {
      _params['description'] = description;
    }
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/area/v1/areas', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  update_area({
    p_id,
    id,
    areaCode,
    areaName,
    areaLevel,
    districtNo,
    parentCityCode,
    parentCityName,
    parentProvinceCode,
    parentProvinceName,
    description,
    version,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (areaCode === undefined) {
      throw new RpcLogicValidationError('require argument "areaCode"');
    }
    if (areaName === undefined) {
      throw new RpcLogicValidationError('require argument "areaName"');
    }
    if (areaLevel === undefined) {
      throw new RpcLogicValidationError('require argument "areaLevel"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['areaCode'] = areaCode;
    _params['areaName'] = areaName;
    _params['areaLevel'] = areaLevel;
    if (districtNo !== undefined) {
      _params['districtNo'] = districtNo;
    }
    if (parentCityCode !== undefined) {
      _params['parentCityCode'] = parentCityCode;
    }
    if (parentCityName !== undefined) {
      _params['parentCityName'] = parentCityName;
    }
    if (parentProvinceCode !== undefined) {
      _params['parentProvinceCode'] = parentProvinceCode;
    }
    if (parentProvinceName !== undefined) {
      _params['parentProvinceName'] = parentProvinceName;
    }
    _params['description'] = description;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/area/v1/areas/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_area({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/area/v1/areas/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  get_all_province_list({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/area/v1/get_all_province_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_city_list_by_province({ parent_area_code, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['parent_area_code'] = parent_area_code;
    let _url = this._genCustomUrl('/base/area/v1/get_city_list_by_province/{parent_area_code}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_area_list_by_city({ parent_area_code, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['parent_area_code'] = parent_area_code;
    let _url = this._genCustomUrl('/base/area/v1/get_area_list_by_city/{parent_area_code}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}

// 能源能耗接口
export class EnergyInterApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackbonSslc', interfName = 'EnergyInter', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_energy_tree({ context }) {
    let _params = {};

    //  _params["searchKey"] = searchKey;
    let customArgs = {};

    let _url = this._genCustomUrl('base/energy/v1/tree', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_energy_consumption_typelist({ sortObj, field, orderBy, context }) {
    let _params = {};

    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (field === undefined) {
      throw new RpcLogicValidationError('require argument "field"');
    }
    if (orderBy === undefined) {
      throw new RpcLogicValidationError('require argument "orderBy"');
    }

    _params['sortObj'] = sortObj;
    _params['field'] = field;
    _params['orderBy'] = orderBy;

    let customArgs = {};

    let _url = this._genCustomUrl('base/energy/v1/energyConsumptionType/List', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  get_energy_consumption_subitemlist({ parentSubitemId, energyConsumptionTypeNo, parentTypeNo, context }) {
    let _params = {};

    _params['energyConsumptionTypeNo'] = energyConsumptionTypeNo;
    _params['parentTypeNo'] = parentTypeNo;
    _params['parentSubitemId'] = parentSubitemId;

    let customArgs = {};

    let _url = this._genCustomUrl('base/energy/v1/energyConsumptionSubitem/list', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  get_energy_collect_grouplist({ parentTypeNo, pageNum, pageSize, searchKey, sortObj, field, orderBy, context }) {
    let _params = {};
    _params['energyConsumptionTypeNo'] = parentTypeNo;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['searchKey'] = searchKey;
    _params['sortObj'] = sortObj;
    // _params["field"] = field;
    // _params["orderBy"] = orderBy;
    let customArgs = {};
    let _url = this._genCustomUrl('base/energy/v1/collectFunction/list', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  get_energy_collect_table({ pageNum, pageSize, searchKey, parentTypeNo, sortObj, context }) {
    let _params = {};
    _params['energyConsumptionTypeNo'] = parentTypeNo;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['searchKey'] = searchKey;
    _params['sortObj'] = sortObj;
    let customArgs = {};
    let _url = this._genCustomUrl('base/energy/v1/collectFunctionGroup/list', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  get_energy_collect_detail({ collectFunctionGroupId, collectFunctionNo, energyConsumptionTypeNo, context }) {
    let _params = {};
    _params['collectFunctionGroupId'] = collectFunctionGroupId;
    _params['collectFunctionNo'] = collectFunctionNo;
    _params['energyConsumptionTypeNo'] = energyConsumptionTypeNo;
    let customArgs = {};
    let _url = this._genCustomUrl('base/energy/v1/collectFunctionGroup/detail', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  lead_energy({ file, fileName, context }) {
    let _params = {};

    // if(file === undefined) {
    //     throw new RpcLogicValidationError('require argument "file"')
    // }
    _params['fileName'] = fileName;
    _params['file'] = file;
    let customArgs = {};

    let _url = this._genCustomUrl('base/energy/v1/upload', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  // 导出
  outer_energy({ context }) {
    let _params = {};
    let customArgs = {};
    let _url = this._genCustomUrl('base/energy/v1/export', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  //模板下载
  template({ context }) {
    let _params = {};
    let customArgs = {};
    let _url = this._genCustomUrl('base/energy/v1/template', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}

export class SoftwareService {
  constructor() {
    this.id = 0; // 0 require
    this.serviceNo = ''; // 1 require
    this.serviceName = ''; // 2 require
    this.indexUrl = ''; // 3 require
    this.moduleCounts = 0; // 4 require
    this.upShelfStatus = ''; // 5 require
    this.status = ''; // 6 require
    this.publisher = 0; // 7 require
    this.publisherName = ''; // 8 require
    this.updater = 0; // 9 require
    this.updateName = ''; // 10 require
    this.updateTime = null; // 11 require
    this.version = 0; // 12 require
    this.firstPublishFlag = ''; // 13 require
    this.description = ''; // 14 optional
  }

  dump() {
    return JSON.stringify(this);
  }
}

SoftwareService.__json_class__ = 'BackboneSslc.SoftwareService';

export class ServiceOptionItem {
  constructor() {
    this.id = 0; // 0 require
    this.serviceNo = ''; // 1 require
    this.serviceName = ''; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ServiceOptionItem.__json_class__ = 'BackboneSslc.ServiceOptionItem';

export class ModuleOptionItem {
  constructor() {
    this.id = 0; // 0 require
    this.moduleNo = ''; // 1 require
    this.moduleName = ''; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ModuleOptionItem.__json_class__ = 'BackboneSslc.ModuleOptionItem';

export class ServiceModuleOptionItem {
  constructor() {
    this.serviceId = 0; // 0 require
    this.serviceNo = ''; // 1 require
    this.serviceName = ''; // 2 require
    this.moduleId = 0; // 4 require
    this.moduleNo = ''; // 5 require
    this.moduleName = ''; // 6 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ServiceModuleOptionItem.__json_class__ = 'BackboneSslc.ServiceModuleOptionItem';

export class SoftwareStructure {
  constructor() {
    this.id = 0; // 0 require
    this.serviceNo = ''; // 1 require
    this.serviceName = ''; // 2 require
    this.serviceModules = []; // 3 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SoftwareStructure.__json_class__ = 'BackboneSslc.SoftwareStructure';

// 软件管理接口类
export class SoftwareServiceInterfApi extends BaseInterfApi {
  constructor(
    baseUrl,
    moduleName = 'BackboneSslc',
    interfName = 'SoftwareServiceInterf',
    token = 'anonymous',
    ...args
  ) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  software_services({ serviceKey, upShelfStatus, status, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (serviceKey === undefined) {
      throw new RpcLogicValidationError('require argument "serviceKey"');
    }
    if (upShelfStatus === undefined) {
      throw new RpcLogicValidationError('require argument "upShelfStatus"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['serviceKey'] = serviceKey;
    _params['upShelfStatus'] = upShelfStatus;
    _params['status'] = status;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/software_service/v1/software_services', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_software_service_detail({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/software_service/v1/software_services/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  add_software_service({ serviceNo, serviceName, indexUrl, description, context }) {
    let _params = {};
    // check require
    if (serviceNo === undefined) {
      throw new RpcLogicValidationError('require argument "serviceNo"');
    }
    if (serviceName === undefined) {
      throw new RpcLogicValidationError('require argument "serviceName"');
    }
    if (indexUrl === undefined) {
      throw new RpcLogicValidationError('require argument "indexUrl"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['serviceNo'] = serviceNo;
    _params['serviceName'] = serviceName;
    _params['indexUrl'] = indexUrl;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/software_service/v1/software_services', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  edit_software_service({ p_id, id, serviceNo, serviceName, indexUrl, description, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (serviceNo === undefined) {
      throw new RpcLogicValidationError('require argument "serviceNo"');
    }
    if (serviceName === undefined) {
      throw new RpcLogicValidationError('require argument "serviceName"');
    }
    if (indexUrl === undefined) {
      throw new RpcLogicValidationError('require argument "indexUrl"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['serviceNo'] = serviceNo;
    _params['serviceName'] = serviceName;
    _params['indexUrl'] = indexUrl;
    _params['description'] = description;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/software_service/v1/software_services/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_software_service({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/software_service/v1/software_services/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  upShelf_software_service({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/software_service/v1/up_shelf/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  downShelf_software_service({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/software_service/v1/down_shelf/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  get_software_service_option_list({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/software_service/v1/get_software_service_option_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_software_service_module_option_list({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl(
      '/base/software_service_module/v1/get_software_service_module_option_list/{id}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_software_service_module_option_list_by_no({ serviceNo, context }) {
    let _params = {};
    // check require
    if (serviceNo === undefined) {
      throw new RpcLogicValidationError('require argument "serviceNo"');
    }

    // set argument into _params
    _params['serviceNo'] = serviceNo;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/base/software_service_module/v1/get_software_service_module_option_list_by_no',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_software_service_and_module_option_list({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/base/software_feature_authority/v1/get_software_service_and_module_option_lists',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_order_software_structure({ orderSoftwareType, enterpriseId, context }) {
    let _params = {};
    // check require
    if (orderSoftwareType === undefined) {
      throw new RpcLogicValidationError('require argument "orderSoftwareType"');
    }
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }

    // set argument into _params
    _params['orderSoftwareType'] = orderSoftwareType;
    _params['enterpriseId'] = enterpriseId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/software_structure/v1/order_software_structure', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_orders({ id, orderType, companyId, orderStatus, companyName, createDate, pageNum, pageSize, context }) {
    // noqa E501
    let _params = {};
    // check require

    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }
    if (orderType === undefined) {
      throw new RpcLogicValidationError('require argument "orderType"');
    }
    if (orderStatus === undefined) {
      throw new RpcLogicValidationError('require argument "orderStatus"');
    }

    // set argument into _params

    if (id !== undefined) {
      _params['id'] = id;
    }
    if (companyName !== undefined) {
      _params['companyName'] = companyName;
    }
    if (createDate !== undefined) {
      _params['createDate'] = createDate;
    }

    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['orderStatus'] = orderStatus;
    _params['orderType'] = orderType;
    // _params['companyId'] = companyId;
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl('/software_maintenance/customermanage/ver1/get_customer_order_list/', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 获取订单详情
  get_order_detail({ customer_order_id, companyId, context }) {
    // noqa E501
    let _params = {};
    // check require

    if (companyId === undefined) {
      throw new RpcLogicValidationError('require argument "companyId"');
    }
    _params['companyId'] = companyId;

    // set argument into _params\
    // prepare url
    let customArgs = {};
    customArgs['customer_order_id'] = customer_order_id;
    let _url = this._genCustomUrl(
      '/software_maintenance/order/ver1/get_customer_order_manage_detail/{customer_order_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  // 订单修改
  edit_orider_comment({ comment, companyId, version, customer_order_id, context }) {
    ///software_maintenance/order/ver1/customer_order_comment/{customer_order_id}
    // noqa E501
    let _params = {};
    // check require
    if (comment === undefined) {
      throw new RpcLogicValidationError('require argument "comment"');
    }
    if (companyId === undefined) {
      throw new RpcLogicValidationError('require argument "companyId"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }
    _params['companyId'] = companyId;
    _params['comment'] = comment;
    _params['version'] = version;

    // set argument into _params\
    // prepare url
    let customArgs = {};
    customArgs['customer_order_id'] = customer_order_id;
    let _url = this._genCustomUrl(
      '/software_maintenance/order/ver1/customer_order_comment/{customer_order_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  // 订单确认支付
  pay_customer_orders({
    companyId,
    version,
    customer_order_id,
    wayToPay,
    orderPayAmount,
    payTime,
    payAccount,
    transactionNumber,
    orderActiveDayNumber,
    context
  }) {
    ///software_maintenance/order/ver1/customer_order_comment/{customer_order_id}
    // noqa E501
    let _params = {};
    // check require

    if (companyId === undefined) {
      throw new RpcLogicValidationError('require argument "companyId"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }
    _params['companyId'] = companyId;
    _params['version'] = version;
    _params['wayToPay'] = wayToPay;
    _params['orderPayAmount'] = orderPayAmount;
    _params['payTime'] = payTime;
    _params['transactionNumber'] = transactionNumber;
    _params['payAccount'] = payAccount;
    _params['orderActiveDayNumber'] = orderActiveDayNumber;

    // set argument into _params\
    // prepare url
    let customArgs = {};
    customArgs['customer_order_id'] = customer_order_id;
    let _url = this._genCustomUrl(
      '/software_maintenance/order/manage/ver1/transfer_pay_customer_orders/{customer_order_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  //订单变更
  customer_order_change({
    customerOrganizationId,
    customerOrderId,
    customTime,
    renewalFlag,
    orderType,
    wayToPay,
    orderPayAmount,
    payTime,
    payAccount,
    transactionNumber,
    orderChannel,
    context
  }) {
    ///software_maintenance/order/ver1/customer_order_comment/{customer_order_id}
    // noqa E501
    let _params = {};
    // check require

    if (customerOrderId === undefined) {
      throw new RpcLogicValidationError('require argument "customerOrderId"');
    }
    // if (customerOrganizationId === undefined) {
    //   throw new RpcLogicValidationError('require argument "customerOrganizationId"');
    // }
    if (orderType === undefined) {
      throw new RpcLogicValidationError('require argument "orderType"');
    }
    if (renewalFlag) {
      // renewalFlag为true ： 有效期
      _params['renewalFlag'] = '2';
      _params['orderActiveDayNumber'] = customTime;
    } else {
      // 续费年
      _params['renewalFlag'] = '1';
      _params['year'] = customTime;
    }

    _params['customerOrderId'] = customerOrderId;
    _params['customerOrganizationId'] = customerOrganizationId;
    _params['orderType'] = orderType;
    _params['wayToPay'] = wayToPay;
    _params['orderPayAmount'] = orderPayAmount;
    _params['payTime'] = payTime;
    _params['transactionNumber'] = transactionNumber;
    _params['payAccount'] = payAccount;
    _params['orderChannel'] = orderChannel;

    // set argument into _params\
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl('/software_maintenance/customermanage/ver1/customer_order_change/', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  //订单作废
  cancel_customer_order({ customer_order_id, companyId, version, context }) {
    let _params = {};
    // check require
    if (customer_order_id === undefined) {
      throw new RpcLogicValidationError('require argument "customer_order_id"');
    }
    if (companyId !== undefined) {
      _params['companyId'] = companyId;
    }
    if (version !== undefined) {
      _params['version'] = version;
    }
    // prepare url
    let customArgs = {};
    customArgs['customer_order_id'] = customer_order_id;
    let _url = this._genCustomUrl(
      '/software_maintenance/customermanage/ver1/cancel_customer_order/{customer_order_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  // 订单确认支付
  change_customer_orders({
    companyId,
    version,
    customerOrderId,
    wayToPay,
    orderPayAmount,
    payTime,
    payAccount,
    transactionNumber,
    context
  }) {
    ///software_maintenance/order/ver1/customer_order_comment/{customer_order_id}
    // noqa E501
    let _params = {};
    // check require

    if (companyId === undefined) {
      throw new RpcLogicValidationError('require argument "companyId"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }
    _params['customerOrderId'] = customerOrderId;
    _params['companyId'] = companyId;
    _params['version'] = version;
    _params['wayToPay'] = wayToPay;
    _params['orderPayAmount'] = orderPayAmount;
    _params['payTime'] = payTime;
    _params['transactionNumber'] = transactionNumber;
    _params['payAccount'] = payAccount;

    // set argument into _params\
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl('/software_maintenance/customermanage/ver1/customer_order_change/', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  // 新增客户临时订单
  customer_order_temporary_add({ companyName, days, context }) {
    // noqa E501
    let _params = {};
    // check require

    if (companyName === undefined) {
      throw new RpcLogicValidationError('require argument "companyName"');
    }

    if (days === undefined) {
      throw new RpcLogicValidationError('require argument "days"');
    }

    // set argument into _params
    _params['companyName'] = companyName;
    _params['days'] = days;

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/software_maintenance/customermanage/ver1/customer_order_temporary_add/',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  put_offline_payment_order({ customerOrderId, version, context }) {
    let _params = {};
    // check require
    if (customerOrderId === undefined) {
      throw new RpcLogicValidationError('require argument "customerOrderId"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    _params['customerOrderId'] = customerOrderId;
    _params['version'] = version;

    // set argument into _params\
    // prepare url
    let customArgs = {};
    customArgs['customerOrderId'] = customerOrderId;
    let _url = this._genCustomUrl(
      '/software_maintenance/order/ver1/transfer_pay_customer_orders/{customerOrderId}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  // 修改订单价格
  edit_order_pay_amount({ orderPayAmount, customerOrderId, companyId, version, context }) {
    let _params = {};
    // check require
    if (orderPayAmount === undefined) {
      throw new RpcLogicValidationError('require argument "orderPayAmount"');
    }
    if (customerOrderId === undefined) {
      throw new RpcLogicValidationError('require argument "customerOrderId"');
    }
    if (companyId === undefined) {
      throw new RpcLogicValidationError('require argument "companyId"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    _params['orderPayAmount'] = orderPayAmount;
    _params['companyId'] = companyId;
    _params['version'] = version;

    // set argument into _params\
    // prepare url
    let customArgs = {};
    customArgs['customerOrderId'] = customerOrderId;
    let _url = this._genCustomUrl(
      '/software_maintenance/order/ver1/customer_order_pay_amount/{customerOrderId}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  // 获取渠道列表
  get_order_channel_list({ customerOrderId, context }) {
    let _params = {};
    // check require
    if (customerOrderId === undefined) {
      throw new RpcLogicValidationError('require argument "customerOrderId"');
    }

    // set argument into _params\
    // prepare url
    let customArgs = {};
    customArgs['customerOrderId'] = customerOrderId;
    let _url = this._genCustomUrl(
      '/software_maintenance/order/manage/ver1/get_order_channel_list/{customerOrderId}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}

export class SoftwareServiceModule {
  constructor() {
    this.id = 0; // 0 require
    this.moduleNo = ''; // 1 require
    this.moduleName = ''; // 2 require
    this.serviceId = 0; // 3 require
    this.serviceNo = ''; // 4 require
    this.serviceName = ''; // 5 require
    this.upShelfStatus = ''; // 6 require
    this.status = ''; // 7 require
    this.publisher = 0; // 8 require
    this.publisherName = ''; // 9 require
    this.publishTime = null; // 10 require
    this.updater = 0; // 11 require
    this.updateName = ''; // 12 require
    this.updateTime = null; // 13 require
    this.version = 0; // 14 require
    this.firstPublishFlag = ''; // 15 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SoftwareServiceModule.__json_class__ = 'BackboneSslc.SoftwareServiceModule';

export class SoftwareServiceModuleDetail {
  constructor() {
    this.id = 0; // 0 require
    this.moduleNo = ''; // 1 require
    this.moduleName = ''; // 2 require
    this.serviceId = 0; // 3 require
    this.serviceNo = ''; // 4 require
    this.serviceName = ''; // 5 require
    this.moduleCost = 0; // 6 require
    this.moduleAccounts = 0; // 7 require
    this.moduleLogo = 0; // 8 require
    this.upShelfStatus = ''; // 9 require
    this.status = ''; // 10 require
    this.appId = ''; // 11 require
    this.secretKey = ''; // 12 require
    this.version = 0; // 13 require
    this.firstPublishFlag = ''; // 14 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SoftwareServiceModuleDetail.__json_class__ = 'BackboneSslc.SoftwareServiceModuleDetail';

// 软件服务管理接口类
export class softwareServiceModuleInterfApi extends BaseInterfApi {
  constructor(
    baseUrl,
    moduleName = 'BackboneSslc',
    interfName = 'softwareServiceModuleInterf',
    token = 'anonymous',
    ...args
  ) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  softare_service_modules({ serviceId, moduleKey, upShelfStatus, status, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (serviceId === undefined) {
      throw new RpcLogicValidationError('require argument "serviceId"');
    }
    if (moduleKey === undefined) {
      throw new RpcLogicValidationError('require argument "moduleKey"');
    }
    if (upShelfStatus === undefined) {
      throw new RpcLogicValidationError('require argument "upShelfStatus"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['serviceId'] = serviceId;
    _params['moduleKey'] = moduleKey;
    _params['upShelfStatus'] = upShelfStatus;
    _params['status'] = status;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/software_service_module/v1/software_service_modules', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_software_service_module_detail({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/software_service_module/v1/software_service_modules/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_software_service_module_detail_by_no({ moduleNo, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['moduleNo'] = moduleNo;
    let _url = this._genCustomUrl(
      '/base/software_service_module/v1/software_service_modules/get_detail_by_no/{moduleNo}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  upload_brand_logo({ moduleLogoFile, context }) {
    let _params = {};
    // check require
    if (moduleLogoFile === undefined) {
      throw new RpcLogicValidationError('require argument "moduleLogoFile"');
    }

    // set argument into _params
    _params['moduleLogoFile'] = moduleLogoFile;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/file/v1/upload_brand_logo', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  add_software_service_module({
    serviceId,
    moduleName,
    moduleCost,
    moduleAccounts,
    moduleLogo,
    appId,
    secretKey,
    description,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (serviceId === undefined) {
      throw new RpcLogicValidationError('require argument "serviceId"');
    }
    if (moduleName === undefined) {
      throw new RpcLogicValidationError('require argument "moduleName"');
    }
    if (moduleCost === undefined) {
      throw new RpcLogicValidationError('require argument "moduleCost"');
    }
    if (moduleAccounts === undefined) {
      throw new RpcLogicValidationError('require argument "moduleAccounts"');
    }
    if (moduleLogo === undefined) {
      throw new RpcLogicValidationError('require argument "moduleLogo"');
    }
    if (appId === undefined) {
      throw new RpcLogicValidationError('require argument "appId"');
    }
    if (secretKey === undefined) {
      throw new RpcLogicValidationError('require argument "secretKey"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['serviceId'] = serviceId;
    _params['moduleName'] = moduleName;
    _params['moduleCost'] = moduleCost;
    _params['moduleAccounts'] = moduleAccounts;
    _params['moduleLogo'] = moduleLogo;
    _params['appId'] = appId;
    _params['secretKey'] = secretKey;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/software_service_module/v1/software_service_modules', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  edit_software_service_module({
    p_id,
    id,
    serviceId,
    moduleName,
    moduleCost,
    moduleAccounts,
    moduleLogo,
    appId,
    secretKey,
    description,
    version,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (serviceId === undefined) {
      throw new RpcLogicValidationError('require argument "serviceId"');
    }
    if (moduleName === undefined) {
      throw new RpcLogicValidationError('require argument "moduleName"');
    }
    if (moduleCost === undefined) {
      throw new RpcLogicValidationError('require argument "moduleCost"');
    }
    if (moduleAccounts === undefined) {
      throw new RpcLogicValidationError('require argument "moduleAccounts"');
    }
    if (moduleLogo === undefined) {
      throw new RpcLogicValidationError('require argument "moduleLogo"');
    }
    if (appId === undefined) {
      throw new RpcLogicValidationError('require argument "appId"');
    }
    if (secretKey === undefined) {
      throw new RpcLogicValidationError('require argument "secretKey"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['serviceId'] = serviceId;
    _params['moduleName'] = moduleName;
    _params['moduleCost'] = moduleCost;
    _params['moduleAccounts'] = moduleAccounts;
    _params['moduleLogo'] = moduleLogo;
    _params['appId'] = appId;
    _params['secretKey'] = secretKey;
    _params['description'] = description;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/software_service_module/v1/software_service_modules/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_software_service_module({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/software_service_module/v1/software_service_modules/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  upShelf_software_service_module({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/software_service_module/v1/up_shelf/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  downShelf_software_service_module({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/software_service_module/v1/down_shelf/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }
}

export class SoftwareModuleFeature {
  constructor() {
    this.id = 0; // 0 require
    this.serviceId = 0; // 1 require
    this.serviceModuleId = 0; // 2 require
    this.serviceName = ''; // 3 require
    this.moduleNo = ''; // 4 require
    this.moduleName = ''; // 5 require
    this.functionNo = ''; // 6 require
    this.functionName = ''; // 8 require
    this.sequenceIndex = 0; // 9 require
    this.status = ''; // 10 require
    this.publisher = 0; // 11 require
    this.publisherName = ''; // 12 require
    this.publishTime = null; // 13 require
    this.updater = 0; // 14 require
    this.updateName = ''; // 15 require
    this.updateTime = 0; // 16 require
    this.version = 0; // 17 require
    this.firstPublishFlag = ''; // 18 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SoftwareModuleFeature.__json_class__ = 'BackboneSslc.SoftwareModuleFeature';

export class FeatureAuthorityItem {
  constructor() {
    this.id = 0; // 0 require
    this.authorityNo = ''; // 1 require
    this.authorityName = ''; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

FeatureAuthorityItem.__json_class__ = 'BackboneSslc.FeatureAuthorityItem';

export class FeatureItem {
  constructor() {
    this.id = 0; // 0 require
    this.functionNo = ''; // 1 require
    this.functionName = ''; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

FeatureItem.__json_class__ = 'BackboneSslc.FeatureItem';

// 软件模块管理接口类
export class SoftwareModuleFeatureInterfApi extends BaseInterfApi {
  constructor(
    baseUrl,
    moduleName = 'BackboneSslc',
    interfName = 'SoftwareModuleFeatureInterf',
    token = 'anonymous',
    ...args
  ) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  software_module_features({ serviceId, serviceModuleId, functionKey, status, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (serviceId === undefined) {
      throw new RpcLogicValidationError('require argument "serviceId"');
    }
    if (serviceModuleId === undefined) {
      throw new RpcLogicValidationError('require argument "serviceModuleId"');
    }
    if (functionKey === undefined) {
      throw new RpcLogicValidationError('require argument "functionKey"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['serviceId'] = serviceId;
    _params['serviceModuleId'] = serviceModuleId;
    _params['functionKey'] = functionKey;
    _params['status'] = status;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/software_module_feature/v1/software_module_features', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_software_module_feature_detail({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/software_module_feature/v1/software_module_features/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  add_software_module_feature({ serviceId, serviceModuleId, sequenceIndex, functionName, description, context }) {
    let _params = {};
    // check require
    if (serviceId === undefined) {
      throw new RpcLogicValidationError('require argument "serviceId"');
    }
    if (serviceModuleId === undefined) {
      throw new RpcLogicValidationError('require argument "serviceModuleId"');
    }
    if (sequenceIndex === undefined) {
      throw new RpcLogicValidationError('require argument "sequenceIndex"');
    }
    if (functionName === undefined) {
      throw new RpcLogicValidationError('require argument "functionName"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['serviceId'] = serviceId;
    _params['serviceModuleId'] = serviceModuleId;
    _params['sequenceIndex'] = sequenceIndex;
    _params['functionName'] = functionName;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/software_module_feature/v1/software_module_features', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  edit_software_module_feature({
    p_id,
    id,
    serviceId,
    serviceModuleId,
    sequenceIndex,
    functionName,
    description,
    version,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (serviceId === undefined) {
      throw new RpcLogicValidationError('require argument "serviceId"');
    }
    if (serviceModuleId === undefined) {
      throw new RpcLogicValidationError('require argument "serviceModuleId"');
    }
    if (sequenceIndex === undefined) {
      throw new RpcLogicValidationError('require argument "sequenceIndex"');
    }
    if (functionName === undefined) {
      throw new RpcLogicValidationError('require argument "functionName"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['serviceId'] = serviceId;
    _params['serviceModuleId'] = serviceModuleId;
    _params['sequenceIndex'] = sequenceIndex;
    _params['functionName'] = functionName;
    _params['description'] = description;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/software_module_feature/v1/software_module_features/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_software_module_feature({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/software_module_feature/v1/software_module_features/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  get_feature_authorities({ moduleFunctionId, context }) {
    let _params = {};
    // check require
    if (moduleFunctionId === undefined) {
      throw new RpcLogicValidationError('require argument "moduleFunctionId"');
    }

    // set argument into _params
    _params['moduleFunctionId'] = moduleFunctionId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/software_module_feature/v1/get_feature_authorities', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_module_feature_authorities({ serviceId, serviceModuleId, context }) {
    let _params = {};
    // check require
    if (serviceId === undefined) {
      throw new RpcLogicValidationError('require argument "serviceId"');
    }
    if (serviceModuleId === undefined) {
      throw new RpcLogicValidationError('require argument "serviceModuleId"');
    }

    // set argument into _params
    _params['serviceId'] = serviceId;
    _params['serviceModuleId'] = serviceModuleId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/base/software_module_feature/v1/get_software_module_feature_authorities',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  set_module_feature_authorities({ moduleFunctionId, authoritys, context }) {
    let _params = {};
    // check require
    if (moduleFunctionId === undefined) {
      throw new RpcLogicValidationError('require argument "moduleFunctionId"');
    }
    if (authoritys === undefined) {
      throw new RpcLogicValidationError('require argument "authoritys"');
    }

    // set argument into _params
    _params['moduleFunctionId'] = moduleFunctionId;
    _params['authoritys'] = authoritys;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/base/software_module_feature/v1/set_software_module_feature_authorities',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  get_feature_option_list({ service_module_no, serviceModuleNo, context }) {
    let _params = {};
    // check require
    if (serviceModuleNo === undefined) {
      throw new RpcLogicValidationError('require argument "serviceModuleNo"');
    }

    // set argument into _params
    _params['serviceModuleNo'] = serviceModuleNo;
    // prepare url
    let customArgs = {};
    customArgs['service_module_no'] = service_module_no;
    let _url = this._genCustomUrl(
      '/base/software_module_feature/v1/get_software_module_feature_option_list_by_service_module_id/{service_module_no}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}

export class AuthorityItem {
  constructor() {
    this.id = 0; // 0 require
    this.authorityNo = ''; // 1 require
    this.authorityName = ''; // 2 require
    this.terminalType = ''; // 3 require
    this.sequenceIndex = 0; // 4 require
    this.status = ''; // 5 require
    this.updateName = ''; // 6 require
    this.updateTime = null; // 7 require
    this.publisherName = ''; // 8 require
    this.publishTime = null; // 9 require
    this.updater = 0; // 10 require
    this.updateName = ''; // 11 require
    this.updateTime = null; // 12 require
    this.version = 0; // 13 require
    this.firstPublishFlag = ''; // 14 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

AuthorityItem.__json_class__ = 'BackboneSslc.AuthorityItem';

export class SubModuleItem {
  constructor() {
    this.serviceId = 0; // 0 require
    this.serviceModuleId = 0; // 1 require
    this.serviceName = ''; // 2 require
    this.moduleName = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SubModuleItem.__json_class__ = 'BackboneSslc.SubModuleItem';

export class FeatureAuthorityDetail {
  constructor() {
    this.id = 0; // 0 require
    this.serviceNo = ''; // 1 require
    this.serviceName = ''; // 2 require
    this.moduleNo = ''; // 3 require
    this.moduleName = ''; // 4 require
    this.authorityNo = ''; // 5 require
    this.authorityName = ''; // 6 require
    this.terminalType = ''; // 7 require
    this.visitUrl = ''; // 8 require
    this.visitWay = ''; // 9 require
    this.sequenceIndex = 0; // 10 require
    this.subordinateList = []; // 11 require
    this.customerAdminFlg = ''; // 12 require
    this.status = ''; // 13 require
    this.description = ''; // 14 require
    this.version = 0; // 15 require
    this.functionList = []; // 16 require
    this.publisher = 0; // 17 require
    this.publisherName = ''; // 18 require
    this.publishTime = null; // 19 require
    this.firstPublishFlag = ''; // 20 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

FeatureAuthorityDetail.__json_class__ = 'BackboneSslc.FeatureAuthorityDetail';

export class OutSubModuleItem {
  constructor() {
    this.serviceId = 0; // 0 require
    this.serviceName = ''; // 1 require
    this.serviceModuleId = 0; // 2 require
    this.serviceModuleName = ''; // 3 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

OutSubModuleItem.__json_class__ = 'BackboneSslc.OutSubModuleItem';

export class FeatureAuthorityIn {
  constructor() {
    this.authorityName = ''; // 1 require
    this.terminalType = ''; // 2 require
    this.visitUrl = ''; // 3 require
    this.sequenceIndex = 0; // 4 require
    this.subordinateList = []; // 5 require
    this.description = ''; // 6 require
    this.functionList = []; // 7 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

FeatureAuthorityIn.__json_class__ = 'BackboneSslc.FeatureAuthorityIn';

export class FeatureAuthority {
  constructor() {
    this.id = 0; // 0 require
    this.authorityNo = ''; // 5 require
    this.authorityName = ''; // 6 require
    this.terminalType = ''; // 7 require
    this.visitUrl = ''; // 8 require
    this.visitWay = ''; // 9 require
    this.sequenceIndex = 0; // 10 require
    this.subordinateList = []; // 11 require
    this.customerAdminFlg = ''; // 12 require
    this.description = ''; // 14 require
    this.version = 0; // 15 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

FeatureAuthority.__json_class__ = 'BackboneSslc.FeatureAuthority';

// 软件职权管理接口类
export class AuthorityInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'AuthorityInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  software_feature_authorities({
    serviceId,
    serviceModuleId,
    moduleFunctionId,
    authorityKey,
    status,
    sortObj,
    pageNum,
    pageSize,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (serviceId === undefined) {
      throw new RpcLogicValidationError('require argument "serviceId"');
    }
    if (serviceModuleId === undefined) {
      throw new RpcLogicValidationError('require argument "serviceModuleId"');
    }
    if (moduleFunctionId === undefined) {
      throw new RpcLogicValidationError('require argument "moduleFunctionId"');
    }
    if (authorityKey === undefined) {
      throw new RpcLogicValidationError('require argument "authorityKey"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['serviceId'] = serviceId;
    _params['serviceModuleId'] = serviceModuleId;
    _params['moduleFunctionId'] = moduleFunctionId;
    _params['authorityKey'] = authorityKey;
    _params['status'] = status;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/software_feature_authority/v1/software_feature_authorities', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_software_feature_authority_detail({ p_id, id, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }

    // set argument into _params
    _params['id'] = id;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl(
      '/base/software_feature_authority/v1/software_feature_authorities/{p_id}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  add_software_feature_authority({
    authorityName,
    terminalType,
    visitUrl,
    sequenceIndex,
    subordinateList,
    description,
    functionList,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (authorityName === undefined) {
      throw new RpcLogicValidationError('require argument "authorityName"');
    }
    if (terminalType === undefined) {
      throw new RpcLogicValidationError('require argument "terminalType"');
    }
    if (visitUrl === undefined) {
      throw new RpcLogicValidationError('require argument "visitUrl"');
    }
    if (sequenceIndex === undefined) {
      throw new RpcLogicValidationError('require argument "sequenceIndex"');
    }
    if (subordinateList === undefined) {
      throw new RpcLogicValidationError('require argument "subordinateList"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (functionList === undefined) {
      throw new RpcLogicValidationError('require argument "functionList"');
    }

    // set argument into _params
    _params['authorityName'] = authorityName;
    _params['terminalType'] = terminalType;
    _params['visitUrl'] = visitUrl;
    _params['sequenceIndex'] = sequenceIndex;
    _params['subordinateList'] = subordinateList;
    _params['description'] = description;
    _params['functionList'] = functionList;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/software_feature_authority/v1/software_feature_authorities', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  edit_software_feature_authority({
    p_id,
    id,
    version,
    authorityName,
    terminalType,
    visitUrl,
    sequenceIndex,
    subordinateList,
    description,
    functionList,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }
    if (authorityName === undefined) {
      throw new RpcLogicValidationError('require argument "authorityName"');
    }
    if (terminalType === undefined) {
      throw new RpcLogicValidationError('require argument "terminalType"');
    }
    if (visitUrl === undefined) {
      throw new RpcLogicValidationError('require argument "visitUrl"');
    }
    if (sequenceIndex === undefined) {
      throw new RpcLogicValidationError('require argument "sequenceIndex"');
    }
    if (subordinateList === undefined) {
      throw new RpcLogicValidationError('require argument "subordinateList"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (functionList === undefined) {
      throw new RpcLogicValidationError('require argument "functionList"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    _params['authorityName'] = authorityName;
    _params['terminalType'] = terminalType;
    _params['visitUrl'] = visitUrl;
    _params['sequenceIndex'] = sequenceIndex;
    _params['subordinateList'] = subordinateList;
    _params['description'] = description;
    _params['functionList'] = functionList;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl(
      '/base/software_feature_authority/v1/software_feature_authorities/{p_id}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_software_feature_authority({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl(
      '/base/software_feature_authority/v1/software_feature_authorities/{p_id}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  get_software_service_module_function_option_list({ service_module_id, serviceModuleId, context }) {
    let _params = {};
    // check require
    if (serviceModuleId === undefined) {
      throw new RpcLogicValidationError('require argument "serviceModuleId"');
    }

    // set argument into _params
    _params['serviceModuleId'] = serviceModuleId;
    // prepare url
    let customArgs = {};
    customArgs['service_module_id'] = service_module_id;
    let _url = this._genCustomUrl(
      '/base/software_feature_authority/v1/get_software_service_mf_option_list/{service_module_id}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}

export class SslcService {
  constructor() {
    this.id = 0; // 0 require
    this.serveName = ''; // 1 require
    this.upShelfStatus = ''; // 2 require
    this.htmlUrl = ''; // 3 require
    this.sortIdex = 0; // 4 require
    this.status = ''; // 5 require
    this.updateName = ''; // 6 require
    this.updateTime = null; // 7 require
    this.firstPublishFlag = ''; // 8 require
    this.version = 0; // 9 require
    this.description = ''; // 10 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SslcService.__json_class__ = 'BackboneSslc.SslcService';

// 上实龙创管理接口类
export class SslcServiceInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'SslcServiceInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_longchuang_services({ serveName, upShelfStatus, status, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (serveName === undefined) {
      throw new RpcLogicValidationError('require argument "serveName"');
    }
    if (upShelfStatus === undefined) {
      throw new RpcLogicValidationError('require argument "upShelfStatus"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['serveName'] = serveName;
    _params['upShelfStatus'] = upShelfStatus;
    _params['status'] = status;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/longchuang_service/v1/longchuang_services', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_longchuang_service_detail({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/longchuang_service/v1/longchuang_services/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  add_longchuang_service({ serveName, htmlUrl, sortIndex, status, description, context }) {
    let _params = {};
    // check require
    if (serveName === undefined) {
      throw new RpcLogicValidationError('require argument "serveName"');
    }
    if (htmlUrl === undefined) {
      throw new RpcLogicValidationError('require argument "htmlUrl"');
    }
    if (sortIndex === undefined) {
      throw new RpcLogicValidationError('require argument "sortIndex"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['serveName'] = serveName;
    _params['htmlUrl'] = htmlUrl;
    _params['sortIndex'] = sortIndex;
    _params['status'] = status;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/longchuang_service/v1/longchuang_services', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  edit_longchuang_service({ p_id, id, serveName, htmlUrl, sortIndex, status, description, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (serveName === undefined) {
      throw new RpcLogicValidationError('require argument "serveName"');
    }
    if (htmlUrl === undefined) {
      throw new RpcLogicValidationError('require argument "htmlUrl"');
    }
    if (sortIndex === undefined) {
      throw new RpcLogicValidationError('require argument "sortIndex"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['serveName'] = serveName;
    _params['htmlUrl'] = htmlUrl;
    _params['sortIndex'] = sortIndex;
    _params['status'] = status;
    _params['description'] = description;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/longchuang_service/v1/longchuang_services/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_longchuang_service({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/longchuang_service/v1/longchuang_services/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  upShelf_longchuang_service({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/longchuang_service/v1/up_shelf/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  downShelf_longchuang_service({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/longchuang_service/v1/down_shelf/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }
}

export class BrandInfo {
  constructor() {
    this.id = 0; // 0 require
    this.brandName = ''; // 1 require
    this.upShelfStatus = ''; // 2 require
    this.updateTime = ''; // 3 require
    this.updateName = ''; // 4 require
    this.status = ''; // 5 require
    this.version = 0; // 6 require
    this.firstPublishFlag = ''; // 7 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

BrandInfo.__json_class__ = 'BackboneSslc.BrandInfo';

export class Series {
  constructor() {
    this.id = 0; // 0 require
    this.brandName = ''; // 1 require
    this.seriesNo = ''; // 2 require
    this.seriesName = ''; // 3 require
    this.upShelfStatus = ''; // 4 require
    this.status = ''; // 5 require
    this.updateName = ''; // 6 require
    this.updateTime = ''; // 7 require
    this.version = 0; // 8 require
    this.firstPublishFlag = ''; // 9 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

Series.__json_class__ = 'BackboneSslc.Series';

export class SeriesId {
  constructor() {
    this.id = 0; // 0 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SeriesId.__json_class__ = 'BackboneSslc.SeriesId';

export class SeriesDetail {
  constructor() {
    this.id = 0; // 0 require
    this.brandId = 0; // 1 require
    this.brandName = ''; // 2 require
    this.seriesNo = ''; // 3 require
    this.seriesName = ''; // 4 require
    this.upShelfStatus = ''; // 5 require
    this.status = ''; // 6 require
    this.description = ''; // 7 require
    this.version = 0; // 8 require
    this.firstPublishFlag = ''; // 9 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SeriesDetail.__json_class__ = 'BackboneSslc.SeriesDetail';

export class ProductInfo {
  constructor() {
    this.id = 0; // 0 require
    this.seriesId = 0; // 1 require
    this.seriesNo = ''; // 2 require
    this.seriesName = ''; // 3 require
    this.productNo = ''; // 4 require
    this.productName = ''; // 5 require
    this.upShelfStatus = ''; // 6 require
    this.status = ''; // 7 require
    this.updateName = ''; // 8 require
    this.updateTime = ''; // 9 require
    this.version = 0; // 10 require
    this.firstPublishFlag = ''; // 11 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ProductInfo.__json_class__ = 'BackboneSslc.ProductInfo';

export class ProductDetail {
  constructor() {
    this.id = 0; // 0 require
    this.brandId = 0; // 1 require
    this.seriesId = 0; // 2 require
    this.seriesName = ''; // 3 require
    this.productNo = ''; // 4 require
    this.productName = ''; // 5 require
    this.downloadFormat = ''; // 6 require
    this.aliyunFlag = ''; // 7 require
    this.productUniqueFlag = ''; // 8 require
    this.upShelfStatus = ''; // 9 require
    this.status = ''; // 10 require
    this.description = ''; // 11 require
    this.version = 0; // 12 require
    this.firstPublishFlag = ''; // 13 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ProductDetail.__json_class__ = 'BackboneSslc.ProductDetail';

export class ModelInfo {
  constructor() {
    this.id = 0; // 0 require
    this.productId = 0; // 1 require
    this.productName = ''; // 2 require
    this.modelNo = ''; // 3 require
    this.modelName = ''; // 4 require
    this.price = ''; // 5 require
    this.upShelfStatus = ''; // 6 require
    this.status = ''; // 7 require
    this.updateName = ''; // 8 require
    this.updateTime = ''; // 9 require
    this.version = 0; // 10 require
    this.firstPublishFlag = ''; // 11 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ModelInfo.__json_class__ = 'BackboneSslc.ModelInfo';

export class Channel {
  constructor() {
    this.id = 0; // 0 optional
    this.channelCode = ''; // 1 require
    this.channelKeyValue = ''; // 2 require
    this.name = ''; // 3 require
    this.knxFlag = ''; // 4 require
    this.maxConnection = 0; // 5 require
    this.outNetFlag = ''; // 6 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

Channel.__json_class__ = 'BackboneSslc.Channel';

export class Protocl {
  constructor() {
    this.id = ''; // 0 require
    this.protoclName = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

Protocl.__json_class__ = 'BackboneSslc.Protocl';

export class ModelDetail {
  constructor() {
    this.id = 0; // 0 require
    this.brandId = 0; // 1 require
    this.productId = 0; // 2 require
    this.seriesId = 0; // 3 require
    this.productName = ''; // 4 require
    this.modelNo = ''; // 5 require
    this.modelName = ''; // 6 require
    this.orderNumber = ''; // 7 require
    this.channelList = []; // 8 require
    this.price = ''; // 9 require
    this.maxDotsNum = 0; // 10 require
    this.frameIntervalMin = 0; // 11 require
    this.frameIntervalMax = 0; // 12 require
    this.protocls = []; // 13 require
    this.modelPicture = 0; // 14 require
    this.label1 = ''; // 15 require
    this.modelPicture2 = 0; // 16 require
    this.label2 = ''; // 17 require
    this.modelPicture3 = 0; // 18 require
    this.label3 = ''; // 19 require
    this.modelPicture4 = 0; // 20 require
    this.label4 = ''; // 21 require
    this.modelPicture5 = 0; // 22 require
    this.label5 = ''; // 23 require
    this.datum1 = 0; // 24 require
    this.datum2 = 0; // 25 require
    this.datum3 = 0; // 26 require
    this.datum4 = 0; // 27 require
    this.datum5 = 0; // 28 require
    this.description = ''; // 29 require
    this.version = 0; // 30 require
    this.firstPublishFlag = ''; // 31 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ModelDetail.__json_class__ = 'BackboneSslc.ModelDetail';

export class ModelDetailCU {
  constructor() {
    this.id = 0; // 0 optional
    this.productId = 0; // 1 require
    this.modelNo = ''; // 2 require
    this.modelName = ''; // 3 require
    this.orderNumber = ''; // 4 require
    this.channelList = []; // 5 require
    this.price = ''; // 6 require
    this.maxDotsNum = 0; // 7 require
    this.frameIntervalMin = 0; // 8 require
    this.frameIntervalMax = 0; // 9 require
    this.protocls = []; // 10 require
    this.modelPicture = 0; // 11 optional
    this.label1 = ''; // 12 optional
    this.modelPicture2 = 0; // 13 optional
    this.label2 = ''; // 14 optional
    this.modelPicture3 = 0; // 15 optional
    this.label3 = ''; // 16 optional
    this.modelPicture4 = 0; // 17 optional
    this.label4 = ''; // 18 optional
    this.modelPicture5 = 0; // 19 optional
    this.label5 = ''; // 20 optional
    this.datum1 = 0; // 21 optional
    this.datum2 = 0; // 22 optional
    this.datum3 = 0; // 23 optional
    this.datum4 = 0; // 24 optional
    this.datum5 = 0; // 25 optional
    this.status = ''; // 26 optional
    this.description = ''; // 27 optional
    this.version = 0; // 28 optional
  }

  dump() {
    return JSON.stringify(this);
  }
}

ModelDetailCU.__json_class__ = 'BackboneSslc.ModelDetailCU';

export class FirmwareInfo {
  constructor() {
    this.id = 0; // 0 require
    this.modelName = ''; // 1 require
    this.firmwareName = ''; // 2 require
    this.upShelfStatus = ''; // 3 require
    this.updateTime = ''; // 4 require
    this.updateName = ''; // 5 require
    this.status = ''; // 6 require
    this.version = 0; // 7 require
    this.firstPublishFlag = ''; // 8 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

FirmwareInfo.__json_class__ = 'BackboneSslc.FirmwareInfo';

export class FirmwareDetail {
  constructor() {
    this.id = 0; // 0 require
    this.productName = ''; // 0 require
    this.modelName = ''; // 0 require
    this.firmwareName = ''; // 0 require
    this.downloadUrl = ''; // 0 require
    this.compatibleFirmware = []; // 0 require
    this.reissueFlag = ''; // 0 require
    this.description = ''; // 0 require
    this.firstPublishFlag = ''; // 0 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

FirmwareDetail.__json_class__ = 'BackboneSslc.FirmwareDetail';

export class BrandName {
  constructor() {
    this.id = 0; // 0 require
    this.brandName = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

BrandName.__json_class__ = 'BackboneSslc.BrandName';

export class SeriesName {
  constructor() {
    this.id = 0; // 0 require
    this.seriesName = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SeriesName.__json_class__ = 'BackboneSslc.SeriesName';

export class SeriesName2 {
  constructor() {
    this.seriesId = 0; // 0 require
    this.seriesName = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SeriesName2.__json_class__ = 'BackboneSslc.SeriesName2';

export class SeriesOption {
  constructor() {
    this.brandId = 0; // 0 require
    this.brandName = ''; // 1 require
    this.seriesList = []; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SeriesOption.__json_class__ = 'BackboneSslc.SeriesOption';

export class ProductName {
  constructor() {
    this.id = 0; // 0 require
    this.productName = ''; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ProductName.__json_class__ = 'BackboneSslc.ProductName';

export class ProductNoName {
  constructor() {
    this.id = 0; // 0 require
    this.productNo = ''; // 1 require
    this.productName = ''; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ProductNoName.__json_class__ = 'BackboneSslc.ProductNoName';

export class ProductOption {
  constructor() {
    this.brandId = 0; // 0 require
    this.brandName = ''; // 1 require
    this.seriesList = []; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ProductOption.__json_class__ = 'BackboneSslc.ProductOption';

export class ModelOption {
  constructor() {
    this.modelId = 0; // 0 require
    this.modelName = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ModelOption.__json_class__ = 'BackboneSslc.ModelOption';

export class ProductOption2 {
  constructor() {
    this.productId = 0; // 0 require
    this.productName = ''; // 1 require
    this.modelList = []; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ProductOption2.__json_class__ = 'BackboneSslc.ProductOption2';

export class SeriesOption2 {
  constructor() {
    this.seriesId = 0; // 0 require
    this.seriesName = ''; // 1 require
    this.productList = []; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SeriesOption2.__json_class__ = 'BackboneSslc.SeriesOption2';

export class BrandOption {
  constructor() {
    this.brandId = 0; // 0 require
    this.brandName = ''; // 1 require
    this.seriesList = []; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

BrandOption.__json_class__ = 'BackboneSslc.BrandOption';

export class ModelNoName {
  constructor() {
    this.id = 0; // 0 require
    this.modelNo = ''; // 1 require
    this.modelName = ''; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ModelNoName.__json_class__ = 'BackboneSslc.ModelNoName';

export class FirmwareName {
  constructor() {
    this.id = 0; // 0 require
    this.firmwareName = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

FirmwareName.__json_class__ = 'BackboneSslc.FirmwareName';

export class ProtoclName {
  constructor() {
    this.id = 0; // 0 require
    this.protoclName = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ProtoclName.__json_class__ = 'BackboneSslc.ProtoclName';

export class ModelName {
  constructor() {
    this.id = 0; // 0 require
    this.modelName = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ModelName.__json_class__ = 'BackboneSslc.ModelName';

export class SerialInfo {
  constructor() {
    this.serialNo = ''; // 0 require
    this.brandId = 0; // 1 require
    this.brandName = ''; // 2 require
    this.seriesId = 0; // 3 require
    this.seriesNo = ''; // 4 require
    this.seriesName = ''; // 5 require
    this.productId = 0; // 6 require
    this.productNo = ''; // 7 require
    this.productName = ''; // 8 require
    this.modelId = 0; // 9 require
    this.modelNo = ''; // 10 require
    this.modelName = ''; // 11 require
    this.accounts = 0; // 12 require
    this.createTime = ''; // 13 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SerialInfo.__json_class__ = 'BackboneSslc.SerialInfo';

export class MacSerial {
  constructor() {
    this.macAddress = ''; // 0 require
    this.serialNo = ''; // 1 require
    this.hardwareStatus = ''; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

MacSerial.__json_class__ = 'BackboneSslc.MacSerial';

// 硬件管理接口类
export class HardwareInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'HardwareInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_brand_list({ brandName, upShelfStatus, status, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (brandName === undefined) {
      throw new RpcLogicValidationError('require argument "brandName"');
    }
    if (upShelfStatus === undefined) {
      throw new RpcLogicValidationError('require argument "upShelfStatus"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['brandName'] = brandName;
    _params['upShelfStatus'] = upShelfStatus;
    _params['status'] = status;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_brand/v1/hardware_brand', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_brand({ brandName, brandLogo, description, context }) {
    let _params = {};
    // check require
    if (brandName === undefined) {
      throw new RpcLogicValidationError('require argument "brandName"');
    }
    if (brandLogo === undefined) {
      throw new RpcLogicValidationError('require argument "brandLogo"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['brandName'] = brandName;
    _params['brandLogo'] = brandLogo;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_brand/v1/hardware_brand', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  update_brand({ p_id, id, brandName, brandLogo, description, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (brandName === undefined) {
      throw new RpcLogicValidationError('require argument "brandName"');
    }
    if (brandLogo === undefined) {
      throw new RpcLogicValidationError('require argument "brandLogo"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['brandName'] = brandName;
    _params['brandLogo'] = brandLogo;
    _params['description'] = description;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_brand/v1/hardware_brand/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  upload_brand_logo({ brandLogoFile, xxx, context }) {
    let _params = {};
    // check require
    if (brandLogoFile === undefined) {
      throw new RpcLogicValidationError('require argument "brandLogoFile"');
    }
    if (xxx === undefined) {
      throw new RpcLogicValidationError('require argument "xxx"');
    }

    // set argument into _params
    _params['brandLogoFile'] = brandLogoFile;
    _params['xxx'] = xxx;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/file/v1/upload_hardware_brand_logo', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  get_brand_detail({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/hardware_brand/v1/hardware_brand/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  up_shelf_brand({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_brand/v1/up_shelf/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  down_shelf_brand({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_brand/v1/down_shelf/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  delete_brand({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_brand/v1/hardware_brand/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  get_series_list({ seriesKey, brandId, upShelfStatus, status, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (seriesKey === undefined) {
      throw new RpcLogicValidationError('require argument "seriesKey"');
    }
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }
    if (upShelfStatus === undefined) {
      throw new RpcLogicValidationError('require argument "upShelfStatus"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['seriesKey'] = seriesKey;
    _params['brandId'] = brandId;
    _params['upShelfStatus'] = upShelfStatus;
    _params['status'] = status;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_series/v1/hardware_series', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_series_detail({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/hardware_series/v1/hardware_series/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_series({ brandId, seriesNo, seriesName, status, description, context }) {
    let _params = {};
    // check require
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }
    if (seriesNo === undefined) {
      throw new RpcLogicValidationError('require argument "seriesNo"');
    }
    if (seriesName === undefined) {
      throw new RpcLogicValidationError('require argument "seriesName"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['brandId'] = brandId;
    _params['seriesNo'] = seriesNo;
    _params['seriesName'] = seriesName;
    _params['status'] = status;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_series/v1/hardware_series', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  update_series({ p_id, id, brandId, seriesNo, seriesName, status, description, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }
    if (seriesNo === undefined) {
      throw new RpcLogicValidationError('require argument "seriesNo"');
    }
    if (seriesName === undefined) {
      throw new RpcLogicValidationError('require argument "seriesName"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['brandId'] = brandId;
    _params['seriesNo'] = seriesNo;
    _params['seriesName'] = seriesName;
    _params['status'] = status;
    _params['description'] = description;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_series/v1/hardware_series/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  up_shelf_series({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_series/v1/up_shelf/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  down_shelf_series({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_series/v1/down_shelf/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  delete_series({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_series/v1/hardware_series/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  get_product_list({ seriesId, productKey, brandId, upShelfStatus, status, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (seriesId === undefined) {
      throw new RpcLogicValidationError('require argument "seriesId"');
    }
    if (productKey === undefined) {
      throw new RpcLogicValidationError('require argument "productKey"');
    }
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }
    if (upShelfStatus === undefined) {
      throw new RpcLogicValidationError('require argument "upShelfStatus"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['seriesId'] = seriesId;
    _params['productKey'] = productKey;
    _params['brandId'] = brandId;
    _params['upShelfStatus'] = upShelfStatus;
    _params['status'] = status;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_product/v1/hardware_products', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_product_detail({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/hardware_product/v1/hardware_products/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_product({
    seriesId,
    productNo,
    productName,
    downloadFormat,
    aliyunFlag,
    productUniqueFlag,
    status,
    description,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (seriesId === undefined) {
      throw new RpcLogicValidationError('require argument "seriesId"');
    }
    if (productNo === undefined) {
      throw new RpcLogicValidationError('require argument "productNo"');
    }
    if (productName === undefined) {
      throw new RpcLogicValidationError('require argument "productName"');
    }
    if (downloadFormat === undefined) {
      throw new RpcLogicValidationError('require argument "downloadFormat"');
    }
    if (aliyunFlag === undefined) {
      throw new RpcLogicValidationError('require argument "aliyunFlag"');
    }
    if (productUniqueFlag === undefined) {
      throw new RpcLogicValidationError('require argument "productUniqueFlag"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['seriesId'] = seriesId;
    _params['productNo'] = productNo;
    _params['productName'] = productName;
    _params['downloadFormat'] = downloadFormat;
    _params['aliyunFlag'] = aliyunFlag;
    _params['productUniqueFlag'] = productUniqueFlag;
    _params['status'] = status;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_product/v1/hardware_products', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  update_product({
    p_id,
    id,
    seriesId,
    productNo,
    productName,
    downloadFormat,
    aliyunFlag,
    productUniqueFlag,
    status,
    description,
    version,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (seriesId === undefined) {
      throw new RpcLogicValidationError('require argument "seriesId"');
    }
    if (productNo === undefined) {
      throw new RpcLogicValidationError('require argument "productNo"');
    }
    if (productName === undefined) {
      throw new RpcLogicValidationError('require argument "productName"');
    }
    if (downloadFormat === undefined) {
      throw new RpcLogicValidationError('require argument "downloadFormat"');
    }
    if (aliyunFlag === undefined) {
      throw new RpcLogicValidationError('require argument "aliyunFlag"');
    }
    if (productUniqueFlag === undefined) {
      throw new RpcLogicValidationError('require argument "productUniqueFlag"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['seriesId'] = seriesId;
    _params['productNo'] = productNo;
    _params['productName'] = productName;
    _params['downloadFormat'] = downloadFormat;
    _params['aliyunFlag'] = aliyunFlag;
    _params['productUniqueFlag'] = productUniqueFlag;
    _params['status'] = status;
    _params['description'] = description;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_product/v1/hardware_product/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  up_shelf_product({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_product/v1/up_shelf/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  down_shelf_product({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_product/v1/down_shelf/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  delete_product({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_product/v1/hardware_products/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  get_model_list({
    brandId,
    seriesId,
    productId,
    modelKey,
    upShelfStatus,
    status,
    sortObj,
    pageNum,
    pageSize,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }
    if (seriesId === undefined) {
      throw new RpcLogicValidationError('require argument "seriesId"');
    }
    if (productId === undefined) {
      throw new RpcLogicValidationError('require argument "productId"');
    }
    if (modelKey === undefined) {
      throw new RpcLogicValidationError('require argument "modelKey"');
    }
    if (upShelfStatus === undefined) {
      throw new RpcLogicValidationError('require argument "upShelfStatus"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['brandId'] = brandId;
    _params['seriesId'] = seriesId;
    _params['productId'] = productId;
    _params['modelKey'] = modelKey;
    _params['upShelfStatus'] = upShelfStatus;
    _params['status'] = status;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_model/v1/hardware_models', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_model_detail({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/hardware_model/v1/hardware_models/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_detail_by_no({ modelNo, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['modelNo'] = modelNo;
    let _url = this._genCustomUrl('/base/hardware_model/v1/hardware_models/get_detail_by_no/{modelNo}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_model({
    id,
    productId,
    modelNo,
    modelName,
    orderNumber,
    channelList,
    price,
    maxDotsNum,
    frameIntervalMin,
    frameIntervalMax,
    protocls,
    modelPicture,
    label1,
    modelPicture2,
    label2,
    modelPicture3,
    label3,
    modelPicture4,
    label4,
    modelPicture5,
    label5,
    datum1,
    datum2,
    datum3,
    datum4,
    datum5,
    status,
    description,
    version,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (productId === undefined) {
      throw new RpcLogicValidationError('require argument "productId"');
    }
    if (modelNo === undefined) {
      throw new RpcLogicValidationError('require argument "modelNo"');
    }
    if (modelName === undefined) {
      throw new RpcLogicValidationError('require argument "modelName"');
    }
    if (orderNumber === undefined) {
      throw new RpcLogicValidationError('require argument "orderNumber"');
    }
    if (channelList === undefined) {
      throw new RpcLogicValidationError('require argument "channelList"');
    }
    if (price === undefined) {
      throw new RpcLogicValidationError('require argument "price"');
    }
    if (maxDotsNum === undefined) {
      throw new RpcLogicValidationError('require argument "maxDotsNum"');
    }
    if (frameIntervalMin === undefined) {
      throw new RpcLogicValidationError('require argument "frameIntervalMin"');
    }
    if (frameIntervalMax === undefined) {
      throw new RpcLogicValidationError('require argument "frameIntervalMax"');
    }
    if (protocls === undefined) {
      throw new RpcLogicValidationError('require argument "protocls"');
    }

    // set argument into _params
    if (id !== undefined) {
      _params['id'] = id;
    }
    _params['productId'] = productId;
    _params['modelNo'] = modelNo;
    _params['modelName'] = modelName;
    _params['orderNumber'] = orderNumber;
    _params['channelList'] = channelList;
    _params['price'] = price;
    _params['maxDotsNum'] = maxDotsNum;
    _params['frameIntervalMin'] = frameIntervalMin;
    _params['frameIntervalMax'] = frameIntervalMax;
    _params['protocls'] = protocls;
    if (modelPicture !== undefined) {
      _params['modelPicture'] = modelPicture;
    }
    if (label1 !== undefined) {
      _params['label1'] = label1;
    }
    if (modelPicture2 !== undefined) {
      _params['modelPicture2'] = modelPicture2;
    }
    if (label2 !== undefined) {
      _params['label2'] = label2;
    }
    if (modelPicture3 !== undefined) {
      _params['modelPicture3'] = modelPicture3;
    }
    if (label3 !== undefined) {
      _params['label3'] = label3;
    }
    if (modelPicture4 !== undefined) {
      _params['modelPicture4'] = modelPicture4;
    }
    if (label4 !== undefined) {
      _params['label4'] = label4;
    }
    if (modelPicture5 !== undefined) {
      _params['modelPicture5'] = modelPicture5;
    }
    if (label5 !== undefined) {
      _params['label5'] = label5;
    }
    if (datum1 !== undefined) {
      _params['datum1'] = datum1;
    }
    if (datum2 !== undefined) {
      _params['datum2'] = datum2;
    }
    if (datum3 !== undefined) {
      _params['datum3'] = datum3;
    }
    if (datum4 !== undefined) {
      _params['datum4'] = datum4;
    }
    if (datum5 !== undefined) {
      _params['datum5'] = datum5;
    }
    if (status !== undefined) {
      _params['status'] = status;
    }
    if (description !== undefined) {
      _params['description'] = description;
    }
    if (version !== undefined) {
      _params['version'] = version;
    }
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_model/v1/hardware_models', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  update_model({
    p_id,
    id,
    productId,
    modelNo,
    modelName,
    orderNumber,
    channelList,
    price,
    maxDotsNum,
    frameIntervalMin,
    frameIntervalMax,
    protocls,
    modelPicture,
    label1,
    modelPicture2,
    label2,
    modelPicture3,
    label3,
    modelPicture4,
    label4,
    modelPicture5,
    label5,
    datum1,
    datum2,
    datum3,
    datum4,
    datum5,
    status,
    description,
    version,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (productId === undefined) {
      throw new RpcLogicValidationError('require argument "productId"');
    }
    if (modelNo === undefined) {
      throw new RpcLogicValidationError('require argument "modelNo"');
    }
    if (modelName === undefined) {
      throw new RpcLogicValidationError('require argument "modelName"');
    }
    if (orderNumber === undefined) {
      throw new RpcLogicValidationError('require argument "orderNumber"');
    }
    if (channelList === undefined) {
      throw new RpcLogicValidationError('require argument "channelList"');
    }
    if (price === undefined) {
      throw new RpcLogicValidationError('require argument "price"');
    }
    if (maxDotsNum === undefined) {
      throw new RpcLogicValidationError('require argument "maxDotsNum"');
    }
    if (frameIntervalMin === undefined) {
      throw new RpcLogicValidationError('require argument "frameIntervalMin"');
    }
    if (frameIntervalMax === undefined) {
      throw new RpcLogicValidationError('require argument "frameIntervalMax"');
    }
    if (protocls === undefined) {
      throw new RpcLogicValidationError('require argument "protocls"');
    }

    // set argument into _params
    if (id !== undefined) {
      _params['id'] = id;
    }
    _params['productId'] = productId;
    _params['modelNo'] = modelNo;
    _params['modelName'] = modelName;
    _params['orderNumber'] = orderNumber;
    _params['channelList'] = channelList;
    _params['price'] = price;
    _params['maxDotsNum'] = maxDotsNum;
    _params['frameIntervalMin'] = frameIntervalMin;
    _params['frameIntervalMax'] = frameIntervalMax;
    _params['protocls'] = protocls;
    if (modelPicture !== undefined) {
      _params['modelPicture'] = modelPicture;
    }
    if (label1 !== undefined) {
      _params['label1'] = label1;
    }
    if (modelPicture2 !== undefined) {
      _params['modelPicture2'] = modelPicture2;
    }
    if (label2 !== undefined) {
      _params['label2'] = label2;
    }
    if (modelPicture3 !== undefined) {
      _params['modelPicture3'] = modelPicture3;
    }
    if (label3 !== undefined) {
      _params['label3'] = label3;
    }
    if (modelPicture4 !== undefined) {
      _params['modelPicture4'] = modelPicture4;
    }
    if (label4 !== undefined) {
      _params['label4'] = label4;
    }
    if (modelPicture5 !== undefined) {
      _params['modelPicture5'] = modelPicture5;
    }
    if (label5 !== undefined) {
      _params['label5'] = label5;
    }
    if (datum1 !== undefined) {
      _params['datum1'] = datum1;
    }
    if (datum2 !== undefined) {
      _params['datum2'] = datum2;
    }
    if (datum3 !== undefined) {
      _params['datum3'] = datum3;
    }
    if (datum4 !== undefined) {
      _params['datum4'] = datum4;
    }
    if (datum5 !== undefined) {
      _params['datum5'] = datum5;
    }
    if (status !== undefined) {
      _params['status'] = status;
    }
    if (description !== undefined) {
      _params['description'] = description;
    }
    if (version !== undefined) {
      _params['version'] = version;
    }
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_model/v1/hardware_models/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  up_shelf_model({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_model/v1/up_shelf/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  down_shelf_model({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_model/v1/down_shelf/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  delete_model({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_model/v1/hardware_models/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  upload_hardware_model_picture({ hardwareModelPictureFile, xxx, context }) {
    let _params = {};
    // check require
    if (hardwareModelPictureFile === undefined) {
      throw new RpcLogicValidationError('require argument "hardwareModelPictureFile"');
    }
    if (xxx === undefined) {
      throw new RpcLogicValidationError('require argument "xxx"');
    }

    // set argument into _params
    _params['hardwareModelPictureFile'] = hardwareModelPictureFile;
    _params['xxx'] = xxx;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/file/v1/upload_hardware_model_picture', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  upload_document_attachment({ documentFile, xxx, context }) {
    let _params = {};
    // check require
    if (documentFile === undefined) {
      throw new RpcLogicValidationError('require argument "documentFile"');
    }
    if (xxx === undefined) {
      throw new RpcLogicValidationError('require argument "xxx"');
    }

    // set argument into _params
    _params['documentFile'] = documentFile;
    _params['xxx'] = xxx;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/file/v1/upload_document_attachment', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  get_firmware_list({
    brandId,
    seriesId,
    productId,
    modelId,
    upShelfStatus,
    status,
    firmwareName,
    sortObj,
    pageNum,
    pageSize,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }
    if (seriesId === undefined) {
      throw new RpcLogicValidationError('require argument "seriesId"');
    }
    if (productId === undefined) {
      throw new RpcLogicValidationError('require argument "productId"');
    }
    if (modelId === undefined) {
      throw new RpcLogicValidationError('require argument "modelId"');
    }
    if (upShelfStatus === undefined) {
      throw new RpcLogicValidationError('require argument "upShelfStatus"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (firmwareName === undefined) {
      throw new RpcLogicValidationError('require argument "firmwareName"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['brandId'] = brandId;
    _params['seriesId'] = seriesId;
    _params['productId'] = productId;
    _params['modelId'] = modelId;
    _params['upShelfStatus'] = upShelfStatus;
    _params['status'] = status;
    _params['firmwareName'] = firmwareName;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_firmwares/v1/hardware_firmwares', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_firmware_detail({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/hardware_firmwares/v1/hardware_firmwares/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_firmware({
    brandId,
    seriesId,
    productId,
    modelId,
    firmwareName,
    downloadUrl,
    compatibleFirmware,
    reissueFlag,
    description,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }
    if (seriesId === undefined) {
      throw new RpcLogicValidationError('require argument "seriesId"');
    }
    if (productId === undefined) {
      throw new RpcLogicValidationError('require argument "productId"');
    }
    if (modelId === undefined) {
      throw new RpcLogicValidationError('require argument "modelId"');
    }
    if (firmwareName === undefined) {
      throw new RpcLogicValidationError('require argument "firmwareName"');
    }
    if (downloadUrl === undefined) {
      throw new RpcLogicValidationError('require argument "downloadUrl"');
    }
    if (compatibleFirmware === undefined) {
      throw new RpcLogicValidationError('require argument "compatibleFirmware"');
    }
    if (reissueFlag === undefined) {
      throw new RpcLogicValidationError('require argument "reissueFlag"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['brandId'] = brandId;
    _params['seriesId'] = seriesId;
    _params['productId'] = productId;
    _params['modelId'] = modelId;
    _params['firmwareName'] = firmwareName;
    _params['downloadUrl'] = downloadUrl;
    _params['compatibleFirmware'] = compatibleFirmware;
    _params['reissueFlag'] = reissueFlag;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_firmwares/v1/hardware_firmwares', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  update_firmware({
    p_id,
    id,
    brandId,
    seriesId,
    productId,
    modelId,
    firmwareName,
    downloadUrl,
    compatibleFirmware,
    reissueFlag,
    description,
    version,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }
    if (seriesId === undefined) {
      throw new RpcLogicValidationError('require argument "seriesId"');
    }
    if (productId === undefined) {
      throw new RpcLogicValidationError('require argument "productId"');
    }
    if (modelId === undefined) {
      throw new RpcLogicValidationError('require argument "modelId"');
    }
    if (firmwareName === undefined) {
      throw new RpcLogicValidationError('require argument "firmwareName"');
    }
    if (downloadUrl === undefined) {
      throw new RpcLogicValidationError('require argument "downloadUrl"');
    }
    if (compatibleFirmware === undefined) {
      throw new RpcLogicValidationError('require argument "compatibleFirmware"');
    }
    if (reissueFlag === undefined) {
      throw new RpcLogicValidationError('require argument "reissueFlag"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['brandId'] = brandId;
    _params['seriesId'] = seriesId;
    _params['productId'] = productId;
    _params['modelId'] = modelId;
    _params['firmwareName'] = firmwareName;
    _params['downloadUrl'] = downloadUrl;
    _params['compatibleFirmware'] = compatibleFirmware;
    _params['reissueFlag'] = reissueFlag;
    _params['description'] = description;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_firmwares/v1/hardware_firmwares/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  up_shelf_firmware({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_firmwares/v1/up_shelf/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  delete_firmware({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_firmwares/v1/hardware_firmwares/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  get_hardware_brand_option_list({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_series/v1/get_hardware_brand_option_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_series_option_list({ brandId, context }) {
    let _params = {};
    // check require
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }

    // set argument into _params
    _params['brandId'] = brandId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_series/v1/get_hardware_series_option_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_series_all_option_list({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_series/v1/get_hardware_series_all_option_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_product_all_option_list({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_product/v1/get_hardware_product_all_option_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_product_option_list({ seriesId, context }) {
    let _params = {};
    // check require
    if (seriesId === undefined) {
      throw new RpcLogicValidationError('require argument "seriesId"');
    }

    // set argument into _params
    _params['seriesId'] = seriesId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_product/v1/get_hardware_product_option_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_model_all_option_list({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_model/v1/get_hardware_model_all_option_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_model_option_list({ productId, context }) {
    let _params = {};
    // check require
    if (productId === undefined) {
      throw new RpcLogicValidationError('require argument "productId"');
    }

    // set argument into _params
    _params['productId'] = productId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_model/v1/get_hardware_model_option_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_product_option_list_by_no({ seriesNo, context }) {
    let _params = {};
    // check require

    // set argument into _params
    if (seriesNo !== undefined) {
      _params['seriesNo'] = seriesNo;
    }
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_product/v1/get_hardware_product_option_list_by_no', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_model_option_list_by_no({ productNo, context }) {
    let _params = {};
    // check require
    if (productNo === undefined) {
      throw new RpcLogicValidationError('require argument "productNo"');
    }

    // set argument into _params
    _params['productNo'] = productNo;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_model/v1/get_hardware_model_option_list_by_no', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_compatible_firmware({ brandId, seriesId, productId, modelId, firmwareId, context }) {
    let _params = {};
    // check require
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }
    if (seriesId === undefined) {
      throw new RpcLogicValidationError('require argument "seriesId"');
    }
    if (productId === undefined) {
      throw new RpcLogicValidationError('require argument "productId"');
    }
    if (modelId === undefined) {
      throw new RpcLogicValidationError('require argument "modelId"');
    }

    // set argument into _params
    _params['brandId'] = brandId;
    _params['seriesId'] = seriesId;
    _params['productId'] = productId;
    _params['modelId'] = modelId;
    if (firmwareId !== undefined) {
      _params['firmwareId'] = firmwareId;
    }
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_firmwares/v1/get_compatible_firmware', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_protocls({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_model/v1/get_protocls', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_product_publish_all_option_list({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/base/hardware_serial_number_library/v1/get_hardware_product_publish_all_option_list',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_model_publish_option_list({ productId, context }) {
    let _params = {};
    // check require
    if (productId === undefined) {
      throw new RpcLogicValidationError('require argument "productId"');
    }

    // set argument into _params
    _params['productId'] = productId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/base/hardware_serial_number_library/v1/get_hardware_model_publish_option_list',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_serial_brand_option_list({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/base/hardware_serial_number_library/v1/get_hardware_serial_brand_option_list',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_serial_series_option_list({ brandId, context }) {
    let _params = {};
    // check require
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }

    // set argument into _params
    _params['brandId'] = brandId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/base/hardware_serial_number_library/v1/get_hardware_serial_series_option_list',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_serial_product_option_list({ seriesId, context }) {
    let _params = {};
    // check require
    if (seriesId === undefined) {
      throw new RpcLogicValidationError('require argument "seriesId"');
    }

    // set argument into _params
    _params['seriesId'] = seriesId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/base/hardware_serial_number_library/v1/get_hardware_serial_product_option_list',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_serial_model_option_list({ productId, context }) {
    let _params = {};
    // check require
    if (productId === undefined) {
      throw new RpcLogicValidationError('require argument "productId"');
    }

    // set argument into _params
    _params['productId'] = productId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/base/hardware_serial_number_library/v1/get_hardware_serial_model_option_list',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_serial_list({
    brandId,
    seriesId,
    productId,
    modelId,
    createDateFrom,
    createDateTo,
    sortObj,
    pageNum,
    pageSize,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }
    if (seriesId === undefined) {
      throw new RpcLogicValidationError('require argument "seriesId"');
    }
    if (productId === undefined) {
      throw new RpcLogicValidationError('require argument "productId"');
    }
    if (modelId === undefined) {
      throw new RpcLogicValidationError('require argument "modelId"');
    }
    if (createDateFrom === undefined) {
      throw new RpcLogicValidationError('require argument "createDateFrom"');
    }
    if (createDateTo === undefined) {
      throw new RpcLogicValidationError('require argument "createDateTo"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['brandId'] = brandId;
    _params['seriesId'] = seriesId;
    _params['productId'] = productId;
    _params['modelId'] = modelId;
    _params['createDateFrom'] = createDateFrom;
    _params['createDateTo'] = createDateTo;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/base/hardware_serial_number_library/v1/hardware_serial_number_libraries',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_serial_detail({
    brandId,
    brandName,
    seriesId,
    seriesName,
    productId,
    productName,
    modelId,
    modelName,
    generateTime,
    pageNum,
    pageSize,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }
    if (brandName === undefined) {
      throw new RpcLogicValidationError('require argument "brandName"');
    }
    if (seriesId === undefined) {
      throw new RpcLogicValidationError('require argument "seriesId"');
    }
    if (seriesName === undefined) {
      throw new RpcLogicValidationError('require argument "seriesName"');
    }
    if (productId === undefined) {
      throw new RpcLogicValidationError('require argument "productId"');
    }
    if (productName === undefined) {
      throw new RpcLogicValidationError('require argument "productName"');
    }
    if (modelId === undefined) {
      throw new RpcLogicValidationError('require argument "modelId"');
    }
    if (modelName === undefined) {
      throw new RpcLogicValidationError('require argument "modelName"');
    }
    if (generateTime === undefined) {
      throw new RpcLogicValidationError('require argument "generateTime"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['brandId'] = brandId;
    _params['brandName'] = brandName;
    _params['seriesId'] = seriesId;
    _params['seriesName'] = seriesName;
    _params['productId'] = productId;
    _params['productName'] = productName;
    _params['modelId'] = modelId;
    _params['modelName'] = modelName;
    _params['generateTime'] = generateTime;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/base/hardware_serial_number_library/v1/hardware_serial_number_libraries/detail',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  generate_serial_number({
    brandId,
    seriesId,
    productId,
    modelId,
    productUniqueFlag,
    macAddressList,
    generateStyle,
    useFlg,
    hardwareStatus,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }
    if (seriesId === undefined) {
      throw new RpcLogicValidationError('require argument "seriesId"');
    }
    if (productId === undefined) {
      throw new RpcLogicValidationError('require argument "productId"');
    }
    if (modelId === undefined) {
      throw new RpcLogicValidationError('require argument "modelId"');
    }
    if (productUniqueFlag === undefined) {
      throw new RpcLogicValidationError('require argument "productUniqueFlag"');
    }
    if (macAddressList === undefined) {
      throw new RpcLogicValidationError('require argument "macAddressList"');
    }

    // set argument into _params
    _params['brandId'] = brandId;
    _params['seriesId'] = seriesId;
    _params['productId'] = productId;
    _params['modelId'] = modelId;
    _params['productUniqueFlag'] = productUniqueFlag;
    _params['macAddressList'] = macAddressList;
    if (generateStyle !== undefined) {
      _params['generateStyle'] = generateStyle;
    }
    if (useFlg !== undefined) {
      _params['useFlg'] = useFlg;
    }
    if (hardwareStatus !== undefined) {
      _params['hardwareStatus'] = hardwareStatus;
    }
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_serial_number_library/v1/generate_serial_number', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  download_pdf({
    brandId,
    brandName,
    seriesId,
    seriesName,
    productId,
    productName,
    modelId,
    modelName,
    createTime,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }
    if (brandName === undefined) {
      throw new RpcLogicValidationError('require argument "brandName"');
    }
    if (seriesId === undefined) {
      throw new RpcLogicValidationError('require argument "seriesId"');
    }
    if (seriesName === undefined) {
      throw new RpcLogicValidationError('require argument "seriesName"');
    }
    if (productId === undefined) {
      throw new RpcLogicValidationError('require argument "productId"');
    }
    if (productName === undefined) {
      throw new RpcLogicValidationError('require argument "productName"');
    }
    if (modelId === undefined) {
      throw new RpcLogicValidationError('require argument "modelId"');
    }
    if (modelName === undefined) {
      throw new RpcLogicValidationError('require argument "modelName"');
    }
    if (createTime === undefined) {
      throw new RpcLogicValidationError('require argument "createTime"');
    }

    // set argument into _params
    _params['brandId'] = brandId;
    _params['brandName'] = brandName;
    _params['seriesId'] = seriesId;
    _params['seriesName'] = seriesName;
    _params['productId'] = productId;
    _params['productName'] = productName;
    _params['modelId'] = modelId;
    _params['modelName'] = modelName;
    _params['createTime'] = createTime;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_serial_number_library/v1/download_pdf', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  check_repeat({ macList, context }) {
    let _params = {};
    // check require
    if (macList === undefined) {
      throw new RpcLogicValidationError('require argument "macList"');
    }

    // set argument into _params
    _params['macList'] = macList;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_serial_number_library/v1/check_repeat', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}

export class ProtocolInfo {
  constructor() {
    this.id = 0; // 0 require
    this.protocolCode = ''; // 1 require
    this.protocolName = ''; // 2 require
    this.channelType = 0; // 3 require
    this.upShelfStatus = ''; // 4 require
    this.updateTime = ''; // 5 require
    this.status = ''; // 6 require
    this.version = 0; // 7 require
    this.firstPublishFlag = ''; // 8 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ProtocolInfo.__json_class__ = 'BackboneSslc.ProtocolInfo';

export class ProtocolDetail {
  constructor() {
    this.id = 0; // 0 require
    this.protocolCode = ''; // 1 require
    this.protocolName = ''; // 2 require
    this.channelType = 0; // 3 require
    this.upShelfStatus = ''; // 4 require
    this.status = ''; // 5 require
    this.description = ''; // 6 require
    this.version = 0; // 7 require
    this.firstPublishFlag = ''; // 8 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ProtocolDetail.__json_class__ = 'BackboneSslc.ProtocolDetail';

export class ProtocolCodeName {
  constructor() {
    this.id = 0; // 0 require
    this.protocolCode = ''; // 1 require
    this.protocolName = ''; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ProtocolCodeName.__json_class__ = 'BackboneSslc.ProtocolCodeName';

export class ParameterOption {
  constructor() {
    this.id = 0; // 0 optional
    this.key = ''; // 1 require
    this.value = ''; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ParameterOption.__json_class__ = 'BackboneSslc.ParameterOption';

export class Parameter {
  constructor() {
    this.id = 0; // 0 optional
    this.parameterNameEn = ''; // 1 require
    this.parameterNameZh = ''; // 2 require
    this.parameterType = ''; // 3 require
    this.parameterCategory = ''; // 4 require
    this.numericalValueRangeMin = ''; // 5 require
    this.numericalValueRangeMax = ''; // 6 require
    this.parameterOptionList = []; // 8 require
    this.requiredFlg = ''; // 9 require
    this.showFlag = ''; // 10 require
    this.pkFlag = ''; // 11 require
    this.parameterLength = 0; // 12 require
    this.valueRegular = ''; // 13 require
    this.defaultValue = ''; // 15 require
    this.sort = 0; // 16 require
    this.protocolSettingId = 0; // 17 require
    this.description = ''; // 18 require
    this.decimalDigit = ''; // 19 require
    this.version = 0; // 20 optional
  }

  dump() {
    return JSON.stringify(this);
  }
}

Parameter.__json_class__ = 'BackboneSslc.Parameter';

// 规约驱动配置接口类
export class ProtocolInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'ProtocolInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_protocol_list({ protocolKey, channelType, upShelfStatus, status, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (protocolKey === undefined) {
      throw new RpcLogicValidationError('require argument "protocolKey"');
    }
    if (channelType === undefined) {
      throw new RpcLogicValidationError('require argument "channelType"');
    }
    if (upShelfStatus === undefined) {
      throw new RpcLogicValidationError('require argument "upShelfStatus"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['protocolKey'] = protocolKey;
    _params['channelType'] = channelType;
    _params['upShelfStatus'] = upShelfStatus;
    _params['status'] = status;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/protocol_setting/v1/protocol_settings', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_protocol_detail({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/protocol_setting/v1/protocol_settings/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_protocol({ protocolCode, protocolName, channelType, description, context }) {
    let _params = {};
    // check require
    if (protocolCode === undefined) {
      throw new RpcLogicValidationError('require argument "protocolCode"');
    }
    if (protocolName === undefined) {
      throw new RpcLogicValidationError('require argument "protocolName"');
    }
    if (channelType === undefined) {
      throw new RpcLogicValidationError('require argument "channelType"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['protocolCode'] = protocolCode;
    _params['protocolName'] = protocolName;
    _params['channelType'] = channelType;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/protocol_setting/v1/protocol_settings', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  update_protocol({ p_id, id, protocolCode, protocolName, channelType, description, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (protocolCode === undefined) {
      throw new RpcLogicValidationError('require argument "protocolCode"');
    }
    if (protocolName === undefined) {
      throw new RpcLogicValidationError('require argument "protocolName"');
    }
    if (channelType === undefined) {
      throw new RpcLogicValidationError('require argument "channelType"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['protocolCode'] = protocolCode;
    _params['protocolName'] = protocolName;
    _params['channelType'] = channelType;
    _params['description'] = description;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/protocol_setting/v1/protocol_settings/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_protocol({ id, version, context }) {
    let _params = {};
    // check require
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/protocol_setting/v1/protocol_settings/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  copy_protocol({ id, copyId, copyType, protocolCode, protocolName, channelType, description, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (copyId === undefined) {
      throw new RpcLogicValidationError('require argument "copyId"');
    }
    if (copyType === undefined) {
      throw new RpcLogicValidationError('require argument "copyType"');
    }
    if (protocolCode === undefined) {
      throw new RpcLogicValidationError('require argument "protocolCode"');
    }
    if (protocolName === undefined) {
      throw new RpcLogicValidationError('require argument "protocolName"');
    }
    if (channelType === undefined) {
      throw new RpcLogicValidationError('require argument "channelType"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['copyId'] = copyId;
    _params['copyType'] = copyType;
    _params['protocolCode'] = protocolCode;
    _params['protocolName'] = protocolName;
    _params['channelType'] = channelType;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/protocol_setting/v1/protocol_settings_copy', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  up_shelf_protocol({ id, version, context }) {
    let _params = {};
    // check require
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/protocol_setting/v1/up_shelf/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  down_shelf_protocol({ id, version, context }) {
    let _params = {};
    // check require
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['id'] = id;
    let _url = this._genCustomUrl('/base/protocol_setting/v1/down_shelf/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  protocol_setting_lists({ p_id, id, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }

    // set argument into _params
    _params['id'] = id;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/protocol_setting/v1/protocol_setting_lists/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_parameters({
    protocolSettingId,
    parameterType,
    parameterCategory,
    parameterKey,
    sortObj,
    pageNum,
    pageSize,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (protocolSettingId === undefined) {
      throw new RpcLogicValidationError('require argument "protocolSettingId"');
    }
    if (parameterType === undefined) {
      throw new RpcLogicValidationError('require argument "parameterType"');
    }
    if (parameterCategory === undefined) {
      throw new RpcLogicValidationError('require argument "parameterCategory"');
    }
    if (parameterKey === undefined) {
      throw new RpcLogicValidationError('require argument "parameterKey"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['protocolSettingId'] = protocolSettingId;
    _params['parameterType'] = parameterType;
    _params['parameterCategory'] = parameterCategory;
    _params['parameterKey'] = parameterKey;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_parameter/v1/hardware_parameters', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_parameter_detail({ p_id, id, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }

    // set argument into _params
    _params['id'] = id;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_parameter/v1/hardware_parameters/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_parameter({
    id,
    parameterNameEn,
    parameterNameZh,
    parameterType,
    parameterCategory,
    numericalValueRangeMin,
    numericalValueRangeMax,
    parameterOptionList,
    requiredFlg,
    showFlag,
    pkFlag,
    parameterLength,
    valueRegular,
    defaultValue,
    sort,
    protocolSettingId,
    description,
    decimalDigit,
    version,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (parameterNameEn === undefined) {
      throw new RpcLogicValidationError('require argument "parameterNameEn"');
    }
    if (parameterNameZh === undefined) {
      throw new RpcLogicValidationError('require argument "parameterNameZh"');
    }
    if (parameterType === undefined) {
      throw new RpcLogicValidationError('require argument "parameterType"');
    }
    if (parameterCategory === undefined) {
      throw new RpcLogicValidationError('require argument "parameterCategory"');
    }
    if (numericalValueRangeMin === undefined) {
      throw new RpcLogicValidationError('require argument "numericalValueRangeMin"');
    }
    if (numericalValueRangeMax === undefined) {
      throw new RpcLogicValidationError('require argument "numericalValueRangeMax"');
    }
    if (parameterOptionList === undefined) {
      throw new RpcLogicValidationError('require argument "parameterOptionList"');
    }
    if (requiredFlg === undefined) {
      throw new RpcLogicValidationError('require argument "requiredFlg"');
    }
    if (showFlag === undefined) {
      throw new RpcLogicValidationError('require argument "showFlag"');
    }
    if (pkFlag === undefined) {
      throw new RpcLogicValidationError('require argument "pkFlag"');
    }
    if (parameterLength === undefined) {
      throw new RpcLogicValidationError('require argument "parameterLength"');
    }
    if (valueRegular === undefined) {
      throw new RpcLogicValidationError('require argument "valueRegular"');
    }
    if (defaultValue === undefined) {
      throw new RpcLogicValidationError('require argument "defaultValue"');
    }
    if (sort === undefined) {
      throw new RpcLogicValidationError('require argument "sort"');
    }
    if (protocolSettingId === undefined) {
      throw new RpcLogicValidationError('require argument "protocolSettingId"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (decimalDigit === undefined) {
      throw new RpcLogicValidationError('require argument "decimalDigit"');
    }

    // set argument into _params
    if (id !== undefined) {
      _params['id'] = id;
    }
    _params['parameterNameEn'] = parameterNameEn;
    _params['parameterNameZh'] = parameterNameZh;
    _params['parameterType'] = parameterType;
    _params['parameterCategory'] = parameterCategory;
    _params['numericalValueRangeMin'] = numericalValueRangeMin;
    _params['numericalValueRangeMax'] = numericalValueRangeMax;
    _params['parameterOptionList'] = parameterOptionList;
    _params['requiredFlg'] = requiredFlg;
    _params['showFlag'] = showFlag;
    _params['pkFlag'] = pkFlag;
    _params['parameterLength'] = parameterLength;
    _params['valueRegular'] = valueRegular;
    _params['defaultValue'] = defaultValue;
    _params['sort'] = sort;
    _params['protocolSettingId'] = protocolSettingId;
    _params['description'] = description;
    _params['decimalDigit'] = decimalDigit;
    if (version !== undefined) {
      _params['version'] = version;
    }
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_parameter/v1/hardware_parameter', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  update_parameter({
    p_id,
    id,
    parameterNameEn,
    parameterNameZh,
    parameterType,
    parameterCategory,
    numericalValueRangeMin,
    numericalValueRangeMax,
    parameterOptionList,
    requiredFlg,
    showFlag,
    pkFlag,
    parameterLength,
    valueRegular,
    defaultValue,
    sort,
    protocolSettingId,
    description,
    decimalDigit,
    version,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (parameterNameEn === undefined) {
      throw new RpcLogicValidationError('require argument "parameterNameEn"');
    }
    if (parameterNameZh === undefined) {
      throw new RpcLogicValidationError('require argument "parameterNameZh"');
    }
    if (parameterType === undefined) {
      throw new RpcLogicValidationError('require argument "parameterType"');
    }
    if (parameterCategory === undefined) {
      throw new RpcLogicValidationError('require argument "parameterCategory"');
    }
    if (numericalValueRangeMin === undefined) {
      throw new RpcLogicValidationError('require argument "numericalValueRangeMin"');
    }
    if (numericalValueRangeMax === undefined) {
      throw new RpcLogicValidationError('require argument "numericalValueRangeMax"');
    }
    if (parameterOptionList === undefined) {
      throw new RpcLogicValidationError('require argument "parameterOptionList"');
    }
    if (requiredFlg === undefined) {
      throw new RpcLogicValidationError('require argument "requiredFlg"');
    }
    if (showFlag === undefined) {
      throw new RpcLogicValidationError('require argument "showFlag"');
    }
    if (pkFlag === undefined) {
      throw new RpcLogicValidationError('require argument "pkFlag"');
    }
    if (parameterLength === undefined) {
      throw new RpcLogicValidationError('require argument "parameterLength"');
    }
    if (valueRegular === undefined) {
      throw new RpcLogicValidationError('require argument "valueRegular"');
    }
    if (defaultValue === undefined) {
      throw new RpcLogicValidationError('require argument "defaultValue"');
    }
    if (sort === undefined) {
      throw new RpcLogicValidationError('require argument "sort"');
    }
    if (protocolSettingId === undefined) {
      throw new RpcLogicValidationError('require argument "protocolSettingId"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (decimalDigit === undefined) {
      throw new RpcLogicValidationError('require argument "decimalDigit"');
    }

    // set argument into _params
    if (id !== undefined) {
      _params['id'] = id;
    }
    _params['parameterNameEn'] = parameterNameEn;
    _params['parameterNameZh'] = parameterNameZh;
    _params['parameterType'] = parameterType;
    _params['parameterCategory'] = parameterCategory;
    _params['numericalValueRangeMin'] = numericalValueRangeMin;
    _params['numericalValueRangeMax'] = numericalValueRangeMax;
    _params['parameterOptionList'] = parameterOptionList;
    _params['requiredFlg'] = requiredFlg;
    _params['showFlag'] = showFlag;
    _params['pkFlag'] = pkFlag;
    _params['parameterLength'] = parameterLength;
    _params['valueRegular'] = valueRegular;
    _params['defaultValue'] = defaultValue;
    _params['sort'] = sort;
    _params['protocolSettingId'] = protocolSettingId;
    _params['description'] = description;
    _params['decimalDigit'] = decimalDigit;
    if (version !== undefined) {
      _params['version'] = version;
    }
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_parameter/v1/hardware_parameters/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_parameter({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_parameter/v1/hardware_parameters/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }
}

export class InventoryInfo {
  constructor() {
    this.brandId = 0; // 0 require
    this.brandName = ''; // 1 require
    this.seriesId = 0; // 2 require
    this.seriesNo = ''; // 3 require
    this.seriesName = ''; // 4 require
    this.productId = 0; // 5 require
    this.productNo = ''; // 6 require
    this.productName = ''; // 7 require
    this.modelId = 0; // 8 require
    this.modelNo = ''; // 9 require
    this.modelName = ''; // 10 require
    this.serialNo = ''; // 11 require
    this.macAddress = ''; // 12 require
    this.factoryTime = ''; // 13 require
    this.inputTime = ''; // 14 require
    this.outputTime = ''; // 15 require
    this.ioWarehouseStatus = ''; // 16 require
    this.version = 0; // 17 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

InventoryInfo.__json_class__ = 'BackboneSslc.InventoryInfo';

export class InventoryDetail {
  constructor() {
    this.brandId = 0; // 0 require
    this.brandName = ''; // 1 require
    this.seriesId = 0; // 2 require
    this.seriesName = ''; // 3 require
    this.productId = 0; // 4 require
    this.productName = ''; // 5 require
    this.modelId = 0; // 6 require
    this.modelName = ''; // 7 require
    this.macAddress = ''; // 8 require
    this.serialNo = ''; // 9 require
    this.factoryTime = ''; // 10 require
    this.inputTime = ''; // 11 require
    this.outputTime = ''; // 12 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

InventoryDetail.__json_class__ = 'BackboneSslc.InventoryDetail';

export class SerialNo {
  constructor() {
    this.serialNo = ''; // 0 require
    this.version = 0; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SerialNo.__json_class__ = 'BackboneSslc.SerialNo';

// 出入库接口类
export class InventoryInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'InventoryInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_inventory_list({
    brandId,
    seriesId,
    productId,
    modelId,
    serialNo,
    macAddress,
    factoryDateFrom,
    factoryDateTo,
    ioWarehouseStatus,
    sortObj,
    pageNum,
    pageSize,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }
    if (seriesId === undefined) {
      throw new RpcLogicValidationError('require argument "seriesId"');
    }
    if (productId === undefined) {
      throw new RpcLogicValidationError('require argument "productId"');
    }
    if (modelId === undefined) {
      throw new RpcLogicValidationError('require argument "modelId"');
    }
    if (serialNo === undefined) {
      throw new RpcLogicValidationError('require argument "serialNo"');
    }
    if (macAddress === undefined) {
      throw new RpcLogicValidationError('require argument "macAddress"');
    }
    if (factoryDateFrom === undefined) {
      throw new RpcLogicValidationError('require argument "factoryDateFrom"');
    }
    if (factoryDateTo === undefined) {
      throw new RpcLogicValidationError('require argument "factoryDateTo"');
    }
    if (ioWarehouseStatus === undefined) {
      throw new RpcLogicValidationError('require argument "ioWarehouseStatus"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['brandId'] = brandId;
    _params['seriesId'] = seriesId;
    _params['productId'] = productId;
    _params['modelId'] = modelId;
    _params['serialNo'] = serialNo;
    _params['macAddress'] = macAddress;
    _params['factoryDateFrom'] = factoryDateFrom;
    _params['factoryDateTo'] = factoryDateTo;
    _params['ioWarehouseStatus'] = ioWarehouseStatus;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_inventory/v1/hardware_inventories', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_inventory_detail({ serial_no, serialNo, context }) {
    let _params = {};
    // check require
    if (serialNo === undefined) {
      throw new RpcLogicValidationError('require argument "serialNo"');
    }

    // set argument into _params
    _params['serialNo'] = serialNo;
    // prepare url
    let customArgs = {};
    customArgs['serial_no'] = serial_no;
    let _url = this._genCustomUrl('/base/hardware_inventory/v1/hardware_inventories/{serial_no}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  stock_in({ serial_no, serialNo, inputTime, version, context }) {
    let _params = {};
    // check require
    if (serialNo === undefined) {
      throw new RpcLogicValidationError('require argument "serialNo"');
    }
    if (inputTime === undefined) {
      throw new RpcLogicValidationError('require argument "inputTime"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['serialNo'] = serialNo;
    _params['inputTime'] = inputTime;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['serial_no'] = serial_no;
    let _url = this._genCustomUrl('/base/hardware_inventory/v1/stock_in/{serial_no}', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  stock_in_batch({ list, inputTime, context }) {
    let _params = {};
    // check require
    if (list === undefined) {
      throw new RpcLogicValidationError('require argument "list"');
    }
    if (inputTime === undefined) {
      throw new RpcLogicValidationError('require argument "inputTime"');
    }

    // set argument into _params
    _params['list'] = list;
    _params['inputTime'] = inputTime;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_inventory/v1/stock_in_batch', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  stock_out({ serial_no, serialNo, outputTime, version, context }) {
    let _params = {};
    // check require
    if (serialNo === undefined) {
      throw new RpcLogicValidationError('require argument "serialNo"');
    }
    if (outputTime === undefined) {
      throw new RpcLogicValidationError('require argument "outputTime"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['serialNo'] = serialNo;
    _params['outputTime'] = outputTime;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['serial_no'] = serial_no;
    let _url = this._genCustomUrl('/base/hardware_inventory/v1/stock_out/{serial_no}', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  stock_out_batch({ list, outputTime, context }) {
    let _params = {};
    // check require
    if (list === undefined) {
      throw new RpcLogicValidationError('require argument "list"');
    }
    if (outputTime === undefined) {
      throw new RpcLogicValidationError('require argument "outputTime"');
    }

    // set argument into _params
    _params['list'] = list;
    _params['outputTime'] = outputTime;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_inventory/v1/stock_out_batch', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
}

export class Enterprise {
  constructor() {
    this.enterpriseId = ''; // 0 require
    this.enterpriseName = ''; // 1 require
    this.industry = ''; // 2 require
    this.industryKeyValue = ''; // 3 require
    this.registerDate = null; // 4 require
    this.verifyStatus = ''; // 5 require
    this.frozen = ''; // 6 require
    this.verifyTime = null; // 7 require
    this.verifierId = 0; // 8 require
    this.verifier = ''; // 9 require
    this.salesId = 0; // 10 require
    this.salesName = ''; // 11 require
    this.salesMobile = ''; // 12 require
    this.salesManagerId = 0; // 13 require
    this.salesManagerName = ''; // 14 require
    this.salesManagerMobile = ''; // 16 require
    this.enterpriseAdminMobile = ''; // 17 require
    this.version = 0; // 18 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

Enterprise.__json_class__ = 'BackboneSslc.Enterprise';

export class EnterpriseDetail {
  constructor() {
    this.enterpriseId = ''; // 0 require
    this.enterpriseName = ''; // 1 require
    this.industry = ''; // 2 require
    this.industryKeyValue = ''; // 3 require
    this.registerDate = null; // 4 require
    this.verifyStatus = ''; // 5 require
    this.frozen = ''; // 6 require
    this.verifyTime = null; // 7 require
    this.verifierId = 0; // 8 require
    this.verifier = ''; // 9 require
    this.salesId = 0; // 10 require
    this.salesName = ''; // 11 require
    this.salesMobile = ''; // 12 require
    this.salesManagerId = 0; // 13 require
    this.salesManagerName = ''; // 14 require
    this.salesManagerMobile = ''; // 16 require
    this.enterpriseAdminMobile = ''; // 17 require
    this.version = 0; // 18 require
    this.enterpriseType = ''; // 19 require
    this.uscc = ''; // 20 require
    this.usccEditFlag = ''; // 21 require
    this.certificate = 0; // 22 require
    this.enterpriseAbbre = ''; // 23 require
    this.enterpriseLogo = 0; // 24 require
    this.enterpriseLogoSmall = 0; // 25 require
    this.region = []; // 26 require
    this.provinceName = ''; // 27 require
    this.cityName = ''; // 28 require
    this.areaName = ''; // 29 require
    this.address = ''; // 30 require
    this.businessTermStart = null; // 31 require
    this.businessTermEnd = null; // 32 require
    this.businessTermFlg = ''; // 33 require
    this.enterpriseTel = ''; // 34 require
    this.enterpriseMail = ''; // 35 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

EnterpriseDetail.__json_class__ = 'BackboneSslc.EnterpriseDetail';

export class EnterpriseIn {
  constructor() {
    this.enterpriseName = ''; // 0 require
    this.enterpriseType = ''; // 1 require
    this.industry = ''; // 2 require
    this.uscc = ''; // 3 require
    this.certificate = 0; // 4 require
    this.enterpriseAbbre = ''; // 5 optional
    this.enterpriseLogo = 0; // 6 optional
    this.enterpriseLogoSmall = 0; // 7 optional
    this.region = []; // 8 require
    this.address = ''; // 9 require
    this.businessTermStart = null; // 10 optional
    this.businessTermEnd = null; // 11 optional
    this.businessTermFlg = ''; // 12 optional
    this.enterpriseTel = ''; // 13 require
    this.enterpriseMail = ''; // 14 require
    this.verifyStatus = ''; // 15 optional
    this.frozen = ''; // 16 optional
    this.salesId = 0; // 17 require
    this.salesManagerId = 0; // 18 optional
    this.platformFlag = ''; // 19 optional
  }

  dump() {
    return JSON.stringify(this);
  }
}

EnterpriseIn.__json_class__ = 'BackboneSslc.EnterpriseIn';

export class HardwareProduct {
  constructor() {
    this.id = 0; // 0 require
    this.brandName = ''; // 1 require
    this.seriesNo = ''; // 2 require
    this.seriesName = ''; // 3 require
    this.productNo = ''; // 4 require
    this.productName = ''; // 5 require
    this.modelNo = ''; // 6 require
    this.modelName = ''; // 7 require
    this.serialNo = ''; // 8 require
    this.macOrImei = ''; // 9 require
    this.activateDate = null; // 10 require
    this.maintenanceStatus = ''; // 11 require
    this.hardwareStatus = ''; // 12 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

HardwareProduct.__json_class__ = 'BackboneSslc.HardwareProduct';

export class HardwareDetailItem {
  constructor() {
    this.createTime = null; // 0 require
    this.hardwareStatus = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

HardwareDetailItem.__json_class__ = 'BackboneSslc.HardwareDetailItem';

export class HardwareProductDetail {
  constructor() {
    this.enterpriseId = ''; // 0 require
    this.enterpriseName = ''; // 1 require
    this.seriesNo = ''; // 2 require
    this.seriesName = ''; // 3 require
    this.productNo = ''; // 4 require
    this.productName = ''; // 5 require
    this.modelNo = ''; // 6 require
    this.modelName = ''; // 7 require
    this.serialNo = ''; // 8 require
    this.macOrImei = ''; // 9 require
    this.deviceSecret = ''; // 10 require
    this.detailList = []; // 11 require
    this.createTime = null; // 12 require
    this.hardwareStatus = ''; // 13 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

HardwareProductDetail.__json_class__ = 'BackboneSslc.HardwareProductDetail';

export class SoftwareProduct {
  constructor() {
    this.id = 0; // 0 require
    this.orderSoftwareId = 0; // 1 require
    this.orderSoftwareId = 0; // 2 require
    this.enterpriseId = ''; // 3 require
    this.enterpriseName = ''; // 4 require
    this.serviceNo = ''; // 5 require
    this.serviceName = ''; // 6 require
    this.moduleNo = ''; // 7 require
    this.moduleName = ''; // 8 require
    this.buyDate = null; // 9 require
    this.accountNum = 0; // 10 require
    this.availableAccountNum = 0; // 11 require
    this.startUsingDate = null; // 12 require
    this.endUsingDate = null; // 13 require
    this.startUsingPeopleId = 0; // 14 require
    this.startUsingPeople = ''; // 15 require
    this.softwareStatus = ''; // 16 require
    this.version = 0; // 17 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SoftwareProduct.__json_class__ = 'BackboneSslc.SoftwareProduct';

export class SoftwareDetailItem {
  constructor() {
    this.createTime = null; // 0 require
    this.softwareStatus = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SoftwareDetailItem.__json_class__ = 'BackboneSslc.SoftwareDetailItem';

export class SoftwareProductDetail {
  constructor() {
    this.serviceName = ''; // 0 require
    this.moduleNo = ''; // 1 require
    this.moduleName = ''; // 2 require
    this.serviceLifeFrom = null; // 3 require
    this.serviceLifeTo = null; // 4 require
    this.list = []; // 5 require
    this.activateDate = null; // 6 require
    this.useMonth = 0; // 7 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SoftwareProductDetail.__json_class__ = 'BackboneSslc.SoftwareProductDetail';

export class Account {
  constructor() {
    this.id = 0; // 0 require
    this.accountLicence = ''; // 1 require
    this.startDate = null; // 2 require
    this.useMonth = 0; // 3 require
    this.customerAdminName = ''; // 4 require
    this.customerAdminMobile = ''; // 5 require
    this.customerAdminAccount = ''; // 6 require
    this.accountStatus = ''; // 7 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

Account.__json_class__ = 'BackboneSslc.Account';

export class AccountDetailItem {
  constructor() {
    this.createTime = null; // 0 require
    this.activateDate = null; // 1 require
    this.renewFlg = ''; // 2 require
    this.useMonth = 0; // 3 require
    this.accountStatus = ''; // 4 require
    this.customerAdminName = ''; // 5 require
    this.customerAdminMobile = ''; // 6 require
    this.customerAdminAccount = ''; // 7 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

AccountDetailItem.__json_class__ = 'BackboneSslc.AccountDetailItem';

export class AccountDetail {
  constructor() {
    this.enterpriseId = ''; // 0 require
    this.enterpriseName = ''; // 1 require
    this.serviceNo = ''; // 2 require
    this.serviceName = ''; // 3 require
    this.moduleNo = ''; // 4 require
    this.moduleName = ''; // 5 require
    this.accountLicence = ''; // 6 require
    this.list = []; // 7 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

AccountDetail.__json_class__ = 'BackboneSslc.AccountDetail';

export class SoftwareServiceOption {
  constructor() {
    this.serviceNo = ''; // 0 require
    this.serviceName = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SoftwareServiceOption.__json_class__ = 'BackboneSslc.SoftwareServiceOption';

export class SoftwareModuleOption {
  constructor() {
    this.moduleNo = ''; // 0 require
    this.moduleName = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SoftwareModuleOption.__json_class__ = 'BackboneSslc.SoftwareModuleOption';

export class HardwareBrandOption {
  constructor() {
    this.brandId = ''; // 0 require
    this.brandName = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

HardwareBrandOption.__json_class__ = 'BackboneSslc.HardwareBrandOption';

export class HardwareSeriesOption {
  constructor() {
    this.seriesNo = ''; // 0 require
    this.seriesName = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

HardwareSeriesOption.__json_class__ = 'BackboneSslc.HardwareSeriesOption';

export class HardwareProductOption {
  constructor() {
    this.productNo = ''; // 0 require
    this.productName = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

HardwareProductOption.__json_class__ = 'BackboneSslc.HardwareProductOption';

export class HardwareModelOption {
  constructor() {
    this.modelNo = ''; // 0 require
    this.modelName = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

HardwareModelOption.__json_class__ = 'BackboneSslc.HardwareModelOption';

// 客户管理接口类
export class EnterpriseInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'EnterpriseInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_enterprises({ enterpriseKey, actions, industry, verifyStatus, frozen, pageNum, pageSize, sortObj, context }) {
    let _params = {};
    // check require
    if (actions === undefined) {
      throw new RpcLogicValidationError('require argument "actions"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }

    // set argument into _params
    if (enterpriseKey !== undefined) {
      _params['enterpriseKey'] = enterpriseKey;
    }
    _params['actions'] = actions;
    if (industry !== undefined) {
      _params['industry'] = industry;
    }
    if (verifyStatus !== undefined) {
      _params['verifyStatus'] = verifyStatus;
    }
    if (frozen !== undefined) {
      _params['frozen'] = frozen;
    }
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['sortObj'] = sortObj;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/enterprise/v1/enterprises', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_enterprises_verify({ updateTime, companyKey, appraiseStatus, pageNum, pageSize, sortObj, context }) {
    let _params = {};
    // check require
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }
    if (updateTime === undefined) {
      throw new RpcLogicValidationError('require argument "updateTime"');
    }
    if (appraiseStatus === undefined) {
      throw new RpcLogicValidationError('require argument "appraiseStatus"');
    }

    // set argument into _params
    _params['updateTime'] = updateTime;
    _params['companyKey'] = companyKey;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['sortObj'] = sortObj;
    _params['appraiseStatus'] = appraiseStatus;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/company/companies_appraise', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  get_enterprise_detail({ company_id, context }) {
    let _params = {};
    // check require
    if (company_id === undefined) {
      throw new RpcLogicValidationError('require argument "company_id"');
    }

    // set argument into _params
    // _params["enterpriseId"] = enterpriseId;
    // prepare url
    let customArgs = {};
    customArgs['company_id'] = company_id;
    let _url = this._genCustomUrl('/software_maintenance/company/companies/{company_id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  //客服中心
  get_enterprise_service({ companyName, replyStatus, createDate, pageNum, pageSize, context }) {
    let _params = {};
    // prepare url
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['companyName'] = companyName;
    _params['createDate'] = createDate;
    _params['replyStatus'] = replyStatus;

    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/contact_us/ver1/contact_us_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  //回复历史列表
  get_enterprise_service_replyHistory({
    replyStatus,
    contactUsId,
    createDate,
    customerServiceName,
    pageNum,
    pageSize,
    context
  }) {
    let _params = {};
    _params['contactUsId'] = contactUsId;
    _params['createDate'] = createDate;
    _params['customerServiceName'] = customerServiceName;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['replyStatus'] = replyStatus;
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl('/software_maintenance/contact_us/ver1/get_contact_us_reply_history', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  //客户列表
  get_custom_customList({ companyKey, appraiseStatus, saleAgentName, pageNum, pageSize, sortObj, context }) {
    let _params = {};
    // check require
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    // set argument into _params
    if (companyKey !== undefined) {
      _params['companyKey'] = companyKey;
    }

    if (appraiseStatus !== undefined && appraiseStatus !== 'all') {
      _params['appraiseStatus'] = appraiseStatus;
    }

    if (saleAgentName) {
      _params['saleAgentName'] = saleAgentName;
    }
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['sortObj'] = sortObj;
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl('/software_maintenance/customermanage/ver1/get_company_list/', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  //客户订单管理列表
  get_custom_customOrderList({
    company_id,
    orderStatus,
    orderType,
    createDate,
    orderId,
    softwareModuleCode,
    pageNum,
    pageSize,
    sortObj,
    context
  }) {
    let _params = {};
    // check require
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (createDate !== undefined) {
      _params['createDate'] = createDate;
    }
    if (orderId !== undefined) {
      _params['orderId'] = orderId;
    }
    if (softwareModuleCode !== undefined) {
      _params['softwareModuleCode'] = softwareModuleCode;
    }
    if (orderStatus !== undefined && orderStatus !== 'all') {
      _params['orderStatus'] = orderStatus;
    }
    if (orderType !== undefined && orderType !== 'all') {
      _params['orderType'] = orderType;
    }
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['sortObj'] = sortObj;

    // prepare url
    let customArgs = {};
    customArgs['company_id'] = company_id;
    let _url = this._genCustomUrl(
      '/software_maintenance/customermanage/ver1/get_customer_order_manage_list/{company_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  //客户订单作废
  cancelCustomOrder({ customerOrderId, companyId, version, context }) {
    let _params = {};
    // check require
    if (customerOrderId === undefined) {
      throw new RpcLogicValidationError('require argument "customerOrderId"');
    }
    if (companyId !== undefined) {
      _params['companyId'] = companyId;
    }
    if (version !== undefined) {
      _params['version'] = version;
    }
    // prepare url
    let customArgs = {};
    customArgs['customer_order_id'] = customerOrderId;
    let _url = this._genCustomUrl(
      '/software_maintenance/customermanage/ver1/cancel_customer_order/{customer_order_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
  //企业信息
  get_company_Info({ company_id, context }) {
    let _params = {};
    // prepare url
    let customArgs = {};
    customArgs['company_id'] = company_id;
    let _url = this._genCustomUrl(
      '/software_maintenance/customermanage/ver1/get_company_detail/{company_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  //企业变更记录
  get_company_changeRecord({ company_id, context }) {
    let _params = {};
    // prepare url
    let customArgs = {};
    customArgs['company_id'] = company_id;
    let _url = this._genCustomUrl(
      '/software_maintenance/customermanage/ver1/get_company_modify_history/{company_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  //管理员变更历史记录
  get_admin_changeHistory({ company_id, context }) {
    let _params = {};
    // prepare url
    let customArgs = {};
    customArgs['company_id'] = company_id;
    let _url = this._genCustomUrl(
      '/software_maintenance/customermanage/ver1/get_administrator_replace_history/{company_id}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  //新增回复
  add_reply({ comment, contactUsId, customerServiceName, replyStatus, replyWay, context }) {
    // prepare url
    let customArgs = {};
    let _params = {};
    _params['contactUsId'] = contactUsId;
    _params['customerServiceName'] = customerServiceName;
    _params['replyStatus'] = replyStatus;
    _params['comment'] = comment;
    _params['replyWay'] = replyWay;
    console.log('addReply', _params);

    let _url = this._genCustomUrl('/software_maintenance/contact_us/ver1/contact_us_reply', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  //指定管理员解锁
  get_enterprises_Unlocking({ mobile, context }) {
    let _params = {};
    _params['mobile'] = mobile;
    let customArgs = {};
    let _url = this._genCustomUrl('/base/enterprisecustomer/v1/unlocking/user', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  verify_enterprises_and_uscc({ enterpriseId, enterpriseName, uscc, context }) {
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (enterpriseName === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseName"');
    }
    if (uscc === undefined) {
      throw new RpcLogicValidationError('require argument "uscc"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    _params['enterpriseName'] = enterpriseName;
    _params['uscc'] = uscc;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/enterprise/v1/verify_enterprises_and_uscc', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  get_enterprise_lastest_history({ company_id, context }) {
    let _params = {};
    // check require
    if (company_id === undefined) {
      throw new RpcLogicValidationError('require argument "company_id"');
    }

    // set argument into _params
    // _params["enterpriseId"] = enterpriseId;
    // prepare url
    let customArgs = {};
    customArgs['company_id'] = company_id;
    let _url = this._genCustomUrl('/software_maintenance/company/companies_latest_history/{company_id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  add_enterprise({
    enterpriseName,
    enterpriseType,
    industry,
    uscc,
    certificate,
    enterpriseAbbre,
    enterpriseLogo,
    enterpriseLogoSmall,
    region,
    address,
    businessTermStart,
    businessTermEnd,
    businessTermFlg,
    enterpriseTel,
    enterpriseMail,
    verifyStatus,
    frozen,
    salesId,
    salesManagerId,
    platformFlag,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (enterpriseName === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseName"');
    }
    if (enterpriseType === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseType"');
    }
    if (industry === undefined) {
      throw new RpcLogicValidationError('require argument "industry"');
    }
    if (uscc === undefined) {
      throw new RpcLogicValidationError('require argument "uscc"');
    }
    if (certificate === undefined) {
      throw new RpcLogicValidationError('require argument "certificate"');
    }
    if (region === undefined) {
      throw new RpcLogicValidationError('require argument "region"');
    }
    if (address === undefined) {
      throw new RpcLogicValidationError('require argument "address"');
    }
    if (enterpriseTel === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseTel"');
    }
    if (enterpriseMail === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseMail"');
    }
    if (salesId === undefined) {
      throw new RpcLogicValidationError('require argument "salesId"');
    }

    // set argument into _params
    _params['enterpriseName'] = enterpriseName;
    _params['enterpriseType'] = enterpriseType;
    _params['industry'] = industry;
    _params['uscc'] = uscc;
    _params['certificate'] = certificate;
    if (enterpriseAbbre !== undefined) {
      _params['enterpriseAbbre'] = enterpriseAbbre;
    }
    if (enterpriseLogo !== undefined) {
      _params['enterpriseLogo'] = enterpriseLogo;
    }
    if (enterpriseLogoSmall !== undefined) {
      _params['enterpriseLogoSmall'] = enterpriseLogoSmall;
    }
    _params['region'] = region;
    _params['address'] = address;
    if (businessTermStart !== undefined) {
      _params['businessTermStart'] = businessTermStart;
    }
    if (businessTermEnd !== undefined) {
      _params['businessTermEnd'] = businessTermEnd;
    }
    if (businessTermFlg !== undefined) {
      _params['businessTermFlg'] = businessTermFlg;
    }
    _params['enterpriseTel'] = enterpriseTel;
    _params['enterpriseMail'] = enterpriseMail;
    if (verifyStatus !== undefined) {
      _params['verifyStatus'] = verifyStatus;
    }
    if (frozen !== undefined) {
      _params['frozen'] = frozen;
    }
    _params['salesId'] = salesId;
    if (salesManagerId !== undefined) {
      _params['salesManagerId'] = salesManagerId;
    }
    if (platformFlag !== undefined) {
      _params['platformFlag'] = platformFlag;
    }
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/enterprise/v1/enterprises', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  edit_enterprise({
    enterprise_id,
    enterpriseId,
    enterpriseName,
    enterpriseType,
    industry,
    uscc,
    certificate,
    enterpriseAbbre,
    enterpriseLogo,
    enterpriseLogoSmall,
    region,
    address,
    businessTermStart,
    businessTermEnd,
    businessTermFlg,
    enterpriseTel,
    enterpriseMail,
    verifyStatus,
    frozen,
    salesId,
    salesManagerId,
    platformFlag,
    version,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (enterpriseName === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseName"');
    }
    if (enterpriseType === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseType"');
    }
    if (industry === undefined) {
      throw new RpcLogicValidationError('require argument "industry"');
    }
    if (uscc === undefined) {
      throw new RpcLogicValidationError('require argument "uscc"');
    }
    if (certificate === undefined) {
      throw new RpcLogicValidationError('require argument "certificate"');
    }
    if (region === undefined) {
      throw new RpcLogicValidationError('require argument "region"');
    }
    if (address === undefined) {
      throw new RpcLogicValidationError('require argument "address"');
    }
    if (enterpriseTel === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseTel"');
    }
    if (enterpriseMail === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseMail"');
    }
    if (salesId === undefined) {
      throw new RpcLogicValidationError('require argument "salesId"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    _params['enterpriseName'] = enterpriseName;
    _params['enterpriseType'] = enterpriseType;
    _params['industry'] = industry;
    _params['uscc'] = uscc;
    _params['certificate'] = certificate;
    if (enterpriseAbbre !== undefined) {
      _params['enterpriseAbbre'] = enterpriseAbbre;
    }
    if (enterpriseLogo !== undefined) {
      _params['enterpriseLogo'] = enterpriseLogo;
    }
    if (enterpriseLogoSmall !== undefined) {
      _params['enterpriseLogoSmall'] = enterpriseLogoSmall;
    }
    _params['region'] = region;
    _params['address'] = address;
    if (businessTermStart !== undefined) {
      _params['businessTermStart'] = businessTermStart;
    }
    if (businessTermEnd !== undefined) {
      _params['businessTermEnd'] = businessTermEnd;
    }
    if (businessTermFlg !== undefined) {
      _params['businessTermFlg'] = businessTermFlg;
    }
    _params['enterpriseTel'] = enterpriseTel;
    _params['enterpriseMail'] = enterpriseMail;
    if (verifyStatus !== undefined) {
      _params['verifyStatus'] = verifyStatus;
    }
    if (frozen !== undefined) {
      _params['frozen'] = frozen;
    }
    _params['salesId'] = salesId;
    if (salesManagerId !== undefined) {
      _params['salesManagerId'] = salesManagerId;
    }
    if (platformFlag !== undefined) {
      _params['platformFlag'] = platformFlag;
    }
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['enterprise_id'] = enterprise_id;
    let _url = this._genCustomUrl('/base/enterprise/v1/enterprises/{enterprise_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  activate_enterprise({ enterprise_id, enterpriseId, version, context }) {
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['enterprise_id'] = enterprise_id;
    let _url = this._genCustomUrl('/base/enterprise/v1/activate_enterprise/{enterprise_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  lock_enterprise({ enterprise_id, enterpriseId, version, context }) {
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['enterprise_id'] = enterprise_id;
    let _url = this._genCustomUrl('/base/enterprise/v1/lock_enterprise/{enterprise_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  verify_enterprise({ company_id, companyId, appraiseStatus, rejectReason, companyTypeFlag, version, context }) {
    let _params = {};
    // check require
    if (companyId === undefined) {
      throw new RpcLogicValidationError('require argument "companyId"');
    }
    if (appraiseStatus === undefined) {
      throw new RpcLogicValidationError('require argument "appraiseStatus"');
    }
    // if (rejectReason === undefined) {
    //   throw new RpcLogicValidationError('require argument "rejectReason"');
    // }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['companyId'] = companyId;
    _params['appraiseStatus'] = appraiseStatus;
    _params['rejectReason'] = rejectReason;
    _params['version'] = version;

    if (companyTypeFlag) {
      _params['companyTypeFlag'] = companyTypeFlag;
    }
    // prepare url
    let customArgs = {};
    customArgs['company_id'] = company_id;
    let _url = this._genCustomUrl('/software_maintenance/company/appraise/{company_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  update_company_type({ companyId, companyTypeFlag, context }) {
    let _params = {};
    // check require
    if (companyId === undefined) {
      throw new RpcLogicValidationError('require argument "companyId"');
    }
    if (companyTypeFlag === undefined) {
      throw new RpcLogicValidationError('require argument "companyTypeFlag"');
    }

    // set argument into _params
    _params['companyTypeFlag'] = companyTypeFlag;
    // prepare url
    let customArgs = {};
    customArgs['company_id'] = companyId;
    let _url = this._genCustomUrl('/software_maintenance/company/ver1/update_company_type/{company_id}', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  assign_manager({ enterprise_id, enterpriseId, salesId, salesManagerId, version, context }) {
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    if (salesId !== undefined) {
      _params['salesId'] = salesId;
    }
    if (salesManagerId !== undefined) {
      _params['salesManagerId'] = salesManagerId;
    }
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['enterprise_id'] = enterprise_id;
    let _url = this._genCustomUrl('/base/enterprise/v1/assign_manager/{enterprise_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  set_enterprise_admin({ enterpriseId, enterpriseAdminMobile, enterpriseAdminMail, version, context }) {
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (enterpriseAdminMobile === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseAdminMobile"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    _params['enterpriseAdminMobile'] = enterpriseAdminMobile;
    if (enterpriseAdminMail !== undefined) {
      _params['enterpriseAdminMail'] = enterpriseAdminMail;
    }
    _params['version'] = version;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/enterprise/v1/set_enterprise_admin_user', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  check_enterprise_user_admin({ enterpriseId, mobile, context }) {
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (mobile === undefined) {
      throw new RpcLogicValidationError('require argument "mobile"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    _params['mobile'] = mobile;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/enterprise/customer_auth/v1/check_enterprise_user_exist_and_admin', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_product_list({
    enterpriseId,
    brandId,
    seriesNo,
    productNo,
    modelNo,
    serialNo,
    macOrImei,
    maintenanceStatus,
    hardwareStatus,
    activateDateFrom,
    activateDateTo,
    pageNum,
    pageSize,
    sortObj,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    if (brandId !== undefined) {
      _params['brandId'] = brandId;
    }
    if (seriesNo !== undefined) {
      _params['seriesNo'] = seriesNo;
    }
    if (productNo !== undefined) {
      _params['productNo'] = productNo;
    }
    if (modelNo !== undefined) {
      _params['modelNo'] = modelNo;
    }
    if (serialNo !== undefined) {
      _params['serialNo'] = serialNo;
    }
    if (macOrImei !== undefined) {
      _params['macOrImei'] = macOrImei;
    }
    if (maintenanceStatus !== undefined) {
      _params['maintenanceStatus'] = maintenanceStatus;
    }
    if (hardwareStatus !== undefined) {
      _params['hardwareStatus'] = hardwareStatus;
    }
    if (activateDateFrom !== undefined) {
      _params['activateDateFrom'] = activateDateFrom;
    }
    if (activateDateTo !== undefined) {
      _params['activateDateTo'] = activateDateTo;
    }
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['sortObj'] = sortObj;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/get_hardware_of_enterprise_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_product_detail({ enterpriseHardwareId, context }) {
    let _params = {};
    // check require
    if (enterpriseHardwareId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseHardwareId"');
    }

    // set argument into _params
    _params['enterpriseHardwareId'] = enterpriseHardwareId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/get_hardware_of_enterprise_history_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_software_product_list({
    enterpriseId,
    serviceNo,
    moduleNo,
    buyDateFrom,
    buyDateTo,
    softwareStatus,
    pageNum,
    pageSize,
    sortObj,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    if (serviceNo !== undefined) {
      _params['serviceNo'] = serviceNo;
    }
    if (moduleNo !== undefined) {
      _params['moduleNo'] = moduleNo;
    }
    if (buyDateFrom !== undefined) {
      _params['buyDateFrom'] = buyDateFrom;
    }
    if (buyDateTo !== undefined) {
      _params['buyDateTo'] = buyDateTo;
    }
    if (softwareStatus !== undefined) {
      _params['softwareStatus'] = softwareStatus;
    }
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['sortObj'] = sortObj;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/get_software_of_enterprise_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_software_product_detail({ id, orderSoftwareId, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (orderSoftwareId === undefined) {
      throw new RpcLogicValidationError('require argument "orderSoftwareId"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['orderSoftwareId'] = orderSoftwareId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/get_software_of_enterprise_history_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_account_list({
    enterpriseId,
    serviceNo,
    moduleNo,
    useStatus,
    binderKey,
    validityTermFrom,
    validityTermTo,
    accountStatus,
    pageNum,
    pageSize,
    sortObj,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (serviceNo === undefined) {
      throw new RpcLogicValidationError('require argument "serviceNo"');
    }
    if (moduleNo === undefined) {
      throw new RpcLogicValidationError('require argument "moduleNo"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    _params['serviceNo'] = serviceNo;
    _params['moduleNo'] = moduleNo;
    if (useStatus !== undefined) {
      _params['useStatus'] = useStatus;
    }
    if (binderKey !== undefined) {
      _params['binderKey'] = binderKey;
    }
    if (validityTermFrom !== undefined) {
      _params['validityTermFrom'] = validityTermFrom;
    }
    if (validityTermTo !== undefined) {
      _params['validityTermTo'] = validityTermTo;
    }
    if (accountStatus !== undefined) {
      _params['accountStatus'] = accountStatus;
    }
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['sortObj'] = sortObj;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/get_account_of_enterprise_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_account_detail({ id, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }

    // set argument into _params
    _params['id'] = id;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/get_account_of_enterprise_history_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_enterprise_id_list_by_sales_manager({ sales_manager_id, context }) {
    let _params = {};
    // check require
    if (sales_manager_id === undefined) {
      throw new RpcLogicValidationError('require argument "sales_manager_id"');
    }

    // set argument into _params
    _params['sales_manager_id'] = sales_manager_id;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/enterprise/v1/get_enterprise_id_list_by_sales_manager', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_enterprise_logos({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/customer_auth/v1/get_enterprise_logos', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_software_service_option_list({ enterpriseId, context }) {
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/get_software_service_option_list_by_customer_buy', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_software_module_option_list({ enterpriseId, serviceNo, context }) {
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (serviceNo === undefined) {
      throw new RpcLogicValidationError('require argument "serviceNo"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    _params['serviceNo'] = serviceNo;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/get_software_service_module_option_list_by_customer_buy', customArgs); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_brand_option_list({ enterpriseId, context }) {
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/get_hardware_brand_option_list_by_customer_buy', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_series_option_list({ enterpriseId, brandId, context }) {
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (brandId === undefined) {
      throw new RpcLogicValidationError('require argument "brandId"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    _params['brandId'] = brandId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/get_hardware_series_option_list_by_customer_buy', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_product_option_list({ enterpriseId, seriesNo, context }) {
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (seriesNo === undefined) {
      throw new RpcLogicValidationError('require argument "seriesNo"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    _params['seriesNo'] = seriesNo;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/get_hardware_product_option_list_by_customer_buy', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_hardware_model_option_list({ enterpriseId, productNo, context }) {
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (productNo === undefined) {
      throw new RpcLogicValidationError('require argument "productNo"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    _params['productNo'] = productNo;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/get_hardware_model_option_list_by_customer_buy', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}

export class ModuleItem {
  constructor() {
    this.id = 0; // 0 require
    this.moduleNo = ''; // 1 require
    this.moduleName = ''; // 2 require
    this.module_accounts = 0; // 4 optional
  }

  dump() {
    return JSON.stringify(this);
  }
}

ModuleItem.__json_class__ = 'BackboneSslc.ModuleItem';

export class ServiceItem {
  constructor() {
    this.id = 0; // 0 require
    this.serviceNo = ''; // 1 require
    this.serviceName = ''; // 2 require
    this.serviceModules = []; // 3 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ServiceItem.__json_class__ = 'BackboneSslc.ServiceItem';

export class ServiceDetail {
  constructor() {
    this.id = 0; // 0 require
    this.serviceId = 0; // 1 require
    this.serviceNo = ''; // 2 require
    this.serviceName = ''; // 3 require
    this.moduleNo = ''; // 4 require
    this.moduleName = ''; // 5 require
    this.moduleCost = ''; // 6 require
    this.moduleAccounts = 0; // 7 require
    this.moduleLogo = 0; // 8 require
    this.description = ''; // 9 require
    this.upShelfStatus = ''; // 10 require
    this.appId = ''; // 11 require
    this.secretKey = ''; // 12 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ServiceDetail.__json_class__ = 'BackboneSslc.ServiceDetail';

export class ModelItem {
  constructor() {
    this.id = 0; // 0 require
    this.modelNo = ''; // 1 require
    this.modelName = ''; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ModelItem.__json_class__ = 'BackboneSslc.ModelItem';

export class ProductItem {
  constructor() {
    this.id = 0; // 0 require
    this.productNo = ''; // 1 require
    this.productName = ''; // 2 require
    this.models = []; // 3 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ProductItem.__json_class__ = 'BackboneSslc.ProductItem';

export class SeriesItem {
  constructor() {
    this.id = 0; // 0 require
    this.seriesNo = ''; // 1 require
    this.seriesName = ''; // 2 require
    this.products = []; // 3 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SeriesItem.__json_class__ = 'BackboneSslc.SeriesItem';

export class BrandItem {
  constructor() {
    this.id = 0; // 0 require
    this.brandName = ''; // 1 require
    this.series = []; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

BrandItem.__json_class__ = 'BackboneSslc.BrandItem';

export class EnterpriseOption {
  constructor() {
    this.enterpriseId = ''; // 0 require
    this.enterpriseName = ''; // 1 require
    this.enterpriseAbbre = ''; // 2 require
    this.tel = ''; // 3 require
    this.salesId = 0; // 4 require
    this.salesManagerId = 0; // 5 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

EnterpriseOption.__json_class__ = 'BackboneSslc.EnterpriseOption';

export class SoftwareInfo {
  constructor() {
    this.id = 0; // 0 require
    this.orderSoftwareType = ''; // 1 require
    this.serviceNo = ''; // 2 require
    this.serviceName = ''; // 3 require
    this.moduleNo = ''; // 4 require
    this.moduleName = ''; // 5 require
    this.price = ''; // 6 require
    this.useMonth = 0; // 7 require
    this.accountNum = 0; // 8 require
    this.softwareStatus = ''; // 9 require
    this.secretKey = ''; // 10 require
    this.version = 0; // 11 require
    this.firstActivated = ''; // 12 require
    this.firstActivateDate = null; // 13 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SoftwareInfo.__json_class__ = 'BackboneSslc.SoftwareInfo';

export class HardwareInfo {
  constructor() {
    this.id = 0; // 0 require
    this.brandId = 0; // 1 require
    this.brandName = ''; // 2 require
    this.seriesNo = ''; // 3 require
    this.seriesName = ''; // 4 require
    this.productNo = ''; // 5 require
    this.productName = ''; // 6 require
    this.modelNo = ''; // 7 require
    this.modelName = ''; // 8 require
    this.orderNumber = ''; // 9 require
    this.price = ''; // 10 require
    this.hardCount = 0; // 11 require
    this.serialNo = ''; // 12 require
    this.hardwareStatus = ''; // 13 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

HardwareInfo.__json_class__ = 'BackboneSslc.HardwareInfo';

export class Order {
  constructor() {
    this.orderId = ''; // 0 require
    this.orderStatus = ''; // 1 require
    this.enterpriseId = ''; // 2 require
    this.enterpriseName = ''; // 3 require
    this.totalAmount = ''; // 4 require
    this.paymentAmount = ''; // 5 require
    this.softwareList = []; // 6 require
    this.hardwareList = []; // 7 require
    this.softwareActivatedFlag = ''; // 8 require
    this.version = 0; // 9 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

Order.__json_class__ = 'BackboneSslc.Order';

export class SoftwareDetail {
  constructor() {
    this.orderSoftwareType = ''; // 1 require
    this.serviceNo = ''; // 2 require
    this.serviceName = ''; // 3 require
    this.moduleNo = ''; // 4 require
    this.moduleName = ''; // 5 require
    this.price = ''; // 6 require
    this.useMonth = 0; // 7 require
    this.accountNum = 0; // 8 require
    this.softwareStatus = ''; // 9 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

SoftwareDetail.__json_class__ = 'BackboneSslc.SoftwareDetail';

export class HardwareDetail {
  constructor() {
    this.brandId = 0; // 1 require
    this.brandName = ''; // 2 require
    this.seriesNo = ''; // 3 require
    this.seriesName = ''; // 4 require
    this.productNo = ''; // 5 require
    this.productName = ''; // 6 require
    this.modelNo = ''; // 7 require
    this.modelName = ''; // 8 require
    this.hardCount = 0; // 9 require
    this.serialNo = ''; // 10 require
    this.hardwareStatus = ''; // 11 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

HardwareDetail.__json_class__ = 'BackboneSslc.HardwareDetail';

export class OrderDetail {
  constructor() {
    this.enterpriseId = ''; // 0 require
    this.enterpriseName = ''; // 1 require
    this.enterpriseTel = ''; // 2 require
    this.salesId = ''; // 3 require
    this.salesManagerId = ''; // 4 require
    this.totalAmount = ''; // 5 require
    this.paymentAmount = ''; // 6 require
    this.orderStatus = ''; // 7 require
    this.softwareList = []; // 9 require
    this.hardwareList = []; // 10 require
    this.receiveGoodsOrderId = 0; // 11 require
    this.province = ''; // 12 require
    this.city = ''; // 13 require
    this.area = ''; // 14 require
    this.address = ''; // 15 require
    this.zipCode = ''; // 16 require
    this.receiveName = ''; // 17 require
    this.receiveMobile = ''; // 18 require
    this.createTime = 0; // 19 require
    this.version = ''; // 10 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

OrderDetail.__json_class__ = 'BackboneSslc.OrderDetail';

export class OrderSoftwareIn {
  constructor() {
    this.orderSoftwareType = ''; // 0 require
    this.serviceNo = ''; // 1 require
    this.serviceName = ''; // 2 require
    this.moduleNo = ''; // 3 require
    this.moduleName = ''; // 4 require
    this.price = ''; // 5 require
    this.useMonth = 0; // 6 require
    this.accountNum = 0; // 7 require
    this.renewAllFlag = ''; // 8 require
    this.renewAccountIds = []; // 9 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

OrderSoftwareIn.__json_class__ = 'BackboneSslc.OrderSoftwareIn';

export class OrderHardwareIn {
  constructor() {
    this.brandId = 0; // 0 require
    this.brandName = ''; // 1 require
    this.seriesNo = ''; // 2 require
    this.seriesName = ''; // 3 require
    this.productNo = ''; // 4 require
    this.productName = ''; // 5 require
    this.modelNo = ''; // 6 require
    this.modelName = ''; // 7 require
    this.Price = ''; // 8 require
    this.hardCount = 0; // 9 require
    this.serialNo = ''; // 10 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

OrderHardwareIn.__json_class__ = 'BackboneSslc.OrderHardwareIn';

export class OrderIn {
  constructor() {
    this.enterpriseId = ''; // 0 require
    this.enterpriseName = ''; // 1 require
    this.salesId = 0; // 2 require
    this.salesManagerId = 0; // 3 require
    this.totalAmount = ''; // 4 require
    this.paymentAmount = ''; // 5 require
    this.softwareList = []; // 6 require
    this.hardwareList = []; // 7 require
    this.originType = ''; // 8 require
    this.receiveGoodsOrderId = 0; // 9 optional
  }

  dump() {
    return JSON.stringify(this);
  }
}

OrderIn.__json_class__ = 'BackboneSslc.OrderIn';

export class AccountItem {
  constructor() {
    this.id = 0; // 0 require
    this.customerAdminAccount = ''; // 1 require
    this.customerAdminName = ''; // 2 require
    this.customerAdminMobile = ''; // 3 require
    this.startDate = null; // 4 require
    this.validityTerm = null; // 5 require
    this.accountLicence = ''; // 6 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

AccountItem.__json_class__ = 'BackboneSslc.AccountItem';

export class DeliveryAddress {
  constructor() {
    this.id = 0; // 0 require
    this.enterpriseId = ''; // 1 require
    this.enterpriseName = ''; // 2 require
    this.province = ''; // 3 require
    this.city = ''; // 4 require
    this.area = ''; // 5 require
    this.address = ''; // 6 require
    this.zipCode = ''; // 7 require
    this.receiveName = ''; // 8 require
    this.receiveMobile = ''; // 9 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

DeliveryAddress.__json_class__ = 'BackboneSslc.DeliveryAddress';

export class DeliveryAddressDetail {
  constructor() {
    this.id = 0; // 0 require
    this.enterpriseId = ''; // 1 require
    this.enterpriseName = ''; // 2 require
    this.region = []; // 3 require
    this.province = ''; // 4 require
    this.city = ''; // 5 require
    this.area = ''; // 6 require
    this.address = ''; // 7 require
    this.zipCode = ''; // 8 require
    this.receiveName = ''; // 9 require
    this.receiveMobile = ''; // 10 require
    this.version = 0; // 11 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

DeliveryAddressDetail.__json_class__ = 'BackboneSslc.DeliveryAddressDetail';

// 订单接口类
export class OrderInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'OrderInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_order_software_structure({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/software_structure/v1/order_software_structure', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_order_software_renew_structure({ enterprise_id, enterpriseId, context }) {
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    // prepare url
    let customArgs = {};
    customArgs['enterprise_id'] = enterprise_id;
    let _url = this._genCustomUrl('/base/order/v1/order_software_structure_renew/{enterprise_id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_detail_by_no_publish({ module_no, moduleNo, context }) {
    let _params = {};
    // check require
    if (moduleNo === undefined) {
      throw new RpcLogicValidationError('require argument "moduleNo"');
    }

    // set argument into _params
    _params['moduleNo'] = moduleNo;
    // prepare url
    let customArgs = {};
    customArgs['module_no'] = module_no;
    let _url = this._genCustomUrl(
      '/base/software_service_module/v1/software_service_modules/get_detail_by_no_publish/{module_no}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_detail_by_customer_buy({ moduleNo, enterpriseId, serviceNo, context }) {
    let _params = {};
    // check require
    if (moduleNo === undefined) {
      throw new RpcLogicValidationError('require argument "moduleNo"');
    }
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (serviceNo === undefined) {
      throw new RpcLogicValidationError('require argument "serviceNo"');
    }

    // set argument into _params
    _params['moduleNo'] = moduleNo;
    _params['enterpriseId'] = enterpriseId;
    _params['serviceNo'] = serviceNo;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/get_software_service_detail_by_customer_buy', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_order_hardware_structure({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_structure/v1/order_hardware_structure', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_model_detail({ model_no, modelNo, context }) {
    let _params = {};
    // check require
    if (modelNo === undefined) {
      throw new RpcLogicValidationError('require argument "modelNo"');
    }

    // set argument into _params
    _params['modelNo'] = modelNo;
    // prepare url
    let customArgs = {};
    customArgs['model_no'] = model_no;
    let _url = this._genCustomUrl(
      '/base/hardware_model/v1/hardware_models/get_detail_by_no_publish/{model_no}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_model_detail_for_order({ seriesNo, productNo, modelNo, context }) {
    let _params = {};
    // check require
    if (seriesNo === undefined) {
      throw new RpcLogicValidationError('require argument "seriesNo"');
    }
    if (productNo === undefined) {
      throw new RpcLogicValidationError('require argument "productNo"');
    }
    if (modelNo === undefined) {
      throw new RpcLogicValidationError('require argument "modelNo"');
    }

    // set argument into _params
    _params['seriesNo'] = seriesNo;
    _params['productNo'] = productNo;
    _params['modelNo'] = modelNo;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/base/hardware_model/v1/hardware_models/get_detail_by_no_publish_for_order',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_all_enterprise_list({ enterpriseKey, actions, context }) {
    let _params = {};
    // check require
    if (enterpriseKey === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseKey"');
    }
    if (actions === undefined) {
      throw new RpcLogicValidationError('require argument "actions"');
    }

    // set argument into _params
    _params['enterpriseKey'] = enterpriseKey;
    _params['actions'] = actions;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/enterprise/v1/get_all_enterprise_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_renew_account_list({
    enterpriseId,
    serviceNo,
    moduleNo,
    useFlag,
    usePersonKey,
    accountOverdueFlag,
    validityTermFrom,
    validityTermTo,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (serviceNo === undefined) {
      throw new RpcLogicValidationError('require argument "serviceNo"');
    }
    if (moduleNo === undefined) {
      throw new RpcLogicValidationError('require argument "moduleNo"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    _params['serviceNo'] = serviceNo;
    _params['moduleNo'] = moduleNo;
    if (useFlag !== undefined) {
      _params['useFlag'] = useFlag;
    }
    if (usePersonKey !== undefined) {
      _params['usePersonKey'] = usePersonKey;
    }
    if (accountOverdueFlag !== undefined) {
      _params['accountOverdueFlag'] = accountOverdueFlag;
    }
    if (validityTermFrom !== undefined) {
      _params['validityTermFrom'] = validityTermFrom;
    }
    if (validityTermTo !== undefined) {
      _params['validityTermTo'] = validityTermTo;
    }
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/renew_account_search', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  delete_order({ order_id, orderId, version, context }) {
    let _params = {};
    // check require
    if (orderId === undefined) {
      throw new RpcLogicValidationError('require argument "orderId"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['orderId'] = orderId;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['order_id'] = order_id;
    let _url = this._genCustomUrl('/base/order/v1/orders/{order_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  activate_order({ p_id, id, startUsingDate, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (startUsingDate === undefined) {
      throw new RpcLogicValidationError('require argument "startUsingDate"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['startUsingDate'] = startUsingDate;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/order/v1/activate_order/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  activate_order_batch({ orderIds, startUsingDate, context }) {
    let _params = {};
    // check require
    if (orderIds === undefined) {
      throw new RpcLogicValidationError('require argument "orderIds"');
    }
    if (startUsingDate === undefined) {
      throw new RpcLogicValidationError('require argument "startUsingDate"');
    }

    // set argument into _params
    _params['orderIds'] = orderIds;
    _params['startUsingDate'] = startUsingDate;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/activate_order_batch', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  activate_order_software({ enterprise_software_id, enterpriseSoftwareId, context }) {
    let _params = {};
    // check require
    if (enterpriseSoftwareId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseSoftwareId"');
    }

    // set argument into _params
    _params['enterpriseSoftwareId'] = enterpriseSoftwareId;
    // prepare url
    let customArgs = {};
    customArgs['enterprise_software_id'] = enterprise_software_id;
    let _url = this._genCustomUrl('/base/order/v1/activate_order_software/{enterprise_software_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  activate_order_software_batch({ ids, context }) {
    let _params = {};
    // check require
    if (ids === undefined) {
      throw new RpcLogicValidationError('require argument "ids"');
    }

    // set argument into _params
    _params['ids'] = ids;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/activate_order_batch_in_enterprise', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  stop_order_software({ enterprise_software_id, enterpriseSoftwareId, version, context }) {
    let _params = {};
    // check require
    if (enterpriseSoftwareId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseSoftwareId"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['enterpriseSoftwareId'] = enterpriseSoftwareId;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['enterprise_software_id'] = enterprise_software_id;
    let _url = this._genCustomUrl('/base/order/v1/stop_order/{enterprise_software_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PATCH');
    return this.doRequest(req, context);
  }

  stop_order_software_batch({ ids, context }) {
    let _params = {};
    // check require
    if (ids === undefined) {
      throw new RpcLogicValidationError('require argument "ids"');
    }

    // set argument into _params
    _params['ids'] = ids;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/order/v1/stop_order_batch_in_enterprise', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  get_delivery_addresses({ enterpriseId, context }) {
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/enterprise_delivery_address/v1/enterprise_delivery_addresses', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_delivery_address_detail({ p_id, id, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }

    // set argument into _params
    _params['id'] = id;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl(
      '/base/enterprise_delivery_address/v1/enterprise_delivery_addresses/{p_id}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  add_delivery_address({ enterpriseId, region, address, zipCode, receiveName, receiveMobile, context }) {
    let _params = {};
    // check require
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (region === undefined) {
      throw new RpcLogicValidationError('require argument "region"');
    }
    if (address === undefined) {
      throw new RpcLogicValidationError('require argument "address"');
    }
    if (zipCode === undefined) {
      throw new RpcLogicValidationError('require argument "zipCode"');
    }
    if (receiveName === undefined) {
      throw new RpcLogicValidationError('require argument "receiveName"');
    }
    if (receiveMobile === undefined) {
      throw new RpcLogicValidationError('require argument "receiveMobile"');
    }

    // set argument into _params
    _params['enterpriseId'] = enterpriseId;
    _params['region'] = region;
    _params['address'] = address;
    _params['zipCode'] = zipCode;
    _params['receiveName'] = receiveName;
    _params['receiveMobile'] = receiveMobile;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/enterprise_delivery_address/v1/enterprise_delivery_addresses', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  edit_delivery_address({
    p_id,
    id,
    enterpriseId,
    region,
    address,
    zipCode,
    receiveName,
    receiveMobile,
    version,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (enterpriseId === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseId"');
    }
    if (region === undefined) {
      throw new RpcLogicValidationError('require argument "region"');
    }
    if (address === undefined) {
      throw new RpcLogicValidationError('require argument "address"');
    }
    if (zipCode === undefined) {
      throw new RpcLogicValidationError('require argument "zipCode"');
    }
    if (receiveName === undefined) {
      throw new RpcLogicValidationError('require argument "receiveName"');
    }
    if (receiveMobile === undefined) {
      throw new RpcLogicValidationError('require argument "receiveMobile"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['enterpriseId'] = enterpriseId;
    _params['region'] = region;
    _params['address'] = address;
    _params['zipCode'] = zipCode;
    _params['receiveName'] = receiveName;
    _params['receiveMobile'] = receiveMobile;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl(
      '/base/enterprise_delivery_address/v1/enterprise_delivery_addresses/{p_id}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_delivery_address({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl(
      '/base/enterprise_delivery_address/v1/enterprise_delivery_addresses/{p_id}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }
}

export class DeviceBrandName {
  constructor() {
    this.deviceBrandId = 0; // 0 require
    this.brandName = ''; // 1 require
    this.resource = ''; // 2 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

DeviceBrandName.__json_class__ = 'BackboneSslc.DeviceBrandName';

export class DevicePointModelDetail {
  constructor() {
    this.id = 0; // 0 require
    this.deviceBrandId = 0; // 1 require
    this.brandName = ''; // 2 require
    this.deviceModelId = 0; // 3 require
    this.modelName = ''; // 4 require
    this.deviceTypeId = 0; // 5 require
    this.typeName = ''; // 6 require
    this.protocolSettingId = 0; // 7 require
    this.protocolName = ''; // 8 require
    this.points = 0; // 9 require
    this.description = ''; // 10 require
    this.version = 0; // 11 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

DevicePointModelDetail.__json_class__ = 'BackboneSslc.DevicePointModelDetail';

export class BrandTypeModelIdName {
  constructor() {
    this.id = 0; // 0 require
    this.deviceBrandId = 0; // 1 require
    this.deviceModelId = 0; // 2 require
    this.deviceTypeId = 0; // 3 require
    this.brandName = ''; // 4 require
    this.modelName = ''; // 5 require
    this.typeName = ''; // 6 require
    this.protocolSettingId = 0; // 7 require
    this.protocolName = ''; // 8 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

BrandTypeModelIdName.__json_class__ = 'BackboneSslc.BrandTypeModelIdName';

export class PointParameterIdValue {
  constructor() {
    this.parameterConfigurationId = 0; // 0 require
    this.value = ''; // 1 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

PointParameterIdValue.__json_class__ = 'BackboneSslc.PointParameterIdValue';

export class ProtocolSettingPublish {
  constructor() {
    this.protocolSettingId = 0; // 0 require
    this.protocolCode = ''; // 1 require
    this.protocolName = ''; // 2 require
    this.channelType = ''; // 3 require
    this.upShelfStatus = ''; // 4 require
  }

  dump() {
    return JSON.stringify(this);
  }
}

ProtocolSettingPublish.__json_class__ = 'BackboneSslc.ProtocolSettingPublish';

// 设备管理接口类
export class DeviceInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'DeviceInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_brands({ brandName, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (brandName === undefined) {
      throw new RpcLogicValidationError('require argument "brandName"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['brandName'] = brandName;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/brand/v1/brands', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_brand_detail({ p_id, id, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }

    // set argument into _params
    _params['id'] = id;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/brand/v1/brands/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_brand({ brandName, brandLogo, description, context }) {
    let _params = {};
    // check require
    if (brandName === undefined) {
      throw new RpcLogicValidationError('require argument "brandName"');
    }
    if (brandLogo === undefined) {
      throw new RpcLogicValidationError('require argument "brandLogo"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['brandName'] = brandName;
    _params['brandLogo'] = brandLogo;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/brand/v1/brands', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  update_brand({ p_id, id, brandName, brandLogo, description, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (brandName === undefined) {
      throw new RpcLogicValidationError('require argument "brandName"');
    }
    if (brandLogo === undefined) {
      throw new RpcLogicValidationError('require argument "brandLogo"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['brandName'] = brandName;
    _params['brandLogo'] = brandLogo;
    _params['description'] = description;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/brand/v1/brands/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_brand({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/brand/v1/brands/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  get_device_brand_option_list({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/brand/v1/get_device_brand_option_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_device_types({ typeName, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (typeName === undefined) {
      throw new RpcLogicValidationError('require argument "typeName"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['typeName'] = typeName;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/device_type/v1/device_types', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_device_type_detail({ p_id, id, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }

    // set argument into _params
    _params['id'] = id;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/device_type/v1/device_types/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_device_type({ typeName, description, context }) {
    let _params = {};
    // check require
    if (typeName === undefined) {
      throw new RpcLogicValidationError('require argument "typeName"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['typeName'] = typeName;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/device_type/v1/device_types', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  update_device_type({ p_id, id, typeName, description, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (typeName === undefined) {
      throw new RpcLogicValidationError('require argument "typeName"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['typeName'] = typeName;
    _params['description'] = description;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/device_type/v1/device_types/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_device_type({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/device_type/v1/device_types/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  get_device_type_option_list_by_brand({ deviceBrandId, context }) {
    let _params = {};
    // check require
    if (deviceBrandId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceBrandId"');
    }

    // set argument into _params
    _params['deviceBrandId'] = deviceBrandId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/device_type/v1/get_device_type_option_list_by_brand', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_device_models({ deviceBrandId, deviceTypeId, modelName, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (deviceBrandId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceBrandId"');
    }
    if (deviceTypeId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceTypeId"');
    }
    if (modelName === undefined) {
      throw new RpcLogicValidationError('require argument "modelName"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['deviceBrandId'] = deviceBrandId;
    _params['deviceTypeId'] = deviceTypeId;
    _params['modelName'] = modelName;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/device_model/v1/device_models', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_device_model_detail({ p_id, id, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }

    // set argument into _params
    _params['id'] = id;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/device_model/v1/device_models/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_device_model({ deviceBrandId, deviceTypeId, modelName, description, context }) {
    let _params = {};
    // check require
    if (deviceBrandId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceBrandId"');
    }
    if (deviceTypeId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceTypeId"');
    }
    if (modelName === undefined) {
      throw new RpcLogicValidationError('require argument "modelName"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['deviceBrandId'] = deviceBrandId;
    _params['deviceTypeId'] = deviceTypeId;
    _params['modelName'] = modelName;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/device_model/v1/device_models', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  update_device_model({ p_id, id, deviceBrandId, deviceTypeId, modelName, description, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (deviceBrandId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceBrandId"');
    }
    if (deviceTypeId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceTypeId"');
    }
    if (modelName === undefined) {
      throw new RpcLogicValidationError('require argument "modelName"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['deviceBrandId'] = deviceBrandId;
    _params['deviceTypeId'] = deviceTypeId;
    _params['modelName'] = modelName;
    _params['description'] = description;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/device_model/v1/device_models/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_device_model({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/device_model/v1/device_models/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  get_device_model_option_list_by_brand_or_type({ deviceTypeId, deviceBrandId, context }) {
    let _params = {};
    // check require
    if (deviceTypeId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceTypeId"');
    }
    if (deviceBrandId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceBrandId"');
    }

    // set argument into _params
    _params['deviceTypeId'] = deviceTypeId;
    _params['deviceBrandId'] = deviceBrandId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/device_model/v1/get_device_model_option_list_by_brand_or_type', customArgs); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_device_point_models({
    deviceBrandId,
    deviceModelId,
    deviceTypeId,
    protocolSettingId,
    upShelfStatus,
    status,
    sortObj,
    pageNum,
    pageSize,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (deviceBrandId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceBrandId"');
    }
    if (deviceModelId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceModelId"');
    }
    if (deviceTypeId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceTypeId"');
    }
    if (protocolSettingId === undefined) {
      throw new RpcLogicValidationError('require argument "protocolSettingId"');
    }
    if (upShelfStatus === undefined) {
      throw new RpcLogicValidationError('require argument "upShelfStatus"');
    }
    if (status === undefined) {
      throw new RpcLogicValidationError('require argument "status"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['deviceBrandId'] = deviceBrandId;
    _params['deviceModelId'] = deviceModelId;
    _params['deviceTypeId'] = deviceTypeId;
    _params['protocolSettingId'] = protocolSettingId;
    _params['upShelfStatus'] = upShelfStatus;
    _params['status'] = status;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_device_point_model/v1/hardware_device_point_models', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_device_point_model_detail({ p_id, id, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }

    // set argument into _params
    _params['id'] = id;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl(
      '/base/hardware_device_point_model/v1/hardware_device_point_models/{p_id}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_device_point_model({
    deviceBrandId,
    deviceModelId,
    deviceTypeId,
    protocolSettingId,
    points,
    description,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (deviceBrandId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceBrandId"');
    }
    if (deviceModelId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceModelId"');
    }
    if (deviceTypeId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceTypeId"');
    }
    if (protocolSettingId === undefined) {
      throw new RpcLogicValidationError('require argument "protocolSettingId"');
    }
    if (points === undefined) {
      throw new RpcLogicValidationError('require argument "points"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['deviceBrandId'] = deviceBrandId;
    _params['deviceModelId'] = deviceModelId;
    _params['deviceTypeId'] = deviceTypeId;
    _params['protocolSettingId'] = protocolSettingId;
    _params['points'] = points;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_device_point_model/v1/hardware_device_point_models', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  get_createVirtual_logic_list({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl('/base/hardware_device_point/v1/hardware_device_points/logic_list', customArgs); // noqa E501
    console.log('_params', _params);
    console.log('_url', _url);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  //, logicFunctionId
  get_createVirtual_logic_point_list({ devicePointTempletId, logicFunctionId, context }) {
    let _params = {};
    // check require
    if (logicFunctionId === undefined) {
      throw new RpcLogicValidationError('require argument "logicFunctionId"');
    }
    // set argument into _params
    _params['devicePointTempletId'] = devicePointTempletId;
    _params['logicFunctionId'] = logicFunctionId;
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl('/base/hardware_device_point/v1/hardware_device_points/logic_point_list', customArgs); // noqa E501
    console.log('_params', _params);
    console.log('_url', _url);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  copy_device_point_models({
    oldDevicePointTempletId,
    deviceBrandId,
    deviceModelId,
    deviceTypeId,
    protocolSettingId,
    description,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (oldDevicePointTempletId === undefined) {
      throw new RpcLogicValidationError('require argument "oldDevicePointTempletId"');
    }
    if (deviceBrandId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceBrandId"');
    }
    if (deviceModelId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceModelId"');
    }
    if (deviceTypeId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceTypeId"');
    }
    if (protocolSettingId === undefined) {
      throw new RpcLogicValidationError('require argument "protocolSettingId"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }

    // set argument into _params
    _params['oldDevicePointTempletId'] = oldDevicePointTempletId;
    _params['deviceBrandId'] = deviceBrandId;
    _params['deviceModelId'] = deviceModelId;
    _params['deviceTypeId'] = deviceTypeId;
    _params['protocolSettingId'] = protocolSettingId;
    _params['description'] = description;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_device_point_model/v1/hardware_device_point_models_copy', customArgs); // noqa E501
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  update_device_point_model({
    p_id,
    id,
    deviceBrandId,
    deviceModelId,
    deviceTypeId,
    protocolSettingId,
    points,
    description,
    version,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (deviceBrandId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceBrandId"');
    }
    if (deviceModelId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceModelId"');
    }
    if (deviceTypeId === undefined) {
      throw new RpcLogicValidationError('require argument "deviceTypeId"');
    }
    if (protocolSettingId === undefined) {
      throw new RpcLogicValidationError('require argument "protocolSettingId"');
    }
    if (points === undefined) {
      throw new RpcLogicValidationError('require argument "points"');
    }
    if (description === undefined) {
      throw new RpcLogicValidationError('require argument "description"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['deviceBrandId'] = deviceBrandId;
    _params['deviceModelId'] = deviceModelId;
    _params['deviceTypeId'] = deviceTypeId;
    _params['protocolSettingId'] = protocolSettingId;
    _params['points'] = points;
    _params['description'] = description;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl(
      '/base/hardware_device_point_model/v1/hardware_device_point_models/{p_id}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_device_point_model({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl(
      '/base/hardware_device_point_model/v1/hardware_device_point_models/{p_id}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  upOrDown_device_point_model({ id, upShelfStatus, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (upShelfStatus === undefined) {
      throw new RpcLogicValidationError('require argument "upShelfStatus"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['upShelfStatus'] = upShelfStatus;
    _params['version'] = version;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/base/hardware_device_point_model/v1/hardware_device_point_models/upOrDown',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  upDown_device_point_model({ id, upShelfStatus, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (upShelfStatus === undefined) {
      throw new RpcLogicValidationError('require argument "upShelfStatus"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['upShelfStatus'] = upShelfStatus;
    _params['version'] = version;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_device_point_model/v1/hardware_device_point_models/Down', customArgs); // noqa E501
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  lead_in_hardware_device_point_model({ excelFile, context }) {
    let _params = {};
    // check require
    if (excelFile === undefined) {
      throw new RpcLogicValidationError('require argument "excelFile"');
    }

    // set argument into _params
    _params['excelFile'] = excelFile;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl(
      '/base/hardware_device_point_model/v1/lead_in_hardware_device_point_model',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  get_model_point_brand_model_type_name({ p_id, id, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }

    // set argument into _params
    _params['id'] = id;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl(
      '/base/hardware_device_point_model/v1/get_model_point_brand_model_type_name/{p_id}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  protocol_setting_publish_lists({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/protocol_setting_publish/v1/protocol_setting_publish_lists', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_device_points({ devicePointTempletId, pointName, pointType, sortObj, pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (devicePointTempletId === undefined) {
      throw new RpcLogicValidationError('require argument "devicePointTempletId"');
    }
    if (pointName === undefined) {
      throw new RpcLogicValidationError('require argument "pointName"');
    }
    if (pointType === undefined) {
      throw new RpcLogicValidationError('require argument "pointType"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['devicePointTempletId'] = devicePointTempletId;
    _params['pointName'] = pointName;
    _params['pointType'] = pointType;
    _params['sortObj'] = sortObj;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_device_point/v1/hardware_device_points', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_device_point_detail({ p_id, p_pointType, id, pointType, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (pointType === undefined) {
      throw new RpcLogicValidationError('require argument "pointType"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['pointType'] = pointType;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    customArgs['p_pointType'] = p_pointType;
    let _url = this._genCustomUrl(
      '/base/hardware_device_point/v1/hardware_device_points/{p_id}/{p_pointType}',
      customArgs
    ); // noqa E501
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_parameter_configuration_list({ protocolSettingId, parameterCategory, context }) {
    let _params = {};
    // check require
    if (protocolSettingId === undefined) {
      throw new RpcLogicValidationError('require argument "protocolSettingId"');
    }
    if (parameterCategory === undefined) {
      throw new RpcLogicValidationError('require argument "parameterCategory"');
    }

    // set argument into _params
    _params['protocolSettingId'] = protocolSettingId;
    _params['parameterCategory'] = parameterCategory;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_device_point/v1/get_parameter_configuration_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  create_device_point(jsonModel) {
    // noqa E501
    // console.log("J_jsonModel", jsonModel)
    // console.log("J_jsonModel.lowerLimitValue", jsonModel.lowerLimitValue)
    // console.log("J_jsonModel.upperLimitValue", jsonModel.upperLimitValue)
    let _params = {};
    // check require
    if (jsonModel.pointType === undefined) {
      throw new RpcLogicValidationError('require argument "pointType"');
    }
    if (jsonModel.pointName === undefined) {
      throw new RpcLogicValidationError('require argument "pointName"');
    }
    if (jsonModel.pointProperty === undefined) {
      throw new RpcLogicValidationError('require argument "pointProperty"');
    }
    if (jsonModel.valueType === undefined) {
      throw new RpcLogicValidationError('require argument "valueType"');
    }
    if (jsonModel.devicePointTempletId === undefined) {
      throw new RpcLogicValidationError('require argument "devicePointTempletId"');
    }
    if (jsonModel.logicFunctionId === undefined) {
      throw new RpcLogicValidationError('require argument "logicFunctionId"');
    }

    _params['displayUnit'] = jsonModel.displayUnit;

    _params['energyConsumptionId'] = jsonModel.energyConsumptionId;

    _params['collectionFunctionId'] = jsonModel.collectionFunctionId;

    _params['statusWords'] = jsonModel.statusWords;

    _params['description'] = jsonModel.description;
    _params['pointParameterList'] = jsonModel.pointParameterList;
    _params['lowerLimitValue'] = jsonModel.lowerLimitValue;
    _params['upperLimitValue'] = jsonModel.upperLimitValue;

    if (jsonModel.pointType !== undefined) {
      _params['pointType'] = jsonModel.pointType;
    }
    if (jsonModel.pointName !== undefined) {
      _params['pointName'] = jsonModel.pointName;
    }
    // _params["valueType"] = valueType;
    if (jsonModel.pointProperty !== undefined) {
      _params['pointProperty'] = jsonModel.pointProperty;
    }
    if (jsonModel.valueType !== undefined) {
      _params['valueType'] = jsonModel.valueType;
    }
    if (jsonModel.devicePointTempletId !== undefined) {
      _params['devicePointTempletId'] = jsonModel.devicePointTempletId;
    }
    if (jsonModel.logicFunctionId !== undefined) {
      _params['logicFunctionId'] = jsonModel.logicFunctionId;
    }
    let context;

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_device_point/v1/hardware_device_points', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    console.log('_params', _params);
    console.log('_url', _url);
    return this.doRequest(req, context);
  }

  update_device_point({
    p_id,
    devicePointTempletId,
    id,
    pointName,
    pointProperty,
    pointType,
    energyConsumptionId,
    collectionFunctionId,
    valueType,
    displayUnit,
    description,
    pointParameterList,
    statusWords,
    version,
    lowerLimitValue,
    upperLimitValue,
    context,
    collectionFunctionName,
    logicFunctionId,
    energyConsumptionName,
    valueTypeName,
    protocolName,
    pointTypeName
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (devicePointTempletId === undefined) {
      throw new RpcLogicValidationError('require argument "devicePointTempletId"');
    }
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (pointName === undefined) {
      throw new RpcLogicValidationError('require argument "pointName"');
    }
    if (pointProperty === undefined) {
      throw new RpcLogicValidationError('require argument "pointProperty"');
    }
    if (pointType === undefined) {
      throw new RpcLogicValidationError('require argument "pointType"');
    }
    if (valueType === undefined) {
      throw new RpcLogicValidationError('require argument "valueType"');
    }
    if (pointParameterList === undefined) {
      throw new RpcLogicValidationError('require argument "pointParameterList"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['devicePointTempletId'] = devicePointTempletId;
    _params['id'] = id;
    _params['pointName'] = pointName;
    _params['pointProperty'] = pointProperty;
    _params['pointType'] = pointType;
    _params['statusWords'] = statusWords;
    _params['lowerLimitValue'] = lowerLimitValue;
    _params['upperLimitValue'] = upperLimitValue;
    _params['collectionFunctionName'] = collectionFunctionName;
    _params['logicFunctionId'] = logicFunctionId;
    _params['energyConsumptionName'] = energyConsumptionName;
    _params['valueTypeName'] = valueTypeName;
    _params['protocolName'] = protocolName;
    _params['pointTypeName'] = pointTypeName;

    if (energyConsumptionId !== undefined) {
      _params['energyConsumptionId'] = energyConsumptionId;
    }
    if (collectionFunctionId !== undefined) {
      _params['collectionFunctionId'] = collectionFunctionId;
    }
    _params['valueType'] = valueType;
    if (displayUnit !== undefined) {
      _params['displayUnit'] = displayUnit;
    }
    if (description !== undefined) {
      _params['description'] = description;
    }
    _params['pointParameterList'] = pointParameterList;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_device_point/v1/hardware_device_points/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }

  delete_device_point({ p_id, id, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/hardware_device_point/v1/hardware_device_points/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'DELETE');
    return this.doRequest(req, context);
  }

  copy_device_point({
    oldPointManageId,
    devicePointTempletId,
    pointName,
    pointProperty,
    pointType,
    valueType,
    copyPoints,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (oldPointManageId === undefined) {
      throw new RpcLogicValidationError('require argument "oldPointManageId"');
    }
    if (devicePointTempletId === undefined) {
      throw new RpcLogicValidationError('require argument "devicePointTempletId"');
    }
    if (pointName === undefined) {
      throw new RpcLogicValidationError('require argument "pointName"');
    }
    if (pointProperty === undefined) {
      throw new RpcLogicValidationError('require argument "pointProperty"');
    }
    if (pointType === undefined) {
      throw new RpcLogicValidationError('require argument "pointType"');
    }
    if (valueType === undefined) {
      throw new RpcLogicValidationError('require argument "valueType"');
    }
    if (copyPoints === undefined) {
      throw new RpcLogicValidationError('require argument "copyPoints"');
    }

    // set argument into _params
    _params['oldPointManageId'] = oldPointManageId;
    _params['devicePointTempletId'] = devicePointTempletId;
    _params['pointName'] = pointName;
    _params['pointProperty'] = pointProperty;
    _params['pointType'] = pointType;
    _params['valueType'] = valueType;
    _params['copyPoints'] = copyPoints;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_device_point/v1/hardware_device_points_copy', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  energy_consumption_type_list({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_device_point/v1/energy_consumption_type_list', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  collect_function_list({ energyConsumptionTypeNo, context }) {
    let _params = {};
    // check require
    if (energyConsumptionTypeNo === undefined) {
      throw new RpcLogicValidationError('require argument "energyConsumptionTypeNo"');
    }

    // set argument into _params
    _params['energyConsumptionTypeNo'] = energyConsumptionTypeNo;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/hardware_device_point/v1/collect_function_list', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  // 点位动态参数的数据类型
  get_dynamic_data_type({ id, context }) {
    let _params = {};
    _params['pointId'] = id;
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl(
      'base/hardware_device_point/v1/hardware_device_points/get_dynamic_data_type',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_device_point_download_hardware_point({ p_protocolSettingId, protocolSettingId, templetName, context }) {
    let _params = {};
    // check require
    if (protocolSettingId === undefined) {
      throw new RpcLogicValidationError('require argument "protocolSettingId"');
    }
    if (templetName === undefined) {
      throw new RpcLogicValidationError('require argument "templetName"');
    }
    // set argument into _params
    _params['templetName'] = templetName;
    _params['protocolSettingId'] = protocolSettingId;
    // prepare url
    let customArgs = {};
    customArgs['p_protocolSettingId'] = p_protocolSettingId;
    let _url = this._genCustomUrl(
      'base/hardware_device_point/v1/download_hardware_point/{p_protocolSettingId}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  lead_in_hardware_device_point({ protocolSettingId, devicePointTempletId, excelFile, context }) {
    let _params = {};
    // check require
    if (protocolSettingId === undefined) {
      throw new RpcLogicValidationError('require argument "protocolSettingId"');
    }
    if (devicePointTempletId === undefined) {
      throw new RpcLogicValidationError('require argument "devicePointTempletId"');
    }
    if (excelFile === undefined) {
      throw new RpcLogicValidationError('require argument "excelFile"');
    }

    _params['protocolSettingId'] = protocolSettingId;
    _params['devicePointTempletId'] = devicePointTempletId;
    _params['excelFile'] = excelFile;
    let customArgs = {};

    let _url = this._genCustomUrl('base/hardware_device_point/v1/lead_in_hardware_device_point', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  get_hardware_device_points_displayUnits({ displayUnit, context }) {
    let _params = {};
    // check require

    if (displayUnit) {
      _params['displayUnit'] = displayUnit;
    }

    let customArgs = {};

    let _url = this._genCustomUrl('base/hardware_device_point/v1/hardware_device_points/displayUnits', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}

// 咨询反馈接口类
export class FeedbackInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'FeedbackInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_work_orders({
    enterpriseIds,
    workOrderNo,
    createTimeFrom,
    createTimeTo,
    productBelongs,
    workOrderType,
    workOrderStatus,
    enterpriseKey,
    isSign,
    pageNum,
    pageSize,
    sortObj,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (enterpriseIds === undefined) {
      throw new RpcLogicValidationError('require argument "enterpriseIds"');
    }
    if (isSign === undefined) {
      throw new RpcLogicValidationError('require argument "isSign"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }

    // set argument into _params
    _params['enterpriseIds'] = enterpriseIds;
    if (workOrderNo !== undefined) {
      _params['workOrderNo'] = workOrderNo;
    }
    if (createTimeFrom !== undefined) {
      _params['createTimeFrom'] = createTimeFrom;
    }
    if (createTimeTo !== undefined) {
      _params['createTimeTo'] = createTimeTo;
    }
    if (productBelongs !== undefined) {
      _params['productBelongs'] = productBelongs;
    }
    if (workOrderType !== undefined) {
      _params['workOrderType'] = workOrderType;
    }
    if (workOrderStatus !== undefined) {
      _params['workOrderStatus'] = workOrderStatus;
    }
    if (enterpriseKey !== undefined) {
      _params['enterpriseKey'] = enterpriseKey;
    }
    _params['isSign'] = isSign;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['sortObj'] = sortObj;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/work_order/v1/work_orders', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_work_order_detail({ p_id, id, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }

    // set argument into _params
    _params['id'] = id;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/work_order/v1/work_orders/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  reply_work_order({ p_id, id, reply, workOrderStatus, attachmentIdList, replyer, platformFlag, version, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }
    if (reply === undefined) {
      throw new RpcLogicValidationError('require argument "reply"');
    }
    if (workOrderStatus === undefined) {
      throw new RpcLogicValidationError('require argument "workOrderStatus"');
    }
    if (attachmentIdList === undefined) {
      throw new RpcLogicValidationError('require argument "attachmentIdList"');
    }
    if (replyer === undefined) {
      throw new RpcLogicValidationError('require argument "replyer"');
    }
    if (platformFlag === undefined) {
      throw new RpcLogicValidationError('require argument "platformFlag"');
    }
    if (version === undefined) {
      throw new RpcLogicValidationError('require argument "version"');
    }

    // set argument into _params
    _params['id'] = id;
    _params['reply'] = reply;
    _params['workOrderStatus'] = workOrderStatus;
    _params['attachmentIdList'] = attachmentIdList;
    _params['replyer'] = replyer;
    _params['platformFlag'] = platformFlag;
    _params['version'] = version;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/work_order/v1/work_orders/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'PUT');
    return this.doRequest(req, context);
  }
}

// 出入库接口类
export class PublishInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'PublishInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_publish_waiting({ context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/product/v1/get_publish_waiting', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  publish_product({ ids, context }) {
    let _params = {};
    // check require
    if (ids === undefined) {
      throw new RpcLogicValidationError('require argument "ids"');
    }

    // set argument into _params
    _params['ids'] = ids;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/product/v1/publish_product', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  get_publish_history({ pageNum, pageSize, context }) {
    let _params = {};
    // check require
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }

    // set argument into _params
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/product/v1/get_publish_history', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_publish_history_detail({ p_id, id, context }) {
    let _params = {};
    // check require
    if (id === undefined) {
      throw new RpcLogicValidationError('require argument "id"');
    }

    // set argument into _params
    _params['id'] = id;
    // prepare url
    let customArgs = {};
    customArgs['p_id'] = p_id;
    let _url = this._genCustomUrl('/base/product/v1/get_publish_history_detail/{p_id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}
// 操作日志接口类
export class OperationLogInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'OperationLogInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_operation_logs({
    operationModule,
    operationTimeFrom,
    operationTimeTo,
    operator,
    operationStatus,
    operationContent,
    pageNum,
    pageSize,
    sortObj,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }

    // set argument into _params
    if (operationModule !== undefined) {
      _params['operationModule'] = operationModule;
    }
    if (operationTimeFrom !== undefined) {
      _params['operationTimeFrom'] = operationTimeFrom;
    }
    if (operationTimeTo !== undefined) {
      _params['operationTimeTo'] = operationTimeTo;
    }
    if (operator !== undefined) {
      _params['operator'] = operator;
    }
    if (operationStatus !== undefined) {
      _params['operationStatus'] = operationStatus;
    }
    if (operationContent !== undefined) {
      _params['operationContent'] = operationContent;
    }
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['sortObj'] = sortObj;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/enterprise/operation_log/v1/operation_enterprise_logs', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  get_operation_modules({ organisationId, context }) {
    let _params = {};
    // check require
    if (organisationId === undefined) {
      throw new RpcLogicValidationError('require argument "organisationId"');
    }

    // set argument into _params
    _params['organisationId'] = organisationId;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/enterprise/customer_auth/v1/operation_modules', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}

// 基干平台操作日志接口类
export class BaseOperationLogInterfApi extends BaseInterfApi {
  constructor(
    baseUrl,
    moduleName = 'BackboneSslc',
    interfName = 'BaseOperationLogInterf',
    token = 'anonymous',
    ...args
  ) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  get_operation_logs({
    operationModule,
    operationTimeFrom,
    operationTimeTo,
    operator,
    operationStatus,
    operationContent,
    sysProject,
    pageNum,
    pageSize,
    sortObj,
    context
  }) {
    // noqa E501
    let _params = {};
    // check require
    if (operationModule === undefined) {
      throw new RpcLogicValidationError('require argument "operationModule"');
    }
    if (operationTimeFrom === undefined) {
      throw new RpcLogicValidationError('require argument "operationTimeFrom"');
    }
    if (operationTimeTo === undefined) {
      throw new RpcLogicValidationError('require argument "operationTimeTo"');
    }
    if (operator === undefined) {
      throw new RpcLogicValidationError('require argument "operator"');
    }
    if (operationStatus === undefined) {
      throw new RpcLogicValidationError('require argument "operationStatus"');
    }
    if (operationContent === undefined) {
      throw new RpcLogicValidationError('require argument "operationContent"');
    }
    if (sysProject === undefined) {
      throw new RpcLogicValidationError('require argument "sysProject"');
    }
    if (pageNum === undefined) {
      throw new RpcLogicValidationError('require argument "pageNum"');
    }
    if (pageSize === undefined) {
      throw new RpcLogicValidationError('require argument "pageSize"');
    }
    if (sortObj === undefined) {
      throw new RpcLogicValidationError('require argument "sortObj"');
    }

    // set argument into _params
    _params['operationModule'] = operationModule;
    _params['operationTimeFrom'] = operationTimeFrom;
    _params['operationTimeTo'] = operationTimeTo;
    _params['operator'] = operator;
    _params['operationStatus'] = operationStatus;
    _params['operationContent'] = operationContent;
    _params['sysProject'] = sysProject;
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['sortObj'] = sortObj;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/base/operation_log/v1/operation_logs', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}

// 代理商管理接口类
export class AgentInterfApi extends BaseInterfApi {
  constructor(baseUrl, moduleName = 'BackboneSslc', interfName = 'AgentInterf', token = 'anonymous', ...args) {
    super(baseUrl, moduleName, interfName, token, ...args);
  }

  // 获取代理商列表
  get_agent_list({ contactName, dateRange, contractStatus, saleAgentKey, pageNum, pageSize, sortObj, context }) {
    // noqa E501
    let _params = {};

    // check require
    if (contactName !== undefined) {
      _params['contactName'] = contactName;
    }
    if (saleAgentKey !== undefined) {
      _params['saleAgentKey'] = saleAgentKey;
    }
    if (contractStatus !== undefined && contractStatus !== 'all') {
      _params['contractStatus'] = contractStatus;
    }
    if (dateRange) {
      _params['startDate'] = dateRange[0];
      _params['endDate'] = dateRange[1];
    }
    // set argument into _params
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['sortObj'] = sortObj;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/agent/ver1/get_sale_agent_list/', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 新增代理商
  add_agent({
    companyName,
    bankAccountNumber,
    contactName,
    contactTelephone,
    contractTime,
    unifiedSocialCreditId,
    companyContactName,
    openAccountBank,
    context
  }) {
    let _params = {};
    // check require
    if (companyName === undefined) {
      throw new RpcLogicValidationError('require argument "companyName"');
    }
    if (contactName === undefined) {
      throw new RpcLogicValidationError('require argument "contactName"');
    }
    if (contactTelephone === undefined) {
      throw new RpcLogicValidationError('require argument "contactTelephone"');
    }
    if (contractTime === undefined) {
      throw new RpcLogicValidationError('require argument "contractTime"');
    }
    if (companyContactName === undefined) {
      throw new RpcLogicValidationError('require argument "companyContactName"');
    }
    if (bankAccountNumber === undefined) {
      throw new RpcLogicValidationError('require argument "bankAccountNumber"');
    }
    if (openAccountBank === undefined) {
      throw new RpcLogicValidationError('require argument "openAccountBank"');
    }

    // set argument into _params
    _params['companyName'] = companyName;
    _params['contactName'] = contactName;
    _params['contactTelephone'] = contactTelephone;
    _params['contractTime'] = contractTime;
    _params['companyContactName'] = companyContactName;
    _params['bankAccountNumber'] = bankAccountNumber;
    _params['unifiedSocialCreditId'] = unifiedSocialCreditId;
    _params['openAccountBank'] = openAccountBank;

    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/agent/ver1/add_sale_agent/', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  // 获取代理商基本信息
  get_agent_basicInfo({ saleAgentId, context }) {
    // noqa E501
    let _params = {};
    // prepare url
    let customArgs = {};
    customArgs['saleAgentId'] = saleAgentId;

    let _url = this._genCustomUrl('/software_maintenance/agent/ver1/get_sale_agent/{saleAgentId}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 获取代理商产品列表
  get_agent_productList({ saleAgentId, context }) {
    // noqa E501
    let _params = {};
    // prepare url
    let customArgs = {};
    customArgs['saleAgentId'] = saleAgentId;

    let _url = this._genCustomUrl('/software_maintenance/agent/ver1/get_agent_product_list/{saleAgentId}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  // 新增代理产品
  add_agentProduct({
    agentPeriodYear,
    contractNumber,
    price,
    agentProductDate,
    saleAgentId,
    softwareModuleId,
    context
  }) {
    let _params = {};
    // check require
    if (agentPeriodYear === undefined) {
      throw new RpcLogicValidationError('require argument "companyName"');
    }
    if (contractNumber === undefined) {
      throw new RpcLogicValidationError('require argument "contractNumber"');
    }
    if (price === undefined) {
      throw new RpcLogicValidationError('require argument "price"');
    }
    if (saleAgentId === undefined) {
      throw new RpcLogicValidationError('require argument "saleAgentId"');
    }
    if (softwareModuleId === undefined) {
      throw new RpcLogicValidationError('require argument "softwareModuleId"');
    }
    if (agentProductDate === undefined) {
      throw new RpcLogicValidationError('require argument "agentProductDate"');
    }

    // set argument into _params
    _params['agentPeriodYear'] = agentPeriodYear;
    _params['contractNumber'] = contractNumber;
    _params['price'] = price;
    _params['saleAgentId'] = saleAgentId;
    _params['softwareModuleId'] = softwareModuleId;
    _params['agentProductDate'] = agentProductDate;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/agent/ver1/add_agent_product/', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  // 编辑代理产品
  edit_agentProduct({ agentProductId, agentPeriodYear, contractNumber, price, context }) {
    let _params = {};
    // check require
    if (agentPeriodYear === undefined) {
      throw new RpcLogicValidationError('require argument "companyName"');
    }
    if (contractNumber === undefined) {
      throw new RpcLogicValidationError('require argument "contractNumber"');
    }
    if (price === undefined) {
      throw new RpcLogicValidationError('require argument "price"');
    }

    // set argument into _params
    _params['agentPeriodYear'] = agentPeriodYear;
    _params['contractNumber'] = contractNumber;
    _params['price'] = price;
    // prepare url
    let customArgs = {};
    customArgs['agentProductId'] = agentProductId;

    let _url = this._genCustomUrl('/software_maintenance/agent/ver1/update_agent_product/{agentProductId}', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  // 修改代理信息
  edit_agentMessage({
    bankAccountNumber,
    companyContactName,
    companyName,
    contactName,
    contactTelephone,
    date,
    openAccountBank,
    unifiedSocialCreditId,
    saleAgentId,
    context
  }) {
    let _params = {};
    // check require
    if (bankAccountNumber !== undefined) {
      _params['bankAccountNumber'] = bankAccountNumber;
    }
    if (companyContactName !== undefined) {
      _params['companyContactName'] = companyContactName;
    }
    if (companyName !== undefined) {
      _params['companyName'] = companyName;
    }
    if (contactName !== undefined) {
      _params['contactName'] = contactName;
    }
    if (contactTelephone !== undefined) {
      _params['contactTelephone'] = contactTelephone;
    }
    if (date !== null) {
      _params['contractTime'] = date;
    }
    if (openAccountBank !== undefined) {
      _params['openAccountBank'] = openAccountBank;
    }
    if (unifiedSocialCreditId !== undefined) {
      _params['unifiedSocialCreditId'] = unifiedSocialCreditId;
    }

    // prepare url
    let customArgs = {};
    customArgs['saleAgentId'] = saleAgentId;

    let _url = this._genCustomUrl('/software_maintenance/agent/ver1/update_sale_agent/{saleAgentId}', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }

  // 获取代理商专属链接列表
  get_url_list({ saleAgentId, context }) {
    // noqa E501
    let _params = {};
    // prepare url
    let customArgs = {};
    customArgs['saleAgentId'] = saleAgentId;

    let _url = this._genCustomUrl(
      '/software_maintenance/agent/ver1/sale_agent_exclusive_url/{saleAgentId}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  // 解约代理产品
  terminate_agent_product({ agentProductId, context }) {
    // noqa E501
    let _params = {};
    // prepare url
    let customArgs = {};
    customArgs['agentProductId'] = agentProductId;

    let _url = this._genCustomUrl(
      '/software_maintenance/agent/ver1/rescind_agent_product/{agentProductId}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  // 获取代理产品链接
  getAgentProductUrl({ agentProductId, context }) {
    // noqa E501
    let _params = {};
    // prepare url
    let customArgs = {};
    customArgs['agentProductId'] = agentProductId;

    let _url = this._genCustomUrl(
      '/software_maintenance/agent/ver1/agent_product_exclusive_url/{agentProductId}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 删除代理商营业执照
  delete_agentLicense({ saleAgentId, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['saleAgentId'] = saleAgentId;

    let _url = this._genCustomUrl(
      '/software_maintenance/agent/ver1/delete_agent_business_license/{saleAgentId}',
      customArgs
    );
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  // 删除代理商合同
  delete_agentPDF({ saleAgentId, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['saleAgentId'] = saleAgentId;

    let _url = this._genCustomUrl('/software_maintenance/agent/ver1/delete_agent_contract/{saleAgentId}', customArgs);
    let req = this.createRequest(_url, _params, 'POST');
    return this.doRequest(req, context);
  }
  // 获取代理商合同
  getAgentPDF({ id, context }) {
    let _params = {};
    // check require

    // prepare url
    let customArgs = {};
    customArgs['id'] = id;

    let _url = this._genCustomUrl('/software_maintenance/agent/ver1/download_contract/{id}', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
  // 获取代理商成交统计
  getAgentOrderTotal({
    companyKey,
    saleAgentKey,
    dateRange,
    exportIdList,
    orderNumber,
    pageNum,
    pageSize,
    sortObj,
    context
  }) {
    // noqa E501
    let _params = {};
    // set argument into _params
    if (companyKey !== undefined) {
      _params['companyKey'] = companyKey;
    }
    if (saleAgentKey !== undefined) {
      _params['saleAgentKey'] = saleAgentKey;
    }
    if (orderNumber !== undefined) {
      _params['orderNumber'] = orderNumber;
    }
    if (exportIdList !== undefined) {
      _params['exportIdList'] = exportIdList;
    }
    if (dateRange) {
      _params['startDate'] = dateRange[0];
      _params['endDate'] = dateRange[1];
    }
    _params['pageNum'] = pageNum;
    _params['pageSize'] = pageSize;
    _params['sortObj'] = sortObj;
    // prepare url
    let customArgs = {};

    let _url = this._genCustomUrl('/software_maintenance/agent/ver1/get_sale_agent_order_list/', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }

  // 导出清册清单
  export_detail_list_agent({
    companyKey,
    exportIdList,
    saleAgentKey,
    orderNumber,
    dateRange,
    pageSize,
    pageNum,
    context
  }) {
    let _params = {};
    _params['pageSize'] = pageSize;
    _params['pageNum'] = pageNum;
    if (saleAgentKey !== undefined) {
      _params['saleAgentKey'] = saleAgentKey;
    }
    if (companyKey !== undefined) {
      _params['companyKey'] = companyKey;
    }
    if (orderNumber !== undefined) {
      _params['orderNumber'] = orderNumber;
    }
    if (exportIdList !== undefined) {
      _params['exportIdList'] = exportIdList; // 导出id
    }
    if (dateRange) {
      _params['startDate'] = dateRange[0];
      _params['endDate'] = dateRange[1];
    }
    // prepare url
    let customArgs = {};
    let _url = this._genCustomUrl('/software_maintenance/agent/ver1/export_sale_agent_order_list/', customArgs);
    let req = this.createRequest(_url, _params, 'GET');
    return this.doRequest(req, context);
  }
}
