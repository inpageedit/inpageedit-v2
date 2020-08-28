/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @license GPL-3.0 GNU GENERAL PUBLIC LICENSE 3.0
 *
 * @name InPageEdit
 * @description A useful MediaWiki JavaScript Plugin written with jQuery
 * @author 机智的小鱼君 Dragon-Fish <dragon-fish@qq.com>
 * @url https://github.com/Dragon-Fish/InPageEdit-v2
 */

!(async function () {
  'use strict';

  // 创建 InPageEdit 变量
  var InPageEdit = window.InPageEdit || {};

  // 防止多次运行
  if (typeof InPageEdit.version !== 'undefined') {
    throw '[InPageEdit] InPageEdit 已经在运行了';
  }

  // 初始化插件
  var init = __webpack_require__(/*! ./method/init */ "./method/init.js");

  var mainFunctions = await init();

  // 合并入全局变量
  window.InPageEdit = $.extend({}, window.InPageEdit, mainFunctions);

})();

/***/ }),

/***/ "./method/_dir.js":
/*!************************!*\
  !*** ./method/_dir.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @returns {String} https://cdn.jsdelivr.net/... 结尾没有/
 */
function getDir() {
  var thisScript = document.currentScript.src;
  var thisUrl = thisScript.split('/');
  // 理论上入口文件位于 /dist/*.js
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

/***/ "./method/getUserInfo.js":
/*!*******************************!*\
  !*** ./method/getUserInfo.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var mwApi = new mw.Api();

var getUserInfo = function () {
  /**
 * @description 获取用户权限信息
 */
  mw.user.getRights().then(rights => {
    console.info('[InPageEdit] 成功获取用户权限信息');
    mw.config.set('wgUserRights', rights);
  }).fail(function () {
    console.warn('[InPageEdit] 警告：无法获取用户权限信息');
    mw.config.set('wgUserRights', []);
  });

  /**
   * @description 获取封禁状态
   */
  if (mw.user.getName() !== null) {
    mwApi.get({
      action: 'query',
      list: 'users',
      usprop: 'blockinfo',
      ususers: mw.user.getName()
    }).then(data => {
      if (data.query.users[0].blockid) {
        mw.config.set('wgUserIsBlocked', true);
      } else {
        mw.config.set('wgUserIsBlocked', false);
      }
    });
  }
}

module.exports = {
  getUserInfo
}

/***/ }),

/***/ "./method/i18njs.js":
/*!**************************!*\
  !*** ./method/i18njs.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* <nowiki>
 * Library for accessing i18n messages for use in Dev Wiki scripts.
 * See [[I18n-js]] for documentation.
 *
 * @author Cqm <https://dev.fandom.com/User:Cqm>
 * @author OneTwoThreeFall <https://dev.fandom.com/User:OneTwoThreeFall>
 *
 * @version 0.5.8
 *
 * @notes Also used by VSTF wiki for their reporting forms (with a non-dev i18n.json page)
 * @notes This is apparently a commonly used library for a number of scripts and also includes
 *        a check to prevent double loading. This can make it painful to test from your JS
 *        console. To get around this, add ?usesitejs=0&useuserjs=0 to your URL.
 */



window.i18njs = window.i18njs || {};

// prevent double loading and loss of cache
if (window.i18njs.loadMessages !== undefined) {
  return;
}

/*
 * Cache of mw config variables.
 */
var conf = mw.config.get([
  'debug',
  'wgContentLanguage',
  'wgUserLanguage'
]),

  /*
   * Current time in milliseconds, used to set and check cache age.
   */
  now = Date.now(),

  /*
   * Cache of loaded I18n instances.
   */
  cache = {},

  /*
   * Initial overrides object, initialised below with the i18n global variable.
   * Allows end-users to override specific messages. See documentation for how to use.
   */
  overrides = null,

  /*
   * Language fallbacks for those that don't fallback to English.
   * Shouldn't need updating unless Wikia change theirs.
   *
   * To generate this, use `$ grep -R "fallback =" /path/to/messages/`,
   * pipe the result to a text file and format the result.
   */
  fallbacks = {
    'ab': 'ru',
    'ace': 'id',
    'aln': 'sq',
    'als': 'gsw',
    'an': 'es',
    'anp': 'hi',
    'arn': 'es',
    'arz': 'ar',
    'av': 'ru',
    'ay': 'es',
    'ba': 'ru',
    'bar': 'de',
    'bat-smg': 'sgs',
    'bcc': 'fa',
    'be-x-old': 'be-tarask',
    'bh': 'bho',
    'bjn': 'id',
    'bm': 'fr',
    'bpy': 'bn',
    'bqi': 'fa',
    'bug': 'id',
    'cbk-zam': 'es',
    'ce': 'ru',
    'ckb': 'ckb-arab',
    'crh': 'crh-latn',
    'crh-cyrl': 'ru',
    'csb': 'pl',
    'cv': 'ru',
    'de-at': 'de',
    'de-ch': 'de',
    'de-formal': 'de',
    'dsb': 'de',
    'dtp': 'ms',
    'eml': 'it',
    'ff': 'fr',
    'fiu-vro': 'vro',
    'frc': 'fr',
    'frp': 'fr',
    'frr': 'de',
    'fur': 'it',
    'gag': 'tr',
    'gan': 'gan-hant',
    'gan-hans': 'zh-hans',
    'gan-hant': 'zh-hant',
    'gl': 'pt',
    'glk': 'fa',
    'gn': 'es',
    'gsw': 'de',
    'hif': 'hif-latn',
    'hsb': 'de',
    'ht': 'fr',
    'ii': 'zh-cn',
    'inh': 'ru',
    'iu': 'ike-cans',
    'jut': 'da',
    'jv': 'id',
    'kaa': 'kk-latn',
    'kbd': 'kbd-cyrl',
    'kbd-cyrl': 'ru',
    'khw': 'ur',
    'kiu': 'tr',
    'kk': 'kk-cyrl',
    'kk-arab': 'kk-cyrl',
    'kk-cn': 'kk-arab',
    'kk-kz': 'kk-cyrl',
    'kk-latn': 'kk-cyrl',
    'kk-tr': 'kk-latn',
    'kl': 'da',
    'koi': 'ru',
    'ko-kp': 'ko',
    'krc': 'ru',
    'ks': 'ks-arab',
    'ksh': 'de',
    'ku': 'ku-latn',
    'ku-arab': 'ckb',
    'kv': 'ru',
    'lad': 'es',
    'lb': 'de',
    'lbe': 'ru',
    'lez': 'ru',
    'li': 'nl',
    'lij': 'it',
    'liv': 'et',
    'lmo': 'it',
    'ln': 'fr',
    'ltg': 'lv',
    'lzz': 'tr',
    'mai': 'hi',
    'map-bms': 'jv',
    'mg': 'fr',
    'mhr': 'ru',
    'min': 'id',
    'mo': 'ro',
    'mrj': 'ru',
    'mwl': 'pt',
    'myv': 'ru',
    'mzn': 'fa',
    'nah': 'es',
    'nap': 'it',
    'nds': 'de',
    'nds-nl': 'nl',
    'nl-informal': 'nl',
    'no': 'nb',
    'os': 'ru',
    'pcd': 'fr',
    'pdc': 'de',
    'pdt': 'de',
    'pfl': 'de',
    'pms': 'it',
    // 'pt': 'pt-br',
    'pt-br': 'pt',
    'qu': 'es',
    'qug': 'qu',
    'rgn': 'it',
    'rmy': 'ro',
    'rue': 'uk',
    'ruq': 'ruq-latn',
    'ruq-cyrl': 'mk',
    'ruq-latn': 'ro',
    'sa': 'hi',
    'sah': 'ru',
    'scn': 'it',
    'sg': 'fr',
    'sgs': 'lt',
    'shi': 'ar',
    'simple': 'en',
    'sli': 'de',
    'sr': 'sr-ec',
    'srn': 'nl',
    'stq': 'de',
    'su': 'id',
    'szl': 'pl',
    'tcy': 'kn',
    'tg': 'tg-cyrl',
    'tt': 'tt-cyrl',
    'tt-cyrl': 'ru',
    'ty': 'fr',
    'udm': 'ru',
    'ug': 'ug-arab',
    'uk': 'ru',
    'vec': 'it',
    'vep': 'et',
    'vls': 'nl',
    'vmf': 'de',
    'vot': 'fi',
    'vro': 'et',
    'wa': 'fr',
    'wo': 'fr',
    'wuu': 'zh-hans',
    'xal': 'ru',
    'xmf': 'ka',
    'yi': 'he',
    'za': 'zh-hans',
    'zea': 'nl',
    'zh': 'zh-hans',
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

/*
 * Get a translation of a message from the messages object in the
 * requested language.
 *
 * @param messages the message object to look the message up in.
 * @param name The name of the message to get.
 * @param lang The language to get the message in.
 * @param messageKey
 *
 * @return The requested translation or the name wrapped in < ... > if no
 *     message could be found.
 */
function getMsg(messages, name, lang, messageKey) {
  // https://www.mediawiki.org/wiki/Help:System_message#Finding_messages_and_documentation
  if (conf.wgUserLanguage === 'qqx') {
    return '(i18njs-' + messageKey + '-' + name + ')';
  }

  // if the message has been overridden, use that without checking the language
  if (overrides[messageKey] && overrides[messageKey][name]) {
    return overrides[messageKey][name];
  }

  if (messages[lang] && messages[lang][name]) {
    return messages[lang][name];
  }

  if (lang === 'en') {
    return '<' + name + '>';
  }

  lang = fallbacks[lang] || 'en';
  return getMsg(messages, name, lang);
}

/*
 * Substitute arguments into the string, where arguments are represented
 * as $n where n > 0.
 *
 * @param message The message to substitute arguments into
 * @param arguments The arguments to substitute in.
 *
 * @return The resulting message.
 */
function handleArgs(message, args) {
  args.forEach(function (elem, index) {
    var rgx = new RegExp('\\$' + (index + 1), 'g');
    message = message.replace(rgx, elem);
  });

  return message;
}

/*
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
    $html = $.parseHTML(html, /* document */ context, /* keepscripts */ false),
    $div = $('<div>', context).append($html),
    whitelistAttrs = [
      'title',
      'style',
      'class'
    ],
    whitelistTags = [
      'b',
      'br',
      'code',
      'del',
      'em',
      'i',
      's',
      'strong',
      'span',
    ];

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
      }

      // make sure there's nothing nasty in style attributes
      if (attr.name === 'style') {
        style = $this.attr('style');

        if (style.indexOf('url(') > -1) {
          mw.log('[I18n-js] Disallowed url() in style attribute');
          $this.removeAttr('style');

          // https://phabricator.wikimedia.org/T208881
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
function parse(message) {
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

  return message
    .replace(urlRgx, function (_match, href, text) {
      return makeLink(href, text, true, true);
    })
    .replace(simplePageRgx, function (_match, href) {
      return makeLink(href);
    })
    .replace(pageWithTextRgx, function (_match, href, text) {
      return makeLink(href, text);
    })
    .replace(pluralRgx, function (_match, count, forms) {
      return mw.language.convertPlural(Number(count), forms.split('|'));
    })
    .replace(genderRgx, function (_match, gender, forms) {
      return mw.language.gender(gender, forms.split('|'));
    });
}

/*
 * Parse markdown links into HTML. Also supports basic inline HTML tags.
 *
 * Will process:
 * - [text](url)
 * - [page]
 * - [text](page)
 *
 * @param The message to process.
 *
 * @return the resulting string.
 */
function markdown(message) {
  // [text](url)
  var urlRgx = /\[(.+?)\]\(((?:https?:)?\/\/.+?)\)/g,
    // [page]
    simplePageRgx = /\[(.+?)\]/g,
    // [text](page)
    pageWithTextRgx = /\[(.+?)\]\((.+?)\)/g;

  if (message.indexOf('<') > -1) {
    message = sanitiseHtml(message);
  }

  return message
    .replace(urlRgx, function (_match, text, href) {
      return makeLink(href, text, true);
    })
    .replace(simplePageRgx, function (_match, href) {
      return makeLink(href);
    })
    .replace(pageWithTextRgx, function (_match, text, href) {
      return makeLink(href, text);
    });
}

/*
 * Create a new Message instance.
 *
 * @param message The name of the message.
 * @param defaultLang
 * @param args Any arguments to substitute into the message.
 * @param messageKey
 */
function message(messages, defaultLang, args, messageKey) {
  if (!args.length) {
    return;
  }

  var msgName = args.shift(),
    noMsg = '<' + msgName + '>',
    msg = getMsg(messages, msgName, defaultLang, messageKey);

  if (args.length) {
    msg = handleArgs(msg, args);
  }

  return {
    /*
     * Boolean representing whether the message exists.
     */
    exists: msg !== noMsg,

    /*
     * Parse wikitext links in the message and return the result.
     *
     * @return The resulting string.
     */
    parse: function () {
      // skip parsing if the message wasn't found otherwise
      // the sanitisation will mess with it
      if (!this.exists) {
        return this.escape();
      }

      return parse(msg);
    },

    /*
     * Parse markdown links in the message and return the result.
     *
     * @return The resulting string.
     */
    markdown: function () {
      // skip parsing if the message wasn't found otherwise
      // the sanitisation will mess with it
      if (!this.exists) {
        return this.escape();
      }

      return markdown(msg);
    },

    /*
     * Escape any HTML in the message and return the result.
     *
     * @return The resulting string.
     */
    escape: function () {
      return mw.html.escape(msg);
    },

    /*
     * Return the message as is.
     *
     * @return The resulting string.
     */
    plain: function () {
      return msg;
    }
  };
}

/*
 * Create a new i18n object.
 *
 * @param messages The message object to look translations up in.
 * @param name
 */
function i18n(messages, name) {
  var defaultLang = conf.wgUserLanguage,
    tempLang = null,
    messageKey = null;

  if (name.indexOf('u:') !== 0) {
    messageKey = name;
  }

  return {
    /*
     * Set the default language.
     *
     * @param lang The language code to use by default.
     */
    useLang: function (lang) {
      defaultLang = lang;
    },

    /*
     * Set the language for the next msg call.
     *
     * @param lang The language code to use for the next `msg` call.
     *
     * @return The current object for use in chaining.
     */
    inLang: function (lang) {
      tempLang = lang;
      return this;
    },

    /*
     * Set the default language to the content language.
     */
    useContentLang: function () {
      defaultLang = conf.wgContentLanguage;
    },

    /*
     * Set the language for the next `msg` call to the content language.
     *
     * @return The current object for use in chaining.
     */
    inContentLang: function () {
      tempLang = conf.wgContentLanguage;
      return this;
    },


    /*
     * Set the default language to the user's language.
     */
    useUserLang: function () {
      defaultLang = conf.wgUserLanguage;
    },

    /*
     * Set the language for the next msg call to the user's language.
     *
     * @return The current object for use in chaining.
     */
    inUserLang: function () {
      tempLang = conf.wgUserLanguage;
      return this;
    },

    /*
     * Create a new instance of Message.
     */
    msg: function () {
      var args = Array.prototype.slice.call(arguments),
        lang = defaultLang;

      if (tempLang !== null) {
        lang = tempLang;
        tempLang = null;
      }

      return message(messages, lang, args, messageKey);
    },

    /*
     * For accessing the raw messages.
     */
    _messages: messages
  };
}

/*
 * Strip block comments from a JSON string which are illegal under the JSON spec.
 * This is a bit basic, so will remove comments inside strings too.
 *
 * @param json The JSON string.
 *
 * @return The JSON string after any comments have been removed.
 */
function stripComments(json) {
  json = json
    .trim()
    .replace(/\/\*[\s\S]*?\*\//g, '');
  return json;
}

/*
 * Save messages string to local storage for caching.
 *
 * @param name
 * @param json The JSON object.
 * @param cacheVersion Cache version requested by the loading script.
 */
function saveToCache(name, json, cacheVersion) {
  var keyPrefix = 'i18n-cache-' + name;

  // don't cache empty JSON
  if (Object.keys(json).length === 0) {
    return;
  }

  try {
    localStorage.setItem(keyPrefix + '-content', JSON.stringify(json));
    localStorage.setItem(keyPrefix + '-timestamp', now);
    localStorage.setItem(keyPrefix + '-version', cacheVersion || 0);
  } catch (e) {
    // ...
  }
}

/*
 * Parse JSON string loaded from page and create an i18n object.
 *
 * @param name
 * @param res The JSON string.
 * @param cacheVersion Cache version requested by the loading script.
 *
 * @return The resulting i18n object.
 */
function parseMessagesToObject(name, res, cacheVersion) {
  var json = {},
    obj,
    msg;

  // handle parse errors gracefully
  try {
    res = stripComments(res);
    json = JSON.parse(res);
  } catch (e) {
    msg = e.message;

    if (msg === 'Unexpected end of JSON input') {
      msg += '. This may be caused by a non-existent i18n.json page.';
    }

    console.warn('[I18n-js] SyntaxError in messages: ' + msg);
  }

  obj = i18n(json, name);

  // cache the result in case it's used multiple times
  cache[name] = obj;

  if (typeof cacheVersion === 'number') {
    saveToCache(name, json, cacheVersion);
  }

  return obj;
}

/*
 * Load messages string from local storage cache and add to cache object.
 *
 * @param name
 * @param minCacheVersion Minimum cache version requested by the loading script.
 */
function loadFromCache(name, minCacheVersion) {
  var keyPrefix = 'i18n-cache-' + name,
    twoDays = 1000 * 60 * 60 * 24 * 2,
    cacheContent,
    cacheTimestamp,
    cacheVersion;

  try {
    cacheContent = localStorage.getItem(keyPrefix + '-content');
    cacheTimestamp = Number(localStorage.getItem(keyPrefix + '-timestamp'));
    cacheVersion = Number(localStorage.getItem(keyPrefix + '-version'));
  } catch (e) {
    // ...
  }

  // only use cached messages if cache is less than two days old
  // and if cache version is greater than or equal to requested version
  if (
    cacheContent &&
    now - cacheTimestamp < twoDays &&
    cacheVersion >= minCacheVersion
  ) {
    parseMessagesToObject(name, cacheContent);
  }
}

/*
 * Load messages stored as JSON on a page.
 *
 * @param name The name of the script the messages are for. This will be
 *     used to get messages from
 *     https://dev.fandom.com/wiki/MediaWiki:Custom-name/i18n.json.
 * @param options Options that can be set by the loading script:
 *     cacheVersion: Minimum cache version requested by the loading script.
 *     noCache: Never load i18n from cache (not recommended for general use).
 *
 * @return A jQuery.Deferred instance.
 */
function loadMessages(name, options, url) {
  options = options || {};

  var deferred = $.Deferred(),
    useCache = (options.noCache || conf.debug) !== true,
    cacheVersion = Number(options.cacheVersion) || 0;

  // if using the special 'qqx' language code, there's no need to load
  // the messages, so resolve with an empty i18n object and return early
  if (conf.wgUserLanguage === 'qqx') {
    return deferred.resolve(i18n({}, name));
  }

  if (useCache) {
    loadFromCache(name, cacheVersion);
  }

  if (cache[name] && useCache) {
    return deferred.resolve(cache[name]);
  }

  if (url) {
    $.getJSON(url).then(data => {
      var res = JSON.stringify(data);
      deferred.resolve(parseMessagesToObject(name, res, cacheVersion));
    })
  }

  return deferred;
}

// expose under the dev global
var i18njs = {
  loadMessages: loadMessages,

  // 'hidden' functions to allow testing
  _stripComments: stripComments,
  _saveToCache: saveToCache,
  _getMsg: getMsg,
  _handleArgs: handleArgs,
  _parse: parse,
  _markdown: markdown,
  _fallbacks: fallbacks
}

window.i18njs = i18njs;

// initialise overrides object
window.i18njs.overrides = window.i18njs.overrides || {};
overrides = window.i18njs.overrides;

// fire an event on load
mw.hook('i18njs').fire(i18njs);

module.exports = {
  i18njs
}

/***/ }),

/***/ "./method/init.js":
/*!************************!*\
  !*** ./method/init.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 导入方法
const _dir = __webpack_require__(/*! ./_dir */ "./method/_dir.js");
const { i18njs } = __webpack_require__(/*! ./i18njs */ "./method/i18njs.js");
const { loadScript } = __webpack_require__(/*! ./loadScript */ "./method/loadScript.js");
const { getUserInfo } = __webpack_require__(/*! ./getUserInfo */ "./method/getUserInfo.js");
const { loadStyles } = __webpack_require__(/*! ./loadStyles */ "./method/loadStyles.js");
const { updateNotice } = __webpack_require__(/*! ./updateNotice */ "./method/updateNotice.js");

// 导入全部模块
const { _analysis } = __webpack_require__(/*! ../module/_analysis */ "./module/_analysis.js");
const { _msg } = __webpack_require__(/*! ../module/_msg */ "./module/_msg.js");
const { about } = __webpack_require__(/*! ../module/about */ "./module/about.js");
const api = __webpack_require__(/*! ../module/api.json */ "./module/api.json");
const { articleLink } = __webpack_require__(/*! ../module/articleLink */ "./module/articleLink.js");
const { findAndReplace } = __webpack_require__(/*! ../module/findAndReplace */ "./module/findAndReplace.js");
const { loadQuickDiff } = __webpack_require__(/*! ../module/loadQuickDiff */ "./module/loadQuickDiff.js");
const { pluginPreference } = __webpack_require__(/*! ../module/pluginPreference */ "./module/pluginPreference.js");
const { pluginStore } = __webpack_require__(/*! ../module/pluginStore */ "./module/pluginStore.js");
const { progress } = __webpack_require__(/*! ../module/progress */ "./module/progress.js");
const { quickDelete } = __webpack_require__(/*! ../module/quickDelete */ "./module/quickDelete.js");
const { quickDiff } = __webpack_require__(/*! ../module/quickDiff */ "./module/quickDiff.js");
const { quickEdit } = __webpack_require__(/*! ../module/quickEdit */ "./module/quickEdit.js");
const { quickPreview } = __webpack_require__(/*! ../module/quickPreview */ "./module/quickPreview.js");
const { quickRedirect } = __webpack_require__(/*! ../module/quickRedirect */ "./module/quickRedirect.js");
const { quickRename } = __webpack_require__(/*! ../module/quickRename */ "./module/quickRename.js");
const { specialNotice } = __webpack_require__(/*! ../module/specialNotice */ "./module/specialNotice.js");
const version = __webpack_require__(/*! ../module/version */ "./module/version.js");
const { versionInfo } = __webpack_require__(/*! ../module/versionInfo */ "./module/versionInfo.js");


/**
 * @method initMain
 * @return {Object} InPageEdit
 */
module.exports = async function init() {

  // 加载前置插件以及样式表
  loadStyles();
  await loadScript('https://cdn.jsdelivr.net/gh/dragon-fish/inpageedit-v2@master/src/ssi_modal/ssi-modal.min.js');
  i18njs.loadMessages('InPageEdit-v2', {
    noCache: Boolean(InPageEdit.version !== localStorage.getItem('InPageEditVersion') || mw.util.getParamValue('i18n') === 'nocache') // 更新翻译缓存
  },
    _dir + '/i18n/languages.json'
  ).then(() => {
    // 初始化前置模块
    pluginPreference.set();
    getUserInfo();
    loadQuickDiff();
    articleLink();
    updateNotice();

    // 暂定，触发工具盒插件
    pluginStore.load('toolbox.js');

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
      _analysis,
      _msg,
      InPageEdit
    });

    // 花里胡哨的加载提示
    console.info('    ____      ____                   ______    ___ __              _    _____ \n   /  _/___  / __ \\____ _____ ____  / ____/___/ (_) /_            | |  / /__ \\\n   / // __ \\/ /_/ / __ `/ __ `/ _ \\/ __/ / __  / / __/  ______    | | / /__/ /\n _/ // / / / ____/ /_/ / /_/ /  __/ /___/ /_/ / / /_   /_____/    | |/ // __/ \n/___/_/ /_/_/    \\__,_/\\__, /\\___/_____/\\__,_/_/\\__/              |___//____/ \n                      /____/');

    // 传回InPageEdit
    return InPageEdit;
  });
}

/***/ }),

/***/ "./method/loadScript.js":
/*!******************************!*\
  !*** ./method/loadScript.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var loadScript = function (src) {
  return $.ajax({
    url: src,
    dataType: 'script',
    crossDomain: true,
    cache: true
  });
}

module.exports = {
  loadScript
}

/***/ }),

/***/ "./method/loadStyles.js":
/*!******************************!*\
  !*** ./method/loadStyles.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const _dir = __webpack_require__(/*! ./_dir */ "./method/_dir.js");

function loadStyles() {

  // 放在越上面优先级越高
  const styleFiles = [
    // Default Skin
    '/src/skin/ipe-default.css',
    // ssi-modal Style
    '/src/ssi_modal/ssi-modal.css',
    // FontAwesome
    'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
  ];

  styleFiles.forEach(link => {
    if (/^https?:\/\//.test(link) !== true) {
      link = _dir + link;
    }
    $('head').prepend(
      $('<link>', { href: link, rel: 'stylesheet', 'data-ipe': 'style' })
    );
  });
}

module.exports = {
  loadStyles
}

/***/ }),

/***/ "./method/updateNotice.js":
/*!********************************!*\
  !*** ./method/updateNotice.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const version = __webpack_require__(/*! ../module/version */ "./module/version.js");

const { _msg } = __webpack_require__(/*! ../module/_msg */ "./module/_msg.js");
const api = __webpack_require__(/*! ../module/api.json */ "./module/api.json");
const { versionInfo } = __webpack_require__(/*! ../module/versionInfo */ "./module/versionInfo.js");
const { specialNotice } = __webpack_require__(/*! ../module/specialNotice */ "./module/specialNotice.js");

function updateNotice() {
  if (localStorage.getItem('InPageEditVersion') !== version) {
    ssi_modal.notify('', {
      title: _msg('updatelog-update-success-title'),
      content: _msg('updatelog-update-success', version),
      className: 'in-page-edit',
      buttons: [{
        className: 'btn btn-primary',
        label: _msg('updatelog-button-versioninfo'),
        method: function (a, modal) {
          localStorage.InPageEditVersion = version;
          versionInfo();
          modal.close();
        }
      }],
      closeAfter: {
        time: 30,
        resetOnHover: true
      },
      onClose: function () {
        ssi_modal.notify('', {
          className: 'in-page-edit',
          content: _msg('updatelog-after-close', `[${api.updatelogsUrl} ${api.updatelogsUrl}]`, `[${api.githubLink}/issues ${_msg('updatelog-file-issue')}]`),
          closeAfter: {
            time: 10
          },
          buttons: [{
            className: 'btn btn-primary',
            label: _msg('ok'),
            method: function (a, modal) {
              modal.close();
            }
          }]
        });
        localStorage.InPageEditVersion = version;
      }
    });
  }
  if (localStorage.getItem('InPageEditNoticeId') !== _msg('noticeid')) {
    specialNotice();
  }
}

module.exports = {
  updateNotice
}

/***/ }),

/***/ "./module/_analysis.js":
/*!*****************************!*\
  !*** ./module/_analysis.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var config = mw.config.get();
var api = __webpack_require__(/*! ./api.json */ "./module/api.json");

/**
 * @module _analysis 提交统计信息模块
 * @param {String} functionID 模块ID，例如 quick_edit
 */
const _analysis = function (functionID) {
  if (InPageEdit.doNotCollectMyInfo === true) {
    // console.info('[InPageEdit] 我们已不再收集您使用插件的信息。');
    // return;
  }
  var submitdata = {
    'action': 'submit',
    'url': config.wgServer + config.wgArticlePath.replace('$1', ''),
    'sitename': config.wgSiteName,
    'username': config.wgUserName,
    'function': functionID
  }
  $.ajax({
    url: api.analysis,
    data: submitdata,
    type: 'post',
    dataType: 'json'
  }).done(function (data) {
    console.log('[InPageEdit] Analysis response\nStatus: ' + data.status + '\nMessage: ' + data.msg);
  });
}

module.exports = {
  _analysis
}

/***/ }),

/***/ "./module/_elements.js":
/*!*****************************!*\
  !*** ./module/_elements.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * @module _elements 常用html元素
 */
var $br = '<br>',
  $hr = '<hr>',
  $progress = '<div class="ipe-progress" style="width: 100%"><div class="ipe-progress-bar"></div></div>';

module.exports = {
  $br,
  br: $br,
  $hr,
  hr: $hr,
  $progress,
  progress: $progress,
}

/***/ }),

/***/ "./module/_hasRight.js":
/*!*****************************!*\
  !*** ./module/_hasRight.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
}

module.exports = {
  _hasRight
}

/***/ }),

/***/ "./module/_msg.js":
/*!************************!*\
  !*** ./module/_msg.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var { i18njs } = __webpack_require__(/*! ../method/i18njs */ "./method/i18njs.js");
const _dir = __webpack_require__(/*! ../method/_dir */ "./method/_dir.js");

/**
 * @module _msg
 * @param {String} msgKey 消息的键
 * @param  {...String} params 替代占位符的内容，可以解析简单的wikitext
 */
var _msg = async function (msgKey, ...params) {
  var i18n;
  await i18njs.loadMessages('InPageEdit-v2', {
    noCache: Boolean(InPageEdit.version !== localStorage.getItem('InPageEditVersion') || mw.util.getParamValue('i18n') === 'nocache') // 更新翻译缓存
  }, _dir + '/i18n/languages.json').then(data => i18n = data);
  return i18n.msg(msgKey, ...params).parse();
}

module.exports = {
  _msg
}

/***/ }),

/***/ "./module/_resolveExists.js":
/*!**********************************!*\
  !*** ./module/_resolveExists.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { _hasRight } = __webpack_require__(/*! ./_hasRight */ "./module/_hasRight.js");

const { quickDelete } = __webpack_require__(/*! ./quickDelete */ "./module/quickDelete.js");
const { quickEdit } = __webpack_require__(/*! ./quickEdit */ "./module/quickEdit.js");

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
    }
  }

  ssi_modal.show({
    className: 'in-page-edit resovle-exists',
    sizeClass: 'dialog',
    center: true,
    outSideClose: false,
    title: _msg('target-exists-title'),
    content: _msg((canDelete ? 'target-exists-can-delete' : 'target-exists-no-delete'), page),
    buttons: [
      {
        className: 'btn btn-danger btn-exists-delete-target',
        label: _msg('quick-delete'),
        method(a, modal) {
          modal.close();
          quickDelete(page, reason.delete || null);
        }
      },
      {
        className: 'btn btn-primary',
        label: _msg('quick-edit'),
        method() {
          quickEdit({
            page: page,
            summary: (reason.edit ? '[InPageEdit] ' + reason : null),
            reload: false
          })
        }
      },
      {
        className: 'btn btn-secondary' + (canDelete ? ' btn-single' : ''),
        label: _msg('cancel'),
        method: (a, modal) => {
          modal.close();
        }
      }
    ],
    onShow: () => {
      if (!canDelete) {
        $('.btn-exists-delete-target').hide();
      }
    }
  });
}

module.exports = {
  _resolveExists
}

/***/ }),

/***/ "./module/about.js":
/*!*************************!*\
  !*** ./module/about.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const api = __webpack_require__(/*! ./api.json */ "./module/api.json");

/**
 * @module about 关于插件模块
 * @description Show "What is" modal box of IPE2
 */
var about = function () {
  ssi_modal.show({
    title: _msg('preference-about-label'),
    className: 'in-page-edit in-page-edit-about',
    content: $('<section>').append(
      $('<iframe>', { style: 'margin: 0;padding: 0;width: 100%;height: 80vh;border: 0;', src: api.aboutUrl })
    )
  });
}

module.exports = {
  about
}

/***/ }),

/***/ "./module/api.json":
/*!*************************!*\
  !*** ./module/api.json ***!
  \*************************/
/*! exports provided: aboutUrl, analysis, analysisUrl, githubLink, specialNotice, updatelogsUrl, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"aboutUrl\":\"https://ipe.netlify.app/\",\"analysis\":\"https://doc.wjghj.cn/inpageedit-v2/analysis/api/index.php\",\"analysisUrl\":\"https://dragon-fish.github.io/inpageedit-v2/analysis/\",\"githubLink\":\"https://github.com/Dragon-Fish/InPageEdit-v2\",\"specialNotice\":\"https://wjghj.fast.io/InPageEdit/specialNotice.json\",\"updatelogsUrl\":\"https://ipe.netlify.app/update/\"}");

/***/ }),

/***/ "./module/articleLink.js":
/*!*******************************!*\
  !*** ./module/articleLink.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var config = mw.config.get();
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const { pluginPreference } = __webpack_require__(/*! ./pluginPreference */ "./module/pluginPreference.js");
const { quickEdit } = __webpack_require__(/*! ./quickEdit */ "./module/quickEdit.js");

/**
 * @module articleLink 获取段落编辑以及编辑链接
 * @param {Element} element jQuery element to find edit links
 */
var articleLink = function (element) {
  if (element === undefined) {
    if (pluginPreference.get('redLinkQuickEdit') === true) {
      element = $('#mw-content-text a');
    } else {
      element = $('#mw-content-text a:not(.new)');
    }
  }
  element.each(() => {
    if ($(this).attr('href') === undefined)
      return;
    var url = $(this).attr('href'),
      action = mw.util.getParamValue('action', url) || mw.util.getParamValue('veaction', url),
      title = mw.util.getParamValue('title', url),
      section = mw.util.getParamValue('section', url).replace(/(T-)/ig, ''),
      revision = mw.util.getParamValue('oldid', url);

    // 不是本地编辑链接
    if (url.split('/')['2'] !== location.href.split('/')['2'] && url.substr(0, 1) !== '/')
      return;

    // 不是 index.php?title=FOO 形式的url
    if (title === null) {
      var splitStr = config.wgArticlePath.replace('$1', '');
      if (splitStr === '/') {
        splitStr = config.wgServer.substring(config.wgServer.length - 4) + '/';
      }
      title = url.split(splitStr).pop().split('?')['0'];
    }

    if (action === 'edit' && title !== undefined) {
      $(this).after(
        $('<span>', {
          'class': 'in-page-edit-article-link-group'
        }).append(
          $('<a>', {
            href: 'javascript:void(0)',
            class: 'in-page-edit-article-link',
            text: _msg('quick-edit')
          }).click(function () {
            var options = {};
            options.page = title;
            if (revision !== null) {
              options.revision = revision;
            } else if (section !== null) {
              options.section = section;
            }
            if (!config.wgIsArticle) options.reload = false;
            quickEdit(options);
          })
        )
      );
    }
  });
}

module.exports = {
  articleLink
}

/***/ }),

/***/ "./module/findAndReplace.js":
/*!**********************************!*\
  !*** ./module/findAndReplace.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { $br } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

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
    content:
      $('<div>', { class: 'module far-module' }).append(
        $('<div>', { class: 'module_content', id: 'findfielddiv' }).append(
          $('<section>').append(
            $('<h4>', { text: _msg('fAndR-find-text') }),
            $('<textarea>', { id: 'find_this', style: 'margin: 0', rows: 4 }),
            $('<h4>', { text: _msg('fAndR-replace-text') }),
            $('<textarea>', { id: 'replace_with', style: 'margin: 0', rows: 4 })
          ),
          $('<section>', { style: 'padding: 7px 0' }).append(
            $('<label>').append(
              $('<input>', { type: 'checkbox', id: 'globl', checked: '' }),
              $('<span>', { text: _msg('fAndR-globl') })
            ),
            $br,
            $('<label>').append(
              $('<input>', { type: 'checkbox', id: 'case_sen' }),
              $('<span>', { text: _msg('fAndR-case-sen') })
            ),
            $br,
            $('<label>').append(
              $('<input>', { type: 'checkbox', id: 'regex_search' }),
              $('<span>', { text: _msg('fAndR-enable-regex') })
            ),
          )
        )
      ),
    buttons: [
      {
        label: _msg('fAndR-button-undo'),
        className: 'btn btn-danger',
        method() {
          element.val(origin);
          ssi_modal.notify('info', {
            className: 'in-page-edit',
            title: _msg('notify-info'),
            content: _msg('notify-fAndR-undo')
          });
          // modal.close();
        }
      },
      {
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
          });
          // modal.close();
        }
      }
    ]
  });
}

module.exports = {
  findAndReplace
}

/***/ }),

/***/ "./module/loadQuickDiff.js":
/*!*********************************!*\
  !*** ./module/loadQuickDiff.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var config = mw.config.get();
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { _analysis } = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");

const { quickDiff } = __webpack_require__(/*! ./quickDiff */ "./module/quickDiff.js");

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
        quickDiff({ fromrev: oldid, toid: curid });
      } else if (diff === 'prev' || diff === 'next' || diff === 'cur') {
        quickDiff({ fromrev: oldid, torelative: diff });
      } else {
        quickDiff({ fromrev: oldid, torev: diff });
      }
    });
  }
  if ($('.mw-rcfilters-enabled').length > 0) {
    setInterval(addLink, 500);
    $('.mw-rcfilters-enabled').addClass('ipe-continuous-active');
  } else {
    addLink();
  }
  // 查看历史页面的比较按钮与快速编辑
  if (config.wgAction === 'history') {
    $('.historysubmit.mw-history-compareselectedversions-button').after(
      $('<button>').text(_msg('quick-diff')).click(function (e) {
        e.preventDefault();
        _analysis('quick_diff_history_page');
        var before = $('.selected.before').attr('data-mw-revid'),
          after = $('.selected.after').attr('data-mw-revid');
        quickDiff({ fromrev: after, torev: before });
      })
    );
    $('[data-mw-revid]').each(function () {
      var $this = $(this),
        oldid = $this.attr('data-mw-revid');
      $this.find('.mw-history-undo').after(
        $('<span>').html(' | <a class="in-page-edit-article-link" href="javascript:void(0);" onclick="InPageEdit.quickEdit({page:mw.config.get(\'wgPageName\'),revision:' + oldid + '});">' + _msg('quick-edit') + '</a>')
      );
    });
  }
}

module.exports = {
  loadQuickDiff
}

/***/ }),

/***/ "./module/pluginPreference.js":
/*!************************************!*\
  !*** ./module/pluginPreference.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var InPageEdit = window.InPageEdit || {};

const { _analysis } = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { $br, $hr } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

const api = __webpack_require__(/*! ./api.json */ "./module/api.json")
const version = __webpack_require__(/*! ./version */ "./module/version.js");

/**
 * @module preference 个人设置模块
 */
var pluginPreference = {
  /**
   * @name 预设值
   * @return {object}
   */
  "default": {
    doNotCollectMyInfo: false,
    doNotShowLocalWarn: false,
    editMinor: false,
    editSummary: _msg('preference-summary-default'),
    lockToolBox: false,
    redLinkQuickEdit: true,
    outSideClose: true,
    watchList: Boolean(mw.user.options.get('watchdefault'))
  },
  /**
   * @name 获取设置 
   * @description 合并保存在用户页的设置以及localStorage的设置，有容错机制
   * @param {string} setting 返回相应的设置，为空时返回全部设置
   * @return {object|string}
   */
  get: function (setting) {
    setting = setting || undefined;
    var local = localStorage.getItem('InPageEditPreference') || '{}';
    try {
      local = JSON.parse(local);
    } catch (e) {
      local = {};
    }
    if (typeof InPageEdit.myPreference === 'object') {
      local = $.extend({}, local, InPageEdit.myPreference);
    }
    var json = $.extend({}, pluginPreference.default, local);
    if (typeof (setting) === 'string' && setting !== '') {
      return json.setting ? json[setting] : null;
    } else {
      return json;
    }
  },
  /**
   * @name 保存设置
   * @param {Object|string} settingKey
   * @param {any} settingValue
   * @example 可以这样 pluginPreference.set({ key: 'value' }) 也可以 pluginPreference.set('key', 'value')
   */
  set: function (settingKey = {}, settingValue = undefined) {
    var options = {};
    if (typeof settingKey === 'string' && settingValue !== undefined) {
      options[settingKey] = settingValue;
    } else if (typeof settingKey === 'object') {
      options = settingKey;
    } else {
      return;
    }
    options = $.extend({}, pluginPreference.get(), options);
    options = JSON.stringify(options);
    localStorage.setItem('InPageEditPreference', options);
  },
  /**
   * @name 用户图形界面
   * @description 打开可视化设置窗口
   */
  modal: function () {
    // 防止多开设置页面
    if ($('#ipe-preference-form').length > 0) return;

    mw.hook('pluginPreference').fire();
    pluginPreference.set();
    var local = pluginPreference.get();
    _analysis('plugin_setting');

    ssi_modal.show({
      outSideClose: false,
      title: _msg('preference-title') + ' - ' + version,
      content:
        $('<section>', { id: 'ipe-preference-form', class: 'ipe-preference-form' }).append(
          $('<h4>', { text: _msg('preference-editor-label') }),
          $('<label>').append(
            $('<input>', { id: 'outSideClose', type: 'checkbox' }).prop('checked', local.outSideClose),
            $('<span>', { text: _msg('preference-outSideClose') })
          ),
          $br,
          $('<label>').append(
            $('<input>', { id: 'editMinor', type: 'checkbox' }).prop('checked', local.editMinor),
            $('<span>', { text: _msg('preference-setMinor') })
          ),
          $br,
          $('<h4>', { text: _msg('preference-summary-label') }),
          $('<label>', { for: 'editSummary', style: 'padding-left: 0; font-size: small', html: _msg('preference-editSummary') }),
          $br,
          $('<input>', { id: 'editSummary', style: 'width: 96%', value: local.editSummary, placeholder: 'Edit via InPageEdit, yeah~' }),
          $('<h4>', { text: _msg('preference-analysis-label') }),
          $('<span>', { style: 'font-size: small; line-height: 0.9em', html: _msg('preference-analysis-view', `[${api.analysisUrl} ${api.analysisUrl}]`) }),
          $('<h4>', { text: _msg('preference-about-label') }),
          $('<button>', { class: 'btn btn-secondary', onclick: "InPageEdit.about()", text: _msg('preference-aboutAndHelp') }),
          $('<button>', { class: 'btn btn-secondary', style: 'margin-left: 1em;', onclick: "InPageEdit.versionInfo()", text: _msg('preference-updatelog') }),
          $('<a>', { href: 'https://ipe.miraheze.org/wiki/', target: '_blank', style: 'margin-left: 1em;' }).append(
            $('<button>', { class: 'btn btn-secondary', text: _msg('preference-translate') })
          ),
          $('<a>', { href: 'https://discord.gg/VUVAh8w', target: '_blank', style: 'margin-left: 1em;' }).append(
            $('<button>', { class: 'btn btn-secondary', text: _msg('preference-discord') })
          ),
          $hr,
          $('<strong>', { style: 'font-size: small; line-height: 0.9em', text: _msg('preference-savelocal-label') }),
          $br,
          $('<span>', { style: 'font-size: small; line-height: 0.9em', text: _msg('preference-savelocal') }).append(
            $('<a>', { href: 'javascript:;', id: 'ipeSaveLocalShow', text: _msg('preference-savelocal-btn') }).click(function () {
              // 永久保存（本地用户页）
              ssi_modal.dialog({
                className: 'in-page-edit',
                center: true,
                title: _msg('preference-savelocal-popup-title'),
                content: '<section id="ipeSaveLocal">' + _msg('preference-savelocal-popup') + '<br/><textarea style="font-size: 12px; resize: none; width: 100%; height: 10em;" readonly></textarea><br/>' + _msg('preference-savelocal-popup-notice') + '</section>',
                okBtn: {
                  className: 'btn btn-primary btn-single',
                  label: _msg('ok')
                }
              });
              $('#ipeSaveLocal textarea').val('/** InPageEdit Preferences **/\nwindow.InPageEdit = window.InPageEdit || {}; // Keep this line\nInPageEdit.myPreference = ' + JSON.stringify($.extend({}, pluginPreference.get(), $('#ipe-preference-form').data()), null, 2));
            })
          )
        ),
      sizeClass: 'dialog',
      className: 'in-page-edit ipe-preference',
      center: true,
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
          }, (res) => {
            if (res) {
              pluginPreference.set(pluginPreference.default);
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
          pluginPreference.set($('#ipe-preference-form').data());
          modal.close();
        }
      }
      ],
      onShow: function () {
        function setData() {
          if (this.type === 'checkbox') {
            $('#ipe-preference-form').data(this.id, this.checked);
          } else if (this.type === 'text') {
            $('#ipe-preference-form').data(this.id, this.value);
          }
        }
        $('#ipe-preference-form input').each(setData).change(setData);

        if (typeof (InPageEdit.myPreference) !== 'undefined') {
          $('#ipe-preference-form input, .ipe-preference .ssi-modalBtn').attr({ 'disabled': 'disabled' });
          $('#ipe-preference-form').prepend(
            $('<p>', { class: 'has-local-warn', style: 'padding-left: 8px; border-left: 6px solid orange; font-size: small;', html: _msg('preference-savelocal-popup-haslocal') })
          );
        }
      }
    });
  }
}

module.exports = {
  pluginPreference
}

/***/ }),

/***/ "./module/pluginStore.js":
/*!*******************************!*\
  !*** ./module/pluginStore.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/********************************
 ********** 未完工的模块 **********
 ********************************/

const pluginsIndex = __webpack_require__(/*! ../plugins/index.json */ "./plugins/index.json");
const _dir = __webpack_require__(/*! ../method/_dir */ "./method/_dir.js");
const _msg = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

/**
 * @module pluginStore 加载InPageEdit插件
 */
var pluginStore = {
  /**
   * @module pluginStore.get 打开插件商店
   */
  get() {
    ssi_modal.show({
      className: 'in-page-edit plugins-store',
      sizeClass: 'dialog',
      center: true,
      title: _msg('plugins-store-title'),
      content: 'Under development...',
      buttons: [{
        label: _msg('ok'),
        className: 'btn btn-single',
        method(a, modal) {
          modal.close();
        }
      }]
    })
  },
  /**
   * @module pluginStore.load 载入插件
   * @param {String} name 
   */
  load(name) {
    if (pluginsIndex[name]) {
      mw.loader.load(_dir + '/plugins/' + name);
    } else {
      console.warn('[InPageEdit] 无法找到插件', name);
    }
  }
}

module.exports = {
  pluginStore
}

/***/ }),

/***/ "./module/progress.js":
/*!****************************!*\
  !*** ./module/progress.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const { $progress } = __webpack_require__(/*! ./_elements.js */ "./module/_elements.js");

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
      title = 'Loading...'
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
}

module.exports = {
  progress
}

/***/ }),

/***/ "./module/quickDelete.js":
/*!*******************************!*\
  !*** ./module/quickDelete.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mwApi = new mw.Api();
var config = mw.config.get();
const { _analysis } = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { _hasRight } = __webpack_require__(/*! ./_hasRight */ "./module/_hasRight.js");
const { $br } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

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
    content: $('<div>').append(
      $('<section>', { id: 'InPageEditDeletepage' }).append(
        $('<span>', { html: _msg('delete-reason', '<b>' + page.replace(/_/g, ' ') + '</b>') }),
        $br,
        $('<label>', { for: 'delete-reason', text: _msg('editSummary') }),
        $('<input>', { id: 'delete-reason', style: 'width:96%', onclick: "$(this).css('box-shadow', '')", value: givenReason })
      )
    ),
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
    buttons: [
      {
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
      }
    ]
  });
}

module.exports = {
  quickDelete
}

/***/ }),

/***/ "./module/quickDiff.js":
/*!*****************************!*\
  !*** ./module/quickDiff.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mwApi = new mw.Api();
var config = mw.config.get();

const { _analysis } = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

const { articleLink } = __webpack_require__(/*! ./articleLink */ "./module/articleLink.js");
const { $br, $progress } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

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
  var $modalTitle,
    $diffArea,
    $loading;
  if ($('.quick-diff').length > 0) {
    console.info('[InPageEdit] Quick diff 正在加载新内容');
    $modalTitle = $('.quick-diff .pageName');
    $diffArea = $('.quick-diff .diffArea');
    $loading = $('.quick-diff .ipe-progress');
    $modalTitle.text(_msg('diff-loading'));
    $diffArea.hide();
    $('.quick-diff').appendTo('body');
  } else {
    $modalTitle = $('<span>', { class: 'pageName', text: _msg('diff-loading') });
    $diffArea = $('<div>', { class: 'diffArea', style: 'display: none' });
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
        className: 'btn btn-secondary toDiffPage',
        method: function () {
          // ...
        }
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
  mwApi.post(param).then(function (data) {
    var diffTable = data.compare['*'];
    var toTitle;
    $loading.hide();
    if (param.pageName === undefined) {
      toTitle = data.compare.totitle;
    } else {
      toTitle = param.pageName;
    }
    var userLink = function (user) {
      return '<a class="diff-user" href="' + mw.util.getUrl('User:' + user) + '">' + user + '</a> (<a href="' + mw.util.getUrl('User_talk:' + user) + '">' + _msg('diff-usertalk') + '</a> | <a href="' + mw.util.getUrl('Special:Contributions/' + user) + '">' + _msg('diff-usercontrib') + '</a> | <a href="' + mw.util.getUrl('Special:Block/' + user) + '">' + _msg('diff-userblock') + '</a>)';
    }
    $modalTitle.html(_msg('diff-title') + ': <u>' + toTitle + '</u>');
    $diffArea.show().html('').append(
      $('<table>', { class: 'diff difftable' }).append(
        $('<colgroup>').append(
          $('<col>', { class: 'diff-marker' }),
          $('<col>', { class: 'diff-content' }),
          $('<col>', { class: 'diff-marker' }),
          $('<col>', { class: 'diff-content' })
        ),
        $('<tbody>').append(
          $('<tr>').append(
            $('<td>', { colspan: 2, class: 'diff-otitle' }).append(
              $('<a>', { href: config.wgScript + '?oldid=' + data.compare.fromrevid, text: data.compare.fromtitle }),
              ' (',
              $('<span>', { class: 'diff-version', text: _msg('diff-version') + data.compare.fromrevid }),
              ') (',
              $('<a>', { class: 'editLink', href: config.wgScript + '?action=edit&title=' + data.compare.fromtitle + '&oldid=' + data.compare.fromrevid, text: _msg('diff-edit') }),
              ')',
              $br,
              userLink(data.compare.fromuser),
              $br,
              ' (',
              $('<span>', { class: 'diff-comment', html: data.compare.fromparsedcomment }),
              ') ',
              $br,
              $('<a>', { class: 'prevVersion ipe-analysis-quick_diff_modalclick', href: 'javascript:void(0);', text: '←' + _msg('diff-prev') }).click(() => {
                quickDiff({
                  fromrev: data.compare.fromrevid,
                  torelative: 'prev'
                });
              })
            ),
            $('<td>', { colspan: 2, class: 'diff-ntitle' }).append(
              $('<a>', { href: config.wgScript + '?oldid=' + data.compare.torevid, text: data.compare.totitle }),
              ' (',
              $('<span>', { class: 'diff-version', text: _msg('diff-version') + data.compare.torevid }),
              ') (',
              $('<a>', { class: 'editLink', href: config.wgScript + '?action=edit&title=' + data.compare.totitle + '&oldid=' + data.compare.torevid, text: _msg('diff-edit') }),
              ')',
              $br,
              userLink(data.compare.touser),
              $br,
              ' (',
              $('<span>', { class: 'diff-comment', html: data.compare.toparsedcomment }),
              ') ',
              $br,
              $('<a>', { class: 'nextVersion ipe-analysis-quick_diff_modalclick', href: 'javascript:void(0);', text: _msg('diff-nextv') + '→' }).click(() => {
                _analysis('quick_diff_modalclick');
                quickDiff({
                  fromrev: data.compare.torevid,
                  torelative: 'next'
                });
              })
            )
          ),
          diffTable,
          $('<tr>', { class: 'diffSize', style: 'text-align: center' }).append(
            $('<td>', { colspan: '2', text: data.compare.fromsize + _msg('diff-bytes') }),
            $('<td>', { colspan: '2', text: data.compare.tosize + _msg('diff-bytes') })
          )
        )
      )
    );
    $('.quick-diff button.toDiffPage').click(function () {
      location.href = config.wgScript + '?oldid=' + data.compare.fromrevid + '&diff=' + data.compare.torevid;
    });
    articleLink($('.quick-diff .editLink'));
    if (param.isPreview === true) {
      $('.quick-diff button.toDiffPage').hide();
      $diffArea.find('.diff-otitle').html('<b>' + _msg('diff-title-original-content') + '</b>');
      $diffArea.find('.diff-ntitle').html('<b>' + _msg('diff-title-your-content') + '</b>');
    }
    if (data.compare.fromsize === undefined || data.compare.tosize === undefined) {
      $diffArea.find('.diffSize').hide();
    }
    // 无上一版本或下一版本
    if (data.compare.fromrevid === undefined && param.isPreview !== true) {
      $diffArea.find('.diff-otitle').html('<span class="noPrevVerson">' + data.warnings.compare['*'] + '</span>');
    } else if (data.compare.torevid === undefined && param.isPreview !== true) {
      $diffArea.find('.diff-ntitle').html('<span class="noNextVerson">' + data.warnings.compare['*'] + '</span>');
    }
    // GitHub@issue#5 修复被隐藏版本的问题
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
  }).fail(function (errorCode, feedback, errorThrown) {
    console.warn('[InPageEdit] 快速差异获取失败');
    $loading.hide();
    $diffArea.show().html(_msg('diff-error') + ': ' + errorThrown.error['info'] + '(<code>' + errorThrown.error['code'] + '</code>)');
  });
}

module.exports = {
  quickDiff
}

/***/ }),

/***/ "./module/quickEdit.js":
/*!*****************************!*\
  !*** ./module/quickEdit.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mwApi = new mw.Api();
var config = mw.config.get();

const { _analysis } = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { _hasRight } = __webpack_require__(/*! ./_hasRight */ "./module/_hasRight.js");

const { $br, $progress } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

const { findAndReplace } = __webpack_require__(/*! ./findAndReplace */ "./module/findAndReplace.js");
const { pluginPreference } = __webpack_require__(/*! ./pluginPreference */ "./module/pluginPreference.js");
const { progress } = __webpack_require__(/*! ./progress */ "./module/progress.js")
const { quickPreview } = __webpack_require__(/*! ./quickPreview */ "./module/quickPreview.js");
const { quickDiff } = __webpack_require__(/*! ./quickDiff */ "./module/quickDiff.js");

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
  mw.hook('InPageEdit.quickEdit').fire();
  /** 获取设定信息，设置缺省值 **/
  options = options || {};
  if (typeof options === 'string') {
    options = {
      page: options
    }
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
  }

  /** 获取用户设置 **/
  var preference = pluginPreference.get();

  /** 缓存时间戳 **/
  var date = new Date(),
    timestamp = date.getTime(),
    now = date.toUTCString();

  /** 将选项合并并标准化 **/
  options = $.extend({}, defaultOptions, options, preference);
  options.page = decodeURIComponent(options.page); // 解码网址 Unicode

  _analysis('quick_edit');

  if (options.revision !== null && options.revision !== '' && options.revision !== config.wgCurRevisionId) {
    ssi_modal.notify('warning', {
      className: 'in-page-edit',
      content: _msg('notify-editing-history'),
      title: _msg('notify-info')
    });
    delete options.jsonGet.page;
    options.jsonGet.oldid = options.revision;
    options.summaryRevision = '(' + _msg('editor-summary-rivision') + '[[Special:Diff/' + options.revision + ']])';
  } else {
    if (options.section !== null && options.section !== '') {
      options.jsonGet.section = options.section;
    }
  }

  // Debug
  console.time('[InPageEdit] 获取页面源代码');
  console.info('[InPageEdit] QuickEdit start with options:');
  console.table(options);

  // 显示主窗口
  ssi_modal.show({
    title: _msg('editor-title-editing') + ': <u class="editPage">' + options.page.replace(/_/g, ' ') + '</u>',
    content:
      $('<div>').append(
        $progress,
        $('<section>', { class: 'hideBeforeLoaded' }).append(
          // 编辑工具条
          $('<div>', { class: 'editTools' }).append(
            $('<div>', { class: 'btnGroup' }).append(
              $('<div>', { class: 'toolSelect' }).append(
                $('<div>', { class: 'label', text: _msg('editor-edittool-header') }),
                $('<ul>', { class: 'ul-list' }).append(
                  $('<li>', { class: 'editToolBtn', 'data-open': '\n== ', 'data-middle': _msg('editor-edittool-header-text'), 'data-close': ' ==\n', text: 'H2' }),
                  $('<li>', { class: 'editToolBtn', 'data-open': '\n=== ', 'data-middle': _msg('editor-edittool-header-text'), 'data-close': ' ===\n', text: 'H3' }),
                  $('<li>', { class: 'editToolBtn', 'data-open': '\n==== ', 'data-middle': _msg('editor-edittool-header-text'), 'data-close': ' ====\n', text: 'H4' }),
                  $('<li>', { class: 'editToolBtn', 'data-open': '\n===== ', 'data-middle': _msg('editor-edittool-header-text'), 'data-close': ' =====\n', text: 'H5' })
                )
              )
            ),
            $('<div>', { class: 'btnGroup' }).append(
              $('<span>', { class: 'label', text: '格式' }),
              $('<button>', { class: 'editToolBtn fa fa-bold btn', 'data-open': "'''", 'data-middle': _msg('editor-edittool-bold'), 'data-close': "'''" }),
              $('<button>', { class: 'editToolBtn fa fa-italic btn', 'data-open': "''", 'data-middle': _msg('editor-edittool-italic'), 'data-close': "''" }),
              $('<button>', { class: 'editToolBtn fa fa-list-ul btn', 'data-open': '\n* ', 'data-middle': _msg('editor-edittool-list-bulleted'), 'data-close': '\n' }),
              $('<button>', { class: 'editToolBtn fa fa-list-ol btn', 'data-open': '\n# ', 'data-middle': _msg('editor-edittool-list-numbered'), 'data-close': '\n' }),
              $('<button>', { class: 'editToolBtn fa fa-won btn', 'data-open': '<' + 'nowiki>', 'data-middle': _msg('editor-edittool-nowiki'), 'data-close': '</nowiki>' }),
              $('<button>', { class: 'editToolBtn fa fa-level-down fa-rotate-90 btn', 'data-open': '<br>\n', 'data-middle': '', 'data-close': '' })
            ),
            $('<div>', { class: 'btnGroup' }).append(
              $('<span>', { class: 'label', text: '插入' }),
              $('<button>', { class: 'editToolBtn fa fa-link btn', 'data-open': '[' + '[', 'data-middle': _msg('editor-edittool-internal-link'), 'data-close': ']]' }),
              $('<button>', { class: 'editToolBtn fa fa-file-image-o btn', 'data-open': '[' + '[File:', 'data-middle': 'Example.png', 'data-close': '|thumb]]' }),
              $('<button>', { class: 'editToolBtn btn', 'data-open': '\n<' + 'gallery>\n', 'data-middle': 'Example1.jpg|Description\nExample2.png|Description', 'data-close': '\n</gallery>\n', html: '<span class="fa-stack"><i class="fa fa-picture-o fa-stack-1x"></i><i class="fa fa-picture-o fa-stack-1x" style="left: 2px;top: 2px;text-shadow: 1px 1px 0 #fff;"></i></span>' })
            ),
            $('<div>', { class: 'btnGroup extra', style: 'display: none' }).append(
              $('<span>', { class: 'label', text: '自定义' })
            ),
            $('<div>', { class: 'btnGroup special-tools', style: 'float: right' }).append(
              $('<button>', { class: 'btn fa fa-search' }).click(function () {
                findAndReplace($('.ipe-editor.timestamp-' + timestamp + ' .editArea'));
              })
            )
          ),
          // 编辑框
          $('<textarea>', { class: 'editArea', style: 'margin-top: 0;' }),
          // 页面分析
          $('<div>', { class: 'editOptionsLabel hideBeforeLoaded' }).append(
            $('<aside>', { class: 'detailArea' }).append(
              $('<label>', { class: 'detailToggle', text: _msg('editor-detail-button-toggle') }),
              $('<div>', { class: 'detailBtnGroup' }).append(
                $('<a>', { href: 'javascript:;', class: 'detailBtn', id: 'showTemplates', text: _msg('editor-detail-button-templates') }),
                ' | ',
                $('<a>', { href: 'javascript:;', class: 'detailBtn', id: 'showImages', text: _msg('editor-detail-button-images') })
              )
            ),
            // 摘要&小编辑
            $('<label>', { for: 'editSummary', text: _msg('editSummary') }),
            $br,
            $('<input>', { class: 'editSummary', id: 'editSummary', placeholder: 'Edit via InPageEdit~', value: options.editSummary.replace(/\$oldid/ig, options.summaryRevision) }),
            $br,
            $('<label>').append(
              $('<input>', { type: 'checkbox', class: 'editMinor', id: 'editMinor', checked: options.editMinor }),
              $('<span>', { text: _msg('markAsMinor') })
            ),
            $br,
            $('<label>').append(
              $('<input>', { type: 'checkbox', class: 'reloadPage', id: 'reloadPage', checked: options.reload }),
              $('<span>', { text: _msg('editor-reload-page') })
            )
          )
        )
      ),
    outSideClose: options.outSideClose,
    className: 'in-page-edit ipe-editor timestamp-' + timestamp,
    sizeClass: 'large',

    /* 按钮 */
    buttons: [{
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
          },
        },
          function (result) {
            if (result) {
              var text = $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val(),
                minor = $('.ipe-editor.timestamp-' + timestamp + ' .editMinor').prop('checked'),
                section = options.section,
                summary = $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val();
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
      label: _msg('editor-button-preview'),
      className: 'btn btn-secondary leftBtn hideBeforeLoaded',
      method: function () {
        _analysis('preview_edit');
        var text = $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val();
        quickPreview({
          title: options.page,
          text: text,
          pst: true
        });
      }
    }, {
      label: _msg('editor-button-diff'),
      className: 'btn btn-secondary leftBtn hideBeforeLoaded diff-btn',
      method: function () {
        // ...
      }
    }, {
      label: _msg('cancel'),
      className: 'btn btn-danger',
      method: function (e, modal) {
        modal.close();
      }
    }
    ],

    /* 预加载 */
    beforeShow: function () {
      // 设置样式
      $('.ipe-editor.timestamp-' + timestamp + ' .hideBeforeLoaded').hide();
      $('.ipe-editor.timestamp-' + timestamp + ' .ipe-progress').css('margin', Number($(window).height() / 3 - 50) + 'px 0');
      $('.ipe-editor.timestamp-' + timestamp + ' .editArea').css('height', $(window).height() / 3 * 2 - 100);
      $('.ipe-editor.timestamp-' + timestamp + ' .editOptionsLabel').prependTo('.ipe-editor.timestamp-' + timestamp + ' .ssi-buttons');
      $('.ipe-editor.timestamp-' + timestamp + ' .leftBtn').appendTo('.ipe-editor.timestamp-' + timestamp + ' .ssi-leftButtons');
      $('.ipe-editor.timestamp-' + timestamp + ' .ssi-modalTitle').append(
        $('<a>', {
          class: 'showEditNotice',
          href: 'javascript:void(0);',
          html: '<i class="fa fa-info-circle"></i> ' + _msg('editor-has-editNotice'),
          style: 'display: none;'
        }).click(function () {
          ssi_modal.show({
            className: 'in-page-edit',
            center: true,
            title: _msg('editor-title-editNotice'),
            content: '<section class="editNotice">' + $('.ipe-editor.timestamp-' + timestamp).data('editNotice') + '</section>'
          });
        })
      );

      /** Edit-Tool 扩展 **/
      function insertText(strings, obj) {
        var textarea = obj || $('.in-page-edit.ipe-editor .editArea')[0],
          start = textarea.selectionStart,
          stop = textarea.selectionEnd,
          selectedText = textarea.value.slice(start, stop);
        textarea.value =
          textarea.value.slice(0, start) +
          (strings.open || '') +
          (selectedText || strings.middle || '') +
          (strings.close || '') +
          textarea.value.slice(stop);
        var selectStart = start + (strings.open.length || 0);
        textarea.setSelectionRange(selectStart, selectStart + (selectedText.length || strings.middle.length || 0));
        textarea.focus();
      }
      // 添加按钮
      function addBtn(open, middle, close, icon) {
        open = open || '';
        middle = middle || '';
        close = close || '';
        icon = 'fa-' + icon || false;
        $('.ipe-editor.timestamp-' + timestamp + ' .btnGroup.extra').append(
          $('<button>', { class: 'editToolBtn btn', 'data-open': open, 'data-middle': middle, 'data-close': close, html: `<i class="fa ${icon}"></i>` })
        );
      }
      // 用户自定义按钮
      if (InPageEdit.buttons) {
        var btns = InPageEdit.buttons;
        $('.ipe-editor.timestamp-' + timestamp + ' .btnGroup.extra').show();

        for (var i = 0; i < btns.length; i++) {
          var btn = btns[i];
          addBtn(btn.open, btn.middle, btn.close, btn.text);
        }
      }
      $('.ipe-editor.timestamp-' + timestamp + ' .editToolBtn').click(function (e) {
        e.preventDefault();
        var $this = $(this),
          $open = $this.attr('data-open') || '',
          $middle = $this.attr('data-middle') || '',
          $close = $this.attr('data-close') || '';
        insertText({
          open: $open,
          middle: $middle,
          close: $close
        }, $('.ipe-editor.timestamp-' + timestamp + ' .editArea')[0]);
      });
    },
    /**
  * @event onShow
  * @description 模态框显示后
  */
    onShow() {
      mw.hook('InPageEdit.quickEdit.modal').fire();
      // 绑定事件，在尝试离开页面时提示
      $('.ipe-editor.timestamp-' + timestamp + ' .editArea').change(function () {
        $(this).attr('data-modifiled', 'true');
        $(window).bind('beforeunload', function () {
          return _msg('window-leave-confirm');
        });
      });
      // 获取权限
      if (_hasRight('edit') === false) {
        ssi_modal.notify('dialog', {
          className: 'in-page-edit',
          position: 'center bottom',
          title: _msg('notify-no-right'),
          content: _msg('editor-no-right'),
          okBtn: {
            label: _msg('ok'),
            className: 'btn btn-primary',
            method: function (e, modal) {
              modal.close();
            }
          }
        });
        $('.ipe-editor.timestamp-' + timestamp + ' .save-btn').addClass('btn-danger');
      }

      // 解析页面内容
      mwApi.get(options.jsonGet).done(function (data) {
        console.timeEnd('[InPageEdit] 获取页面源代码');
        contentDone(data);
      }).fail(function (a, b, errorThrown) {
        console.timeEnd('[InPageEdit] 获取页面源代码');
        console.warn('[InPageEdit]警告：无法获取页面内容');
        var data = errorThrown;
        contentDone(data);
      });

      // 页面内容获取完毕，后续工作
      function contentDone(data) {
        options.pageDetail = data;

        if (data.error) {
          console.warn('[InPageEdit]警告：无法获取页面内容');
          options.editText = '<!-- ' + data.error.info + ' -->';
          options.pageId = -1;
          $('.ipe-editor.timestamp-' + timestamp + ' .detailArea').hide();
        } else {
          options.editText = data.parse.wikitext['*'];
          options.pageId = data.parse.pageid;
        }
        // 设定一堆子样式
        $('.ipe-editor.timestamp-' + timestamp + ' .ipe-progress').hide();
        $('.ipe-editor.timestamp-' + timestamp + ' .hideBeforeLoaded').fadeIn(500);
        $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val(options.editText + '\n');

        var summaryVal;
        if (options.section !== null) {
          summaryVal = $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val();
          summaryVal = summaryVal.replace(/\$section/ig, '/* ' + data.parse.sections[0].line + ' */');
          $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val(summaryVal);
          $('.ipe-editor.timestamp-' + timestamp + ' .editPage').after('<span class="editSection">→' + data.parse.sections[0].line + '</span>');
          options.jumpTo = '#' + data.parse.sections[0].anchor;
        } else {
          summaryVal = $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val();
          summaryVal = summaryVal.replace(/\$section/ig, '');
          $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val(summaryVal);
          options.jumpTo = '';
        }
        if (options.revision !== null && options.revision !== '' && options.revision !== config.wgCurRevisionId) {
          $('.ipe-editor.timestamp-' + timestamp + ' .editPage').after('<span class="editRevision">(' + _msg('editor-title-editRevision') + '：' + options.revision + ')</span>');
          $('.ipe-editor.timestamp-' + timestamp + ' .diff-btn').click(() => {
            _analysis('quick_diff_edit');
            var text = $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val();
            var diffJson = {
              fromrev: options.revision,
              totext: text,
              hideBtn: true,
              pageName: options.page,
              isPreview: true
            }
            if (options.section) {
              diffJson.fromsection = options.section;
            }
            quickDiff(diffJson);
          });
        } else {
          $('.ipe-editor.timestamp-' + timestamp + ' .diff-btn').attr('disabled', true);
        }

        // 获取页面基础信息
        console.time('[InPageEdit] 获取页面基础信息');
        var queryJson = {
          action: 'query',
          prop: 'revisions|info',
          inprop: 'protection',
          format: 'json'
        }
        if (options.pageId !== -1) {
          queryJson.pageids = options.pageId;
        } else {
          queryJson.titles = options.page;
        }
        mwApi.get(queryJson).done(function (data) {
          console.info('[InPageEdit] 获取页面基础信息成功');
          console.timeEnd('[InPageEdit] 获取页面基础信息');
          // 记录页面最后编辑时间，防止编辑冲突
          $('.ipe-editor.timestamp-' + timestamp).data('basetimestamp', data['query']['pages'][options.pageId].revisions ? data['query']['pages'][options.pageId]['revisions'][0]['timestamp'] : now);
          queryDone(data);
        }).fail(function (a, b, errorThrown) {
          var data = errorThrown;
          console.timeEnd('[InPageEdit] 获取页面基础信息');
          console.warn('[InPageEdit] 获取页面基础信息失败');
          $('.ipe-editor.timestamp-' + timestamp).data('basetimestamp', now);
          queryDone(data);
        });

        /** 页面保护等级和编辑提示等 **/
        function queryDone(data) {
          options.namespace = data.query.pages[options.pageId].ns; // 名字空间ID
          options.protection = data.query.pages[options.pageId]['protection'] || []; // 保护等级
          if (data.query.pages[options.pageId].revisions) {
            options.revision = data.query.pages[options.pageId]['revisions'][0]['revid']; // 版本号
          }

          // 使页面名标准化
          options.page = data.query.pages[options.pageId].title;
          $('.ipe-editor.timestamp-' + timestamp + ' .editPage').text(options.page);

          if (options.revision) {
            $('.ipe-editor.timestamp-' + timestamp + ' .diff-btn').attr('disabled', false).click(function () {
              _analysis('quick_diff_edit');
              var text = $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val();
              var diffJson = {
                fromrev: options.revision,
                totext: text,
                hideBtn: true,
                pageName: options.page,
                isPreview: true
              }
              if (options.section) {
                diffJson.fromsection = options.section;
              }
              quickDiff(diffJson);
            })
          }

          // 页面是否被保护
          if (options.protection.length > 0) {
            for (var i = 0; i < options.protection.length; i++) {
              if (options.protection[i].type === 'edit') {
                if (
                  (options.protection[i].level === 'autoconfirmed' && !_hasRight('autoconfirmed')) ||
                  (options.protection[i].level === 'sysop' && !_hasRight('editprotected')) ||
                  (config.wgNamespaceNumber === 8 && !_hasRight('editinterface'))
                ) {
                  ssi_modal.notify('dialog', {
                    className: 'in-page-edit',
                    position: 'center bottom',
                    title: _msg('notify-no-right'),
                    content: _msg('editor-no-right'),
                    okBtn: {
                      label: _msg('ok'),
                      className: 'btn btn-primary',
                      method: function (e, modal) {
                        modal.close();
                      }
                    }
                  });
                  $('.ipe-editor.timestamp-' + timestamp + ' .save-btn').addClass('btn-danger');
                }
              }
            }
          }

          // 获取编辑提示
          var namespaceNoticePage = 'Editnotice-' + options.namespace,
            pageNoticePage = namespaceNoticePage + '-' +
              options.page
                .replace(/_/, ' ') // 将页面名里的 _ 转换为空格
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
              var notice = $('.ipe-editor.timestamp-' + timestamp).data('editNotice') || '';
              notice += '\n' + options.editNotice;
              $('.ipe-editor.timestamp-' + timestamp).data('editNotice', notice);
              $('.ipe-editor.timestamp-' + timestamp + ' .showEditNotice').show();
            });
          });

        }
      }
    },

    /* 确认是否取消 */
    beforeClose: function (modal) {
      if ($('.ipe-editor.timestamp-' + timestamp + ' .editArea').attr('data-modifiled') !== 'true') {
        close();
        return;
      } else if ($('.ipe-editor.timestamp-' + timestamp + ' .editArea').attr('data-confirmclose') === 'true') {
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
      },
        function (result) {
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
  });

  // 页面详情模块
  $('.ipe-editor.timestamp-' + timestamp + ' .detailBtnGroup .detailBtn').click(function () {
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
          $('<li>').append(
            $('<a>', { href: mw.util.getUrl(templateName), target: '_blank', text: templateName }),
            ' (',
            $('<a>', { href: 'javascript:;', text: _msg('quick-edit'), class: 'quickEditTemplate', 'data-template-name': templateName }),
            ')'
          ).appendTo(content);
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
          $('<li>').append(
            $('<a>', { href: mw.util.getUrl('File:' + imageName), target: '_balnk', text: imageName }),
            ' (',
            $('<a>', { href: 'javascript:;', class: 'quickViewImage', text: _msg('editor-detail-images-quickview'), 'data-image-name': imageName }),
            ' | ',
            $('<a>', { href: config.wgScript + '?title=Special:Upload&wpDestFile=' + imageName + '&wpForReUpload=1', target: '_balnk', text: _msg('editor-detail-images-upload') }),
            ')'
          ).appendTo(content);
        }
        ssi_modal.show({
          className: 'in-page-edit quick-edit-detail',
          sizeClass: 'dialog',
          title: _msg('editor-detail-title-images'),
          content: content
        });
        break;
    }
    $('.in-page-edit.quick-edit-detail .quickEditTemplate').click(function () {
      _analysis('quick_edit_pagedetail_edit_template');
      var $this = $(this);
      var page = $this.attr('data-template-name');
      quickEdit({
        page: page
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
        content: $('<center>', { id: 'imageLayer' }).append(
          $progress
        ),
        buttons: [{
          label: _msg('editor-detail-images-upload'),
          className: 'btn btn-primary',
          method() {
            window.open(config.wgScript + '?title=Special:Upload&wpDestFile=' + imageName + '&wpForReUpload=1');
          }
        }, {
          label: _msg('close'),
          className: 'btn btn-secondary',
          method: function (a, modal) { modal.close() }
        }],
        onShow: function () {
          mwApi.get({
            action: 'query',
            format: 'json',
            prop: 'imageinfo',
            titles: 'File:' + imageName.replace(/file:/g, ''),
            iiprop: 'url'
          }).done(function (data) {
            $('.quick-view-image .ipe-progress').hide();
            $('.quick-view-image #imageLayer').append(
              $('<img>', { src: data.query.pages['-1'].imageinfo[0].url, class: 'loading', style: 'max-width: 80%; max-height: 60vh' })
            );
            $('.quick-view-image #imageLayer img').load(function () {
              $(this).removeClass('loading');
            });
          })
        }
      });
    });
  });

  // 发布编辑模块
  function postArticle(pValue, modal) {
    _analysis('quick_edit_save');
    progress(_msg('editor-title-saving'));
    options.jsonPost = {
      action: 'edit',
      basetimestamp: $('.ipe-editor.timestamp-' + timestamp).data('basetimestamp'),
      starttimestamp: now,
      text: pValue.text,
      title: pValue.page,
      minor: pValue.minor,
      summary: pValue.summary,
      errorformat: 'plaintext'
    }
    if (pValue.section !== undefined && pValue.section !== '' && pValue.section !== null) {
      options.jsonPost.section = pValue.section;
      delete options.jsonPost.basetimestamp;
    }

    mwApi.postWithToken('csrf', options.jsonPost).done(saveSuccess).fail(saveError);

    // 保存正常
    function saveSuccess(data, feedback, errorThrown) {
      if (data.edit.result === 'Success') {
        progress(true);
        // 是否重载页面
        if ($('.ipe-editor.timestamp-' + timestamp + ' .reloadPage').prop('checked')) {
          var content;
          $(window).unbind('beforeunload');
          content = _msg('notify-save-success');
          setTimeout(function () {
            if (pValue.page === config.wgPageName) {
              window.location = mw.util.getUrl(pValue.page) + options.jumpTo;
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
            $('.ipe-editor.timestamp-' + timestamp + ' .editArea').attr('data-confirmclose', 'true');
            modal.close();
          }, 1500);
        }

        ssi_modal.notify('success', {
          className: 'in-page-edit',
          position: 'right top',
          title: _msg('notify-success'),
          content: content
        });
      } else {
        saveError(data, feedback, errorThrown)
      }
    }

    // 保存失败
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
        errorMore = 'Please contact plug-in author or try again.'
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
}

module.exports = {
  quickEdit
}

/***/ }),

/***/ "./module/quickPreview.js":
/*!********************************!*\
  !*** ./module/quickPreview.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { $progress } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

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
  }
  var options = $.extend({}, defaultOptions, params);
  mw.hook('InPageEdit.quickPreview').fire();
  var timestamp = new Date().getTime();
  console.time('[InPageEdit] Request preview');
  ssi_modal.show({
    sizeClass: new RegExp(/dialog|small|smallToMedium|medium|mediumToLarge|large|full|auto/).test(modalSize) ? modalSize : 'large',
    center: Boolean(center),
    className: 'in-page-edit previewbox',
    title: _msg('preview-title'),
    content: $('<section>').append(
      $progress,
      $('<div>', { class: 'InPageEditPreview', 'data-timestamp': timestamp, style: 'display:none', text: _msg('preview-placeholder') })
    ),
    fixedHeight: true,
    fitScreen: true,
    buttons: [{ label: '', className: 'hideThisBtn' }],
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
}

module.exports = {
  quickPreview
}

/***/ }),

/***/ "./module/quickRedirect.js":
/*!*********************************!*\
  !*** ./module/quickRedirect.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mwApi = new mw.Api();
var config = mw.config.get();

const { _analysis } = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { $br, $progress } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

const { _resolveExists } = __webpack_require__(/*! ./_resolveExists */ "./module/_resolveExists.js");
const { pluginPreference } = __webpack_require__(/*! ./pluginPreference */ "./module/pluginPreference.js");

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
      minor: pluginPreference.get('editMinor'),
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
    content: $('<div>').append(
      $('<section>').append(
        $('<span>', { html: question }),
        $br,
        $('<input>', { id: 'redirect-page', style: 'width:96%' }).click(function () { $(this).css('box-shadow', '') }),
        $br,
        $('<label>', { for: 'redirect-reason', text: _msg('editSummary') }),
        $('<input>', { id: 'redirect-reason', style: 'width:96%' })
      ),
      $($progress).css('display', 'none')
    ),
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

        mwApi.postWithToken('csrf', json).done(successed).fail(failed);
        // 重定向成功
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
            setTimeout(function () { modal.close() }, 2000);
          }
        }
        // 重定向失败
        function failed(errorCode, errorThrown) {
          $('.in-page-edit.quick-redirect .ipe-progress').hide();
          $('.in-page-edit.quick-redirect section').show();
          $('.in-page-edit.quick-redirect .okBtn').attr('disabled', false);
          $('.in-page-edit.quick-redirect .ipe-progress').addClass('done');
          ssi_modal.notify('error', {
            className: 'in-page-edit',
            content: _msg('notify-redirect-error') + '<br>' + errorThrown.errors[0]['*'] + ' (<code>' + errorCode + '</code>)',
            title: _msg('notify-error')
          });
          // 如果是由于页面存在，给出解决方案
          if (errorCode === 'articleexists') {
            var fromPage,
              toPage;
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
    }
    ]
  });
}

module.exports = {
  quickRedirect
}

/***/ }),

/***/ "./module/quickRename.js":
/*!*******************************!*\
  !*** ./module/quickRename.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mwApi = new mw.Api();
var config = mw.config.get();

const { _analysis } = __webpack_require__(/*! ./_analysis */ "./module/_analysis.js");
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");
const { _hasRight } = __webpack_require__(/*! ./_hasRight */ "./module/_hasRight.js");
const { _resolveExists } = __webpack_require__(/*! ./_resolveExists */ "./module/_resolveExists.js");
const { $br } = __webpack_require__(/*! ./_elements */ "./module/_elements.js");

const { progress } = __webpack_require__(/*! ./progress */ "./module/progress.js");

/**
 * @module quickRename 快速重命名模块
 * @param {String} from
 * @param {String} to
 */
var quickRename = function (from, to) {
  mw.hook('InPageEdit.quickRename').fire();
  from = from || config.wgPageName;
  to = to || '';
  var reason,
    movetalk,
    movesubpages,
    noredirect;

  ssi_modal.show({
    outSideClose: false,
    className: 'in-page-edit quick-rename',
    center: true,
    sizeClass: 'dialog',
    title: _msg('rename-title'),
    content:
      $('<section>').append(
        $('<label>', { for: 'move-to', html: _msg('rename-moveTo', '<b>' + from.replace(/_/g, ' ') + '</b>') }),
        $br,
        $('<input>', { id: 'move-to', style: 'width:96%', onclick: "$(this).css('box-shadow','')" }),
        $br,
        $('<label>', { for: 'move-reason', text: _msg('editSummary') }),
        $br,
        $('<input>', { id: 'move-reason', style: 'width:96%' }),
        $br,
        $('<label>').append(
          $('<input>', { type: 'checkbox', id: 'movetalk', checked: 'checked' }),
          $('<span>', { text: _msg('rename-movetalk') })
        ),
        $br,
        $('<label>').append(
          $('<input>', { type: 'checkbox', id: 'movesubpages', checked: 'checked' }),
          $('<span>', { text: _msg('rename-movesubpages') })
        ),
        $br,

        $('<label>').append(
          $('<input>', { type: 'checkbox', id: 'noredirect' }),
          $('<span>', { text: _msg('rename-noredirect') })
        ),
      ),
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
          });
          // 如果原因是页面已存在，给出解决方案
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
}

module.exports = {
  quickRename
}

/***/ }),

/***/ "./module/specialNotice.js":
/*!*********************************!*\
  !*** ./module/specialNotice.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// const api = require('./api.json');
const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js")

/**
 * @module specialNotice 特别通知
 */
var specialNotice = function () {
  ssi_modal.notify('dialog', {
    className: 'in-page-edit ipe-special-notice',
    title: _msg('version-notice-title'),
    content: _msg('version-notice'),
    okBtn: {
      label: _msg('updatelog-dismiss'),
      className: 'btn btn-primary'
    }
  }, function (e, modal) {
    localStorage.setItem('InPageEditNoticeId', _msg('noticeid'));
    modal.close();
  });
}

module.exports = {
  specialNotice
}

/***/ }),

/***/ "./module/version.js":
/*!***************************!*\
  !*** ./module/version.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const version = __webpack_require__(/*! ../package.json */ "./package.json").version;

module.exports = version;

/***/ }),

/***/ "./module/versionInfo.js":
/*!*******************************!*\
  !*** ./module/versionInfo.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { _msg } = __webpack_require__(/*! ./_msg */ "./module/_msg.js");

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
    content: $('<section>').append(
      $('<iframe>', { style: 'margin: 0;padding: 0;width: 100%;height: 80vh;border: 0;', src: api.updatelogsUrl })
    ),
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
}

module.exports = {
  versionInfo
}

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, dependencies, devDependencies, scripts, repository, keywords, author, license, bugs, homepage, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"inpageedit-v2\",\"version\":\"14.0.0\",\"description\":\"A useful MediaWiki JavaScript Plugin written with jQuery\",\"main\":\"index.js\",\"dependencies\":{\"jquery\":\">1.9.x\",\"ssi-modal\":\"1.0.28\"},\"devDependencies\":{\"css-loader\":\"^4.2.2\",\"eslint\":\"^7.7.0\",\"file-loader\":\"^6.0.0\",\"style-loader\":\"^1.2.1\",\"webpack\":\"^4.44.1\",\"webpack-cli\":\"^3.3.12\"},\"scripts\":{\"build\":\"webpack && set MINIFY=1 && webpack\",\"dev\":\"webpack --watch --output-filename [name].test.js\",\"test\":\"eslint ./index.js ./module/*.js ./method/*.js\"},\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/Dragon-Fish/InPageEdit-v2.git\"},\"keywords\":[\"mediawiki\",\"mediawiki-gadget\",\"inpageedit\"],\"author\":\"Dragon Fish\",\"license\":\"GPL-3.0-or-later\",\"bugs\":{\"url\":\"https://github.com/Dragon-Fish/InPageEdit-v2/issues\"},\"homepage\":\"https://github.com/Dragon-Fish/InPageEdit-v2#readme\"}");

/***/ }),

/***/ "./plugins/index.json":
/*!****************************!*\
  !*** ./plugins/index.json ***!
  \****************************/
/*! exports provided: demo.js, toolbox.js, edit-any-page.js, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"demo.js\":{\"name\":\"Plugin Demo\",\"description\":\"A InPageEdit Plugin Demo\"},\"toolbox.js\":{\"name\":\"InPageEdit Toolbox\",\"author\":\"机智的小鱼君\",\"description\":\"[Official] Add a toolbox in the bottom-right corner of your screen. Let you quickly access frequently used IPE functions.\"},\"edit-any-page.js\":{\"name\":\"Edit any page\",\"author\":\"机智的小鱼君\",\"description\":\"Add a button into IPE Toolbox that let you edit any page any where\",\"dependency\":[\"toobox.js\"]}}");

/***/ })

/******/ });
//# sourceMappingURL=InPageEdit.js.map