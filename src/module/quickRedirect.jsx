import { _analysis } from './_analytics'
import { _msg } from './_msg'
import { $br, $progress } from './_elements'
import { mwApi, mwConfig } from './mw'
import { _resolveExists } from './_resolveExists'
import { preference } from './preference'

/**
 * @module quickRedirect 快速重定向模块
 * @param {'from'|'to'} type
 */
export function quickRedirect(type = 'to') {
  mw.hook('InPageEdit.quickRedirect').fire()
  var text = '#REDIRECT [[:$1]]',
    question,
    target,
    json = {
      action: 'edit',
      createonly: 1,
      minor: preference.get('editMinor'),
      format: 'json',
      errorformat: 'plaintext',
    },
    summary

  if (type === 'to') {
    json.title = mwConfig.wgPageName
    question = _msg(
      'redirect-question-to',
      '<b>' + mwConfig.wgPageName.replace(/_/g, ' ') + '</b>'
    )
  } else if (type === 'from') {
    question = _msg(
      'redirect-question-from',
      '<b>' + mwConfig.wgPageName.replace(/_/g, ' ') + '</b>'
    )
    summary = _msg('redirect-summary') + ' → [[:' + mwConfig.wgPageName + ']]'
  } else {
    console.error('[InPageEdit] quickRedirect only accept "from" or "to"')
    return
  }

  ssi_modal.show({
    outSideClose: false,
    className: 'in-page-edit quick-redirect',
    center: true,
    sizeClass: 'dialog',
    title: _msg('redirect-title'),
    content: $('<div>').append(
      $('<section>').append(
        $('<span>', { html: question }),
        $br,
        $('<input>', { id: 'redirect-page', style: 'width:96%' }).on(
          'click',
          function () {
            $(this).css('box-shadow', '')
          }
        ),
        ...(type === 'from'
          ? [
              $br,
              $('<label>', {
                for: 'redirect-fragment',
                text: _msg('redirect-question-fragment'),
              }),
              $('<input>', { id: 'redirect-fragment', style: 'width:96%' }),
            ]
          : []),
        $br,
        $('<label>', { for: 'redirect-reason', text: _msg('editSummary') }),
        $('<input>', { id: 'redirect-reason', style: 'width:96%' })
      ),
      $($progress).css('display', 'none')
    ),
    buttons: [
      {
        label: _msg('confirm'),
        className: 'btn btn-primary btn-single okBtn',
        method: function (a, modal) {
          target = $('.in-page-edit.quick-redirect #redirect-page').val()
          if (
            target === '' ||
            target.replace(/_/g, ' ') === mwConfig.wgPageName.replace(/_/g, ' ')
          ) {
            $('.in-page-edit.quick-redirect #redirect-page').css(
              'box-shadow',
              '0 0 4px #f00'
            )
            return
          }

          _analysis('quick_redirect')

          if (type === 'to') {
            summary = _msg('redirect-summary') + ' → [[:' + target + ']]'
            json.text = text.replace('$1', target)
          } else if (type === 'from') {
            let fragment = $('.in-page-edit.quick-redirect #redirect-fragment')
              .val()
              .trim()
            if (fragment && !fragment.startsWith('#')) {
              fragment = `#${fragment}`
            }
            json.title = target
            json.text = text.replace('$1', `${mwConfig.wgPageName}${fragment}`)
          }
          if ($('.in-page-edit.quick-redirect #redirect-reason').val() !== '') {
            summary =
              summary +
              ' (' +
              $('.in-page-edit.quick-redirect #redirect-reason').val() +
              ')'
          }
          json.summary = summary

          $('.in-page-edit.quick-redirect .ipe-progress').show()
          $('.in-page-edit.quick-redirect section').hide()
          $('.in-page-edit.quick-redirect .okBtn').attr('disabled', 'disabled')

          let promise = Promise.resolve()
          if (preference.get('noRedirectIfConvertedTitleExists')) {
            promise = mwApi
              .get({ titles: json.title, converttitles: 1 })
              .done((data) => {
                const convertedTitle = data.query.pages[0]
                if (convertedTitle?.missing !== true) {
                  failed('articleexists', {
                    fromPage: convertedTitle.title,
                    errors: [
                      {
                        info: _msg('notify-redirect-converted-error'),
                      },
                    ],
                  })
                  throw null
                }
              })
              .fail((errorCode, errorThrown) => {
                failed(errorCode, errorThrown)
                throw null
              })
          }
          promise.then(
            () => {
              mwApi.postWithToken('csrf', json).done(successed).fail(failed)
            },
            () => {}
          )
          // 重定向成功
          function successed(data) {
            if (data.errors) {
              failed(data.errors[0].code, data)
              return
            }
            $('.in-page-edit.quick-redirect .ipe-progress').addClass('done')
            ssi_modal.notify('success', {
              className: 'in-page-edit',
              content: _msg('notify-redirect-success'),
              title: _msg('notify-success'),
            })
            if (type === 'to') {
              window.location.reload()
            } else {
              $('.in-page-edit.quick-redirect .ipe-progress').addClass('done')
              setTimeout(function () {
                modal.close()
              }, 2000)
            }
          }
          // 重定向失败
          function failed(errorCode, errorThrown) {
            $('.in-page-edit.quick-redirect .ipe-progress').hide()
            $('.in-page-edit.quick-redirect section').show()
            $('.in-page-edit.quick-redirect .okBtn').attr('disabled', false)
            $('.in-page-edit.quick-redirect .ipe-progress').addClass('done')
            ssi_modal.notify('error', {
              className: 'in-page-edit',
              content:
                _msg('notify-redirect-error') +
                '<br>' +
                errorThrown.errors[0].info +
                ' (<code>' +
                errorCode +
                '</code>)',
              title: _msg('notify-error'),
            })
            // 如果是由于页面存在，给出解决方案
            if (errorCode === 'articleexists') {
              var fromPage, toPage
              if (type === 'from') {
                fromPage = errorThrown.fromPage ?? target
                toPage = mwConfig.wgPageName
              } else if (type === 'to') {
                fromPage = errorThrown.fromPage ?? mwConfig.wgPageName
                toPage = target
              }
              _resolveExists(fromPage, {
                delete: 'Delete for redirect to [[' + toPage + ']]',
                edit: 'Modify for redirect',
              })
            }
          }
        },
      },
    ],
  })
}
