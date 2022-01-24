const config = mw.config.get()
const { _msg } = require('./_msg')
const { _analytics } = require('./_analytics')
const { getParamValue } = mw.util

const { quickDiff } = require('./quickDiff')
const { quickEdit } = require('./quickEdit')

function injectLinks(container) {
  $(container || '#mw-content-text')
    .find('a[href]:not(.ipe-diff-mounted)')
    .toArray()
    .forEach((el) => {
      const $this = $(el),
        href = $this.attr('href')
      /** @type {'prev' | 'next' | 'cur' | '0' | `${number}`} */
      let diff = getParamValue('diff', href),
        /** @type {`${number}` | null} */
        curid = getParamValue('curid', href),
        /** @type {`${number}` | null} */
        oldid = getParamValue('oldid', href)

      // 没有 diff 参数那么一般不是比较页面
      if (diff === null) {
        return
      }
      // 没有 oldid 的情况比较罕见，但这确实是有的
      if (!oldid) {
        oldid = diff
        diff = 'prev'
      }
      // 进行状态标记
      $this.addClass('ipe-diff-mounted')

      // 点击事件
      $this.on('click', function (e) {
        e.preventDefault()
        _analytics('quick_diff_recentchanges')

        // 这种一般是与当前作比较
        if (diff === '0') {
          return quickDiff({
            fromrev: oldid,
            toid: curid || undefined,
            torelative: !curid ? 'cur' : undefined,
          })
        }

        // 这种是通过关系进行比较
        if (['prev', 'next', 'cur'].includes(diff)) {
          return quickDiff({ fromrev: oldid, torelative: diff })
        }

        // 这种是大多数情况，oldid 和 curid 都是有效的
        return quickDiff({
          fromrev: oldid,
          torev: diff || undefined,
          torelative: !diff ? 'cur' : undefined,
        })
      })
    })
}

const loadQuickDiff = function (container) {
  // 最近更改
  if ($('.mw-rcfilters-enabled').length > 0) {
    setInterval(() => {
      injectLinks(container)
    }, 500)
    $('.mw-rcfilters-enabled').addClass('ipe-quickdiff-active')
  } else {
    injectLinks(container)
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
