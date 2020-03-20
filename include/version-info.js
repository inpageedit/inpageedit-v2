/** https://common.wjghj.cn/wiki/InPageEdit-v2/version-info **/
(function(){
// 在这里填写版本号
InPageEdit.version = '2.8.0.1(build_2213)';
// 在这里填写通知
InPageEdit.specialNotice = { status: true, id: 'build_1948_notify', title: '告知函：收集您的部分信息', content: '您好，感谢使用InPageEdit！从2.6.4(build_1897)版本开始，我在插件中加入了一些可能收集您信息的功能。可能收集的信息有：您所编辑的wiki、您使用IPE进行保存的次数、您使用IPE其他功能的次数、您使用IPE的日期。<br/>我保证不会收集您的任何个人cookie及隐私信息，收集的全部信息都会公开展示。您可以前往<a href="https://doc.wjghj.cn/InPageEditAnalysis/" target="_blank">https://doc.wjghj.cn/InPageEditAnalysis/</a>查看插件的统计数据我收集这些信息的目的是为了给我一个数据的参考，让我对IPE插件未来的发展方向有一个清晰的认识。<br/>目前我没有制作关掉收集信息功能的选项，如果您不希望我收集您的任何信息，请停止使用本插件。诚挚的希望您可以给我提出反馈！<br/>', type: '' };

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
      method: function (a, modal) {
        modal.close();
      }
    }, {
      label: '查看插件页面',
      className: 'btn btn-secondary',
      method: function () {
        location.href = 'https://common.wjghj.cn/wiki/InPageEdit-v2';
      }
    }, {
      label: '查看更新日志',
      className: 'btn btn-secondary',
      method: function () {
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
      setTimeout('$("#IPEversionInfo").fadeIn(800)', 1000);
    }
  });
}

/** 初始化 **/
$(function () {
  var version = InPageEdit.version;
  if (localStorage.InPageEditVersion === null || localStorage.InPageEditVersion !== version) {
    ssi_modal.notify('', {
      title: 'InPageEdit加载成功',
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
          content: '在下一次插件更新前本弹窗将不再弹出，您随时可以查看<a href="https://common.wjghj.cn/wiki/InPageEdit-v2" target="_blank">InPageEdit插件说明</a>获取InPageEdit的最新功能以及即将支持的功能！如果您有任何意见或建议，欢迎<a href="https://blog.wjghj.cn/index.php/contact">联系作者</a>',
          closeAfter: {
            time: 10
          }
        });
        localStorage.InPageEditVersion = version;
      }
    });
  }
  if (InPageEdit.specialNotice.status === true && localStorage.InPageEditNoticeId !== InPageEdit.specialNotice.id) {
    ssi_modal.notify('dialog', {
      className: 'in-page-edit ipe-special-notice',
      title: InPageEdit.specialNotice.title,
      content: InPageEdit.specialNotice.content,
      okBtn: {
        label: '不再提示',
        className: 'btn btn-primary'
      }
    }, function (e,modal) {
      localStorage.InPageEditNoticeId = InPageEdit.specialNotice.id;
      modal.close();
    });
  }
});
})();
