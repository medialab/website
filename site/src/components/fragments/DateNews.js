import React from 'react';
import {format as formatDate} from 'date-fns'

function DateNews(news){
    
    let startDate = news.startDate;
    let startDateString = startDate.toString()
    let endDate = news.endDate;

    let dateNews = null;
    let startDateFormat = null;
    let endDateFormat = null;

    let iconBetween = "⇥";

    if (endDate){
        let endDateString = endDate.toString();
        if(startDateString.substr(0, 10) === endDateString.substr(0, 10)){
            // same date
            startDateFormat = startDateString.substr(0, 10); // formater ici la date, si fr = "1 janvier 2019", si en = "1 january 2019"
            dateNews = <p className="date-news"><span className="startDate" >{startDateFormat}</span></p> ;
        }else{
            if(startDateString.substr(0, 4) === endDateString.substr(0, 4)){
                if(startDateString.substr(4, 4) === endDateString.substr(4, 4)){
                    // same month
                    startDateFormat = startDateString.substr(8, 10);
                    //console.log("start = " + startDateFormat);
                    endDateFormat = endDateString.substr(0, 10); // formater ici la date, si fr = "janvier 2019", si en = "january 2019"
                    //console.log("end = " + endDateFormat);
                    dateNews = <p className="date-news"><span className="startDate startDate_sameMonth" >{startDateFormat} </span><span className="endDate endDate_sameMonth" >{iconBetween} {endDateFormat}</span></p> ;
               
                }else{
                    // different mounth
                    startDateFormat = startDateString.substr(5, 10); // formater ici la date, si fr = "1 janvier", si en = " 1 january"
                    //console.log("start = " + startDateFormat);
                    endDateFormat = endDateString.substr(0, 10); // formater ici la date, si fr = "1 janvier 2019", si en = " 1 january 2019"
                    //console.log("end = " + endDateFormat);
                    dateNews = <p className="date-news differentMonth"><span className="startDate" >{startDateFormat} </span><span className="endDate">{iconBetween} {endDateFormat}</span></p> ;
                }
            
            }else{
                // different year
                startDateFormat = startDateString.substr(0, 10); // formater ici la date, si fr = "1 janvier 2019", si en = " 1 january 2019"
                //console.log("start = " + startDateFormat);
                endDateFormat = endDateString.substr(0, 10); // formater ici la date, si fr = "1 janvier 2019", si en = " 1 january 2019"
                //console.log("end = " + endDateFormat);
                dateNews = <p className="date-news differentYear"><span className="startDate" >{startDateFormat} </span><span className="endDate" >{iconBetween} {endDateFormat}</span></p> ;
            }
            
     
        }
        
    }else{
        startDateFormat = startDateString.substr(0, 10); // formater ici la date, si fr = "1 janvier 2019", si en = "1 january 2019"
        dateNews = <p className="date-news"><span className="startDate">{startDateFormat}</span></p>     
    }

    
    return dateNews;
	
}



export default DateNews;