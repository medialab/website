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

    const iconBetween = <span aria-label="Jusqu'à / to">⇥</span>;

    if (endDate) {
        const endDateString = startDate.toString();
        if (endDateString.length > 10) {
            startTimeFormat = startDate.substr(11);
            endTimeFormat = endDate.substr(11);
            timeNews = <p className="hours-news"  aria-label="Horaire / Schedule"><time dateTime={startTimeFormat}>{startTimeFormat}</time> {iconBetween} <time dateTime={endTimeFormat}>{endTimeFormat}</time></p>;
        }
    }
    else {
        if (startDateString.length > 10) {
            startTimeFormat = startDate.substr(11);
            timeNews = <p className="hours-news"  aria-label="Horaire / Schedule"><time dateTime={startTimeFormat}>{startTimeFormat}</time></p>;
        }
    }

    return timeNews;

}

export default TimeNews;

