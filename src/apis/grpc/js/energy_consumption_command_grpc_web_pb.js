/**
 * @fileoverview gRPC-Web generated client stub for com.sslongchuang.api.grpc
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js')
const proto = {};
proto.com = {};
proto.com.sslongchuang = {};
proto.com.sslongchuang.api = {};
proto.com.sslongchuang.api.grpc = require('./energy_consumption_command_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionCommandServiceClient =
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
proto.com.sslongchuang.api.grpc.EnergyConsumptionCommandServicePromiseClient =
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
 *   !proto.com.sslongchuang.api.grpc.SaveAndUpdateRequest,
 *   !proto.com.sslongchuang.api.grpc.Result>}
 */
const methodDescriptor_EnergyConsumptionCommandService_Upload = new grpc.web.MethodDescriptor(
  '/com.sslongchuang.api.grpc.EnergyConsumptionCommandService/Upload',
  grpc.web.MethodType.UNARY,
  proto.com.sslongchuang.api.grpc.SaveAndUpdateRequest,
  proto.com.sslongchuang.api.grpc.Result,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.SaveAndUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.Result.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.com.sslongchuang.api.grpc.SaveAndUpdateRequest,
 *   !proto.com.sslongchuang.api.grpc.Result>}
 */
const methodInfo_EnergyConsumptionCommandService_Upload = new grpc.web.AbstractClientBase.MethodInfo(
  proto.com.sslongchuang.api.grpc.Result,
  /**
   * @param {!proto.com.sslongchuang.api.grpc.SaveAndUpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.com.sslongchuang.api.grpc.Result.deserializeBinary
);


/**
 * @param {!proto.com.sslongchuang.api.grpc.SaveAndUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.com.sslongchuang.api.grpc.Result)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.com.sslongchuang.api.grpc.Result>|undefined}
 *     The XHR Node Readable Stream
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionCommandServiceClient.prototype.upload =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionCommandService/Upload',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionCommandService_Upload,
      callback);
};


/**
 * @param {!proto.com.sslongchuang.api.grpc.SaveAndUpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.com.sslongchuang.api.grpc.Result>}
 *     A native promise that resolves to the response
 */
proto.com.sslongchuang.api.grpc.EnergyConsumptionCommandServicePromiseClient.prototype.upload =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/com.sslongchuang.api.grpc.EnergyConsumptionCommandService/Upload',
      request,
      metadata || {},
      methodDescriptor_EnergyConsumptionCommandService_Upload);
};


module.exports = proto.com.sslongchuang.api.grpc;

