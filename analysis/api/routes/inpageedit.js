var express = require('express');
const { query } = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'inpageedit';
// const MongoDB = require('../model/MongoDB');

/** 
 * @description 预定义返回数据
 */
function _returnTemplate() {
  return {
    status: true,
    msg: [],
    about: [
      'InPageEdit Analysis V4',
      'Powered by: MongoDB & Express',
      'Author: 机智的小鱼君'
    ]
  }
};

//设置跨域访问
router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

/**
 * @module root
 */
router.get('/', rootPath);
router.post('/', rootPath);
function rootPath(req, res) {
  var _return = _returnTemplate();

  _return.api = {
    query: {
      url: 'https://api.wjghj.cn/inpageedit/query',
      method: 'get'
    },
    submit: {
      url: 'https://api.wjghj.cn/inpageedit/submit',
      method: 'post'
    },
    update: {
      url: 'https://api.wjghj.cn/inpageedit/update',
      method: 'put'
    }
  }
  _return.msg.push('Hello world');
  res.send(_return);
}

/**
 * @module query
 */
router.get('/query', (req, res) => {
  var _return = _returnTemplate();

  _return.api = {
    wiki: {
      url: 'https://api.wjghj.cn/inpageedit/query/wiki',
      method: 'get'
    },
    date: {
      url: 'https://api.wjghj.cn/inpageedit/query/date',
      method: 'get',
      disabled: 1
    }
  }
  res.send(_return);
});
router.get('/query/wikis?', (req, res) => {
  var _return = _returnTemplate();

  /**
   * @description 验证请求参数
   */
  var query = req.query;
  var sitename = query.sitename || '',
    sitename = decodeURIComponent(sitename),
    siteurl = query.siteurl || query.url || '',
    siteurl = decodeURIComponent(siteurl),
    username = query.username || '',
    limit = query.limit,
    prop = query.prop || 'url|sitename|_total',
    sortBy = query.sortby || query.sort,
    sortProp = query.sortprop || -1,
    find = {};
  if (siteurl !== '') {
    // url
    find.url = String(siteurl);
    _return.msg.push('Find via URL: ' + siteurl);
  } else if (sitename !== '') {
    // sitename
    find.sitename = new RegExp(sitename, 'i');
    _return.msg.push('Find via SiteName: ' + sitename);
    _return.msg.push('Find via sitename is not recommended, please use siteurl instead.')
  }
  // prop
  if (prop === 'all' || prop === '*') prop = {};
  if (typeof prop === 'string') {
    var json = {};
    var prop1 = prop.split('|');
    for (val of prop1) {
      json[val] = 1;
    }
    _return.msg.push('Find with ' + String(Boolean(prop.length > 1) ? 'props' : 'prop') + ': ' + prop1.toString());
    prop = json;
  }

  // sort
  var sortSet = {};
  if (sortBy) {
    if (Number(sortProp) === 1) {
      sortProp = 1;
      _return.msg.push('Sort in acending order of ' + sortBy);
    } else {
      sortProp = -1;
      _return.msg.push('Sort in descending order of ' + sortBy);
    }
    sortSet[sortBy] = sortProp;
  } else {
    sortSet['_id'] = -1;
  }
  // limit
  if (limit === 'max') limit = 25;
  if (Number(limit) < 1 || Number(limit) > 25 || isNaN(limit)) limit = 10;

  /** 
   * @description 干爆数据库
   */
  MongoClient.connect(url, {}, (err, client) => {
    if (err) {
      _return.status = false;
      _return.errors = err;
      res.send(_return);
    } else {
      var db = client.db(dbName);
      var collection = db.collection('analysis');

      // 查询数据
      collection.find(find).project(prop).sort(sortSet).toArray((err, docs) => {
        if (err) {
          _return.status = false;
          _return.errors = err;
          res.send(_return);
        } else {
          // 芜湖起飞~
          _return.query = docs;
          if (query.readable) {
            res.send(readableJson(_return, query));
          } else {
            res.send(_return);
          }
        }
      });
    }
  });
});

/**
 * @module submit
 */
router.route('/submit').get((req, res) => {
  var _return = _returnTemplate();

  _return.status = false;
  _return.errors = [
    'This entrypoint requires POST method.'
  ]
  res.send(_return);
}).post((req, res) => {
  var _return = _returnTemplate();

  // 验证请求参数
  console.log(req.body);
  var query = req.body;
  var url = query.url || query.siteurl,
    sitename = query.sitename,
    username = query.username,
    functionID = query['function'];

  // 过滤功能列表
  var functionAllowed = [
    'find_replace',
    'plugin_setting',
    'preview_edit',
    'quick_diff',
    'quick_diff_edit',
    'quick_diff_history_page',
    'quick_diff_modalclick',
    'quick_diff_recentchanges',
    'quick_edit',
    'quick_edit_pagedetail',
    'quick_edit_pagedetail_edit_template',
    'quick_edit_pagedetail_view_image',
    'quick_edit_save',
    'quick_move',
    'quick_redirect',
    'tool_box'
  ];

  // 验证请求体是否完整
  if (url && sitename && username && functionID) {
    // 验证 functionID
    if (functionAllowed.indexOf(functionID) < 0) {
      _return.errors = [
        'Invalid function ID: ' + functionID
      ];
      _return.query = query;
      _return.status = false;
      res.status(400).send(_return);
    }

    _return.query = query;
    res.send(_return);
  } else {
    _return.status = false;
    _return.errors = [
      'Missing params.'
    ];
    _return.query = query;
    res.status(400).send(_return);
  }
});

/**
 * @module update
 */
router.put('/update', (req, res) => {
  res.send({
    status: true,
    msg: [
      'In progress...'
    ],
    update: req.query
  });
});

router.get('/admin', (req, res) => {
  res.render('ipe-admin/index', {
    title: '',
    content: '<strong>In progress...</strong>'
  })
});

/**
 * @module worker 
 */
router.get('/admin/worker', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      res.send(err)
    } else {
      const db = client.db(dbName);
      const collection = db.collection('admin_worker');
      collection.find({}).project({ _id: 1 }).toArray((err, docs) => {
        if (err) {
          res.send(err)
        } else {
          var list = '<ol>';
          for (let i = 0; i < docs.length; i++) {
            list += `<li><a href="./${docs[i]._id}">Worker#${docs[i]._id}</a></li>`
          }
          list += '</ol>';
          res.render('ipe-admin/index', {
            title: 'Worker list',
            content: `
            <p>These are all workers</p>
            ${list}
            `
          });
        }
      })
    }
    client.close();
  })
});
router.get('/admin/worker/:id', (req, res) => {
  var id = req.params.id;

  MongoClient.connect(url, (err, client) => {
    if (err) {
      res.send(err);
    } else {
      const db = client.db(dbName);
      const collection = db.collection('admin_worker');
      collection.find({
        _id: id
      }).toArray((err, docs) => {
        if (err) {
          res.send(err);
        } else {
          if (docs.length > 0) {
            var data = docs[0];
            res.render('ipe-admin/index', {
              title: 'Worker #' + id,
              content: `
              <p>This is your worker</p>
              <h2>${data.name}</h2>
              <ul>
              <li>ID: #${data._id}</li>
              <li>Type: ${data.type}</li>
              <li>Create date: ${new Date(data.date).toLocaleString()}</li>
              <li>Creator: ${data.creator}</li>
              </ul>
              <a href="/inpageedit/admin/worker/${id}/confirm"><button>Confirm</button></a>
              `
            });
          } else {
            res.render('ipe-admin/index', {
              title: 'Woker not found',
              content: 'Woker #' + id + ' not found.'
            })
          }
        }
      })
    }
  })
});

router.get('/admin/worker/:id/confirm', (req, res) => {
  var id = req.params.id;

  MongoClient.connect(url, (err, client) => {
    if (err) {
      res.send(err);
    } else {
      const db = client.db('inpageedit');
      const collection = db.collection('admin_worker');
      collection.find({
        _id: id
      }).toArray((err, docs) => {
        if (err) {
          res.send(err);
        } else {
          if (docs.length > 0) {
            res.render('ipe-admin/index', {
              title: 'No permission',
              content: 'You DO NOT have the permission to apply woker #' + id + '.'
            });
          } else {
            res.render('ipe-admin/index', {
              title: 'Woker not found',
              content: 'Woker #' + id + ' not found.'
            })
          }
        }
      })
    }
    client.close();
  });
});


/**
 * @function prettyJson
 * @param {Object} json 
 * @param {Object} query 
 */
function readableJson(json = {}, query) {
  var jsonString = '',
    queryBlock = '';
  try {
    jsonString = JSON.stringify(json, null, 4);
  } catch (e) {
    jsonString = '{}';
  }
  if (typeof query === 'object') {
    queryBlock = '<h3>请求参数</h3><pre>' + JSON.stringify(query, null, 4) + '</pre>'
  }
  var content = `
    <p>您看到的是美化后的结果，请不要在生产环境中使用<code>pretty</code>参数</p>
    ${queryBlock}
    <h3>返回数据</h3>
    <pre>${jsonString}</pre>
    <style>code, pre {
      background-color: #dfdfdf;
      border: 1px solid #aaaaaa;
    }
    code {
      padding: 2px 4px;
      border-radius: 2px;
      margin: 0 2px;
    }
    pre {
      padding: 4px;
    }
    </style>
  `;
  return content;
}

module.exports = router;
