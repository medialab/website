import React from 'react';
import {format as formatDate, parseISO, differenceInCalendarDays, isSameYear, isSameMonth} from 'date-fns';
import * as locales from 'date-fns/locale';

function DateNews(props) {

  const startDate = parseISO(props.startDate);
  const lang = props.lang;
  const locale = locales[lang];

  let dateNews = null;
  const startDateFormat = formatDate(startDate, 'd MMMM', {locale});
  const startDateDay = formatDate(startDate, 'd', {locale});
  const startDateDayName = formatDate(startDate, 'EEEE', {locale});
  const startDateYear = formatDate(startDate, 'yyyy', {locale});
  const startDateDayMonth = formatDate(startDate, 'd MMMM', {locale});

  const iconBetween = <span className="between">⇥</span>;

  if (props.endDate) {
      const endDate = parseISO(props.endDate);
      const endDateFormat = formatDate(endDate, 'd MMMM', {locale});
      const endDateYear = formatDate(endDate, 'yyyy', {locale});

      // same date
      if (differenceInCalendarDays(startDate, endDate) === 0) {
          dateNews = <p className="date-news"><span className="startDate" ><span className="day-name">{startDateDayName}</span> {startDateFormat } <span className="year">{startDateYear}</span></span></p>;
      }
      else {
          if (isSameYear(startDate, endDate)) {
              if (isSameMonth(startDate, endDate)) {
                  dateNews = <p className="date-news"><span className="startDate startDate_sameMonth" >{startDateDay} </span><span className="endDate endDate_sameMonth" >{iconBetween} {endDateFormat} <span className="year">{endDateYear}</span></span></p>;
              }
              else {
                  dateNews = <p className="date-news differentMonth"><span className="startDate" >{startDateDayMonth} </span><span className="endDate">{iconBetween} {endDateFormat} <span className="year">{endDateYear}</span></span></p>;
              }
          }
          // different year
          else {
              dateNews = <p className="date-news differentYear"><span className="startDate" >{startDateFormat} <span className="year">{startDateYear}</span></span><span className="endDate" >{iconBetween} {endDateFormat} <span className="year">{endDateYear}</span></span></p>;
          }
      }
  }
  else {
      dateNews = <p className="date-news"><span className="startDate"><span className="day-name">{startDateDayName}</span> {startDateFormat} <span className="year">{startDateYear}</span></span></p>;
  }
  return dateNews;
}

export default DateNews;
