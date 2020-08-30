const funcName = 'InPageEdit';
const userlang = mw.config.get('wgUserLanguage');
const i18nCache = localStorage.getItem('i18n-cache-' + funcName + '-content') || '{}';
const overrides = window.InPageEdit && window.InPageEdit.i18n;
const fallbacks = {
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
}

/**
 * @function toObject
 * @param {String} data 
 */
function toObject(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return {}
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
    // .replace(httpRgx, function (_match, before, href, after) {
    //   return before + makeLink(href, href, true, true) + after;
    // })
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
 * @module _msg
 * @param {String} msgKey 消息的键
 * @param  {String} args 替代占位符($1, $2...)的内容，可以解析简单的wikitext
 */
var _msg = function (msgKey, ...args) {
  // qqx
  if (userlang === 'qqx') {
    var after = '';
    if (args.length > 0) {
      after = ': ' + args.join(', ');
    }
    return `(${funcName.toLowerCase()}-${msgKey})${after}`;
  }
  // 获取 i18n 
  var messages = toObject(i18nCache);
  // 转换语言
  var lang;
  if (fallbacks[userlang]) lang = fallbacks[userlang];
  if (!(messages[lang] && messages[lang][msgKey])) lang = 'en';
  // 解析信息
  var msg;
  if (messages[lang][msgKey]) msg = messages[lang][msgKey];
  if (overrides[lang] && overrides[lang][msgKey]) msg = overrides[lang][msgKey];
  if (msg) {
    msg = handleArgs(msg, ...args);
    msg = parse(msg);
    return msg;
  } else {
    return `<${funcName.toLowerCase()}-${msgKey}>`;
  }
}

module.exports = {
  _msg
}