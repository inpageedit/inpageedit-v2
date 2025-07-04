import { useMwApi, mwConfig } from '../utils/mw'

import { _analysis } from './_analytics'
import { _msg } from './_msg'
import { hasRight } from '../utils/hasRight'

import { $br, $progress } from './_elements'

import { preference } from './preference'
import { progressOverlay } from './progress'
import { quickPreview } from './quickPreview'
import { quickDiff } from './quickDiff'
import { linksHere } from './linksHere'

/**
 * @module quickEdit 快速编辑模块
 * @param {{ page: string; revision?: number; section?: number; reload?: boolean; editText?: string }} options
 */
export function quickEdit(options) {
  const mwApi = useMwApi()

  /** 获取设定信息，设置缺省值 **/
  options = options || {}
  if (typeof options === 'string') {
    options = {
      page: options || mwConfig.wgPageName,
    }
  }
  var defaultOptions = {
    page: mwConfig.wgPageName,
    pageId: -1,
    revision: null,
    summaryRevision: '',
    section: null,
    editText: '',
    editMinor: false,
    editSummary: _msg('preference-summary-default'),
    editNotice: '',
    outSideClose: true,
    jsonGet: {
      action: 'parse',
      page: options.page || mwConfig.wgPageName,
      prop: 'wikitext|langlinks|categories|templates|images|sections',
      format: 'json',
    },
    jsonPost: {},
    pageDetail: {},
    jumpTo: '',
    reload: true,
    watchList: 'preferences',
  }

  /** 获取用户设置 **/
  var userPreference = preference.get()

  /** 缓存时间戳 **/
  var date = new Date(),
    timestamp = date.getTime(),
    now = date.toISOString()

  /** 将选项合并并标准化 **/
  options = $.extend({}, defaultOptions, userPreference, options)

  _analysis('quick_edit')

  if (options.revision && options.revision !== mwConfig.wgCurRevisionId) {
    ssi_modal.notify('warning', {
      className: 'in-page-edit',
      content: _msg('notify-editing-history'),
      title: _msg('notify-info'),
    })
    delete options.jsonGet.page
    options.jsonGet.oldid = options.revision
    options.summaryRevision = `(${_msg(
      'editor-summary-revision'
    )} [[Special:Permalink/${options.revision}]])`
  }
  if (options.section && options.section !== 'new') {
    options.jsonGet.section = options.section
  }
  if (options.section === 'new') {
    delete options.revision
  }

  // 模态框内部
  var $modalTitle = $('<span>').append(
    _msg('editor-title-editing') +
    ': <u class="editPage">' +
    options.page.replace(/_/g, ' ') +
    '</u>'
  )
  var $editArea = $('<textarea>', {
    class: 'editArea',
    style: 'margin-top: 0;',
  })
  var $optionsLabel = $('<div>', {
    class: 'editOptionsLabel hideBeforeLoaded',
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
          'data-page-name': options.page,
        }).on('click', function () {
          linksHere(options.page)
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
      value: options.editSummary.replace(/\$oldid/gi, options.summaryRevision),
    }),
    $br,
    $('<label>').append(
      $('<input>', {
        type: 'checkbox',
        class: 'editMinor',
        id: 'editMinor',
        checked: options.editMinor,
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
        checked: options.watchList === 'watch',
        disabled: ['nochange', 'preferences'].includes(options.watchList),
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
        checked: options.reload,
      }),
      $('<span>', { text: _msg('editor-reload-page') })
    )
  )
  if (['nochange', 'preferences'].includes(options.watchList)) {
    $optionsLabel
      .find('.watchList')
      .parent()
      .one('click', function (e) {
        e.preventDefault()
        $(this).removeAttr('title').children('input').prop('disabled', false)
      })
      .attr('title', _msg('unlockWatchList'))
  }
  var $newSectionTitleInput = $('<input>', {
    type: 'text',
    class: 'newSectionTitleInput',
    placeholder: _msg('editor-new-section'),
  })
  var $modalContent = $('<div>').append(
    $progress,
    $('<section>', { class: 'hideBeforeLoaded' }).append(
      // 编辑框
      $editArea
    )
  )
  if (options.section === 'new') {
    $modalContent.prepend(
      $('<label>', { class: 'newSectionTitleArea' }).append(
        _msg('editor-new-section'),
        '<br>',
        $newSectionTitleInput
      )
    )
  }

  // Debug
  console.time('[InPageEdit] 获取页面源代码')
  console.info('[InPageEdit] QuickEdit options', options)

  // 显示主窗口
  ssi_modal.show({
    title: $modalTitle,
    content: $modalContent,
    outSideClose: options.outSideClose,
    className: 'in-page-edit ipe-editor timestamp-' + timestamp,
    sizeClass: 'large',

    /* 按钮 */
    buttons: [
      {
        side: 'left',
        label: _msg('editor-button-save'),
        className: 'btn btn-primary leftBtn hideBeforeLoaded save-btn',
        keyPress: 'ctrl-s',
        method(e, modal) {
          console.log({
            title: $newSectionTitleInput.val(),
            content: $editArea.val(),
          })
          if (
            options.section === 'new' &&
            (!$newSectionTitleInput.val().trim() || !$editArea.val().trim())
          ) {
            ssi_modal.notify('error', {
              className: 'in-page-edit',
              position: 'right top',
              closeAfter: {
                time: 15,
              },
              title: _msg('notify-error'),
              content: _msg('editor-new-section-missing-content'),
            })
            return
          }
          async function confirm(result) {
            if (result) {
              let summaryVal = $optionsLabel.find('.editSummary').val(),
                sectiontitle
              if (options.section === 'new') {
                sectiontitle = $newSectionTitleInput.val()
                const anchor = (
                  await mwApi.post({
                    action: 'parse',
                    text: `==${sectiontitle}==`,
                    contentmodel: 'wikitext',
                    prop: 'sections',
                    formatversion: 2,
                  })
                ).parse.sections[0].anchor
                summaryVal = summaryVal.replace(
                  /\$section/gi,
                  `/* ${anchor} */`
                )
              }
              const text = $editArea.val(),
                minor = $optionsLabel.find('.editMinor').prop('checked'),
                section = options.section,
                summary = summaryVal,
                isWatch = $optionsLabel.find('.watchList').prop('checked')
                  ? 'watch'
                  : 'unwatch',
                watchlist = $optionsLabel.find('.watchList').prop('disabled')
                  ? options.watchList
                  : isWatch
              postArticle(
                {
                  text,
                  page: options.page,
                  minor,
                  section,
                  sectiontitle,
                  summary,
                  watchlist,
                },
                modal
              )
            }
          }
          if (options.noConfirmEdit) {
            confirm(true)
          } else {
            ssi_modal.confirm(
              {
                className: 'in-page-edit',
                center: true,
                content: _msg('editor-confirm-save'),
                okBtn: {
                  className: 'btn btn-primary',
                  label: _msg('confirm'),
                },
                cancelBtn: {
                  className: 'btn btn-secondary',
                  label: _msg('cancel'),
                },
              },
              confirm
            )
          }
        },
      },
      {
        side: 'left',
        label: _msg('editor-button-preview'),
        className: 'btn btn-secondary leftBtn hideBeforeLoaded',
        method() {
          _analysis('preview_edit')
          var text = $editArea.val()
          quickPreview({
            title: options.page,
            text: text,
            pst: true,
            section: options.section === 'new' ? 'new' : undefined,
            sectiontitle:
              options.section === 'new'
                ? $newSectionTitleInput.val()
                : undefined,
          })
        },
      },
      {
        side: 'left',
        label: _msg('editor-button-diff'),
        className: 'btn btn-secondary leftBtn hideBeforeLoaded diff-btn',
      },
      {
        label: _msg('cancel'),
        className: 'btn btn-danger',
        method(e, modal) {
          modal.close()
        },
      },
    ],

    /* 预加载 */
    beforeShow($modal) {
      var $modalWindow = $('#' + $modal.modalId)
      // 设置样式
      $modalWindow.find('.hideBeforeLoaded').hide()
      $modalContent
        .find('.ipe-progress')
        .css('margin', Number($(window).height() / 3 - 50) + 'px 0')
      $editArea.css('height', ($(window).height() / 3) * 2 - 100)
      $modalWindow.find('.ssi-buttons').prepend($optionsLabel)
      $modalWindow.find('.ssi-modalTitle').append(
        $('<a>', {
          class: 'showEditNotice',
          href: 'javascript:void(0);',
          html:
            '<i class="fa"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-info-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" /></svg></i> ' +
            _msg('editor-has-editNotice'),
          style: 'display: none;',
        }).on('click', function () {
          ssi_modal.show({
            className: 'in-page-edit',
            center: true,
            title: _msg('editor-title-editNotice'),
            content:
              '<section class="editNotice">' +
              $modalContent.data('editNotice') +
              '</section>',
          })
        })
      )
    },
    /**
     * @event onShow
     * @description 模态框显示后
     */
    onShow($modal) {
      $modal.options.onShow = ''
      var $modalWindow = $('#' + $modal.modalId)
      mw.hook('InPageEdit.quickEdit').fire({
        $modal,
        $modalWindow,
        $modalTitle,
        $modalContent,
        $editArea,
        $optionsLabel,
      })
      // 绑定事件，在尝试离开页面时提示
      $editArea.change(function () {
        $(this).attr('data-modifiled', 'true')
        $(window).bind('beforeunload', function () {
          return _msg('window-leave-confirm')
        })
      })
      // 获取权限
      if (!hasRight('edit')) {
        ssi_modal.notify('dialog', {
          className: 'in-page-edit',
          position: 'center bottom',
          title: _msg('notify-no-right'),
          content: _msg('editor-no-right'),
          okBtn: {
            label: _msg('ok'),
            className: 'btn btn-primary',
            method(e, modal) {
              modal.close()
            },
          },
        })
        $modalWindow.find('.save-btn').addClass('btn-danger')
      }

      if (options.editText) {
        console.log("[InPageEdit] 使用 editText 传入值编辑")
        parseModal()
      }
      else {
        // 解析页面内容
        mwApi
          .get(options.jsonGet)
          .done(function (data) {
            console.timeEnd('[InPageEdit] 获取页面源代码')
            options.pageDetail = data
            options.editText =
              options.section === 'new' ? '' : data.parse.wikitext
            options.pageId = data.parse.pageid
            parseModal(data)
          })
          .fail(function (a, b, errorThrown) {
            console.timeEnd('[InPageEdit] 获取页面源代码')
            console.warn('[InPageEdit]警告：无法获取页面内容')
            var data = errorThrown
            options.pageDetail = data
            options.editText = '<!-- ' + data.error.info + ' -->'
            options.pageId = -1
            $optionsLabel.find('.detailArea').hide()
            parseModal(data)
          })
      }

      function parseModal() {
        // 设定一堆子样式
        $modalContent.find('.ipe-progress').hide()
        $modalWindow.find('.hideBeforeLoaded').fadeIn(500)
        $editArea.val(options.editText + '\n')

        var summaryVal
        if (options.section && options.section !== 'new') {
          summaryVal = $optionsLabel.find('.editSummary').val()
          summaryVal = summaryVal.replace(
            /\$section/gi,
            `/* ${options.pageDetail?.parse.sections[0].anchor} */`
          )
          $optionsLabel.find('.editSummary').val(summaryVal)
          $modalTitle
            .find('.editPage')
            .after(
              '<span class="editSection"> → ' +
              options.pageDetail?.parse.sections[0].line +
              '</span>'
            )
          options.jumpTo = '#' + options.pageDetail?.parse.sections[0].anchor
        } else if (options.section !== 'new') {
          summaryVal = $optionsLabel.find('.editSummary').val()
          summaryVal = summaryVal.replace(/\$section/gi, '')
          $optionsLabel.find('.editSummary').val(summaryVal)
          options.jumpTo = ''
        }
        if (
          options.revision !== null &&
          options.revision !== '' &&
          options.revision !== mwConfig.wgCurRevisionId &&
          options.section !== 'new'
        ) {
          $modalTitle
            .find('.editPage')
            .after(
              '<span class="editRevision">(' +
              _msg('editor-title-editRevision') +
              '：' +
              options.revision +
              ')</span>'
            )
          $modalWindow.find('.diff-btn').on('click', function () {
            _analysis('quick_diff_edit')
            var text = $editArea.val()
            var diffJson = {
              fromrev: options.revision,
              totext: text,
              hideBtn: true,
              pageName: options.page,
              isPreview: true,
            }
            if (options.section) {
              diffJson.fromsection = options.section
            }
            quickDiff(diffJson)
          })
        } else {
          $modalWindow.find('.diff-btn').attr('disabled', true)
        }

        // 获取页面基础信息
        console.time('[InPageEdit] 获取页面基础信息')
        var queryJson = {
          action: 'query',
          prop: 'revisions|info',
          inprop: 'protection|watched',
          format: 'json',
        }
        if (options.pageId !== -1) {
          queryJson.pageids = options.pageId
        } else {
          queryJson.titles = options.page
        }
        mwApi
          .get(queryJson)
          .done(function (data) {
            console.info('[InPageEdit] 获取页面基础信息成功')
            console.timeEnd('[InPageEdit] 获取页面基础信息')
            // 记录页面最后编辑时间，防止编辑冲突
            $modalContent.data(
              'basetimestamp',
              data['query']['pages']?.[0]?.['revisions']?.[0]?.['timestamp'] ??
              now
            )
            $modalContent.data(
              'starttimestamp',
              data['query']['pages']?.[0]?.touched,
              now
            )
            queryDone(data)
          })
          .fail(function (a, b, errorThrown) {
            var data = errorThrown
            console.timeEnd('[InPageEdit] 获取页面基础信息')
            console.warn('[InPageEdit] 获取页面基础信息失败')
            $modalContent.data('basetimestamp', now)
            $modalContent.data('starttimestamp', now)
            queryDone(data)
          })

        /** 页面保护等级和编辑提示等 **/
        function queryDone(data) {
          const pageData = data.query.pages[0]
          options.namespace = pageData?.ns ?? 0 // 名字空间ID
          options.protection = pageData?.['protection'] || [] // 保护等级
          options.revision = pageData?.['revisions']?.[0]?.['revid']

          // 使页面名标准化
          options.page = pageData.title
          $modalTitle.find('.editPage').text(options.page)

          if (options.watchList === 'nochange') {
            $optionsLabel
              .find('.watchList')
              .prop('disabled', false)
              .prop('checked', pageData.watched)
              .off('click')
              .removeAttr('title')
          }

          if (options.revision && options.section !== 'new') {
            $modalWindow
              .find('.diff-btn')
              .removeAttr('disabled')
              .on('click', function () {
                _analysis('quick_diff_edit')
                var text = $editArea.val()
                var diffJson = {
                  fromrev: options.revision,
                  totext: text,
                  hideBtn: true,
                  pageName: options.page,
                  isPreview: true,
                }
                if (options.section) {
                  diffJson.fromsection = options.section
                }
                quickDiff(diffJson)
              })
          }

          // 页面是否被保护
          if (options.protection.length > 0) {
            const isEditable = (level) => {
              if (!level) return true
              return hasRight(
                level
                  .replace('sysop', 'editprotected')
                  .replace('autoconfirmed', 'editsemiprotected')
              )
            }
            const protectionEdit = options.protection.find(
              ({ type }) => type === 'edit'
            )
            if (
              !isEditable(protectionEdit?.level) ||
              (options.namespace === 8 && !hasRight('editinterface'))
            ) {
              $modalWindow
                .find('.save-btn')
                .addClass('btn-danger')
                .attr('title', _msg('editor-no-right'))
            }
          }

          // 获取编辑提示
          const noticeKeyNS = 'Editnotice-' + options.namespace,
            noticeKeyCurPage =
              noticeKeyNS +
              '-' +
              options.page
                .replace(/_/g, ' ') // 将页面名里的 _ 转换为空格
                .replace(
                  mwConfig.wgFormattedNamespaces[options.namespace] + ':',
                  ''
                ) // 去掉名字空间

          mwApi
            .get({
              action: 'query',
              meta: 'allmessages',
              ammessages: [noticeKeyNS, noticeKeyCurPage],
              amenableparser: 1,
            })
            .done(function (data) {
              const wikitextNS = data.query.allmessages[0].content || '',
                wikitextPage = data.query.allmessages[1].content || '',
                fullWikitext = wikitextNS + '\n' + wikitextPage

              if (!fullWikitext.trim()) return

              mwApi
                .post({
                  action: 'parse',
                  text: fullWikitext,
                  title: options.page,
                  preview: true,
                  disablelimitreport: true,
                  disableeditsection: true,
                  disabletoc: true,
                })
                .then((data) => {
                  const html = data.parse.text
                  $modalContent.data('editNotice', html)
                  $modalWindow.find('.showEditNotice').show()
                })
            })
        }
      }
    },

    /* 确认是否取消 */
    beforeClose(modal) {
      if ($editArea.attr('data-modifiled') !== 'true') {
        close()
        return
      } else if ($editArea.attr('data-confirmclose') === 'true') {
        closeNoReload()
        return
      }
      ssi_modal.confirm(
        {
          className: 'in-page-edit',
          center: true,
          content: _msg('editor-leave-confirm'),
          okBtn: {
            className: 'btn btn-danger',
            label: _msg('confirm'),
          },
          cancelBtn: {
            className: 'btn btn-secondary',
            label: _msg('cancel'),
          },
        },
        function (result) {
          if (result === true) {
            close()
          }
        }
      )
      function close() {
        $(window).off('beforeunload')
        modal.options.keepContent = false
        modal.options.beforeClose = ''
        modal.close()
        ssi_modal.notify('info', {
          className: 'in-page-edit',
          position: 'right top',
          title: _msg('cancel'),
          content: _msg('notify-no-change'),
        })
      }
      function closeNoReload() {
        $(window).off('beforeunload')
        modal.options.keepContent = false
        modal.options.beforeClose = ''
        modal.close()
      }
      return false
    },
  })

  // 页面详情模块
  $optionsLabel.find('.detailBtnGroup .detailBtn').on('click', function () {
    _analysis('quick_edit_pagedetail')
    var $this = $(this),
      id = $this.attr('id'),
      content = $('<ul>')
    switch (id) {
      case 'showTemplates': {
        const templates = options.pageDetail.parse.templates
        console.info('[InPageEdit] QuickEdit', '模板列表', templates)
        for (let i = 0; i < templates.length; i++) {
          let templateName = templates[i].title
          $('<li>')
            .append(
              $('<a>', {
                href: mw.util.getUrl(templateName),
                rel: 'noopener',
                target: '_blank',
                text: templateName,
              }),
              ' (',
              $('<a>', {
                href: 'javascript:;',
                text: _msg('quick-edit'),
                class: 'quickEditTemplate',
                'data-template-name': templateName,
              }),
              ' | ',
              $('<a>', {
                href: 'javascript:;',
                text: _msg('links-here'),
                class: 'quickEditLinksHere',
              }).on('click', function () {
                linksHere(templateName)
              }),
              ')'
            )
            .appendTo(content)
        }
        ssi_modal.show({
          className: 'in-page-edit quick-edit-detail',
          sizeClass: 'dialog',
          title: _msg('editor-detail-title-templates'),
          content: content,
        })
        break
      }
      case 'showImages': {
        const images = options.pageDetail.parse.images
        for (let i = 0; i < images.length; i++) {
          const imageName = images[i]
          $('<li>')
            .append(
              $('<a>', {
                href: mw.util.getUrl('File:' + imageName),
                target: '_balnk',
                text: imageName,
              }),
              ' (',
              $('<a>', {
                href: 'javascript:;',
                class: 'quickViewImage',
                text: _msg('editor-detail-images-quickview'),
                'data-image-name': imageName,
              }),
              ' | ',
              $('<a>', {
                href:
                  mwConfig.wgScript +
                  '?title=Special:Upload&wpDestFile=' +
                  imageName +
                  '&wpForReUpload=1',
                target: '_balnk',
                text: _msg('editor-detail-images-upload'),
              }),
              '|',
              $('<a>', {
                href: 'javascript:;',
                text: _msg('links-here'),
                class: 'quickEditLinksHere',
              }).on('click', function () {
                linksHere(`File:${imageName}`)
              }),
              ')'
            )
            .appendTo(content)
        }
        ssi_modal.show({
          className: 'in-page-edit quick-edit-detail',
          sizeClass: 'dialog',
          title: _msg('editor-detail-title-files'),
          content,
        })
        break
      }
    }
    $('.in-page-edit.quick-edit-detail .quickEditTemplate').on(
      'click',
      function () {
        _analysis('quick_edit_pagedetail_edit_template')
        var $this = $(this)
        var page = $this.attr('data-template-name')
        quickEdit({
          page,
        })
      }
    )
    $('.in-page-edit.quick-edit-detail .quickViewImage').on(
      'click',
      function () {
        _analysis('quick_edit_pagedetail_view_image')
        var $this = $(this)
        var imageName = $this.attr('data-image-name')
        ssi_modal.show({
          className: 'in-page-edit quick-view-image',
          center: true,
          title: imageName.replace(/_/g, ' '),
          content: $('<center>', { id: 'imageLayer' }).append($progress),
          buttons: [
            {
              label: _msg('editor-detail-images-upload'),
              className: 'btn btn-primary',
              method() {
                window.open(
                  mw.util.getUrl('Special:Upload', {
                    wpDestFile: imageName,
                    wpForReUpload: 1,
                  })
                )
              },
            },
            {
              label: _msg('close'),
              className: 'btn btn-secondary',
              method(a, modal) {
                modal.close()
              },
            },
          ],
          onShow() {
            mwApi
              .get({
                action: 'query',
                format: 'json',
                prop: 'imageinfo',
                titles: `File:${imageName.replace(/file:/g, '')}`,
                iiprop: 'url',
              })
              .done(function (data) {
                $('.quick-view-image .ipe-progress').hide()
                $('.quick-view-image #imageLayer').append(
                  $('<img>', {
                    src: data.query.pages['-1'].imageinfo[0].url,
                    class: 'loading',
                    style: 'max-width: 80%; max-height: 60vh',
                  })
                )
                $('.quick-view-image #imageLayer img').load(function () {
                  $(this).removeClass('loading')
                })
              })
          },
        })
      }
    )
  })

  // 发布编辑模块
  function postArticle(
    { text, page, minor, summary, section, sectiontitle, watchlist },
    modal
  ) {
    _analysis('quick_edit_save')
    const { done: finishProgress, close: closeProgress } =
      progressOverlay(_msg('editor-title-saving'))
    options.jsonPost = {
      action: 'edit',
      starttimestamp: $modalContent.data('starttimestamp'),
      basetimestamp: $modalContent.data('basetimestamp'),
      text,
      title: page,
      watchlist,
      summary,
      errorformat: 'plaintext',
      ...(minor ? { minor: true } : { notminor: true }),
    }
    if (section !== undefined && section !== '' && section !== null) {
      options.jsonPost.section = section
    }
    if (sectiontitle !== undefined && sectiontitle !== '') {
      options.jsonPost.sectiontitle = sectiontitle
      options.jumpTo = '#' + sectiontitle
    }

    mwApi
      .postWithToken('csrf', options.jsonPost)
      .done(saveSuccess)
      .fail(saveError)

    // 保存正常
    function saveSuccess(data, feedback, errorThrown) {
      if (data.edit.result === 'Success') {
        finishProgress()
        // 是否重载页面
        if ($optionsLabel.find('.reloadPage').prop('checked')) {
          var content
          $(window).unbind('beforeunload')
          content = _msg('notify-save-success')
          setTimeout(function () {
            if (page === mwConfig.wgPageName) {
              window.location = mw.util.getUrl(page) + options.jumpTo
              window.location.reload()
            } else {
              window.location.reload()
            }
          }, 500)
        } else {
          console.info('[InPageEdit] 将不会重载页面！')
          content = _msg('notify-save-success-noreload')
          setTimeout(function () {
            closeProgress()
            $editArea.attr('data-confirmclose', 'true')
            modal.close()
          }, 1500)
        }

        ssi_modal.notify('success', {
          className: 'in-page-edit',
          position: 'right top',
          title: _msg('notify-success'),
          content,
        })
      } else {
        saveError(data, feedback, errorThrown)
      }
    }

    // 保存失败
    function saveError(errorCode, feedback, errorThrown) {
      closeProgress()
      var data = errorThrown || errorCode // 规范错误代码
      var errorInfo,
        errorMore = ''
      if (data.errors !== undefined) {
        errorCode = data.errors[0].code
        errorInfo = data.errors[0]['*']
        errorMore = ''
      } else if (data.edit.result !== 'Success') {
        errorCode = data.edit.code || 'Unknown'
        errorInfo = data.edit.info || 'Reason unknown.'
        errorMore = data.edit.warning || ''
      } else {
        errorCode = 'unknown'
        errorInfo = 'Reason unknown.'
        errorMore = 'Please contact plug-in author or try again.'
      }
      ssi_modal.show({
        className: 'in-page-edit',
        sizeClass: 'dialog',
        center: true,
        title: _msg('editor-save-error'),
        content: errorInfo + '<hr style="clear: both" />' + errorMore,
      })
      ssi_modal.notify('error', {
        className: 'in-page-edit',
        position: 'right top',
        closeAfter: {
          time: 15,
        },
        title: _msg('notify-error'),
        content: _msg('editor-save-error') + '：<code>' + errorCode + '</code>',
      })

      console.error('[InPageEdit] Submit failed: \nCode: ' + errorCode)
      return
    }
  }
}
