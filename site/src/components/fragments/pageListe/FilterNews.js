import React from 'react';
/*import {graphql} from 'gatsby';*/
//import {Link} from 'gatsby';

const MAX_NB_FILTER_ITEMS = 12;

const FilterNews = ({lang, years}) => {

  let title, year, filters;
  years = years.sort().reverse();
  if (lang === 'fr') {
    title = 'Actualités';
    year = 'Aller à l\'année…';
    filters = 'Filtres';
  }
  else {
    title = 'News';
    year = 'Go to year…';
    filters = 'Filters';
  }
  let suppYears = false;

  if (years.length > MAX_NB_FILTER_ITEMS) {
    suppYears = years[MAX_NB_FILTER_ITEMS - 1];
    years = years.slice(0, MAX_NB_FILTER_ITEMS - 1);
  }

  return (
    <>
      <h1 className="type_title" data-icon="actualite">{ title }</h1>

      <input
        type="checkbox" className="toggle-filtre-phone" id="toggle-filtre-phone"
        name="toggle-filtre-phone" value="visible" hidden />
      <label htmlFor="toggle-filtre-phone" title="Découvrir les options de filtrage">
        <p>{ filters }<span /></p>
      </label>

      <div id="background-phone" />

      <div className="go-to-year" id="go-to-year_news">
        <p>{ year }</p>
        <p className="current-year">{years[0]}</p>
        <ul>
          {years.map(y => (
            <li key={`year-${y}`} ><a href={`#year-${y}`}>{y}</a></li>
          ))}
          { suppYears &&
            <li key={`filter-years-before-${suppYears}`}><a href={`#year-${suppYears}`} >&le; {suppYears}</a></li>
          }
        </ul>
      </div>

    </>
  );
};

export default FilterNews;

