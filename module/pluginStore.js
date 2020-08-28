/********************************
 ********** 未完工的模块 **********
 ********************************/

const pluginsIndex = require('../plugins/index.json');
const _msg = require('./_msg');

var cdn = document.currentScript.src;
var thisScript = new RegExp('/dist/InPageEdit(.min)?.js$', 'i');
cdn = cdn.replace(thisScript, '');

/**
 * @module pluginStore 加载InPageEdit插件
 */
var pluginStore = {
  /**
   * @module pluginStore.get 打开插件商店
   */
  get() {
    ssi_modal.show({
      className: 'in-page-edit plugins-store',
      sizeClass: 'dialog',
      center: true,
      title: _msg('plugins-store-title'),
      content: 'Under development...',
      buttons: [{
        label: _msg('ok'),
        className: 'btn btn-single',
        method(a, modal) {
          modal.close();
        }
      }]
    })
  },
  /**
   * @module pluginStore.load 载入插件
   * @param {String} name 
   */
  load(name) {
    if (pluginsIndex[name]) {
      mw.loader.load(cdn + '/plugins/' + name);
    } else {
      console.warn('[InPageEdit] 无法找到插件', name);
    }
  }
}

module.exports = {
  pluginStore
}