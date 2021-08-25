var api = require('./api.json')
const { preference } = require('./preference')
var { config } = require('./util')

/**
 * @module _analysis 提交统计信息模块
 * @param {string} featureID 模块ID，例如 quick_edit
 */
const _analysis = function (featureID) {
  if (preference.get('doNotCollectMyInfo') === true) {
    // console.info('[InPageEdit] 我们已不再收集您使用插件的信息。');
    // return;
  }
  const submitData = {
    siteUrl: config.wgServer + config.wgArticlePath.replace('$1', ''),
    siteName: config.wgSiteName,
    userName: config.wgUserName,
    featureID,
  }
  $.ajax({
    url: `${api.analysisApi}/submit`,
    data: submitData,
    type: 'post',
    dataType: 'json',
  }).done(function (data) {
    console.log('[InPageEdit] Analysis response', data)
  })
}

module.exports = {
  _analysis,
}
