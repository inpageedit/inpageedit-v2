/**
 * InPageEdit Analysis 用户重命名
 * @author 机智的小鱼君
 * @description 用于更新用户名的 MongoDB 脚本
 */

// 查找的wiki
var siteID = 'https://bar.com';
// 查找的用户名
var userName = '';
// 设定新的用户名
var newUserName = '';

// 查找的集合(一般不修改)
var col = 'analysis_test';

db.getCollection(col).find({ _id: siteID }).limit(1).forEach(doc => {
  if (userName === '' || userName === undefined || newUserName === '' || newUserName === undefined) return false;
  // 用户的数据
  var userData = doc.users[userName];
  // 存档旧数据
  doc.users[newUserName].rename_history = doc.users[newUserName].rename_history || [];
  doc.users[newUserName].rename_history.push(userName);
  // 插入新数据
  doc.users[newUserName] = userData;
  // 删除旧数据
  delete doc.users[userName];
  // 更新文档
  db.getCollection(col).update({ _id: siteID }, doc);
});