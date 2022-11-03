/**
 * @fileoverview gRPC-Web generated client stub for com.sslongchuang.api.grpc
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.com = {};
proto.com.sslongchuang = {};
proto.com.sslongchuang.api = {};
proto.com.sslongchuang.api.grpc = require('./energy_consumption_query_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.sslongchuang.api.grpc.ExportRequest,
 *   !proto.com.sslongchuang.api.grpc.ExportResult>}
 */
const methodDescriptor_EnergyConsumptionQueryService_Export = new grpc.web.MethodDescriptor(
  '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/Export',
  grpc.web.MethodType.UNARY,
  proto.com.sslongchuang.api.grpc.ExportRequest,
  proto.com.sslongchuang.api.grpc.ExportResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.ExportRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.ExportResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.sslongchuang.api.grpc.ExportRequest,
 *   !proto.com.sslongchuang.api.grpc.ExportResult>}
 */
const methodInfo_EnergyConsumptionQueryService_Export = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.sslongchuang.api.grpc.ExportResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.ExportRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.ExportResult.deserializeBinary
);


/**
 * @param {!proto.com.sslongchuang.api.grpc.ExportRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.sslongchuang.api.grpc.ExportResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.sslongchuang.api.grpc.ExportResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServiceClient.prototype.export =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/Export',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_Export,
      callback);
};


/**
 * @param {!proto.com.sslongchuang.api.grpc.ExportRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.sslongchuang.api.grpc.ExportResult>}
 *     A native promise that resolves to the response
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServicePromiseClient.prototype.export =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/Export',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_Export);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.sslongchuang.api.grpc.TemplateRequest,
 *   !proto.com.sslongchuang.api.grpc.TemplateResult>}
 */
const methodDescriptor_EnergyConsumptionQueryService_Template = new grpc.web.MethodDescriptor(
  '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/Template',
  grpc.web.MethodType.UNARY,
  proto.com.sslongchuang.api.grpc.TemplateRequest,
  proto.com.sslongchuang.api.grpc.TemplateResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.TemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.TemplateResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.sslongchuang.api.grpc.TemplateRequest,
 *   !proto.com.sslongchuang.api.grpc.TemplateResult>}
 */
const methodInfo_EnergyConsumptionQueryService_Template = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.sslongchuang.api.grpc.TemplateResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.TemplateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.TemplateResult.deserializeBinary
);


/**
 * @param {!proto.com.sslongchuang.api.grpc.TemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.sslongchuang.api.grpc.TemplateResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.sslongchuang.api.grpc.TemplateResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServiceClient.prototype.template =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/Template',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_Template,
      callback);
};


/**
 * @param {!proto.com.sslongchuang.api.grpc.TemplateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.sslongchuang.api.grpc.TemplateResult>}
 *     A native promise that resolves to the response
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServicePromiseClient.prototype.template =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/Template',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_Template);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.sslongchuang.api.grpc.TreeRequest,
 *   !proto.com.sslongchuang.api.grpc.TreeResult>}
 */
const methodDescriptor_EnergyConsumptionQueryService_Tree = new grpc.web.MethodDescriptor(
  '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/Tree',
  grpc.web.MethodType.UNARY,
  proto.com.sslongchuang.api.grpc.TreeRequest,
  proto.com.sslongchuang.api.grpc.TreeResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.TreeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.TreeResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.sslongchuang.api.grpc.TreeRequest,
 *   !proto.com.sslongchuang.api.grpc.TreeResult>}
 */
const methodInfo_EnergyConsumptionQueryService_Tree = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.sslongchuang.api.grpc.TreeResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.TreeRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.TreeResult.deserializeBinary
);


/**
 * @param {!proto.com.sslongchuang.api.grpc.TreeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.sslongchuang.api.grpc.TreeResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.sslongchuang.api.grpc.TreeResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServiceClient.prototype.tree =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/Tree',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_Tree,
      callback);
};


/**
 * @param {!proto.com.sslongchuang.api.grpc.TreeRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.sslongchuang.api.grpc.TreeResult>}
 *     A native promise that resolves to the response
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServicePromiseClient.prototype.tree =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/Tree',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_Tree);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListRequest,
 *   !proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListResult>}
 */
const methodDescriptor_EnergyConsumptionQueryService_EnergyConsumptionTypeList = new grpc.web.MethodDescriptor(
  '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/EnergyConsumptionTypeList',
  grpc.web.MethodType.UNARY,
  proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListRequest,
  proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListRequest,
 *   !proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListResult>}
 */
const methodInfo_EnergyConsumptionQueryService_EnergyConsumptionTypeList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListResult.deserializeBinary
);


/**
 * @param {!proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServiceClient.prototype.energyConsumptionTypeList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/EnergyConsumptionTypeList',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_EnergyConsumptionTypeList,
      callback);
};


/**
 * @param {!proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.sslongchuang.api.grpc.EnergyConsumptionTypeListResult>}
 *     A native promise that resolves to the response
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServicePromiseClient.prototype.energyConsumptionTypeList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/EnergyConsumptionTypeList',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_EnergyConsumptionTypeList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListRequest,
 *   !proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListResult>}
 */
const methodDescriptor_EnergyConsumptionQueryService_EnergyConsumptionSubitemList = new grpc.web.MethodDescriptor(
  '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/EnergyConsumptionSubitemList',
  grpc.web.MethodType.UNARY,
  proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListRequest,
  proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListRequest,
 *   !proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListResult>}
 */
const methodInfo_EnergyConsumptionQueryService_EnergyConsumptionSubitemList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListResult.deserializeBinary
);


/**
 * @param {!proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServiceClient.prototype.energyConsumptionSubitemList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/EnergyConsumptionSubitemList',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_EnergyConsumptionSubitemList,
      callback);
};


/**
 * @param {!proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.sslongchuang.api.grpc.EnergyConsumptionSubitemListResult>}
 *     A native promise that resolves to the response
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServicePromiseClient.prototype.energyConsumptionSubitemList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/EnergyConsumptionSubitemList',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_EnergyConsumptionSubitemList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionListRequest,
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionListResult>}
 */
const methodDescriptor_EnergyConsumptionQueryService_CollectFunctionList = new grpc.web.MethodDescriptor(
  '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/CollectFunctionList',
  grpc.web.MethodType.UNARY,
  proto.com.sslongchuang.api.grpc.CollectFunctionListRequest,
  proto.com.sslongchuang.api.grpc.CollectFunctionListResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.CollectFunctionListResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionListRequest,
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionListResult>}
 */
const methodInfo_EnergyConsumptionQueryService_CollectFunctionList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.sslongchuang.api.grpc.CollectFunctionListResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.CollectFunctionListResult.deserializeBinary
);


/**
 * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.sslongchuang.api.grpc.CollectFunctionListResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.sslongchuang.api.grpc.CollectFunctionListResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServiceClient.prototype.collectFunctionList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/CollectFunctionList',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_CollectFunctionList,
      callback);
};


/**
 * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.sslongchuang.api.grpc.CollectFunctionListResult>}
 *     A native promise that resolves to the response
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServicePromiseClient.prototype.collectFunctionList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/CollectFunctionList',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_CollectFunctionList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionGroupListRequest,
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionGroupListResult>}
 */
const methodDescriptor_EnergyConsumptionQueryService_CollectFunctionGroupList = new grpc.web.MethodDescriptor(
  '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/CollectFunctionGroupList',
  grpc.web.MethodType.UNARY,
  proto.com.sslongchuang.api.grpc.CollectFunctionGroupListRequest,
  proto.com.sslongchuang.api.grpc.CollectFunctionGroupListResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionGroupListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.CollectFunctionGroupListResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionGroupListRequest,
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionGroupListResult>}
 */
const methodInfo_EnergyConsumptionQueryService_CollectFunctionGroupList = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.sslongchuang.api.grpc.CollectFunctionGroupListResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionGroupListRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.CollectFunctionGroupListResult.deserializeBinary
);


/**
 * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionGroupListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.sslongchuang.api.grpc.CollectFunctionGroupListResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.sslongchuang.api.grpc.CollectFunctionGroupListResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServiceClient.prototype.collectFunctionGroupList =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/CollectFunctionGroupList',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_CollectFunctionGroupList,
      callback);
};


/**
 * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionGroupListRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.sslongchuang.api.grpc.CollectFunctionGroupListResult>}
 *     A native promise that resolves to the response
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServicePromiseClient.prototype.collectFunctionGroupList =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/CollectFunctionGroupList',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_CollectFunctionGroupList);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailRequest,
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailResult>}
 */
const methodDescriptor_EnergyConsumptionQueryService_CollectFunctionGroupDetail = new grpc.web.MethodDescriptor(
  '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/CollectFunctionGroupDetail',
  grpc.web.MethodType.UNARY,
  proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailRequest,
  proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailRequest,
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailResult>}
 */
const methodInfo_EnergyConsumptionQueryService_CollectFunctionGroupDetail = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailResult.deserializeBinary
);


/**
 * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServiceClient.prototype.collectFunctionGroupDetail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/CollectFunctionGroupDetail',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_CollectFunctionGroupDetail,
      callback);
};


/**
 * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.sslongchuang.api.grpc.CollectFunctionGroupDetailResult>}
 *     A native promise that resolves to the response
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServicePromiseClient.prototype.collectFunctionGroupDetail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/CollectFunctionGroupDetail',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_CollectFunctionGroupDetail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionDetailRequest,
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionDetailResult>}
 */
const methodDescriptor_EnergyConsumptionQueryService_CollectFunctionDetail = new grpc.web.MethodDescriptor(
  '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/CollectFunctionDetail',
  grpc.web.MethodType.UNARY,
  proto.com.sslongchuang.api.grpc.CollectFunctionDetailRequest,
  proto.com.sslongchuang.api.grpc.CollectFunctionDetailResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.CollectFunctionDetailResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionDetailRequest,
 *   !proto.com.sslongchuang.api.grpc.CollectFunctionDetailResult>}
 */
const methodInfo_EnergyConsumptionQueryService_CollectFunctionDetail = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.sslongchuang.api.grpc.CollectFunctionDetailResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.CollectFunctionDetailResult.deserializeBinary
);


/**
 * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.sslongchuang.api.grpc.CollectFunctionDetailResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.sslongchuang.api.grpc.CollectFunctionDetailResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServiceClient.prototype.collectFunctionDetail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/CollectFunctionDetail',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_CollectFunctionDetail,
      callback);
};


/**
 * @param {!proto.com.sslongchuang.api.grpc.CollectFunctionDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.sslongchuang.api.grpc.CollectFunctionDetailResult>}
 *     A native promise that resolves to the response
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServicePromiseClient.prototype.collectFunctionDetail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/CollectFunctionDetail',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_CollectFunctionDetail);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailRequest,
 *   !proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailResult>}
 */
const methodDescriptor_EnergyConsumptionQueryService_CollectEnergyConsumptionTypeDetail = new grpc.web.MethodDescriptor(
  '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/CollectEnergyConsumptionTypeDetail',
  grpc.web.MethodType.UNARY,
  proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailRequest,
  proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailResult.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailRequest,
 *   !proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailResult>}
 */
const methodInfo_EnergyConsumptionQueryService_CollectEnergyConsumptionTypeDetail = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailResult,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailResult.deserializeBinary
);


/**
 * @param {!proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailResult)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailResult>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServiceClient.prototype.collectEnergyConsumptionTypeDetail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/CollectEnergyConsumptionTypeDetail',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_CollectEnergyConsumptionTypeDetail,
      callback);
};


/**
 * @param {!proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.sslongchuang.api.grpc.CollectEnergyConsumptionTypeDetailResult>}
 *     A native promise that resolves to the response
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionQueryServicePromiseClient.prototype.collectEnergyConsumptionTypeDetail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionQueryService/CollectEnergyConsumptionTypeDetail',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionQueryService_CollectEnergyConsumptionTypeDetail);
};


module.exports = proto.com.sslongchuang.api.grpc;

