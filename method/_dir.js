/**
 * @returns {String} https://cdn.jsdelivr.net/... 结尾没有/
 */
function getDir() {
  var thisScript = document.currentScript.src;
  var thisUrl = thisScript.split('/');
  // 理论上入口文件位于 /dist/*.js
  // 因此删掉最后两位路径
  thisUrl.pop();
  thisUrl.pop();
  thisUrl = thisUrl.join('/');
  return thisUrl;
}

/**
 * @constant {String} _dir CDN URL
 */
const _dir = getDir();

module.exports = _dir;