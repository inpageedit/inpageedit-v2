// import api from './api.json';
import { _msg } from './_msg'

/**
 * @module specialNotice 特别通知
 */
export function specialNotice() {
  ssi_modal.notify(
    'dialog',
    {
      className: 'in-page-edit ipe-special-notice',
      title: _msg('version-notice-title'),
      content: _msg('version-notice'),
      okBtn: {
        label: _msg('updatelog-dismiss'),
        className: 'btn btn-primary',
      },
    },
    function (e, modal) {
      localStorage.setItem('InPageEditNoticeId', _msg('noticeid'))
      modal.close()
    }
  )
}
