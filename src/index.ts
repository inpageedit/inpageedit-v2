/**
 * @license GPL-3.0 GNU GENERAL PUBLIC LICENSE 3.0
 *
 * @name InPageEdit
 * @description A useful MediaWiki JavaScript Plugin written with jQuery
 * @author 机智的小鱼君 Dragon-Fish <dragon-fish@qq.com>
 * @url https://github.com/Dragon-Fish/InPageEdit-v2
 */

import init from '@/controllers/init.js'

// Types declaration
declare type InPageEdit = Awaited<ReturnType<typeof init>>
// Global variable declaration
declare global {
  export const InPageEdit: InPageEdit
  export interface Window {
    [LOADED_SYMBOL]: boolean
    InPageEdit: InPageEdit
  }
}

const LOADED_SYMBOL: unique symbol = Symbol.for('InPageEditLoaded')

// Main IIFE
;(async function main()  {
  // 创建 InPageEdit 变量
  const InPageEdit = window.InPageEdit || {}

  // 防止多次运行
  if (window[LOADED_SYMBOL]) {
    throw new Error('[InPageEdit] InPageEdit 被多次加载。')
  } else {
    window[LOADED_SYMBOL] = true
  }
  try {
    // 初始化插件
    const core = await init()

    // 合并入全局变量
    window.InPageEdit = {
      ...InPageEdit,
      ...core,
    }
  } catch (e) {
    // 处理错误
    console.error('[InPageEdit] 初始化失败', e)
    window[LOADED_SYMBOL] = false
  }
})()
