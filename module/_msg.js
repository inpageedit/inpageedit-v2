/********************************
 ********** 未完工的模块 **********
 ********************************/

// const { i18n } = require('../method/i18njs');

/**
 * @module _msg
 * @param {String} msgKey 消息的键
 * @param  {...String} params 替代占位符的内容，可以解析简单的wikitext
 */
function _msg(msgKey, ...params) {
  var after = '';
  if (params.length > 0) {
    after = ': ' + params.join(', ')
  }
  return `(i18njs-${msgKey}${after})`;
  // return i18n.msg(msgKey,...params).parse();
}

module.exports = {
  _msg
}