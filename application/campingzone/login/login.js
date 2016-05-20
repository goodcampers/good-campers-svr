/**
 * Login 처리하는 JS.
 * 
 * 모든 callback 은 function(err, data) 형태로만 취하도록 한다.
 */

var requestUtil = require('../../utils/requestUtil')
	,fs = require('fs');


var reqOpt = requestUtil.makeOption('url:login');

var Login = module.exports = (function(reqOpt){
	
	return function(){
		var _ = this;
		_.reqOpt = reqOpt;
		
		// 실제 로그인 수행 함수
		_.doLogin = function(request, callback){
			var reqOpt = _.reqOpt;
			reqOpt.jar = request.jar();
			
			request(reqOpt, function(err, response, body) {

				callback(err, {'response':response, 'body':body});
			});
		};
		
		_.getReqOpt = function(){
			return _.reqOpt;
		};
		
	};
})(reqOpt);

