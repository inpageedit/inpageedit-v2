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


// 导入全部模块
const { _msg } = require('./module/_msg');
const { about } = require('./module/about');
const { articleLink } = require('./module/articleLink');
const { findAndReplace } = require('./module/findAndReplace');
const { loadQuickDiff } = require('./module/loadQuickDiff');
const { quickEdit } = require('./module/quickEdit');
const { quickPreview } = require('./module/quickPreview');
const { quickRedirect } = require('./module/quickRedirect');
const { quickRename } = require('./module/quickRename');
const { specialNotice } = require('./module/specialNotice');
const version = require('./module/version');
const { versionInfo } = require('./module/versionInfo');

// 写入模块
InPageEdit = {
  about,
  articleLink,
  findAndReplace,
  quickEdit,
  quickPreview,
  quickRedirect,
  quickRename,
  specialNotice,
  version,
  versionInfo,
}

// 锁定重要变量
var importantVariables = [
  'api',
  'version',
]
importantVariables.forEach(key => {
  try {
    Object.freeze(InPageEdit[key]);
  } catch (e) { }
});

// 写入全局变量 window.InPageEdit
window.InPageEdit = InPageEdit;

// 触发钩子
mw.hook('InPageEdit')
  // 传入上下文
  .fire({
    _msg
  });

// 花里胡哨的加载提示
console.info('    ____      ____                   ______    ___ __              _    _____ \n   /  _/___  / __ \\____ _____ ____  / ____/___/ (_) /_            | |  / /__ \\\n   / // __ \\/ /_/ / __ `/ __ `/ _ \\/ __/ / __  / / __/  ______    | | / /__/ /\n _/ // / / / ____/ /_/ / /_/ /  __/ /___/ /_/ / / /_   /_____/    | |/ // __/ \n/___/_/ /_/_/    \\__,_/\\__, /\\___/_____/\\__,_/_/\\__/              |___//____/ \n                      /____/');