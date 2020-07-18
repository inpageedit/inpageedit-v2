/** 
 * InPageEdit Analysis 更新wiki数据
 * @author 机智的小鱼君
 * @description 用于更新 wiki 的站名或者域名的 MongoDB 脚本
 */

// 查找的 wiki
var siteID = 'https://bar.com';

// 新数据，不更新留空
var newUrl = '';
var newSiteName = '';

// 查找的集合(一般不修改)
var col = 'analysis_test';

// 查找 wiki
db.getCollection(col).find({ _id: siteID }).limit(1).forEach(doc => {
  // 是否重新生成文档
  var resetDoc = false;

  // 设定新的数据
  if (newSiteName !== '' && newSiteName !== undefined) {
    // 存档旧数据
    doc.sitename_history = doc.sitename_history || [];
    doc.sitename_history.push(doc.sitename);
    // 新数据
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