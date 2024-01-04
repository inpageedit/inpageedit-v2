/**
 * @param {MouseEvent} e
 * @returns {boolean}
 */
export const isAlternativeClick = (e) => {
  const event = e.originalEvent || e
  return event.altKey || event.ctrlKey || event.metaKey || event.shiftKey
}

/**
 * @param {MouseEvent} e
 * @returns {boolean}
 */
export const isPureLMBClick = (e) => {
  const event = e.originalEvent || e
  return event.button === 0 && !isAlternativeClick(e)
}
