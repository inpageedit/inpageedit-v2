/**
 * @name IPE-edit-any-page
 * @author 机智的小鱼君
 * InPageEdit自定义小addon
 * 在toolbox添加一个可以编辑任何指定页面的按钮
 */
mw.hook('InPageEdit.toolbox').add(function () {
  $('#ipe-edit-toolbox .btn-group.group1').append(
    $('<li>', { class: 'btn-tip-group' }).append(
      $('<div>', { class: 'btn-tip', text: '编辑指定页面' }),
      $('<button>', { class: 'ipe-toolbox-btn fa fa-edit' }).click(function () {
        ssi_modal.show({
          className: 'in-page-edit',
          sizeClass: 'dialog',
          center: true,
          outSideClose: false,
          title: '快速编辑页面',
          content: $('<div>').append(
            $('<label>').append(
              $('<b>', { text: '请指定页面名' }),
              $('<br>'),
              $('<input>', { id: 'which-page', style: 'width: 96%', value: mw.config.get('wgPageName') }).click(function () { $(this).css('box-shadow', ''); })
            )
          ),
          buttons: [{
            label: '确定',
            className: 'btn btn-primary IPE-anypage-ok',
            keyPress: 13, // Enter
            method: function (a, modal) {
              var page = $('#which-page').val();
              if (page === '' || page === undefined) {
                $('#which-page').css('box-shadow', '0 0 4px red');
                return false;
              }
              modal.close();
              InPageEdit.quickEdit({
                page: page,
                reload: false
              });
            }
          }, {
            label: '取消',
            className: 'btn btn-secondary IPE-anypage-cancel',
            keyPress: 27, // Esc
            method: function (a, modal) {
              modal.close();
            }
          }]
        });
      })
    )
  );
});