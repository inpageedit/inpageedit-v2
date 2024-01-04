import { analyticsApi } from './endpoints'
import { preference } from './preference'
import { mwConfig } from '../utils/mw'
import version from './version'

/**
 * @module _analytics 提交统计信息模块
 * @param {string} featID 模块ID，例如 quick_edit
 */
export function _analytics(featID) {
  if (preference.get('doNotCollectMyInfo') === true) {
    // console.info('[InPageEdit] 我们已不再收集您使用插件的信息。');
    // return;
  }
  const submitData = {
    siteUrl: getSiteID(),
    siteName: mwConfig.wgSiteName,
    userName: mwConfig.wgUserName,
    featureID: featID,
    ipeVersion: version,
  }
  $.ajax({
    url: `${analyticsApi}/submit`,
    data: submitData,
    type: 'post',
    dataType: 'json',
  }).done(function (data) {
    console.log('[InPageEdit] Analytics response', data)
  })
}

export function getSiteID() {
  return `${mwConfig.wgServer}${mwConfig.wgArticlePath.replace('$1', '')}`
}

export {
  _analytics as _analysis, // legacy alias
}
