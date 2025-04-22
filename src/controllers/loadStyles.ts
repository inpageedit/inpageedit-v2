import { Endpoints } from '../constants/endpoints'

const CDN_BASE = Endpoints.PLUGIN_CDN_BASE

// 放在越上面优先级越高
const styleList = [
  // Default Skin
  `${CDN_BASE}/skins/ipe-default.css`,
  // ssi-modal Style
  `${CDN_BASE}/lib/ssi-modal/ssi-modal.css`,
  // FontAwesome
  'https://fastly.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
]

export function loadStyles(noCache = false) {
  styleList.forEach((href) => {
    if (noCache) {
      const url = new URL(href)
      url.searchParams.set(`_${Date.now()}`, 'no-cache')
      href = '' + url
    }
    $('head').prepend(
      $('<link>', { href, rel: 'stylesheet', 'data-ipe': 'style' })
    )
  })
}
