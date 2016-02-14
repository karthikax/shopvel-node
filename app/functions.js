var bcrypt	= require('bcryptjs');
var Q		= require('q');
var User	= require('./models/user');

//used in local-signup strategy
exports.localReg = function (username, password) {
	var deferred = Q.defer();
	var hash = bcrypt.hashSync(password, 8);

	//check if username is already assigned in our database
	User.where({ username: username }).findOne(function (err, user) {
		if (user) {
			deferred.resolve(false);
		} else{
			User.create({ name: '', username: username, email: '', password: hash }, function(error, u) {
				deferred.resolve(u);
				//deferred.reject(new Error(result.body));
			});
		}
	});

	return deferred.promise;
};

//check if user exists
//if user exists check if passwords match (use bcrypt.compareSync(password, hash); // true where 'hash' is password in DB)
//if password matches take into website
//if user doesn't exist or password doesn't match tell them it failed
exports.localAuth = function (username, password) {
	var deferred = Q.defer();

	var users  = User.where({ username: username });
	users.findOne(function (err, user) {
		if (user) {
			if (bcrypt.compareSync(password, user.password)) {
				deferred.resolve(user);
			} else {
				deferred.resolve(false);
			}
		} else{
			deferred.resolve(false);
		}
	});
	return deferred.promise;
}
