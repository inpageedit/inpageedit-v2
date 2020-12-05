var config = mw.config.get()
const { stepModal } = require('../module/stepModal')
const { $checkbox } = require('../module/_elements')
const { _msg } = require('../module/_msg')

/**
 * @param {Boolean} force Force show the steps modal @default false
 * @returns {Promise} User options
 */
const beforeInstall = async (force = false) => {
  // 创建 Deferred 类
  var $def = $.Deferred()

  // 缓存选项
  var options = {}

  // 判定是否显示
  var skip = true
  // 选项为强制显示
  if (force) skip = false
  // 从未显示过
  if (!localStorage.getItem('InPageEditInstallGuide')) skip = false

  /**
   * @function setOption
   * @param {Element} el DOM element
   */
  function setOption(el) {
    var $el = $(el)
    var id = $el.find('input').attr('id')
    if (!id) return
    var val
    if ($el.find('input').attr('type') === 'checkbox') {
      val = $el.find('input').prop('checked')
    } else {
      val = $el.find('input').val()
    }
    options[id] = val
    console.info('[InPageEdit] beforeInstall setOption', `${id}: ${val}`)
  }

  if (skip) {
    console.info('[InPageEdit] Skip InPageEdit Install guide')
    $def.resolve(options)
  } else {
    // 设置步骤
    var contents = []

    // 欢迎辞
    contents.push({
      content: $('<div>').append(
        $('<h3>', { text: _msg('preference-about-label') }),
        $('<div>', { text: _msg('beforeInstall-greeting-description') })
      ),
    })
    // 隐私政策
    contents.push({
      content: $('<div>').append(
        $('<h3>', { text: _msg('beforeInstall-privacy-policy-title') }),
        $('<div>').append(
          $('div', { html: _msg('beforeInstall-privacy-policy-description') }),
          $checkbox({
            id: 'shareMyInfo',
            label: _msg('beforeInstall-privacy-policy-label'),
          })
        )
      ),
    })
    // 首选项
    contents.push({
      content: $('<div>').append(
        $('<h3>', { text: _msg('preference-title') }),
        $('<div>').append(
          $('<div>', {
            text: _msg('beforeInstall-preference-description'),
          }).css({ 'font-size': '0.8em' }),
          $('<h4>', { text: _msg('preference-editHobits-label') }),
          $checkbox({ id: 'editMinor', label: _msg('preference-setMinor') }),
          $checkbox({ id: 'watchList', label: _msg('preference-watchList') }),
          $checkbox({
            id: 'watchoutSideCloseList',
            label: _msg('preference-outSideClose'),
          }),
          $('<h4>', { text: _msg('preference-summary-label') }),
          $('<label>').append(
            $('<span>', { html: _msg('preference-editSummary') }),
            $('<input>', {
              id: 'editSummary',
              value: _msg('preference-summary-default'),
            })
          )
        )
      ),
    })
    // 打赏
    if (
      config.wgUserLanguage === 'zh' ||
      config.wgUserLanguage === 'zh-hans' ||
      config.wgUserLanguage === 'zh-cn'
    ) {
      contents.push({
        content: $('<div>').append(
          $('<h3>', { text: '支持作者' }),
          $('<div>').append(
            '该步骤拟定推送给简体中文使用者，并附上作者的收款码。但经过与部分用户的交流后，认为接受打赏可能会导致冲塔，故暂时省略了此步骤。您可以直接点击下一步按钮'
          )
        ),
      })
    }
    // 完成安装
    contents.push({
      content: $('<div>').append(
        $('<h3>', { text: _msg('beforeInstall-success-title') }),
        $('<div>', { text: _msg('beforeInstall-success-description') })
      ),
    })

    // 显示模态框
    stepModal({
      title: 'Installing InPageEdit',
      doneBtn: _msg('beforeInstall-done'),
      contents,
      onShow(modal) {
        var $modal = $('#' + modal.modalId)
        function addEvent() {
          $modal.find('input').unbind()
          $modal.find('input').change(setOption)
        }
        addEvent()
        $modal.find('.ssi-modalBtn.btn').click(addEvent)
      },
    }).then(() => {
      localStorage.setItem('InPageEditInstallGuide', new Date().getTime())
      $def.resolve(options)
    })
  }

  // 返回 Promise
  return $def
}

module.exports = {
  beforeInstall,
}
