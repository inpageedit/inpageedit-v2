/** 自动推送IPE **/
if (mw.config.get('wgPageName') === 'MediaWiki:Js-InPageEdit-canary.js') {
  $('#mw-content-text').prepend(
    $('<button>', { id: 'mergeCanary' })
      .text('合并到正式版')
      .click(function () {
        var versionNum = prompt('版本号？', '2.xx.x(build_' + wgRevisionId + ')');
        if (versionNum !== null) {
          var summary = prompt('摘要？', '[Automatic] Merged canary [[Special:Diff/' + wgRevisionId + ']]');
          if (summary !== null) {
            new mw.Api().post({
              action: 'parse',
              page: 'MediaWiki:Js-InPageEdit-canary.js',
              prop: 'wikitext',
              format: 'json'
            }).then(function (data1) {
              var canarytext = data1.parse.wikitext['*'],
                canarynew = canarytext.split('/*** BOT FLAG ***/')[1];
              new mw.Api().post({
                action: 'parse',
                page: 'MediaWiki:Js-InPageEdit-v2.js',
                prop: 'wikitext',
                format: 'json'
              }).then(function (data2) {
                var v2text = data2.parse.wikitext['*'],
                  v2new = v2text.split('/*** BOT FLAG ***/')[0] + '/*** BOT FLAG ***/' + canarynew;
                if (versionNum !== '' && versionNum !== '2.xx.x(build_' + wgRevisionId + ')') v2new = v2new.replace(/\/\*\=version\*\/(.*)\/\*version\=\*\//ig, "/*=version*/InPageEdit.version = '" + versionNum + "';/*version=*/");
                new mw.Api().postWithToken('csrf', {
                  action: 'edit',
                  title: 'MediaWiki:Js-InPageEdit-v2.js',
                  text: v2new,
                  summary: summary
                }).then(function () {
                  alert('成功！');
                });
              });
            });
          }
        }
      })
  );
}
