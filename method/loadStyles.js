function loadStyles() {
  // const cdn = 'https://cdn.jsdelivr.net/gh/dragon-fish/inpageedit-v2@master';
  var cdn = document.currentScript.src;
  var thisScript = new RegExp('/dist/InPageEdit(.min)?.js$', 'i');
  cdn = cdn.replace(thisScript, '');

  // 放在越上面优先级越高
  const styleFiles = [
    // Default Skin
    '/src/skin/ipe-default.css',
    // ssi-modal Style
    '/src/ssi_modal/ssi-modal.css',
    // FontAwesome
    'https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css',
  ];

  styleFiles.forEach(link => {
    if (/^https?:\/\//.test(link) !== true) {
      link = cdn + link;
    }
    $('head').prepend(
      $('<link>', { href: link, rel: 'stylesheet', 'data-ipe': 'style' })
    );
  });
}

module.exports = {
  loadStyles
}