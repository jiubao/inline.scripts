var express = require('express');
var router = express.Router();


router.get('/1', function(req, res) {
  res.render('block/1', { title: 'xiad' });
});

module.exports = router;