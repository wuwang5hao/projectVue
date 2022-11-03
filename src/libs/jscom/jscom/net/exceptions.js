export class BaseNetError extends Error {
  constructor(statusText, xhr) {
    super(statusText)
    this.statusText = statusText
    this.xhr = xhr
  }
}

// == 解析错误 ==
// @brief: Indicates that the server's response could not be parsed.
export class ParseError extends BaseNetError {}

// == 网络错误 ==
// @biref: Indicates that there was a network error when performing a request.
// 网络未达
export class NetworkError extends BaseNetError {}

// @brief: Error indicating that no connection could be established when performing a request.
export class NoConnectionError extends  NetworkError {}

// @brief: Indicates that the connection or the socket timed out.
export class TimeoutError extends NetworkError {}

// == 服务器错误 ==
// @brief: Indicates that the server responded with an error response.
//   服务器返回错误，包括 5xx 错误
export class ServerError extends  BaseNetError {}

// == 客户端错误 ==
// @brief: Indicates that the server responded with an error response indicating that the client has erred.
//   including 4xx error codes indicating a client error.
export class ClientError extends BaseNetError {}

// @brief: Error indicating that there was an authentication failure when performing a Request.
export class AuthFailureError extends ClientError {}
