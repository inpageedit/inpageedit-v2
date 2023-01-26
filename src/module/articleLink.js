var config = mw.config.get()
const { _msg } = require('./_msg')

const { preference } = require('./preference')
const { quickEdit } = require('./quickEdit')

/**
 * @module articleLink 获取段落编辑以及编辑链接
 * @param {string | HTMLAnchorElement | JQuery<HTMLAnchorElement>} elements Anchors to inject edit links
 */
function articleLink(elements) {
  if (!elements) {
    if (preference.get('redLinkQuickEdit') === true) {
      elements = $('#mw-content-text a, #firstHeading a')
    } else {
      elements = $('#mw-content-text a:not(.new), #firstHeading a:not(.new)')
    }
  }
  /** @type {JQuery<HTMLAnchorElement>} */
  const $elements = $(elements)
  $elements.each(function (_, el) {
    // 排除异常
    const rawHref = el.getAttribute('href')
    if (
      !rawHref ||
      rawHref.startsWith('#') ||
      rawHref.startsWith('javascript:')
    ) {
      return
    }

    // 缓存变量
    const href = el.href,
      url = new URL(href),
      wikiURL = new URL(config.wgServer),
      params = new URLSearchParams(url.searchParams),
      action = params.get('action') || params.get('veaction'),
      title =
        params.get('title') ||
        url.pathname.substring(config.wgArticlePath.replace('$1', '').length) ||
        null,
      section = params.get('section')?.replace(/^T-/, '') || null,
      revision = params.get('oldid')

    /** 排除例外情况 */
    if (
      // 未能取得 title
      !title ||
      // 不是 edit 相关操作
      !['edit', 'editsource'].includes(action) ||
      // 链接的地址与wiki地址和标签页地址均不一致，不是本wiki的链接
      ![wikiURL.host, location.host].includes(url.host) ||
      // 暂时未兼容 undo
      params.get('undo') ||
      // 暂时未兼容 preload
      params.get('preload')
    ) {
      return
    }

    const $editLink = $('<span>', {
      class: 'in-page-edit-article-link-group',
    }).append(
      $('<a>', {
        href: 'javascript:;',
        class: 'in-page-edit-article-link',
        text: _msg('quick-edit'),
      }).on('click', function () {
        var options = {}
        options.page = title
        if (revision !== null) {
          options.revision = revision
        } else if (section !== null) {
          options.section = section
        }
        if (!config.wgIsArticle) {
          options.reload = false
        }
        quickEdit(options)
      })
    )

    el.classList.add('ipe-articleLink-resolved')
    el.insertAdjacentElement('afterend', $editLink.get(0))
  })
}

module.exports = {
  articleLink,
}
