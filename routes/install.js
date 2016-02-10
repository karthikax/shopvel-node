var express	= require('express');
var router	= express.Router();
var Option	= require('../models/option');
var User	= require('../models/user');

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
		var options = [
			{ key: 'sitename', value: req.body.title },
			{ key: 'admin_url', value: req.body.url }
		];
		Option.create(options, function(error) {
			console.log('');
		});
		User.create({ name: '', username: req.body.username, email: req.body.email, password: req.body.password }, function(error, u) {
			console.log(u);
		});
		res.render('install', {
			currStep: 3,
			title: 'Completed'
		});
	}
});

module.exports = router;
