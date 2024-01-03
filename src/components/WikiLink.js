/**
 *
 * @param {string} title
 * @param {string?} text
 * @param {Record<string, string>?} params
 */
export const WikiLink = (title, text, params) => {
  const href = mw.util.getUrl(title, params)
  return $('<a>', { href, text: text || title })
}

/**
 *
 * @param {string} title
 * @param {string?} html
 * @param {Record<string, string>?} params
 */
export const WikiLinkRaw = (title, html, params) => {
  const href = mw.util.getUrl(title, params)
  return $('<a>', { href, html: html || title })
}
