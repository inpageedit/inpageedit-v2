/**
 * Put this file in your [[Special:Mypage/common.js]] to enable dev mode.
 */
;(function () {
  var s = document.createElement('script')
  s.src = 'http://127.0.0.1:1225/InPageEdit.js?_=' + Date.now()
  s.onload = function () {
    console.info('[InPageEdit] Enable dev mode')
  }
  s.onerror = function () {
    console.info('[InPageEdit] Cannot fetch dev server')
    mw.loader.load('https://unpkg.com/mediawiki-inpageedit')
  }
  document.body.appendChild(s)
})()
