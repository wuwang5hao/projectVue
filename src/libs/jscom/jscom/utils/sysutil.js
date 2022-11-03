import strftime from './strftime'

export class DtUtil {
  constructor() {
    this.dt1970 = new Date(0)
  }
  now() {
    return new Date()
  }
  getDayOffset(dt, offset, start=true) {
    let result = new Date(dt)
    result.setDate(result.getDate() + offset)
    if (start) {
      return this.getDayStart(result)
    } else {
      return this.getDayEnd(result)
    }
  }
  getDayStart(dt) {
    let result = new Date(dt)
    result.setHours(0)
    result.setMinutes(0)
    result.setSeconds(0)
    result.setMilliseconds(0)
    return result
  }
  getDayEnd(dt) {
    let result = new Date(dt)
    result.setHours(23)
    result.setMinutes(59)
    result.setSeconds(59)
    result.setMilliseconds(999)
    return result
  }
  getMonthDays(year, month) {
    if (month < 1 || month > 12) { return 0 }
    if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
      return 31
    } else if (month === 2) {
      if (this.isLeapYear(year)) {
        return 29
      } else {
        return 28
      }
    } else {
      return 30
    }
  }
  isLeapYear(year) {
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          return true
        }
      } else {
        return true
      }
    }
    return false
  }
  getMonthStart(dt) {
    return new Date(dt.getFullYear(), dt.getMonth(), 1)
  }
  getMonthEnd(dt) {
    let day = this.getMonthDays(dt.getFullYear(), dt.getMonth() + 1)
    dt.setDate(day)
    return this.getDayEnd(dt)
  }
  getMonthOffset(dt, offset, start=true) {
    let result = new Date(dt)
    result.setDate(1)
    result.setMonth(result.getMonth() + offset)
    if (start) {
      return this.getMonthStart(result)
    } else {
      return this.getMonthEnd(result)
    }
  }
  getWeekOffset(dt, offset, start=true) {
    let result = new Date(dt)
    result.setDate(dt.getDate() - (dt.getDay() - 1) + 7 * offset)
    if (start) {
      return this.getDayStart(result)
    } else {
      result.setDate(result.getDate() + 6)
      return this.getDayEnd(result)
    }
  }
  iterMonth(start, end, filterFunc=null, reverse=false) {
    let result = []
    if (start > end) {
      return result
    }
    var tm = new Date(start)
    if (filterFunc) {
      if (filterFunc(tm)) {
        result.push(new Date(tm))
      }
    } else {
      result.push(new Date(tm))
    }
    do {
      tm.setMonth(tm.getMonth() + 1)
      if (filterFunc) {
        if (filterFunc(tm)) {
          result.push(new Date(tm))
        }
      } else {
        result.push(new Date(tm))
      }
    } while (tm.getFullYear() !== end.getFullYear() || tm.getMonth() !== end.getMonth())
    if (reverse) {
      result.reverse()
    }
    return result
  }
  dateToInt(dt) {
    // YYYYmmdd
    return dt.getFullYear() * 10000 + (dt.getMonth() + 1) * 100 + dt.getDate()
  }
  dateintToDt(intval) {
    let year = Math.floor(intval / 10000)
    let month = Math.floor(intval / 100) % 100
    let day = intval % 100
    return new Date(year, month - 1, day)
  }
  getTimestamp(dt) {
    return Math.floor(dt.getTime() / 1000)
  }
  formatMonth(dt) {
    let dtstr = `${dt.getFullYear()}-` +
      `${dt.getMonth() + 1}`.padStart(2, '0')
    return dtstr
  }
  formatDate(dt) {
    let dtstr = `${dt.getFullYear()}-` +
      `${dt.getMonth() + 1}`.padStart(2, '0') + '-' +
      `${dt.getDate()}`.padStart(2, '0')
    return dtstr
  }
  formatDatetime(dt) {
    let dtstr = `${dt.getFullYear()}-` +
      `${dt.getMonth() + 1}-`.padStart(3, '0') +
      `${dt.getDate()} `.padStart(3, '0') +
      `${dt.getHours()}:`.padStart(3, '0') +
      `${dt.getMinutes()}:`.padStart(3, '0') +
      `${dt.getSeconds()}`.padStart(2, '0')
    return dtstr
  }
  formatDatetimeMillseconds(dt) {
    let dtstr = `${dt.getFullYear()}-` +
      `${dt.getMonth() + 1}-`.padStart(3, '0') +
      `${dt.getDate()} `.padStart(3, '0') +
      `${dt.getHours()}:`.padStart(3, '0') +
      `${dt.getMinutes()}:`.padStart(3, '0') +
      `${dt.getSeconds()}.`.padStart(3, '0') +
      `${dt.getMilliseconds()}`.padStart(3, '0')
    return dtstr
  }

  /*
  @param [time: int]: 220000000
  @return '22:00:00'
  */
  formatTimeint(time) {
    time = time / 1000
    let value = {}
    value.hour = Math.floor(time / 10000)
    value.minute = Math.floor(time / 100) % 100
    value.seconds = time % 100
    let hour = value.hour
    let padHour = `${hour}`.padStart(2, '0')
    let padMinute = `${value.minute}`.padStart(2, '0')
    let padSeconds = `${value.seconds}`.padStart(2, '0')
    return `${padHour}:${padMinute}:${padSeconds}`
  }

  /*
  @param [time: int]: 220000000
  @return '上午22点00分00秒'
  */
  humanFormatTimeint(time) {
    time = time / 1000
    let value = {}
    value.hour = Math.floor(time / 10000)
    value.minute = Math.floor(time / 100) % 100
    value.seconds = time % 100
    let hour = value.hour
    let start = '上午'
    if (hour > 12) {
      hour -= 12
      start = '下午'
    }
    let padHour = `${hour}`.padStart(2, '0')
    let padMinute = `${value.minute}`.padStart(2, '0')
    let padSeconds = `${value.seconds}`.padStart(2, '0')
    return `${start}${padHour}点${padMinute}分${padSeconds}秒`
  }

  strftime() {
    return strftime(...arguments)
  }

  // timeStr: 00:00:00
  parseTimeStr(timeStr) {
    let timeArr = timeStr.split(':')
    let time = 0
    for (let item of timeArr) {
      time = time * 100 + Number(item)
    }
    return time * 1000
  }

  // str format: 2018-09-19 13:14:32
  parseDatetimeStr(dtmStr) {
    let pattern = new RegExp('(\\d{4})-(\\d{1,2})-(\\d{1,2}) (\\d{1,2}):(\\d{1,2}):(\\d{1,2})')
    let result = pattern.exec(dtmStr)
    if (result === null) {
      return null
    }
    return new Date(result[1], result[2] - 1, result[3], result[4], result[5], result[6])
  }

  // str format: 2018-09-19
  parseDateStr(dtStr) {
    let pattern = new RegExp('(\\d{4})-(\\d{1,2})-(\\d{1,2})')
    let result = pattern.exec(dtStr)
    if (result === null) {
      return null
    }
    return new Date(result[1], result[2] - 1, result[3], 0, 0, 0)
  }

  // str format: 2019-09
  parseMonthStr(monthStr) {
    let pattern = new RegExp('(\\d{4})-(\\d{1,2})')
    let result = pattern.exec(monthStr)
    if (result === null) {
      return null
    }
    return new Date(result[1], result[2] - 1, 1, 0, 0, 0)
  }
};

export var dtUtil = new DtUtil()

class SysUtil {
  constructor() {
    this.gCallbacks = []
  }
  isStringObject(obj) {
    return Object.prototype.toString.call(obj) === "[object String]"
  }

  isArrayObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]"
  }
  isDefined(value) {
    return value !== undefined && value !== null
  }
  isObject(x) {
    const type = typeof x
    return x !== null && (type === 'object' || type === 'function')
  }
  setLocalStore(name, content, isSession=false) {
    if (!name) {
      return
    }
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    if (isSession) {
      window.sessionStorage.setItem(name, content)
    } else {
      window.localStorage.setItem(name, content)
    }
  }

  getLocalStore(name, isSession=false) {
    if (!name) {
      return undefined
    }
    if (isSession) {
      return window.sessionStorage.getItem(name)
    } else {
      return window.localStorage.getItem(name)
    }
  }

  // remove local store item
  removeLocalStore(name, isSession=false) {
    if (!name) {
      return
    }
    if (isSession) {
      window.sessionStorage.removeItem(name)
    } else {
      window.localStorage.removeItem(name)
    }
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
  }

  dynamicLoadScript (src, callback, loadedCheck=null) {
    const existingScript = document.getElementById(src)
    const cb = callback || function() {}

    if (!existingScript) {
      const script = document.createElement('script')
      script.src = src // src url for the third-party library being loaded.
      script.id = src
      document.body.appendChild(script)
      this.gCallbacks.push(cb)
      const onEnd = 'onload' in script ? stdOnEnd : ieOnEnd
      onEnd(script)
    }

    if (existingScript && cb) {
      if (loadedCheck()) {
        setTimeout(() => {
          cb(null, existingScript)
        }, 0)
      } else {
        this.gCallbacks.push(cb)
      }
    }

    let this_ = this
    function stdOnEnd(script) {
      script.onload = function() {
        // this_.onload = null here is necessary
        // because even IE9 works not like others
        this_.onerror = this_.onload = null
        for (const cb of this_.gCallbacks) {
          cb(null, script)
        }
        this_.gCallbacks = []
      }
      script.onerror = function() {
        this_.onerror = this_.onload = null
        cb(new Error('Failed to load ' + src), script)
      }
    }

    function ieOnEnd(script) {
      script.onreadystatechange = function() {
        if (this_.readyState !== 'complete' && this_.readyState !== 'loaded') return
        this_.onreadystatechange = null
        for (const cb of this_.gCallbacks) {
          cb(null, script) // there is no way to catch loading errors in IE8
        }
        this_.gCallbacks = []
      }
    }
  }

  // 创建本地文件的url，用于image显示
  getObjectURL(file) {
    var url = null
    if (window.createObjectURL !== undefined) { // basic
      url = window.createObjectURL(file)
    } else if (window.URL !== undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file)
    } else if (window.webkitURL !== undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file)
    }
    return url
  }
};

export var sysUtil = new SysUtil()

export class Timer {
  constructor() {
    this.isRunning = false
    this.timer = null
    this.startTm = null
  }
  reset () {
    this.stop()
    this.startTm = null
  }
  start (func) {
    this.isRunning = true
    this.startTm = new Date()
    if (!this.timer) {
      this.timer = setInterval(() => {
        let curTm = new Date()
        let tmdiff = curTm.getTime() - this.startTm.getTime()
        // console.log(`tmdiff ${tmdiff}`)
        func(tmdiff, curTm, this.startTm)
      }, 300)
    }
  }
  stop () {
    this.isRunning = false
    clearInterval(this.timer)
    this.timer = null
  }
}
