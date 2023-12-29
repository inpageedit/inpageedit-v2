import { pluginCDN } from '../module/endpoints'

// 放在越上面优先级越高
const styleList = [
  // Default Skin
  `${pluginCDN}/skins/ipe-default.css`,
  // ssi-modal Style
  `${pluginCDN}/lib/ssi-modal/ssi-modal.css`,
  // FontAwesome
  'https://fastly.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
]

export function loadStyles(noCache = false) {
  styleList.forEach((href) => {
    if (noCache) {
      const url = new URL(href)
      url.searchParams.set(Date.now(), 'no_cache')
      href = '' + url
    }
    $('head').prepend(
      $('<link>', { href, rel: 'stylesheet', 'data-ipe': 'style' })
    )
  })
}
