/********************************
 ********** 未完工的模块 **********
 ********************************/

const { i18njs } = require('../method/i18njs');
const _dir = require('../method/_dir');
const version = require('./version');

/**
 * @module _msg
 * @param {String} msgKey 消息的键
 * @param  {...String} params 替代占位符的内容，可以解析简单的wikitext
 */
async function _msg(msgKey, ...params) {
  // return `(i18njs-${msgKey}${after})`;
  var i18n = await i18njs.loadMessages('InPageEdit', {
    noCache: Boolean(version !== localStorage.getItem('InPageEditVersion') || mw.util.getParamValue('i18n') === 'nocache')
  }, _dir + '/i18n/languages.json');
  return i18n.msg(msgKey, ...params).parse();
}

module.exports = {
  _msg
}