var config = mw.config.get();
const { _msg } = require('./_msg');

const { pluginPreference } = require('./pluginPreference');
const { quickEdit } = require('./quickEdit');

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