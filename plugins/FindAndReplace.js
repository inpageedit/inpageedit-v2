/**
 *『Wjghj Project Static』
 * This _JavaScript_ code is from https://common.wjghj.cn
 * CC BY-NC-SA
 **/
(function (contengut) {
  if (contengut === this.undefined) contengut = $('.in-page-edit.ipe-editor .editArea');
  var origin = contengut.val();

  ssi_modal.show({
    className: 'in-page-edit',
    title: '查找和替换',
    content: '<div class="module far-module"><div class="module_content" id="findfielddiv"><div>查找文本<div style="padding-top:3px;"><textarea id="find_this" style="margin: 0; width:100%;" rows="4" wrap="off"></textarea></div></div><div style="padding-top:8px;">替换文本</div><div style="padding-top:3px;"><textarea id="replace_with" style="margin: 0; width:100%;" rows="4" wrap="off" placeholder=""></textarea></div><div style="padding:7px 0px 7px 0px;"><table><tr><td><input type="checkbox" id="globl" checked disabled><label for="globl">全局匹配（暂时只能全局替换）</label></td></tr><tr><td><input type="checkbox" id="case_sen"><label for="case_sen">区分大小写</label></td></tr><tr><td><input type="checkbox" id="regex_search"><label for="regex_search">启用正则表达式</label></td></tr><tr><td><span id="far-found"></span></td></tr></table></div></div></div>',
    buttons: [
      {
        label: '还原',
        className: 'btn btn-danger',
        method: function (e, modal) {
          contengut.val(origin);
          ssi_modal.notify('info', {
            title: '还原替换的文字',
            content: '已将编辑框的内容还原为本次开启窗口前的内容。'
          });
          // modal.close();
        }
      },
      {
        className: 'btn btn-primary',
        label: '查找并替换',
        method: function (nothing, modal) {
          /**
           * 查找替换主函数
           * 借鉴：https://dev.fandom.com/wiki/MediaWiki:FindAndReplace/code.js
           **/
          if ($('#find_this').val() === '') {
            ssi_modal.notify('info', {
              title: '查找替换失败',
              content: '请输入需要查找的内容。'
            });
            return;
          }
          var searchfor = '',
            searchexp,
            $textarea = contengut,
            replacewith = $('#replace_with').val().replace(/\r/gi, ''),
            text = $textarea.val().replace(/\r/gi, ''),
            flagg = 'g',
            flagi = 'i',
            enableregex = 0;

          if ($('#globl').prop('checked') === false) {
            flagg = '';
          }
          if ($('#case_sen').prop('checked') === true) {
            flagi = '';
          }
          if ($('#regex_search').prop('checked') === true) {
            enableregex = 1;
          }
          var flags = flagg + flagi + 'm';
          if (enableregex === 1) {
            searchfor = $('#find_this').val();
          } else {
            searchfor = $('#find_this').val().replace(/\r/gi, '').replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
          }
          searchexp = new RegExp(searchfor, flags);
          var rcount = 0;
          var matched = text.match(searchexp);
          if (matched !== null) {
            rcount = matched.length;
          }
          text = text.replace(searchexp, replacewith);
          $textarea.val(text);
          ssi_modal.notify('info', {
            title: '查找并替换',
            content: '已替换' + rcount + '处文本。'
          });
          // modal.close();
        }
      }
    ]
  });
}());
