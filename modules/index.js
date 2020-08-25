/**
 * @license GPL-3.0 GNU GENERAL PUBLIC LICENSE 3.0
 *
 * @name InPageEdit
 * @description A JavaScript-based MediaWiki Plugin
 * @author 机智的小鱼君
 * @url https://github.com/Dragon-Fish/InPageEdit-v2
 */

'use strict';

// 创建 InPageEdit 变量
var InPageEdit = window.InPageEdit || {};
// 防止多次运行
if (typeof InPageEdit.version !== 'undefined') {
  throw '[InPageEdit] InPageEdit 已经在运行了';
}

// 导入全部模块
// import { quickEdit } from './quickEdit.js';
import test from './test.js';

// 写入模块
InPageEdit = {
  // quickEdit
  test
}

/** 
 * @return {Object} window.InPageEdit
 */
window.InPageEdit = InPageEdit;
