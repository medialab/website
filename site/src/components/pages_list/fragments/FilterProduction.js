import React from 'react';
/*import {graphql} from 'gatsby';*/
import {Link} from 'gatsby';
import cls from 'classnames';

const FilterProduction = ({lang, group, types}) => {


	let title, filter, all,  year;

	if (lang === 'fr') {
		title = 'Productions';
		filter = 'Filtres';
		all = 'Toutes les productions';
		year = "Aller à l'année…";
	
	}
	else {
		title = 'Productions';
		filter = 'Filters';
		all = 'All productions';
		year = 'Go to year…';
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
    <li><Link to="/productions">{lang === 'fr' ? 'Toutes les productions' : 'All productions'}</Link></li>
      {types.map(g => {
						return (
  <li key={g.id} className={cls(g.id === group && 'pageProduction_current')}>
    <Link
      
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

    <InputFiltresType lang={lang} group={group} />

  </>
	);
};

export default FilterProduction;












function InputFiltresType(values){

  const lang = values.lang;
  const group = values.group;

  let  typePublications, typeWebEditions, typeTools, typeSituations, article, communication, book, thesis, grey, software, website, exhibition, conference;

  if (lang === 'fr') {
    typePublications = 'Type de publications';
    typeWebEditions = 'Type d‘éditions web' ;
    typeTools = 'Type d‘outils' ;
    typeSituations = 'Type de situations';

    article = 'Articles';
    communication = 'Communications';
    book = 'Livres';
    thesis = 'Thèses';
    grey = 'Littérature grise';
    software = 'Logiciels';
    website = 'Sites web';
    exhibition = 'Expositions';
    conference = 'Conférences';
  }
  else {
    typePublications = "Publications‘ type";
    typeWebEditions = "Web Editions‘ type";
    typeTools = 'Tools‘ type' ;
    typeSituations = 'Situations‘ type' ;
   
    article = 'Articles';
    communication = 'Communications';
    book = 'Books';
    thesis = 'Thesis';
    grey = 'Grey literature';
    software = 'Software';
    website = 'Websites';
    exhibition = 'Exhibitions';
    conference = 'Conferences';
  }


  if(group === 'publications'){
    return (
      <>
      <input type="radio" id="radio_filtre-production_type" name="radio_filtre-production" className="input_filtre-production" value="type" defaultChecked hidden />
      <label htmlFor="radio_filtre-production_type">{typePublications} <span>〉</span></label>
      
      <input type="checkbox" id="filtre-production_article" name="filtre-production_article" className="input_filtre-production" value="article" hidden />
      <label className="filtre-production checkbox-medialab" htmlFor="filtre-production_article">{article}</label>
  
      <input type="checkbox" id="filtre-production_communication" name="filtre-production_communication" className="input_filtre-production" value="communication" hidden />
      <label className="filtre-production checkbox-medialab" htmlFor="filtre-production_communication">{communication}</label>
  
      <input  type="checkbox" id="filtre-production_book" name="filtre-production_book" className="input_filtre-production" value="book" hidden />
      <label className="filtre-production checkbox-medialab" htmlFor="filtre-production_book">{book}</label>
  
      <input type="checkbox" id="filtre-production_thesis" name="filtre-production_thesis" className="input_filtre-production" value="thesis" hidden />
      <label className="filtre-production checkbox-medialab" htmlFor="filtre-production_thesis">{thesis}</label>
  
      <input type="checkbox" id="filtre-production_grey" name="filtre-production_grey" className="input_filtre-production" value="grey" hidden />
      <label className="filtre-production checkbox-medialab" htmlFor="filtre-production_grey">{grey}</label>
      </>
    );
  }else if(group === 'tools'){
    return (
      <>
      <input type="radio" id="radio_filtre-production_type" name="radio_filtre-production" className="input_filtre-production" value="type" defaultChecked hidden />
      <label htmlFor="radio_filtre-production_type">{typeTools} <span>〉</span></label>
      
      <input type="checkbox" id="filtre-production_software" name="filtre-production_software" className="input_filtre-production" value="software" hidden />
      <label className="filtre-production checkbox-medialab"  htmlFor="filtre-production_software">{software}</label>

      <input type="checkbox" id="filtre-production_code" name="filtre-production_code" className="input_filtre-production" value="code" hidden />
      <label className="filtre-production checkbox-medialab"  htmlFor="filtre-production_code">Code</label>
      </>
    );
  }else if(group === 'webEditions'){
    return (
      <>
      <input type="radio" id="radio_filtre-production_type" name="radio_filtre-production" className="input_filtre-production" value="type" defaultChecked hidden />
      <label htmlFor="radio_filtre-production_type">{typeWebEditions} <span>〉</span></label>
      
      <input type="checkbox" id="filtre-production_datascape" name="filtre-production_datascape" className="input_filtre-production" value="datascape" hidden />
      <label className="filtre-production checkbox-medialab"  htmlFor="filtre-production_datascape">Datascape</label>

      <input type="checkbox" id="filtre-production_website" name="filtre-production_website" className="input_filtre-production" value="website" hidden />
      <label className="filtre-production checkbox-medialab"  htmlFor="filtre-production_website">{website}</label>
      </>
    );
  }else if(group === 'situations'){
    return (
      <>
      <input type="radio" id="radio_filtre-production_type" name="radio_filtre-production" className="input_filtre-production" value="type" defaultChecked hidden />
      <label htmlFor="radio_filtre-production_type">{typeSituations} <span>〉</span></label>
      
      <input type="checkbox" id="filtre-production_exhibition" name="filtre-production_exhibition" className="input_filtre-production" value="exhibition" hidden />
      <label className="filtre-production checkbox-medialab" htmlFor="filtre-production_exhibition">{exhibition}</label>

      <input type="checkbox" id="filtre-production_workshop" name="filtre-production_workshop" className="input_filtre-production" value="workshop" hidden />
      <label className="filtre-production checkbox-medialab" htmlFor="filtre-production_workshop">Workshops</label>

      <input type="checkbox" id="filtre-production_simulation" name="filtre-production_simulation" className="input_filtre-production" value="simulation" hidden />
      <label className="filtre-production checkbox-medialab" htmlFor="filtre-production_simulation">Simulations</label>

      <input type="checkbox" id="filtre-production_conference" name="filtre-production_conference" className="input_filtre-production" value="conference" hidden />
      <label className="filtre-production checkbox-medialab" htmlFor="filtre-production_conference">{conference}</label>
      </>
    );
  }else{
    return ( <> </>)
  }

}
  

