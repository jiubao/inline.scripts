var express = require('express');
var router = express.Router();

router.get('/img', function(req, res) {
  res.render('lazy/img', { title: 'xiad' });
});

module.exports = router;
