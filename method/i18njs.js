/**
 * 还没改编完，要把 Dev Wiki 插件改造成 CommonJs 模块真尼玛要命
 */

/**
 * @name i18n-js Library for accessing i18n messages
 *
 * @author Cqm <https://dev.fandom.com/User:Cqm>
 * @author OneTwoThreeFall <https://dev.fandom.com/User:OneTwoThreeFall>
 * @author 机智的小鱼君 Dragon Fish
 *
 * @version 0.5.8
 *
 * @notes This library is adapted from Fandom Dev Wiki <https://dev.fandom.com>
 */

'use strict';

/**
 * Cache of mw config variables.
 */
var conf = mw.config.get([
  'debug',
  'wgContentLanguage',
  'wgUserLanguage'
]),

  /**
   * Current time in milliseconds, used to set and check cache age.
   */
  now = Date.now(),

  /**
   * Cache of loaded I18n instances.
   */
  cache = {},

  /**
   * Initial overrides object, initialised below with the i18n global variable.
   * Allows end-users to override specific messages. See documentation for how to use.
   */
  overrides = null,

  /**
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

/**
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

/**
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
function makeLink(href, text, hasProtocol) {
  text = text || href;
  href = hasProtocol ? href : mw.util.getUrl(href);

  text = mw.html.escape(text);
  href = mw.html.escape(href);

  return '<a href="' + href + '" title="' + text + '">' + text + '</a>';
}

/**
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

/**
 * Parse some basic wikitext into HTML. Also supports basic inline HTML tags.
 *
 * Will process:
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
      return makeLink(href, text, true);
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

/**
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

/**
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
    /**
     * Boolean representing whether the message exists.
     */
    exists: msg !== noMsg,

    /**
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

    /**
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

    /**
     * Escape any HTML in the message and return the result.
     *
     * @return The resulting string.
     */
    escape: function () {
      return mw.html.escape(msg);
    },

    /**
     * Return the message as is.
     *
     * @return The resulting string.
     */
    plain: function () {
      return msg;
    }
  };
}

/**
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
    /**
     * Set the default language.
     *
     * @param lang The language code to use by default.
     */
    useLang: function (lang) {
      defaultLang = lang;
    },

    /**
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

    /**
     * Set the default language to the content language.
     */
    useContentLang: function () {
      defaultLang = conf.wgContentLanguage;
    },

    /**
     * Set the language for the next `msg` call to the content language.
     *
     * @return The current object for use in chaining.
     */
    inContentLang: function () {
      tempLang = conf.wgContentLanguage;
      return this;
    },


    /**
     * Set the default language to the user's language.
     */
    useUserLang: function () {
      defaultLang = conf.wgUserLanguage;
    },

    /**
     * Set the language for the next msg call to the user's language.
     *
     * @return The current object for use in chaining.
     */
    inUserLang: function () {
      tempLang = conf.wgUserLanguage;
      return this;
    },

    /**
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

    /**
     * For accessing the raw messages.
     */
    _messages: messages
  };
}

/**
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

/**
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
    console.warn('[I18n-js] Failed to save i18n cache')
  }
}

/**
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

/**
 * Load messages string from local storage cache and add to cache object.
 *
 * @param name
 * @param minCacheVersion Minimum cache version requested by the loading script.
 */
function loadFromCache(name, minCacheVersion) {
  var keyPrefix = 'i18n-cache-' + name,
    cacheDelay = 1000 * 60 * 60 * 24 * 2, // 2 days
    cacheContent,
    cacheTimestamp,
    cacheVersion;

  try {
    cacheContent = localStorage.getItem(keyPrefix + '-content');
    cacheTimestamp = Number(localStorage.getItem(keyPrefix + '-timestamp'));
    cacheVersion = Number(localStorage.getItem(keyPrefix + '-version'));
  } catch (e) {
    console.warn('[I18n-js] Failed to load i18n from cache')
  }

  // only use cached messages if cache is less than two days old
  // and if cache version is greater than or equal to requested version
  if (
    cacheContent &&
    now - cacheTimestamp < cacheDelay &&
    cacheVersion >= minCacheVersion
  ) {
    parseMessagesToObject(name, cacheContent);
  }
}

/**
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
  } else {
    deferred.resolve(parseMessagesToObject(name, {}, cacheVersion));
  }

  return deferred;
}

// expose under the dev global
var i18njs = {
  loadMessages,

  // 'hidden' functions to allow testing
  _stripComments: stripComments,
  _saveToCache: saveToCache,
  _getMsg: getMsg,
  _handleArgs: handleArgs,
  _parse: parse,
  _markdown: markdown,
  _fallbacks: fallbacks
}

module.exports = {
  i18njs
}