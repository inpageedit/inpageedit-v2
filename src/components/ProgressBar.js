export const ProgressBar = () => {
  const $line = $('<div>', { class: 'ipe-progress', style: 'width: 100%' })
  const $bar = $('<div>', { class: 'ipe-progress-bar' })
  $line.append($bar)
  return $line
}
