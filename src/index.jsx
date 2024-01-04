/**
 * @license GPL-3.0 GNU GENERAL PUBLIC LICENSE 3.0
 *
 * @name InPageEdit
 * @description A useful MediaWiki JavaScript Plugin written with jQuery
 * @author 机智的小鱼君 Dragon-Fish <dragon-fish@qq.com>
 * @url https://github.com/Dragon-Fish/InPageEdit-v2
 */

import init from './method/init'

// Main IIFE
;(async function () {
  // 创建 InPageEdit 变量
  const InPageEdit = window.InPageEdit || {}

  // 防止多次运行
  if (InPageEdit.__loaded) {
    throw '[InPageEdit] InPageEdit 被多次加载。'
  } else {
    InPageEdit.__loaded = true
  }

  // 初始化插件
  const core = await init()

  // 合并入全局变量
  window.InPageEdit = {
    ...InPageEdit,
    ...core,
  }
})()
