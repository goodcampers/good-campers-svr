/**
 * 설정값 제공하는 유틸
 */

var nconf = require('nconf')
	,path = require('path');

nconf.argv()
	.env()
	.file({file: path.join(__dirname, '../configuration.json')});

module.exports = nconf;
