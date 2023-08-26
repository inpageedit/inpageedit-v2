/**
 * @module _elements 常用html元素
 */

const { getUrl } = mw.util

export const $br = '<br>'
export const $button = ({ type, text, html, href, link }) => {
  html = html || text
  href = href || link
  const $btn = $('<button>', { class: type ? 'btn btn-' + type : 'btn', html })
  if (href || link) {
    let target = ''
    if (/^https?:\/\//.test(href)) target = '_blank'
    const $a = $('<a>', { target, href })
    $btn.appendTo($a)
  }
  return $btn
}
export const $hr = '<hr>'
export const $link = ({ page, link, href, text, html }) => {
  href = href || link || 'javascript:void(0);'
  if (page) href = getUrl(page)
  html = html || text
  if (page && !html) html = page
  if (!html) html = href
  let target = ''
  if (/^https?:\/\//.test(href)) target = '_blank'
  return $('<a>', { href, target, html })
}
export const $progress =
  '<div class="ipe-progress" style="width: 100%"><div class="ipe-progress-bar"></div></div>'
export const $checkbox = ({ label, checked, id, className }) => {
  return $('<label>', { class: className })
    .append(
      $('<input>', { type: 'checkbox', checked, id }),
      $('<span>', { class: 'ipe-checkbox-box' }),
      $('<span>', { html: label })
    )
    .css({
      display: 'block',
    })
}

// aliases
export { $br as br, $hr as hr, $progress as progress }
