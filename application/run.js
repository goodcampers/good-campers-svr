/**
 * 스크래핑 서버 
 * 
 * 이건 마구마구 만들자.. 잘 구조화하려고 하지 말고..
 * 그냥 막 만들어보는 연습용 시스템이닷~!
 * 
 * 원래 RegExp 써서 하려고 했는데, 이거 좀 아닌듯함..
 * jsdom 과 jquery 를 사용하여 HTML 을 DOM 에 올려놓고 파싱하도록 해봄.!!
 */

var https = require('https')
	,request = require('request')
	,jsdom = require('jsdom')
	,jQuery = require('jquery')
	,requestUtil = require('./utils/requestUtil')
	,async = require('async');

var jar = request.jar();

var Login = require('./campingzone/login/login');
var login = new Login();
async.series([
              async.apply(login.doLogin, request) // Login
              ,function(callback){
            	  console.log("1:", request.jar());
            	  console.log("2:", login.getReqOpt().jar);
            	  console.log("3:", jar);
              }
              ], function(err, results){
	console.log('RESULT : ', 'OK');
});


////---

return;

function handleListPage(error, response, body) {
	jsdom.env(body, function(err, window) {
		var $ = jQuery(window);
		// List Page 의 전체 페이지 수 파싱
		
		var pageInfo = {};
		var pageNumString = $('div.pagenum ~ div:first').text();
		var regExp = /\(([0-9]+)\/([0-9]+)\)/gi; // 현재페이지/전체페이지수 가져오기
		var match = regExp.exec(pageNumString);
		pageInfo['curPage'] = match[1];
		pageInfo['totalPage'] = match[2];
		
		
	});
};

function printCookies(){
	console.log('########## COOKIE #############\n'); 
	console.dir(jar);
};

request(reqOpt, function(error, response, body) {
	//console.log('######## RECEIVED ####### \n' + body);

	/*
	var parser = new HTMLParser.Parser(handler);
	parser.parseComplete(body);*/
	printCookies();
	
	//-- 첫 리스트 페이지 가져옴
	reqOpt.headers['Referer'] = 'http://www.campingzone.co.kr/';
	reqOpt.url = 'http://www.campingzone.co.kr/HTML/camp/camp_search/list.asp';
	reqOpt.method = "GET";
	request(reqOpt, handleListPage);
});

