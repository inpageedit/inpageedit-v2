import { useMwApi } from '../utils/mw'

import { _analysis } from './analytics'
import { _msg } from './i18n'
import { hasRight } from '../utils/hasRight'

import { $br, $progress } from '../components/_elements'

import { preference } from './preference'
import { progressOverlay } from './progress'
import { quickPreview } from './quickPreview'
import { quickDiff } from './quickDiff'
import { linksHere } from './linksHere'
import { WikiPage, WikiPageService } from '../models/WikiPage/index.js'

const mwApi = useMwApi()
const wikiPageService = new WikiPageService(mwApi)

export interface QuickEditOptions {
  pageName: string
  pageId: number | `${number}`
  revId: number | `${number}`
  section: number | `${number}` | 'new'
  reloadAfterSave: boolean
}

export async function quickEdit(payload: Partial<QuickEditOptions>) {
  const mwConf = mw.config.get()

  payload = {
    pageName: mwConf.wgPageName,
    pageId: mwConf.wgArticleId,
    revId: mwConf.wgCurRevisionId,
    reloadAfterSave: true,
    ...payload,
  }

  const $modalTitle = $('<span>', { class: 'quickEdit__modalTitle' })
  const $pageName = $('<u>', { class: 'quickEdit__pageName editPage' })
  const $sectionName = $('<span>', { class: 'quickEdit__sectionName' })
  $modalTitle.append(
    _msg('editor-title-editing') + ': ',
    $pageName,
    $sectionName
  )
  const setPageName = (name = '') => {
    $pageName.text(name.replace(/_/g, ' '))
  }
  const setSectionName = (name = '') => {
    $modalTitle.find('.seperator').remove()
    if (!name) {
      $sectionName.remove()
      return
    }
    $modalTitle.append(
      $('<span>', { class: 'seperator' }).text(' → '),
      $sectionName.text(name)
    )
  }

  /** @type {Promise<import('@/models/WikiPage').WikiPage>} */
  let wikiPagePromise: Promise<WikiPage>
  if (!isNaN(payload.revId as number)) {
    wikiPagePromise = wikiPageService.newFromRevision(
      +payload.revId!,
      payload.section
    )
  } else if (!isNaN(payload.pageId as number)) {
    wikiPagePromise = wikiPageService.newFromPageId(
      +payload.pageId!,
      payload.section
    )
  }
  //                  ↓ WTF, but it works
  if (!wikiPagePromise!) {
    wikiPagePromise = wikiPageService.newFromTitle(
      payload.pageName!,
      false,
      payload.section
    )
  }

  const modal = ssi_modal
    .createObject({
      title: $modalTitle,
      className: 'in-page-edit ipe-editor',
      sizeClass: 'large',
      outSideClose: !!preference.get('outSideClose'),
      content: $($progress).css({ margin: '30vh auto' }),
      buttons: [],
    })
    .init()

  modal.setButtons([
    {
      label: _msg('cancel'),
      className: 'btn btn-danger',
      side: 'right',
      method: function () {
        modal.close()
      },
    },
  ])

  modal.options.beforeShow = function () {
    if (payload.pageName) {
      setPageName(payload.pageName)
    }
    if (payload.section) {
      setSectionName(`§${payload.section}`)
    }
  }

  modal.options.onShow = async function (modal) {
    const wikiPage = await wikiPagePromise
    const oldContent = wikiPage.pageInfo.revisions?.[0]?.content || ''
    let sectionName = ''

    setPageName(wikiPage.pageInfo.title)
    if (typeof payload.section !== 'undefined') {
      if (payload.section === '0') {
        sectionName = '(top)'
      } else if (payload.section === 'new') {
        sectionName = '(new)'
      } else if (!isNaN(payload.section as number)) {
        const line1 = oldContent.trimStart().split('\n')[0]
        if (line1?.startsWith('=')) {
          sectionName = line1.replace(/^=+|=+$/g, '')
        }
      }
      setSectionName(sectionName)
    }

    // Editor
    const $editForm = $('<form>', { class: 'quickEdit__editForm' })
    const $textarea = $('<textarea>', {
      class: 'quickEdit__textarea editArea',
      id: 'quickEdit__textarea',
      name: 'wpTextbox1',
    })
    $textarea.val(wikiPage.pageInfo.revisions?.[0]?.content || '')
    const $optionsLabel = $('<div>', {
      class: 'editOptionsLabel',
    }).append(
      $('<section>', { class: 'detailArea' }).append(
        $('<label>', {
          class: 'detailToggle',
          text: _msg('editor-detail-button-toggle'),
        }),
        $('<div>', { class: 'detailBtnGroup' }).append(
          $('<a>', {
            href: 'javascript:;',
            class: 'detailBtn',
            id: 'showTemplates',
            text: _msg('editor-detail-button-templates'),
          }),
          ' | ',
          $('<a>', {
            href: 'javascript:;',
            class: 'detailBtn',
            id: 'showImages',
            text: _msg('editor-detail-button-files'),
          }),
          ' | ',
          $('<a>', {
            href: 'javascript:;',
            class: 'detailBtn',
            id: 'linksHereBtn',
            text: _msg('links-here'),
          }).on('click', function () {
            linksHere(wikiPage.pageInfo.title)
          })
        )
      ),
      // 摘要&小编辑
      $('<label>', { for: 'editSummary', text: _msg('editSummary') }),
      $br,
      $('<input>', {
        class: 'editSummary',
        id: 'editSummary',
        placeholder: 'Edit via InPageEdit~',
      }),
      $br,
      $('<label>').append(
        $('<input>', {
          type: 'checkbox',
          class: 'editMinor',
          id: 'editMinor',
          checked: !!preference.get('editMinor'),
        }),
        $('<span>', { text: _msg('markAsMinor') })
      ),
      ' ',
      /**
       * watchlist 选项处理逻辑：
       * - undefined 或 'preferences' 视为 preferences（默认），此时默认锁上 watchlist 复选框
       * - null, '' 或 'nochange' 视为 nochange，watchlist 复选框暂时锁上，待 API 请求返回后解锁并设置初始状态
       * - 其他真值视为 watch
       * - 其他假值视为 unwatch
       */
      $('<label>').append(
        $('<input>', {
          type: 'checkbox',
          class: 'watchList',
          id: 'watchList',
          checked: preference.get('watchList') === 'watch',
          disabled: ['nochange', 'preferences'].includes(
            preference.get('watchList') as string
          ),
        }),
        $('<span>', { text: _msg('watchThisPage') })
      ),
      ' ',
      $br,
      $('<label>').append(
        $('<input>', {
          type: 'checkbox',
          class: 'reloadPage',
          id: 'reloadPage',
          checked: payload.reloadAfterSave,
        }),
        $('<span>', { text: _msg('editor-reload-page') })
      )
    )
    if (
      ['nochange', 'preferences'].includes(
        preference.get('watchList') as string
      )
    ) {
      $optionsLabel
        .find('.watchList')
        .parent()
        .one('click', function (e) {
          e.preventDefault()
          $(this).removeAttr('title').children('input').prop('disabled', false)
        })
        .attr('title', _msg('unlockWatchList'))
    }

    // setup edit summary
    const $editSummary =
      $optionsLabel.find<HTMLInputElement>('input.editSummary')
    let summaryText = (preference.get('editSummary') as string) || ''
    if (payload.revId && payload.revId !== mw.config.get('wgCurRevisionId')) {
      summaryText = summaryText.replace(
        /\$oldid/gi,
        `(${_msg(
          'editor-summary-revision'
        )} [[Special:Permalink/${wikiPage.pageInfo.revisions?.[0]?.revid}]])`
      )
    } else {
      summaryText = summaryText.replace(/\$oldid/gi, '')
    }
    summaryText = summaryText.replace(/\$section/gi, sectionName)
    $editSummary.val(summaryText.trim())

    $editForm.append($textarea, $optionsLabel)

    modal.setContent($editForm)

    console.info(modal.get$window())
    // setup buttons
    modal.setButtons([
      {
        side: 'left',
        label: _msg('editor-button-save'),
        className: 'btn btn-primary save-btn',
        keyPress: 'ctrl-s',
        method(e, modal) {
          console.info('save')
        },
      },
      {
        side: 'left',
        label: _msg('editor-button-preview'),
        className: 'btn btn-secondary preview-btn',
        keyPress: 'ctrl-p',
        method(e, modal) {
          console.info('preview')
        },
      },
      {
        side: 'left',
        label: _msg('editor-button-diff'),
        className: 'btn btn-secondary diff-btn',
        method(e, modal) {
          console.info('diff')
        },
      },
    ])

    // fire hook
    mw.hook('InPageEdit.quickEdit').fire({
      $modal: modal,
      $modalWindow: modal.get$window(),
      $modalTitle: $modalTitle,
      $modalContent: modal.get$content(),
      $editArea: $textarea,
      $optionsLabel: $optionsLabel,
    })
  }

  console.info('quickEdit', payload, modal)

  return modal.show()
}
