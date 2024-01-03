export const Button = ({ type, text, html, href, link }) => {
  html = html || text
  href = href || link
  const $btn = $('<button>', { class: type ? 'btn btn-' + type : 'btn', html })
  if (href || link) {
    let target = ''
    if (/^https?:\/\//.test(href)) target = '_blank'
    const $a = $('<a>', { rel: 'noopener', target, href })
    $btn.appendTo($a)
  }
  return $btn
}
