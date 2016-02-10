var mongoose		= require('mongoose');
var productSchema	= mongoose.Schema({
	name: String
});

module.exports		= mongoose.model('Product', productSchema);