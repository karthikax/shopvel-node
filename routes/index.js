var express	= require('express');
var passport= require('passport');
var router	= express.Router();
var Product	= require('../models/product');

/*Product.create({ name: 'My Test Product' }, function(error, p) {
	console.log(p);
});*/

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Shopvel' });
});

router.get('/login', function(req, res, next) {
	res.render('login', { username: '', url: req.rootUrl+'register' });
});

router.get('/register', function(req, res, next) {
	res.render('register', { username: '', url: req.rootUrl+'login' });
});

router.post('/login', passport.authenticate('local-signin', { 
	successRedirect: '/',
	failureRedirect: '/login'
	})
);

module.exports = router;
