var config = mw.config.get();
const { _msg } = require('./_msg');

const { preference } = require('./preference');
const { quickEdit } = require('./quickEdit');

function escapeRegExp(str) {
  return str.replace(/([\\{}()|.?*+\-^$[\]])/g, '\\$1');
}

function getParamValue(param, url) {
  var re = new RegExp('^[^#]*[&?]' + escapeRegExp(param) + '=([^&#]*)'),
    m = re.exec(url !== undefined ? url : location.href);
  if (m) {
    return decodeURIComponent(m[1].replace(/\+/g, '%20'));
  }
  return null;
}

/**
 * @module articleLink 获取段落编辑以及编辑链接
 * @param {Element} element jQuery element to find edit links
 */
var articleLink = function (element) {
  if (element === undefined) {
    if (preference.get('redLinkQuickEdit') === true) {
      element = $('#mw-content-text a');
    } else {
      element = $('#mw-content-text a:not(.new)');
    }
  }
  element.each(function () {
    if ($(this).attr('href') === undefined)
      return;
    var url = $(this).attr('href'),
      action = getParamValue('action', url) || getParamValue('veaction', url),
      title = getParamValue('title', url),
      section = getParamValue('section', url) ? getParamValue('section', url).replace(/T-/, '') : null,
      revision = getParamValue('oldid', url);

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