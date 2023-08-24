/**
 * @type {string}
 * @desc
 * - 插件CDN的URL路径，不含尾随 `/`
 * - 注意，如果您想自己自己托管 InPageEdit，`_dir`可以直接返回您的URL
 */
export const baseURL = import.meta.env.DEV
  ? import.meta.env.BASE_URL.replace(/\/+$/, '')
  : resolveLegacyBaseURL(document?.currentScript?.src)

export { baseURL as default }

/**
 * @type {(src?: string) => string}
 */
export function resolveLegacyBaseURL(src = '') {
  src = src.split('?')[0]
  // @example
  // https://cdn.jsdelivr.net/npm/mediawiki-inpageedit/dist/InPageEdit.js
  // http://127.0.0.1:1005/InPageEdit.js
  if (src.endsWith('.js')) {
    if (src.includes('/dist/')) {
      return src.split('/dist/')[0]
    } else {
      return src.split('/').slice(0, -1).join('/')
    }
  }
  // @example
  // https://cdn.jsdelivr.net/npm/mediawiki-inpageedit
  // https://unpkg.com/mediawiki-inpageedit
  else {
    return src.replace(/\/$/, '')
  }
}

export function resolvePath(fileName = '') {
  return `${baseURL}/${fileName.replace(/^\/+/, '')}`
}
