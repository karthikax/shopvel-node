var express	= require('express');
var passport= require('passport');
var router	= express.Router();
var Product	= require('../models/product');
var products= require('../controllers/products');

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

router.get('/products', products.get);
router.get('/products/:pid', products.view);
router.post('/products', products.create);
router.put('/products/:pid', products.edit);
router.delete('/products/:pid', products.delete);

module.exports = router;
