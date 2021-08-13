/**
 * @license GPL-3.0 GNU GENERAL PUBLIC LICENSE 3.0
 *
 * @name InPageEdit
 * @description A useful MediaWiki JavaScript Plugin written with jQuery
 * @author 机智的小鱼君 Dragon-Fish <dragon-fish@qq.com>
 * @url https://github.com/Dragon-Fish/InPageEdit-v2
 */

!(async function (InPageEdit) {
  'use strict'

  // 创建 InPageEdit 变量
  InPageEdit = InPageEdit || {}

  // 防止多次运行
  if (InPageEdit?.version) {
    throw '[InPageEdit] InPageEdit 已经在运行了'
  }

  // 初始化插件
  const init = require('./method/init')

  // 合并入全局变量
  InPageEdit = {
    ...InPageEdit,
    ...init(),
  }
})(window.InPageEdit)
