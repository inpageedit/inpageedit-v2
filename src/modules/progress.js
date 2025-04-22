import { _msg } from './i18n'
import { $progress } from '../components/_elements.js'

export function progressOverlay(title = '') {
  const $progressBar = $($progress)
  const modal = ssi_modal.show({
    title: title,
    content: $progressBar,
    className: 'in-page-edit ipe-progress-overlay',
    center: true,
    sizeClass: 'dialog',
    closeIcon: false,
    outSideClose: false,
  })
  const done = () => {
    $progressBar.addClass('done')
    modal.find('.ssi-modalTitle').html(_msg('done'))
  }
  const close = () => {
    modal.close()
  }
  const payload = { modal, done, close }
  mw.hook('InPageEdit.progressOverlay').fire(payload)
  return payload
}
