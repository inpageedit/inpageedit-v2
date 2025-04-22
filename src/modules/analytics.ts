import { Endpoints } from '../constants/endpoints'
import { preference } from './preference'
import { mwConfig } from '../utils/mw'
import version from '../constants/version'

/**
 * @module _analytics 提交统计信息模块
 * @param {string} featID 模块ID，例如 quick_edit
 */
export async function analytics(featID: string) {
  if (preference.get<boolean>('doNotCollectMyInfo') === true) {
    // console.info('[InPageEdit] 我们已不再收集您使用插件的信息。');
    // return;
  }
  const body = {
    siteUrl: getSiteID(),
    siteName: mwConfig.wgSiteName,
    userName: mwConfig.wgUserName,
    featureID: featID,
    ipeVersion: version,
  }
  return fetch(`${Endpoints.ANALYTICS_API_BASE}/submit`, {
    method: 'POST',
    body: JSON.stringify(body),
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

// 旧版兼容
export { analytics as _analysis, analytics as _analytics }
