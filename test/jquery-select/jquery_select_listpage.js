/**
 * List 페이지 파싱하는거 테스트
 */

var fs = require('fs')
	,jsdom = require('jsdom')
	,jquery = require('jquery')
	,async = require('async')
	,querystring = require('querystring')
	,mongoose = require('mongoose')
	,_schema = require('./mongo_schema')
	,schema = _schema.schema
	,schemaOptions = _schema.options
	,accounting = require('accounting');

console.log(schema);

mongoose.connect('mongodb://korean44:keiichi@ds045608.mongolab.com:45608/goodcamp',
	{
		server:{
			poolSize:10
			,socketOptions:{
				keepAlive:1
			}
		}
		,replset:{
			socketOptions:{
				keepAlive:1
			}
		}
	});

var pageSchema = new mongoose.Schema(schema.PageInfo, schemaOptions);
var PageInfoModel = mongoose.model('PageInfo', pageSchema);

var listItemSchema = new mongoose.Schema(schema.ListItem, schemaOptions);
var ListItemModel = mongoose.model('ListItem', listItemSchema);

var fileOpt = {
	fileName:'pages/list1.html'
};

function readFile(fileOpt, callback) {
	fs.readFile(fileOpt.fileName, function(err, data){
		callback(err, data.toString());
	});
}

function dbSaveDone(err, doc) {
	console.log("SAVE PAGE INFO: " , doc);
};

function scrapeListPage(html, callback) {
	jsdom.env(html, function(err, window) {
		var $ = jquery(window);
		
		var pageInfo = {};
		var pageNumString = $('div.pagenum ~ div:first').text();
		var regExp = /\(([0-9]+)\/([0-9]+)\)/gi; // 현재페이지/전체페이지수 가져오기
		var match = regExp.exec(pageNumString);
		pageInfo['curPage'] = match[1];
		pageInfo['totalPage'] = match[2];
		
		
		var itemTr = $('div.wrap > div.cont > form > table.agnl > tr');
		pageInfo['itemCount'] = itemTr.length; 
//		console.log('#### PAGE INFO ####\n',pageInfo);
		
		var page = new PageInfoModel(pageInfo);
		page.save(dbSaveDone);
		
		
		//#### TEST 할 것들 여기에..
		
		var parseResults = pageInfo;
		parseResults['items'] = [];
				
		itemTr.each(function(index, element) {
			var site = {};
			var $table_map_view = $($(element).find('td:nth-child(2) > table.tbl_map_view'));
			
			site['name'] = $table_map_view.find('tr > td:nth-child(1) > a:first').text().trim();
			site['lastModifiedDate'] = $(element).find('td:first > div:eq(2)').text().split(":")[1].trim();
			site['photoUrl'] = $(element).find('td:first > div:first > a > img').attr('src');
			site['detailPageUrl'] = $table_map_view.find('tr:first > td > a:first-child').attr('href');
			site['orgId'] = querystring.parse(site['detailPageUrl'])['camp_code'];
			site['location']= {
					map:{
						lat:0,
						lng:0,
						daum:{
							mapUrl:''
						},
						naver:{
							mapUrl:''
						}
					}
			};
			site['location']['map']['daum']['mapUrl'] = $table_map_view.find('tr:first > td > div > a:eq(0)').attr('href');
			var naverMapUrl = $table_map_view.find('tr:first > td > div > a:eq(1)').attr('href');
			site['location']['map']['naver']['mapUrl'] = naverMapUrl; 
			naverMapUrl = querystring.parse(naverMapUrl);
			site['location']['map']['lat'] = naverMapUrl.lat;
			site['location']['map']['lng'] = naverMapUrl.lng;
			site['props'] = {}; site['props']['siteCount'] = accounting.unformat(
					$table_map_view.find('tr:eq(2) > td > span:first > a').text().split(':')[1].trim());
			
			parseResults['items'].push(site);

		});
		
		window.close();
//		console.log("########## PARSE RESULTS ########\n",parseResults.items,"\n######## END ########\n");
		
		async.each(parseResults.items, function(site, callback){
			var item = new ListItemModel(site);
//			console.log("saving ..",site);
			item.save(function(err, doc){
				if (err)
					console.error(err);
				console.log("SAVED : ", doc, "\n\n");
				callback(err);
			});
		}, function dbSaveDone(err){
			callback(err);
		});
		
	});
}

async.waterfall([async.apply(readFile, fileOpt), scrapeListPage], function(err, result) {
	console.log('### END ###');
});