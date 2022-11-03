export class StrUtil {
  strfmt() {
    var args = arguments
    return args[0].replace(/{(\d+)}/g, function(match, number) {
      number = parseInt(number)
      return typeof args[number+1] !== 'undefined'
        ? args[number+1] : match;
    });
  }

  sprintf() {
    var args = arguments;
    var idx = 0;
    return args[0].replace(/%s/g, function() {
      return args[1 + idx++];
    })
  }

  safeInt(obj) {
    if (obj === undefined) return 0
    if (isNaN(obj)) return 0
    if (!obj) return 0
    return parseInt(obj)
  }
  safeFloat(obj) {
    if (obj === undefined) return 0
    if (isNaN(obj)) return 0
    if (!obj) return 0
    return parseFloat(obj)
  }
  safeStr(obj) {
    if (obj === undefined) return ''
    if (!obj) return ''
    return ''+obj
  }
  humanInteger(number) {
    let priceStr = `${number}`
    return this._splitPriceStr(priceStr, 0)
  }
  humanPrice(floatPrice, precision=2) {
    // format price
    let priceStr = `${floatPrice}`
    return this._splitPriceStr(priceStr)
  }
  _splitPriceStr (priceStr, precision=2) {
    let arr = priceStr.split('.')
    let intPrice = arr[0]
    let intPriceArr = []
    let startLen = intPrice.length % 3
    if (startLen === 0) {
      startLen = 3
    }
    intPriceArr.push(intPrice.substr(0, startLen))
    for (; startLen < intPrice.length; startLen += 3) {
      intPriceArr.push(intPrice.substr(startLen, 3))
    }
    let result = intPriceArr.join(',')
    let preStr = arr[1] || ''
    if (preStr.length > precision) {
      preStr = preStr.substr(0, precision)
    } else {
      let len = precision - preStr.length
      while (len > 0) {
        preStr += '0'
        len -= 1
      }
    }
    if (preStr.length > 1) {
      result += '.' + preStr
    }
    return result
  }

  strip(string, charToRemove) {
    while(string.charAt(0) === charToRemove) {
      string = string.substring(1)
    }
    while(string.charAt(string.length-1) === charToRemove) {
      string = string.substring(0,string.length-1)
    }
    return string
  }
}

export var strUtil = new StrUtil()
