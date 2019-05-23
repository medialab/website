import React from 'react';
import {format as formatDate} from 'date-fns';

function TimeNews(news) {

    if (!news.startDate)
        return null;

    let timeNews = null;

    const startDate = news.startDate;
    const startDateString = startDate.toString();
    const endDate = news.endDate;

    let startTimeFormat = null;
    let endTimeFormat = null;

    const iconBetween = '⇥';

    if (endDate) {
        const endDateString = startDate.toString();
        if (endDateString.length > 10) {
            startTimeFormat = startDate.substr(11);
            endTimeFormat = endDate.substr(11);
            timeNews = <p className="hours-news">{startTimeFormat} {iconBetween} {endTimeFormat}</p>;
        }
    }
else {
        if (startDateString.length > 10) {
            startTimeFormat = startDate.substr(11);
            timeNews = <p className="hours-news">{startTimeFormat}</p>;
        }
    }

    return timeNews;

}

export default TimeNews;

