var express = require('express');
const { query } = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'inpageedit';

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Hello world',
    header: '你好世界',
    content: 'Wjghj Project API. © Wjghj Proj (2018 - ' + new Date().getFullYear() + ')'
  });
});

router.all('/inpageedit', (req, res) => {
  res.send({
    status: true,
    msg: {
      query: {
        url: 'https://api.wjghj.cn/inpageedit/query',
        method: 'get'
      },
      submit: {
        url: 'https://api.wjghj.cn/inpageedit/submit',
        method: 'post'
      }
    },
    about: [
      'InPageEdit Analysis V4',
      'Powered by: MongoDB & Express',
      'Author: 机智的小鱼君'
    ]
  }).status(200);
});

router.get('/inpageedit/query', (req, res) => {
  // 预定义返回数据
  var final = {};
  final.status = true;
  final.about = [
    'InPageEdit Analysis V4',
    'Powered by: MongoDB & Express',
    'Author: 机智的小鱼君'
  ];
  final.msg = [];

  /**
   * @description 验证请求参数
   */
  var query = req.query;
  var type = query.type || 'wiki',
    sitename = query.sitename || '',
    siteurl = query.siteurl || '',
    username = query.username || '',
    limit = query.limit,
    find = {};
  // type
  switch (type) {
    case 'date':
    case 'time':
      type = 'date';
      break;
    case 'wiki':
    case 'site':
    case 'wikis':
    case 'sites':
    default:
      type = 'wiki';
      break;
  }
  if (siteurl !== '') {
    // url
    find.url = String(siteurl);
    final.msg.push('Find via URL: ' + siteurl);
  } else if (sitename !== '') {
    // sitename
    find.sitename = String(sitename);
    final.msg.push('Find via SiteName: ' + sitename);
  }
  // limit
  if (limit === 'max') limit = 25;
  if (Number(limit) < 1 || Number(limit) > 25 || isNaN(limit)) limit = 10;

  /** 
   * @description 干爆数据库
   */
  MongoClient.connect(url, {}, (err, client) => {
    if (err) {
      final.status = false;
      final.errors = err;
      res.send(final);
    } else {
      // 载入文档
      const db = client.db(dbName);

      if (type === 'wiki') {
        var collection = db.collection('analysis');
      } else {
        var collection = db.collection('date');
        find = {};
      }

      // 查询数据
      collection.find(find).toArray((err, docs) => {
        if (err) {
          final.status = false;
          final.errors = err;
          res.send(final);
        } else {
          // 芜湖起飞~
          final.query = docs[0];
          res.send(final);
        }
      });
    }
    client.close();
  });
});

router.post('/inpageedit/submit', (req, res) => {
  // 预定义返回数据
  var final = {};
  final.status = true;
  final.about = [
    'InPageEdit Analysis V4',
    'Powered by: MongoDB & Express',
    'Author: 机智的小鱼君'
  ];
  final.msg = [];

  // 验证请求参数
  var query = req.query;
  var url = query.url,
    sitename = query.sitename,
    username = query.username,
    functionID = query.function;

  var functionAllowed = [
    'quick-edit'
  ];
  if (functionAllowed.indexOf(functionID) < 0) {
    final.errors = [
      'Invalid function ID: ' + functionID
    ];
    final.status = false;
    res.send(final);
    return;
  }
});

module.exports = router;
