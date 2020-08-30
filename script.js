/**
 * @license GPL-3.0 GNU GENERAL PUBLIC LICENSE 3.0
 */
!(function () {
  try {
    null.split();
  } catch (error) {
    var fileName = error.fileName;
    var main = fileName.split('/');
    main.pop();
    main = main.join('/') + '/dist/InPageEdit.min.js';
    // Load main
    mw.loader.load(main);
    // Send notify
    console.warn('[InPageEdit] InPageEdit entry file has been modified. Please modify your calling URL after seeing this message.\n%c' + fileName + ' %c→ ' + main, 'text-decoration: line-through');
  }
})();