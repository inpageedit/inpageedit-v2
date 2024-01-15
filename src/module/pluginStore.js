// import _dir from '../method/_dir';
// import { _msg } from './_msg';
import { pluginCDN } from './endpoints'
import { preference } from './preference'
import { loadScript } from '../method/loadScript'

/**
 * @module pluginStore 加载InPageEdit插件
 */
export class pluginStore {
  /**
   * @module pluginStore.get 获取官方插件
   */
  static get() {
    return $.ajax({
      url: pluginCDN + '/index.json',
      dataType: 'json',
      crossDomain: true,
      cache: false,
    })
  }
  static saveCache(data) {
    var ipe = window.InPageEdit || {}
    ipe.cache = ipe.cache || {}
    ipe.cache.pluginList = data
    window.InPageEdit = ipe
  }
  static loadCache() {
    var ipe = window.InPageEdit || {}
    ipe.cache = ipe.cache || {}
    return ipe.cache.pluginList
  }
  /**
   * @module pluginStore.load 载入插件
   * @param {String} name
   */
  static load(name) {
    if (/^https?:\/\//.test(name)) {
      mw.loader.load(name, /\.css$/i.test(name) ? 'text/css' : undefined)
      console.info('[InPageEdit] 从远程加载非官方插件', name)
    } else {
      loadScript(pluginCDN + '/plugins/' + name).then(
        () => console.info('[InPageEdit] 插件 ' + name + ' 加载成功'),
        (err) => console.warn('[InPageEdit] 插件 ' + name + ' 加载失败', err)
      )
      console.info('[InPageEdit] 从官方插件商店加载插件', name)
    }
  }
  /**
   * @module pluginStore.initUserPlugin 初始化用户插件
   */
  static initUserPlugin() {
    var userPlugins = preference.get('plugins')
    if (typeof userPlugins === 'object' && userPlugins.length > 0) {
      $.each(userPlugins, (key, val) => {
        pluginStore.load(val)
      })
    }
  }
}
