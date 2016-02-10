var mongoose		= require('mongoose');
var userSchema		= mongoose.Schema({
	name: String,
	username: { type: String, required: true, index: { unique: true } },
	email: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true }
});

module.exports		= mongoose.model('User', userSchema);