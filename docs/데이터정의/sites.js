/**
	캠핑 사이트 관련 콜렉션
	campingzone.co.kr 사이트 Scrapping 해오자
*/

var siteSchema = {
	_id:<objectId>
	,name:""
	,lastModifiedDate:"YYYY-MM-DD"
	,comment:""
	,ownership:0 // 소유형태
	,area : { // 지역 (경기 > 가평)
		level1:""
		,level2:""
		,leve3:""
	}
	,address:""
	,location:{
		lat:0.0
		,lng:0.0
		,map:{
			naver:{
				mapUrl:""
					,streetViewUrl:""
			}
			,daum:{
				mapUrl:""
				,streetViewUrl:""
			}
		}
	}
	,phones:[""]
	,homepage:""
	,reserv:{
		type:0
		,url:""
	}
	,price:{
		offSeason:{
			weekday:0
			,weekend:0 }
		,semiSeason:{
			weekday:0
			,weekend:0 }
		,peakSeason:{
			weekday:0
			,weekend:0
		}
		,comment:""
	}
	,props:{
		sisul:[0]
		,jogun:[0]
		,jubyeon:[0]
		,sukbak:[0]
		,ground:[0]
		,pets:[0]
		,winter:[0]
		,siteCount:0
	}
	,images:[
	        {
	        	dir:""
        		,fileName:""
    			,type:0
	        }
	        ]
};