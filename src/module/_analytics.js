const { analyticsApi } = require('./api')
const { preference } = require('./preference')
const { config } = require('./util')
const version = require('./version')

/**
 * @module _analytics 提交统计信息模块
 * @param {string} featID 模块ID，例如 quick_edit
 */
function _analytics(featID) {
  if (preference.get('doNotCollectMyInfo') === true) {
    // console.info('[InPageEdit] 我们已不再收集您使用插件的信息。');
    // return;
  }
  const submitData = {
    siteUrl: getSiteID(),
    siteName: config.wgSiteName,
    userName: config.wgUserName,
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

function getSiteID() {
  return `${config.wgServer}${config.wgArticlePath.replace('$1', '')}`
}

module.exports = {
  _analytics,
  _analysis: _analytics, // compatibility
  getSiteID,
}
