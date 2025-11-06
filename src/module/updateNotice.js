import version from './version'

import { _msg } from './_msg'
import { specialNotice } from './specialNotice'

export function updateNotice() {
  if (localStorage.getItem('InPageEditVersion') !== version) {
    ssi_modal.notify('', {
      title: _msg('updatelog-update-success-title'),
      content: _msg('updatelog-try-next', version),
      className: 'in-page-edit',
      buttons: [
        {
          className: 'btn btn-primary',
          label: _msg('updatelog-button-try-next'),
          method(a, modal) {
            window.open('https://www.ipe.wiki')
            modal.close()
          },
        },
      ],
      closeAfter: {
        time: 10,
        resetOnHover: true,
      },
      onClose() {
        localStorage.setItem('InPageEditVersion', version)
      },
    })
  }
  if (localStorage.getItem('InPageEditNoticeId') !== _msg('noticeid')) {
    specialNotice()
  }
}
