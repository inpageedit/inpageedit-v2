/**
 * @license GPL-3.0 GNU GENERAL PUBLIC LICENSE 3.0
 */
!(function () {
  // Get script URL
  var fileName = document.currentScript.src;
  var main = fileName.split('/');
  main.pop();
  main = main.join('/') + '/dist/InPageEdit.min.js';
  // Load main
  mw.loader.load(main);
  // Send notify
  console.warn('[InPageEdit] InPageEdit entry file has been modified. Please modify your calling URL after seeing this message.\n%c' + fileName + ' %c→ ' + main, 'text-decoration: line-through');
})();