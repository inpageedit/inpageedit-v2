const __dir__ = require('./__dir__.js');

// 放在越上面优先级越高
const styleFiles = [
  // Default Skin
  '/src/skin/ipe-default.css',
  // ssi-modal Style
  '/src/ssi_modal/ssi-modal.css',
];

styleFiles.forEach(link => {
  $('head').prepend(
    $('<link>', { href: __dir__ + link, rel: 'stylesheet', 'data-ipe': 'style' })
  );
});