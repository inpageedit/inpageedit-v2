import { _msg } from './_msg'
import { _analytics } from './_analytics'
import { quickDiff } from './quickDiff'
import { quickEdit } from './quickEdit'

const config = mw.config.get()
const { getParamValue } = mw.util

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
      const RELATIVE_TYPES = ['prev', 'next', 'cur']

      // 形如 Special:Diff/[oldid]/[diff]
      const specialDiffNames = (
        mw.config
          .get('wgSpecialPageAliases', [])
          .find(({ realname }) => realname === 'Diff')
          ?.aliases.map((i) => [i, encodeURI(i)])
          .flat() || ['Diff']
      ).join('|')
      const articlePath = config.wgArticlePath.replace('$1', '')
      const specialNS = `Special|${config.wgFormattedNamespaces[-1]}`
      const specialDiffReg = new RegExp(
        `^${articlePath}(?:${specialNS}):(?:${specialDiffNames})/(\\d+|${RELATIVE_TYPES.join(
          '|'
        )})(?:/(\\d+|${RELATIVE_TYPES.join('|')}))?$`
      )
      const specialDiffMatch = href.match(specialDiffReg)
      if (specialDiffMatch) {
        // 可能出现 [[Special:Diff/123]]，这种情况应该当做与前一版本比较
        diff = specialDiffMatch[2] || specialDiffMatch[1]
        oldid = !specialDiffMatch[2] ? 'prev' : specialDiffMatch[1]
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
      // 少数情况下可能只存在 diff，这种情况应该当做与前一版本比较
      if (!oldid && !curid) {
        oldid = 'prev'
      }
      /**
       * 描述型关系只能出现在 torelative 参数中
       * fromrelative 是不被接受的，所以进行翻转
       */
      if (RELATIVE_TYPES.includes(oldid)) {
        // eslint-disable-next-line no-extra-semi
        ;[diff, oldid] = [oldid, diff]
      }

      // 进行状态标记
      $this.addClass('ipe-diff-mounted')

      // 构建请求参数
      const params = {}
      const getParamType = (i) => {
        if (RELATIVE_TYPES.includes(i) || i === null) {
          return 'relative'
        } else if (i === '0') {
          return 'id'
        } else {
          return 'rev'
        }
      }
      params[`from${getParamType(oldid)}`] = oldid
      params[`to${getParamType(diff)}`] = diff !== '0' ? diff : curid

      // Debug
      $this.attr('ipe-diff-params', JSON.stringify(params))

      // 点击事件
      $this.on('click', function (e) {
        e.preventDefault()
        _analytics('quick_diff_recentchanges')
        return quickDiff(params)
      })
    })
}

export function loadQuickDiff(container) {
  /**
   * 此处原本使用 setInterval 处理开启了自动刷新的最近更改带来的问题
   * 现发现 wikipage.content 钩子似乎会在列表刷新时触发，因此不再需要 setInterval
   * @Dragon-Fish 2022年3月15日
   */
  injectLinks(container)

  // 查看历史页面的比较按钮与快速编辑
  if (config.wgAction === 'history') {
    $('.historysubmit.mw-history-compareselectedversions-button').after(
      $('<button>')
        .text(_msg('quick-diff'))
        .on('click', function (e) {
          if (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) {
            return
          }

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
