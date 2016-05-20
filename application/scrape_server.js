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
	,jQuery = require('jquery');

var jar = request.jar();
var reqOpt = {
	headers: {
		'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.137 Safari/537.36'
		,'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
		,'Accept-Encoding':'gzip,deflate,sdch'
		,'Accept-Language':'ko,ar;q=0.8,en;q=0.6'
		,'Cache-Control':'max-age=0'
	}
	,url : 'http://www.campingzone.co.kr/HTML/login/login_ok.asp'
	,'jar':jar
};

reqOpt.method = 'POST';
reqOpt.form = {
	'returnur':'/HTML/index.asp'
	,'userid':'korean44'
	,'pass':'keiichi'
	,'x':37
	,'y':11
};

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

