// 导入方法
import _dir from './_dir'
import { loadScript } from './loadScript'
import { initQueryData } from './initQueryData'
import { loadStyles } from './loadStyles'
import { syncI18nData } from './syncI18nData'

import version from '../module/version'
import { pluginCDN } from '../module/endpoints'

// 导入全部模块
import { _analytics } from '../module/_analytics'
import { _msg } from '../module/_msg'
import { about } from '../module/about'
import * as endpoints from '../module/endpoints'
import { articleLink } from '../module/articleLink'
import { linksHere } from '../module/linksHere'
import { loadQuickDiff } from '../module/loadQuickDiff'
import { preference } from '../module/preference'
import { pluginStore } from '../module/pluginStore'
import { progressOverlay } from '../module/progress'
import { quickDelete } from '../module/quickDelete'
import { quickDiff } from '../module/quickDiff'
import { quickEdit } from '../module/quickEdit'
import { quickPreview } from '../module/quickPreview'
import { quickRedirect } from '../module/quickRedirect'
import { quickRename } from '../module/quickRename'
import { specialNotice } from '../module/specialNotice'
import { updateNotice } from '../module/updateNotice'
import { versionInfo } from '../module/versionInfo'

/**
 * @method initMain
 * @return {Promise<Object>} InPageEdit
 */
export default async function init() {
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

  mw.hook('InPageEdit.init.i18n').fire({ _msg })

  mw.hook('InPageEdit.init.modal').fire({ ssi_modal: window.ssi_modal })

  // 初始化前置模块
  preference.set()
  mw.hook('wikipage.content').add(loadQuickDiff)
  await $.ready
  articleLink()
  updateNotice()

  // !暂定，触发用户插件
  pluginStore.initUserPlugin()

  // 写入模块
  const InPageEdit = {
    _dir,
    about,
    endpoints,
    articleLink,
    linksHere,
    loadQuickDiff,
    preference,
    progressOverlay,
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

  // 触发钩子，传入上下文
  mw.hook('InPageEdit').fire({
    _analytics,
    _msg,
    InPageEdit,
  })

  // 花里胡哨的加载提示
  window[''.concat('console')].info(
    '    ____      ____                   ______    ___ __ \n   /  _/___  / __ \\____ _____ ____  / ____/___/ (_) /_\n   / // __ \\/ /_/ / __ `/ __ `/ _ \\/ __/ / __  / / __/\n _/ // / / / ____/ /_/ / /_/ /  __/ /___/ /_/ / / /_  \n/___/_/ /_/_/    \\__,_/\\__, /\\___/_____/\\__,_/_/\\__/  \n                      /____/                v' +
      version
  )

  // 传回InPageEdit
  return InPageEdit
}
