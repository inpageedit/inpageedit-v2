/**
 * @license GPL-3.0 GNU GENERAL PUBLIC LICENSE 3.0
 *
 * @name InPageEdit_入口文件
 * @description A JavaScript-based MediaWiki Plugin
 * @author 机智的小鱼君
 * @url https://github.com/Dragon-Fish/InPageEdit-v2
 */
!(function () {
  try {
    null.split(); // 故意使用错误的语法来骗取回调
  } catch (error) {
    var fileName = error.fileName; // 获取脚本源地址
    fileName = fileName.split('/');
    fileName.pop(); // 得到根目录地址 => https://cdn.jsdelivr.net/.../InPageEdit@master
    var main = fileName.join('/') + '/modules/index.js';
    // 将 module script 插入 body
    $('body').append(
      $('<script>', { src: main, type: 'module' })
    );
  }
})();