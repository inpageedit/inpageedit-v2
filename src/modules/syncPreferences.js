// ========================================= //
// 跨设备设置同步：使用 mw 自带的 option API，
// 将 IPE 的参数设置保存在数据库内，实现多端同步
// ========================================= //

import { useMwApi } from '../utils/mw'

/**
 * @param {string} name
 * @return {string}
 */
const prefKey = (name) => `userjs-inpageedit-${name}`

/**
 * @param {string} name
 * @param {Record<string, any>} value
 * @returns {Promise<{options: 'success'}>}
 */
export async function setPreferences(name, value) {
  value = {
    ...mw.user.options.value[prefKey(name)],
    ...value,
  }
  return useMwApi().postWithToken('csrf', {
    format: 'json',
    action: 'options',
    change: new URLSearchParams({
      [prefKey(name)]: JSON.stringify(value),
    }).toString(),
  })
}

/**
 * @param {string} name
 * @returns {Promise<Record<string, any>>}
 */
export async function getPreferences(name) {
  const data = await useMwApi().get({
    format: 'json',
    action: 'query',
    meta: 'userinfo',
    uiprop: 'options',
  })
  mw.user.options.value = data
  const option = data.query.userinfo.options[prefKey(name)] || '{}'
  return JSON.parse(decodeURIComponent(option))
}
