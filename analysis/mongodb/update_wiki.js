/** 
 * 更新 InPageEdit Analysis wiki 数据
 */

// 设定查找的 wiki 以及集合
var siteID = 'https://bar.com';
var col = 'analysis_test';

// 新数据，不更新留空
var newUrl = '';
var newSiteName = '';

// 查找 wiki
db.getCollection(col).find({ _id: siteID }).forEach(doc => {
  // 是否重新生成文档
  var resetDoc = false;

  // 设定新的数据
  if (newSiteName !== '' && newSiteName !== undefined) {
    doc.sitename = newSiteName;
  }
  if (newUrl !== '' && newUrl !== undefined) {
    // 存档旧 url
    doc.url_history = doc.url_history || [];
    doc.url_history.push(doc.url);

    // 设置新的 url
    doc._id = newUrl;
    doc.url = newUrl;

    // 更新 _id 需要重插文档
    resetDoc = true;
  }

  // 更新文档
  if (resetDoc) {
    db.getCollection(col).insertOne(doc);
    db.getCollection(col).remove({ _id: siteID });
  } else {
    db.getCollection(col).update({ _id: siteID }, doc);
  }
});