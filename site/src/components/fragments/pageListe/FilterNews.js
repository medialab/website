import React from 'react';
/*import {graphql} from 'gatsby';*/ 
//import {Link} from 'gatsby';

const MAX_NB_FILTER_ITEMS = 12;

const FilterNews = ({lang, years}) => {

  let title, year, filters, event, post, notice, typeNews;
  years = years.sort().reverse();
  if (lang === 'fr') {
    title = 'Actualités';
    year = 'Aller à l\'année…';
    filters = 'Filtres';
    typeNews = "Type d'actualités";
    event = 'Évenement';
    post = 'Publication';
    notice = 'Annonce';
  }
  else {
    title = 'News';
    year = 'Go to year…';
    filters = 'Filters';
    typeNews = "News‘ type";    
    event = 'Event';
    post = 'Post';
    notice = 'Notice';
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
      
      {/* YEAR */}
      <input
        type="radio" id="radio_filtre-actu_year" name="radio_filtre-actu"
        value="year" hidden />
      <label htmlFor="radio_filtre-actu_year"><span>〉</span></label>

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
      
      {/* TYPE */}
      <input type="radio" id="radio_filtre-actu_type" name="radio_filtre-actu" className="input_filtre-actu" value="type" defaultChecked hidden />
      <label htmlFor="radio_filtre-actu_type">{typeNews} <span>〉</span></label>

      <input type="checkbox" id="filtre-actu_event" name="filtre-actu_event" className="input_filtre-actu" value="event" hidden />
      <label className="filtre-actu checkbox-medialab"  htmlFor="filtre-actu_event">{event}</label>

      <input type="checkbox" id="filtre-actu_post" name="filtre-actu_post" className="input_filtre-actu" value="post" hidden />
      <label className="filtre-actu checkbox-medialab"  htmlFor="filtre-actu_post">{post}</label>

      <input type="checkbox" id="filtre-actu_notice" name="filtre-actu_notice" className="input_filtre-actu" value="notice" hidden />
      <label className="filtre-actu checkbox-medialab"  htmlFor="filtre-actu_notice">{notice}</label>

    </>
  );
};

export default FilterNews;

