var express = require('express');
var router = express.Router();


router.get('/1', function(req, res) {
  res.render('inline/1', { title: 'xiad' });
});

router.get('/2', function(req, res) {
  res.render('inline/2', { title: 'xiad' });
});

router.get('/3', function(req, res) {
  res.render('inline/3', { title: 'xiad' });
});

module.exports = router;