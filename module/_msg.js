var { i18njs } = require('../method/i18njs');
const _dir = require('../method/_dir');

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