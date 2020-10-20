const api = require('./api.json');
const { _msg } = require('./_msg')

function getNotice(cb) {
  return $.get(api.specialNotice).then(data => { cb && cb(data) })
}

function isViewed({ id }) {
  var noticeList = localStorage.getItem('InPageEditNoticeId') || []
  try {
    noticeList = JSON.parse(noticeList)
  } catch (e) {
    noticeList = []
  }
  var viewed = id.includes(noticeList)
  console.info('[InPageEdit] Notice with id: ' + id, viewed)
  return viewed
}

function setViewed({ id }) {
  var noticeList = localStorage.getItem('InPageEditNoticeId') || []
  try {
    noticeList = JSON.parse(noticeList)
  } catch (e) {
    noticeList = []
  }
  if (!id.includes(noticeList)) {
    noticeList.push(id)
  }
  localStorage.setItem('InPageEditNoticeId', JSON.stringify(noticeList))
  console.info('[InPageEdit] Notice save as viewed', id)
}

function makeList({ id, level, title, message }) {
  return $('<section>', { class: 'notice-list level-' + level, id }).append(
    $('<h4>', { html: title }),
    $('<div>', { html: message })
  )
}

/**
 * @module specialNotice 特别通知
 */
var specialNotice = function () {
  var noticeContainer = $('<div>', { class: 'ipe-notice-container' }),
    noticeList = []
  getNotice(data => {
    $.each(data, (_, item) => {
      if (!isViewed(item)) {
        noticeList.push(makeList(item))
      }
    })

    // 没有未读消息
    if (noticeList.length < 1) return

    noticeContainer.append(noticeList)
    ssi_modal.show({
      className: 'in-page-edit ipe-special-notice',
      sizeClass: 'dialog',
      outSideClose: false,
      center: true,
      title: _msg('version-notice-title'),
      content: noticeContainer,
      buttons: [{
        label: _msg('updatelog-dismiss'),
        className: 'btn btn-single',
        method(e, modal) {
          modal.close()
          $.each(noticeList, (_, item) => {
            setViewed(item)
          })
        }
      }]
    })
  })
}

module.exports = {
  specialNotice,
  getNotice
}
