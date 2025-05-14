/**
 * @license GPL-3.0 GNU GENERAL PUBLIC LICENSE 3.0
 *
 * @name InPageEdit
 * @description A useful MediaWiki JavaScript Plugin written with jQuery
 * @author 机智的小鱼君 Dragon-Fish <dragon-fish@qq.com>
 * @url https://github.com/Dragon-Fish/InPageEdit-v2
 */

import { InPageEdit as App } from '@/InPageEdit'
export { App as InPageEdit }

/**
 * Global variable declaration
 *
 * Due to historical problem,
 * we call the IPE instance `InPageEdit`,
 * and the IPE class called `InPageEditCore`
 */
declare global {
  export const InPageEditCore: typeof App
  export const InPageEdit: App
  export interface Window {
    [LOADED_SYMBOL]: boolean
    InPageEditCore: typeof App
    InPageEdit: App
  }
}

const LOADED_SYMBOL: unique symbol = Symbol.for('InPageEditLoaded')

// Main IIFE
;(async function initIPEInstance() {
  // 防止多次运行
  if (window[LOADED_SYMBOL]) {
    throw new Error('[InPageEdit] InPageEdit 被多次加载。')
  } else {
    window[LOADED_SYMBOL] = true
  }

  window.InPageEditCore = App

  const oldGlobalVar: any = window.InPageEdit || {}
  const ipe = new App({
    legacyPreferences: oldGlobalVar?.myPreferences || {},
  })
  ipe.start()

  window.InPageEdit = ipe
})()
