export default class FloatUtil {
  static isInteger (value) {
    return Math.floor(value) === value
  }

  static toInteger (floatNum) {
    let ret = {times: 1, num: 0}
    if (FloatUtil.isInteger(floatNum)) {
      ret.num = floatNum
      return ret
    }
    let strfi = floatNum + ''
    let point = strfi.indexOf('.')
    let length = strfi.substr(point + 1).length
    ret.times = Math.pow(10, length)
    ret.num = parseInt(floatNum * ret.times + 0.5, 10)
    return ret
  }

  static add(valueTotal, value) {
    return FloatUtil.floatComputed(valueTotal, value, 'add')
  }

  static subtract(valueTotal, value) {
    return FloatUtil.floatComputed(valueTotal, value, 'subtract')
  }

  static multiply(valueTotal, value) {
    return FloatUtil.floatComputed(valueTotal, value, 'multiply')
  }

  static divide (valueTotal, value) {
    return FloatUtil.floatComputed(valueTotal, value, 'divide')
  }

  static multiply_prec (valueTotal, value, prec) {
    let result = FloatUtil.floatComputed(valueTotal, value, 'multiply')
    return Number(result.toFixed(prec))
  }

  static divide_prec (valueTotal, value, prec) {
    let result = FloatUtil.floatComputed(valueTotal, value, 'divide')
    return Number(result.toFixed(prec))
  }

  static floatComputed (valueTotal, value, mode) {
    let valueTotalTo = FloatUtil.toInteger(valueTotal)
    let valueTo = FloatUtil.toInteger(value)
    let valueTotalNum = valueTotalTo.num
    let valueNum = valueTo.num
    let valueTotalTime = valueTotalTo.times
    let valueTime = valueTo.times
    let max = valueTotalTime > valueTime ? valueTotalTime : valueTime
    let result = null
    switch (mode) {
      case 'add':
        if (valueTotalTime === valueTime) {
          result = valueTotalNum + valueNum
        } else if (valueTotalTime > valueTime) {
          result = valueTotalNum + valueNum * (valueTotalTime / valueTime)
        } else {
          result = valueTotalNum * (valueTime / valueTotalTime) + valueNum
        }
        return result / max
      case 'subtract':
        if (valueTotalTime === valueTime) {
          result = valueTotalNum - valueNum
        } else if (valueTotalTime > valueTime) {
          result = valueTotalNum - valueNum * (valueTotalTime / valueTime)
        } else {
          result = valueTotalNum * (valueTime / valueTotalTime) - valueNum
        }
        return result / max
      case 'multiply':
        result = (valueTotalNum * valueNum) / (valueTotalTime * valueTime)
        return result
      case 'divide':
        return function () {
          let num = valueTotalNum / valueNum
          let times = valueTime / valueTotalTime
          return FloatUtil.floatComputed(num, times, 'multiply')
        }()
    }
  }
}
