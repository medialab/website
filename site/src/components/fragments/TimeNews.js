import React from 'react';
import {format as formatDate} from 'date-fns'

function TimeNews(news){

    let timeNews = null;
    
    let startDate = news.startDate;
    let startDateString = startDate.toString()
    let endDate = news.endDate;

    let startTimeFormat = null;
    let endTimeFormat = null;

    let iconBetween = "⇥";

    if (endDate){
        let endDateString = startDate.toString();
        if(endDateString.length > 10){
            startTimeFormat = startDate.substr(11); 
            endTimeFormat = endDate.substr(11); 
            timeNews = <p className="hours-news">{startTimeFormat} {iconBetween} {endTimeFormat}</p>
        } 
    }else{
        if(startDateString.length > 10){            
            startTimeFormat = startDate.substr(11); 
            timeNews = <p className="hours-news">{startTimeFormat}</p>
        }
    }

    return timeNews;
    
}

export default TimeNews;


