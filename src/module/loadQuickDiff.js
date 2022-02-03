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
        /** @type {'prev' | 'next' | 'cur' | `${number}`} */
        oldid = getParamValue('oldid', href),
        timestamp = getParamValue('timestamp', href)

      // 形如 Special:Diff/[oldid]/[diff]
      const specialDiffName = mw.config
        .get('wgSpecialPageAliases', [])
        .find(({ realname }) => realname === 'Diff')
        ?.aliases.map((i) => [i, encodeURI(i)])
        .flat() || ['Diff']
      const specialDiffReg = new RegExp(
        `^${config.wgArticlePath.replace('$1', '')}(?:Special|${
          config.wgFormattedNamespaces[-1]
        }):(?:${specialDiffName.join(
          '|'
        )})/(\\d+|cur|prev|next)/(\\d+|cur|prev|next)$`
      )
      const specialDiffMatch = href.match(specialDiffReg)
      if (specialDiffMatch) {
        oldid = specialDiffMatch[1]
        diff = specialDiffMatch[2]
      }

      // 进行例外排除
      if (
        // 没有 diff 参数一般不是比较链接
        diff === null ||
        // Special:Undelete 中的比较链接
        timestamp !== null
      ) {
        return
      }
      // 进行状态标记
      $this.addClass('ipe-diff-mounted')
      // 处理请求参数
      const params = {}
      const getParamType = (i) => {
        if (['prev', 'next', 'cur'].includes(i) || i === null) {
          return 'relative'
        } else if (i === '0') {
          return 'id'
        } else {
          return 'rev'
        }
      }
      params[`from${getParamType(oldid)}`] = oldid !== null ? oldid : 'prev'
      params[`to${getParamType(diff)}`] = diff !== '0' ? diff : curid
      // debug
      $this.attr('ipe-diff-params', JSON.stringify(params))

      // 点击事件
      $this.on('click', function (e) {
        e.preventDefault()
        _analytics('quick_diff_recentchanges')
        return quickDiff(params)
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
