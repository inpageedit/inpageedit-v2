/**
 * @module toolbox 工具盒模块
 */
mw.hook('InPageEdit').add(({
  _analysis,
  _msg,
  InPageEdit
}) => {
  var config = mw.config.get();
  // 检测是否为文章页
  if (!config.wgIsArticle || $('#ipe-edit-toolbox').length > 0) {
    console.warn('[InPageEdit] 未载入 Toolbox');
    return;
  }

  /** IPE工具盒 **/
  var $toolbox = $('<div>', { id: 'ipe-edit-toolbox' }).append(
    $('<ul>', { class: 'btn-group group1' }).append(
      $('<li>', { class: 'btn-tip-group' }).append(
        $('<div>', { class: 'btn-tip', text: _msg('quick-edit') }),
        $('<button>', { id: 'edit-btn', class: 'ipe-toolbox-btn', html: '<i class="fa fa-pencil"></i>' }).click(function () {
          InPageEdit.quickEdit({
            page: config.wgPageName,
            revision: config.wgRevisionId
          });
        })
      ),
      $('<li>', { class: 'btn-tip-group' }).append(
        $('<div>', { class: 'btn-tip', text: _msg('redirect-from') }),
        $('<button>', { id: 'redirectfrom-btn', class: 'ipe-toolbox-btn', html: '<i class="fa fa-sign-in"></i>' }).click(function () {
          InPageEdit.quickRedirect('from');
        })
      ),
      $('<li>', { class: 'btn-tip-group' }).append(
        $('<div>', { class: 'btn-tip', text: _msg('redirect-to') }),
        $('<button>', { id: 'redirectto-btn', class: 'ipe-toolbox-btn', html: '<i class="fa fa-sign-out"></i>' }).click(function () {
          InPageEdit.quickRedirect('to');
        })
      )
    ),
    $('<ul>', { class: 'btn-group group2' }).append(
      $('<div>', { style: 'display: flex;' }).append(
        $('<li>', { class: 'btn-tip-group' }).append(
          $('<div>', { class: 'btn-tip', text: _msg('quick-delete') }),
          $('<button>', { id: 'deletepage-btn', class: 'ipe-toolbox-btn', html: '<i class="fa fa-trash"></i>' }).click(function () {
            InPageEdit.quickDelete();
          })
        ),
        $('<li>', { class: 'btn-tip-group' }).append(
          $('<div>', { class: 'btn-tip', text: _msg('quick-rename') }),
          $('<button>', { id: 'renamepage-btn', class: 'ipe-toolbox-btn', html: '<i class="fa fa-italic"></i>' }).click(function () {
            InPageEdit.quickRename();
          })
        ),
        $('<li>', { class: 'btn-tip-group' }).append(
          $('<div>', { class: 'btn-tip', text: _msg('ipe-preference') }),
          $('<button>', { id: 'preference-btn', class: 'ipe-toolbox-btn', html: '<i class="fa fa-gear"></i>' }).click(function () {
            InPageEdit.preference.modal();
          })
        )
      )
    ),
    $('<button>', { class: 'ipe-toolbox-btn', id: 'toolbox-toggle', html: '<i class="fa fa-plus"></i>' })
  );

  $toolbox.appendTo('body');

  $toolbox.find('.btn-group button').click(function () {
    _analysis('tool_box')
  });

  // 设置开关等
  var toolBoxInner = $toolbox.find('#toolbox-toggle, .btn-group');
  $toolbox.find('#toolbox-toggle').click(function () {
    if ($(this).hasClass('opened') && !$(this).hasClass('click')) {
      InPageEdit.preference.set({ lockToolBox: true });
      toolBoxInner.addClass('click');
    } else if ($(this).hasClass('click')) {
      InPageEdit.preference.set({ lockToolBox: false });
      toolBoxInner.removeClass('click');
    } else {
      InPageEdit.preference.set({ lockToolBox: true });
      toolBoxInner.addClass('click opened');
    }
  });
  // 如果锁定过工具盒，就自动展开
  if (InPageEdit.preference.get('lockToolBox') === true) {
    toolBoxInner.addClass('click opened');
  }
  // 鼠标覆盖与离开
  $toolbox.mouseover(function () {
    toolBoxInner.addClass('hover opened');
  });
  $toolbox.mouseout(function () {
    toolBoxInner.removeClass('hover');
    if (!$toolbox.find('#toolbox-toggle').hasClass('click')) {
      toolBoxInner.removeClass('opened');
    }
  });
  // 触发钩子，传递上下文
  mw.hook('InPageEdit.toolbox').fire({
    $toolbox
  });
});