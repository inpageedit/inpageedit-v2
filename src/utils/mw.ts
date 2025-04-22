import version from '../constants/version'

/**
 * 警告：从此 Map 获取页面初始化以后动态绑定的配置项可能(?)是不安全的
 */
// @ts-ignore - values 被标记为 private，事实上可访问
export const mwConfig: ReturnType<typeof mw.config.get> = mw.config.values

/** @type {mw.Api} */
let _cachedMwApi: mw.Api | null = null
export const useMwApi = (): mw.Api => {
  if (!_cachedMwApi) {
    _cachedMwApi = new mw.Api({
      parameters: {
        formatversion: 2,
        format: 'json',
      },
      ajax: {
        headers: {
          'X-Api-User-Agent': `InPageEdit-v2/${version}`,
        },
      },
    })
  }
  return _cachedMwApi
}
