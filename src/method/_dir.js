/**
 * @type {(src?: string) => string}
 */
const getDir = (src = '') => {
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

/**
 * @type {string}
 * @desc
 * - 插件CDN的URL路径，不含尾随 `/`
 * - 注意，如果您想自己自己托管 InPageEdit，`_dir`可以直接返回您的URL
 */
const _dir = getDir(document?.currentScript?.src)

module.exports = _dir
