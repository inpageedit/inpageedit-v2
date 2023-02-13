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
  $elements.each(function (_, anchor) {
    // 排除异常
    const rawHref = anchor.getAttribute('href')
    if (
      !rawHref ||
      rawHref.startsWith('#') ||
      rawHref.startsWith('javascript:')
    ) {
      return
    }

    // 缓存wiki相关变量
    // prettier-ignore
    const articlePath = config.wgArticlePath.replace('$1', ''),
      wikiBaseURL = `${location.protocol}//${config.wgServer.split('//')[1]}`,
      wikiArticleBaseURL = `${wikiBaseURL}${articlePath}`,
      wikiScriptBaseURL = `${wikiBaseURL}${config.wgScriptPath}`
    // 缓存链接相关变量
    // prettier-ignore
    const href = anchor.href,
      anchorURL = new URL(href),
      params = anchorURL.searchParams,
      action = params.get('action') || params.get('veaction'),
      title = params.get('title') ||
              decodeURI(anchorURL.pathname.substring(articlePath.length)) ||
              null,
      section = params.get('section')?.replace(/^T-/, '') || null,
      revision = params.get('oldid')

    /** 排除例外情况 */
    // prettier-ignore
    if (
      // 不合法的 title
      !title ||
      title.endsWith('.php') ||
      // 不是 edit 相关操作
      !['edit', 'editsource'].includes(action) ||
      // 链接指向的既不是本wiki的 canonicalurl 也不是 permalink
      !(href.startsWith(wikiArticleBaseURL) || href.startsWith(wikiScriptBaseURL)) ||
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

    $(anchor).addClass('ipe-articleLink-resolved').after($editLink)
  })
}

module.exports = {
  articleLink,
}
