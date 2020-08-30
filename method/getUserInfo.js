var mwApi = new mw.Api();

var getUserInfo = function () {
  /**
 * @description 获取用户权限信息
 */
  mw.user.getRights().then(rights => {
    console.info('[InPageEdit] 成功获取用户权限信息');
    mw.config.set('wgUserRights', rights);
  }).fail(function () {
    console.warn('[InPageEdit] 警告：无法获取用户权限信息');
    mw.config.set('wgUserRights', []);
  });

  /**
   * @description 获取封禁状态
   */
  if (mw.user.getName() !== null) {
    mwApi.get({
      action: 'query',
      list: 'users',
      usprop: 'blockinfo',
      ususers: mw.user.getName()
    }).then(data => {
      if (data.query.users[0].blockid) {
        mw.config.set('wgUserIsBlocked', true);
      } else {
        mw.config.set('wgUserIsBlocked', false);
      }
    });
  }
}

module.exports = {
  getUserInfo
}