/**
 * @type {string}
 * @desc
 * - 插件CDN的URL路径，不含尾随 `/`
 * - 注意，如果您想自己自己托管 InPageEdit，`_dir`可以直接返回您的URL
 *
 */
const _dir =
  document?.currentScript?.src?.split('/').slice(0, -2).join('/') ??
  'https://cdn.jsdelivr.net/npm/mediawiki-inpageedit@latest'

module.exports = _dir
