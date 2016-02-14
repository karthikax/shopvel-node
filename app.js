var express		= require('express');
var path		= require('path');
//var favicon		= require('serve-favicon');
var logger		= require('morgan');
var cookieParser= require('cookie-parser');
var bodyParser	= require('body-parser');
var mongoose	= require('mongoose');
var i18n		= require('i18next');
var Backend		= require('i18next-node-fs-backend');
var middleware	= require('i18next-express-middleware');
var session		= require('express-session');
var passport	= require('passport');
var ppLocal		= require('passport-local');
var config		= require('./app/config');
var routes		= require('./app/routes/index');
var install		= require('./app/routes/install');

var app			= express();

mongoose.connect(config.db);

i18n
.use(Backend)
.use(middleware.LanguageDetector)
.init({
	backend: {
		loadPath: 'locales/{{lng}}/{{ns}}.json',
		addPath: 'locales/{{lng}}/{{ns}}.missing.json',
	}
});

app.use(middleware.handle(i18n, {
	removeLngFromUrl: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
	var err	= req.session.error,
	msg		= req.session.notice,
	suc		= req.session.success;
	delete req.session.error;
	delete req.session.success;
	delete req.session.notice;
	if (err) res.locals.error	= err;
	if (msg) res.locals.notice	= msg;
	if (suc) res.locals.success	= suc;
	next();
});

require('./app/middlewares');

app.use(function(req, res, next) {
	req.rootUrl = req.protocol+'://'+req.get('host')+'/';
	next();
});

app.use('/', routes);
app.use('/install', install);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler with stacktraces
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler without stacktraces
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
