var mongoose		= require('mongoose');
var productSchema	= mongoose.Schema({
	//pid: { type: String, required: true, index: { unique: true } },
	slug: { type: String, required: true, index: { unique: true } },
	name: String
});

module.exports		= mongoose.model('Product', productSchema);