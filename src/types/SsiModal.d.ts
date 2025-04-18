/**
 * Types declaration for SsiModal
 *
 * SsiModal:
 * @url https://github.com/ssbeefeater/ssi-modal
 * @author ssbeefeater
 *
 * This d.ts file:
 * @author dragon-fish
 *
 * @license MIT
 */

declare class SsiModal {
  constructor(options: Partial<SsiModalOptions>)

  readonly backdropId: string
  readonly modalId: string
  readonly numberId: string
  public options: SsiModalOptions
  readonly pluginName: string
  close: () => void
  init: () => this
  get$backdrop: () => JQuery<HTMLElement>
  get$buttons: (type: 'left' | 'right') => JQuery<HTMLElement>
  get$content: () => JQuery<HTMLElement>
  get$icons: () => JQuery<HTMLElement>
  get$modal: () => JQuery<HTMLElement>
  get$title: () => JQuery<HTMLElement>
  get$window: () => JQuery<HTMLElement>
  get$wrapper: () => JQuery<HTMLElement>
  setButtons: (buttons: SsiModalButton[]) => void
  setContent: (
    content: string | HTMLElement | JQuery<any>,
    method?: 'html' | 'text' = 'html'
  ) => void
  setIcons: (icons: any) => void
  setModalHeight: (height: number) => void
  setOptions: (options: Partial<SsiModalOptions>) => void
  setTitle: (title: string | HTMLElement | JQuery<any>) => void
  show: () => this

  // Static methods
  /**
   * Creates a ssi modal object and shows it immediately.
   * @example ```js
   * ssi_modal.show({content:'Hello World'})
   * ```
   */
  static show: (options: Partial<SsiModalOptions>) => SsiModal
  /**
   * Creates a ssi modal object but does not show it.
   * @example ```js
   * ssi_modal.createObject({content:'Hello World'}).init().show()
   * ```
   */
  static createObject: (options: Partial<SsiModalOptions>) => SsiModal
  /**
   * Closes the very top modal. If you pass a target parameter will close the modal you specified.
   */
  static close: (modalId?: string) => SsiModal
  static closeAll: () => SsiModal
  /**
   * Removes all modals from the DOM. With no beforeClose or onClose events.
   */
  static removeAll: () => void
  static dialog: (
    options: Partial<SsiModalOptions>,
    method: (event: MouseEvent, modal: SsiModal) => void
  ) => SsiModal
  static confirm: (
    options: Partial<SsiModalOptions>,
    method: (event: MouseEvent, modal: SsiModal) => void
  ) => SsiModal

  // Plugins
  static notify: (
    type: 'success' | 'error' | 'warning' | 'info' | 'dialog' | 'confirm',
    options: Partial<SsiModalOptions> &
      Partial<{
        icon: string
        okBtn: SsiModalButton
        cancelBtn: SsiModalButton
        overrideOther: boolean
      }>
  ) => SsiModal
}

export interface SsiModalOptions {
  animation: SsiModalAnimation
  animationSpeed: number
  backdrop: boolean | ('shared' | 'byKindShared')
  backdropAnimation: SsiModalAnimation
  backdropClassName: string
  beforeClose: (modal: SsiModal) => void | false
  beforeShow: (modal: SsiModal) => void | false
  bodyElement: boolean
  bodyScroll: boolean
  buttons: SsiModalButton[]
  center: boolean
  className: string
  closeAfter: {
    time: number
    displayTime: number
    resetOnHover: boolean
  }
  closeIcon: boolean
  content: string | HTMLElement | JQuery<any>
  fitScreen: boolean
  fixedHeight: boolean | number
  iconButtons: boolean
  iframe: unknown
  keepContent: boolean
  modalAnimation: SsiModalAnimation
  navigation: boolean
  onClickClose: boolean
  onClose: (modal: SsiModal) => void
  onShow: (modal: SsiModal) => void
  outSideClose: boolean
  position:
    | 'right top'
    | 'right bottom'
    | 'left top'
    | 'left bottom'
    | 'center top'
    | 'center bottom'
  preview: unknown
  sizeClass: SsiModalSizeClass
  stack: boolean
  title: string | HTMLElement | JQuery<any>
}

export interface SsiModalButton {
  label: string | HTMLElement | JQuery<any>
  type: 'button' | 'link'
  className: string
  enableAfter: number | false
  id: string
  method: (this: HTMLButtonElement, event: MouseEvent, modal: SsiModal) => void
  side: 'left' | 'right'
  keyPress: string
  closeAfter: number | false
}

export type SsiModalSizeClass =
  | 'dialog'
  | 'small'
  | 'smaillToMedium'
  | 'medium'
  | 'mediumToLarge'
  | 'large'
  | 'full'
  | 'auto'

export type SsiModalAnimation =
  | string
  | {
      show: string | false
      hide: string | false
    }
  | false

// Declare the global variable
declare global {
  export const ssi_modal: typeof SsiModal
  export interface Window {
    ssi_modal: typeof SsiModal
  }
}
