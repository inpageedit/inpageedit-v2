var InPageEdit = window.InPageEdit || {};
var config = mw.config.get();

const { _analysis } = require('./_analysis');
const { _msg } = require('./_msg');
const { $br, $hr, $progress } = require('./_elements');

// const api = require('./api.json')
const version = require('./version');
const { pluginStore } = require('./pluginStore');

/**
 * @module preference 个人设置模块
 */
var preference = {
  /**
   * @name 预设值
   * @return {object}
   */
  "default": {
    doNotCollectMyInfo: false,
    doNotShowLocalWarn: false,
    editMinor: false,
    editSummary: _msg('preference-summary-default'),
    lockToolBox: false,
    redLinkQuickEdit: true,
    outSideClose: true,
    watchList: Boolean(mw.user.options.get('watchdefault')),
    plugins: [
      'toolbox.js'
    ]
  },
  /**
   * @name 获取设置 
   * @description 合并保存在用户页的设置以及localStorage的设置，有容错机制
   * @param {string} setting 返回相应的设置，为空时返回全部设置
   * @return {object|string}
   */
  get(setting) {
    var local = localStorage.getItem('InPageEditPreference') || '{}';
    try {
      local = JSON.parse(local);
    } catch (e) {
      local = {};
    }
    if (typeof InPageEdit.myPreference === 'object') {
      local = $.extend({}, local, InPageEdit.myPreference);
    }
    var json = $.extend({}, preference.default, local);
    if (typeof (setting) === 'string' && setting !== '') {
      return json[setting] ? json[setting] : null;
    } else {
      return json;
    }
  },
  /**
   * @name 保存设置
   * @param {Object|string} settingKey
   * @param {any} settingValue
   * @example 可以这样 preference.set({ key: 'value' }) 也可以 preference.set('key', 'value')
   */
  set(settingKey = {}, settingValue = undefined) {
    var options = {};
    if (typeof settingKey === 'string' && settingValue !== undefined) {
      options[settingKey] = settingValue;
    } else if (typeof settingKey === 'object') {
      options = settingKey;
    } else {
      return;
    }
    options = $.extend({}, preference.get(), options);
    options = JSON.stringify(options);
    localStorage.setItem('InPageEditPreference', options);
  },
  /**
   * @name 用户图形界面
   * @description 打开可视化设置窗口
   */
  modal() {
    // 防止多开设置页面
    if ($('#ipe-preference-form').length > 0) return;

    mw.hook('pluginPreference').fire();
    preference.set();
    var local = preference.get();
    _analysis('plugin_setting');

    /** 定义模态框内部结构 */
    var $tabList = $('<ul>', { class: 'tab-list' }).append(
      $('<li>').append(
        $('<a>', { text: _msg('preference-tab-editor'), href: '#editor' })
      ),
      $('<li>').append(
        $('<a>', { text: _msg('preference-tab-plugin'), href: '#plugin' })
      ),
      $('<li>').append(
        $('<a>', { text: _msg('preference-tab-analysis'), href: '#analysis' })
      ),
      $('<li>').append(
        $('<a>', { text: _msg('preference-tab-about'), href: '#about' })
      ),
      $('<li>').append(
        $('<a>', { text: _msg('preference-tab-another'), href: '#another' })
      )
    )

    var $tabContent = $('<div>', { class: 'tab-content', style: 'position: relative;' }).append(
      $('<section>', { id: 'editor' }).append(
        $('<h3>', { text: _msg('preference-editor-title') }),
        $('<h4>', { text: _msg('preference-editHobits-label') }),
        $('<label>').append(
          $('<input>', { type: 'checkbox', id: 'editMinor' }),
          $('<span>', { text: _msg('preference-setMinor') })
        ),
        $('<label>').append(
          $('<input>', { type: 'checkbox', id: 'watchList' }),
          $('<span>', { text: _msg('preference-watchList') })
        ),
        $('<h4>', { text: _msg('preference-summary-label') }),
        $('<label>', { for: 'editSummary', style: 'padding-left: 0; font-size: small', html: _msg('preference-editSummary') }),
        $br,
        $('<input>', { id: 'editSummary', style: 'width: 96%', placeholder: 'Edit via InPageEdit, yeah~' })
      ),
      $('<section>', { id: 'plugin' }).append(
        $('<h3>', { text: 'plugin settings' }),
        $('<div>', { id: 'plugin-container', html: $($progress).css({ width: '96%', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }) })
      ),
      $('<section>', { id: 'analysis' }).append(
        $('<h3>', { text: 'Analysis data' }),
        $('<div>', { id: 'analysis-container', html: $($progress).css({ width: '96%', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }) })
      ),
      $('<section>', { id: 'another' }).append(
        $('<h3>', { text: 'another settings' })
      ),
      $('<section>', { id: 'about' }).append(
        $('<h3>', { text: _msg('preference-about-label') }),
        $('<button>', { class: 'btn btn-secondary', onclick: "InPageEdit.about()", text: _msg('preference-aboutAndHelp') }),
        $('<button>', { class: 'btn btn-secondary', style: 'margin-left: 1em;', onclick: "InPageEdit.versionInfo()", text: _msg('preference-updatelog') }),
        $('<a>', { href: 'https://ipe.miraheze.org/wiki/', target: '_blank', style: 'margin-left: 1em;' }).append(
          $('<button>', { class: 'btn btn-secondary', text: _msg('preference-translate') })
        ),
        $('<a>', { href: 'https://discord.gg/VUVAh8w', target: '_blank', style: 'margin-left: 1em;' }).append(
          $('<button>', { class: 'btn btn-secondary', text: _msg('preference-discord') })
        ),
        $hr,
        $('<p>', { text: 'InPageEdit is a useful MediaWiki JavaScript Plugin written with jQuery' }),
        $('<p>').append(
          '© Original by Wjghj Project (机智的小鱼君), ',
          $('<a>', { href: 'https://www.gnu.org/licenses/gpl-3.0-standalone.html', text: 'GNU General Public License 3.0' }),
          '(2019 - ' + new Date().getFullYear() + ')'
        )
      )
    )

    var $modalContent = $('<div>', { class: 'preference-tabber' }).append(
      $('<div>', { text: 'WARNING: IN PROGRESS', style: 'padding-left: 8px; border-left: 6px solid orange; font-weight: bold;' }),
      $tabList,
      $tabContent
    )

    // 绑定tab-list按钮事件
    $tabList.find('a').click(function (e) {
      e.preventDefault()
      var $this = $(this)
      var tab = $this.attr('href')
      if (tab) {
        $tabList.find('a').removeClass('active')
        $tabContent.find('section').removeClass('active')
        $this.addClass('active')
        $tabContent.find('' + tab).addClass('active')
      }
    })

    // 设定input状态
    // ...

    // 绑定input事件
    $tabContent.find('input').change(function () {
      var $this = $(this)
      var key = $this.attr('id')
      var val = $this.val()
      $modalContent.data(key, val)
      console.log('[InPageEdit] Preset preference', $modalContent.data())
    })

    // 预先选中第一个tab
    $tabList.find('a:first').addClass('active')
    $tabContent.find('section:first').addClass('active')

    // 显示模态框
    ssi_modal.show({
      sizeClass: 'dialog',
      className: 'in-page-edit ipe-preference',
      outSideClose: false,
      title: _msg('preference-title') + ' - ' + version,
      content: $modalContent,
      buttons: [
        {
          label: _msg('preference-reset'),
          className: 'btn btn-danger',
          method: function (a, modal) {
            ssi_modal.confirm({
              title: _msg('preference-reset-confirm-title'),
              content: _msg('preference-reset-confirm'),
              className: 'in-page-edit',
              center: true,
              okBtn: {
                label: _msg('ok'),
                className: 'btn btn-danger'
              },
              cancelBtn: {
                label: _msg('cancel'),
                className: 'btn'
              }
            }, res => {
              if (res) {
                preference.set(preference.default);
                modal.close();
              } else {
                return false;
              }
            });
          }
        },
        {
          label: _msg('preference-save'),
          className: 'btn btn-primary',
          method: function (a, modal) {
            // preference.set($modalContent.data());
            console.info('[InPageEdit] Set preference', $modalContent.data())
            modal.close();
          }
        }
      ],
      onShow($modal) {

        var $modalWindow = $('#' + $modal.modalId)
        mw.hook('InPageEdit.preference.modal').fire({
          $modal,
          $modalWindow
        })

        // 如果在本地有设定存档，disable掉全部input
        if (typeof InPageEdit.myPreference !== 'undefined') {
          $modalWindow.find('.ssi-modalBtn.btn').attr({ 'disabled': true })
          $tabContent.find('input').attr({ 'disabled': true })
          $tabList.before(
            $('<div>', { class: 'has-local-warn', style: 'padding-left: 8px; border-left: 6px solid orange; font-size: small;', html: _msg('preference-savelocal-popup-haslocal') })
          );
        }

        // 将现有设定反映到选项中
        $.each(local, (key, val) => {
          if (key === 'plugins') return
          var $input = $tabContent.find('#' + key)
          if ($input.length > 0) {
            $modalContent.data(key, val)
            if (typeof val === 'string') {
              $input.val(val)
            }
            if (typeof val === 'boolean') {
              $input.prop('checked', val)
            }
          }
        })

        // 获取插件列表
        var usedPlugin = preference.get('plugins')
        var pluginCache = pluginStore.loadCache()
        if (pluginCache) {
          showPluginList(pluginCache)
        } else {
          pluginStore.get().then(list => {
            pluginStore.saveCache(list)
            showPluginList(list)
          })
        }
        function showPluginList(list) {
          $tabContent.find('#plugin-container').html('<ul></ul>')
          $.each(list, (key, val) => {
            var name = val.name || 'Unknown'
            var description = val.description || ''
            var author = val.author ? $('<a>', { href: 'https://gtihub.com/' + val.author, target: '_balnk', text: '@' + val.author }) : '-'
            $tabContent.find('#plugin-container > ul').append(
              $('<li>', { 'data-pluginKey': key }).append(
                $('<label>').append(
                  $('<input>', { class: 'plugin-checkbox', id: key, checked: Boolean(usedPlugin.indexOf(key) > -1) }).change(function () {
                    var $this = $(this)
                    var checked = $this.prop('checked')
                    var key = $this.attr('id')
                    var index = usedPlugin.indexOf(key)
                    var original = preference.get('plugins')
                    if (checked && index < 0) {
                      original.push(key)
                    } else if (!checked && index > -1) {
                      original.splice(index, 1)
                    } else {
                      return
                    }
                    preference.set('plugins', original)
                  }),
                  $('<span>'), // checkbox
                  $('<div>', { class: 'plugin-name', text: name }),
                  $('<div>', { class: 'plugin-author', html: author }),
                  $('<div>', { class: 'plugin-description', text: description })
                )
              )
            )
          })
        }

        // 获取Analysis数据
        var userName = config.wgUserName
        $.get('https://api.wjghj.cn/inpageedit/query/wiki', {
          url: config.wgServer + config.wgArticlePath.replace('$1', ''),
          prop: 'users.' + userName + '._total|users.' + userName + '.functions'
        }).then(ret => {
          $tabContent.find('#analysis-container').html('')
          var data = ret.query[0].users[userName]
          var total = data._total
          var functionData = data.functions
          var functionList = $('<ul>')
          $.each(functionData, (key, val) => {
            functionList.append(
              $('<li>').append(
                $('<div>', { title: (total / val * 100) + '%' }).css('width', (total / val * 100) + '%').append(
                  $('<div>', { text: key }),
                  $('<div>', { text: val })
                )
              )
            )
          })
          $tabContent.find('#analysis-container').append(
            $('<h4>', { text: userName + ' at ' + config.wgSiteNae }),
            $('<p>').append(
              $('<strong>', { text: 'Total use' }),
              ': ',
              total
            ),
            functionList
          )
        })

      }
    });

    // ssi_modal.show({
    //   sizeClass: 'dialog',
    //   className: 'in-page-edit ipe-preference',
    //   outSideClose: false,
    //   title: _msg('preference-title') + ' - ' + version,
    //   content:
    //     $('<section>', { id: 'ipe-preference-form', class: 'ipe-preference-form' }).append(
    //       $('<h4>', { text: _msg('preference-editor-label') }),
    //       $('<label>').append(
    //         $('<input>', { id: 'outSideClose', type: 'checkbox' }).prop('checked', local.outSideClose),
    //         $('<span>', { text: _msg('preference-outSideClose') })
    //       ),
    //       $br,
    //       $('<label>').append(
    //         $('<input>', { id: 'editMinor', type: 'checkbox' }).prop('checked', local.editMinor),
    //         $('<span>', { text: _msg('preference-setMinor') })
    //       ),
    //       $br,
    //       $('<h4>', { text: _msg('preference-summary-label') }),
    //       $('<label>', { for: 'editSummary', style: 'padding-left: 0; font-size: small', html: _msg('preference-editSummary') }),
    //       $br,
    //       $('<input>', { id: 'editSummary', style: 'width: 96%', value: local.editSummary, placeholder: 'Edit via InPageEdit, yeah~' }),
    //       $('<h4>', { text: _msg('preference-analysis-label') }),
    //       $('<span>', { style: 'font-size: small; line-height: 0.9em', html: _msg('preference-analysis-view', `[${api.analysisUrl} ${api.analysisUrl}]`) }),
    //       $('<h4>', { text: _msg('preference-about-label') }),
    //       $('<button>', { class: 'btn btn-secondary', onclick: "InPageEdit.about()", text: _msg('preference-aboutAndHelp') }),
    //       $('<button>', { class: 'btn btn-secondary', style: 'margin-left: 1em;', onclick: "InPageEdit.versionInfo()", text: _msg('preference-updatelog') }),
    //       $('<a>', { href: 'https://ipe.miraheze.org/wiki/', target: '_blank', style: 'margin-left: 1em;' }).append(
    //         $('<button>', { class: 'btn btn-secondary', text: _msg('preference-translate') })
    //       ),
    //       $('<a>', { href: 'https://discord.gg/VUVAh8w', target: '_blank', style: 'margin-left: 1em;' }).append(
    //         $('<button>', { class: 'btn btn-secondary', text: _msg('preference-discord') })
    //       ),
    //       $hr,
    //       $('<strong>', { style: 'font-size: small; line-height: 0.9em', text: _msg('preference-savelocal-label') }),
    //       $br,
    //       $('<span>', { style: 'font-size: small; line-height: 0.9em', text: _msg('preference-savelocal') }).append(
    //         $('<a>', { href: 'javascript:;', id: 'ipeSaveLocalShow', text: _msg('preference-savelocal-btn') }).click(function () {
    //           // 永久保存（本地用户页）
    //           ssi_modal.dialog({
    //             className: 'in-page-edit',
    //             center: true,
    //             title: _msg('preference-savelocal-popup-title'),
    //             content: '<section id="ipeSaveLocal">' + _msg('preference-savelocal-popup') + '<br/><textarea style="font-size: 12px; resize: none; width: 100%; height: 10em;" readonly></textarea><br/>' + _msg('preference-savelocal-popup-notice') + '</section>',
    //             okBtn: {
    //               className: 'btn btn-primary btn-single',
    //               label: _msg('ok')
    //             }
    //           });
    //           $('#ipeSaveLocal textarea').val('/** InPageEdit Preferences **/\nwindow.InPageEdit = window.InPageEdit || {}; // Keep this line\nInPageEdit.myPreference = ' + JSON.stringify($.extend({}, preference.get(), $('#ipe-preference-form').data()), null, 2));
    //         })
    //       )
    //     ),
    //   buttons: [{
    //     label: _msg('preference-reset'),
    //     className: 'btn btn-danger',
    //     method: function (a, modal) {
    //       ssi_modal.confirm({
    //         title: _msg('preference-reset-confirm-title'),
    //         content: _msg('preference-reset-confirm'),
    //         className: 'in-page-edit',
    //         center: true,
    //         okBtn: {
    //           label: _msg('ok'),
    //           className: 'btn btn-danger'
    //         },
    //         cancelBtn: {
    //           label: _msg('cancel'),
    //           className: 'btn'
    //         }
    //       }, (res) => {
    //         if (res) {
    //           preference.set(preference.default);
    //           modal.close();
    //         } else {
    //           return false;
    //         }
    //       });
    //     }
    //   }, {
    //     label: _msg('preference-save'),
    //     className: 'btn btn-primary',
    //     method: function (a, modal) {
    //       preference.set($('#ipe-preference-form').data());
    //       modal.close();
    //     }
    //   }
    //   ],
    //   onShow: function () {
    //     function setData() {
    //       if (this.type === 'checkbox') {
    //         $('#ipe-preference-form').data(this.id, this.checked);
    //       } else if (this.type === 'text') {
    //         $('#ipe-preference-form').data(this.id, this.value);
    //       }
    //     }
    //     $('#ipe-preference-form input').each(setData).change(setData);

    //     if (typeof (InPageEdit.myPreference) !== 'undefined') {
    //       $('#ipe-preference-form input, .ipe-preference .ssi-modalBtn').attr({ 'disabled': 'disabled' });
    //       $('#ipe-preference-form').prepend(
    //         $('<p>', { class: 'has-local-warn', style: 'padding-left: 8px; border-left: 6px solid orange; font-size: small;', html: _msg('preference-savelocal-popup-haslocal') })
    //       );
    //     }
    //   }
    // });
  }
}

module.exports = {
  preference
}