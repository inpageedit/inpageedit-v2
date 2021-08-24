var mwApi = new mw.Api()

const { _hasRight } = require('./_hasRight')

var checkPatrol = function () {
  // 没找到检查页面是否需要巡查的 API
  return _hasRight('patrol')
}

var quickPatrol = function (revid, done, fail) {
  var failFallback = function (errorCode, errorThrown) {
    console.warn('[InPageEdit] 快速巡查失败: ' + errorCode + " " + errorThrown)
    fail()
  }
  console.log('[InPageEdit] 尝试获取巡查 Token...')
  mwApi.get({
    action: 'query',
    meta: 'tokens',
    type: 'patrol',
    format: 'json'
  }).done(function (data) {
    console.log('[InPageEdit] 尝试巡查...')
    mwApi.post({
      action: 'patrol',
      revid: revid,
      token: data.query.tokens.patroltoken,
      format: 'json'
    }).done(function () {
      console.log('[InPageEdit] 巡查成功')
      done();
    }).fail(failFallback)
  }).fail(failFallback)
}

module.exports = {
  checkPatrol, quickPatrol
}