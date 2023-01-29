// 导入方法
const _dir = require('./_dir')
const { loadScript } = require('./loadScript')
const { initQueryData } = require('./initQueryData')
const { loadStyles } = require('./loadStyles')
const { updateNotice } = require('./updateNotice')
const { syncI18nData } = require('./syncI18nData')

const version = require('../module/version')
const { pluginCDN } = require('../module/api')

/**
 * @method initMain
 * @return {Object} InPageEdit
 */
module.exports = async function init() {
  mw.hook('InPageEdit.init.before').fire()
  await mw.loader.using(['mediawiki.api', 'mediawiki.util', 'mediawiki.user'])
  // 是否需要刷新缓存
  const noCache = !!(
    mw.util.getParamValue('ipedev', location.href) ||
    version !== localStorage.getItem('InPageEditVersion')
  )
  // 加载样式表
  loadStyles(noCache)
  // 等待前置项目
  await Promise.all([
    syncI18nData(noCache),
    loadScript(`${pluginCDN}/lib/ssi-modal/ssi-modal.js`),
    initQueryData(),
  ])

  mw.hook('InPageEdit.init.i18n').fire({ _msg: require('../module/_msg')._msg })

  mw.hook('InPageEdit.init.modal').fire({ ssi_modal: window.ssi_modal })

  // 导入全部模块
  const { _analytics: _analysis } = require('../module/_analytics')
  const { _msg } = require('../module/_msg')
  const { about } = require('../module/about')
  const api = require('../module/api')
  const { articleLink } = require('../module/articleLink')
  const { linksHere } = require('../module/linksHere')
  const { loadQuickDiff } = require('../module/loadQuickDiff')
  const { preference } = require('../module/preference')
  const { pluginStore } = require('../module/pluginStore')
  const { progress } = require('../module/progress')
  const { quickDelete } = require('../module/quickDelete')
  const { quickDiff } = require('../module/quickDiff')
  const { quickEdit } = require('../module/quickEdit')
  const { quickPreview } = require('../module/quickPreview')
  const { quickRedirect } = require('../module/quickRedirect')
  const { quickRename } = require('../module/quickRename')
  const { specialNotice } = require('../module/specialNotice')
  const { versionInfo } = require('../module/versionInfo')

  // 初始化前置模块
  preference.set()
  mw.hook('wikipage.content').add(loadQuickDiff)
  await $.ready
  articleLink()
  updateNotice()

  // !暂定，触发用户插件
  pluginStore.initUserPlugin()

  // 写入模块
  var InPageEdit = {
    _dir,
    about,
    api,
    articleLink,
    linksHere,
    loadQuickDiff,
    preference,
    progress,
    quickDelete,
    quickDiff,
    quickEdit,
    quickPreview,
    quickRedirect,
    quickRename,
    specialNotice,
    version,
    versionInfo,
    // 别名 Alias
    delete: quickDelete,
    diff: quickDiff,
    edit: quickEdit,
    preview: quickPreview,
    redirect: quickRedirect,
    quickMove: quickRename,
    rename: quickRename,
  }

  // 锁定重要变量
  const importantVariables = ['_dir', 'api', 'version']
  importantVariables.forEach((key) => {
    try {
      Object.freeze(InPageEdit[key])
    } catch (e) {
      // Do nothing
    }
  })

  // 触发钩子，传入上下文
  mw.hook('InPageEdit').fire({
    _analysis,
    _msg,
    InPageEdit,
  })

  // 花里胡哨的加载提示
  console.info(
    '    ____      ____                   ______    ___ __ \n   /  _/___  / __ \\____ _____ ____  / ____/___/ (_) /_\n   / // __ \\/ /_/ / __ `/ __ `/ _ \\/ __/ / __  / / __/\n _/ // / / / ____/ /_/ / /_/ /  __/ /___/ /_/ / / /_  \n/___/_/ /_/_/    \\__,_/\\__, /\\___/_____/\\__,_/_/\\__/  \n                      /____/                v' +
      version
  )

  // 传回InPageEdit
  return InPageEdit
}
