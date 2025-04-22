// 导入常量
import _dir from '@/constants/_dir.js'
import version from '@/constants/version.js'
import { Endpoints } from '@/constants/endpoints.js'

// 导入控制器
import { loadScript } from './loadScript.js'
import { fetchMetadata } from './metadata.js'
import { loadStyles } from './loadStyles.js'
import { syncI18nData } from './syncI18nData.js'

// 导入模块
import { analytics } from '@/modules/analytics.js'
import { i18n } from '@/modules/i18n.js'
import { about } from '@/modules/about.js'
import { articleLink } from '@/modules/articleLink.js'
import { linksHere } from '@/modules/linksHere.js'
import { loadQuickDiff } from '@/modules/loadQuickDiff.js'
import { preference } from '@/modules/preference.js'
import { pluginStore } from '@/modules/pluginStore.js'
import { progressOverlay } from '@/modules/progress.js'
import { quickDelete } from '@/modules/quickDelete.js'
import { quickDiff } from '@/modules/quickDiff.js'
import { quickEdit } from '@/modules/quickEdit.js'
import { quickPreview } from '@/modules/quickPreview.js'
import { quickRedirect } from '@/modules/quickRedirect.js'
import { quickRename } from '@/modules/quickRename.js'
import { specialNotice } from '@/modules/specialNotice.js'
import { updateNotice } from '@/modules/updateNotice.js'
import { versionInfo } from '@/modules/versionInfo.js'

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
    loadScript(`${Endpoints.PLUGIN_CDN_BASE}/lib/ssi-modal/ssi-modal.js`),
    fetchMetadata(),
  ])

  mw.hook('InPageEdit.init.i18n').fire({ _msg: i18n, i18n })

  mw.hook('InPageEdit.init.modal').fire({ ssi_modal: window.ssi_modal })

  // 初始化前置模块
  preference.set()
  mw.hook('wikipage.content').add(loadQuickDiff)
  await $.ready
  articleLink(null)
  updateNotice()

  // !暂定，触发用户插件
  pluginStore.initUserPlugin()

  // 写入模块
  const core = {
    _dir,
    about,
    endpoints: Endpoints,
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
    _analytics: analytics, // 兼容旧版
    analytics,
    _msg: i18n, // 兼容旧版
    i18n,
    InPageEdit: core,
  })

  // 花里胡哨的加载提示
  ;(window as any)[''.concat('console')].info(
    '    ____      ____                   ______    ___ __ \n   /  _/___  / __ \\____ _____ ____  / ____/___/ (_) /_\n   / // __ \\/ /_/ / __ `/ __ `/ _ \\/ __/ / __  / / __/\n _/ // / / / ____/ /_/ / /_/ /  __/ /___/ /_/ / / /_  \n/___/_/ /_/_/    \\__,_/\\__, /\\___/_____/\\__,_/_/\\__/  \n                      /____/                v' +
      version
  )

  // 传回InPageEdit
  return core
}
