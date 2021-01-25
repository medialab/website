import React from 'react';
import {
  format as formatDate,
  parseISO,
  differenceInCalendarDays,
  isSameYear,
  isSameMonth
} from 'date-fns';
import enLocale from 'date-fns/locale/en-US';
import frLocale from 'date-fns/locale/fr';

const locales = {
  en: enLocale,
  fr: frLocale
};

function DateNews(props) {
  if (!props.startDate) return null;

  const startDate = parseISO(props.startDate);
  const lang = props.lang;
  const locale = locales[lang];
  const startDateSchemaProp = props.startDateSchemaProp || 'startDate';
  const endDateSchemaProp = props.endDateSchemaProp || 'endDate';

  //deprecated ? const startDateFormat = formatDate(startDate, 'd MMMM', {locale});
  // date can be precise only at month or year level in which case we ignore day
  const showStarDateDay = props.startDate.length > 7;
  const startDateDay = formatDate(startDate, 'd', {locale});
  const startDateDayName = formatDate(startDate, 'EEEE', {locale});
  // date can be precise only at year level in which case we ignore month
  const showStartDateMonth = props.startDate.length > 4;
  const startDateMonthName = formatDate(startDate, 'MMMM', {locale});
  const startDateYear = formatDate(startDate, 'yyyy', {locale});
  //deprecated ? const startDateDayMonth = formatDate(startDate, 'd MMMM', {locale});

  const iconBetween = (
    <span className="between" aria-label={lang === 'fr' ? "jusqu'au" : 'to'}>
      {' '}
      ⇥{' '}
    </span>
  );

  const endDate = parseISO(props.endDate);
  if (props.endDate && differenceInCalendarDays(startDate, endDate) !== 0) {
    //deprecated ? const endDateFormat = formatDate(endDate, 'd MMMM', {locale});
    const showEndDateDay = props.endDate.length > 7;
    const endDateDay = formatDate(endDate, 'd', {locale});
    const showEndDateMonth = props.endDate.length > 4;
    const endDateMonthName = formatDate(endDate, 'MMMM', {locale});
    const endDateYear = formatDate(endDate, 'yyyy', {locale});

    return (
      <p className="date-news differentYear" aria-label="date">
        <time
          itemProp={startDateSchemaProp}
          dateTime={formatDate(startDate, 'yyyy-MM-d')}>
          <span
            className={`startDate ${
              isSameMonth(startDate, endDate) ? 'startDate_sameMonth' : ''
            }`}>
            {showEndDateDay &&
            showStarDateDay &&
            isSameYear(startDate, endDate) &&
            isSameMonth(startDate, endDate)
              ? startDateDay
              : ''}
            {showEndDateDay &&
              showStarDateDay &&
              (!isSameYear(startDate, endDate) ||
                !isSameMonth(startDate, endDate)) && (
                <span className="day-num">{startDateDay} </span>
              )}
            {showStartDateMonth &&
              showEndDateMonth &&
              !isSameMonth(startDate, endDate) && (
                <span className="month-name">{startDateMonthName} </span>
              )}
            {!isSameYear(startDate, endDate) && (
              <span className="year">{startDateYear}</span>
            )}
          </span>
        </time>
        {iconBetween}
        <time
          itemProp={endDateSchemaProp}
          dateTime={formatDate(endDate, 'yyyy-MM-d')}>
          <span className="endDate">
            {showEndDateDay && showStarDateDay && (
              <span className="day-num">{endDateDay} </span>
            )}
            {showStartDateMonth && showEndDateMonth && (
              <span className="month-name">{endDateMonthName} </span>
            )}
            <span className="year">{endDateYear}</span>
          </span>
        </time>
      </p>
    );
  } else {
    return (
      <p className="date-news" aria-label="date">
        {(props.prefix && props.prefix[lang]) || ''}
        <time
          itemProp={startDateSchemaProp}
          dateTime={formatDate(startDate, 'yyyy-MM-d')}>
          <span>
            {props.isTimeSpan && (lang === 'fr' ? 'depuis ' : 'since ')}
          </span>
          <span className="startDate">
            {showStarDateDay && (
              <span className="day-name">{startDateDayName} </span>
            )}
            {showStarDateDay && (
              <span className="day-num">{startDateDay} </span>
            )}
            {showStartDateMonth && (
              <span className="month-name">{startDateMonthName} </span>
            )}
            <span className="year">{startDateYear}</span>
          </span>
        </time>
      </p>
    );
  }
}

export default DateNews;
