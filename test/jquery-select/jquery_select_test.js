/**
 * List 페이지 파싱하는거 테스트
 */

var fs = require('fs')
	,jsdom = require('jsdom')
	,jquery = require('jquery')
	,async = require('async')
	,querystring = require('querystring');

var fileOpt = {
	fileName:'pages/selectorTest.html'
};

function readFile(fileOpt, callback) {
	fs.readFile(fileOpt.fileName, function(err, data){
		callback(err, data.toString());
	});
}

function scrapeListPage(html, callback) {
	jsdom.env(html, function(err, window) {
		var $ = jquery(window);
		
		console.log($('div:first').attr('class'));
		console.log("---\n");
		console.log($('div:first-child').attr('class'));
		console.log("#############\n\n");
		
		console.log($('div > p:first').text());
		console.log("---\n");
		console.log($('div > p:first-child').text());
		console.log("#############\n\n");
		
		console.log($('div:first > p:first').text());
		console.log("---\n");
		console.log($('div:first > p:first-child').text());
		console.log("#############\n\n");
		
		console.log($('div:nth-of-type(1) > p:first-child').text());
		console.log("---\n");
		console.log($('div:nth-of-type(2) > p:first-child').text());
		console.log("#############\n\n");
		
		console.log($('div > p:nth-of-type(1)').text());
		console.log("---\n");
		console.log($('div > p:nth-of-type(2)').text());
		console.log("#############\n\n");
		
		console.log("SELECTION END~~");
		//#### 여기 까지만~
		window.close();
		callback(err, "");
	});
}

async.waterfall([async.apply(readFile, fileOpt), scrapeListPage], function(err, result) {
	console.log('### END ###');
});