/**
 * 业务通用函数集合
 *
 */
import { dtUtil } from 'jscom/utils/sysutil'

export function getFullAddress (addressInfo) {
  return `${addressInfo.provinceName} ${addressInfo.cityName} ${addressInfo.areaName} ${addressInfo.address}`
}

export function getDeadline (enterpriseInfo) {
  let start = dtUtil.formatDate(new Date(enterpriseInfo.businessTermStart))
  let end = '无固定期限'
  if (enterpriseInfo.businessTermFlg === '0') {
    end = dtUtil.formatDate(new Date(enterpriseInfo.businessTermEnd))
  }
  return `${start} 至 ${end}`
}

export function formatTel (telInfo) {
  if (telInfo.extCode) {
    return `${telInfo.districtNo}-${telInfo.phone}*${telInfo.extCode}`
  } else {
    return `${telInfo.districtNo}-${telInfo.phone}`
  }
}

export function parseTel (tel) {
  let telArr = tel.split('-')
  if (telArr.length === 1) {
    return [telArr[0]]
  }
  let phoneArr = telArr[1].split('*')
  if (phoneArr.length === 1) {
    return [telArr[0], phoneArr[0]]
  }
  return [telArr[0], phoneArr[0], phoneArr[1]]
}
