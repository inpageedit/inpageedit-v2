// ========================================= //
// 跨设备设置同步：使用 mw 自带的 option API，
// 将 IPE 的参数设置保存在数据库内，实现多端同步
// ========================================= //

const mwApi = new mw.Api()

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
async function setPreferences(name, value) {
  value = {
    ...mw.user.options.value[prefKey(name)],
    ...value,
  }
  return mwApi.postWithToken('csrf', {
    format: 'json',
    action: 'options',
    change: `${prefKey(name)}=${encodeURIComponent(JSON.stringify(value))}`,
  })
}

/**
 * @param {string} name
 * @returns {Promise<Record<string, any>>}
 */
async function getPreferences(name) {
  const data = await mwApi.get({
    format: 'json',
    action: 'query',
    meta: 'userinfo',
    uiprop: 'options',
  })
  mw.user.options.value = data
  const option = data.query.userinfo.options[prefKey(name)] || '{}'
  return JSON.parse(decodeURIComponent(option))
}

module.exports = {
  setPreferences,
  getPreferences,
}
