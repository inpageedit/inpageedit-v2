/********************************
 ********** 未完工的模块 **********
 ********************************/

const i18njs = window.i18njs;

/**
 * @module _msg
 * @param {String} msgKey 消息的键
 * @param  {...String} params 替代占位符的内容，可以解析简单的wikitext
 */
function _msg(msgKey, ...params) {
  i18njs.loadMessages('InPageEdit-v2').then(i18n => {
    return i18n.msg(msgKey, ...params).parse();
  });
}

module.exports = {
  _msg
}