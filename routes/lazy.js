var express = require('express');
var router = express.Router();

router.get('/img', function(req, res) {
  res.render('lazy/img', { title: 'xiad' });
});

router.get('/dwrite', function(req, res) {
  res.render('lazy/dwrite', { title: 'xiad' });
});

module.exports = router;
