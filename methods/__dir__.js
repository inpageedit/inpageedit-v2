/**
 * @method script_dir
 * @return Root URL
 */
var __dir__;

try {
  null.split();
} catch (err) {
  var fileName = err.fileName;
  fileName = fileName.split('/');
  fileName.pop();
  fileName.pop();
  __dir__ = fileName.join('/');
}

export default __dir__;