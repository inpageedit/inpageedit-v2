const { mwApi } = require('./util')
const { _hasRight } = require('./_hasRight')

var checkPatrol = function () {
  // 没找到检查页面是否需要巡查的 API
  return _hasRight('patrol')
}

var quickPatrol = function (revid, done, fail) {
  console.log('[InPageEdit] 尝试快速巡查...')
  mwApi
    .post({
      action: 'patrol',
      revid: revid,
      token: mw.user.tokens.get('patrolToken'),
      format: 'json',
    })
    .done(function () {
      console.log('[InPageEdit] 快速巡查成功')
      done()
    })
    .fail(function (errorCode) {
      console.warn(
        '[InPageEdit] 快速巡查失败: ' + errorCode
      )
      fail()
    })
}

module.exports = {
  checkPatrol,
  quickPatrol,
}
