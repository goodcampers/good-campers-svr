/**
 * 스크래핑 서버 
 * 
 * 이건 마구마구 만들자.. 잘 구조화하려고 하지 말고..
 * 그냥 막 만들어보는 연습용 시스템이닷~!
 */

var https = require('https')
	,request = require('request')
	,HTMLParser = require('htmlparser');

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

/*
var handler = new HTMLParser.DefaultHandler(function(error, dom) {
	if (error) {
		
	}else {
		console.log("파싱 성공");
		console.log(dom);
	}
});
*/

reqOpt.method = 'POST';
reqOpt.form = {
	'returnur':'/HTML/index.asp'
	,'userid':'korean44'
	,'pass':'keiichi'
	,'x':37
	,'y':11
};

function handleListPage(error, response, body) {
	console.log('\n\n\n######## LIST PAGE ########\n'+body);
	printCookies();
	console.log('\n### REG EXP RESULT ###');
	printRegExpResults(/현재페이지.+\(([0-9]+)\/([0-9]+)\)/ig, body);
	//printRegExpResults(/div.+href=\"(view\.asp.+?camp\_code=([0-9]+))\"/ig, body);
	//printRegExpResults(/div.+href=\"(view\.asp.+?camp\_code=([0-9]+))\"[\s\S]*?최근수정일.+:[\s\S]([0-9\-\_\.]+).*\</igm,body);
	printRegExpResults(/div.+href=\"(view\.asp.+?camp\_code=([0-9]+))\"[\s\S]*?최근수정일.+:[\s\S]([0-9\-\_\.]+)[\s\S]+사이트수 : ([0-9]+)\<[\s\S]+?camping_count.+\<\/div\>/igm,body);
};

function printRegExpResults(regExp, text) {
	console.log ("Expression : " + regExp);
	var match = null;
	while((match = regExp.exec(text)) != null) {
		for (var index = 0 ; index < match.length ; index++) {
			console.log("match["+index+"] : " + match[index]);
		}
	}
}

function printCookies(){
	console.log('########## COOKIE #############\n'); 
	console.dir(jar);
};

request(reqOpt, function(error, response, body) {
	//console.log('######## RECEIVED ####### \n' + body);
	
	
	//var myRegExp = /src=\"(.+?)\".+페이스북/gi;
	var myRegExp = /src=\"(.+?)\"/gi;
	var match = null;
	while((match = myRegExp.exec(body)) != null) {
		console.log(match[1]);
	}
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

