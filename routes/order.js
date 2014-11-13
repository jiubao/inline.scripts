var express = require('express');
var router = express.Router();

router.get('/iao', function(req, res) {
  res.render('order/iao', { title: 'xiad' });
});

router.get('/mxhr', function(req, res) {
  res.render('order/mxhr', { title: 'xiad' });
});

router.get('/0', function(req, res) {
  res.render('order/0', { title: 'xiad' });
});

module.exports = router;