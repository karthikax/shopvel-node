var express = require('express');
var router = express.Router();

/* GET install main. */
router.get('/', function(req, res, next) {
	res.render('install', {
		currStep: 1,
		title: 'Install',
		languages: { "en": "english", "hi": "hindi" }
	});
});

router.post('/', function(req, res) {
	if(req.body.currStep == "1"){
		// set default language req.body.language
		res.render('install', {
			currStep: 2,
			title: 'Admin Details',
			url: req.get('host')+'/'
		});
	}
	if(req.body.currStep == "2"){
		// Add documents to collections
		res.render('install', {
			currStep: 3,
			title: 'Completed'
		});
	}
});

module.exports = router;
