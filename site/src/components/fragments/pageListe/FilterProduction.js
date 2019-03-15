import React from 'react';
/*import {graphql} from 'gatsby';*/
import {Link} from 'gatsby';
import cls from 'classnames';

const FilterProduction = ({lang, group, types}) => {


	let title, filter, all, publication, webedition, tool, situation, media, year, type, article, communication, book, thesis, grey;

	if (lang === 'fr') {
		title = 'Productions';
		filter = 'Filtres';
		all = 'Toutes les productions';
		publication = 'Publications';
		webedition = 'webEditions';
		tool = 'Outils';
		situation = 'Situations';
		media = 'Media';
		year = "Aller à l'année…";
		type = 'Type de publication';
		article = 'Article';
		communication = 'Communication';
		book = 'Livre';
		thesis = 'Thèse';
		grey = 'Littérature grise';
	}
	else {
		title = 'Productions';
		filter = 'Filters';
		all = 'All productions';
		publication = 'Publications';
		webedition = 'webEditions';
		tool = 'Tools';
		situation = 'Situations';
		media = 'Media';
		year = 'Go to year…';
		type = "Publication's type";
		article = 'Article';
		communication = 'Communication';
		book = 'Book';
		thesis = 'Thesis';
		grey = 'Grey literature';
	}

	return (
  <>
    <h1 className="type_title" data-icon="production"><a href="#year-2018">{title}</a></h1>

    <input
      type="checkbox" id="toggle-filtre-phone" name="toggle-filtre-phone"
      value="visible" hidden />
    <label htmlFor="toggle-filtre-phone" title="Découvrir les options de filtrage">
      <p>{filter}<span /></p>
    </label>

    <div id="background-phone" />

    <input
      type="radio" id="radio_filtre-production_group" name="radio_filtre-production"
      value="group" hidden />
    <label htmlFor="radio_filtre-production_group"><span>〉</span></label>

    <ul className="link-productions-sort">
      {types.map(g => {
						return (
  <li key={g.label.fr}>
    <Link
      className={cls(g.id === group && 'pageProduction_current')}
      to={g.permalink[lang]}>
      {g.label[lang]} <span>〉</span>
    </Link>
  </li>
						);
					})}
    </ul>


    <input
      type="radio" id="radio_filtre-production_year" name="radio_filtre-production"
      value="year" hidden />
    <label htmlFor="radio_filtre-production_year"><span>〉</span></label>

    <div className="go-to-year" id="go-to-year_production">
      <p>{year}</p>
      <p className="current-year">2019</p>
      <ul>
        <li><a href="#year-2019">2019</a></li>
        <li><a href="#year-2018">2018</a></li>
        <li><a href="#year-2017">2017</a></li>
        <li><a href="#year-2016">2016</a></li>
        <li><a href="#year-2015">2015</a></li>
        <li><a href="#year-2014">2014</a></li>
        <li><a href="#year-2013">2013</a></li>
        <li><a href="#year-2012">2012</a></li>
        <li><a href="#year-2011">2011</a></li>
        <li><a href="#year-2010">2010</a></li>
        <li><a href="#year-2009">2009</a></li>
        <li><a href="#years-before-2009">&lt; 2009</a></li>
      </ul>
    </div>


    <input
      type="radio" id="radio_filtre-production_type" name="radio_filtre-production"
      value="type" checked hidden />
    <label htmlFor="radio_filtre-production_type">{type} <span>〉</span></label>

    <input
      type="checkbox" id="filtre-production_article" name="filtre-production_article"
      className="input_filtre-production" value="article" hidden />
    <label className="filtre-production checkbox-medialab" htmlFor="filtre-production_article">{article}</label>

    <input
      type="checkbox" id="filtre-production_communication" name="filtre-production_communication"
      className="input_filtre-production" value="communication" hidden />
    <label className="filtre-production checkbox-medialab" htmlFor="filtre-production_communication">{communication}</label>

    <input
      type="checkbox" id="filtre-production_book" name="filtre-production_book"
      className="input_filtre-production" value="book" hidden />
    <label className="filtre-production checkbox-medialab" htmlFor="filtre-production_book">{book}</label>

    <input
      type="checkbox" id="filtre-production_thesis" name="filtre-production_thesis"
      className="input_filtre-production" value="thesis" hidden />
    <label className="filtre-production checkbox-medialab" htmlFor="filtre-production_thesis">{thesis}</label>

    <input
      type="checkbox" id="filtre-production_grey" name="filtre-production_grey"
      className="input_filtre-production" value="grey" hidden />
    <label className="filtre-production checkbox-medialab" htmlFor="filtre-production_grey">{grey}</label>


  </>
	);
};

export default FilterProduction;
