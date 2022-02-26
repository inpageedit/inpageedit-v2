var config = mw.config.get()
const { _msg } = require('./_msg')

const { preference } = require('./preference')
const { quickEdit } = require('./quickEdit')

const { getParamValue } = mw.util

/**
 * @module articleLink 获取段落编辑以及编辑链接
 * @param {Sting|Element} el jQuery element to find edit links
 */
function articleLink(el) {
  if (el === undefined) {
    if (preference.get('redLinkQuickEdit') === true) {
      el = $('#mw-content-text a')
    } else {
      el = $('#mw-content-text a:not(.new)')
    }
  }
  el = $(el)
  $.each(el, function (_, item) {
    var $this = $(item)
    if ($this.attr('href') === undefined) return
    // element.href必定带protocol
    let url = $this[0].href,
      action = getParamValue('action', url) || getParamValue('veaction', url),
      title = getParamValue('title', url),
      section = getParamValue('section', url)
        ? getParamValue('section', url).replace(/T-/, '')
        : null,
      revision = getParamValue('oldid', url)

    // 不是本地编辑链接
    if (!url.startsWith(`${location.protocol}${config.wgServer}/`)) return

    // 暂时屏蔽 section=new #137
    if (section === 'new') return

    // 暂时屏蔽 undo
    if (getParamValue('undo', url)) return

    // 不是 index.php?title=FOO 形式的url
    if (title === null && ['edit', 'editsource'].includes(action)) {
      title = url.slice(location.protocol.length + config.wgServer.length)
      title = title.split('?')[0]
      const escape = mw.util.escapeRegExp ?? mw.RegExp.escape
      const articlePath = RegExp(escape(config.wgArticlePath).replace('\\$1', '(.+)'))
      if (title.startsWith(config.wgScript))
        title = decodeURIComponent(title.slice(config.wgScript.length + 1))
      else if (articlePath.test(title))
        title = decodeURIComponent(title.match(articlePath)[1])
      else title = undefined
    }

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
