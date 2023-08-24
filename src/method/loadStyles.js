import { pluginCDN } from '../module/api'
import _dir from './_dir'

export function loadStyles(purge) {
  // 放在越上面优先级越高
  const styleFiles = [
    // Default Skin
    `${pluginCDN}/skins/ipe-default.css`,
    // ssi-modal Style
    `${pluginCDN}/lib/ssi-modal/ssi-modal.css`,
    // FontAwesome
    'https://fastly.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
  ]

  styleFiles.forEach((link) => {
    if (/^https?:\/\//.test(link) !== true) {
      link = _dir + link
    }
    if (purge) {
      link += '?timestamp' + new Date().getTime()
    }
    $('head').prepend(
      $('<link>', { href: link, rel: 'stylesheet', 'data-ipe': 'style' })
    )
  })
}
