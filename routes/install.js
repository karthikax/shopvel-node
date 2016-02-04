var express = require('express');
var router = express.Router();

/* GET install main. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Install' });
});

module.exports = router;
