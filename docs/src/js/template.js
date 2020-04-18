var $$ = mdui.JQ;
if (window.self !== window.top) {
  $('body').addClass('iframe');
  $('head').append('<base target="_blank">');
}