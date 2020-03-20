/** https://common.wjghj.cn/wiki/InPageEdit-v2/version-info **/
// 在这里填写版本号
InPageEdit.version = '2.8.0(canary_2025)';
// 在这里填写通知
InPageEdit.specialNotice = {status:true,id:'canary1',title:'Canary稳定性警告',content:'作者开始搞事了，这个版本随时可能爆炸。强烈建议您切换到正式版本。',type:'warning'};

/** 显示版本信息模块 **/
InPageEdit.versionInfo = function () {
  var curVersion = InPageEdit.version;
  ssi_modal.show({
    className: 'in-page-edit version-info',
    title: 'InPageEdit更新日志 - <span id="yourVersion">加载中……</span>',
    content: '<div id="IPEversionInfoPlaceholder" class="ipe-progress" style="margin: calc(30% - 1em) auto;"><div class="ipe-progress-bar"></div></div><section style="display:none" id="IPEversionInfo"></section>',
    fitScreen: true,
    fixedHeight: true,
    buttons: [{
      label: '关闭',
      className: 'btn btn-danger',
      method: function(a,modal){
        modal.close();
      }
    },{
      label: '查看插件页面',
      className: 'btn btn-secondary',
      method: function(){
        location.href = 'https://common.wjghj.cn/wiki/InPageEdit-v2';
      }
    },{
      label: '查看更新日志',
      className: 'btn btn-secondary',
      method: function(){
        location.href = 'https://common.wjghj.cn/wiki/InPageEdit-v2/version-info';
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
      $('#yourVersion').html('您的版本: [' + localStorage.InPageEditVersion + ']');
      $('#IPEversionInfo .mw-headline').each(function () {
        var $this = $(this),
          text = $this.text();
        if (text === curVersion) {
          $this.html('<em class="curVersion" style="background: lightyellow; font-weight: bold">★CURRENT - ' + $this.text() + '</em>');
        }
      });
      setTimeout('$("#IPEversionInfo").fadeIn(800)',1000);
    }
  });
}

/** 初始化 **/
$(function () {
  var version = InPageEdit.version;
  if (localStorage.InPageEditVersion === null || localStorage.InPageEditVersion !== version) {
    ssi_modal.notify('', {
      title: 'InPageEdit先行版加载成功',
      content: 'InPageEdit插件(版本 ' + version + ')安装成功，感谢你的使用です~',
      className: 'in-page-edit',
      buttons: [{
        className: 'btn btn-primary',
        label: '查看更新日志',
        method: function (a, modal) {
          localStorage.InPageEditVersion = version;
          InPageEdit.versionInfo();
          modal.close();
        }
      }
      ],
      closeAfter: {
        time: 30,
        resetOnHover: true
      },
      onClose: function () {
        ssi_modal.notify('', {
          className: 'in-page-edit',
          content: '先行版很少更新版本号，您随时可以查看<a href="https://common.wjghj.cn/wiki/MediaWiki:Js-InPageEdit-canary.js" target="_blank">代码页面</a>检查最近的代码修改。如果您有任何意见或建议，欢迎<a href="https://blog.wjghj.cn/index.php/contact">联系作者</a>',
          closeAfter: {
            time: 30
          }
        });
        localStorage.InPageEditVersion = version;
      }
    });
  }
  if (InPageEdit.specialNotice.status === true && localStorage.InPageEditNoticeId !== InPageEdit.specialNotice.id) {
    ssi_modal.notify('dialog',{
      className: 'in-page-edit ipe-special-notice ' + InPageEdit.specialNotice.type,
      title: InPageEdit.specialNotice.title,
      content: InPageEdit.specialNotice.content,
      // closeAfter: {time:999},
      okBtn: {
        label: '别担心我超勇的！',
        className: 'btn btn-primary',
      }
    },function(e,modal){
      localStorage.InPageEditNoticeId = InPageEdit.specialNotice.id;
      modal.close();
    });
  }
});
