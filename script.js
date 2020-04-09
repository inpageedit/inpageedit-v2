/**
 *『Wjghj Project Static』
 * This _JavaScript_ code is from https://common.wjghj.cn
 * GNU GENERAL PUBLIC LICENSE 3.0
 *
 * MediaWiki JS Plugin: In Page Edit
 * Version: See version-info file
 * Author: 机智的小鱼君
 * Url:
 ** https://github.com/Dragon-Fish/InPageEdit-v2
 ** https://common.wjghj.cn/wiki/InPageEdit-v2
 * Logs:
 ** https://common.wjghj.cn/wiki/InPageEdit-v2/version-info
 **/

(function () {
  'use strict';
  // 防止多次载入
  if (typeof InPageEdit !== 'undefined') throw '[InPageEdit] 已经有一个IPE插件在执行了。';
  // 由于兼容性问题，阻止低版本平台
  if (mw.config.get('wgVersion').split('.')[1] < 21) throw '[InPageEdit] 警告：InPageEdit暂不支持您所在的平台';

  // 创建全局函数
  window.InPageEdit = {};
  InPageEdit.isCanary = false;
  /*=version*/InPageEdit.version = '2.12.0.3(build_2629)';/*version=*/

  /** 导入模态框插件 **/
  mw.loader.load('https://cdn.bootcss.com/ssi-modal/1.0.27/js/ssi-modal.min.js');
  $('title').after('<link id="ssi-modal-style" rel="stylesheet" href="https://cdn.bootcss.com/ssi-modal/1.0.27/styles/ssi-modal.min.css"/>');

  /** 样式表 **/
  // 皮肤
  $('link#ssi-modal-style').after('<link rel="stylesheet" href="https://common.wjghj.cn/css/InPageEdit-v2"/>');
  // Material icons
  mw.loader.load('https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.min.css', 'text/css');

  /*** BOT FLAG ***/
  /** 导入 i18n 组件 **/
  mw.loader.load('https://common.wjghj.cn/js/i18n-js');
  mw.hook('dev.i18n').add(function (i18no) {
    i18no.loadMessages('InPageEdit-v2').then(init);
  });

  /** InPageEdit主框架 **/
  function init(i18n) {
    // i18n
    function msg(i) {
      return i18n.msg(i).parse();
    };
    /** HTML 组件 **/
    const $br = $('<br/>'),
      $clear = $('<div>', { style: 'clear:both' }),
      $hr = $('<hr/>'),
      $progress = $('<div>', { class: 'ipe-progress', style: 'width: 100%' }).append($('<div>', { class: 'ipe-progress-bar' }));

    /** 快速编辑模块 **/
    InPageEdit.edit = InPageEdit.quickEdit = function (option) {
      mw.hook('InPageEdit.quickEdit').fire();
      // 变量
      if (option === undefined)
        option = {};
      var preference = JSON.parse(localStorage.getItem('InPageEditPreference'));
      var editPage = decodeURIComponent(option.page),
        editSection = option.section,
        titleSection = '',
        editRevision = option.revision,
        titleRevision = '',
        summaryRevision = '',
        editText,
        editSummary = preference.editSummary,
        editMinor = preference.editMinor,
        editNotice = '',
        outSideClose = preference.outSideClose,
        jsonGet = {
          action: 'parse',
          page: editPage,
          prop: 'wikitext|langlinks|categories|templates|images|sections',
          format: 'json'
        },
        pageId,
        jsonPost = {},
        protection = '',
        pageDetail,
        basetimestamp,
        date = new Date(),
        timestamp = date.getTime(),
        now = date.toUTCString(); // 缓存时间戳

      InPageEdit.analysis({ type: 'functionCount', function: '快速编辑' });
      InPageEdit.analysis({ type: 'siteCount' });
      InPageEdit.analysis({ type: 'dateCount' });

      if (editPage === undefined) editPage = mw.config.get('wgPageName');
      if (editRevision !== undefined && editRevision !== '' && editRevision !== mw.config.get('wgCurRevisionId')) {
        ssi_modal.notify('warning', {
          className: 'in-page-edit',
          content: msg('notify-editing-history'),
          title: msg('notify-info')
        });
        delete jsonGet.page;
        jsonGet.oldid = editRevision;
        titleRevision = '<span style="font-size:small;">(' + msg('editor-title-editRevision') + '：' + editRevision + ')</span>';
        summaryRevision = '(' + msg('editor-summary-rivision') + '[[Special:Diff/' + editRevision + ']])';
      } else {
        if (editSection !== undefined && editSection !== '' && editSection !== null) {
          jsonGet.section = editSection;
          titleSection = msg('editor-title-editSection').replace('$1', editSection);
        }
      }
      if (typeof (MyInPageEditPreference) !== 'undefined') {
        if (typeof (MyInPageEditPreference.editSummary) === 'string')
          editSummary = MyInPageEditPreference.editSummary;
        if (typeof (MyInPageEditPreference.editMinor) === 'boolean')
          editMinor = MyInPageEditPreference.editMinor;
        if (typeof (MyInPageEditPreference.outSideClose) === 'boolean')
          outSideClose = MyInPageEditPreference.outSideClose;
      }

      // Debug
      console.time('[InPageEdit] 获取页面源代码');

      // 显示主窗口
      ssi_modal.show({
        title: msg('editor-title-editing') + ': <u class="editPage">' + editPage + '</u>' + titleSection + titleRevision,
        content: $('<div>').append(
          $progress,
          $('<section>', { class: 'editForm' }).append(
            $('<textarea>', { class: 'editArea' }),
            $('<div>', { class: 'editOptionsLabel editForm' }).append(
              $('<aside>', { class: 'detailArea' }).append(
                $('<label>', { class: 'detailToggle', text: msg('editor-detail-button-toggle') }),
                $('<div>', { class: 'detailBtnGroup' }).append(
                  $('<a>', { class: 'detailBtn', id: 'showTemplates', text: msg('editor-detail-button-templates') }),
                  $('<span>', { text: ' | ' }),
                  $('<a>', { class: 'detailBtn', id: 'showImages', text: msg('editor-detail-button-images') })
                )
              ),
              $('<label>', { for: 'editSummary', text: msg('editSummary') }),
              $br,
              $('<input>', { class: 'editSummary', id: 'editSummary', placeholder: 'Edit via InPageEdit~', value: editSummary.replace(/\$section/ig, $($.parseHTML(titleSection)).text()).replace(/\$oldid/ig, summaryRevision) }),
              $br,
              $('<input>', { type: 'checkbox', class: 'editMinor', id: 'editMinor', checked: editMinor }),
              $('<label>', { for: 'editMinor', text: msg('markAsMinor') })
            )
          )
        ).prop("outerHTML"),
        outSideClose: outSideClose,
        className: 'in-page-edit ipe-editor timestamp-' + timestamp,
        sizeClass: 'large',

        /* 按钮 */
        buttons: [{
          label: msg('editor-button-save'),
          className: 'btn btn-primary leftBtn editForm',
          method: function () {
            ssi_modal.confirm({
              className: 'in-page-edit',
              center: true,
              content: msg('editor-confirm-save'),
              okBtn: {
                className: 'btn btn-primary',
                label: msg('confirm')
              },
              cancelBtn: {
                className: 'btn btn-secondary',
                label: msg('cancel')
              },
            },
              function (result) {
                if (result) {
                  var text = $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val(),
                    minor = $('.ipe-editor.timestamp-' + timestamp + ' .editMinor').prop('checked'),
                    section = option.section,
                    summary = $('.ipe-editor.timestamp-' + timestamp + ' .editSummary').val();
                  postArticle({
                    text: text,
                    page: editPage,
                    minor: minor,
                    section: section,
                    summary: summary
                  });
                }
              })
          }
        }, {
          label: msg('editor-button-preview'),
          className: 'btn btn-secondary leftBtn editForm',
          method: function () {
            InPageEdit.analysis({ type: 'functionCount', function: 'previewEdit' });
            var text = $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val();
            InPageEdit.quickPreview({
              action: 'parse',
              title: editPage,
              text: text,
              prop: 'text',
              preview: true,
              format: 'json'
            });
          }
        }, {
          label: msg('editor-button-diff'),
          className: 'btn btn-secondary leftBtn editForm',
          method: function () {
            InPageEdit.analysis({ type: 'functionCount', function: '快速差异Edit' });
            var text = $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val();
            var diffJson = {};
            diffJson.fromtext = editText;
            diffJson.totext = text;
            diffJson.hideBtn = true;
            diffJson.pageName = editPage;
            diffJson.isPreview = true;
            InPageEdit.quickDiff(diffJson);
          }
        }, {
          label: msg('editor-button-findAndReplace'),
          className: 'btn btn-secondary leftBtn editForm',
          method: function () {
            InPageEdit.analysis({ type: 'functionCount', function: '查找替换' });
            InPageEdit.findAndReplace($('.ipe-editor.timestamp-' + timestamp + ' .editArea'));
          }
        }, {
          label: msg('cancel'),
          className: 'btn btn-danger',
          method: function (e, modal) {
            modal.close();
          }
        }
        ],

        /* 开始执行后续程序 */
        beforeShow: function () {
          // 设置样式
          $('.ipe-editor.timestamp-' + timestamp + ' .editForm').hide();
          $('.ipe-editor.timestamp-' + timestamp + ' .ipe-progress').css('margin', Number($(window).height() / 3 - 50) + 'px 0');
          $('.ipe-editor.timestamp-' + timestamp + ' .editArea').css('height', $(window).height() / 3 * 2 - 100);
          $('.ipe-editor.timestamp-' + timestamp + ' .editOptionsLabel').prependTo('.ipe-editor.timestamp-' + timestamp + ' .ssi-buttons');
          $('.ipe-editor.timestamp-' + timestamp + ' .leftBtn').appendTo('.ipe-editor.timestamp-' + timestamp + ' .ssi-leftButtons');
        },
        onShow: function (modal) {
          // 绑定事件，在尝试离开页面时提示
          $('.ipe-editor.timestamp-' + timestamp + ' .editArea').change(function () {
            $(this).attr('data-modifiled', 'true');
            $(window).bind('beforeunload', function () {
              return msg('window-leave-confirm');
            });
          });
          // 获取权限
          if (InPageEdit.hasRight('edit') === false) {
            ssi_modal.notify('dialog', {
              className: 'in-page-edit',
              position: 'center bottom',
              title: msg('notify-no-right'),
              content: msg('editor-no-right'),
              okBtn: {
                label: msg('ok'),
                className: 'btn btn-primary',
                method: function (e, modal) {
                  modal.close();
                }
              }
            });
            $('.ipe-editor.timestamp-' + timestamp + ' .editArea').attr('readonly', 'readonly');
            $('.ipe-editor.timestamp-' + timestamp + ' button.editForm').attr('disabled', 'disabled');
          }

          // 获取页面代码
          new mw.Api().get(jsonGet).then(function (data) {
            console.timeEnd('[InPageEdit] 获取页面源代码');
            nextStep(data);
          }).fail(function (a, b, errorThrown) {
            console.timeEnd('[InPageEdit] 获取页面源代码');
            console.warn('[InPageEdit]警告：无法获取页面内容');
            nextStep(errorThrown);
          });

          function nextStep(data) {
            pageDetail = data;

            if (data.error === undefined) {
              editText = data.parse.wikitext['*'];
              pageId = data.parse.pageid;
            } else {
              console.warn('[InPageEdit]警告：无法获取页面内容');
              editText = '<!-- ' + data.error.info + ' -->';
              pageId = false;
              $('.ipe-editor.timestamp-' + timestamp + ' .detailArea').hide();
            }
            $('.ipe-editor.timestamp-' + timestamp + ' .ipe-progress').hide();
            $('.ipe-editor.timestamp-' + timestamp + ' .editForm').fadeIn(500);
            $('.ipe-editor.timestamp-' + timestamp + ' .editArea').val(editText + '\n');

            if (pageId !== false) {
              console.time('[InPageEdit] 获取页面基础信息');
              new mw.Api().get({
                action: 'query',
                pageids: pageId,
                prop: 'revisions|info',
                inprop: 'protection',
                format: 'json'
              }).then(function (data) {
                console.timeEnd('[InPageEdit] 获取页面基础信息');
                console.info('[InPageEdit] 获取页面基础信息成功');
                $('.ipe-editor.timestamp-' + timestamp).attr('data-basetimestamp', data.query.pages[pageId].touched);
                var protection = data.query.pages[pageId].protection[0].level;
                if (
                  (protection === 'autoconfirmed' && !InPageEdit.hasRight('autoconfirmed')) ||
                  (protection === 'sysop' && !InPageEdit.hasRight('editprotected')) ||
                  (mw.config.get('wgNamespaceNumber') === 8 && !InPageEdit.hasRight('editinterface'))
                ) {
                  ssi_modal.notify('dialog', {
                    className: 'in-page-edit',
                    position: 'center bottom',
                    title: msg('notify-no-right'),
                    content: msg('editor-no-right'),
                    okBtn: {
                      label: msg('ok'),
                      className: 'btn btn-primary',
                      method: function (e, modal) {
                        modal.close();
                      }
                    }
                  });
                  $('.ipe-editor.timestamp-' + timestamp + ' .editArea').attr('readonly', 'readonly');
                  $('.ipe-editor.timestamp-' + timestamp + ' button.editForm').attr('disabled', 'disabled');
                }
              }).fail(function () {
                console.timeEnd('[InPageEdit] 获取页面基础信息');
                console.warn('[InPageEdit] 获取页面基础信息失败');
                $('.ipe-editor.timestamp-' + timestamp).attr('data-basetimestamp', now);
              });
            } else {
              $('.ipe-editor.timestamp-' + timestamp).attr('data-basetimestamp', now);
            }

            // 获取编辑提示
            $.get(mw.config.get('wgScript'), {
              action: 'raw',
              title: 'MediaWiki:Editnotice-' + mw.config.get('wgNamespaceNumber')
            }, function (data) {
              var lightParse = data
                .replace(/{{(PAGENAME|FULLPAGENAME|TALKPAGENAME|NAMESPACE|NAMESPACENUMBER)}}/g, '{{$1:' + editPage + '}}');
              new mw.Api().post({
                action: 'parse',
                // title: editPage.replace(/\.(js|css|json)/g, '@Dot@$1').replace(/\:/g, '@Colon@'),
                preview: true,
                text: lightParse
              }).then(function (data) {
                editNotice = '<section class="editNotice">' + data.parse.text['*'].replace(/\@Dot\@/g, '.').replace(/\@Colon\@/g, ':') + '</section>';
                $('.ipe-editor.timestamp-' + timestamp + ' .ssi-modalTitle').append(
                  $('<a>')
                    .attr({
                      id: 'showEditNotice',
                      href: 'javascript:;'
                    })
                    .click(function () {
                      ssi_modal.show({
                        className: 'in-page-edit',
                        center: true,
                        title: msg('editor-title-editNotice'),
                        content: editNotice
                      });
                    })
                    .html('<i class="material-icons">info</i> ' + msg('editor-has-editNotice'))
                );
              });
            });
          }
        },

        /* 确认是否取消 */
        beforeClose: function (modal) {
          if ($('.ipe-editor.timestamp-' + timestamp + ' .editArea').attr('data-modifiled') !== 'true') {
            modal.options.beforeClose = '';
            return;
          }
          ssi_modal.confirm({
            className: 'in-page-edit',
            center: true,
            content: msg('editor-leave-confirm'),
            okBtn: {
              className: 'btn btn-danger',
              label: msg('confirm')
            },
            cancelBtn: {
              className: 'btn btn-secondary',
              label: msg('cancel')
            }
          },
            function (result) {
              if (result === true) {
                $(window).unbind('beforeunload');
                modal.options.keepContent = false;
                modal.options.beforeClose = '';
                modal.close();
                ssi_modal.notify('info', {
                  className: 'in-page-edit',
                  position: 'right top',
                  title: msg('cancel'),
                  content: msg('notify-no-change')
                })
              }
            });
          return false;
        }
      });

      // 页面详情模块
      $('.ipe-editor.timestamp-' + timestamp + ' .detailBtnGroup .detailBtn').click(function () {
        var $this = $(this),
          id = $this.attr('id'),
          content = '';
        switch (id) {
          case 'showTemplates':
            var templates = pageDetail.parse.templates,
              templateName;
            for (var i = 0; i < templates.length; i++) {
              templateName = templates[i]['*'];
              content = content + '<li><a href="' + mw.util.getUrl(templateName) + '" target="_blank">' + templateName + '</a> (<a href="javascript:void(0);" onclick="InPageEdit.quickEdit({page:\'' + templateName + '\'});">' + msg('quick-edit') + '</a>)</li>';
            }
            ssi_modal.show({
              className: 'in-page-edit quick-edit-detail',
              sizeClass: 'dialog',
              title: msg('editor-detail-title-templates'),
              content: '<ul>' + content + '</ul>'
            });
            break;
          case 'showImages':
            var images = pageDetail.parse.images,
              imageName;
            for (var i = 0; i < images.length; i++) {
              imageName = images[i];
              content = content + '<li><a href="' + mw.util.getUrl('File:' + imageName) + '" target="_blank">' + imageName + '</a> (<a href="javascript:void(0);" class="quickViewImages" id="' + imageName + '">' + msg('editor-detail-images-quickview') + '</a> | <a href="' + mw.config.get('wgScript') + '?title=Special:Upload&wpDestFile=' + imageName + '&wpForReUpload=1" target="_blank">' + msg('editor-detail-images-upload') + '</a>)</li>';
            }
            ssi_modal.show({
              className: 'in-page-edit quick-edit-detail',
              sizeClass: 'dialog',
              title: msg('editor-detail-title-images'),
              content: '<ul>' + content + '</ul>'
            });
            $('.quickViewImages').click(function () {
              var $this = $(this),
                image = $this.attr('id');
              ssi_modal.show({
                className: 'in-page-edit quick-view-image',
                center: true,
                title: image,
                content: $('<center>').append(
                  $('<image>', { src: mw.config.get('wgScript') + '?title=Special:Filepath/' + image, style: 'max-width: 80%; max-height: 60vh' })
                ).prop('outerHTML'),
                buttons: [{
                  label: msg('editor-detail-images-upload'),
                  className: 'btn btn-primary',
                  method: function (a, modal) { window.open(mw.config.get('wgScript') + '?title=Special:Upload&wpDestFile=' + imageName + '&wpForReUpload=1') }
                }, {
                  label: msg('close'),
                  className: 'btn btn-secondary',
                  method: function (a, modal) { modal.close() }
                }]
              });
            });
            break;
        }
      });

      // 发布编辑模块
      function postArticle(pValue) {
        InPageEdit.analysis({ type: 'functionCount', function: '保存编辑' });
        InPageEdit.progress(msg('editor-title-saving'));
        jsonPost = {
          action: 'edit',
          basetimestamp: $('.ipe-editor.timestamp-' + timestamp).attr('data-basetimestamp'),
          starttimestamp: now,
          text: pValue.text,
          title: pValue.page,
          minor: pValue.minor,
          summary: pValue.summary,
          errorformat: 'plaintext'
        }
        if (pValue.section !== undefined && pValue.section !== '' && pValue.section !== null) {
          jsonPost.section = pValue.section;
          delete jsonPost.basetimestamp;
        }

        new mw.Api().postWithToken('csrf', jsonPost).then(function (data) {
          InPageEdit.progress(true);
          $(window).unbind('beforeunload');
          ssi_modal.notify('success', {
            className: 'in-page-edit',
            position: 'right top',
            title: msg('notify-success'),
            content: msg('notify-save-success')
          });
          setTimeout(function () {
            if (pValue.page === mw.config.get('wgPageName')) {
              window.location = mw.config.get('wgArticlePath').replace('$1', pValue.page);
            } else {
              window.location.reload();
            }
          }, 500);
        }).fail(function (errorCode, feedback, errorThrown) {
          InPageEdit.progress(false);
          ssi_modal.notify('error', {
            className: 'in-page-edit',
            position: 'right top',
            closeAfter: {
              time: 15
            },
            title: msg('notify-error'),
            content: msg('editor-save-error') + '：<br/><span style="font-size:amall">' + errorThrown.errors[0]['*'] + '(<code>' + errorThrown.errors[0]['code'] + '</code>)</span>'
          });
          console.error('[InPageEdit] Submit failed: \nCode: ' + errorThrown.errors[0]['code'] + '\nDescription: ' + errorThrown.errors[0]['*']);
        });
      }
    };

    /** 查找替换模块 **/
    InPageEdit.findAndReplace = function (contengut) {
      if (contengut === this.undefined) contengut = $('.in-page-edit.ipe-editor .editArea');
      var origin = contengut.val();

      ssi_modal.show({
        className: 'in-page-edit',
        sizeClass: 'dialog',
        center: true,
        outSideClose: false,
        // position: 'right bottom',
        title: msg('fAndR-title'),
        content:
          $('<div>', { class: 'module far-module' }).append(
            $('<div>', { class: 'module_content', id: 'findfielddiv' }).append(
              $('<section>').append(
                $('<h4>', { text: msg('fAndR-find-text') }),
                $('<textarea>', { id: 'find_this', style: 'margin: 0', rows: 4 }),
                $('<h4>', { text: msg('fAndR-replace-text') }),
                $('<textarea>', { id: 'replace_with', style: 'margin: 0', rows: 4 })
              ),
              $('<section>', { style: 'padding: 7px 0' }).append(
                $('<input>', { type: 'checkbox', id: 'globl', checked: '' }),
                $('<label>', { for: 'globl', text: msg('fAndR-globl') }),
                $br,
                $('<input>', { type: 'checkbox', id: 'case_sen' }),
                $('<label>', { for: 'case_sen', text: msg('fAndR-case-sen') }),
                $br,
                $('<input>', { type: 'checkbox', id: 'regex_search' }),
                $('<label>', { for: 'regex_search', text: msg('fAndR-enable-regex') })
              )
            )
          ).prop('outerHTML'),
        buttons: [
          {
            label: msg('fAndR-button-undo'),
            className: 'btn btn-danger',
            method: function (e, modal) {
              contengut.val(origin);
              ssi_modal.notify('info', {
                className: 'in-page-edit',
                title: msg('notify-info'),
                content: msg('notify-fAndR-undo')
              });
              // modal.close();
            }
          },
          {
            className: 'btn btn-primary',
            label: msg('fAndR-button-replace'),
            method: function (a, modal) {
              /**
               * 查找替换主函数
               * 借鉴：https://dev.fandom.com/wiki/MediaWiki:FindAndReplace/code.js
               **/
              if ($('#find_this').val() === '') return;
              var searchfor = '',
                searchexp,
                $textarea = contengut,
                replacewith = $('#replace_with').val().replace(/\r/gi, ''),
                text = $textarea.val().replace(/\r/gi, ''),
                flagg = 'g',
                flagi = 'i',
                enableregex = 0;

              if ($('#globl').prop('checked') === false) {
                flagg = '';
              }
              if ($('#case_sen').prop('checked') === true) {
                flagi = '';
              }
              if ($('#regex_search').prop('checked') === true) {
                enableregex = 1;
              }
              var flags = flagg + flagi + 'm';
              if (enableregex === 1) {
                searchfor = $('#find_this').val();
              } else {
                searchfor = $('#find_this').val().replace(/\r/gi, '').replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
              }
              searchexp = new RegExp(searchfor, flags);
              var rcount = 0;
              var matched = text.match(searchexp);
              if (matched !== null) {
                rcount = matched.length;
              }
              text = text.replace(searchexp, replacewith);
              $textarea.val(text);
              ssi_modal.notify('success', {
                className: 'in-page-edit',
                title: msg('notify-success'),
                content: msg('notify-fAndR-done').replace('$1', rcount)
              });
              // modal.close();
            }
          }
        ]
      });
    };

    /** 快速重定向模块 **/
    InPageEdit.redirect = InPageEdit.quickRedirect = function (type) {
      mw.hook('InPageEdit.quickRedirect').fire();
      var text = '#REDIRECT [[:$1]]',
        question,
        target,
        json = {
          action: 'edit',
          minor: JSON.parse(localStorage.getItem('InPageEditPreference')).editMinor,
          token: mw.user.tokens.get('editToken'),
          errorformat: 'plaintext'
        },
        summary;

      switch (type) {
        case 'to':
          json.title = mw.config.get('wgPageName');
          question = msg('redirect-question-to').replace('$1', '<b>' + mw.config.get('wgPageName') + '</b>');
          break;
        case 'from':
          question = msg('redirect-question-from').replace('$1', '<b>' + mw.config.get('wgPageName') + '</b>');
          json.text = text.replace('$1', mw.config.get('wgPageName'));
          break;
      }
      ssi_modal.show({
        outSideClose: false,
        className: 'in-page-edit quick-redirect',
        center: true,
        sizeClass: 'dialog',
        title: msg('redirect-title'),
        content: $('<div>').append(
          $('<section>').append(
            $('<span>', { html: question }),
            $br,
            $('<input>', { id: 'redirect-page', style: 'width:96%', onclick: "$(this).css('box-shadow', '')" }),
            $br,
            $('<label>', { for: 'redirect-reason', text: msg('editSummary') }),
            $('<input>', { id: 'redirect-reason', style: 'width:96%' })
          ),
          $progress.css('display', 'none')
        ).prop('outerHTML'),
        buttons: [{
          label: msg('confirm'),
          className: 'btn btn-primary btn-single okBtn',
          method: function (a, modal) {
            target = $('.in-page-edit.quick-redirect #redirect-page').val();
            if (target === '' || target === mw.config.get('wgPageName')) {
              $('.in-page-edit.quick-redirect #redirect-page').css('box-shadow', '0 0 4px #f00');
              return;
            }

            InPageEdit.analysis({ type: 'functionCount', function: '快速重定向' });
            InPageEdit.analysis({ type: 'dateCount' });
            InPageEdit.analysis({ type: 'siteCount' });

            summary = msg('redirect-summary') + ' → [[:' + target + ']]';
            if ($('.in-page-edit.quick-redirect #redirect-reason').val() !== '') {
              summary = summary + ' (' + $('.in-page-edit.quick-redirect #redirect-reason').val() + ')';
            }
            json.summary = summary;

            $('.in-page-edit.quick-redirect .ipe-progress').show();
            $('.in-page-edit.quick-redirect section').hide();
            $('.in-page-edit.quick-redirect .okBtn').attr('disabled', 'disabled');
            switch (type) {
              case 'to':
                json.text = text.replace('$1', target);
                break;
              case 'from':
                json.title = target;
                break;
            }

            new mw.Api().post(json).done(function () {
              $('.in-page-edit.quick-redirect .ipe-progress').addClass('done');
              ssi_modal.notify('success', {
                className: 'in-page-edit',
                content: msg('notify-redirect-success'),
                title: msg('notify-success')
              });
              if (type === 'to') {
                window.location.reload();
              } else {
                $('.in-page-edit.quick-redirect .ipe-progress').addClass('done');
                setTimeout(function () { modal.close() }, 2000);
              }
            }).fail(function () {
              $('.in-page-edit.quick-redirect .ipe-progress').hide();
              $('.in-page-edit.quick-redirect section').show();
              $('.in-page-edit.quick-redirect .okBtn').attr('disabled', false);
              $('.in-page-edit.quick-redirect .ipe-progress').addClass('done');
              ssi_modal.notify('error', {
                className: 'in-page-edit',
                content: msg('notify-redirect-error'),
                title: msg('notify-error')
              });
            });
          }
        }
        ]
      });
    };

    /** 删除页面模块 **/
    InPageEdit.deletepage = InPageEdit.quickDelete = function (page) {
      mw.hook('InPageEdit.quickDelete').fire();
      var reason,
        page = page || mw.config.get('wgPageName');

      ssi_modal.show({
        outSideClose: false,
        className: 'in-page-edit quick-delete',
        center: true,
        sizeClass: 'dialog',
        title: msg('delete-title'),
        content: $('<div>').append(
          $('<section>', { id: 'InPageEditDeletepage' }).append(
            $('<span>', { html: msg('delete-reason').replace('$1', '<b>' + page + '</b>') }),
            $br,
            $('<label>', { for: 'delete-reason', text: msg('editSummary') }),
            $('<input>', { id: 'delete-reason', style: 'width:96%', onclick: "$(this).css('box-shadow', '')" })
          )
        ).prop('outerHTML'),
        beforeShow: function () {
          if (!InPageEdit.hasRight('delete')) {
            ssi_modal.dialog({
              title: msg('notify-no-right'),
              content: msg('delete-no-right'),
              className: 'in-page-edit quick-deletepage',
              center: true,
              okBtn: {
                className: 'btn btn-primary btn-single'
              }
            });
            return false;
          }
        },
        buttons: [
          {
            label: msg('cancel'),
            className: 'btn btn-primary',
            method: function (e, modal) {
              modal.close();
            }
          }, {
            label: msg('confirm'),
            className: 'btn btn-danger',
            method: function (e, modal) {
              reason = $('#InPageEditDeletepage #delete-reason').val();
              if (reason === '') {
                $('#InPageEditDeletepage #delete-reason').css('box-shadow', '0 0 4px #f00');
                return;
              }
              InPageEdit.analysis({ type: 'functionCount', function: '快速删除' });

              ssi_modal.confirm({
                center: true,
                className: 'in-page-edit',
                title: msg('delete-confirm-title'),
                content: msg('delete-confirm-content'),
                okBtn: {
                  label: msg('confirm'),
                  className: 'btn btn-danger'
                },
                cancelBtn: {
                  label: msg('cancel'),
                  className: 'btn'
                }
              }, function (result) {
                if (result) {
                  reason = msg('delete-title') + ' (' + reason + ')';
                  new mw.Api().postWithToken('csrf', {
                    action: 'delete',
                    title: page,
                    reason: reason,
                    format: 'json'
                  }).then(function (data) {
                    ssi_modal.notify('success', {
                      className: 'in-page-edit',
                      title: msg('notify-success'),
                      content: msg('notify-delete-success').replace('$1', page)
                    });
                  }).fail(function (errorCode, feedback, errorThrown) {
                    ssi_modal.notify('error', {
                      className: 'in-page-edit',
                      title: msg('notify-error'),
                      content: msg('notify-delete-error') + ': <br/><span style="font-size:amall">' + errorThrown.error['*'] + '(<code>' + errorThrown.error['code'] + '</code>)</span>'
                    });
                  });
                  modal.close();
                } else {
                  return false;
                }
              });
            }
          }
        ]
      });
    };

    /** 重命名模块 **/
    InPageEdit.renamepage = InPageEdit.quickRename = function (from, to) {
      mw.hook('InPageEdit.quickRename').fire();
      var from = from || mw.config.get('wgPageName'),
        to = to || '',
        reason,
        movetalk,
        movesubpages,
        noredirect,
        ignorewarnings;

      ssi_modal.show({
        outSideClose: false,
        className: 'in-page-edit quick-rename',
        center: true,
        sizeClass: 'dialog',
        title: msg('rename-title'),
        content:
          $('<section>').append(
            $('<label>', { for: 'move-to', html: msg('rename-moveTo').replace('$1', '<b>' + from + '</b>') }),
            $br,
            $('<input>', { id: 'move-to', style: 'width:96%', onclick: "$(this).css('box-shadow','')" }),
            $br,
            $('<label>', { for: 'move-reason', text: msg('editSummary') }),
            $br,
            $('<input>', { id: 'move-reason', style: 'width:96%' }),
            $br,
            $('<input>', { type: 'checkbox', id: 'movetalk', checked: 'checked' }),
            $('<label>', { for: 'movetalk', text: msg('rename-movetalk') }),
            $br,
            $('<input>', { type: 'checkbox', id: 'movesubpages', checked: 'checked' }),
            $('<label>', { for: 'movesubpages', text: msg('rename-movesubpages') }),
            $br,
            $('<input>', { type: 'checkbox', id: 'noredirect' }),
            $('<label>', { for: 'noredirect', text: msg('rename-noredirect') })
          ).prop('outerHTML'),
        buttons: [{
          label: msg('cancel'),
          className: 'btn btn-secondary',
          method: function (a, modal) {
            modal.close();
          }
        }, {
          label: msg('confirm'),
          className: 'btn btn-primary',
          method: function () {
            to = $('.in-page-edit.quick-rename #move-to').val();
            if (to === '' || to === mw.config.get('wgPageName')) {
              $('.in-page-edit.quick-rename #move-to').css('box-shadow', '0 0 4px #f00');
              return;
            }

            InPageEdit.analysis({ type: 'functionCount', function: '快速重命名' });
            InPageEdit.analysis({ type: 'dateCount' });
            InPageEdit.analysis({ type: 'siteCount' });

            InPageEdit.progress(msg('editor-title-saving'));
            movetalk = $('.in-page-edit.quick-rename #movetalk').prop('checked');
            movesubpages = $('.in-page-edit.quick-rename #movesubpages').prop('checked');
            noredirect = $('.in-page-edit.quick-rename #noredirect').prop('checked');
            reason = $('.in-page-edit.quick-rename #move-reason').val();

            if (reason === '') {
              reason = msg('rename-summary') + ' → [[:' + to + ']]';
            } else {
              reason = msg('rename-summary') + ' → [[:' + to + ']] (' + reason + ')';
            }
            new mw.Api().postWithToken('csrf', {
              action: 'move',
              from: from,
              to: to,
              reason: reason,
              movetalk: movetalk,
              movesubpages: movesubpages,
              noredirect: noredirect
            }).done(function () {
              InPageEdit.progress(true);
              ssi_modal.notify('success', {
                className: 'in-page-edit',
                content: msg('notify-rename-success'),
                title: msg('notify-success')
              });
              location.href = mw.config.get('wgArticlePath').replace('$1', to);
            }).fail(function (errorCode, feedback, errorThrown) {
              InPageEdit.progress(false);
              ssi_modal.notify('error', {
                className: 'in-page-edit',
                content: msg('notify-rename-error') + ': ' + errorThrown.error.info + '<code>' + errorThrown.error.code + '</code>',
                title: msg('notify-error')
              });
              if (errorThrown.error.code === 'articleexists') {
                ssi_modal.dialog({
                  className: 'in-page-edit',
                  title: msg('rename-articleexists-title'),
                  center: true,
                  content: msg('rename-articleexists'),
                  okBtn: {
                    label: msg('ok'),
                    className: 'btn btn-primary only-btn'
                  }
                });
              }
            });
          }
        }],
        beforeShow: function () {
          if (!InPageEdit.hasRight('move')) {
            ssi_modal.dialog({
              title: msg('notify-no-right'),
              content: msg('rename-no-right'),
              className: 'in-page-edit quick-deletepage',
              center: true,
              okBtn: {
                className: 'btn btn-primary btn-single'
              }
            });
            return false;
          }
        }
      });
    };

    /** 个人设置模块 **/
    InPageEdit.preference = function () {
      mw.hook('InPageEdit.preference').fire();
      InPageEdit.analysis({ type: 'functionCount', function: '插件设置' });
      var settings = JSON.parse(localStorage.getItem('InPageEditPreference')),
        minor = settings.editMinor,
        summary = settings.editSummary,
        outSideClose = settings.outSideClose;

      ssi_modal.show({
        outSideClose: false,
        title: msg('preference-title') + ' - ' + InPageEdit.version,
        content: '<section id="InPageEditSettingBox"><h4>' + msg('preference-editor-label') + '</h4><input id="ipeSetoutSideClose" type="checkbox"/> <label for="ipeSetoutSideClose">' + msg('preference-outSideClose') + '</label><br/><input id="ipeSetMinor" type="checkbox"/> <label for="ipeSetMinor">' + msg('preference-setMinor') + '</label><br/><label><h4>' + msg('preference-summary-label') + '</h4>' + msg('preference-editSummary').replace('%br%', '<br/>').replace('$1', '<code>$oldid</code>').replace('$2', '<code>' + msg('editor-summary-rivision') + ' [[Special:Diff/oldid]]</code>').replace('$3', '<code>$section</code>').replace('$4', '<code>/* ' + msg('editor-title-editSection') + ' */</code>') + '<br/><span style="font-size:10px"></span><input id="ipeSetSummary" value="' + summary + '" style="width:100%"/></label><br/><h4>' + msg('preference-analysis-label') + '</h4><span style="font-size: small; line-height: 0.9em;">' + msg('preference-analysis-view').replace('$1', '<a href="https://doc.wjghj.cn/InPageEditAnalysis/" to="_blank">https://doc.wjghj.cn/InPageEditAnalysis/</a>') + '</span><h4>' + msg('preference-about-label') + '</h4><button class="btn btn-secondary" onclick="mw.loader.load(\'https://common.wjghj.cn/js/InPageEdit-v2.js/about\')">' + msg('preference-aboutAndHelp') + '</button>&nbsp;<button class="btn btn-secondary" onclick="InPageEdit.versionInfo()">' + msg('preference-updatelog') + '</button><hr><span style="font-size: small;line-height: 0.9em">' + msg('preference-savelocal-label') + '<br/>' + msg('preference-savelocal') + '<a href="javascript:;" id="ipeSaveLocalShow">' + msg('preference-savelocal-btn') + '</a></span></section>',
        sizeClass: 'dialog',
        className: 'in-page-edit ipe-preference',
        center: true,
        buttons: [{
          label: msg('preference-reset'),
          className: 'btn btn-danger',
          method: function () {
            $('#InPageEditSettingBox #ipeSetoutSideClose').prop('checked', true);
            $('#InPageEditSettingBox #ipeSetMinor').prop('checked', false);
            $('#InPageEditSettingBox #ipeSetSummary').val(msg('preference-summary-default'));
          }
        }, {
          label: msg('preference-save'),
          className: 'btn btn-primary',
          method: function (a, modal) {
            localStorage.setItem('InPageEditPreference', JSON.stringify({
              outSideClose: $('#InPageEditSettingBox #ipeSetoutSideClose').prop('checked'),
              editMinor: $('#InPageEditSettingBox #ipeSetMinor').prop('checked'),
              editSummary: $('#InPageEditSettingBox #ipeSetSummary').val()
            }));

            modal.close();
          }
        }
        ]
      });
      $('#ipeSaveLocalShow').click(function () {
        ssi_modal.dialog({
          className: 'in-page-edit',
          center: true,
          title: msg('preference-savelocal-popup-title'),
          content: '<section id="ipeSaveLocal"><b>' + msg('preference-savelocal-popup-notrecommended') + '</b><br/>' + msg('preference-savelocal-popup') + '<br/><input style="width:100%" readonly="readonly" onclick="$(this).select()"/><br/>' + msg('preference-savelocal-popup-notice') + '</section>',
          okBtn: {
            className: 'btn btn-primary btn-single'
          }
        });
        $('#ipeSaveLocal input').val('window.MyInPageEditPreference = ' + JSON.stringify({
          outSideClose: $('#InPageEditSettingBox #ipeSetoutSideClose').prop('checked'),
          editMinor: $('#InPageEditSettingBox #ipeSetMinor').prop('checked'),
          editSummary: $('#InPageEditSettingBox #ipeSetSummary').val()
        }) + ';');
      });
      if (outSideClose) {
        $('#InPageEditSettingBox #ipeSetoutSideClose').prop('checked', true);
      }
      if (minor) {
        $('#InPageEditSettingBox #ipeSetMinor').prop('checked', true);
      }

      if (typeof (MyInPageEditPreference) !== 'undefined') {
        $('.ipe-preference .ssi-buttons .ssi-modalBtn').attr('disabled', '');
        if (typeof (MyInPageEditPreference.editMinor) === 'boolean') {
          $('#InPageEditSettingBox #ipeSetMinor').prop('checked', MyInPageEditPreference.editMinor).attr('disabled', '');
        }
        if (typeof (MyInPageEditPreference.outSideClose) === 'boolean') {
          $('#InPageEditSettingBox #ipeSetoutSideClose').prop('checked', MyInPageEditPreference.outSideClose).attr('disabled', '');
        }
        if (typeof (MyInPageEditPreference.editSummary) === 'string') {
          $('#InPageEditSettingBox #ipeSetSummary').attr('disabled', '').val(MyInPageEditPreference.editSummary);
        }
        ssi_modal.dialog({
          content: msg('preference-savelocal-popup-haslocal').replace('$1', '<a href="' + mw.util.getUrl('Special:Mypage/common.js') + '">' + msg('preference-savelocal-popup-yourjspage') + '</a>'),
          className: 'in-page-edit',
          center: true,
          okBtn: {
            className: 'btn btn-primary btn-single'
          }
        });
      }
    };

    /** 快速页面差异模块 **/
    InPageEdit.quickDiff = function (param) {
      mw.hook('InPageEdit.quickDiff').fire();
      InPageEdit.analysis({ type: 'dateCount' });
      InPageEdit.analysis({ type: 'siteCount' });
      // InPageEdit.analysis({ type: 'functionCount', function: '快速差异' });
      if ($('[href*="mediawiki.diff.styles"]').length < 1) {
        mw.loader.load(mw.config.get('wgScriptPath') + '/load.php?modules=mediawiki.legacy.shared|mediawiki.diff.styles&only=styles', 'text/css');
      }
      if ($('.quick-diff').length > 0) {
        console.info('[InPageEdit] Quick diff 正在加载新内容');
        $('.in-page-edit.quick-diff .diffArea').hide().html(msg('diff-loading'));
        if (param.isPreview) {
          $('.quick-diff').appendTo('body');
        }
      } else {
        ssi_modal.show({
          className: 'in-page-edit quick-diff',
          sizeClass: 'large',
          fixedHeight: true,
          fitScreen: true,
          title: '<span class="pageName">' + msg('diff-loading') + '</span>',
          content: '<div class="ipe-progress" style="width:100%"><div class="ipe-progress-bar"></div></div><div class="diffArea"></div>',
          buttons: [{
            label: msg('diff-button-todiffpage'),
            className: 'btn btn-secondary toDiffPage',
            method: function () {
              // Placeholder
            }
          }]
        });
      }
      $('.in-page-edit.quick-diff .ipe-progress').show().css('margin-top', $('.in-page-edit.quick-diff .ipe-progress').parent().height() / 2);
      $('.quick-diff button.toDiffPage').unbind();
      param.action = 'compare';
      param.prop = 'diff|diffsize|rel|ids|title|user|comment|parsedcomment|size';
      param.format = 'json';
      new mw.Api().post(param).then(function (data) {
        var diffTable = data.compare['*'];
        $('.in-page-edit.quick-diff .ipe-progress').hide();
        if (param.pageName === undefined) {
          var toTitle = data.compare.totitle;
        } else {
          var toTitle = param.pageName;
        }
        var userlink = function (user) {
          return '<a class="diff-user" href="' + mw.util.getUrl('User:' + user) + '">' + user + '</a> (<a href="' + mw.util.getUrl('User_talk:' + user) + '">' + msg('diff-usertalk') + '</a> | <a href="' + mw.util.getUrl('Special:Contributions/' + user) + '">' + msg('diff-usercontrib') + '</a> | <a href="' + mw.util.getUrl('Special:Block/' + user) + '">' + msg('diff-userblock') + '</a>)';
        }
        $('.quick-diff .pageName').html(msg('diff-title') + ': <u>' + toTitle + '</u>');
        $('.quick-diff .diffArea').show().html(
          '<table class="diff diffTable">' +
          '<colgroup>' +
          '<col class="diff-marker">' +
          '<col class="diff-content">' +
          '<col class="diff-marker">' +
          '<col class="diff-content">' +
          '</colgroup>' +
          '<tbody>' +
          '<tr class="diff-title">' +
          '<td colspan="2" class="diff-otitle">' +
          '<a class="" href="' + mw.config.get('wgScript') + '?oldid=' + data.compare.fromrevid + '">' + data.compare.fromtitle + '</a> (<span class="diff-version">' + msg('diff-version') + data.compare.fromrevid + '</span>) (<a class="editLink" href="' + mw.config.get('wgScript') + '?action=edit&title=' + data.compare.fromtitle + '&oldid=' + data.compare.fromrevid + '">' + msg('diff-edit') + '</a>)<br/>' + userlink(data.compare.fromuser) + '<br/>(<span class="diff-comment">' + data.compare.fromparsedcomment + '</span>)<br/><a class="prevVersion" href="javascript:void(0);" onclick="InPageEdit.quickDiff({fromrev:' + data.compare.fromrevid + ',torelative:\'prev\'});InPageEdit.analysis({type:\'functionCount\',function:\'快速差异History\'});">←' + msg('diff-prev') + '</a>' +
          '</td>' +
          '<td colspan="2" class="diff-ntitle">' +
          '<a class="" href="' + mw.config.get('wgScript') + '?oldid=' + data.compare.torevid + '">' + data.compare.totitle + '</a> (<span class="diff-version">' + msg('diff-version') + data.compare.torevid + '</span>) (<a class="editLink" href="' + mw.config.get('wgScript') + '?action=edit&title=' + data.compare.totitle + '&oldid=' + data.compare.torevid + '">' + msg('diff-edit') + '</a>)<br/>' + userlink(data.compare.touser) + '<br/>(<span class="diff-comment">' + data.compare.toparsedcomment + '</span>)<br/><a class="nextVersion" href="javascript:void(0);" onclick="InPageEdit.quickDiff({fromrev:' + data.compare.torevid + ',torelative:\'next\'});InPageEdit.analysis({type:\'functionCount\',function:\'快速差异History\'});">' + msg('diff-nextv') + '→</a>' +
          '</td>' +
          '</tr>' +
          diffTable +
          '<tr class="diffSize" style="text-align: center;"><td colspan="2">' + data.compare.fromsize + msg('diff-bytes') + '</td><td colspan="2">' + data.compare.tosize + msg('diff-bytes') + '</td></tr>' +
          '</tbody>' +
          '</table>'
        );
        $('.quick-diff button.toDiffPage').click(function () {
          location.href = mw.config.get('wgScript') + '?oldid=' + data.compare.fromrevid + '&diff=' + data.compare.torevid;
        });
        InPageEdit.articleLink($('.quick-diff .editLink'));
        if (param.isPreview === true) {
          $('.quick-diff button.toDiffPage').hide();
          $('.quick-diff .diff-otitle').html('<b>' + msg('diff-title-original-content') + '</b>');
          $('.quick-diff .diff-ntitle').html('<b>' + msg('diff-title-your-content') + '</b>');
        }
        if (data.compare.fromsize === undefined || data.compare.tosize === undefined) {
          $('.quick-diff .diffSize').hide();
        }
        if (data.compare.fromrevid === undefined && param.isPreview !== true) {
          $('.quick-diff .diff-otitle').html('<span class="noNextVerson">' + data.warnings.compare['*'] + '</span>');
        } else if (data.compare.torevid === undefined && param.isPreview !== true) {
          $('.quick-diff .diff-ntitle').html('<span class="noNextVerson">' + data.warnings.compare['*'] + '</span>');
        }
        // GitHub@issue#5 修复被隐藏版本的问题
        if (data.compare.fromtexthidden !== undefined) {
          $('.quick-diff .diff-otitle .diff-version').addClass('diff-hidden-history');
        }
        if (data.compare.totexthidden !== undefined) {
          $('.quick-diff .diff-ntitle .diff-version').addClass('diff-hidden-history');
        }
        if (data.compare.fromuserhidden !== undefined) {
          $('.quick-diff .diff-otitle .diff-user').addClass('diff-hidden-history');
        }
        if (data.compare.touserhidden !== undefined) {
          $('.quick-diff .diff-ntitle .diff-user').addClass('diff-hidden-history');
        }
        if (data.compare.fromcommenthidden !== undefined) {
          $('.quick-diff .diff-otitle .diff-comment').addClass('diff-hidden-history');
        }
        if (data.compare.tocommenthidden !== undefined) {
          $('.quick-diff .diff-ntitle .diff-comment').addClass('diff-hidden-history');
        }
        if (data.hasOwnProperty('error')) {
          console.warn('[InPageEdit] 快速差异获取时系统告知出现问题');
          $('.diffArea').html(msg('diff-error') + ': ' + data.error.info + '(<code>' + data.error.code + '</code>)');
        }
      }).fail(function (errorCode, feedback, errorThrown) {
        console.warn('[InPageEdit] 快速差异获取失败');
        $('.in-page-edit.quick-diff .ipe-progress').hide();
        $('.diffArea').show().html(msg('diff-error') + ': ' + errorThrown.error['info'] + '(<code>' + errorThrown.error['code'] + '</code>)');
      });
    };
    // 加载预设的快速最近更改模块
    InPageEdit.loadQuickDiff = function () {
      // 最近更改
      function addLink(origin) {
        $('.mw-changeslist-groupdiff, .mw-changeslist-diff, .mw-changeslist-diff-cur, .mw-history-histlinks a').unbind('click', ipeDiffLink);
        var ipeDiffLink = $('.mw-changeslist-groupdiff, .mw-changeslist-diff, .mw-changeslist-diff-cur, .mw-history-histlinks a').click(function (e) {
          e.preventDefault();
          InPageEdit.analysis({ type: 'functionCount', function: '快速差异RC' });
          var $this = $(this),
            href = $this.attr('href'),
            diff = mw.util.getParamValue('diff', href),
            curid = mw.util.getParamValue('curid', href),
            oldid = mw.util.getParamValue('oldid', href);
          if (diff === '0') {
            InPageEdit.quickDiff({ fromrev: oldid, toid: curid });
          } else if (diff === 'prev' || diff === 'next' || diff === 'cur') {
            InPageEdit.quickDiff({ fromrev: oldid, torelative: diff });
          } else {
            InPageEdit.quickDiff({ fromrev: oldid, torev: diff });
          }
        });
      }
      if ($('.mw-rcfilters-enabled').length > 0) {
        setInterval(addLink, 500);
        $('.mw-rcfilters-enabled').addClass('ipe-continuous-active');
      } else {
        addLink();
      }
      // 查看历史页面的比较按钮与快速编辑
      if (mw.config.get('wgAction') === 'history') {
        $('.historysubmit.mw-history-compareselectedversions-button').after(
          $('<button>').text(msg('quick-diff')).click(function (e) {
            e.preventDefault();
            InPageEdit.analysis({ type: 'functionCount', function: '快速差异History' });
            var before = $('.selected.before').attr('data-mw-revid'),
              after = $('.selected.after').attr('data-mw-revid');
            InPageEdit.quickDiff({ fromrev: after, torev: before });
          })
        );
        $('[data-mw-revid]').each(function () {
          var $this = $(this),
            oldid = $this.attr('data-mw-revid');
          $this.find('.mw-history-undo').after(
            $('<span>').html(' | <a class="in-page-edit-article-link" href="javascript:void(0);" onclick="InPageEdit.quickEdit({page:mw.config.get(\'wgPageName\'),revision:' + oldid + '});">' + msg('quick-edit') + '</a>')
          );
        });
      }
    };

    /** 获取段落编辑以及编辑链接 **/
    InPageEdit.articleLink = function (element) {
      if (element === undefined)
        element = $('#mw-content-text a:not(.new)');
      element.each(function (i) {
        if ($(this).attr('href') === undefined)
          return;
        var url = $(this).attr('href'),
          title = mw.util.getParamValue('title', url),
          section = mw.util.getParamValue('section', url),
          revision = mw.util.getParamValue('oldid', url);

        // 不是本地编辑链接
        if (url.split('/')['2'] !== location.href.split('/')['2'] && url.substr(0, 1) !== '/')
          return;

        // 不是 index.php?title=FOO 形式的url
        if (title === null) {
          var splitStr = mw.config.get('wgArticlePath').replace('$1', '');
          if (splitStr === '/') {
            splitStr = mw.config.get('wgServer').substring(mw.config.get('wgServer').length - 4) + '/';
          }
          title = url.split(splitStr).pop().split('?')['0'];
        }

        if (mw.util.getParamValue('action', url) === 'edit' && title !== undefined && section !== 'new') {
          $(this).after(
            $('<span>', {
              'class': 'in-page-edit-article-link-group'
            }).append(
              $('<a>', {
                'href': 'javascript:void(0)',
                'class': 'in-page-edit-article-link'
              })
                .text(msg('quick-edit'))
                .click(function () {
                  if (revision !== null) {
                    InPageEdit.quickEdit({
                      page: title,
                      revision: revision
                    });
                  } else {
                    InPageEdit.quickEdit({
                      page: title,
                      section: section
                    });
                  }
                })));
        }
      });
    };

    /** 快速预览文章页 **/
    InPageEdit.quickPreview = function (params) {
      mw.hook('InPageEdit.quickPreview').fire();
      var timestamp = new Date().getTime();
      console.time('[InPageEdit] Request preview');
      ssi_modal.show({
        sizeClass: 'large',
        className: 'in-page-edit previewbox',
        title: msg('preview-title'),
        content: $('<section>').append(
          $progress,
          $('<div>', { id: 'InPageEditPreview', 'data-timestamp': timestamp, style: 'display:none', text: msg('preview-placeholder') })
        ).prop('outerHTML'),
        fixedHeight: true,
        fitScreen: true,
        buttons: [{ label: '', className: 'hideThisBtn' }],
        onShow: function (modal) {
          $('.previewbox .ipe-progress').css('margin-top', $('.previewbox .ipe-progress').parent().height() / 2);
          $('.previewbox .hideThisBtn').hide();
          new mw.Api().post(params).then(function (data) {
            console.timeEnd('[InPageEdit] Request preview');
            var content = data.parse.text['*'];
            $('.previewbox .ipe-progress').hide(150);
            $('#InPageEditPreview[data-timestamp="' + timestamp + '"]').fadeIn(500).html(content);
          }).fail(function () {
            console.timeEnd('[InPageEdit] Request preview');
            console.warn('[InPageEdit] 预览失败');
            $('.previewbox .ipe-progress').hide(150);
            $('#InPageEditPreview[data-timestamp="' + timestamp + '"]').fadeIn(500).html(msg('preview-error'));
          });
        }
      });
    };

    /** 载入中模块 **/
    InPageEdit.progress = function (title) {
      if (title === true) {
        $('.in-page-edit.loadingbox .ssi-modalTitle').html(msg('done'));
        $('.in-page-edit.loadingbox .ipe-progress').addClass('done');
      } else if (title === false) {
        if ($('.in-page-edit.loadingbox').length > 0) {
          $('.in-page-edit.loadingbox').appendTo('body');
          ssi_modal.close();
        }
      } else {
        if ($('.in-page-edit.loadingbox').length > 0) return;
        if (typeof (title) === 'undefined') {
          title = 'Loading...'
        }
        ssi_modal.show({
          title: title,
          content:
            $('<div>', { class: 'ipe-progress', style: 'width: 100%' }).append(
              $('<div>', { class: 'ipe-progress-bar' })
            ).prop('outerHTML'),
          className: 'in-page-edit loadingbox',
          center: true,
          sizeClass: 'dialog',
          closeIcon: false,
          outSideClose: false
        });
      }
    };

    /** 提交统计信息模块 **/
    InPageEdit.analysis = function (params) {
      var type = params.type;
      switch (type) {
        case 'siteCount':
          $.ajax({
            url: 'https://doc.wjghj.cn/InPageEditAnalysis/site/log.php',
            data: {
              'sitename': mw.config.get('wgSiteName')
            },
            dataType: 'json'
          });
          break;
        case 'dateCount':
          var now = new Date(),
            y = now.getFullYear(), m = Number(now.getMonth() + 1), d = Number(now.getDate());
          if (m < 10) m = '0' + m;
          if (d < 10) d = '0' + d;
          var time = y + '-' + m + '-' + d;
          $.ajax({
            url: 'https://doc.wjghj.cn/InPageEditAnalysis/date/log.php',
            data: {
              'date': time
            },
            dataType: 'json'
          });
          break;
        case 'functionCount':
          $.ajax({
            url: 'https://doc.wjghj.cn/InPageEditAnalysis/function/log.php',
            data: {
              'function': params.function
            },
            dataType: 'json'
          });
          break;
      }
    };

    /** 获取用户权限信息 **/
    (function () {
      mw.user.getRights().then(function (rights) {
        console.info('[InPageEdit] 成功获取用户权限信息');
        mw.config.set('wgUserRights', rights);
      }).fail(function () {
        console.warn('[InPageEdit] 警告：无法获取用户权限信息');
        mw.config.set('wgUserRights', '');
      });
      if (mw.user.getName() !== null) {
        new mw.Api().get({
          action: 'query',
          list: 'users',
          usprop: 'blockinfo',
          ususers: mw.user.getName()
        }).then(function (data) {
          if (data.query.users[0].hasOwnProperty('blockid')) {
            mw.config.set('wgUserIsBlocked', true);
          } else {
            mw.config.set('wgUserIsBlocked', false);
          }
        });
      }
    }());

    InPageEdit.hasRight = function (right) {
      if (mw.config.get('wgUserIsBlocked') === true) {
        return false;
      }
      if (mw.config.get('wgUserRights').indexOf(right) > -1) {
        return true;
      } else {
        return false;
      }
    };

    /** 版本信息模块 **/
    if (InPageEdit.isCanary) {
      InPageEdit.specialNotice = {
        id: msg('noticeid-canary'),
        title: msg('version-notice-canary-title'),
        content: msg('version-notice-canary')
      };
    } else {
      InPageEdit.specialNotice = {
        id: msg('noticeid'),
        title: msg('version-notice-title'),
        content: msg('version-notice')
      };
    }
    InPageEdit.versionInfo = function () {
      var curVersion = InPageEdit.version;
      ssi_modal.show({
        className: 'in-page-edit version-info',
        title: msg('updatelog-title') + ' - <span id="yourVersion">' + msg('updatelog-loading') + '</span>',
        content: '<div id="IPEversionInfoPlaceholder" class="ipe-progress" style="margin: calc(30% - 1em) auto;"><div class="ipe-progress-bar"></div></div><section style="display:none" id="IPEversionInfo"></section>',
        fitScreen: true,
        fixedHeight: true,
        buttons: [{
          label: msg('close'),
          className: 'btn btn-danger',
          method: function (a, modal) {
            modal.close();
          }
        }, {
          label: 'GitHub',
          className: 'btn btn-secondary',
          method: function () {
            location.href = 'https://github.com/Dragon-Fish/InPageEdit-v2';
          }
        }, {
          label: msg('updatelog-about'),
          className: 'btn btn-secondary',
          method: function () {
            location.href = 'https://common.wjghj.cn/wiki/InPageEdit-v2';
          }
        }]
      });
      $.ajax({
        url: 'https://common.wjghj.cn/api.php',
        dataType: 'jsonp',
        type: 'get',
        data: {
          page: 'InPageEdit-v2/version-info',
          action: 'parse',
          prop: 'text',
          format: 'json'
        },
        success: function (data) {
          var info = data.parse.text['*'];
          $('#IPEversionInfoPlaceholder').addClass('done').delay(800).fadeOut(200);
          $('#IPEversionInfo').html(info);
          $('#yourVersion').html(localStorage.InPageEditVersion);
          $('#IPEversionInfo .mw-headline').each(function () {
            var $this = $(this),
              text = $this.text();
            if (text === curVersion) {
              $this.html('<em class="curVersion" style="background: lightyellow; font-weight: bold">★ ' + $this.text() + '</em>');
            }
          });
          setTimeout('$("#IPEversionInfo").fadeIn(800)', 1000);
        }
      });
    };

    /** 获取版本提示 **/
    $(function () {
      var version = InPageEdit.version;
      // 版本更新
      if (localStorage.InPageEditVersion === null || localStorage.InPageEditVersion !== version) {
        ssi_modal.notify('', {
          title: msg('updatelog-update-success-title'),
          content: msg('updatelog-update-success').replace('$1', version),
          className: 'in-page-edit',
          buttons: [{
            className: 'btn btn-primary',
            label: msg('updatelog-button-versioninfo'),
            method: function (a, modal) {
              localStorage.InPageEditVersion = version;
              InPageEdit.versionInfo();
              modal.close();
            }
          }],
          closeAfter: {
            time: 30,
            resetOnHover: true
          },
          onClose: function () {
            ssi_modal.notify('', {
              className: 'in-page-edit',
              content: msg('updatelog-after-close').replace('$1', '<a href="' + msg('updatelog-url') + '" to="_blank">' + msg('updatelog-url') + '</a>').replace('$2', '<a href="https://github.com/Dragon-Fish/InPageEdit-v2">' + msg('updatelog-file-issue') + '</a>'),
              closeAfter: {
                time: 10
              }
            });
            localStorage.InPageEditVersion = version;
          }
        });
      }
      // 特殊提示
      if (localStorage.InPageEditNoticeId !== InPageEdit.specialNotice.id) {
        ssi_modal.notify('dialog', {
          className: 'in-page-edit ipe-special-notice',
          title: InPageEdit.specialNotice.title,
          content: InPageEdit.specialNotice.content,
          okBtn: {
            label: msg('updatelog-dismiss'),
            className: 'btn btn-primary'
          }
        }, function (e, modal) {
          localStorage.InPageEditNoticeId = InPageEdit.specialNotice.id;
          modal.close();
        });
      }
    });

    /** 页面载入完成，自动加载某些模块 **/
    (function () {
      /** 额外的模块 **/
      // 快速页面差异模块
      InPageEdit.loadQuickDiff();
      /** 读取设定 **/
      if (localStorage.getItem('InPageEditPreference') === null) {
        // 没有保存任何设置
        var ipePreference = {};
        ipePreference.outSideClose = true;
        ipePreference.editMinor = false;
        ipePreference.editSummary = msg('preference-summary-default');
        localStorage.setItem('InPageEditPreference', JSON.stringify(ipePreference));
      }
      // 加载段落编辑模块
      InPageEdit.articleLink();
    }());

    /** Toolbox模块 **/
    mw.hook('InPageEdit').add(function () {
      // 检测是否为文章页
      if (mw.config.get('wgIsArticle') === false) {
        console.warn('%c[InPageEdit] 不是文章页面，未载入工具盒。', 'color:orange;font-size:1.2em;font-weight:bold');
        return;
      }

      /** IPE工具盒 **/
      $('<div>', { id: 'ipe-edit-toolbox' }).append(
        $('<ul>', { class: 'btn-group group1' }).append(
          $('<li>', { class: 'btn-tip-group' }).append(
            $('<div>', { class: 'btn-tip', text: msg('quick-edit') }),
            $('<button>', { id: 'edit-btn', class: 'ipe-toolbox-btn material-icons', text: 'edit' })
          ),
          $('<li>', { class: 'btn-tip-group' }).append(
            $('<div>', { class: 'btn-tip', text: msg('redirect-from') }),
            $('<button>', { id: 'redirectfrom-btn', class: 'ipe-toolbox-btn material-icons', text: 'flight_land' })
          ),
          $('<li>', { class: 'btn-tip-group' }).append(
            $('<div>', { class: 'btn-tip', text: msg('redirect-to') }),
            $('<button>', { id: 'redirectto-btn', class: 'ipe-toolbox-btn material-icons', text: 'flight_takeoff' })
          )
        ),
        $('<ul>', { class: 'btn-group group2' }).append(
          $('<div>', { style: 'display: flex;' }).append(
            $('<li>', { class: 'btn-tip-group' }).append(
              $('<div>', { class: 'btn-tip', text: msg('quick-delete') }),
              $('<button>', { id: 'deletepage-btn', class: 'ipe-toolbox-btn material-icons', text: 'delete_forever' })
            ),
            $('<li>', { class: 'btn-tip-group' }).append(
              $('<div>', { class: 'btn-tip', text: msg('quick-rename') }),
              $('<button>', { id: 'renamepage-btn', class: 'ipe-toolbox-btn material-icons', text: 'format_italic' })
            ),
            $('<li>', { class: 'btn-tip-group' }).append(
              $('<div>', { class: 'btn-tip', text: msg('ipe-preference') }),
              $('<button>', { id: 'preference-btn', class: 'ipe-toolbox-btn material-icons', text: 'settings' })
            )
          )
        ),
        $('<button>', { class: 'ipe-toolbox-btn material-icons', id: 'toolbox-toggle', text: 'add' })
      ).appendTo('body');
      $('#ipe-edit-toolbox #toolbox-toggle').click(function () {
        $('#ipe-edit-toolbox #toolbox-toggle, #ipe-edit-toolbox .btn-group').toggleClass('opened');
      });
      $('body > *:not(#ipe-edit-toolbox)').click(function () {
        $('#ipe-edit-toolbox #toolbox-toggle, #ipe-edit-toolbox .btn-group').removeClass('opened');
      });
      $('#ipe-edit-toolbox .btn-group .ipe-toolbox-btn').click(function () {
        InPageEdit.analysis({ type: 'functionCount', function: '工具盒' });
        switch ($(this).attr('id')) {
          case 'edit-btn':
            InPageEdit.quickEdit({
              page: mw.config.get('wgPageName'),
              revision: mw.config.get('wgRevisionId')
            });
            break;
          case 'redirectfrom-btn':
            InPageEdit.quickRedirect('from');
            break;
          case 'redirectto-btn':
            InPageEdit.quickRedirect('to');
            break;
          case 'preference-btn':
            InPageEdit.preference();
            break;
          case 'deletepage-btn':
            InPageEdit.quickDelete();
            break;
          case 'renamepage-btn':
            InPageEdit.quickRename();
            break;
        }
      });
      mw.hook('InPageEdit.toolbox').fire();
    });

    // Init End
  }

  // 花里胡哨的加载提示
  mw.hook('InPageEdit').fire();
  console.info('    ____      ____                   ______    ___ __              _    _____ \n   /  _/___  / __ \\____ _____ ____  / ____/___/ (_) /_            | |  / /__ \\\n   / // __ \\/ /_/ / __ `/ __ `/ _ \\/ __/ / __  / / __/  ______    | | / /__/ /\n _/ // / / / ____/ /_/ / /_/ /  __/ /___/ /_/ / / /_   /_____/    | |/ // __/ \n/___/_/ /_/_/    \\__,_/\\__, /\\___/_____/\\__,_/_/\\__/              |___//____/ \n                      /____/');
}());
