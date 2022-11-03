const vueLogger = {}
vueLogger.install = function (Vue, options) {
  if (vueLogger.installed) {
    return
  }
  var logger = {
    dev: true,
    prefix: '',
    levels: ['log', 'warn', 'debug', 'error']
  }
  if (options) {
    for (const key of Object.keys(options)) {
      if (key === 'levels') {
        logger[key] = logger[key].concat(options[key])
      } else {
        logger[key] = options[key]
      }
    }
  }
  for (const level of logger.levels) {
    logger[level] = function () {
      if ((!this.dev && level !== 'error') ||
        typeof console === 'undefined') {
        return
      }
      if (!''.padStart) {
        return
      }
      var args = Array.from(arguments)
      let date = new Date()
      let strDate = `${date.getFullYear()}-` +
      `${date.getMonth() + 1}-`.padStart(3, '0') +
      `${date.getDate()} `.padStart(3, '0') +
      `${date.getHours()}:`.padStart(3, '0') +
      `${date.getMinutes()}:`.padStart(3, '0') +
      `${date.getSeconds()}.`.padStart(3, '0') +
      `${date.getMilliseconds()}`.padStart(3, '0')
      args.unshift(`[${strDate}::${this.prefix}-${level}]`.toUpperCase())
      console[level].apply(console, args)
    }
  }
  Vue.prototype.$log = logger
  Vue.$log = logger
}
export default vueLogger
