/**
 * mongodb 의 SCHEMA 정의
 */

var SCHEMA = module.exports;

SCHEMA.options = {
	collection : 'sites'
};

SCHEMA.schema = {
	PageInfo:{
		curPage:Number
		,totalPage:Number
		,itemCount:Number
	},
	ListItem:{
		name:String
		,lastModifiedDate:String
		,photoUrl:String
		,detailPageUrl:String
		,orgId:String
		,location:{
			map:{
				lat:Number
				,lng:Number
				,daum:{
					mapUrl:String
				}
				,naver:{
					mapUrl:String
				}
			}
		}
		,props:{
			siteCount:Number
		}
	}
};

