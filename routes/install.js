var express = require('express');
var router = express.Router();

/* GET install main. */
router.get('/', function(req, res, next) {
	res.render('install', {
		title: 'Install',
		languages: { EN: 'english', HI: 'hindi' }
	});
});

module.exports = router;
