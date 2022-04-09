var mwApi = new mw.Api()

const { _analytics: _analysis } = require('./_analytics')
const { _msg } = require('./_msg')

const { $br, $progress } = require('./_elements')

/**
 * @module quickDiff 快速页面差异模块
 * @param {Object} param standard MediaWiki API params
 */
var quickDiff = function (param) {
  mw.hook('InPageEdit.quickDiff').fire()
  _analysis('quick_diff')
  mw.loader.load(['mediawiki.legacy.shared', 'mediawiki.diff.styles'])
  var $modalTitle, $diffArea, $loading
  var $quickDiff = $('.quick-diff')
  if ($quickDiff.length > 0) {
    console.info('[InPageEdit] Quick diff 正在加载新内容')
    $modalTitle = $quickDiff.find('.pageName')
    $diffArea = $quickDiff.find('.diffArea')
    $loading = $quickDiff.find('.ipe-progress')
    $modalTitle.text(_msg('diff-loading'))
    $diffArea.hide()
    $quickDiff.appendTo(document.body)
  } else {
    $modalTitle = $('<span>', { class: 'pageName', text: _msg('diff-loading') })
    $diffArea = $('<div>', { class: 'diffArea', style: 'display: none' })
    $loading = $($progress)

    ssi_modal.show({
      className: 'in-page-edit quick-diff',
      sizeClass: 'large',
      fixedHeight: true,
      fitScreen: true,
      title: $modalTitle,
      content: $('<div>').append($loading, $diffArea),
      buttons: [
        {
          label: _msg('diff-button-todiffpage'),
          className: 'btn btn-secondary toDiffPage',
        },
      ],
    })
    $quickDiff = $('.quick-diff')
  }
  $loading
    .show()
    .css('margin-top', $quickDiff.find('.ssi-modalContent').height() / 2)
  $quickDiff.find('.toDiffPage').off('click')
  param.action = 'compare'
  param.prop = 'diff|rel|ids|title|user|parsedcomment|size'
  param.format = 'json'
  if (param.totext) {
    param.topst = true
  } else if (param.fromtext) {
    param.frompst = true
  }
  mwApi
    .post(param)
    .done(function (data) {
      var diffTable = data.compare['*']
      var toTitle
      $loading.hide()
      if (param.pageName === undefined) {
        toTitle = data.compare.totitle
      } else {
        toTitle = param.pageName
      }
      function userLink(user) {
        return (
          '<a class="diff-user" href="' +
          mw.util.getUrl('User:' + user) +
          '">' +
          user +
          '</a> (<a href="' +
          mw.util.getUrl('User_talk:' + user) +
          '">' +
          _msg('diff-usertalk') +
          '</a> | <a href="' +
          mw.util.getUrl('Special:Contributions/' + user) +
          '">' +
          _msg('diff-usercontrib') +
          '</a> | <a href="' +
          mw.util.getUrl('Special:Block/' + user) +
          '">' +
          _msg('diff-userblock') +
          '</a>)'
        )
      }
      $modalTitle.html(_msg('diff-title') + ': <u>' + toTitle + '</u>')
      $diffArea
        .show()
        .empty()
        .append(
          $('<table>', { class: 'diff difftable' }).append(
            $('<colgroup>').append(
              $('<col>', { class: 'diff-marker' }),
              $('<col>', { class: 'diff-content' }),
              $('<col>', { class: 'diff-marker' }),
              $('<col>', { class: 'diff-content' })
            ),
            $('<tbody>').append(
              $('<tr>').append(
                $('<td>', { colspan: 2, class: 'diff-otitle' }).append(
                  $('<a>', {
                    href: mw.util.getUrl('', { oldid: data.compare.fromrevid }),
                    text: data.compare.fromtitle,
                  }),
                  ' (',
                  $('<span>', {
                    class: 'diff-version',
                    text: _msg('diff-version') + data.compare.fromrevid,
                  }),
                  ') (',
                  $('<a>', {
                    class: 'editLink',
                    href: mw.util.getUrl(data.compare.fromtitle, {
                      action: 'edit',
                      oldid: data.compare.fromrevid,
                    }),
                    text: _msg('diff-edit'),
                  }),
                  ')',
                  $br,
                  userLink(data.compare.fromuser),
                  $br,
                  ' (',
                  $('<span>', {
                    class: 'diff-comment',
                    html: data.compare.fromparsedcomment,
                  }),
                  ') ',
                  $br,
                  $('<a>', {
                    class: 'prevVersion ipe-analysis-quick_diff_modalclick',
                    href: 'javascript:void(0);',
                    text: '←' + _msg('diff-prev'),
                  })
                    .toggle(!!data.compare.prev)
                    .on('click', () => {
                      quickDiff({
                        fromrev: data.compare.prev,
                        torev: data.compare.fromrevid,
                      })
                    })
                ),
                $('<td>', { colspan: 2, class: 'diff-ntitle' }).append(
                  $('<a>', {
                    href: mw.util.getUrl('', { oldid: data.compare.torevid }),
                    text: data.compare.totitle,
                  }),
                  ' (',
                  $('<span>', {
                    class: 'diff-version',
                    text: _msg('diff-version') + data.compare.torevid,
                  }),
                  ') (',
                  $('<a>', {
                    class: 'editLink',
                    href: mw.util.getUrl(data.compare.totitle, {
                      action: 'edit',
                      oldid: data.compare.torevid,
                    }),
                    text: _msg('diff-edit'),
                  }),
                  ')',
                  $br,
                  userLink(data.compare.touser),
                  $br,
                  ' (',
                  $('<span>', {
                    class: 'diff-comment',
                    html: data.compare.toparsedcomment,
                  }),
                  ') ',
                  $br,
                  $('<a>', {
                    class: 'nextVersion ipe-analysis-quick_diff_modalclick',
                    href: 'javascript:void(0);',
                    text: _msg('diff-nextv') + '→',
                  })
                    .toggle(!!data.compare.next)
                    .on('click', () => {
                      _analysis('quick_diff_modalclick')
                      quickDiff({
                        fromrev: data.compare.torevid,
                        torev: data.compare.next,
                      })
                    })
                )
              ),
              diffTable,
              $('<tr>', {
                class: 'diffSize',
                style: 'text-align: center',
              }).append(
                $('<td>', {
                  colspan: '2',
                  text: data.compare.fromsize + _msg('diff-bytes'),
                }),
                $('<td>', {
                  colspan: '2',
                  text: data.compare.tosize + _msg('diff-bytes'),
                })
              )
            )
          )
        )
      $quickDiff.find('button.toDiffPage').on('click', function () {
        location.href = mw.util.getUrl('', {
          oldid: data.compare.fromrevid,
          diff: data.compare.torevid,
        })
      })
      require('./articleLink').articleLink($quickDiff.find('.editLink'))
      if (param.isPreview === true) {
        $quickDiff.find('button.toDiffPage').hide()
        $diffArea
          .find('.diff-otitle')
          .html('<b>' + _msg('diff-title-original-content') + '</b>')
        $diffArea
          .find('.diff-ntitle')
          .html('<b>' + _msg('diff-title-your-content') + '</b>')
      }
      if (
        data.compare.fromsize === undefined ||
        data.compare.tosize === undefined
      ) {
        $diffArea.find('.diffSize').hide()
      }
      // 无上一版本或下一版本
      if (!data.compare?.fromrevid && !param.isPreview) {
        $diffArea
          .find('.diff-otitle')
          .empty()
          .append(
            $('<span>', {
              class: 'noPrevVerson',
              text:
                data?.warnings?.compare?.['*'] || 'Previous version not exist',
            })
          )
      }
      if (!data.compare?.torevid && !param.isPreview) {
        $diffArea
          .find('.diff-otitle')
          .empty()
          .append(
            $('<span>', {
              class: 'noNextVerson',
              text: data?.warnings?.compare?.['*'] || 'Next version not exist',
            })
          )
      }
      // GitHub@issue#5 修复被隐藏版本的问题
      if (data.compare.fromtexthidden !== undefined) {
        $diffArea
          .find('.diff-otitle .diff-version')
          .addClass('diff-hidden-history')
      }
      if (data.compare.totexthidden !== undefined) {
        $diffArea
          .find('.diff-ntitle .diff-version')
          .addClass('diff-hidden-history')
      }
      if (data.compare.fromuserhidden !== undefined) {
        $diffArea
          .find('.diff-otitle .diff-user')
          .addClass('diff-hidden-history')
      }
      if (data.compare.touserhidden !== undefined) {
        $diffArea
          .find('.diff-ntitle .diff-user')
          .addClass('diff-hidden-history')
      }
      if (data.compare.fromcommenthidden !== undefined) {
        $diffArea.find('.diff-comment').addClass('diff-hidden-history')
      }
      if (data.compare.tocommenthidden !== undefined) {
        $diffArea
          .find('.diff-ntitle .diff-comment')
          .addClass('diff-hidden-history')
      }
    })
    .fail(function (errorCode, errorThrown) {
      console.warn('[InPageEdit] 快速差异获取失败')
      $loading.hide()
      if (
        errorThrown.error &&
        errorThrown.error.info &&
        errorThrown.error.code
      ) {
        $diffArea
          .show()
          .html(
            _msg('diff-error') +
              ': ' +
              errorThrown.error.info +
              '(<code>' +
              errorThrown.error.code +
              '</code>)'
          )
      } else {
        $diffArea.show().html(_msg('diff-error'))
      }
    })
}

module.exports = {
  quickDiff,
}
