var express	= require('express');
var router	= express.Router();
var Product	= require('../models/product');

/*Product.create({ name: 'My Test Product' }, function(error, p) {
	console.log(p);
});*/

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Shopvel' });
});

module.exports = router;
