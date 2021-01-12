/**
 * @name InPageEdit
 * @author 机智的小鱼君 <dragon-fish@qq.com>
 * @description A useful MediaWiki JavaScript Plugin written with jQuery
 *
 * @license GPL-3.0
 * @url https://github.com/Wjghj-Project/InPageEdit
 */

/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./module/api.json":
/*!*************************!*\
  !*** ./module/api.json ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse("{\"aboutUrl\":\"https://ipe.js.org/\",\"analysis\":\"https://doc.wjghj.cn/inpageedit-v2/analysis/api/index.php\",\"analysisUrl\":\"https://blog.wjghj.cn/inpageedit-v2/analysis/\",\"githubLink\":\"https://github.com/InPageEdit/InPageEdit\",\"pluginCDN\":\"https://ipe-plugins.js.org\",\"pluginGithub\":\"https://github.com/InPageEdit/Plugins/\",\"specialNotice\":\"https://ipe-plugins.js.org/specialNotice/\",\"updatelogsUrl\":\"https://ipe.js.org/update/\"}");

/***/ }),

/***/ "./method/_dir.js":
/*!************************!*\
  !*** ./method/_dir.js ***!
  \************************/
/***/ (function(module) {

/**
 * @method getDir
 * @return {String} 插件CDN的URL路径，结尾没有/
 *
 * @description 注意，如果您想自己自己托管InPageEdit，_dir可以直接返回您的URL
 *              例如 const _dir = https://yourdomain.com/inpageedit
 */
function getDir() {
  var thisScript = document.currentScript.src;
  var thisUrl = thisScript.split('/'); // 理论上入口文件位于 /dist/*.js
  // 因此删掉最后两位路径

  thisUrl.pop();
  thisUrl.pop();
  thisUrl = thisUrl.join('/');
  return thisUrl;
}
/**
 * @constant {String} _dir CDN URL
 */


const _dir = getDir();

module.exports = _dir;

/***/ }),

/***/ "./method/beforeInstall.js":
/*!*********************************!*\
  !*** ./method/beforeInstall.js ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var config = mw.config.get();

const {
  stepModal
} = __webpack_require__(/*! ../module/stepModal */ "./module/stepModal.js");

const {
  $checkbox,
  $hr
} = __webpack_require__(/*! ../module/_elements */ "./module/_elements.js");

const {
  _msg
} = __webpack_require__(/*! ../module/_msg */ "./module/_msg.js");
/**
 * @param {Boolean} force Force show the steps modal @default false
 * @returns {Promise} User options
 */


const beforeInstall = async (force = false) => {
  // 创建 Deferred 类
  var $def = $.Deferred(); // 缓存选项

  var options = {}; // 判定是否显示

  var skip = true; // 选项为强制显示

  if (force) skip = false; // 从未显示过

  if (!localStorage.getItem('InPageEditInstallGuide')) skip = false;
  /**
   * @function setOption
   * @param {Element} el DOM element
   */

  function setOption(el) {
    var $el = $(el);
    var id = $el.attr('id');
    if (!id) return;
    var val;

    if ($el.attr('type') === 'checkbox') {
      val = $el.prop('checked');
    } else {
      val = $el.val();
    }

    options[id] = val;
    console.info('[InPageEdit] beforeInstall setOption', `${id}: ${val}`);
  }

  if (skip) {
    console.info('[InPageEdit] Skip InPageEdit Install guide');
    $def.resolve(options);
  } else {
    // 设置步骤
    var contents = []; // 欢迎辞

    contents.push({
      content: $('<div>').append($('<h3>', {
        text: _msg('preference-about-label')
      }), $('<div>', {
        text: _msg('beforeInstall-greeting-description')
      }), $hr, $('<p>', {
        text: 'InPageEdit is a useful MediaWiki JavaScript Plugin written with jQuery'
      }), $('<p>').append('© InPageEdit Copyright (C)', ' 2019 - ' + new Date().getFullYear(), ' Wjghj Project (机智的小鱼君), ', $('<a>', {
        href: 'https://www.gnu.org/licenses/gpl-3.0-standalone.html',
        text: 'GNU General Public License 3.0'
      })))
    }); // 隐私政策

    contents.push({
      content: $('<div>').append($('<h3>', {
        text: _msg('beforeInstall-privacy-policy-title')
      }), $('<div>').append($('<div>', {
        html: _msg('beforeInstall-privacy-policy-description')
      }), $hr, $checkbox({
        id: 'shareMyInfo',
        label: _msg('beforeInstall-privacy-policy-label')
      })))
    }); // 首选项

    contents.push({
      content: $('<div>').append($('<h3>', {
        text: _msg('preference-title')
      }), $('<div>').append($('<div>', {
        text: _msg('beforeInstall-preference-description')
      }).css({
        'font-size': '0.8em'
      }), $('<h4>', {
        text: _msg('preference-editHobits-label')
      }), $checkbox({
        id: 'editMinor',
        label: _msg('preference-setMinor')
      }), $checkbox({
        id: 'watchList',
        label: _msg('preference-watchList'),
        checked: true
      }), $checkbox({
        id: 'watchoutSideCloseList',
        label: _msg('preference-outSideClose'),
        checked: true
      }), $('<h4>', {
        text: _msg('preference-summary-label')
      }), $('<label>').append($('<span>', {
        html: _msg('preference-editSummary')
      }), $('<input>', {
        id: 'editSummary',
        value: _msg('preference-summary-default')
      }).css({
        display: 'block',
        width: '96%'
      }))))
    }); // 打赏

    if (config.wgUserLanguage === 'zh' || config.wgUserLanguage === 'zh-hans' || config.wgUserLanguage === 'zh-cn') {
      contents.push({
        content: $('<div>').append($('<h3>', {
          text: '支持作者'
        }), $('<div>').append('该步骤拟定推送给简体中文使用者，并附上作者的收款码。但经过与部分用户的交流后，作者意识到接受打赏可能会导致冲塔，故暂时省略了此步骤。您可以直接点击下一步按钮忽略这一步。'))
      });
    } // 完成安装


    contents.push({
      content: $('<div>').append($('<h3>', {
        text: _msg('beforeInstall-success-title')
      }), $('<div>', {
        text: _msg('beforeInstall-success-description')
      }))
    }); // 显示模态框

    stepModal({
      title: _msg('beforeInstall-title'),
      btnBefore: _msg('beforeInstall-before-btn'),
      btnAfter: _msg('beforeInstall-after-btn'),
      btnDone: _msg('beforeInstall-done-btn'),
      contents,

      onShow(modal) {
        var $modal = $('#' + modal.modalId);

        function addEvent() {
          $modal.find('input').unbind();
          $modal.find('input').change(function () {
            setOption(this);
          });
        }

        addEvent();
        $modal.find('.ssi-modalBtn.btn').click(addEvent);
      }

    }).then(() => {
      localStorage.setItem('InPageEditInstallGuide', new Date().getTime());
      $def.resolve(options);
    });
  } // 返回 Promise


  return $def;
};

module.exports = {
  beforeInstall
};

/***/ }),

/***/ "./method/getUserInfo.js":
/*!*******************************!*\
  !*** ./method/getUserInfo.js ***!
  \*******************************/
/***/ (function(module) {

var mwApi = new mw.Api();

var getUserInfo = function () {
  /**
   * @description 获取用户权限信息
   */
  mwApi.getUserInfo().then(data => {
    console.info('[InPageEdit] 成功获取用户权限信息');
    mw.config.set('wgUserRights', data.rights);
  }, error => {
    console.warn('[InPageEdit] 警告：无法获取用户权限信息', error);
    mw.config.set('wgUserRights', []);
  });
  /**
   * @description 获取封禁状态
   */

  if (mw.config.get('wgUserName') !== null) {
    mwApi.get({
      action: 'query',
      list: 'users',
      usprop: 'blockinfo',
      ususers: mw.config.get('wgUserName')
    }).then(data => {
      if (data.query.users[0].blockid) {
        mw.config.set('wgUserIsBlocked', true);
      } else {
        mw.config.set('wgUserIsBlocked', false);
      }
    });
  }
};

module.exports = {
  getUserInfo
};

/***/ }),

/***/ "./method/init.js":
/*!************************!*\
  !*** ./method/init.js ***!
  \************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// 导入方法
const _dir = __webpack_require__(/*! ./_dir */ "./method/_dir.js");

const {
  loadScript
} = __webpack_require__(/*! ./loadScript */ "./method/loadScript.js");

const {
  getUserInfo
} = __webpack_require__(/*! ./getUserInfo */ "./method/getUserInfo.js");

const {
  loadStyles
} = __webpack_require__(/*! ./loadStyles */ "./method/loadStyles.js");

const {
  updateNotice
} = __webpack_require__(/*! ./updateNotice */ "./method/updateNotice.js");

const {
  syncI18nData
} = __webpack_require__(/*! ./syncI18nData */ "./method/syncI18nData.js");

const version = __webpack_require__(/*! ../module/version */ "./module/version.js");

const {
  beforeInstall
} = __webpack_require__(/*! ./beforeInstall */ "./method/beforeInstall.js");
/**
 * @method initMain
 * @return {Object} InPageEdit
 */


module.exports = async function init() {
  mw.hook('InPageEdit.init.before').fire(); // 是否需要刷新缓存

  const purgeCache = Boolean(mw.util.getParamValue('ipe', location.href) === 'nocache' || version !== localStorage.getItem('InPageEditVersion')); // Await MediaWiki

  await mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.user']); // 等待前置插件

  await loadScript(_dir + '/src/ssi_modal/ssi-modal.min.js');
  mw.hook('InPageEdit.init.modal').fire({
    ssi_modal: window.ssi_modal
  }); // 加载样式表

  loadStyles(purgeCache); // 等待 i18n 缓存

  await syncI18nData(purgeCache);
  mw.hook('InPageEdit.init.i18n').fire({
    _msg: __webpack_require__(/*! ../module/_msg */ "./module/_msg.js")._msg
  }); // 导入全部模块

  const {
    _analysis
  } = __webpack_require__(/*! ../module/_analysis */ "./module/_analysis.js");

  const {
    _msg
  } = __webpack_require__(/*! ../module/_msg */ "./module/_msg.js");

  const {
    about
  } = __webpack_require__(/*! ../module/about */ "./module/about.js");

  const api = __webpack_require__(/*! ../module/api.json */ "./module/api.json");

  const {
    articleLink
  } = __webpack_require__(/*! ../module/articleLink */ "./module/articleLink.js");

  const {
    findAndReplace
  } = __webpack_require__(/*! ../module/findAndReplace */ "./module/findAndReplace.js");

  const {
    linksHere
  } = __webpack_require__(/*! ../module/linksHere */ "./module/linksHere.js");

  const {
    loadQuickDiff
  } = __webpack_require__(/*! ../module/loadQuickDiff */ "./module/loadQuickDiff.js");

  const {
    preference
  } = __webpack_require__(/*! ../module/preference */ "./module/preference.js");

  const {
    pluginStore
  } = __webpack_require__(/*! ../module/pluginStore */ "./module/pluginStore.js");

  const {
    progress
  } = __webpack_require__(/*! ../module/progress */ "./module/progress.js");

  const {
    quickDelete
  } = __webpack_require__(/*! ../module/quickDelete */ "./module/quickDelete.js");

  const {
    quickDiff
  } = __webpack_require__(/*! ../module/quickDiff */ "./module/quickDiff.js");

  const {
    quickEdit
  } = __webpack_require__(/*! ../module/quickEdit */ "./module/quickEdit.js");

  const {
    quickPreview
  } = __webpack_require__(/*! ../module/quickPreview */ "./module/quickPreview.js");

  const {
    quickRedirect
  } = __webpack_require__(/*! ../module/quickRedirect */ "./module/quickRedirect.js");

  const {
    quickRename
  } = __webpack_require__(/*! ../module/quickRename */ "./module/quickRename.js");

  const {
    specialNotice
  } = __webpack_require__(/*! ../module/specialNotice */ "./module/specialNotice.js");

  const {
    versionInfo
  } = __webpack_require__(/*! ../module/versionInfo */ "./module/versionInfo.js"); // 等待安装前置步骤


  var installOpt = await beforeInstall();
  console.info('[InPageEdit]', 'Install options', installOpt); // 初始化前置模块

  preference.set();
  preference.set(installOpt);
  getUserInfo();
  loadQuickDiff();
  articleLink();
  updateNotice(); // specialNotice()
  // !暂定，触发用户插件

  pluginStore.initUserPlugin(); // 写入模块

  var InPageEdit = {
    _dir,
    about,
    api,
    articleLink,
    beforeInstall,
    findAndReplace,
    linksHere,
    loadQuickDiff,
    preference,
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
    rename: quickRename
  }; // 锁定重要变量

  var importantVariables = ['_dir', 'api', 'version'];
  importantVariables.forEach(key => {
    try {
      Object.freeze(InPageEdit[key]);
    } catch (e) {// Do nothing
    }
  }); // 触发钩子，传入上下文

  mw.hook('InPageEdit').fire({
    _analysis,
    _msg,
    InPageEdit
  }); // 花里胡哨的加载提示

  console.info('    ____      ____                   ______    ___ __ \n   /  _/___  / __ \\____ _____ ____  / ____/___/ (_) /_\n   / // __ \\/ /_/ / __ `/ __ `/ _ \\/ __/ / __  / / __/\n _/ // / / / ____/ /_/ / /_/ /  __/ /___/ /_/ / / /_  \n/___/_/ /_/_/    \\__,_/\\__, /\\___/_____/\\__,_/_/\\__/  \n                      /____/                v' + version); // 传回InPageEdit

  return InPageEdit;
};

/***/ }),

/***/ "./method/loadScript.js":
/*!******************************!*\
  !*** ./method/loadScript.js ***!
  \******************************/
/***/ (function(module) {

var loadScript = function (src, noCache) {
  return $.ajax({
    url: src,
    dataType: 'script',
    crossDomain: true,
    cache: !noCache
  });
};

module.exports = {
  loadScript
};

/***/ }),

/***/ "./method/loadStyles.js":
/*!******************************!*\
  !*** ./method/loadStyles.js ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const _dir = __webpack_require__(/*! ./_dir */ "./method/_dir.js");

function loadStyles(purge) {
  // 放在越上面优先级越高
  const styleFiles = [// Default Skin
  '/src/skin/ipe-default.min.css', // ssi-modal Style
  '/src/ssi_modal/ssi-modal.min.css', // FontAwesome
  'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css'];
  styleFiles.forEach(link => {
    if (/^https?:\/\//.test(link) !== true) {
      link = _dir + link;
    }

    if (purge) {
      link += '?timestamp' + new Date().getTime();
    }

    $('head').prepend($('<link>', {
      href: link,
      rel: 'stylesheet',
      'data-ipe': 'style'
    }));
  });
}

module.exports = {
  loadStyles
};

/***/ }),

/***/ "./method/syncI18nData.js":
/*!********************************!*\
  !*** ./method/syncI18nData.js ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var config = mw.config.get();

const _dir = __webpack_require__(/*! ./_dir */ "./method/_dir.js"); // 设置


const cacheTime = 2 * 60 * 60 * 1000;
const cacheUrl = _dir + '/i18n/languages.json';
const funcName = 'InPageEdit';
const localCacheName = 'i18n-cache-' + funcName + '-content';
const localCacheTime = 'i18n-cache-' + funcName + '-timestamp';
/**
 * @method i18n Get i18n data
 * @param {Boolean} noCache true - forced no cache
 */

async function syncI18nData(noCache) {
  const now = new Date().getTime(); // 如果语言为 qqx，不返回任何东西

  if (config.wgUserLanguage === 'qqx') {
    console.warn('[InPageEdit] User language is qqx');
    return true;
  } // 缓存存在且缓存未过期


  if (localStorage.getItem(localCacheName) && now - localStorage.getItem(localCacheTime) < cacheTime && !noCache) {
    var json = {};

    try {
      json = JSON.parse(localStorage.getItem(localCacheName));
    } catch (e) {
      console.warn('[InPageEdit] i18n 数据不合法');
      await getOriginalData();
      return true;
    }

    if (json.en) {
      return true;
    } else {
      console.warn('[InPageEdit] i18n 数据可能已损坏');
      await getOriginalData();
      return true;
    }
  } else {
    await getOriginalData();
    return true;
  }
}
/**
 * @function saveToCache
 */


function saveToCache(data) {
  const now = new Date().getTime();
  data = JSON.stringify(data);
  localStorage.setItem(localCacheName, data);
  localStorage.setItem(localCacheTime, now);
}
/**
 * @function getOriginalData
 */


async function getOriginalData() {
  console.time('[InPageEdit] 从远程获取 i18n 数据');
  var data = await $.getJSON(cacheUrl, {
    cache: false,
    timestamp: new Date().getTime()
  });
  if (typeof data !== 'object') data = {};
  saveToCache(data);
  console.timeEnd('[InPageEdit] 从远程获取 i18n 数据');
  return data;
}

module.exports = {
  syncI18nData
};

/***/ }),

/***/ "./method/updateNotice.js":
/*!********************************!*\
  !*** ./method/updateNotice.js ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const version = __webpack_require__(/*! ../module/version */ "./module/version.js");

const {
  _msg
} = __webpack_require__(/*! ../module/_msg */ "./module/_msg.js"); // const api = require('../module/api.json');


const {
  versionInfo
} = __webpack_require__(/*! ../module/versionInfo */ "./module/versionInfo.js");

const {
  specialNotice
} = __webpack_require__(/*! ../module/specialNotice */ "./module/specialNotice.js");

function updateNotice() {
  if (localStorage.getItem('InPageEditVersion') !== version) {
    ssi_modal.notify('', {
      title: _msg('updatelog-update-success-title'),
      content: _msg('updatelog-update-success', version),
      className: 'in-page-edit',
      buttons: [{
        className: 'btn btn-primary',
        label: _msg('updatelog-button-versioninfo'),

        method(a, modal) {
          localStorage.setItem('InPageEditVersion', version);
          versionInfo();
          modal.close();
        }

      }],
      closeAfter: {
        time: 10,
        resetOnHover: true
      },

      onClose() {
        localStorage.setItem('InPageEditVersion', version); // ssi_modal.notify('', {
        //   className: 'in-page-edit',
        //   content: _msg('updatelog-after-close', `[${api.updatelogsUrl} ${api.updatelogsUrl}]`, `[${api.githubLink}/issues ${_msg('updatelog-file-issue')}]`),
        //   closeAfter: {
        //     time: 10
        //   },
        //   buttons: [{
        //     className: 'btn btn-primary',
        //     label: _msg('ok'),
        //     method(a, modal) {
        //       modal.close();
        //     }
        //   }]
        // });
      }

    });
  }

  if (localStorage.getItem('InPageEditNoticeId') !== _msg('noticeid')) {
    specialNotice();
  }
}

module.exports = {
  updateNotice
};

/***/ }),

/***/ "./module/_analysis.js":
/*!*****************************!*\
  !*** ./module/_analysis.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var config = mw.config.get();

var api = __webpack_require__(/*! ./api.json */ "./module/api.json");

const {
  preference
} = __webpack_require__(/*! ./preference.js */ "./module/preference.js");
/**
 * @module _analysis 提交统计信息模块
 * @param {String} functionID 模块ID，例如 quick_edit
 */


const _analysis = function (functionID) {
  if (preference.get('shareMyInfo') !== true) {
    return;
  }

  var submitdata = {
    action: 'submit',
    url: config.wgServer + config.wgArticlePath.replace('$1', ''),
    sitename: config.wgSiteName,
    username: config.wgUserName,
    function: functionID
  };
  $.ajax({
    url: api.analysis,
    data: submitdata,
    type: 'post',
    dataType: 'json'
  }).done(function (data) {
    console.log('[InPageEdit] Analysis response\nStatus: ' + data.status + '\nMessage: ' + data.msg);
  });
};

module.exports = {
  _analysis
};

/***/ }),

/***/ "./module/_elements.js":
/*!*****************************!*\
  !*** ./module/_elements.js ***!
  \*****************************/
/***/ (function(module) {

/**
 * @module _elements 常用html元素
 */
var {
  getUrl
} = mw.util;
var $br = '<br>';

var $button = ({
  type,
  text,
  html,
  href,
  link
}) => {
  html = html || text;
  href = href || link;
  var $btn = $('<button>', {
    class: type ? 'btn btn-' + type : 'btn',
    html
  });

  if (href || link) {
    var target = '';
    if (/^https?:\/\//.test(href)) target = '_blank';
    var $a = $('<a>', {
      target,
      href
    });
    $btn.appendTo($a);
  }

  return $btn;
};

var $hr = '<hr>';

var $link = ({
  page,
  link,
  href,
  text,
  html
}) => {
  href = href || link || 'javascript:void(0);';
  if (page) href = getUrl(page);
  html = html || text;
  if (page && !html) html = page;
  if (!html) html = href;
  var target = '';
  if (/^https?:\/\//.test(href)) target = '_blank';
  return $('<a>', {
    href,
    target,
    html
  });
};

var $progress = '<div class="ipe-progress" style="width: 100%"><div class="ipe-progress-bar"></div></div>';

var $checkbox = ({
  label,
  checked,
  id,
  className
}) => {
  return $('<label>', {
    class: className
  }).append($('<input>', {
    type: 'checkbox',
    checked,
    id
  }), $('<span>', {
    class: 'ipe-checkbox-box'
  }), $('<span>', {
    html: label
  })).css({
    display: 'block'
  });
};

module.exports = {
  $br,
  br: $br,
  $button,
  $hr,
  hr: $hr,
  $link,
  $progress,
  progress: $progress,
  $checkbox
};

/***/ }),

/***/ "./module/_hasRight.js":
/*!*****************************!*\
  !*** ./module/_hasRight.js ***!
  \*****************************/
/***/ (function(module) {

var config = mw.config.get();
/**
 * @module _hasRight 是否拥有权限
 * @param {String} right
 * @return {Boolean}
 */

const _hasRight = function (right) {
  if (config.wgUserIsBlocked === true) {
    return false;
  }

  if (mw.config.get('wgUserRights').indexOf(right) > -1) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  _hasRight
};

/***/ }),

/***/ "./module/_msg.js":
/*!************************!*\
  !*** ./module/_msg.js ***!
  \************************/
/***/ (function(module) {

const funcName = 'InPageEdit';
const userLang = mw.config.get('wgUserLanguage');
const fallbacks = {
  ab: 'ru',
  ace: 'id',
  aln: 'sq',
  als: 'gsw',
  an: 'es',
  anp: 'hi',
  arn: 'es',
  arz: 'ar',
  av: 'ru',
  ay: 'es',
  ba: 'ru',
  bar: 'de',
  'bat-smg': 'sgs',
  bcc: 'fa',
  'be-x-old': 'be-tarask',
  bh: 'bho',
  bjn: 'id',
  bm: 'fr',
  bpy: 'bn',
  bqi: 'fa',
  bug: 'id',
  'cbk-zam': 'es',
  ce: 'ru',
  ckb: 'ckb-arab',
  crh: 'crh-latn',
  'crh-cyrl': 'ru',
  csb: 'pl',
  cv: 'ru',
  'de-at': 'de',
  'de-ch': 'de',
  'de-formal': 'de',
  dsb: 'de',
  dtp: 'ms',
  eml: 'it',
  ff: 'fr',
  'fiu-vro': 'vro',
  frc: 'fr',
  frp: 'fr',
  frr: 'de',
  fur: 'it',
  gag: 'tr',
  gan: 'gan-hant',
  'gan-hans': 'zh-hans',
  'gan-hant': 'zh-hant',
  gl: 'pt',
  glk: 'fa',
  gn: 'es',
  gsw: 'de',
  hif: 'hif-latn',
  hsb: 'de',
  ht: 'fr',
  ii: 'zh-cn',
  inh: 'ru',
  iu: 'ike-cans',
  jut: 'da',
  jv: 'id',
  kaa: 'kk-latn',
  kbd: 'kbd-cyrl',
  'kbd-cyrl': 'ru',
  khw: 'ur',
  kiu: 'tr',
  kk: 'kk-cyrl',
  'kk-arab': 'kk-cyrl',
  'kk-cn': 'kk-arab',
  'kk-kz': 'kk-cyrl',
  'kk-latn': 'kk-cyrl',
  'kk-tr': 'kk-latn',
  kl: 'da',
  koi: 'ru',
  'ko-kp': 'ko',
  krc: 'ru',
  ks: 'ks-arab',
  ksh: 'de',
  ku: 'ku-latn',
  'ku-arab': 'ckb',
  kv: 'ru',
  lad: 'es',
  lb: 'de',
  lbe: 'ru',
  lez: 'ru',
  li: 'nl',
  lij: 'it',
  liv: 'et',
  lmo: 'it',
  ln: 'fr',
  ltg: 'lv',
  lzz: 'tr',
  mai: 'hi',
  'map-bms': 'jv',
  mg: 'fr',
  mhr: 'ru',
  min: 'id',
  mo: 'ro',
  mrj: 'ru',
  mwl: 'pt',
  myv: 'ru',
  mzn: 'fa',
  nah: 'es',
  nap: 'it',
  nds: 'de',
  'nds-nl': 'nl',
  'nl-informal': 'nl',
  no: 'nb',
  os: 'ru',
  pcd: 'fr',
  pdc: 'de',
  pdt: 'de',
  pfl: 'de',
  pms: 'it',
  // 'pt': 'pt-br',
  'pt-br': 'pt',
  qu: 'es',
  qug: 'qu',
  rgn: 'it',
  rmy: 'ro',
  rue: 'uk',
  ruq: 'ruq-latn',
  'ruq-cyrl': 'mk',
  'ruq-latn': 'ro',
  sa: 'hi',
  sah: 'ru',
  scn: 'it',
  sg: 'fr',
  sgs: 'lt',
  shi: 'ar',
  simple: 'en',
  sli: 'de',
  sr: 'sr-ec',
  srn: 'nl',
  stq: 'de',
  su: 'id',
  szl: 'pl',
  tcy: 'kn',
  tg: 'tg-cyrl',
  tt: 'tt-cyrl',
  'tt-cyrl': 'ru',
  ty: 'fr',
  udm: 'ru',
  ug: 'ug-arab',
  uk: 'ru',
  vec: 'it',
  vep: 'et',
  vls: 'nl',
  vmf: 'de',
  vot: 'fi',
  vro: 'et',
  wa: 'fr',
  wo: 'fr',
  wuu: 'zh-hans',
  xal: 'ru',
  xmf: 'ka',
  yi: 'he',
  za: 'zh-hans',
  zea: 'nl',
  zh: 'zh-hans',
  'zh-classical': 'lzh',
  'zh-cn': 'zh-hans',
  'zh-hant': 'zh-hans',
  'zh-hk': 'zh-hant',
  'zh-min-nan': 'nan',
  'zh-mo': 'zh-hk',
  'zh-my': 'zh-sg',
  'zh-sg': 'zh-hans',
  'zh-tw': 'zh-hant',
  'zh-yue': 'yue'
};
/**
 * @function toObject
 * @param {String} data
 */

function toObject(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
}
/**
 * Substitute arguments into the string, where arguments are represented
 * as $n where n > 0.
 *
 * @param message The message to substitute arguments into
 * @param arguments The arguments to substitute in.
 *
 * @return The resulting message.
 */


function handleArgs(message, ...args) {
  args.forEach(function (elem, index) {
    var rgx = new RegExp('\\$' + (index + 1), 'g');
    message = message.replace(rgx, elem);
  });
  return message;
}
/**
 * Generate a HTML link using the supplied parameters.
 *
 * @param href The href of the link which will be converted to
 *     '/wiki/href'.
 * @param text The text and title of the link. If this is not supplied, it
 *     will default to href.
 * @param hasProtocol True if the href parameter already includes the
 *     protocol (i.e. it begins with 'http://', 'https://', or '//').
 *
 * @return The generated link.
 */


function makeLink(href, text, hasProtocol, blank) {
  text = text || href;
  href = hasProtocol ? href : mw.util.getUrl(href);
  text = mw.html.escape(text);
  href = mw.html.escape(href);
  blank = blank ? 'target="_blank"' : '';
  return '<a href="' + href + '" title="' + text + '"' + blank + '>' + text + '</a>';
}
/*
 * Allow basic inline HTML tags in wikitext.does not support <a> as that's handled by the
 * wikitext links instead.
 *
 * Supports the following tags:
 * - <i>
 * - <b>
 * - <s>
 * - <br>
 * - <em>
 * - <hr>
 * - <strong>
 * - <span>
 *
 * Supports the following tag attributes:
 * - title
 * - style
 * - class
 *
 * @param html
 *
 * @return
 */


function sanitiseHtml(html) {
  var context = document.implementation.createHTMLDocument(''),
      $html = $.parseHTML(html,
  /* document */
  context,
  /* keepscripts */
  false),
      $div = $('<div>', context).append($html),
      whitelistAttrs = ['title', 'style', 'class'],
      whitelistTags = ['b', 'br', 'code', 'del', 'em', 'hr', 'i', 's', 'strong', 'span'];
  $div.find('*').each(function () {
    var $this = $(this),
        tagname = $this.prop('tagName').toLowerCase(),
        attrs,
        array,
        style;

    if (whitelistTags.indexOf(tagname) === -1) {
      mw.log('[I18n-js] Disallowed tag in message: ' + tagname);
      $this.remove();
      return;
    }

    attrs = $this.prop('attributes');
    array = Array.prototype.slice.call(attrs);
    array.forEach(function (attr) {
      if (whitelistAttrs.indexOf(attr.name) === -1) {
        mw.log('[I18n-js] Disallowed attribute in message: ' + attr.name + ', tag: ' + tagname);
        $this.removeAttr(attr.name);
        return;
      } // make sure there's nothing nasty in style attributes


      if (attr.name === 'style') {
        style = $this.attr('style');

        if (style.indexOf('url(') > -1) {
          mw.log('[I18n-js] Disallowed url() in style attribute');
          $this.removeAttr('style'); // https://phabricator.wikimedia.org/T208881
        } else if (style.indexOf('var(') > -1) {
          mw.log('[I18n-js] Disallowed var() in style attribute');
          $this.removeAttr('style');
        }
      }
    });
  });
  return $div.prop('innerHTML');
}
/*
 * Parse some basic wikitext into HTML. Also supports basic inline HTML tags.
 *
 * Will process:
 * - http/https
 * - [url text]
 * - [[pagename]]
 * - [[pagename|text]]
 * - {{PLURAL:count|singular|plural}}
 * - {{GENDER:gender|masculine|feminine|neutral}}
 *
 * @param message The message to process.
 *
 * @return The resulting string.
 */


function parseWikitext(message) {
  // [url text] -> [$1 $2]
  var urlRgx = /\[((?:https?:)?\/\/.+?) (.+?)\]/g,
      // [[pagename]] -> [[$1]]
  simplePageRgx = /\[\[([^|]*?)\]\]/g,
      // [[pagename|text]] -> [[$1|$2]]
  pageWithTextRgx = /\[\[(.+?)\|(.+?)\]\]/g,
      // {{PLURAL:count|singular|plural}} -> {{PLURAL:$1|$2}}
  pluralRgx = /\{\{PLURAL:(\d+)\|(.+?)\}\}/gi,
      // {{GENDER:gender|masculine|feminine|neutral}} -> {{GENDER:$1|$2}}
  genderRgx = /\{\{GENDER:([^|]+)\|(.+?)\}\}/gi;

  if (message.indexOf('<') > -1) {
    message = sanitiseHtml(message);
  }

  return message.replace(urlRgx, function (_match, href, text) {
    return makeLink(href, text, true, true);
  }) // .replace(httpRgx, function (_match, before, href, after) {
  //   return before + makeLink(href, href, true, true) + after;
  // })
  .replace(simplePageRgx, function (_match, href) {
    return makeLink(href);
  }).replace(pageWithTextRgx, function (_match, href, text) {
    return makeLink(href, text);
  }).replace(pluralRgx, function (_match, count, forms) {
    return mw.language.convertPlural(Number(count), forms.split('|'));
  }).replace(genderRgx, function (_match, gender, forms) {
    return mw.language.gender(gender, forms.split('|'));
  });
}
/**
 * @function parseMessage
 * @param {String} msg
 * @param  {...Sting} args
 */


function parseMessage(msg, ...args) {
  msg = handleArgs(msg, ...args);
  msg = parseWikitext(msg);
  return msg;
}
/**
 * @function rawMessage
 */


function getMessage(lang, msgKey, ...args) {
  const i18nCache = localStorage.getItem('i18n-cache-' + funcName + '-content') || '{}'; // qqx

  if (lang === 'qqx') {
    var after = '';

    if (args.length > 0) {
      after = ': ' + args.join(', ');
    }

    return `(${funcName.toLowerCase()}-${msgKey}${after})`;
  } // 获取 i18n


  var cacheMessages = toObject(i18nCache); // 查询本地覆写

  var ipe = window.InPageEdit || {};
  var overrides = ipe.i18n || {}; // InPageEdit.i18n.lang.msgKey

  if (overrides[lang] && overrides[lang][msgKey]) {
    return parseMessage(overrides[lang][msgKey], ...args);
  } // InPageEdit.i18n.msgKey


  if (overrides[msgKey]) {
    return parseMessage(overrides[msgKey], ...args);
  } // 查询用户语言


  if (cacheMessages[lang] && cacheMessages[lang][msgKey]) {
    return parseMessage(cacheMessages[lang][msgKey], ...args);
  } // 如果到了这一步，意味着消息不存在


  if (lang === 'en') {
    return `<${funcName}-${msgKey}>`;
  } // 转换用户语言后再试，例如 zh => zh-hans, zh-tw => zh-hant


  lang = fallbacks[lang] || 'en';
  return getMessage(lang, msgKey, ...args);
}
/**
 * @module _msg
 * @param {String} msgKey 消息的键
 * @param  {String} args 替代占位符($1, $2...)的内容，可以解析简单的wikitext
 */


var _msg = function (msgKey, ...args) {
  return getMessage(userLang, msgKey, ...args);
};

module.exports = {
  _msg
};

/***/ }),

/***/ "./module/_resolveExists.js":
/*!**********************************!*\
  !*** ./module/_resolveExists.js ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const {
  _hasRight
} = __webpack_require__(/*! ./_hasRight */ "./module/_hasRight.js");

const {
  quickDelete
} = __webpack_require__(/*! ./quickDelete */ "./module/quickDelete.js");

const {
  quickEdit
} = __webpack_require__(/*! ./quickEdit */ "./module/quickEdit.js");
/**
 * @module _resolveExists 解决目标页面已存在的问题
 * @param {String} page 需要解决的页面
 * @param {Object|String} reason 填字符串则直接指定两种原因
 * @param {String} reason.delete 删除原因
 * @param {String} reason.edit 编辑原因
 */


var _resolveExists = function (page, reason = {}) {
  var canDelete = _hasRight('delete');

  if (typeof reason === 'string') {
    reason = {
      delete: reason,
      edit: reason
    };
  }

  ssi_modal.show({
    className: 'in-page-edit resovle-exists',
    sizeClass: 'dialog',
    center: true,
    outSideClose: false,
    title: _msg('target-exists-title'),
    content: _msg(canDelete ? 'target-exists-can-delete' : 'target-exists-no-delete', page),
    buttons: [{
      className: 'btn btn-danger btn-exists-delete-target',
      label: _msg('quick-delete'),

      method(a, modal) {
        modal.close();
        quickDelete(page, reason.delete || null);
      }

    }, {
      className: 'btn btn-primary',
      label: _msg('quick-edit'),

      method() {
        quickEdit({
          page: page,
          summary: reason.edit ? '[InPageEdit] ' + reason : null,
          reload: false
        });
      }

    }, {
      className: 'btn btn-secondary' + (canDelete ? ' btn-single' : ''),
      label: _msg('cancel'),
      method: (a, modal) => {
        modal.close();
      }
    }],
    onShow: () => {
      if (!canDelete) {
        $('.btn-exists-delete-target').hide();
      }
    }
  });
};

module.exports = {
  _resolveExists
};

/***/ }),

/***/ "./module/about.js":
/*!*************************!*\
  !*** ./module/about.js ***!
  \*************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const api = __webpack_require__(/*! ./api.json */ "./module/api.json");
/**
 * @module about 关于插件模块
 * @description Show "What is" modal box of IPE2
 */


var about = function () {
  ssi_modal.show({
    title: _msg('preference-about-label'),
    className: 'in-page-edit in-page-edit-about',
    content: $('<section>').append($('<iframe>', {
      style: 'margin: 0;padding: 0;width: 100%;height: 80vh;border: 0;',
      src: api.aboutUrl
    }))
  });
};

module.exports = {
  about
};

/***/ }),

/***/ "./module/articleLink.js":
/*!*******************************!*\
  !*** ./module/articleLink.js ***!
  \*******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var config = mw.config.get();

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const {
  preference
} = __webpack_require__(/*! ./preference */ "./module/preference.js");

const {
  quickEdit
} = __webpack_require__(/*! ./quickEdit */ "./module/quickEdit.js");

const {
  getParamValue
} = mw.util;
/**
 * @module articleLink 获取段落编辑以及编辑链接
 * @param {Sting|Element} el jQuery element to find edit links
 */

var articleLink = function (el) {
  if (el === undefined) {
    if (preference.get('redLinkQuickEdit') === true) {
      el = $('#mw-content-text a');
    } else {
      el = $('#mw-content-text a:not(.new)');
    }
  }

  el = $(el);
  $.each(el, function (_, item) {
    var $this = $(item);
    if ($this.attr('href') === undefined) return;
    var url = $this.attr('href'),
        action = getParamValue('action', url) || getParamValue('veaction', url),
        title = getParamValue('title', url),
        section = getParamValue('section', url) ? getParamValue('section', url).replace(/T-/, '') : null,
        revision = getParamValue('oldid', url); // 不是本地编辑链接

    if (!RegExp('^' + config.wgServer).test(url) && !RegExp('^/').test(url)) return; // 不是 index.php?title=FOO 形式的url

    if (title === null) {
      title = url.replace(config.wgServer, '');
      title = title.split('?')[0];
      title = title.replace(config.wgArticlePath.replace('$1', ''), '');
    }

    if (action === 'edit' && title !== undefined) {
      $this.addClass('ipe-articleLink-resolved').after($('<span>', {
        class: 'in-page-edit-article-link-group'
      }).append($('<a>', {
        href: 'javascript:void(0)',
        class: 'in-page-edit-article-link',
        text: _msg('quick-edit')
      }).click(function () {
        var options = {};
        options.page = decodeURI(title);

        if (revision !== null) {
          options.revision = revision;
        } else if (section !== null) {
          options.section = section;
        }

        if (!config.wgIsArticle) options.reload = false;
        quickEdit(options);
      })));
    }
  });
};

module.exports = {
  articleLink
};

/***/ }),

/***/ "./module/findAndReplace.js":
/*!**********************************!*\
  !*** ./module/findAndReplace.js ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const {
  $br
} = __webpack_require__(/*! ./_elements */ "./module/_elements.js");
/**
 * @module findAndReplace 查找替换模块
 * @param {element} element Textarea
 */


function findAndReplace(element) {
  if (element === undefined) element = $('.in-page-edit.ipe-editor:last .editArea');
  var origin = element.val();
  ssi_modal.show({
    className: 'in-page-edit',
    sizeClass: 'dialog',
    center: true,
    outSideClose: false,
    // position: 'right bottom',
    title: _msg('fAndR-title'),
    content: $('<div>', {
      class: 'module far-module'
    }).append($('<div>', {
      class: 'module_content',
      id: 'findfielddiv'
    }).append($('<section>').append($('<h4>', {
      text: _msg('fAndR-find-text')
    }), $('<textarea>', {
      id: 'find_this',
      style: 'margin: 0',
      rows: 4
    }), $('<h4>', {
      text: _msg('fAndR-replace-text')
    }), $('<textarea>', {
      id: 'replace_with',
      style: 'margin: 0',
      rows: 4
    })), $('<section>', {
      style: 'padding: 7px 0'
    }).append($('<label>').append($('<input>', {
      type: 'checkbox',
      id: 'globl',
      checked: ''
    }), $('<span>', {
      text: _msg('fAndR-globl')
    })), $br, $('<label>').append($('<input>', {
      type: 'checkbox',
      id: 'case_sen'
    }), $('<span>', {
      text: _msg('fAndR-case-sen')
    })), $br, $('<label>').append($('<input>', {
      type: 'checkbox',
      id: 'regex_search'
    }), $('<span>', {
      text: _msg('fAndR-enable-regex')
    }))))),
    buttons: [{
      label: _msg('fAndR-button-undo'),
      className: 'btn btn-danger',

      method() {
        element.val(origin);
        ssi_modal.notify('info', {
          className: 'in-page-edit',
          title: _msg('notify-info'),
          content: _msg('notify-fAndR-undo')
        }); // modal.close();
      }

    }, {
      className: 'btn btn-primary',
      label: _msg('fAndR-button-replace'),

      method() {
        /**
         * 查找替换主函数
         * 借鉴：https://dev.fandom.com/wiki/MediaWiki:FindAndReplace/code.js
         **/
        if ($('#find_this').val() === '') return;
        var searchfor = '',
            searchexp,
            $textarea = element,
            replacewith = $('#replace_with').val().replace(/\r/gi, ''),
            text = $textarea.val().replace(/\r/gi, ''),
            flagg = 'g',
            flagi = 'i',
            enableregex = 0;

        if ($('#globl').prop('checked') === false) {
          flagg = '';
        }

        if ($('#case_sen').prop('checked') === true) {
          flagi = '';
        }

        if ($('#regex_search').prop('checked') === true) {
          enableregex = 1;
        }

        var flags = flagg + flagi + 'm';

        if (enableregex === 1) {
          searchfor = $('#find_this').val();
        } else {
          searchfor = $('#find_this').val().replace(/\r/gi, '').replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
        }

        searchexp = new RegExp(searchfor, flags);
        var rcount = 0;
        var matched = text.match(searchexp);

        if (matched !== null) {
          rcount = matched.length;
        }

        text = text.replace(searchexp, replacewith);
        $textarea.val(text);
        ssi_modal.notify('success', {
          className: 'in-page-edit',
          title: _msg('notify-success'),
          content: _msg('notify-fAndR-done', rcount)
        }); // modal.close();
      }

    }]
  });
}

module.exports = {
  findAndReplace
};

/***/ }),

/***/ "./module/linksHere.js":
/*!*****************************!*\
  !*** ./module/linksHere.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * @module linksHere
 */
const {
  quickEdit
} = __webpack_require__(/*! ./quickEdit */ "./module/quickEdit.js");

const {
  _analysis
} = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");

const {
  $progress,
  $link
} = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

var mwApi = new mw.Api();
var config = mw.config.get();
/**
 * @function isFile
 * @returns {Boolean} Is file page?
 */

var isFile = title => {
  var fileReg = new RegExp(`^(File|${config.wgFormattedNamespaces[6]}):`);
  return fileReg.test(title);
};
/**
 * @function getList
 * @param {Sting} title
 */


var getList = title => {
  var opt = {
    format: 'json',
    action: 'query',
    prop: isFile(title) ? 'fileusage' : 'linkshere',
    titles: title
  };

  if (isFile(title)) {
    opt.fulimit = 'max';
  } else {
    opt.lhlimit = 'max';
  }

  return mwApi.get(opt);
};
/**
 * @function makeList
 * @param {Object} list
 */


var makeList = list => {
  var $list = $('<ol>', {
    class: 'ipe-links-here-list'
  });
  $.each(list, (index, {
    title,
    redirect
  }) => {
    $list.append($('<li>').append($link({
      page: title
    }).attr('target', '_blank'), redirect !== undefined ? ' (<i>' + _msg('links-here-isRedirect') + '</i>)' : '', ' (', $link({
      text: '← ' + _msg('links-here')
    }).click(function () {
      linksHere(title);
    }), ' | ', $link({
      text: _msg('quick-edit')
    }).click(function () {
      quickEdit({
        page: title,
        require: false
      });
    }), ')'));
  });
  return $list;
};
/**
 * @module linksHere
 * @param {String} title
 */


async function linksHere(title = config.wgPageName) {
  _analysis('linkshere');

  if (!title || typeof title !== 'string') title = config.wgPageName; // 构建内容

  var $progressBar = $($progress);
  var $content = $('<div>').append($progressBar); // 构建模态框

  var modal = ssi_modal.createObject({
    className: 'in-page-edit ipe-links-here',
    center: true,
    sizeClass: 'dialog',

    onShow(modal) {
      mw.hook('InPageEdit.linksHere').fire({
        modal,
        $modal: $('#' + modal.modalId)
      });
    }

  }).init(); // 设定模态框

  modal.setTitle(_msg('links-here-title', title, 2));
  modal.setContent($content); // 显示模态框

  modal.show(); // 异步操作

  try {
    console.info('[InPageEdit] linksHere', '开始获取页面信息');
    const data = await getList(title);
    const {
      pages
    } = data.query;
    console.info('[InPageEdit] linksHere', '成功获取页面信息');
    var pageId = Object.keys(pages)[0];
    var pageList = []; // 判定为文件还是一般页面

    if (isFile(title)) {
      pageList = pages[pageId].fileusage || [];
    } else {
      pageList = pages[pageId].linkshere || [];
    }

    $progressBar.hide(); // 如果存在页面，则插入列表，否则显示提示

    if (pageList.length > 0) {
      var $list = makeList(pageList);
      $content.append($list);
    } else {
      $content.append($('<div>', {
        class: 'ipe-links-here-no-page',
        html: _msg('links-here-no-page', title)
      }));
    } // 配置西文单数名词


    if (pageList.length < 2) {
      modal.setTitle(_msg('links-here-title', title, 1));
    } // pageId 是一个字符串，MediaWiki NM$L
    // pageId 为 "-1" 则意味着请求的页面似乎不存在
    // 但这不意味着不会有链入页面


    if (pageId === '-1') {
      $content.append($('<div>', {
        html: _msg('links-here-not-exist', title),
        class: 'ipe-links-here-not-exist'
      }));
    } // 发射钩子


    mw.hook('InPageEdit.linksHere.pageList').fire(pageList);
    return pageList;
  } catch (err) {
    $progressBar.hide();
    $content.append($('<p>', {
      class: 'error',
      html: err
    }));
    console.error('[InPageEdit] linksHere', '获取页面信息时出现问题', err);
    return err;
  }
}

module.exports = {
  linksHere
};

/***/ }),

/***/ "./module/loadQuickDiff.js":
/*!*********************************!*\
  !*** ./module/loadQuickDiff.js ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var config = mw.config.get();

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const {
  _analysis
} = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");

const {
  quickDiff
} = __webpack_require__(/*! ./quickDiff */ "./module/quickDiff.js");
/**
 * @module loadQuickDiff 在特定页面查询差异链接并绑定快速差异
 */


var loadQuickDiff = function () {
  // 最近更改
  function addLink() {
    $('.mw-changeslist-groupdiff, .mw-changeslist-diff, .mw-changeslist-diff-cur, .mw-history-histlinks a').unbind('click', ipeDiffLink);
    var ipeDiffLink = $('.mw-changeslist-groupdiff, .mw-changeslist-diff, .mw-changeslist-diff-cur, .mw-history-histlinks a').click(function (e) {
      e.preventDefault();

      _analysis('quick_diff_recentchanges');

      var $this = $(this),
          href = $this.attr('href'),
          diff = mw.util.getParamValue('diff', href),
          curid = mw.util.getParamValue('curid', href),
          oldid = mw.util.getParamValue('oldid', href);

      if (diff === '0') {
        quickDiff({
          fromrev: oldid,
          toid: curid
        });
      } else if (diff === 'prev' || diff === 'next' || diff === 'cur') {
        quickDiff({
          fromrev: oldid,
          torelative: diff
        });
      } else {
        quickDiff({
          fromrev: oldid,
          torev: diff
        });
      }
    });
  }

  if ($('.mw-rcfilters-enabled').length > 0) {
    setInterval(addLink, 500);
    $('.mw-rcfilters-enabled').addClass('ipe-continuous-active');
  } else {
    addLink();
  } // 查看历史页面的比较按钮与快速编辑


  if (config.wgAction === 'history') {
    $('.historysubmit.mw-history-compareselectedversions-button').after($('<button>').text(_msg('quick-diff')).click(function (e) {
      e.preventDefault();

      _analysis('quick_diff_history_page');

      var before = $('.selected.before').attr('data-mw-revid'),
          after = $('.selected.after').attr('data-mw-revid');
      quickDiff({
        fromrev: after,
        torev: before
      });
    }));
    $('[data-mw-revid]').each(function () {
      var $this = $(this),
          oldid = $this.attr('data-mw-revid');
      $this.find('.mw-history-undo').after($('<span>').html(' | <a class="in-page-edit-article-link" href="javascript:void(0);" onclick="InPageEdit.quickEdit({page:mw.config.get(\'wgPageName\'),revision:' + oldid + '});">' + _msg('quick-edit') + '</a>'));
    });
  }
};

module.exports = {
  loadQuickDiff
};

/***/ }),

/***/ "./module/pluginStore.js":
/*!*******************************!*\
  !*** ./module/pluginStore.js ***!
  \*******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// const _dir = require('../method/_dir');
// const { _msg } = require('./_msg');
const pluginCDN = __webpack_require__(/*! ./api.json */ "./module/api.json").pluginCDN;
/**
 * @module pluginStore 加载InPageEdit插件
 */


var pluginStore = {
  /**
   * @module pluginStore.get 获取官方插件
   */
  get() {
    return $.ajax({
      url: pluginCDN + '/index.json',
      dataType: 'json',
      crossDomain: true,
      cache: false
    });
  },

  saveCache(data) {
    var ipe = window.InPageEdit || {};
    ipe.cache = ipe.cache || {};
    ipe.cache.pluginList = data;
    window.InPageEdit = ipe;
  },

  loadCache() {
    var ipe = window.InPageEdit || {};
    ipe.cache = ipe.cache || {};
    return ipe.cache.pluginList;
  },

  /**
   * @module pluginStore.load 载入插件
   * @param {String} name
   */
  load(name) {
    if (/^https?:\/\//.test(name)) {
      mw.loader.load(name);
      console.info('[InPageEdit] 从远程加载非官方插件', name);
    } else {
      const {
        loadScript
      } = __webpack_require__(/*! ../method/loadScript */ "./method/loadScript.js");

      loadScript(pluginCDN + '/plugins/' + name).then(() => console.info('[InPageEdit] 插件 ' + name + ' 加载成功'), err => console.warn('[InPageEdit] 插件 ' + name + ' 加载失败', err));
      console.info('[InPageEdit] 从官方插件商店加载插件', name);
    }
  },

  /**
   * @module pluginStore.initUserPlugin 初始化用户插件
   */
  initUserPlugin() {
    const {
      preference
    } = __webpack_require__(/*! ./preference */ "./module/preference.js");

    var userPlugins = preference.get('plugins');

    if (typeof userPlugins === 'object' && userPlugins.length > 0) {
      $.each(userPlugins, (key, val) => {
        pluginStore.load(val);
      });
    }
  }

};
module.exports = {
  pluginStore
};

/***/ }),

/***/ "./module/preference.js":
/*!******************************!*\
  !*** ./module/preference.js ***!
  \******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * @module preference 个人设置模块
 */
var InPageEdit = window.InPageEdit || {};
var config = mw.config.get(); // const { _analysis } = require('./_analysis')

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const {
  $br,
  $hr,
  $progress,
  $checkbox,
  $button
} = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

const api = __webpack_require__(/*! ./api.json */ "./module/api.json");

const version = __webpack_require__(/*! ./version */ "./module/version.js");

const {
  pluginStore
} = __webpack_require__(/*! ./pluginStore */ "./module/pluginStore.js");

const _dir = __webpack_require__(/*! ../method/_dir */ "./method/_dir.js");

const {
  beforeInstall
} = __webpack_require__(/*! ../method/beforeInstall */ "./method/beforeInstall.js");
/**
 * @name 预设值
 * @return {object}
 */


var defaultSettings = {
  editMinor: false,
  editSummary: _msg('preference-summary-default'),
  lockToolBox: false,
  redLinkQuickEdit: true,
  shareMyInfo: false,
  outSideClose: true,
  watchList: Boolean(mw.user.options.get('watchdefault')),
  plugins: ['toolbox.js']
};
/**
 * @name 获取设置
 * @description 合并保存在用户页的设置以及localStorage的设置，有容错机制
 * @param {string} setting 返回相应的设置，为空时返回全部设置
 * @return {object|string}
 */

var get = setting => {
  var local = localStorage.getItem('InPageEditPreference') || '{}';

  try {
    local = JSON.parse(local);
  } catch (e) {
    local = {};
  }

  if (typeof InPageEdit.myPreference === 'object') {
    local = $.extend({}, local, InPageEdit.myPreference);
  }

  var json = $.extend({}, defaultSettings, local);

  if (typeof setting === 'string' && setting !== '') {
    return json[setting] ? json[setting] : null;
  } else {
    return json;
  }
};
/**
 * @name 保存设置
 * @param {Object|string} settingKey
 * @param {any} settingValue
 * @example 可以这样 preference.set({ key: 'value' }) 也可以 preference.set('key', 'value')
 */


var set = (settingKey = {}, settingValue = undefined) => {
  var options = {};

  if (typeof settingKey === 'string' && settingValue !== undefined) {
    options[settingKey] = settingValue;
  } else if (typeof settingKey === 'object') {
    options = settingKey;
  } else {
    return;
  }

  options = $.extend({}, preference.get(), options);
  options = JSON.stringify(options);
  localStorage.setItem('InPageEditPreference', options);
};
/**
 * @name 用户图形界面
 * @description 打开可视化设置窗口
 */


var modal = () => {
  // 防止多开设置页面
  if ($('#ipe-preference-form').length > 0) return;
  mw.hook('pluginPreference').fire();
  preference.set();
  var local = preference.get();

  __webpack_require__(/*! ./_analysis */ "./module/_analysis.js")._analysis('plugin_setting');
  /** 定义模态框内部结构 */


  var $tabList = $('<ul>', {
    class: 'tab-list'
  }).append($('<li>').append($('<a>', {
    text: _msg('preference-tab-editor'),
    href: '#editor'
  })), $('<li>').append($('<a>', {
    text: _msg('preference-tab-plugin'),
    href: '#plugin'
  })), $('<li>').append($('<a>', {
    text: _msg('preference-tab-analysis'),
    href: '#analysis'
  })), $('<li>').append($('<a>', {
    text: _msg('preference-tab-another'),
    href: '#another'
  })), $('<li>').append($('<a>', {
    text: _msg('preference-tab-about'),
    href: '#about'
  })));
  var $tabContent = $('<div>', {
    class: 'tab-content',
    style: 'position: relative;'
  }).append($('<section>', {
    id: 'editor'
  }).append($('<h3>', {
    text: _msg('preference-editor-title')
  }), $('<h4>', {
    text: _msg('preference-editHobits-label')
  }), $checkbox({
    id: 'editMinor',
    label: _msg('preference-setMinor')
  }), $checkbox({
    id: 'watchList',
    label: _msg('preference-watchList')
  }), $checkbox({
    id: 'watchoutSideCloseList',
    label: _msg('preference-outSideClose')
  }), $('<h4>', {
    text: _msg('preference-summary-label')
  }), $('<label>', {
    for: 'editSummary',
    style: 'padding-left: 0; font-size: small',
    html: _msg('preference-editSummary')
  }), $('<input>', {
    id: 'editSummary',
    style: 'width: 96%',
    placeholder: 'Edit via InPageEdit, yeah~'
  })), $('<section>', {
    id: 'plugin'
  }).append($('<h3>', {
    text: _msg('preference-plugin-title')
  }), $('<div>', {
    id: 'plugin-container',
    html: $($progress).css({
      width: '96%',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)'
    })
  }), $('<div>', {
    class: 'plugin-footer'
  }).html(_msg('preference-plugin-footer', api.pluginGithub))), $('<section>', {
    id: 'analysis'
  }).append($('<h3>', {
    text: _msg('preference-analysis-title')
  }), $('<div>', {
    id: 'analysis-container'
  }).append($('<label>').append($('<input>', {
    type: 'checkbox',
    id: 'shareMyInfo'
  }), $('<span>', {
    html: _msg('preference-analysis-shareMyInfo')
  })), $($progress).attr('id', 'analysis-loading').css({
    width: '96%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)'
  }))), $('<section>', {
    id: 'another'
  }).append($('<h3>', {
    text: _msg('preference-another-title')
  }), $button({
    type: 'secondary',
    text: _msg('beforeInstall-title')
  }).css({
    display: 'block'
  }).click(function () {
    beforeInstall(true).then(opt => {
      set(opt);
    });
  }), $('<h4>', {
    text: _msg('preference-display-label')
  }), $('<label>').append($('<input>', {
    type: 'checkbox',
    id: 'redLinkQuickEdit'
  }), $('<span>', {
    text: _msg('preference-redLinkQuickEdit')
  })), $('<div>').append($('<h4>', {
    text: 'Custom skin (Not available yet)'
  }), $('<label>', {
    class: 'choose-skin'
  }).append($('<input>', {
    type: 'checkbox',
    id: 'useCustomSkin',
    disabled: true
  }), $('<span>'), $('<input>', {
    id: 'skinUrl',
    disabled: true,
    style: 'width: calc(96% - 30px)',
    value: _dir + '/src/skin/ipe-default.css'
  }))), $('<h4>', {
    text: _msg('preference-savelocal-popup-title')
  }), $('<button>', {
    class: 'btn btn-secondary',
    id: 'ipeSaveLocalShow',
    text: _msg('preference-savelocal-btn')
  }).click(function () {
    // 永久保存（本地用户页）
    var $saveLocalModal = $('<section>').append(_msg('preference-savelocal-popup'), $br, $('<textarea>', {
      style: 'font-size: 12px; resize: none; width: 100%; height: 10em;',
      readonly: true
    }).click(function () {
      this.select();
    }).val('/** InPageEdit Preferences **/\n' + 'window.InPageEdit = window.InPageEdit || {}; // Keep this line\n' + 'InPageEdit.myPreference = ' + JSON.stringify($modalContent.data(), null, 2)));
    ssi_modal.dialog({
      className: 'in-page-edit',
      center: true,
      title: _msg('preference-savelocal-popup-title'),
      content: $saveLocalModal,
      okBtn: {
        className: 'btn btn-primary btn-single',
        label: _msg('ok')
      }
    });
  })), $('<section>', {
    id: 'about'
  }).append($('<h3>', {
    text: _msg('preference-about-label')
  }), $('<div>', {
    style: 'font-size: 12px; font-style: italic;'
  }).html(function () {
    var isCanary = /(alpha|beta|pre)/i.test(version);
    var html = 'v' + version;
    html += isCanary ? ' - You are running the Canary version of InPageEdit<br>' + _msg('version-notice-canary') : '';
    return html;
  }), $('<button>', {
    class: 'btn btn-secondary btn-single',
    onclick: 'InPageEdit.about()',
    text: _msg('preference-aboutAndHelp')
  }), $('<button>', {
    class: 'btn btn-secondary btn-single',
    style: 'margin-top: .5em;',
    onclick: 'InPageEdit.versionInfo()',
    text: _msg('preference-updatelog')
  }), $('<a>', {
    href: 'https://ipe.miraheze.org/wiki/',
    target: '_blank',
    style: 'margin-top: .5em; display: block;'
  }).append($('<button>', {
    class: 'btn btn-secondary btn-single',
    text: _msg('preference-translate')
  })), $('<a>', {
    href: 'https://discord.gg/VUVAh8w',
    target: '_blank',
    style: 'margin-top: .5em; display: block;'
  }).append($('<button>', {
    class: 'btn btn-secondary btn-single',
    text: _msg('preference-discord')
  })), $hr, $('<p>', {
    text: 'InPageEdit is a useful MediaWiki JavaScript Plugin written with jQuery'
  }), $('<p>').append('© InPageEdit Copyright (C)', ' 2019 - ' + new Date().getFullYear(), ' Wjghj Project (机智的小鱼君), ', $('<a>', {
    href: 'https://www.gnu.org/licenses/gpl-3.0-standalone.html',
    text: 'GNU General Public License 3.0'
  }))));
  var $modalContent = $('<div>', {
    class: 'preference-tabber'
  }).append($tabList, $tabContent); // 绑定tab-list按钮事件

  $tabList.find('a').click(function (e) {
    e.preventDefault();
    var $this = $(this);
    var tab = $this.attr('href');

    if (tab) {
      $tabList.find('a').removeClass('active');
      $tabContent.find('section').removeClass('active');
      $this.addClass('active');
      $tabContent.find('' + tab).addClass('active');
    }
  }); // 设定input状态
  // ...
  // 绑定input事件

  $tabContent.find('input').change(function () {
    var $this = $(this);
    var key = $this.attr('id');
    var val;

    if ($this.prop('type') === 'checkbox') {
      val = $this.prop('checked');
    } else {
      val = $this.val();
    }

    $modalContent.data(key, val);
    console.log('[InPageEdit] Preset preference', $modalContent.data());
  }); // 预先选中第一个tab

  $tabList.find('a:first').addClass('active');
  $tabContent.find('section:first').addClass('active'); // 显示模态框

  ssi_modal.show({
    sizeClass: 'dialog',
    className: 'in-page-edit ipe-preference',
    outSideClose: false,
    title: _msg('preference-title') + ' - ' + version,
    content: $modalContent,
    buttons: [{
      label: _msg('preference-reset'),
      className: 'btn btn-danger',
      method: function (a, modal) {
        ssi_modal.confirm({
          title: _msg('preference-reset-confirm-title'),
          content: _msg('preference-reset-confirm'),
          className: 'in-page-edit',
          center: true,
          okBtn: {
            label: _msg('ok'),
            className: 'btn btn-danger'
          },
          cancelBtn: {
            label: _msg('cancel'),
            className: 'btn'
          }
        }, res => {
          if (res) {
            preference.set(defaultSettings);
            modal.close();
          } else {
            return false;
          }
        });
      }
    }, {
      label: _msg('preference-save'),
      className: 'btn btn-primary',
      method: function (a, modal) {
        preference.set($modalContent.data()); // console.info('[InPageEdit] Set preference', $modalContent.data())

        modal.close();
      }
    }],

    onShow($modal) {
      var $modalWindow = $('#' + $modal.modalId);
      mw.hook('InPageEdit.preference.modal').fire({
        $modal,
        $modalWindow
      }); // 如果在本地有设定存档，disable掉全部input

      function setDisabled(obj, isArr) {
        $.each(obj, (key, val) => {
          if (typeof val === 'object') {
            setDisabled(val, true);
          } else if (isArr) {
            // document.getElementById(val).disabled = true
            $modalWindow.find(`[id="${val}"]`).attr('disabled', true);
          } else {
            // document.getElementById(key).disabled = true
            $modalWindow.find(`[id="${key}"]`).attr('disabled', true);
          }
        });
      }

      if (typeof InPageEdit.myPreference !== 'undefined') {
        // $modalWindow.find('.ssi-modalBtn.btn').attr({ disabled: true })
        setDisabled(InPageEdit.myPreference);
        $tabList.before($('<div>', {
          class: 'has-local-warn',
          style: 'padding-left: 8px; border-left: 6px solid orange; font-size: small;',
          html: _msg('preference-savelocal-popup-haslocal')
        }));
      } // 将现有设定反映到选项中


      $.each(local, (key, val) => {
        if (key === 'plugins') {
          $modalContent.data(key, val);
          return;
        }

        var $input = $tabContent.find('#' + key);

        if ($input.length > 0) {
          $modalContent.data(key, val);

          if (typeof val === 'string') {
            $input.val(val);
          }

          if (typeof val === 'boolean') {
            $input.prop('checked', val);
          }
        }
      }); // 获取插件列表

      var usedPlugin = preference.get('plugins');
      var pluginCache = pluginStore.loadCache();

      if (pluginCache) {
        showPluginList(pluginCache);
      } else {
        pluginStore.get().then(list => {
          pluginStore.saveCache(list);
          showPluginList(list);
        });
      }

      function showPluginList(list) {
        $tabContent.find('#plugin-container').html($('<ul>'));
        $.each(list, (key, val) => {
          var name = val.name || 'Unknown';
          var description = val.description || '';
          var author = val.author ? $('<a>', {
            href: 'https://gtihub.com/' + val.author,
            target: '_balnk',
            text: '@' + val.author
          }) : '-';
          $tabContent.find('#plugin-container > ul').append($('<li>').append($('<label>').append($('<input>', {
            class: 'plugin-checkbox',
            id: key,
            type: 'checkbox',
            checked: Boolean(usedPlugin.indexOf(key) >= 0 || val._force === true),
            // 勾选当前正在使用以及强制启用的插件
            disabled: typeof InPageEdit.myPreference !== 'undefined' || val._force === true // 强制启用或者本地保存设定时禁止改变

          }).change(function () {
            // 当插件选择框变化时，暂存设定档
            var $this = $(this);
            var checked = $this.prop('checked');
            var original = $modalContent.data('plugins');
            var index = original.indexOf(key); // 勾选且暂未启用

            if (checked && index < 0) {
              original.push(key);
            } // 取消勾选且已启用


            if (!checked && index >= 0) {
              original.splice(index, 1);
            } // 暂存


            $modalContent.data('plugins', original);
          }), $('<span>'), // checkbox框框
          $('<div>', {
            class: 'plugin-name',
            text: name
          }), $('<div>', {
            class: 'plugin-author',
            html: author
          }), $('<div>', {
            class: 'plugin-description',
            text: description
          }))));
        });
      } // 获取Analysis数据


      var userName = config.wgUserName;
      $.get('https://api.wjghj.cn/inpageedit/query/wiki', {
        url: config.wgServer + config.wgArticlePath.replace('$1', ''),
        prop: 'users.' + userName + '._total|users.' + userName + '.functions'
      }).then(ret => {
        $tabContent.find('#analysis-container #analysis-loading').hide();
        var data = ret.query[0].users[userName];
        var total = data._total;
        var functionData = data.functions;
        var functionList = $('<table>', {
          class: 'wikitable',
          style: 'width: 96%'
        }).append($('<tr>').append($('<th>', {
          text: 'ID'
        }), $('<th>', {
          text: 'Times'
        }), $('<th>', {
          text: 'Percents'
        })));
        $.each(functionData, (key, val) => {
          functionList.append($('<tr>').append($('<th>', {
            text: key
          }), $('<td>', {
            text: val
          }), $('<td>', {
            text: (val / total * 100).toFixed(2) + '%'
          })));
        });
        $tabContent.find('#analysis-container').append($('<h4>', {
          text: config.wgUserName + ' - ' + config.wgSiteName
        }), $('<p>').append(_msg('preference-analysis-totaluse', total)), functionList);
      });
    }

  });
};

var preference = {
  default: defaultSettings,
  defaultSettings,
  set,
  get,
  modal
};
module.exports = {
  preference
};

/***/ }),

/***/ "./module/progress.js":
/*!****************************!*\
  !*** ./module/progress.js ***!
  \****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const {
  $progress
} = __webpack_require__(/*! ./_elements.js */ "./module/_elements.js");
/**
 * @module progress 载入中模块
 * @param {Boolean|String} title
 * @default "Loading..."
 * @returns
 * - true: Mark top progress box as done
 * - false: Close top progress box
 * - String: Show new progress box with title
 */


var progress = function (title) {
  if (title === true) {
    $('.in-page-edit.loadingbox .ssi-modalTitle').html(_msg('done'));
    $('.in-page-edit.loadingbox .ipe-progress').addClass('done');
  } else if (title === false) {
    if ($('.in-page-edit.loadingbox').length > 0) {
      $('.in-page-edit.loadingbox').appendTo('body');
      ssi_modal.close();
    }
  } else {
    if ($('.in-page-edit.loadingbox').length > 0) return;

    if (typeof title === 'undefined') {
      title = 'Loading...';
    }

    ssi_modal.show({
      title: title,
      content: $progress,
      className: 'in-page-edit loadingbox',
      center: true,
      sizeClass: 'dialog',
      closeIcon: false,
      outSideClose: false
    });
  }
};

module.exports = {
  progress
};

/***/ }),

/***/ "./module/quickDelete.js":
/*!*******************************!*\
  !*** ./module/quickDelete.js ***!
  \*******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var mwApi = new mw.Api();
var config = mw.config.get();

const {
  _analysis
} = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const {
  _hasRight
} = __webpack_require__(/*! ./_hasRight */ "./module/_hasRight.js");

const {
  $br
} = __webpack_require__(/*! ./_elements */ "./module/_elements.js");
/**
 * @module quickDelete 删除页面模块
 * @param {String} page
 */


var quickDelete = function (page, givenReason = '') {
  mw.hook('InPageEdit.quickDelete').fire();
  console.log('Quick delete', page, givenReason);
  var reason;
  page = page || config.wgPageName;
  ssi_modal.show({
    outSideClose: false,
    className: 'in-page-edit quick-delete',
    center: true,
    sizeClass: 'dialog',
    title: _msg('delete-title'),
    content: $('<div>').append($('<section>', {
      id: 'InPageEditDeletepage'
    }).append($('<span>', {
      html: _msg('delete-reason', '<b>' + page.replace(/_/g, ' ') + '</b>')
    }), $br, $('<label>', {
      for: 'delete-reason',
      text: _msg('editSummary')
    }), $('<input>', {
      id: 'delete-reason',
      style: 'width:96%',
      onclick: "$(this).css('box-shadow', '')",
      value: givenReason
    }))),
    beforeShow: function () {
      if (!_hasRight('delete')) {
        ssi_modal.dialog({
          title: _msg('notify-no-right'),
          content: _msg('delete-no-right'),
          className: 'in-page-edit quick-deletepage',
          center: true,
          okBtn: {
            className: 'btn btn-primary btn-single'
          }
        });
        return false;
      }
    },
    buttons: [{
      label: _msg('cancel'),
      className: 'btn btn-primary',
      method: function (e, modal) {
        modal.close();
      }
    }, {
      label: _msg('confirm'),
      className: 'btn btn-danger',
      method: function (e, modal) {
        reason = $('#InPageEditDeletepage #delete-reason').val();

        if (reason === '') {
          $('#InPageEditDeletepage #delete-reason').css('box-shadow', '0 0 4px #f00');
          return;
        }

        _analysis('quick_delete');

        ssi_modal.confirm({
          center: true,
          className: 'in-page-edit',
          title: _msg('delete-confirm-title'),
          content: _msg('delete-confirm-content'),
          okBtn: {
            label: _msg('confirm'),
            className: 'btn btn-danger'
          },
          cancelBtn: {
            label: _msg('cancel'),
            className: 'btn'
          }
        }, function (result) {
          if (result) {
            reason = _msg('delete-title') + ' (' + reason + ')';
            mwApi.postWithToken('csrf', {
              action: 'delete',
              title: page,
              reason: reason,
              format: 'json'
            }).then(() => {
              ssi_modal.notify('success', {
                className: 'in-page-edit',
                title: _msg('notify-success'),
                content: _msg('notify-delete-success', page)
              });
            }).fail(function (errorCode, feedback, errorThrown) {
              ssi_modal.notify('error', {
                className: 'in-page-edit',
                title: _msg('notify-error'),
                content: _msg('notify-delete-error') + ': <br/><span style="font-size:amall">' + errorThrown.error['*'] + '(<code>' + errorThrown.error['code'] + '</code>)</span>'
              });
            });
            modal.close();
          } else {
            return false;
          }
        });
      }
    }]
  });
};

module.exports = {
  quickDelete
};

/***/ }),

/***/ "./module/quickDiff.js":
/*!*****************************!*\
  !*** ./module/quickDiff.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var mwApi = new mw.Api();
var config = mw.config.get();

const {
  _analysis
} = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const {
  $br,
  $progress
} = __webpack_require__(/*! ./_elements */ "./module/_elements.js");
/**
 * @module quickDiff 快速页面差异模块
 * @param {Object} param standard MediaWiki API params
 */


var quickDiff = function (param) {
  mw.hook('InPageEdit.quickDiff').fire();

  _analysis('quick_diff');

  if ($('[href*="mediawiki.diff.styles"]').length < 1) {
    mw.loader.load(mw.util.wikiScript('load') + '?modules=mediawiki.legacy.shared|mediawiki.diff.styles&only=styles', 'text/css');
  }

  var $modalTitle, $diffArea, $loading;

  if ($('.quick-diff').length > 0) {
    console.info('[InPageEdit] Quick diff 正在加载新内容');
    $modalTitle = $('.quick-diff .pageName');
    $diffArea = $('.quick-diff .diffArea');
    $loading = $('.quick-diff .ipe-progress');
    $modalTitle.text(_msg('diff-loading'));
    $diffArea.hide();
    $('.quick-diff').appendTo('body');
  } else {
    $modalTitle = $('<span>', {
      class: 'pageName',
      text: _msg('diff-loading')
    });
    $diffArea = $('<div>', {
      class: 'diffArea',
      style: 'display: none'
    });
    $loading = $($progress);
    ssi_modal.show({
      className: 'in-page-edit quick-diff',
      sizeClass: 'large',
      fixedHeight: true,
      fitScreen: true,
      title: $modalTitle,
      content: $('<div>').append($loading, $diffArea),
      buttons: [{
        label: _msg('diff-button-todiffpage'),
        className: 'btn btn-secondary toDiffPage'
      }]
    });
  }

  $loading.show().css('margin-top', $('.quick-diff .ssi-modalContent').height() / 2);
  $('.quick-diff .toDiffPage').unbind();
  param.action = 'compare';
  param.prop = 'diff|diffsize|rel|ids|title|user|comment|parsedcomment|size';
  param.format = 'json';

  if (param.totext) {
    param.topst = true;
  } else if (param.fromtext) {
    param.frompst = true;
  }

  mwApi.post(param).done(function (data) {
    var diffTable = data.compare['*'];
    var toTitle;
    $loading.hide();

    if (param.pageName === undefined) {
      toTitle = data.compare.totitle;
    } else {
      toTitle = param.pageName;
    }

    function userLink(user) {
      return '<a class="diff-user" href="' + mw.util.getUrl('User:' + user) + '">' + user + '</a> (<a href="' + mw.util.getUrl('User_talk:' + user) + '">' + _msg('diff-usertalk') + '</a> | <a href="' + mw.util.getUrl('Special:Contributions/' + user) + '">' + _msg('diff-usercontrib') + '</a> | <a href="' + mw.util.getUrl('Special:Block/' + user) + '">' + _msg('diff-userblock') + '</a>)';
    }

    $modalTitle.html(_msg('diff-title') + ': <u>' + toTitle + '</u>');
    $diffArea.show().html('').append($('<table>', {
      class: 'diff difftable'
    }).append($('<colgroup>').append($('<col>', {
      class: 'diff-marker'
    }), $('<col>', {
      class: 'diff-content'
    }), $('<col>', {
      class: 'diff-marker'
    }), $('<col>', {
      class: 'diff-content'
    })), $('<tbody>').append($('<tr>').append($('<td>', {
      colspan: 2,
      class: 'diff-otitle'
    }).append($('<a>', {
      href: config.wgScript + '?oldid=' + data.compare.fromrevid,
      text: data.compare.fromtitle
    }), ' (', $('<span>', {
      class: 'diff-version',
      text: _msg('diff-version') + data.compare.fromrevid
    }), ') (', $('<a>', {
      class: 'editLink',
      href: config.wgScript + '?action=edit&title=' + data.compare.fromtitle + '&oldid=' + data.compare.fromrevid,
      text: _msg('diff-edit')
    }), ')', $br, userLink(data.compare.fromuser), $br, ' (', $('<span>', {
      class: 'diff-comment',
      html: data.compare.fromparsedcomment
    }), ') ', $br, $('<a>', {
      class: 'prevVersion ipe-analysis-quick_diff_modalclick',
      href: 'javascript:void(0);',
      text: '←' + _msg('diff-prev')
    }).click(() => {
      quickDiff({
        fromrev: data.compare.fromrevid,
        torelative: 'prev'
      });
    })), $('<td>', {
      colspan: 2,
      class: 'diff-ntitle'
    }).append($('<a>', {
      href: config.wgScript + '?oldid=' + data.compare.torevid,
      text: data.compare.totitle
    }), ' (', $('<span>', {
      class: 'diff-version',
      text: _msg('diff-version') + data.compare.torevid
    }), ') (', $('<a>', {
      class: 'editLink',
      href: config.wgScript + '?action=edit&title=' + data.compare.totitle + '&oldid=' + data.compare.torevid,
      text: _msg('diff-edit')
    }), ')', $br, userLink(data.compare.touser), $br, ' (', $('<span>', {
      class: 'diff-comment',
      html: data.compare.toparsedcomment
    }), ') ', $br, $('<a>', {
      class: 'nextVersion ipe-analysis-quick_diff_modalclick',
      href: 'javascript:void(0);',
      text: _msg('diff-nextv') + '→'
    }).click(() => {
      _analysis('quick_diff_modalclick');

      quickDiff({
        fromrev: data.compare.torevid,
        torelative: 'next'
      });
    }))), diffTable, $('<tr>', {
      class: 'diffSize',
      style: 'text-align: center'
    }).append($('<td>', {
      colspan: '2',
      text: data.compare.fromsize + _msg('diff-bytes')
    }), $('<td>', {
      colspan: '2',
      text: data.compare.tosize + _msg('diff-bytes')
    })))));
    $('.quick-diff button.toDiffPage').click(function () {
      location.href = config.wgScript + '?oldid=' + data.compare.fromrevid + '&diff=' + data.compare.torevid;
    });

    __webpack_require__(/*! ./articleLink */ "./module/articleLink.js").articleLink($('.quick-diff .editLink'));

    if (param.isPreview === true) {
      $('.quick-diff button.toDiffPage').hide();
      $diffArea.find('.diff-otitle').html('<b>' + _msg('diff-title-original-content') + '</b>');
      $diffArea.find('.diff-ntitle').html('<b>' + _msg('diff-title-your-content') + '</b>');
    }

    if (data.compare.fromsize === undefined || data.compare.tosize === undefined) {
      $diffArea.find('.diffSize').hide();
    } // 无上一版本或下一版本


    if (data.compare.fromrevid === undefined && param.isPreview !== true) {
      $diffArea.find('.diff-otitle').html('<span class="noPrevVerson">' + data.warnings.compare['*'] + '</span>');
    } else if (data.compare.torevid === undefined && param.isPreview !== true) {
      $diffArea.find('.diff-ntitle').html('<span class="noNextVerson">' + data.warnings.compare['*'] + '</span>');
    } // GitHub@issue#5 修复被隐藏版本的问题


    if (data.compare.fromtexthidden !== undefined) {
      $diffArea.find('.diff-otitle .diff-version').addClass('diff-hidden-history');
    }

    if (data.compare.totexthidden !== undefined) {
      $diffArea.find('.diff-ntitle .diff-version').addClass('diff-hidden-history');
    }

    if (data.compare.fromuserhidden !== undefined) {
      $diffArea.find('.diff-otitle .diff-user').addClass('diff-hidden-history');
    }

    if (data.compare.touserhidden !== undefined) {
      $diffArea.find('.diff-ntitle .diff-user').addClass('diff-hidden-history');
    }

    if (data.compare.fromcommenthidden !== undefined) {
      $diffArea.find('.diff-comment').addClass('diff-hidden-history');
    }

    if (data.compare.tocommenthidden !== undefined) {
      $diffArea.find('.diff-ntitle .diff-comment').addClass('diff-hidden-history');
    }

    if (data.error) {
      console.warn('[InPageEdit] 快速差异获取时系统告知出现问题');
      $diffArea.html(_msg('diff-error') + ': ' + data.error.info + '(<code>' + data.error.code + '</code>)');
    }
  }).fail(function (errorCode, errorThrown) {
    console.warn('[InPageEdit] 快速差异获取失败');
    $loading.hide();

    if (errorThrown.error && errorThrown.error.info && errorThrown.error.code) {
      $diffArea.show().html(_msg('diff-error') + ': ' + errorThrown.error.info + '(<code>' + errorThrown.error.code + '</code>)');
    } else {
      $diffArea.show().html(_msg('diff-error'));
    }
  });
};

module.exports = {
  quickDiff
};

/***/ }),

/***/ "./module/quickEdit.js":
/*!*****************************!*\
  !*** ./module/quickEdit.js ***!
  \*****************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var mwApi = new mw.Api();
var config = mw.config.get();

const {
  _analysis
} = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const {
  _hasRight
} = __webpack_require__(/*! ./_hasRight */ "./module/_hasRight.js");

const {
  $br,
  $progress
} = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

const {
  findAndReplace
} = __webpack_require__(/*! ./findAndReplace */ "./module/findAndReplace.js");

const {
  preference
} = __webpack_require__(/*! ./preference */ "./module/preference.js");

const {
  progress
} = __webpack_require__(/*! ./progress */ "./module/progress.js");

const {
  quickPreview
} = __webpack_require__(/*! ./quickPreview */ "./module/quickPreview.js");

const {
  quickDiff
} = __webpack_require__(/*! ./quickDiff */ "./module/quickDiff.js");
/**
 * @module quickEdit 快速编辑模块
 *
 * @param {Object} options
 * @param {String} options.page edit page (default: wgPageName)
 * @param {Number} options.revision page rev ID
 * @param {Number} options.section edit section
 * @param {Boolean} options.reload if reload page after save successful (default: true)
 */


var quickEdit = function (options) {
  /** 获取设定信息，设置缺省值 **/
  options = options || {};

  if (typeof options === 'string') {
    options = {
      page: options || config.wgPageName
    };
  }

  var defaultOptions = {
    page: config.wgPageName,
    pageId: -1,
    revision: null,
    summaryRevision: '',
    section: null,
    editText: '',
    editMinor: false,
    editSummary: _msg('preference-summary-default'),
    editNotice: '',
    outSideClose: true,
    jsonGet: {
      action: 'parse',
      page: options.page || config.wgPageName,
      prop: 'wikitext|langlinks|categories|templates|images|sections',
      format: 'json'
    },
    jsonPost: {},
    pageDetail: {},
    jumpTo: '',
    reload: true
  };
  /** 获取用户设置 **/

  var userPreference = preference.get();
  /** 缓存时间戳 **/

  var date = new Date(),
      timestamp = date.getTime(),
      now = date.toUTCString();
  /** 将选项合并并标准化 **/

  options = $.extend({}, defaultOptions, options, userPreference);
  options.page = decodeURI(options.page); // 解码网址 Unicode

  _analysis('quick_edit');

  if (options.revision && options.revision !== config.wgCurRevisionId) {
    ssi_modal.notify('warning', {
      className: 'in-page-edit',
      content: _msg('notify-editing-history'),
      title: _msg('notify-info')
    });
    delete options.jsonGet.page;
    options.jsonGet.oldid = options.revision;
    options.summaryRevision = '(' + _msg('editor-summary-rivision') + '[[Special:Diff/' + options.revision + ']])';
  }

  if (options.section) {
    options.jsonGet.section = options.section;
  } // 模态框内部


  var $modalTitle = $('<span>').append(_msg('editor-title-editing') + ': <u class="editPage">' + options.page.replace(/_/g, ' ') + '</u>');
  var $editTools = $('<div>', {
    class: 'editTools'
  }).append($('<div>', {
    class: 'btnGroup'
  }).append($('<div>', {
    class: 'toolSelect'
  }).append($('<div>', {
    class: 'label',
    text: _msg('editor-edittool-header')
  }), $('<ul>', {
    class: 'ul-list'
  }).append($('<li>', {
    class: 'editToolBtn',
    'data-open': '\n== ',
    'data-middle': _msg('editor-edittool-header-text'),
    'data-close': ' ==\n',
    text: 'H2'
  }), $('<li>', {
    class: 'editToolBtn',
    'data-open': '\n=== ',
    'data-middle': _msg('editor-edittool-header-text'),
    'data-close': ' ===\n',
    text: 'H3'
  }), $('<li>', {
    class: 'editToolBtn',
    'data-open': '\n==== ',
    'data-middle': _msg('editor-edittool-header-text'),
    'data-close': ' ====\n',
    text: 'H4'
  }), $('<li>', {
    class: 'editToolBtn',
    'data-open': '\n===== ',
    'data-middle': _msg('editor-edittool-header-text'),
    'data-close': ' =====\n',
    text: 'H5'
  })))), $('<div>', {
    class: 'btnGroup'
  }).append($('<span>', {
    class: 'label',
    text: '格式'
  }), $('<button>', {
    class: 'editToolBtn fa fa-bold btn',
    'data-open': "'''",
    'data-middle': _msg('editor-edittool-bold'),
    'data-close': "'''"
  }), $('<button>', {
    class: 'editToolBtn fa fa-italic btn',
    'data-open': "''",
    'data-middle': _msg('editor-edittool-italic'),
    'data-close': "''"
  }), $('<button>', {
    class: 'editToolBtn fa fa-list-ul btn',
    'data-open': '\n* ',
    'data-middle': _msg('editor-edittool-list-bulleted'),
    'data-close': '\n'
  }), $('<button>', {
    class: 'editToolBtn fa fa-list-ol btn',
    'data-open': '\n# ',
    'data-middle': _msg('editor-edittool-list-numbered'),
    'data-close': '\n'
  }), $('<button>', {
    class: 'editToolBtn fa fa-won btn',
    'data-open': '<' + 'nowiki>',
    'data-middle': _msg('editor-edittool-nowiki'),
    'data-close': '</nowiki>'
  }), $('<button>', {
    class: 'editToolBtn fa fa-level-down fa-rotate-90 btn',
    'data-open': '<br>\n',
    'data-middle': '',
    'data-close': ''
  })), $('<div>', {
    class: 'btnGroup'
  }).append($('<span>', {
    class: 'label',
    text: '插入'
  }), $('<button>', {
    class: 'editToolBtn fa fa-link btn',
    'data-open': '[' + '[',
    'data-middle': _msg('editor-edittool-internal-link'),
    'data-close': ']]'
  }), $('<button>', {
    class: 'editToolBtn fa fa-file-image-o btn',
    'data-open': '[' + '[File:',
    'data-middle': 'Example.png',
    'data-close': '|thumb]]'
  }), $('<button>', {
    class: 'editToolBtn btn',
    'data-open': '\n<' + 'gallery>\n',
    'data-middle': 'Example1.jpg|Description\nExample2.png|Description',
    'data-close': '\n</gallery>\n',
    html: '<span class="fa-stack"><i class="fa fa-picture-o fa-stack-1x"></i><i class="fa fa-picture-o fa-stack-1x" style="left: 2px;top: 2px;text-shadow: 1px 1px 0 #fff;"></i></span>'
  })), $('<div>', {
    class: 'btnGroup extra',
    style: 'display: none'
  }).append($('<span>', {
    class: 'label',
    text: '自定义'
  })), $('<div>', {
    class: 'btnGroup special-tools',
    style: 'float: right'
  }).append($('<button>', {
    class: 'btn fa fa-search'
  }).click(function () {
    findAndReplace($editArea);
  })));
  var $editArea = $('<textarea>', {
    class: 'editArea',
    style: 'margin-top: 0;'
  });
  var $optionsLabel = $('<div>', {
    class: 'editOptionsLabel hideBeforeLoaded'
  }).append($('<aside>', {
    class: 'detailArea'
  }).append($('<label>', {
    class: 'detailToggle',
    text: _msg('editor-detail-button-toggle')
  }), $('<div>', {
    class: 'detailBtnGroup'
  }).append($('<a>', {
    href: 'javascript:;',
    class: 'detailBtn',
    id: 'showTemplates',
    text: _msg('editor-detail-button-templates')
  }), ' | ', $('<a>', {
    href: 'javascript:;',
    class: 'detailBtn',
    id: 'showImages',
    text: _msg('editor-detail-button-images')
  }))), // 摘要&小编辑
  $('<label>', {
    for: 'editSummary',
    text: _msg('editSummary')
  }), $br, $('<input>', {
    class: 'editSummary',
    id: 'editSummary',
    placeholder: 'Edit via InPageEdit~',
    value: options.editSummary.replace(/\$oldid/gi, options.summaryRevision)
  }), $br, $('<label>').append($('<input>', {
    type: 'checkbox',
    class: 'editMinor',
    id: 'editMinor',
    checked: options.editMinor
  }), $('<span>', {
    text: _msg('markAsMinor')
  })), $br, $('<label>').append($('<input>', {
    type: 'checkbox',
    class: 'reloadPage',
    id: 'reloadPage',
    checked: options.reload
  }), $('<span>', {
    text: _msg('editor-reload-page')
  })));
  var $modalContent = $('<div>').append($progress, $('<section>', {
    class: 'hideBeforeLoaded'
  }).append( // 编辑工具条
  $editTools, // 编辑框
  $editArea)); // Debug

  console.time('[InPageEdit] 获取页面源代码');
  console.info('[InPageEdit] QuickEdit start with options:');
  console.table(options); // 显示主窗口

  ssi_modal.show({
    title: $modalTitle,
    content: $modalContent,
    outSideClose: options.outSideClose,
    className: 'in-page-edit ipe-editor timestamp-' + timestamp,
    sizeClass: 'large',

    /* 按钮 */
    buttons: [{
      side: 'left',
      label: _msg('editor-button-save'),
      className: 'btn btn-primary leftBtn hideBeforeLoaded save-btn',

      method(e, modal) {
        ssi_modal.confirm({
          className: 'in-page-edit',
          center: true,
          content: _msg('editor-confirm-save'),
          okBtn: {
            className: 'btn btn-primary',
            label: _msg('confirm')
          },
          cancelBtn: {
            className: 'btn btn-secondary',
            label: _msg('cancel')
          }
        }, function (result) {
          if (result) {
            var text = $editArea.val(),
                minor = $optionsLabel.find('.editMinor').prop('checked'),
                section = options.section,
                summary = $optionsLabel.find('.editSummary').val();
            postArticle({
              text: text,
              page: options.page,
              minor: minor,
              section: section,
              summary: summary
            }, modal);
          }
        });
      }

    }, {
      side: 'left',
      label: _msg('editor-button-preview'),
      className: 'btn btn-secondary leftBtn hideBeforeLoaded',

      method() {
        _analysis('preview_edit');

        var text = $editArea.val();
        quickPreview({
          title: options.page,
          text: text,
          pst: true
        });
      }

    }, {
      side: 'left',
      label: _msg('editor-button-diff'),
      className: 'btn btn-secondary leftBtn hideBeforeLoaded diff-btn'
    }, {
      label: _msg('cancel'),
      className: 'btn btn-danger',

      method(e, modal) {
        modal.close();
      }

    }],

    /* 预加载 */
    beforeShow($modal) {
      var $modalWindow = $('#' + $modal.modalId); // 设置样式

      $modalWindow.find('.hideBeforeLoaded').hide();
      $modalContent.find('.ipe-progress').css('margin', Number($(window).height() / 3 - 50) + 'px 0');
      $editArea.css('height', $(window).height() / 3 * 2 - 100);
      $modalWindow.find('.ssi-buttons').prepend($optionsLabel);
      $modalWindow.find('.ssi-modalTitle').append($('<a>', {
        class: 'showEditNotice',
        href: 'javascript:void(0);',
        html: '<i class="fa fa-info-circle"></i> ' + _msg('editor-has-editNotice'),
        style: 'display: none;'
      }).click(function () {
        ssi_modal.show({
          className: 'in-page-edit',
          center: true,
          title: _msg('editor-title-editNotice'),
          content: '<section class="editNotice">' + $modalContent.data('editNotice') + '</section>'
        });
      }));
      /** Edit-Tool 扩展 **/

      function insertText(strings, obj) {
        var textarea = obj || $editArea[0],
            start = textarea.selectionStart,
            stop = textarea.selectionEnd,
            selectedText = textarea.value.slice(start, stop);
        textarea.value = textarea.value.slice(0, start) + (strings.open || '') + (selectedText || strings.middle || '') + (strings.close || '') + textarea.value.slice(stop);
        var selectStart = start + (strings.open.length || 0);
        textarea.setSelectionRange(selectStart, selectStart + (selectedText.length || strings.middle.length || 0));
        textarea.focus();
      } // 添加按钮


      function addBtn(open, middle, close, icon) {
        open = open || '';
        middle = middle || '';
        close = close || '';
        icon = 'fa-' + icon || 0;
        $modalContent.find('.btnGroup.extra').append($('<button>', {
          class: 'editToolBtn btn',
          'data-open': open,
          'data-middle': middle,
          'data-close': close,
          html: `<i class="fa ${icon}"></i>`
        }));
      } // 用户自定义按钮


      if (InPageEdit.buttons) {
        var btns = InPageEdit.buttons;
        $editTools.find('.btnGroup.extra').show();

        for (var i = 0; i < btns.length; i++) {
          var btn = btns[i];
          addBtn(btn.open, btn.middle, btn.close, btn.text);
        }
      }

      $editTools.find('.editToolBtn').click(function (e) {
        e.preventDefault();
        var $this = $(this),
            $open = $this.attr('data-open') || '',
            $middle = $this.attr('data-middle') || '',
            $close = $this.attr('data-close') || '';
        insertText({
          open: $open,
          middle: $middle,
          close: $close
        }, $editArea[0]);
      });
    },

    /**
     * @event onShow
     * @description 模态框显示后
     */
    onShow($modal) {
      var $modalWindow = $('#' + $modal.modalId);
      mw.hook('InPageEdit.quickEdit').fire({
        $modal,
        $modalWindow,
        $modalTitle,
        $modalContent,
        $editArea,
        $editTools,
        $optionsLabel
      }); // 绑定事件，在尝试离开页面时提示

      $editArea.change(function () {
        $(this).attr('data-modifiled', 'true');
        $(window).bind('beforeunload', function () {
          return _msg('window-leave-confirm');
        });
      }); // 获取权限

      if (!_hasRight('edit')) {
        ssi_modal.notify('dialog', {
          className: 'in-page-edit',
          position: 'center bottom',
          title: _msg('notify-no-right'),
          content: _msg('editor-no-right'),
          okBtn: {
            label: _msg('ok'),
            className: 'btn btn-primary',

            method(e, modal) {
              modal.close();
            }

          }
        });
        $modalWindow.find('.save-btn').addClass('btn-danger');
      } // 解析页面内容


      mwApi.get(options.jsonGet).done(function (data) {
        console.timeEnd('[InPageEdit] 获取页面源代码');
        contentDone(data);
      }).fail(function (a, b, errorThrown) {
        console.timeEnd('[InPageEdit] 获取页面源代码');
        console.warn('[InPageEdit]警告：无法获取页面内容');
        var data = errorThrown;
        contentDone(data);
      }); // 页面内容获取完毕，后续工作

      function contentDone(data) {
        options.pageDetail = data;

        if (data.error) {
          console.warn('[InPageEdit]警告：无法获取页面内容');
          options.editText = '<!-- ' + data.error.info + ' -->';
          options.pageId = -1;
          $optionsLabel.find('.detailArea').hide();
        } else {
          options.editText = data.parse.wikitext['*'];
          options.pageId = data.parse.pageid;
        } // 设定一堆子样式


        $modalContent.find('.ipe-progress').hide();
        $modalWindow.find('.hideBeforeLoaded').fadeIn(500);
        $editArea.val(options.editText + '\n');
        var summaryVal;

        if (options.section !== null) {
          summaryVal = $optionsLabel.find('.editSummary').val();
          summaryVal = summaryVal.replace(/\$section/gi, '/* ' + data.parse.sections[0].line + ' */');
          $optionsLabel.find('.editSummary').val(summaryVal);
          $modalTitle.find('.editPage').after('<span class="editSection">→' + data.parse.sections[0].line + '</span>');
          options.jumpTo = '#' + data.parse.sections[0].anchor;
        } else {
          summaryVal = $optionsLabel.find('.editSummary').val();
          summaryVal = summaryVal.replace(/\$section/gi, '');
          $optionsLabel.find('.editSummary').val(summaryVal);
          options.jumpTo = '';
        }

        if (options.revision !== null && options.revision !== '' && options.revision !== config.wgCurRevisionId) {
          $modalTitle.find('.editPage').after('<span class="editRevision">(' + _msg('editor-title-editRevision') + '：' + options.revision + ')</span>');
          $modalWindow.find('.diff-btn').click(function () {
            _analysis('quick_diff_edit');

            var text = $editArea.val();
            var diffJson = {
              fromrev: options.revision,
              totext: text,
              hideBtn: true,
              pageName: options.page,
              isPreview: true
            };

            if (options.section) {
              diffJson.fromsection = options.section;
            }

            quickDiff(diffJson);
          });
        } else {
          $modalWindow.find('.diff-btn').attr('disabled', true);
        } // 获取页面基础信息


        console.time('[InPageEdit] 获取页面基础信息');
        var queryJson = {
          action: 'query',
          prop: 'revisions|info',
          inprop: 'protection',
          format: 'json'
        };

        if (options.pageId !== -1) {
          queryJson.pageids = options.pageId;
        } else {
          queryJson.titles = options.page;
        }

        mwApi.get(queryJson).done(function (data) {
          console.info('[InPageEdit] 获取页面基础信息成功');
          console.timeEnd('[InPageEdit] 获取页面基础信息'); // 记录页面最后编辑时间，防止编辑冲突

          $modalContent.data('basetimestamp', data['query']['pages'][options.pageId].revisions ? data['query']['pages'][options.pageId]['revisions'][0]['timestamp'] : now);
          queryDone(data);
        }).fail(function (a, b, errorThrown) {
          var data = errorThrown;
          console.timeEnd('[InPageEdit] 获取页面基础信息');
          console.warn('[InPageEdit] 获取页面基础信息失败');
          $modalContent.data('basetimestamp', now);
          queryDone(data);
        });
        /** 页面保护等级和编辑提示等 **/

        function queryDone(data) {
          options.namespace = data.query.pages[options.pageId].ns; // 名字空间ID

          options.protection = data.query.pages[options.pageId]['protection'] || []; // 保护等级

          if (data.query.pages[options.pageId].revisions) {
            options.revision = data.query.pages[options.pageId]['revisions'][0]['revid']; // 版本号
          } // 使页面名标准化


          options.page = data.query.pages[options.pageId].title;
          $modalTitle.find('.editPage').text(options.page);

          if (options.revision) {
            $modalWindow.find('.diff-btn').attr('disabled', false).click(function () {
              _analysis('quick_diff_edit');

              var text = $editArea.val();
              var diffJson = {
                fromrev: options.revision,
                totext: text,
                hideBtn: true,
                pageName: options.page,
                isPreview: true
              };

              if (options.section) {
                diffJson.fromsection = options.section;
              }

              quickDiff(diffJson);
            });
          } // 页面是否被保护


          if (options.protection.length > 0) {
            for (var i = 0; i < options.protection.length; i++) {
              if (options.protection[i].type === 'edit') {
                if (options.protection[i].level === 'autoconfirmed' && !_hasRight('autoconfirmed') || options.protection[i].level === 'sysop' && !_hasRight('editprotected') || config.wgNamespaceNumber === 8 && !_hasRight('editinterface')) {
                  ssi_modal.notify('dialog', {
                    className: 'in-page-edit',
                    position: 'center bottom',
                    title: _msg('notify-no-right'),
                    content: _msg('editor-no-right'),
                    okBtn: {
                      label: _msg('ok'),
                      className: 'btn btn-primary',

                      method(e, modal) {
                        modal.close();
                      }

                    }
                  });
                  $modalWindow.find('.save-btn').addClass('btn-danger');
                }
              }
            }
          } // 获取编辑提示


          var namespaceNoticePage = 'Editnotice-' + options.namespace,
              pageNoticePage = namespaceNoticePage + '-' + options.page.replace(/_/g, ' ') // 将页面名里的 _ 转换为空格
          .replace(config.wgFormattedNamespaces[options.namespace] + ':', ''); // 去掉名字空间

          mwApi.get({
            action: 'query',
            meta: 'allmessages',
            ammessages: namespaceNoticePage + '|' + pageNoticePage
          }).done(function (data) {
            var wikitextNs = data.query.allmessages[0]['*'] || '',
                wikitextPage = data.query.allmessages[1]['*'] || '';
            if (wikitextNs === '' && wikitextPage === '') return; // 没有编辑提示
            // 将编辑提示解析为 html

            mwApi.post({
              action: 'parse',
              title: options.page,
              contentmodel: 'wikitext',
              preview: true,
              text: wikitextPage + '\n' + wikitextNs
            }).done(function (data) {
              options.editNotice = data.parse.text['*'];
              var notice = $modalContent.data('editNotice') || '';
              notice += '\n' + options.editNotice;
              $modalContent.data('editNotice', notice);
              $modalContent.find('.showEditNotice').show();
            });
          });
        }
      }
    },

    /* 确认是否取消 */
    beforeClose(modal) {
      if ($editArea.attr('data-modifiled') !== 'true') {
        close();
        return;
      } else if ($editArea.attr('data-confirmclose') === 'true') {
        closeNoReload();
        return;
      }

      ssi_modal.confirm({
        className: 'in-page-edit',
        center: true,
        content: _msg('editor-leave-confirm'),
        okBtn: {
          className: 'btn btn-danger',
          label: _msg('confirm')
        },
        cancelBtn: {
          className: 'btn btn-secondary',
          label: _msg('cancel')
        }
      }, function (result) {
        if (result === true) {
          close();
        }
      });

      function close() {
        $(window).unbind('beforeunload');
        modal.options.keepContent = false;
        modal.options.beforeClose = '';
        modal.close();
        ssi_modal.notify('info', {
          className: 'in-page-edit',
          position: 'right top',
          title: _msg('cancel'),
          content: _msg('notify-no-change')
        });
      }

      function closeNoReload() {
        $(window).unbind('beforeunload');
        modal.options.keepContent = false;
        modal.options.beforeClose = '';
        modal.close();
      }

      return false;
    }

  }); // 页面详情模块

  $optionsLabel.find('.detailBtnGroup .detailBtn').click(function () {
    _analysis('quick_edit_pagedetail');

    var $this = $(this),
        id = $this.attr('id'),
        content = $('<ul>');

    switch (id) {
      case 'showTemplates':
        var templates = options.pageDetail.parse.templates,
            templateName;

        for (let i = 0; i < templates.length; i++) {
          templateName = templates[i]['*'];
          $('<li>').append($('<a>', {
            href: mw.util.getUrl(templateName),
            target: '_blank',
            text: templateName
          }), ' (', $('<a>', {
            href: 'javascript:;',
            text: _msg('quick-edit'),
            class: 'quickEditTemplate',
            'data-template-name': templateName
          }), ')').appendTo(content);
        }

        ssi_modal.show({
          className: 'in-page-edit quick-edit-detail',
          sizeClass: 'dialog',
          title: _msg('editor-detail-title-templates'),
          content: content
        });
        break;

      case 'showImages':
        var images = options.pageDetail.parse.images,
            imageName;

        for (let i = 0; i < images.length; i++) {
          imageName = images[i];
          $('<li>').append($('<a>', {
            href: mw.util.getUrl('File:' + imageName),
            target: '_balnk',
            text: imageName
          }), ' (', $('<a>', {
            href: 'javascript:;',
            class: 'quickViewImage',
            text: _msg('editor-detail-images-quickview'),
            'data-image-name': imageName
          }), ' | ', $('<a>', {
            href: config.wgScript + '?title=Special:Upload&wpDestFile=' + imageName + '&wpForReUpload=1',
            target: '_balnk',
            text: _msg('editor-detail-images-upload')
          }), ')').appendTo(content);
        }

        ssi_modal.show({
          className: 'in-page-edit quick-edit-detail',
          sizeClass: 'dialog',
          title: _msg('editor-detail-title-images'),
          content
        });
        break;
    }

    $('.in-page-edit.quick-edit-detail .quickEditTemplate').click(function () {
      _analysis('quick_edit_pagedetail_edit_template');

      var $this = $(this);
      var page = $this.attr('data-template-name');
      quickEdit({
        page
      });
    });
    $('.in-page-edit.quick-edit-detail .quickViewImage').click(function () {
      _analysis('quick_edit_pagedetail_view_image');

      var $this = $(this);
      var imageName = $this.attr('data-image-name');
      ssi_modal.show({
        className: 'in-page-edit quick-view-image',
        center: true,
        title: imageName.replace(/_/g, ' '),
        content: $('<center>', {
          id: 'imageLayer'
        }).append($progress),
        buttons: [{
          label: _msg('editor-detail-images-upload'),
          className: 'btn btn-primary',

          method() {
            window.open(config.wgScript + '?title=Special:Upload&wpDestFile=' + imageName + '&wpForReUpload=1');
          }

        }, {
          label: _msg('close'),
          className: 'btn btn-secondary',

          method(a, modal) {
            modal.close();
          }

        }],

        onShow() {
          mwApi.get({
            action: 'query',
            format: 'json',
            prop: 'imageinfo',
            titles: 'File:' + imageName.replace(/file:/g, ''),
            iiprop: 'url'
          }).done(function (data) {
            $('.quick-view-image .ipe-progress').hide();
            $('.quick-view-image #imageLayer').append($('<img>', {
              src: data.query.pages['-1'].imageinfo[0].url,
              class: 'loading',
              style: 'max-width: 80%; max-height: 60vh'
            }));
            $('.quick-view-image #imageLayer img').load(function () {
              $(this).removeClass('loading');
            });
          });
        }

      });
    });
  }); // 发布编辑模块

  function postArticle({
    text,
    page,
    minor,
    summary,
    section
  }, modal) {
    _analysis('quick_edit_save');

    progress(_msg('editor-title-saving'));
    options.jsonPost = {
      action: 'edit',
      basetimestamp: $modalContent.data('basetimestamp'),
      starttimestamp: now,
      text,
      title: page,
      minor,
      summary,
      errorformat: 'plaintext'
    };

    if (section !== undefined && section !== '' && section !== null) {
      options.jsonPost.section = section;
      delete options.jsonPost.basetimestamp;
    }

    mwApi.postWithToken('csrf', options.jsonPost).done(saveSuccess).fail(saveError); // 保存正常

    function saveSuccess(data, feedback, errorThrown) {
      if (data.edit.result === 'Success') {
        progress(true); // 是否重载页面

        if ($optionsLabel.find('.reloadPage').prop('checked')) {
          var content;
          $(window).unbind('beforeunload');
          content = _msg('notify-save-success');
          setTimeout(function () {
            if (page === config.wgPageName) {
              window.location = mw.util.getUrl(page) + options.jumpTo;
              window.location.reload();
            } else {
              window.location.reload();
            }
          }, 500);
        } else {
          console.info('[InPageEdit] 将不会重载页面！');
          content = _msg('notify-save-success-noreload');
          setTimeout(function () {
            progress(false);
            $editArea.attr('data-confirmclose', 'true');
            modal.close();
          }, 1500);
        }

        ssi_modal.notify('success', {
          className: 'in-page-edit',
          position: 'right top',
          title: _msg('notify-success'),
          content
        });
      } else {
        saveError(data, feedback, errorThrown);
      }
    } // 保存失败


    function saveError(errorCode, feedback, errorThrown) {
      progress(false);
      var data = errorThrown || errorCode; // 规范错误代码

      var errorInfo,
          errorMore = '';

      if (data.errors !== undefined) {
        errorCode = data.errors[0].code;
        errorInfo = data.errors[0]['*'];
        errorMore = '';
      } else if (data.edit.result !== 'Success') {
        errorCode = data.edit.code || 'Unknown';
        errorInfo = data.edit.info || 'Reason unknown.';
        errorMore = data.edit.warning || '';
      } else {
        errorCode = 'unknown';
        errorInfo = 'Reason unknown.';
        errorMore = 'Please contact plug-in author or try again.';
      }

      ssi_modal.show({
        className: 'in-page-edit',
        sizeClass: 'dialog',
        center: true,
        title: _msg('editor-save-error'),
        content: errorInfo + '<hr style="clear: both" />' + errorMore
      });
      ssi_modal.notify('error', {
        className: 'in-page-edit',
        position: 'right top',
        closeAfter: {
          time: 15
        },
        title: _msg('notify-error'),
        content: _msg('editor-save-error') + '：<code>' + errorCode + '</code>'
      });
      console.error('[InPageEdit] Submit failed: \nCode: ' + errorCode);
      return;
    }
  }
};

module.exports = {
  quickEdit
};

/***/ }),

/***/ "./module/quickPreview.js":
/*!********************************!*\
  !*** ./module/quickPreview.js ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const {
  $progress
} = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

var mwApi = new mw.Api();
/**
 * @module quickPreview 快速预览文章页
 * @param params {Object}
 */

var quickPreview = function (params, modalSize = 'large', center = false) {
  var defaultOptions = {
    action: 'parse',
    preview: true,
    disableeditsection: true,
    prop: 'text',
    format: 'json'
  };
  var options = $.extend({}, defaultOptions, params);
  mw.hook('InPageEdit.quickPreview').fire();
  var timestamp = new Date().getTime();
  console.time('[InPageEdit] Request preview');
  ssi_modal.show({
    sizeClass: new RegExp(/dialog|small|smallToMedium|medium|mediumToLarge|large|full|auto/).test(modalSize) ? modalSize : 'large',
    center: Boolean(center),
    className: 'in-page-edit previewbox',
    title: _msg('preview-title'),
    content: $('<section>').append($progress, $('<div>', {
      class: 'InPageEditPreview',
      'data-timestamp': timestamp,
      style: 'display:none',
      text: _msg('preview-placeholder')
    })),
    fixedHeight: true,
    fitScreen: true,
    buttons: [{
      label: '',
      className: 'hideThisBtn'
    }],

    onShow() {
      $('.previewbox .ipe-progress').css('margin-top', $('.previewbox .ipe-progress').parent().height() / 2);
      $('.previewbox .hideThisBtn').hide();
      mwApi.post(options).then(function (data) {
        console.timeEnd('[InPageEdit] Request preview');
        var content = data.parse.text['*'];
        $('.previewbox .ipe-progress').hide(150);
        $('.InPageEditPreview[data-timestamp="' + timestamp + '"]').fadeIn(500).html(content);
      }).fail(function () {
        console.timeEnd('[InPageEdit] Request preview');
        console.warn('[InPageEdit] 预览失败');
        $('.previewbox .ipe-progress').hide(150);
        $('.InPageEditPreview[data-timestamp="' + timestamp + '"]').fadeIn(500).html(_msg('preview-error'));
      });
    }

  });
};

module.exports = {
  quickPreview
};

/***/ }),

/***/ "./module/quickRedirect.js":
/*!*********************************!*\
  !*** ./module/quickRedirect.js ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var mwApi = new mw.Api();
var config = mw.config.get();

const {
  _analysis
} = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const {
  $br,
  $progress
} = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

const {
  _resolveExists
} = __webpack_require__(/*! ./_resolveExists */ "./module/_resolveExists.js");

const {
  preference
} = __webpack_require__(/*! ./preference */ "./module/preference.js");
/**
 * @module quickRedirect 快速重定向模块
 * @param {'from'|'to'} type
 */


var quickRedirect = function (type = 'to') {
  mw.hook('InPageEdit.quickRedirect').fire();
  var text = '#REDIRECT [[:$1]]',
      question,
      target,
      json = {
    action: 'edit',
    createonly: 1,
    minor: preference.get('editMinor'),
    format: 'json',
    errorformat: 'plaintext'
  },
      summary;

  if (type === 'to') {
    json.title = config.wgPageName;
    question = _msg('redirect-question-to', '<b>' + config.wgPageName.replace(/_/g, ' ') + '</b>');
  } else if (type === 'from') {
    question = _msg('redirect-question-from', '<b>' + config.wgPageName.replace(/_/g, ' ') + '</b>');
    summary = _msg('redirect-summary') + ' → [[:' + config.wgPageName + ']]';
    json.text = text.replace('$1', config.wgPageName);
  } else {
    console.error('[InPageEdit] quickRedirect only accept "from" or "to"');
    return;
  }

  ssi_modal.show({
    outSideClose: false,
    className: 'in-page-edit quick-redirect',
    center: true,
    sizeClass: 'dialog',
    title: _msg('redirect-title'),
    content: $('<div>').append($('<section>').append($('<span>', {
      html: question
    }), $br, $('<input>', {
      id: 'redirect-page',
      style: 'width:96%'
    }).click(function () {
      $(this).css('box-shadow', '');
    }), $br, $('<label>', {
      for: 'redirect-reason',
      text: _msg('editSummary')
    }), $('<input>', {
      id: 'redirect-reason',
      style: 'width:96%'
    })), $($progress).css('display', 'none')),
    buttons: [{
      label: _msg('confirm'),
      className: 'btn btn-primary btn-single okBtn',
      method: function (a, modal) {
        target = $('.in-page-edit.quick-redirect #redirect-page').val();

        if (target === '' || target.replace(/_/g, ' ') === config.wgPageName.replace(/_/g, ' ')) {
          $('.in-page-edit.quick-redirect #redirect-page').css('box-shadow', '0 0 4px #f00');
          return;
        }

        _analysis('quick_redirect');

        if (type === 'to') {
          summary = _msg('redirect-summary') + ' → [[:' + target + ']]';
          json.text = text.replace('$1', target);
        } else if (type === 'from') {
          json.title = target;
        }

        if ($('.in-page-edit.quick-redirect #redirect-reason').val() !== '') {
          summary = summary + ' (' + $('.in-page-edit.quick-redirect #redirect-reason').val() + ')';
        }

        json.summary = summary;
        $('.in-page-edit.quick-redirect .ipe-progress').show();
        $('.in-page-edit.quick-redirect section').hide();
        $('.in-page-edit.quick-redirect .okBtn').attr('disabled', 'disabled');
        mwApi.postWithToken('csrf', json).done(successed).fail(failed); // 重定向成功

        function successed(data) {
          if (data.errors) {
            failed(data.errors[0].code, data);
            return;
          }

          $('.in-page-edit.quick-redirect .ipe-progress').addClass('done');
          ssi_modal.notify('success', {
            className: 'in-page-edit',
            content: _msg('notify-redirect-success'),
            title: _msg('notify-success')
          });

          if (type === 'to') {
            window.location.reload();
          } else {
            $('.in-page-edit.quick-redirect .ipe-progress').addClass('done');
            setTimeout(function () {
              modal.close();
            }, 2000);
          }
        } // 重定向失败


        function failed(errorCode, errorThrown) {
          $('.in-page-edit.quick-redirect .ipe-progress').hide();
          $('.in-page-edit.quick-redirect section').show();
          $('.in-page-edit.quick-redirect .okBtn').attr('disabled', false);
          $('.in-page-edit.quick-redirect .ipe-progress').addClass('done');
          ssi_modal.notify('error', {
            className: 'in-page-edit',
            content: _msg('notify-redirect-error') + '<br>' + errorThrown.errors[0]['*'] + ' (<code>' + errorCode + '</code>)',
            title: _msg('notify-error')
          }); // 如果是由于页面存在，给出解决方案

          if (errorCode === 'articleexists') {
            var fromPage, toPage;

            if (type === 'from') {
              fromPage = target;
              toPage = config.wgPageName;
            } else if (type === 'to') {
              fromPage = config.wgPageName;
              toPage = target;
            }

            _resolveExists(fromPage, {
              delete: 'Delete for redirect to [[' + toPage + ']]',
              edit: 'Modify for redirect'
            });
          }
        }
      }
    }]
  });
};

module.exports = {
  quickRedirect
};

/***/ }),

/***/ "./module/quickRename.js":
/*!*******************************!*\
  !*** ./module/quickRename.js ***!
  \*******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var mwApi = new mw.Api();
var config = mw.config.get();

const {
  _analysis
} = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const {
  _hasRight
} = __webpack_require__(/*! ./_hasRight */ "./module/_hasRight.js");

const {
  _resolveExists
} = __webpack_require__(/*! ./_resolveExists */ "./module/_resolveExists.js");

const {
  $br
} = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

const {
  progress
} = __webpack_require__(/*! ./progress */ "./module/progress.js");
/**
 * @module quickRename 快速重命名模块
 * @param {String} from
 * @param {String} to
 */


var quickRename = function (from, to) {
  mw.hook('InPageEdit.quickRename').fire();
  from = from || config.wgPageName;
  to = to || '';
  var reason, movetalk, movesubpages, noredirect;
  ssi_modal.show({
    outSideClose: false,
    className: 'in-page-edit quick-rename',
    center: true,
    sizeClass: 'dialog',
    title: _msg('rename-title'),
    content: $('<section>').append($('<label>', {
      for: 'move-to',
      html: _msg('rename-moveTo', '<b>' + from.replace(/_/g, ' ') + '</b>')
    }), $br, $('<input>', {
      id: 'move-to',
      style: 'width:96%',
      onclick: "$(this).css('box-shadow','')"
    }), $br, $('<label>', {
      for: 'move-reason',
      text: _msg('editSummary')
    }), $br, $('<input>', {
      id: 'move-reason',
      style: 'width:96%'
    }), $br, $('<label>').append($('<input>', {
      type: 'checkbox',
      id: 'movetalk',
      checked: 'checked'
    }), $('<span>', {
      text: _msg('rename-movetalk')
    })), $br, $('<label>').append($('<input>', {
      type: 'checkbox',
      id: 'movesubpages',
      checked: 'checked'
    }), $('<span>', {
      text: _msg('rename-movesubpages')
    })), $br, $('<label>').append($('<input>', {
      type: 'checkbox',
      id: 'noredirect'
    }), $('<span>', {
      text: _msg('rename-noredirect')
    }))),
    buttons: [{
      label: _msg('cancel'),
      className: 'btn btn-secondary',
      method: function (a, modal) {
        modal.close();
      }
    }, {
      label: _msg('confirm'),
      className: 'btn btn-primary',
      method: function () {
        to = $('.in-page-edit.quick-rename #move-to').val();

        if (to === '' || to === config.wgPageName || to === config.wgPageName.replace(/_/g, ' ')) {
          $('.in-page-edit.quick-rename #move-to').css('box-shadow', '0 0 4px #f00');
          return;
        }

        _analysis('quick_move');

        progress(_msg('editor-title-saving'));
        movetalk = $('.in-page-edit.quick-rename #movetalk').prop('checked');
        movesubpages = $('.in-page-edit.quick-rename #movesubpages').prop('checked');
        noredirect = $('.in-page-edit.quick-rename #noredirect').prop('checked');
        reason = $('.in-page-edit.quick-rename #move-reason').val();

        if (reason === '') {
          reason = _msg('rename-summary') + ' → [[:' + to + ']]';
        } else {
          reason = _msg('rename-summary') + ' → [[:' + to + ']] (' + reason + ')';
        }

        mwApi.postWithToken('csrf', {
          action: 'move',
          from: from,
          to: to,
          reason: reason,
          movetalk: movetalk,
          movesubpages: movesubpages,
          noredirect: noredirect
        }).done(function () {
          progress(true);
          ssi_modal.notify('success', {
            className: 'in-page-edit',
            content: _msg('notify-rename-success'),
            title: _msg('notify-success')
          });
          location.href = config.wgArticlePath.replace('$1', to);
        }).fail(function (errorCode, feedback, errorThrown) {
          progress(false);
          ssi_modal.notify('error', {
            className: 'in-page-edit',
            content: _msg('notify-rename-error') + ': ' + errorThrown.error.info + '<code>' + errorThrown.error.code + '</code>',
            title: _msg('notify-error')
          }); // 如果原因是页面已存在，给出解决方案

          if (errorThrown.error.code === 'articleexists') {
            _resolveExists(to, 'For move page [[' + from + ']] to here.');
          }
        });
      }
    }],
    beforeShow: function () {
      if (!_hasRight('move')) {
        ssi_modal.dialog({
          title: _msg('notify-no-right'),
          content: _msg('rename-no-right'),
          className: 'in-page-edit quick-deletepage',
          center: true,
          okBtn: {
            className: 'btn btn-primary btn-single'
          }
        });
        return false;
      }
    }
  });
};

module.exports = {
  quickRename
};

/***/ }),

/***/ "./module/specialNotice.js":
/*!*********************************!*\
  !*** ./module/specialNotice.js ***!
  \*********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const api = __webpack_require__(/*! ./api.json */ "./module/api.json");

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

function getNotice(cb) {
  return $.get(api.specialNotice).then(data => {
    cb && cb(data);
  });
}

function getLocal() {
  var noticeList = localStorage.getItem('InPageEditNoticeId') || [];

  try {
    noticeList = JSON.parse(noticeList);
  } catch (e) {
    localStorage.setItem('InPageEditNoticeId', '[]');
    noticeList = [];
  }

  return noticeList;
}

function setLocal({
  id
}) {
  var noticeList = localStorage.getItem('InPageEditNoticeId') || [];

  try {
    noticeList = JSON.parse(noticeList);
  } catch (e) {
    noticeList = [];
  }

  if (!id.includes(noticeList)) {
    noticeList.push(id);
  }

  localStorage.setItem('InPageEditNoticeId', JSON.stringify(noticeList));
  console.info('[InPageEdit] Notice save as viewed', id);
}

function isViewed({
  id
}) {
  var noticeList = getLocal();
  var viewed = id.includes(noticeList);
  console.info('[InPageEdit] Notice with id: ' + id, viewed);
  return viewed;
}

function makeList({
  id,
  level,
  title,
  message
}) {
  return $('<section>', {
    class: 'notice-list level-' + level,
    id
  }).append($('<h4>', {
    html: title
  }), $('<div>', {
    html: message
  }));
}
/**
 * @module specialNotice 特别通知
 */


var specialNotice = function () {
  getNotice(data => {
    var noticeContainer = $('<div>', {
      class: 'ipe-notice-container'
    }),
        noticeList = [];
    $.each(data, (_, item) => {
      if (!isViewed(item)) {
        noticeList.push(makeList(item));
      }
    });
    console.info('[InPageEdit] Notice list', noticeList); // 没有未读消息

    if (noticeList.length < 1) return;
    noticeContainer.append(noticeList);
    ssi_modal.show({
      className: 'in-page-edit ipe-special-notice',
      sizeClass: 'dialog',
      outSideClose: false,
      center: true,
      title: _msg('version-notice-title'),
      content: noticeContainer,
      buttons: [{
        label: _msg('updatelog-dismiss'),
        className: 'btn btn-single',

        method(e, modal) {
          modal.close();
          $.each(noticeList, (_, item) => {
            setLocal(item);
          });
        }

      }]
    });
  });
};

module.exports = {
  specialNotice,
  getNotice
};

/***/ }),

/***/ "./module/stepModal.js":
/*!*****************************!*\
  !*** ./module/stepModal.js ***!
  \*****************************/
/***/ (function(module) {

/**
 * @module stepModal 分步走模态框
 *
 * @param {Object} params
 * @param {Array} params.contents Modal contents { title: String, content: String, method: Function }
 * @param {Number} params.step From step, 1 means first one
 * @param {String} params.btnBefore
 * @param {String} params.btnAfter
 * @param {String} param.btnDone
 * @param {Function} param.afterDone
 * @param {Function} param.onShow
 *
 * @return {Promise} After done
 * @return {Object} $modal Modal Obj
 *
 * @example stepModal([{
 *   title: 'step 1 title',
 *   content: 'step 1 content',
 *   method(modal) {}
 * }]).then(()=>console.log('done'))
 */
var stepModal = params => {
  var $def = $.Deferred();
  var {
    title,
    content,
    contents,
    step,
    btnBefore,
    btnAfter,
    btnDone,
    afterDone,
    onShow
  } = params; // 规范变量

  contents = contents || content;
  if (typeof contents !== 'object') throw 'stepModal contents type error: Unexpected type ' + typeof contents;
  if (contents.length < 1) throw 'stepModal missing contents';
  $.each(contents, (key, val) => {
    if (typeof val === 'string') val = {
      content: val
    };
    if (!val.title) val.title = title || '';
    if (!val.content) val.content = '';
    contents[key] = val;
  });
  step = step || 1;
  if (isNaN(step) || step < 1) step = 1;
  if (!contents[step]) step = 1; // content 数组前插一位，方便处理以下逻辑：
  // step1 指的就是第一步，而不是数组的第二个

  try {
    contents.unshift(0);
  } catch (e) {
    console.error('stepModal unknown error', e);
    return;
  }

  var allSteps = contents.length - 1;
  var $modal = ssi_modal.createObject({
    center: 1,
    className: 'in-page-edit ipe-stepModal ' + (params.className ? params.className : ''),
    sizeClass: params.sizeClass || 'small',
    outSideClose: 0,

    onShow(modal) {
      onShow && onShow(modal);
    }

  }).init();
  var $modalObj = $(document.getElementById($modal.modalId));
  $modal.setButtons([{
    label: btnBefore ? btnBefore : '← before',
    className: 'btn btn-secondary btn-before',
    side: 'left',
    method: before
  }, {
    label: btnAfter ? btnAfter : 'after →',
    className: 'btn btn-secondary btn-after',
    method: after
  }, {
    label: btnDone ? btnDone : 'done √',
    className: 'btn btn-primary btn-done',

    method(e, modal) {
      modal.close();
      $def.resolve();
      afterDone && afterDone();
    }

  }]);
  var $btnBefore = $modalObj.find('.btn-before'),
      $btnAfter = $modalObj.find('.btn-after'),
      $btnDone = $modalObj.find('.btn-done'); // 设定初始状态

  $btnDone.hide();
  if (step === 1) $btnBefore.hide();

  if (step === allSteps) {
    $btnAfter.hide();
    $btnDone.show();
  }

  $modalObj.find('.ssi-closeIcon').hide();
  /**
   * @function setStep
   * @param {Number} step
   */

  function setStep(step) {
    $modal.setTitle(`${contents[step].title} (${step}/${allSteps})`);
    $modal.setContent(contents[step].content);
    if (contents[step].method && typeof contents[step].method === 'function') contents[step].method($modal);
  }
  /**
   * @function before
   */


  function before(modal) {
    var $btn = $(modal.target);
    if (step <= 1) return step = 1;
    $btnAfter.show();
    $btnDone.hide();
    step--;
    setStep(step);
    if (step <= 1) $btn.hide();
  }
  /**
   * @function after
   */


  function after(modal) {
    var $btn = $(modal.target);
    if (step >= allSteps) return step = allSteps;
    $btnBefore.show();
    step++;
    setStep(step);

    if (step >= allSteps) {
      $btn.hide();
      $btnDone.show();
    }
  } // init


  $modal.show();
  setStep(step);
  $def.$modal = $modal;
  return $def;
};

module.exports = {
  stepModal
};

/***/ }),

/***/ "./module/version.js":
/*!***************************!*\
  !*** ./module/version.js ***!
  \***************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const version = __webpack_require__(/*! ../package.json */ "./package.json").version;

module.exports = version;

/***/ }),

/***/ "./module/versionInfo.js":
/*!*******************************!*\
  !*** ./module/versionInfo.js ***!
  \*******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

const {
  _msg
} = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const api = __webpack_require__(/*! ./api.json */ "./module/api.json");

const version = __webpack_require__(/*! ./version */ "./module/version.js");
/**
 * @module versionInfo 版本信息模块
 * @description Show Update Logs Modal box
 */


var versionInfo = function () {
  // 显示模态框
  ssi_modal.show({
    className: 'in-page-edit update-logs-modal',
    title: _msg('updatelog-title') + ' - <span id="yourVersion">' + version + '</span>',
    content: $('<section>').append($('<iframe>', {
      style: 'margin: 0;padding: 0;width: 100%;height: 80vh;border: 0;',
      src: api.updatelogsUrl
    })),
    buttons: [{
      label: 'GitHub',
      className: 'btn btn-secondary',
      method: function () {
        window.open(api.githubLink);
      }
    }, {
      label: _msg('updatelog-about'),
      className: 'btn btn-secondary',
      method: function () {
        window.open(api.aboutUrl);
      }
    }, {
      label: _msg('close'),
      className: 'btn btn-primary',
      method: function (a, modal) {
        modal.close();
      }
    }]
  });
};

module.exports = {
  versionInfo
};

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse("{\"name\":\"mediawiki-inpageedit\",\"version\":\"14.1.6-alpha.16\",\"description\":\"A useful MediaWiki JavaScript Plugin written with jQuery\",\"main\":\"index.js\",\"dependencies\":{},\"devDependencies\":{\"@babel/core\":\"^7.12.10\",\"@babel/preset-env\":\"^7.12.11\",\"@babel/preset-es2015\":\"^7.0.0-beta.53\",\"babel-loader\":\"^8.2.2\",\"eslint\":\"^7.7.0\",\"prettier\":\"^2.1.2\",\"stylus\":\"^0.54.8\",\"terser-webpack-plugin\":\"^5.1.1\",\"webpack\":\"^5.13.0\",\"webpack-cli\":\"^4.3.1\"},\"scripts\":{\"build\":\"yarn clear && webpack && MINIFY=1 webpack\",\"clear\":\"rm -rf ./dist ./**/dist ./dev\",\"dev\":\"yarn clear && webpack --watch -o ./dev\",\"lint\":\"eslint ./index.js ./module/*.js ./method/*.js\",\"prettier\":\"prettier --write ./index.js ./module/*.js ./method/*.js\",\"publish:stable\":\"npm run build && npm publish --tag latest\",\"publish:canary\":\"npm run build && npm publish --tag canary && yarn clear\",\"style\":\"stylus ./style/index.styl -o ./style/\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/Wjghj-Project/InPageEdit.git\"},\"keywords\":[\"mediawiki\",\"mediawiki-gadget\",\"inpageedit\"],\"author\":\"Dragon-Fish\",\"license\":\"GPL-3.0-or-later\",\"bugs\":{\"url\":\"https://github.com/Wjghj-Project/InPageEdit/issues\"},\"homepage\":\"https://ipe.js.org\"}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
!function() {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/**
 * @license GPL-3.0 GNU GENERAL PUBLIC LICENSE 3.0
 *
 * @name InPageEdit
 * @description A useful MediaWiki JavaScript Plugin written with jQuery
 * @author 机智的小鱼君 Dragon-Fish <dragon-fish@qq.com>
 * @url https://github.com/Dragon-Fish/InPageEdit-v2
 */
!async function () {
  'use strict'; // 创建 InPageEdit 变量

  var InPageEdit = window.InPageEdit || {}; // 防止多次运行

  if (InPageEdit.loaded) {
    throw '[InPageEdit] InPageEdit 已经在运行了';
  } else {
    InPageEdit.loaded = true;
  } // 初始化插件


  var init = __webpack_require__(/*! ./method/init */ "./method/init.js");

  var mainFunctions = await init(); // 合并入全局变量

  window.InPageEdit = $.extend({}, window.InPageEdit, mainFunctions);
}();
}();
/******/ })()
;
//# sourceMappingURL=InPageEdit.js.map