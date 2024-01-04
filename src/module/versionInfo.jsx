import { _msg } from './_msg'

import version from './version'
import { updatelogsUrl, githubLink, aboutUrl } from './endpoints'

/**
 * @module versionInfo 版本信息模块
 * @description Show Update Logs Modal box
 */
export function versionInfo() {
  // 显示模态框
  ssi_modal.show({
    className: 'in-page-edit update-logs-modal',
    title:
      _msg('updatelog-title') +
      ' - <span id="yourVersion">' +
      version +
      '</span>',
    content: $('<section>').append(
      $('<iframe>', {
        style: 'margin: 0;padding: 0;width: 100%;height: 80vh;border: 0;',
        src: updatelogsUrl,
      })
    ),
    buttons: [
      {
        label: 'GitHub',
        className: 'btn btn-secondary',
        method: function () {
          window.open(githubLink)
        },
      },
      {
        label: _msg('updatelog-about'),
        className: 'btn btn-secondary',
        method: function () {
          window.open(aboutUrl)
        },
      },
      {
        label: _msg('close'),
        className: 'btn btn-primary',
        method: function (a, modal) {
          modal.close()
        },
      },
    ],
  })
}
