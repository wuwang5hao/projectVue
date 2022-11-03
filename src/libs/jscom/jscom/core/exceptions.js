class ExtendableError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor)
    } else {
      this.stack = (new Error(message)).stack
    }
  }
}

class NotImplemented extends ExtendableError {}

class NotSupported extends ExtendableError {}

export var NotImplementedError = new NotImplemented('NotImplementedError')

export var NotSupportedError = new NotSupported('NotSupportedError')

export class LogicError extends ExtendableError {}
export class RuntimeError extends ExtendableError {}

export class NetLogicError extends LogicError {
  constructor(statusText, xhr) {
    super(statusText)
    this.statusText = statusText
    this.xhr = xhr
  }
}
