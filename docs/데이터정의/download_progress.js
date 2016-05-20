/**
 * 다운로드 상태 정보
 */

var downloadStatusSchema = {
	tid:String
	,startDateTime:DateTime
	,endDateTime:DateTime
	,status:Number // 200 : Success / 400: Parse Error
	,totalItems:Number
	,parseResults:[
      {
    	  itemNumber:Number
      }
    ]
};

