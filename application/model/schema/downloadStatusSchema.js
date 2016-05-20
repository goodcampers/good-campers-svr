/**
 * New node file
 */



var downloadStatusSchema = {
	tid:{type:String, unique:true}
	,startDateTime:{type:Date, 'default':Date.now}
	,endDateTime:Date
	,status:Number // 200 : Success / 400: Parse Error
	,totalPages:Number
	,downloadedPages:Number
	,listPages:[{
		pageNumber:Number
		,htmlName:String //경로 없이 이미지 이름만
		,images:[{
			fileName:String //경로 없이 이미지 이름만 (대문 이미지)
		}]
	}]
};