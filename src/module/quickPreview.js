import { _msg } from './_msg'
import { $progress } from './_elements'
import { mwApi } from './mw'

/**
 * @module quickPreview 快速预览文章页
 * @param params {Object}
 */
export function quickPreview(params, modalSize = 'large', center = false) {
  var defaultOptions = {
    action: 'parse',
    preview: true,
    disableeditsection: true,
    prop: 'text',
    format: 'json',
  }
  var options = $.extend({}, defaultOptions, params)
  mw.hook('InPageEdit.quickPreview').fire()
  console.time('[InPageEdit] Request preview')
  const $loading = $('<div>').append($progress)
  const $content = $('<div>', {
    class: 'InPageEditPreview',
    style: 'display:none',
    text: _msg('preview-placeholder'),
  })
  $content.on('click', function (e) {
    e.preventDefault()
    e.stopPropagation()
  })
  ssi_modal.show({
    sizeClass: [
      'dialog',
      'small',
      'smallToMedium',
      'medium',
      'mediumToLarge',
      'large',
      'full',
      'auto',
    ].includes(modalSize)
      ? modalSize
      : 'large',
    center: !!center,
    className: 'in-page-edit previewbox',
    title: _msg('preview-title'),
    content: $('<section>').append($loading, $content),
    fixedHeight: true,
    fitScreen: true,
    buttons: [{ label: '', className: 'hideThisBtn' }],
    onShow() {
      $loading.css('margin-top', window.innerHeight / 2 - 100)
      $('.previewbox .hideThisBtn').hide()
      mwApi
        .post(options)
        .then(function (data) {
          console.timeEnd('[InPageEdit] Request preview')
          const html = data.parse.text
          $loading.hide(150)
          $content.fadeIn(500).html(html)
        })
        .fail(function () {
          console.timeEnd('[InPageEdit] Request preview')
          console.warn('[InPageEdit] 预览失败')
          $loading.hide(150)
          $content.fadeIn(500).html(_msg('preview-error'))
        })
    },
  })
}
