/**
 * Check if the event is a mouse click with any modifier keys. (alt, ctrl, meta, shift)
 */
export const isAlternativeClick = (e: MouseEvent) => {
  const event: MouseEvent = (e as any)?.originalEvent || e
  return event.altKey || event.ctrlKey || event.metaKey || event.shiftKey
}

/**
 * Check if the event is a pure left mouse button click. Without any modifiers.
 */
export const isPureLMBClick = (e: MouseEvent) => {
  const event: MouseEvent = (e as any)?.originalEvent || e
  return event.button === 0 && !isAlternativeClick(e)
}
