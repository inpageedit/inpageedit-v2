import { useUserIsBlocked, useUserRights } from '@/controllers/metadata'

/**
 * 是否拥有权限
 * @param {string} right
 * @return {boolean}
 */
export const hasRight = function (right: string) {
  const isBlocked = useUserIsBlocked()
  if (isBlocked) {
    return false
  }
  const rights = useUserRights()
  return rights.includes(right)
}
// 旧版兼容
export { hasRight as _hasRight }
