import { _msg } from './i18n'
import { Endpoints } from '../constants/endpoints'

/**
 * @module about 关于插件模块
 * @description Show "What is" modal box of IPE2
 */
export const about = function () {
  ssi_modal.show({
    title: _msg('preference-about-label'),
    className: 'in-page-edit in-page-edit-about',
    content: $('<section>').append(
      $('<iframe>', {
        style: 'margin: 0;padding: 0;width: 100%;height: 80vh;border: 0;',
        src: Endpoints.HOME_URL,
      })
    ),
  })
}
