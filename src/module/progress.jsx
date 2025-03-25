import { _msg } from './_msg'
import { $progress } from './_elements'

export function progressOverlay(title = '') {
  const $progressBar = $($progress)
  const modal = ssi_modal.create({
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
    modal.appendTo('body')
    ssi_modal.close()
  }
  return { modal, done, close }
}
