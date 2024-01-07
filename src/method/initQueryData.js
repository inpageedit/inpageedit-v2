import { mwConfig, useMwApi } from '../utils/mw'

export async function initQueryData() {
  // Init
  mw.config.set('wgUserRights', [])
  mw.config.set('wgUserIsBlocked', false)
  mw.config.set('wgSpecialPageAliases', [])

  const {
    query: { users, userinfo, specialpagealiases },
  } = await useMwApi().get({
    action: 'query',
    ususers: mwConfig.wgUserName,
    meta: ['userinfo', 'siteinfo'],
    list: ['users'],
    uiprop: ['rights'],
    siprop: ['specialpagealiases'],
    usprop: ['blockinfo'],
  })
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
