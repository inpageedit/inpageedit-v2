/**
 * @license GPL-3.0 GNU GENERAL PUBLIC LICENSE 3.0
 *
 * @name InPageEdit
 * @description A useful MediaWiki JavaScript Plugin written with jQuery
 * @author 机智的小鱼君 Dragon-Fish <dragon-fish@qq.com>
 * @url https://github.com/Dragon-Fish/InPageEdit-v2
 */

'use strict';

// 创建 InPageEdit 变量
var InPageEdit = window.InPageEdit || {};
// 防止多次运行
if (typeof InPageEdit.version !== 'undefined') {
  throw '[InPageEdit] InPageEdit 已经在运行了';
}

InPageEdit.version = require('./package.json').version;

// 导入全部模块
// const { quickEdit } = require('./module/quickEdit');
const test = require('./module/test');

// 写入模块
InPageEdit = {
  // quickEdit,
  test,
}

/** 
 * @return {Object} window.InPageEdit
 */
window.InPageEdit = InPageEdit;

// 花里胡哨的加载提示
console.info('    ____      ____                   ______    ___ __              _    _____ \n   /  _/___  / __ \\____ _____ ____  / ____/___/ (_) /_            | |  / /__ \\\n   / // __ \\/ /_/ / __ `/ __ `/ _ \\/ __/ / __  / / __/  ______    | | / /__/ /\n _/ // / / / ____/ /_/ / /_/ /  __/ /___/ /_/ / / /_   /_____/    | |/ // __/ \n/___/_/ /_/_/    \\__,_/\\__, /\\___/_____/\\__,_/_/\\__/              |___//____/ \n                      /____/');