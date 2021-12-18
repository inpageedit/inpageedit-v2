/**
 * @type {(base: string) => string}
 */
const getDir = (base = '') => {
  if (base.startsWith('https://cdn.jsdelivr.net')) {
    return base.split('/').slice(0, -2).join('/')
  } else if (base.startsWith(location.origin)) {
    return base.split('/').slice(0, -1).join('/')
  } else {
    return 'https://cdn.jsdelivr.net/npm/mediawiki-inpageedit@latest'
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
