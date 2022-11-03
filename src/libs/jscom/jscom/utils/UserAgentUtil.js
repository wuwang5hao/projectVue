class UserAgentUtil {
  isWechat () {
    let ua = navigator.userAgent.toLowerCase()
    return ua.indexOf('micromessenger') !== -1
  }

  wechatVersion () {
    let ua = navigator.userAgent.toLowerCase()
    let regExp = new RegExp('micromessenger/(\\S*)')
    let result = regExp.exec(ua)
    if (result && result.length > 2) {
      return result[1]
    }
    return ''
  }

  isIphone () {
    let ua = navigator.userAgent.toLowerCase()
    return (ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1 ||
      ua.indexOf('ipod') !== -1)
  }

  isAndroid () {
    let ua = navigator.userAgent.toLowerCase()
    return ua.indexOf('android') !== -1
  }

  isMobile () {
    let ua = navigator.userAgent.toLowerCase()
    return ua.indexOf('android') !== -1 || ua.indexOf('iphone') !== -1
  }

  isAlipay () {
    let ua = navigator.userAgent.toLowerCase()
    return ua.indexOf('alipay') !== -1
  }
}

export var userAgentUtil = new UserAgentUtil()
