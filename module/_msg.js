var i18n = window.InPageEdit.i18n;

/**
 * @module _msg
 * @param {String} msgKey 消息的键
 * @param  {...String} params 替代占位符的内容，可以解析简单的wikitext
 */
var _msg = async function (msgKey, ...params) {
  return i18n.msg(msgKey, ...params).parse();
}

module.exports = {
  _msg
}