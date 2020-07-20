var express = require('express');
const { query } = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Hello world',
    header: '你好世界',
    content: 'Wjghj Project API.'
  });
});

module.exports = router;
