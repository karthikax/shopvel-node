var config	= {};

config.db_host	= 'localhost';
config.db_name	= 'shopvel';

config.db		= 'mongodb://'+config.db_host+'/'+config.db_name;

module.exports = config;
