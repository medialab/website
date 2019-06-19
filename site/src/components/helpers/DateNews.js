import React from 'react';
import {format as formatDate, parseISO, differenceInCalendarDays, isSameYear, isSameMonth} from 'date-fns';
import * as locales from 'date-fns/locale';

function DateNews(props) {

  if (!props.startDate)
    return null;

  const startDate = parseISO(props.startDate);
  const lang = props.lang;
  const locale = locales[lang];

  let dateNews = null;
  const startDateFormat = formatDate(startDate, 'd MMMM', {locale});
  const startDateDay = formatDate(startDate, 'd', {locale});
  const startDateDayName = formatDate(startDate, 'EEEE', {locale});
  const startDateMonthName = formatDate(startDate, 'MMMM', {locale});
  const startDateYear = formatDate(startDate, 'yyyy', {locale});
  const startDateDayMonth = formatDate(startDate, 'd MMMM', {locale});

  const iconBetween = <span className="between" aria-label={lang === "fr" ? "jusqu'au" : "to" } >⇥</span>;

  if (props.endDate) {
      const endDate = parseISO(props.endDate);
      const endDateFormat = formatDate(endDate, 'd MMMM', {locale});
      const endDateDay = formatDate(endDate, 'd', {locale});
      const endDateMonthName = formatDate(endDate, 'MMMM', {locale});
      const endDateYear = formatDate(endDate, 'yyyy', {locale});

      // same date
      if (differenceInCalendarDays(startDate, endDate) === 0) {
          dateNews = <p className="date-news"><time datetime={formatDate(startDate, 'yyyy-MM-d')}><span className="startDate" ><span className="day-name">{startDateDayName}</span> <span className="day-num">{startDateDay }</span> <span className="month-name">{startDateMonthName}</span> <span className="year">{startDateYear}</span></span></time></p>;
      }
      else {
          if (isSameYear(startDate, endDate)) {
              if (isSameMonth(startDate, endDate)) {
                  dateNews = <p className="date-news" aria-label="date"><time datetime={formatDate(startDate, 'yyyy-MM-d')}><span className="startDate startDate_sameMonth" >{startDateDay} </span></time> {iconBetween} <time datetime={formatDate(endDate, 'yyyy-MM-d')}><span className="endDate endDate_sameMonth" ><span className="day-num">{endDateDay }</span> <span className="month-name">{endDateMonthName}</span> <span className="year">{endDateYear}</span></span></time></p>;
              }
              else {
                  dateNews = <p className="date-news differentMonth" aria-label="date"><time datetime={formatDate(startDate, 'yyyy-MM-d')}><span className="startDate" ><span className="day-num">{startDateDay }</span> <span className="month-name">{startDateMonthName}</span></span></time> {iconBetween} <time datetime={formatDate(endDate, 'yyyy-MM-d')}><span className="endDate"><span className="day-num">{endDateDay }</span> <span className="month-name">{endDateMonthName}</span> <span className="year">{endDateYear}</span></span></time></p>;
              }
          }
          // different year
          else {
              dateNews = <p className="date-news differentYear" aria-label="date"><time datetime={formatDate(startDate, 'yyyy-MM-d')}><span className="startDate" ><span className="day-num">{startDateDay }</span> <span className="month-name">{startDateMonthName}</span> <span className="year">{startDateYear}</span></span></time> {iconBetween} <time datetime={formatDate(endDate, 'yyyy-MM-d')}><span className="endDate" ><span className="day-num">{endDateDay }</span> <span className="month-name">{endDateMonthName}</span>  <span className="year">{endDateYear}</span></span></time></p>;
          }
      }
  }
  else {
      dateNews = <p className="date-news" aria-label="date" ><time datetime={formatDate(startDate, 'yyyy-MM-d')}><span className="startDate"><span className="day-name">{startDateDayName}</span> <span className="day-num">{startDateDay }</span> <span className="month-name">{startDateMonthName}</span> <span className="year">{startDateYear}</span></span></time></p>;
  }
  return dateNews;
}

export default DateNews;
