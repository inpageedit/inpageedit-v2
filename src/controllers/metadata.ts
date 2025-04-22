import { mwConfig, useMwApi } from '../utils/mw'

let _promise: JQuery.Promise<any> | null = null
/**
 * 预加载运行时需要的元数据
 * 用户信息、权限、特殊页面别名等
 */
export async function fetchMetadata() {
  if (!_promise) {
    _promise = useMwApi()
      .get({
        action: 'query',
        ususers: mwConfig.wgUserName || '',
        meta: ['userinfo', 'siteinfo'],
        list: ['users'],
        uiprop: ['rights'],
        siprop: ['specialpagealiases'],
        usprop: ['blockinfo'],
      })
      .catch((e) => {
        console.error('[InPageEdit]', 'fetchMetadata error', e)
        _promise = null
        return Promise.reject(e)
      })
  }
  const {
    query: { users, userinfo, specialpagealiases },
  } = await _promise
  // Blockinfo
  if (users?.[0].blockid) {
    mw.config.set('wgUserIsBlocked', true)
  }
  // Rights
  mw.config.set('wgUserRights', userinfo?.rights || [])
  // Special page aliases
  mw.config.set('wgSpecialPageAliases', specialpagealiases)

  return { users, userinfo, specialpagealiases }
}

export function useUserIsBlocked() {
  return mw.config.get('wgUserIsBlocked', false) as boolean
}
export function useUserRights() {
  return mw.config.get('wgUserRights', []) as string[]
}
export function useSpecialPageAliases() {
  return mw.config.get('wgSpecialPageAliases', []) as {
    realname: string
    aliases: string[]
  }[]
}
