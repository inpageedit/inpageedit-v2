const { stepModal } = require("../module/stepModal")
const { $checkbox } = require("../module/_elements")

/**
 * @returns {Object} options
 * @returns {Promise}
 */
const beforeInstall = async () => {
  var $def = $.Deferred()

  var options = {}
  var skip = false

  function setOption(el) {
    el = $(el)
    var id = $(el).find('input').attr('id')
    if (!id) return
    var val
    if ($(el).find('input').attr('type') === 'checkbox') {
      val = $(el).find('input').prop('checked')
    } else {
      val = $(el).find('input').val()
    }
    options[id] = val
  }

  if (skip) {
    console.info('skip InPageEdit Install guide')
    $def.resolve(options)
  } else {
    stepModal({
      title: 'Installing InPageEdit',
      doneBtn: 'start using~',
      contents: [{
        content: $('<div>').append(
          $('<h3>', { text: 'Data privacy' }),
          $('<p>').append(
            'blah blah',
            $checkbox({ id: 'shareMyInfo', label: 'I am willing to share my non-private data' }).change(function () {
              setOption(this)
            })
          )
        )
      }, {
        content: $('<div>').append(
          $('<h3>', { text: 'Preference' }),
          $('<p>').append(
            $checkbox({ id: 'editMinor', label: 'Default set minor edit' }).change(function () {
              setOption(this)
            })
          )
        )
      }, {
        content: 'Install finished! Thank you for using InPageEdit. Enjoy~'
      }]
    }).then(() => {
      $def.resolve(options)
    })
  }
  return $def
}

module.exports = {
  beforeInstall
}