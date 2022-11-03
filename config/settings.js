'use strict'
let defaultProjName = 'backbone'
let projName = ''
if (process.env.NODE_ENV === 'development') {
  projName = process.env.PROJ_NAME || defaultProjName
} else {
  projName = process.argv[2] || defaultProjName
}

projName = projName.trim()

// 开始设置
let settings_prod = {
  DEFAULT_PROJ_NAME: defaultProjName,
  PROJ_NAME: projName,
  STATIC_URL: '/static/'
}

let settings_dev = {
  // STATIC_URL: '/static/'
}

let settings = {}
if (process.env.NODE_ENV === 'production') {
  Object.assign(settings, settings_prod)
}

if (process.env.NODE_ENV === 'development') {
  Object.assign(settings, settings_prod)
  Object.assign(settings, settings_dev)
}

module.exports = settings
