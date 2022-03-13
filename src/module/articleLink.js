var config = mw.config.get()
const { _msg } = require('./_msg')

const { preference } = require('./preference')
const { quickEdit } = require('./quickEdit')

const { getParamValue } = mw.util

/**
 * @module articleLink 获取段落编辑以及编辑链接
 * @param {string | HTMLAnchorElement | JQuery<HTMLAnchorElement>} el Anchors to inject edit links
 */
function articleLink(el) {
  if (!el) {
    if (preference.get('redLinkQuickEdit') === true) {
      el = $('#mw-content-text a')
    } else {
      el = $('#mw-content-text a:not(.new)')
    }
  }
  /** @type {JQuery<HTMLAnchorElement>} */
  const $el = $(el)
  $el.each(function (_, item) {
    const $this = $(item)
    if (
      $this.attr('href') === undefined ||
      $this.attr('href').startsWith('#')
    ) {
      return
    }
    // element.href必定带protocol
    let url = $this.get(0).href,
      action = getParamValue('action', url) || getParamValue('veaction', url),
      title = getParamValue('title', url),
      section = getParamValue('section', url)
        ? getParamValue('section', url).replace(/T-/, '')
        : null,
      revision = getParamValue('oldid', url),
      wikiUrl = `${location.protocol}//${config.wgServer.split('//').pop()}`

    // 不是本地编辑链接
    if (!url.startsWith(wikiUrl)) {
      return
    }

    // 暂时屏蔽 undo
    if (getParamValue('undo', url)) {
      return
    }

    // 不是 index.php?title=FOO 形式的url
    if (title === null && ['edit', 'editsource'].includes(action)) {
      let articlePath = config.wgArticlePath.replace('$1', '')
      // 掐头去尾，获取包含文章路径的字符串
      title = url.slice(wikiUrl.length).split('?')[0]
      // 去除文章路径，之所以这么处理是因为文章路径有可能是 /
      title = title.split(articlePath).slice(1).join(articlePath)
    }

    // 解码 URL
    title = decodeURIComponent(title)

    if (['edit', 'editsource'].includes(action) && title !== undefined) {
      $this.addClass('ipe-articleLink-resolved').after(
        $('<span>', {
          class: 'in-page-edit-article-link-group',
        }).append(
          $('<a>', {
            href: 'javascript:void(0)',
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
            if (!config.wgIsArticle) options.reload = false
            quickEdit(options)
          })
        )
      )
    }
  })
}

module.exports = {
  articleLink,
}
