// 导入方法
const { loadScript } = require('./loadScript');
const { getUserInfo } = require('./getUserInfo');
const { loadStyles } = require('./loadStyles');
const { updateNotice } = require('./updateNotice');

// 导入全部模块
const { _msg } = require('../module/_msg');
const { about } = require('../module/about');
const api = require('../module/api.json');
const { articleLink } = require('../module/articleLink');
const { findAndReplace } = require('../module/findAndReplace');
const { loadQuickDiff } = require('../module/loadQuickDiff');
const { pluginPreference } = require('../module/pluginPreference');
const { progress } = require('../module/progress');
const { quickDelete } = require('../module/quickDelete');
const { quickDiff } = require('../module/quickDiff');
const { quickEdit } = require('../module/quickEdit');
const { quickPreview } = require('../module/quickPreview');
const { quickRedirect } = require('../module/quickRedirect');
const { quickRename } = require('../module/quickRename');
const { specialNotice } = require('../module/specialNotice');
const version = require('../module/version');
const { versionInfo } = require('../module/versionInfo');


/**
 * @method initMain
 * @return {Object} InPageEdit
 */
module.exports = function init() {

  // 加载前置插件以及样式表
  loadStyles();
  loadScript('https://cdn.jsdelivr.net/gh/dragon-fish/inpageedit-v2@master/src/ssi_modal/ssi-modal.min.js').then(() => {
    // 初始化前置模块
    pluginPreference.set();
    getUserInfo();
    loadQuickDiff();
    articleLink();
    updateNotice();

    // 写入模块
    var InPageEdit = {
      about,
      api,
      articleLink,
      findAndReplace,
      loadQuickDiff,
      pluginPreference,
      progress,
      quickDelete,
      quickDiff,
      quickEdit,
      quickPreview,
      quickRedirect,
      quickRename,
      specialNotice,
      version,
      versionInfo,
      // 别名 Alias
      fnr: findAndReplace,
      delete: quickDelete,
      diff: quickDiff,
      edit: quickEdit,
      preview: quickPreview,
      redirect: quickRedirect,
      quickMove: quickRename,
      rename: quickRename,
    }

    // 锁定重要变量
    var importantVariables = [
      'api',
      'version',
    ];
    importantVariables.forEach(key => {
      try {
        Object.freeze(InPageEdit[key]);
      } catch (e) {
        // Do nothing
      }
    });

    // 触发钩子，传入上下文
    mw.hook('InPageEdit').fire({
      _msg
    });

    // 花里胡哨的加载提示
    console.info('    ____      ____                   ______    ___ __              _    _____ \n   /  _/___  / __ \\____ _____ ____  / ____/___/ (_) /_            | |  / /__ \\\n   / // __ \\/ /_/ / __ `/ __ `/ _ \\/ __/ / __  / / __/  ______    | | / /__/ /\n _/ // / / / ____/ /_/ / /_/ /  __/ /___/ /_/ / / /_   /_____/    | |/ // __/ \n/___/_/ /_/_/    \\__,_/\\__, /\\___/_____/\\__,_/_/\\__/              |___//____/ \n                      /____/');

    // 传回InPageEdit
    return InPageEdit;
  });
}