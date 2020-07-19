/** 
 * InPageEdit Analysis 合并wiki数据
 * @author 机智的小鱼君
 * @description 用于合并wiki数据的 MongoDB 脚本
 */

/**
 * @description 旧 wiki 的数据将会被合并到新的 wiki 里，旧 wiki 会被删除，此操作不可逆！
 */

// 旧 wiki
var oldSite = 'https://zh.moegirl.org/';

// 新 wiki
var newSite = 'https://zh.moegirl.org.cn/';

// 查找的集合(一般不修改)
var col = 'analysis_test';

/**
 * @function mergeData
 * @param {object} x 
 * @param {object} y 
 */
function mergeData(x, y) {
  for (let key in y) {
    let val = y[key];
    if (typeof val !== 'object') {
      if (x.hasOwnProperty(key)) {
        if (!isNaN(x[key]) && !isNaN(val)) {
          x[key] += val;
        }
      } else {
        x[key] = val;
      }
    } else {
      if (x.hasOwnProperty(key)) {
        x[key] = mergeData(x[key], val);
      } else {
        x[key] = val;
      }
    }
  }
  return x;
}

var oldData, newData;
db.getCollection(col).find({ _id: newSite }).forEach(doc => {
  newData = doc;
});
db.getCollection(col).find({ _id: oldSite }).forEach(doc => {
  oldData = doc;
});

var merged = mergeData(newData, oldData);

db.getCollection(col).update({ _id: newSite }, merged);
db.getCollection(col).remove({ _id: oldSite });