/**
 * Request Utilities
 * request 관련한 유틸리티
 */

var nconf = require('./config.js');

var requestUtil = module.exports;

requestUtil.makeOption = function(nconfOptPath, opt){
	var reqOpt = {};
	
	// opt 가 있으면, 주어진 opt 를 재사용 한다
	if (opt)
		reqOpt = opt; 
	else 
		reqOpt = nconf.get('request');
	
	var nconfOpt = nconf.get(nconfOptPath);
	
	// 추가적인 headers 를 nconfOptPath 로 부터 Load 한다
	if (nconfOpt['headers']){
		for (header in nconfOpt['headers'])
			reqOpt.headers[header] = nconfOpt.headers[header];
		
		delete nconfOpt['headers'];
	}
	
	for (key in nconfOpt){
		reqOpt[key] = nconfOpt[key];
	}
	
	return reqOpt;
};
