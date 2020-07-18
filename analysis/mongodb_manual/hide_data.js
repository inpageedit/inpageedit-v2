/** 
 * InPageEdit Analysis 隐藏wiki数据
 * @author 机智的小鱼君
 * @description 用于隐藏特定数据的 MongoDB 脚本
 */

// 查找的 wiki
var siteID = 'https://bar.com';

// 隐藏的信息
var hideUrl = false;
var hideSitename = false;
var hideUser = '';

// 查找的集合(一般不修改)
var col = 'analysis_test';

/**
 * @function 随机字符串
 */
function randomString(n) {
  let str = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let tmp = '',
    i = 0,
    l = str.length;
  for (i = 0; i < n; i++) {
    tmp += str.charAt(Math.floor(Math.random() * l));
  }
  return tmp;
}

db.getCollection(col).find({ _id: siteID }).limit(1).forEach(doc => {
  var wikiRandom = '_' + randomString(40);
  var userRandom = '_' + randomString(8);
  if (hideUrl) {
    // 备份旧数据
    doc.url_history = doc.url_history || [];
    doc.url_history.push(doc.url);
    // 替换随机字符串
    doc.url = wikiRandom;
    doc.urlIsHidden = true;
  }
  if (hideSitename) {
    // 备份旧数据
    doc.sitename_history = doc.sitename_history || [];
    doc.sitename_history.push(doc.sitename);
    // 替换随机字符串
    doc.sitename = wikiRandom;
    doc.sitenameIsHidden = true;
  }
  if (hideUser !== '' && hideUser !== undefined) {
    // 备份旧数据
    doc.users[hideUser].rename_history = doc.users[hideUser].rename_history || [];
    doc.users[hideUser].rename_history.push(hideUser);
    // 替换随机字符串
    var userData = doc.users[hideUser];
    userData.userIsHidden = true;
    doc.users[userRandom] = userData;
    delete doc.users[hideUser];
  }
  db.getCollection(col).update({ _id: siteID }, doc);
});