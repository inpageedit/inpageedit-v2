/**
 * @module _hasRight 是否拥有权限
 * @param {string} right
 * @return {boolean}
 */
export const hasRight = function (right) {
  const conf = window.mw.config.get()
  console.info(
    '[InPageEdit] _hasRight',
    right,
    conf.wgUserIsBlocked,
    conf.wgUserRights
  )
  if (conf.wgUserIsBlocked) {
    return false
  }
  return (conf.wgUserRights || []).includes(right)
}
// KEEP THIS
export { hasRight as _hasRight }
