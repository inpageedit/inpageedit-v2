function loadStyles() {
  const cdn = 'https://cdn.jsdelivr.net/gh/dragon-fish/inpageedit-v2@master';

  // 放在越上面优先级越高
  const styleFiles = [
    // Default Skin
    '/src/skin/ipe-default.css',
    // ssi-modal Style
    '/src/ssi_modal/ssi-modal.css',
  ];

  styleFiles.forEach(link => {
    $('head').prepend(
      $('<link>', { href: cdn + link, rel: 'stylesheet', 'data-ipe': 'style' })
    );
  });
}

module.exports = {
  loadStyles
}