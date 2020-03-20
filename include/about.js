(function () {
  ssi_modal.show({
    title: '关于InPageEdit',
    className: 'in-page-edit-about in-page-edit',
    fitScreen: true,
    fixedHeight: true,
    content: '<div id="placeholder" class="ipe-progress" style="margin: calc(30% - 1em) auto;"><div class="ipe-progress-bar"></div></div><section style="display:none"></section>',
    buttons: [{ label: '', className: 'hideBtn' }],
    onShow: function () {
      $('.in-page-edit-about .hideBtn').remove();
      $.ajax({
        url: 'https://common.wjghj.cn/api.php',
        dataType: 'jsonp',
        type: 'post',
        data: {
          page: 'InPageEdit-v2',
          action: 'parse',
          prop: 'text',
          format: 'json'
        },
        success: function (data) {
          var info = data.parse.text['*'];
          $('.in-page-edit-about #placeholder').addClass('done').fadeOut(800);
          $('.in-page-edit-about section').html(info).delay(800).fadeIn(400);
          $('.in-page-edit-about section a[href^="/"]').each(function () {
            $(this).attr('href', 'https://common.wjghj.cn' + $(this).attr('href'));
          });
          $('.in-page-edit-about section img[src^="/"]').each(function () {
            var $this = $(this),
              src = 'https://common.wjghj.cn' + $this.attr('src') + '?_random=' + Math.random();
            $this.attr({
              src: src,
              srcset: ''
            });
          });
        }
      });
    }
  });
})();
