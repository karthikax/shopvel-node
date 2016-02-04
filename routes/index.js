var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shopvel');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	//console.log('connected');
});

var productSchema = mongoose.Schema({
    name: String
});

var Product = mongoose.model('Product', productSchema);

/*Product.create({ name: 'My Test Product' }, function(error, p) {
	console.log(p);
});*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shopvel' });
});

module.exports = router;
