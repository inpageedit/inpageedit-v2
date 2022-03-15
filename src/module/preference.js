var InPageEdit = window.InPageEdit || {}
var config = mw.config.get()

// const { _analytics } = require('./_analytics')
const { _msg } = require('./_msg')
const { $br, $hr, $progress, $link } = require('./_elements')

const {
  githubLink,
  pluginGithub,
  analyticsApi,
  analyticsDash,
  pluginCDN,
} = require('./api')
const version = require('./version')
const { pluginStore } = require('./pluginStore')

/**
 * @module preference 个人设置模块
 */
const preference = {
  /**
   * @name 预设值
   * @return {object}
   */
  _defaults: {
    doNotCollectMyInfo: false,
    editMinor: false,
    editSummary: _msg('preference-summary-default'),
    lockToolBox: false,
    redLinkQuickEdit: true,
    outSideClose: true,
    watchList: 'preferences',
    plugins: ['toolbox.js', 'wiki-editor.js'],
  },
  /**
   * @name 获取设置
   * @description 合并保存在用户页的设置以及localStorage的设置，有容错机制
   * @param {string} setting 返回相应的设置，为空时返回全部设置
   * @return {object|string}
   */
  get(setting) {
    var local = localStorage.getItem('InPageEditPreference') || '{}'
    try {
      local = JSON.parse(local)
    } catch (e) {
      local = {}
    }
    if (typeof InPageEdit.myPreference === 'object') {
      Object.assign(local, InPageEdit.myPreference)
    }
    var json = $.extend({}, preference._defaults, local)
    /**
     * < 14.3.0 版本中的 watchList 语义与现在不同
     * 需要统一转换为 'preferences'
     * @bhsd-harry @Dragon-Fish 2022年3月15日
     */
    if (
      !['watch', 'unwatch', 'preferences', 'nochange'].includes(json.watchList)
    ) {
      json.watchList = 'preferences'
    }
    if (typeof setting === 'string' && setting !== '') {
      return json[setting] ? json[setting] : null
    } else {
      return json
    }
  },
  /**
   * @name 保存设置
   * @param {Object|string} settingKey
   * @param {any} settingValue
   * @example 可以这样 preference.set({ key: 'value' }) 也可以 preference.set('key', 'value')
   */
  set(settingKey = {}, settingValue = undefined) {
    var options = {}
    if (typeof settingKey === 'string' && settingValue !== undefined) {
      options[settingKey] = settingValue
    } else if (typeof settingKey === 'object') {
      options = settingKey
    } else {
      return
    }
    options = $.extend({}, preference.get(), options)
    options = JSON.stringify(options)
    localStorage.setItem('InPageEditPreference', options)
  },
  /**
   * @name 用户图形界面
   * @description 打开可视化设置窗口
   */
  modal() {
    // 防止多开设置页面
    if ($('#ipe-preference-form').length > 0) return

    mw.hook('pluginPreference').fire()
    preference.set()
    var local = preference.get()

    // There is an "xxx is undefined" bug, no solution for the time being
    require('./_analytics')._analytics('plugin_setting') // Keep this line.

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
        $('<a>', { text: _msg('preference-tab-another'), href: '#another' })
      ),
      $('<li>').append(
        $('<a>', { text: _msg('preference-tab-about'), href: '#about' })
      )
    )

    var $tabContent = $('<div>', {
      class: 'tab-content',
      style: 'position: relative;',
    }).append(
      $('<section>', { id: 'editor' }).append(
        $('<h3>', { text: _msg('preference-editor-title') }),
        $('<h4>', { text: _msg('preference-editHobits-label') }),
        $('<label>').append(
          $('<input>', { type: 'checkbox', id: 'editMinor' }),
          $('<span>', { text: _msg('preference-setMinor') })
        ),
        $('<label>').append(
          $('<input>', { type: 'checkbox', id: 'outSideClose' }),
          $('<span>', { text: _msg('preference-outSideClose') })
        ),
        $('<label>').append(
          $('<input>', { type: 'checkbox', id: 'noConfirmEdit' }),
          $('<span>', { text: _msg('preference-noConfirmEdit') })
        ),
        $('<h4>', { text: _msg('preference-watchList-label') }),
        $('<label>').append(
          $('<input>', { type: 'radio', name: 'watchList', value: 'nochange' }),
          $('<span>', { text: _msg('preference-watchList-nochange') })
        ),
        $('<label>').append(
          $('<input>', {
            type: 'radio',
            name: 'watchList',
            value: 'preferences',
          }),
          $('<span>', { html: _msg('preference-watchList-preferences') })
        ),
        $('<label>').append(
          $('<input>', { type: 'radio', name: 'watchList', value: 'unwatch' }),
          $('<span>', { text: _msg('preference-watchList-unwatch') })
        ),
        $('<label>').append(
          $('<input>', { type: 'radio', name: 'watchList', value: 'watch' }),
          $('<span>', { text: _msg('preference-watchList-watch') })
        ),
        $('<h4>', { text: _msg('preference-summary-label') }),
        $('<label>', {
          for: 'editSummary',
          style: 'padding-left: 0; font-size: small',
          html: _msg('preference-editSummary'),
        }),
        $('<input>', {
          id: 'editSummary',
          style: 'width: 96%',
          placeholder: 'Edit via InPageEdit, yeah~',
        })
      ),
      $('<section>', { id: 'plugin' }).append(
        $('<h3>', { text: _msg('preference-plugin-title') }),
        $('<div>', {
          id: 'plugin-container',
          html: $($progress).css({
            width: '96%',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
          }),
        }),
        $('<div>', { class: 'plugin-footer' }).html(
          _msg('preference-plugin-footer', pluginGithub)
        )
      ),
      $('<section>', { id: 'analysis' }).append(
        $('<h3>', { text: _msg('preference-analysis-title') }),
        $('<div>', {
          id: 'analysis-container',
          html: $($progress).css({
            width: '96%',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
          }),
        })
      ),
      $('<section>', { id: 'another' }).append(
        $('<h3>', { text: _msg('preference-another-title') }),
        $('<h4>', { text: _msg('preference-display-label') }),
        $('<label>').append(
          $('<input>', { type: 'checkbox', id: 'redLinkQuickEdit' }),
          $('<span>', { text: _msg('preference-redLinkQuickEdit') })
        ),
        $('<div>').append(
          $('<h4>', { text: 'Custom skin (Not available yet)' }),
          $('<label>', { class: 'choose-skin' }).append(
            $('<input>', {
              type: 'checkbox',
              id: 'customSkinEnable',
              disabled: true,
            }),
            $('<span>'),
            $('<input>', {
              id: 'customSkinUrl',
              disabled: true,
              style: 'width: calc(96% - 30px)',
              value: `${pluginCDN}/skins/ipe-default.css`,
            })
          )
        ),
        $('<h4>', { text: _msg('preference-savelocal-popup-title') }),
        $('<button>', {
          class: 'btn btn-secondary',
          id: 'ipeSaveLocalShow',
          text: _msg('preference-savelocal-btn'),
        }).on('click', function () {
          // 永久保存（本地用户页）
          var $saveLocalModal = $('<section>').append(
            _msg('preference-savelocal-popup'),
            $br,
            $('<textarea>', {
              style:
                'font-size: 12px; resize: none; width: 100%; height: 10em;',
              readonly: true,
            })
              .on('click', function () {
                this.select()
              })
              .val(
                `/** InPageEdit Preferences */\n;(window.InPageEdit = window.InPageEdit || {}).myPreference = ${JSON.stringify(
                  $modalContent.data(),
                  null,
                  2
                )}`
              )
          )
          ssi_modal.dialog({
            className: 'in-page-edit',
            center: true,
            title: _msg('preference-savelocal-popup-title'),
            content: $saveLocalModal,
            okBtn: {
              className: 'btn btn-primary btn-single',
              label: _msg('ok'),
            },
          })
        })
      ),
      $('<section>', { id: 'about' }).append(
        $('<h3>', { text: _msg('preference-about-label') }),
        $('<div>', { style: 'font-size: 12px; font-style: italic;' }).html(
          function () {
            const isCanary = version.includes('-')
            return isCanary
              ? `v${version} (Canary)<br>${_msg('version-notice-canary')}`
              : `v${version}`
          }
        ),
        $('<h4>', { text: 'Portal' }),
        $('<button>', {
          class: 'btn btn-secondary btn-single',
          onclick: 'InPageEdit.about()',
          text: _msg('preference-aboutAndHelp'),
        }),
        $('<button>', {
          class: 'btn btn-secondary btn-single',
          style: 'margin-top: .5em;',
          onclick: 'InPageEdit.versionInfo()',
          text: _msg('preference-updatelog'),
        }),
        $('<h4>', { text: 'Join us' }),
        $('<p>').append(
          $('<strong>', { text: 'GitHub' }),
          ': ',
          $('<a>', {
            href: githubLink,
            text: githubLink,
            target: '_blank',
          })
        ),
        $('<p>').append(
          $('<strong>', { text: 'QQ Group' }),
          ': ',
          '1026023666'
        ),
        $hr,
        $('<p>', {
          text: 'InPageEdit is a useful MediaWiki JavaScript Plugin written with jQuery',
        }),
        $('<p>').append(
          '© InPageEdit Copyright (C)',
          ' 2019 - ' + new Date().getFullYear(),
          ' Wjghj Project (机智的小鱼君), ',
          $('<a>', {
            href: 'https://www.gnu.org/licenses/gpl-3.0-standalone.html',
            text: 'GNU General Public License 3.0',
          })
        )
      )
    )

    var $modalContent = $('<div>', { class: 'preference-tabber' }).append(
      $tabList,
      $tabContent
    )

    // 绑定tab-list按钮事件
    $tabList.find('a').on('click', function (e) {
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
    $tabContent.find('input').on('change', function () {
      var $this = $(this)
      var key = $this.attr('id') || $this.prop('name')
      var val
      if ($this.prop('type') === 'checkbox') {
        val = $this.prop('checked')
      } else {
        val = $this.val()
      }
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
            ssi_modal.confirm(
              {
                title: _msg('preference-reset-confirm-title'),
                content: _msg('preference-reset-confirm'),
                className: 'in-page-edit',
                center: true,
                okBtn: {
                  label: _msg('ok'),
                  className: 'btn btn-danger',
                },
                cancelBtn: {
                  label: _msg('cancel'),
                  className: 'btn',
                },
              },
              (res) => {
                if (res) {
                  preference.set(preference._defaults)
                  modal.close()
                } else {
                  return false
                }
              }
            )
          },
        },
        {
          label: _msg('preference-save'),
          className: 'btn btn-primary',
          method: function (a, modal) {
            preference.set($modalContent.data())
            // console.info('[InPageEdit] Set preference', $modalContent.data())
            modal.close()
          },
        },
      ],
      onShow($modal) {
        var $modalWindow = $('#' + $modal.modalId)
        mw.hook('InPageEdit.preference.modal').fire({
          $modal,
          $modalWindow,
        })

        // 如果在本地有设定存档，disable掉全部input
        if (typeof InPageEdit.myPreference !== 'undefined') {
          $modalWindow.find('.ssi-modalBtn.btn').attr({ disabled: true })
          $tabContent.find('input').attr({ disabled: true })
          $tabList.before(
            $('<div>', {
              class: 'has-local-warn',
              style:
                'padding-left: 8px; border-left: 6px solid orange; font-size: small;',
              html: _msg('preference-savelocal-popup-haslocal'),
            })
          )
        }

        // 将现有设定反映到选项中
        $.each(local, (key, val) => {
          if (key === 'plugins') {
            $modalContent.data(key, val)
            return
          }
          var $input = $tabContent.find('#' + key)
          if ($input.length > 0) {
            $modalContent.data(key, val)
            if (typeof val === 'string') {
              $input.val(val)
            }
            if (typeof val === 'boolean') {
              $input.prop('checked', val)
            }
          } else {
            $tabContent
              .find('input[type=radio][name=' + key + ']')
              .each(function () {
                this.checked = this.value === val
              })
          }
        })

        // 获取插件列表
        var usedPlugin = preference.get('plugins')
        var pluginCache = pluginStore.loadCache()
        if (pluginCache) {
          showPluginList(pluginCache)
        } else {
          pluginStore.get().then((list) => {
            pluginStore.saveCache(list)
            showPluginList(list)
          })
        }
        function showPluginList(list) {
          $tabContent.find('#plugin-container').html($('<ul>'))
          $.each(list, (key, val) => {
            var name = val.name || 'Unknown'
            var description = val.description || ''
            var author = val.author
              ? $('<a>', {
                  href: 'https://github.com/' + val.author,
                  target: '_balnk',
                  text: '@' + val.author,
                })
              : '-'
            $tabContent.find('#plugin-container > ul').append(
              $('<li>').append(
                $('<label>').append(
                  $('<input>', {
                    class: 'plugin-checkbox',
                    id: key,
                    type: 'checkbox',
                    checked: Boolean(
                      usedPlugin.indexOf(key) >= 0 || val._force === true
                    ), // 勾选当前正在使用以及强制启用的插件
                    disabled:
                      typeof InPageEdit.myPreference !== 'undefined' ||
                      val._force === true, // 强制启用或者本地保存设定时禁止改变
                  }).on('change', function () {
                    // 当插件选择框变化时，暂存设定档
                    var $this = $(this)
                    var checked = $this.prop('checked')
                    var original = $modalContent.data('plugins')
                    var index = original.indexOf(key)
                    // 勾选且暂未启用
                    if (checked && index < 0) {
                      original.push(key)
                    }
                    // 取消勾选且已启用
                    if (!checked && index >= 0) {
                      original.splice(index, 1)
                    }
                    // 暂存
                    $modalContent.data('plugins', original)
                  }),
                  $('<span>'), // checkbox框框
                  $('<div>', { class: 'plugin-name', text: name }),
                  $('<div>', { class: 'plugin-author', html: author }),
                  $('<div>', { class: 'plugin-description', text: description })
                )
              )
            )
          })
        }

        // 获取Analysis数据
        const userName = config.wgUserName
        $.get(`${analyticsApi}/query/user`, {
          userName,
          siteUrl: require('./_analytics').getSiteID(),
          prop: '*',
        }).then((ret) => {
          $tabContent.find('#analysis-container').html('')
          /** @type {{ userName: string; siteUrl: string; siteName: string; _total: number; features: { featureID: string; count: number }[] }} */
          const data = ret.body.query[0]
          const total = data._total
          const dashUrl = `${analyticsDash}/user?${$.param({
            userName,
            siteUrl: data.siteUrl,
          })}`
          let featData = data.features
          featData = featData.sort((a, b) => b.count - a.count)

          const featTable = $('<table>', {
            class: 'wikitable',
            style: 'width: 96%',
          }).append(
            $('<tr>').append(
              $('<th>', { text: 'ID' }),
              $('<th>', { text: 'Count' }),
              $('<th>', { text: '%' })
            )
          )
          featData.forEach(({ count, featureID }) => {
            featTable.append(
              $('<tr>').append(
                $('<th>', { text: featureID }),
                $('<td>', { text: count }),
                $('<td>', { text: ((count / total) * 100).toFixed(2) + '%' })
              )
            )
          })
          $tabContent.find('#analysis-container').append(
            $('<h4>', {
              text: `${data.userName}@${data.siteName}`,
            }),
            $('<p>').append(
              $link({
                href: dashUrl,
                text: 'Analytics Dashboard →',
              })
            ),
            $('<p>').append(_msg('preference-analysis-totaluse', total)),
            featTable
          )
        })
      },
    })
  },
}

module.exports = {
  preference,
}
