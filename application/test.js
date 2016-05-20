/**
 * New node file
 */

var config = require('./utils/config.js');

console.log(config.get('url:login:url'));
console.log(config.get('request:headers:User-Agent'));