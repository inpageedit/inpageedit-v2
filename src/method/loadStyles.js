const _dir = require("./_dir");

function loadStyles(purge) {

  // 放在越上面优先级越高
  const styleFiles = [
    // Default Skin
    '/src/skin/ipe-default.min.css',
    // ssi-modal Style
    '/src/ssi_modal/ssi-modal.min.css',
    // FontAwesome
    'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
  ];

  styleFiles.forEach(link => {
    if (/^https?:\/\//.test(link) !== true) {
      link = _dir + link;
    }
    if (purge) {
      link += '?timestamp' + new Date().getTime()
    }
    $('head').prepend(
      $('<link>', { href: link, rel: 'stylesheet', 'data-ipe': 'style' })
    );
  });
}

module.exports = {
  loadStyles
}