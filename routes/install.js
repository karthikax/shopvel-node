var express	= require('express');
var router	= express.Router();
var bcrypt	= require('bcryptjs');
var Option	= require('../models/option');
var User	= require('../models/user');

/* GET install main. */
router.get('/', function(req, res, next) {
	var step = '';
	var url = [];
	Option.find(function(err, options) {
		if (err)
			res.send(err);
		if(options.length == 0){
			step = 1;
		}else{
			step = 0;
			url = [req.rootUrl, req.rootUrl+'login'];
		}
		res.render('install', {
			currStep: step,
			title: 'Install',
			languages: { "en": "english", "hi": "hindi" },
			url: url
		});
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
		var hash = bcrypt.hashSync(req.body.password, 8);
		Option.create(options, function(error) {
			console.log('');
		});
		User.create({ name: '', username: req.body.username, email: req.body.email, password: hash }, function(error, u) {
			console.log(u);
		});
		res.render('install', {
			currStep: 3,
			title: 'Completed'
		});
	}
});

module.exports = router;
