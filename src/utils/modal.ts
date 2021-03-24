interface Button {
  label?: string
  method?: any
  side?: 'left' | 'right'
}

function getModalWindow(modal): JQuery<HTMLElement> {
  const $modal = $('<div>', { class: 'ipe-modal-window' }).append(
    $('<div>', { class: 'title-area' }),
    $('<div>', { class: 'top-buttons' }).append(
      $('<a>', { text: '×' }).on('click', function () {
        modal.close()
      })
    ),
    $('<div>', { class: 'content-area' }),
    $('<div>', { class: 'buttons-area' }).append(
      $('<div>', { class: 'button-left' }),
      $('<div>', { class: 'button-right' })
    )
  )
  return $modal
}

function getBackDrop(): JQuery<HTMLElement> {
  const $bg = $('<div>', { class: 'ipe-modal-backdrop' })
  return $bg
}

class getModal {
  $modalWindow = getModalWindow(this)
  $modalBackdrop = getBackDrop()
  $modal = $('<div>').append(
    $('<div>', { class: 'ipe-modal-container' }).append(
      this.$modalWindow,
      this.$modalBackdrop
    )
  )

  show() {
    console.log('show modal', this.$modal)
    this.$modal.appendTo('body')
  }
  close() {
    this.$modal = this.$modal.remove()
  }
  setTitle(title: string | JQuery<HTMLElement>) {
    this.$modalWindow.find('.title-area').html('').append(title)
  }
  setContent(content: string | JQuery<HTMLElement>) {
    this.$modalWindow.find('.content-area').html('').append(content)
  }
  insertButton(button: Button) {
    const $container = this.$modalWindow.find('.buttons-area')
    let side = button.side === 'left' ? 'left' : 'right'
    let label = button.label || ''
    let method = button.method
    let modal = this
    const $button = $('<button>', { class: 'btn' })
      .html(label)
      .on('click', function () {
        method && method(this, modal)
      })
    $container.find(`.button-${side}`).append($button)
  }
  setButtons(buttons: Button[]) {
    $.each(buttons, (index, item) => {
      this.insertButton(item)
    })
  }
}

export default getModal
