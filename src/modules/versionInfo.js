import { _msg } from './i18n'

import version from '../constants/version'
import { Endpoints } from '../constants/endpoints'

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
        src: Endpoints.UPDATE_LOGS_URL,
      })
    ),
    buttons: [
      {
        label: 'GitHub',
        className: 'btn btn-secondary',
        method: function () {
          window.open(Endpoints.GITHUB_URL)
        },
      },
      {
        label: _msg('updatelog-about'),
        className: 'btn btn-secondary',
        method: function () {
          window.open(Endpoints.GITHUB_URL)
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
