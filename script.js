/**
 * @license GPL-3.0 GNU GENERAL PUBLIC LICENSE 3.0
 */
!(function () {
  try {
    null.split();
  } catch (error) {
    var fileName = error.fileName;
    var main = fileName.replace(/\/script(\.min)?\.js$/, '/dist/InPageEdit.min.js');
    // Load main
    mw.loader.load(main);
    // Send notify
    console.warn('[InPageEdit] InPageEdit entry file has been modified. Please modify your calling URL after seeing this message.\n%c' + fileName + ' %c→ https://cdn.jsdelivr.net/gh/dragon-fish/inpageedit-v2@master/dist/InPageEdit.min.js', 'text-decoration: line-through');
    // try {
    //   mw.notify('InPageEdit entry file has been modified. Please modify your calling URL after seeing this message.\n' + fileName + ' → https://cdn.jsdelivr.net/gh/dragon-fish/inpageedit-v2@master/dist/InPageEdit.min.js');
    // } catch (e) { }
  }
})();