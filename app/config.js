var config	= {};

config.db_host	= 'localhost';
config.db_name	= (process.env.NODE_ENV == 'test') ? 'shopvel-test' : 'shopvel';
// can use app.get('env') if app is defined

config.db		= 'mongodb://'+config.db_host+'/'+config.db_name;

module.exports = config;
