const { articleLink } = require('../module/articleLink');
const { loadQuickDiff } = require('../module/loadQuickDiff');
const { updateNotice } = require('./updateNotice');

module.exports = function init() {
  articleLink();
  loadQuickDiff();
  updateNotice();
}