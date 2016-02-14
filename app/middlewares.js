var passport		= require('passport');
var LocalStrategy	= require('passport-local');
var funct			= require('./functions');

passport.use('local-signin', new LocalStrategy(
	{passReqToCallback : true}, //allows us to pass back the request to the callback
	function(req, username, password, done) {
		funct.localAuth(username, password)
		.then(function (user) {
			if (user) {
				req.session.success = 'You are successfully logged in ' + user.username + '!';
				done(null, user);
			}
			if (!user) {
				req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
				done(null, user);
			}
		})
		.fail(function (err){
			console.log(err.body);
		});
	}
));

// Use the LocalStrategy within Passport to register/"signup" users.
passport.use('local-signup', new LocalStrategy(
	{passReqToCallback : true}, //allows us to pass back the request to the callback
	function(req, username, password, done) {
		funct.localReg(username, password)
		.then(function (user) {
			if (user) {
				req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
				done(null, user);
			}
			if (!user) {
				req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
				done(null, user);
			}
		})
		.fail(function (err){
			console.log(err.body);
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});
