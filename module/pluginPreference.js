var InPageEdit = window.InPageEdit || {};

const { _analysis } = require('./_analysis');
const { _msg } = require('./_msg');
const { $br, $hr } = require('./_elements');

const api = require('./api.json')
const version = require('./version');

/**
 * @module preference 个人设置模块
 */
var pluginPreference = {
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
    watchList: Boolean(mw.user.options.get('watchdefault'))
  },
  /**
   * @name 获取设置 
   * @description 合并保存在用户页的设置以及localStorage的设置，有容错机制
   * @param {string} setting 返回相应的设置，为空时返回全部设置
   * @return {object|string}
   */
  get: function (setting) {
    setting = setting || undefined;
    var local = localStorage.getItem('InPageEditPreference') || '{}';
    try {
      local = JSON.parse(local);
    } catch (e) {
      local = {};
    }
    if (typeof InPageEdit.myPreference === 'object') {
      local = $.extend({}, local, InPageEdit.myPreference);
    }
    var json = $.extend({}, pluginPreference.default, local);
    if (typeof (setting) === 'string' && setting !== '') {
      return json.setting ? json[setting] : null;
    } else {
      return json;
    }
  },
  /**
   * @name 保存设置
   * @param {Object|string} settingKey
   * @param {any} settingValue
   * @example 可以这样 pluginPreference.set({ key: 'value' }) 也可以 pluginPreference.set('key', 'value')
   */
  set: function (settingKey = {}, settingValue = undefined) {
    var options = {};
    if (typeof settingKey === 'string' && settingValue !== undefined) {
      options[settingKey] = settingValue;
    } else if (typeof settingKey === 'object') {
      options = settingKey;
    } else {
      return;
    }
    options = $.extend({}, pluginPreference.get(), options);
    options = JSON.stringify(options);
    localStorage.setItem('InPageEditPreference', options);
  },
  /**
   * @name 用户图形界面
   * @description 打开可视化设置窗口
   */
  modal: function () {
    // 防止多开设置页面
    if ($('#ipe-preference-form').length > 0) return;

    mw.hook('pluginPreference').fire();
    pluginPreference.set();
    var local = pluginPreference.get();
    _analysis('plugin_setting');

    ssi_modal.show({
      outSideClose: false,
      title: _msg('preference-title') + ' - ' + version,
      content:
        $('<section>', { id: 'ipe-preference-form', class: 'ipe-preference-form' }).append(
          $('<h4>', { text: _msg('preference-editor-label') }),
          $('<label>').append(
            $('<input>', { id: 'outSideClose', type: 'checkbox' }).prop('checked', local.outSideClose),
            $('<span>', { text: _msg('preference-outSideClose') })
          ),
          $br,
          $('<label>').append(
            $('<input>', { id: 'editMinor', type: 'checkbox' }).prop('checked', local.editMinor),
            $('<span>', { text: _msg('preference-setMinor') })
          ),
          $br,
          $('<h4>', { text: _msg('preference-summary-label') }),
          $('<label>', { for: 'editSummary', style: 'padding-left: 0; font-size: small', html: _msg('preference-editSummary') }),
          $br,
          $('<input>', { id: 'editSummary', style: 'width: 96%', value: local.editSummary, placeholder: 'Edit via InPageEdit, yeah~' }),
          $('<h4>', { text: _msg('preference-analysis-label') }),
          $('<span>', { style: 'font-size: small; line-height: 0.9em', html: _msg('preference-analysis-view', `[${api.analysisUrl} ${api.analysisUrl}]`) }),
          $('<h4>', { text: _msg('preference-about-label') }),
          $('<button>', { class: 'btn btn-secondary', onclick: "InPageEdit.about()", text: _msg('preference-aboutAndHelp') }),
          $('<button>', { class: 'btn btn-secondary', style: 'margin-left: 1em;', onclick: "InPageEdit.versionInfo()", text: _msg('preference-updatelog') }),
          $('<a>', { href: 'https://ipe.miraheze.org/wiki/', target: '_blank', style: 'margin-left: 1em;' }).append(
            $('<button>', { class: 'btn btn-secondary', text: _msg('preference-translate') })
          ),
          $('<a>', { href: 'https://discord.gg/VUVAh8w', target: '_blank', style: 'margin-left: 1em;' }).append(
            $('<button>', { class: 'btn btn-secondary', text: _msg('preference-discord') })
          ),
          $hr,
          $('<strong>', { style: 'font-size: small; line-height: 0.9em', text: _msg('preference-savelocal-label') }),
          $br,
          $('<span>', { style: 'font-size: small; line-height: 0.9em', text: _msg('preference-savelocal') }).append(
            $('<a>', { href: 'javascript:;', id: 'ipeSaveLocalShow', text: _msg('preference-savelocal-btn') }).click(function () {
              // 永久保存（本地用户页）
              ssi_modal.dialog({
                className: 'in-page-edit',
                center: true,
                title: _msg('preference-savelocal-popup-title'),
                content: '<section id="ipeSaveLocal">' + _msg('preference-savelocal-popup') + '<br/><textarea style="font-size: 12px; resize: none; width: 100%; height: 10em;" readonly></textarea><br/>' + _msg('preference-savelocal-popup-notice') + '</section>',
                okBtn: {
                  className: 'btn btn-primary btn-single',
                  label: _msg('ok')
                }
              });
              $('#ipeSaveLocal textarea').val('/** InPageEdit Preferences **/\nwindow.InPageEdit = window.InPageEdit || {}; // Keep this line\nInPageEdit.myPreference = ' + JSON.stringify($.extend({}, pluginPreference.get(), $('#ipe-preference-form').data()), null, 2));
            })
          )
        ),
      sizeClass: 'dialog',
      className: 'in-page-edit ipe-preference',
      center: true,
      buttons: [{
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
          }, (res) => {
            if (res) {
              pluginPreference.set(pluginPreference.default);
              modal.close();
            } else {
              return false;
            }
          });
        }
      }, {
        label: _msg('preference-save'),
        className: 'btn btn-primary',
        method: function (a, modal) {
          pluginPreference.set($('#ipe-preference-form').data());
          modal.close();
        }
      }
      ],
      onShow: function () {
        function setData() {
          if (this.type === 'checkbox') {
            $('#ipe-preference-form').data(this.id, this.checked);
          } else if (this.type === 'text') {
            $('#ipe-preference-form').data(this.id, this.value);
          }
        }
        $('#ipe-preference-form input').each(setData).change(setData);

        if (typeof (InPageEdit.myPreference) !== 'undefined') {
          $('#ipe-preference-form input, .ipe-preference .ssi-modalBtn').attr({ 'disabled': 'disabled' });
          $('#ipe-preference-form').prepend(
            $('<p>', { class: 'has-local-warn', style: 'padding-left: 8px; border-left: 6px solid orange; font-size: small;', html: _msg('preference-savelocal-popup-haslocal') })
          );
        }
      }
    });
  }
}

module.exports = {
  pluginPreference
}