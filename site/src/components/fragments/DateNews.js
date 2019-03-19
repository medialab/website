import React from 'react';
import {format as formatDate, parseISO} from 'date-fns';
import fr from 'date-fns/locale/fr';
import en from 'date-fns/locale/en-US';

function DateNews(props) {

  const startDate = props.startDate;
  const startDateString = startDate.toString();
  const endDate = props.endDate;
  const lang = props.lang;

  let dateNews = null;
  const startDateFormat = formatDate(parseISO(startDate), 'd MMMM', {locale: lang === 'fr' ? fr : en});
  const startDateDay = formatDate(parseISO(startDate), 'd', {locale: lang === 'fr' ? fr : en});
  const startDateDayName = formatDate(parseISO(startDate), 'EEEE', {locale: lang === 'fr' ? fr : en});
  const startDateYear = formatDate(parseISO(startDate), 'yyyy', {locale: lang === 'fr' ? fr : en});
  const startDateDayMonth = formatDate(parseISO(startDate), 'd MMMM', {locale: lang === 'fr' ? fr : en});

  const iconBetween = <span className="between">⇥</span>;

  if (endDate) {
      const endDateString = endDate.toString();
      const endDateFormat = formatDate(parseISO(endDate), 'd MMMM', {locale: lang === 'fr' ? fr : en});
      const endDateYear = formatDate(parseISO(endDate), 'yyyy', {locale: lang === 'fr' ? fr : en});

      if (startDateString.substr(0, 10) === endDateString.substr(0, 10)) {
          // same date
          dateNews = <p className="date-news"><span className="startDate" ><span className="day-name">{startDateDayName}</span> {startDateFormat } <span className="year">{startDateYear}</span></span></p>;
      }
      else {
          if (startDateString.substr(0, 4) === endDateString.substr(0, 4)) {
              if (startDateString.substr(4, 4) === endDateString.substr(4, 4)) {
                  // same month
                  dateNews = <p className="date-news"><span className="startDate startDate_sameMonth" >{startDateDay} </span><span className="endDate endDate_sameMonth" >{iconBetween} {endDateFormat} <span className="year">{endDateYear}</span></span></p>;
              }
              else {
                  // different month
                  dateNews = <p className="date-news differentMonth"><span className="startDate" >{startDateDayMonth} </span><span className="endDate">{iconBetween} {endDateFormat} <span className="year">{endDateYear}</span></span></p>;
              }
          }
          else {
              // different year
              dateNews = <p className="date-news differentYear"><span className="startDate" >{startDateFormat} <span className="year">{startDateYear}</span></span><span className="endDate" >{iconBetween} {endDateFormat} <span className="year">{endDateYear}</span></span></p>;
          }
      }
  }
  else {
      dateNews = <p className="date-news"><span className="startDate"><span className="day-name">{startDateDayName}</span> {startDateFormat} <span className="year">{startDateYear}</span></span></p>;
      // dateNews = <p className="date-news"><span className="startDate"> {formatDate(startDateFormat, 'dd MMMM yyyy', en)}</span></p>
  }
  return dateNews;
}

export default DateNews;
