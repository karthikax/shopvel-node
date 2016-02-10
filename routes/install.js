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
		req.lng = req.body.language;

		console.log( req.lng );
		res.render('install', {
			currStep: 2,
			title: 'admin',
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
