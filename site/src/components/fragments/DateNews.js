import React from 'react';

function DateNews(news){
	console.log(news);
	return <><span className="startDate">{news.startDate}</span><span className="endDate">{news.endDate}</span></>;
	
}
export default DateNews;
