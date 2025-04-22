import { analyticsApi } from './endpoints'
import { preference } from './preference'
import { mwConfig } from '../utils/mw'
import version from './version'

/**
 * @module _analytics 提交统计信息模块
 * @param {string} featID 模块ID，例如 quick_edit
 */
export async function _analytics(featID) {
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
  return fetch(`${analyticsApi}/submit`, {
    method: 'POST',
    body: JSON.stringify(submitData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (response) => {
      return { response, body: await response.json() }
    })
    .then(({ response, body }) => {
      if (!response.ok) {
        throw new Error(`Response error: ${response.status}`, {
          cause: { response, body },
        })
      }
      console.log('[InPageEdit] Analytics ok', body)
    })
    .catch((error) => {
      console.error('[InPageEdit] Analytics error', error)
    })
}

export function getSiteID() {
  return `${mwConfig.wgServer}${mwConfig.wgArticlePath.replace('$1', '')}`
}

export {
  _analytics as _analysis, // legacy alias
}
