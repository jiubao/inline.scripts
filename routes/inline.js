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

router.get('/4', function(req, res) {
  res.render('inline/4', { title: 'xiad' });
});

router.get('/bottomblock', function(req, res) {
  res.render('inline/bottomblock', { title: 'xiad' });
});

module.exports = router;