const config = mw.config.get()
const { _msg } = require('./_msg')
const { _analytics } = require('./_analytics')
const { getParamValue } = mw.util

const { quickDiff } = require('./quickDiff')
const { quickEdit } = require('./quickEdit')

function addLink(container) {
  $('a[data-ipe-quickdiff-active]').off('click')
  $(container || '#mw-content-text')
    .find('a[href]')
    .attr('data-ipe-quickdiff-active', '')
    .on('click', function (e) {
      const $this = $(this),
        href = $this.attr('href'),
        diff = getParamValue('diff', href),
        curid = getParamValue('curid', href),
        oldid = getParamValue('oldid', href)
      if ([diff, curid, oldid].filter((i) => i !== null).length < 2) {
        return
      }
      e.preventDefault()
      _analytics('quick_diff_recentchanges')
      if (diff === '0') {
        quickDiff({ fromrev: oldid, toid: curid })
      } else if (diff === 'prev' || diff === 'next' || diff === 'cur') {
        quickDiff({ fromrev: oldid, torelative: diff })
      } else {
        quickDiff({ fromrev: oldid, torev: diff || 'prev' })
      }
    })
}

const loadQuickDiff = function (container) {
  // 最近更改
  if ($('.mw-rcfilters-enabled').length > 0) {
    setInterval(() => {
      addLink(container)
    }, 500)
    $('.mw-rcfilters-enabled').addClass('ipe-continuous-active')
  } else {
    addLink(container)
  }

  // 查看历史页面的比较按钮与快速编辑
  if (config.wgAction === 'history') {
    $('.historysubmit.mw-history-compareselectedversions-button').after(
      $('<button>')
        .text(_msg('quick-diff'))
        .on('click', function (e) {
          e.preventDefault()
          _analytics('quick_diff_history_page')
          const before = $('.selected.before').attr('data-mw-revid'),
            after = $('.selected.after').attr('data-mw-revid')
          quickDiff({ fromrev: after, torev: before })
        })
    )
    $('[data-mw-revid]').each(function () {
      var $this = $(this),
        oldid = $this.attr('data-mw-revid')
      $this.find('.mw-history-undo').after(
        $('<span>').append(
          ' | ',
          $('<a>', {
            href: 'javascript:;',
            class: 'in-page-edit-article-link',
            text: _msg('quick-edit'),
          }).on('click', function () {
            quickEdit({
              page: config.wgPageName,
              revision: oldid,
            })
          })
        )
      )
    })
  }
}

module.exports = {
  loadQuickDiff,
}
